import { Component } from 'react';
import classes from './Game.module.css'

class Game extends Component {
    localState = {

    }

    state = {

    }

    messages = []

    renderMessages() {
        return (
            <div>
            {this.messages.slice(0).reverse().map((myMessage) => {
            return(<div className={this.stylingForPlayerNumber(myMessage[1])}>{myMessage[0]}</div>)})}
            </div>
        )
    }

    setPlayerNumber(playerNumber) {
        const parsedInt = parseInt(playerNumber, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Player number must be a valid integer.")
            return
        }
        if (parsedInt <= 0 || parsedInt > this.localState.totalNumberOfPlayers) {
            window.alert("Player number must within player range.");
            return
        }
        this.currentPlayerNumber = parsedInt;
        this.alertWindow("Player number has been set to " + parsedInt + ".");
        this.rerenderState();
    }

    apiCreateNewGame() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/creategame/',
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                console.log("Response " + body);
                this.alertWindow("New game created! Game ID is " + body);
                this.gameId = body;
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiResetGame(numberPlayers=0) {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/resetgame/' + this.gameId + "/" + numberPlayers + "/",
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('end', () => {
                this.alertWindow("Game reset.");
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiGetGameState(isRefresh=false) {
        const https = require('http')
        const cors = require('cors')

        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/gamestate/' + this.gameId + "/",
        method: 'GET',
        accept: '*/*',
        }
        
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                try {
                    const result = JSON.parse(body);
                    if (this.withDebug) {
                        console.log(result[0].fields);
                    }
                    this.updateMessage("Game state received.");
                    this.setLocalStateFromApiData(result[0].fields)
                    // console.log("Hands " + this.localState.hands)
                    this.rerenderState();
                    if (isRefresh) {
                        setTimeout(() => {this.apiGetGameState(true)}, this.waitTime);
                    }
                } catch(e) {
                    console.log(e.message)
                }
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiSetGameId(gameId) {
        const parsedInt = parseInt(gameId, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Game ID must be a valid integer.")
            return
        }
        const http = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/' + gameId + "/checkId/",
        method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                console.log("Response " + body);
                if (body === "ID GOOD") {
                    this.alertWindow("Game ID updated to " + gameId);
                    this.gameId = gameId;
                    this.apiGetGameState();
                } else if (body === "ID BAD") {
                    this.alertWindow("GAME ID BAD. NOT UPDATED");
                }
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    stylingForPlayerNumber(playerNumber) {
        let returnStyle = classes.red;
        switch (playerNumber) {
            case 1:
                returnStyle = classes.redMessage;
                break;
            case 2:
                returnStyle = classes.blueMessage;
                break;
            case 3:
                returnStyle = classes.greenMessage;
                break;
            case 4:
                returnStyle = classes.orangeMessage;
                break;
            case 5:
                returnStyle = classes.pinkMessage;
                break;
            case 6:
                returnStyle = classes.brownMessage;
                break;
            default:
                returnStyle = classes.purpleMessage;
        }
        return returnStyle;
    }
    mergeMessages(newMessages) {
        let messagesOnly = this.messages.slice(0).reverse().map((messagePair) => {
        // let messagesOnly = this.messages.slice(0).reverse().map((messagePair) => {
        // let messagesOnly = this.messages.map((messagePair) => {
            return(messagePair[0]);
        })
        // BUG: duplicate messages in the last 6 messages mess this up (e.g. Player 1 earns 1 point. twice)
        let tempMessages = [];
        for (let i = newMessages.length - 1; i >= 0;  i--) {
        // for (let i = 0; i < newMessages.length;  i++) {
            let wasFound = false;
            for (let j = 0; j < Math.min(messagesOnly.length, 6); j++) {
                if (messagesOnly[j] === newMessages[i]) {
                    wasFound = true;
                    break;
                }
            }
            if (wasFound) { break; }
            if (newMessages[i] !== "none") {
                tempMessages.push([newMessages[i], this.localState.currentTurn])
            }
        }
        tempMessages.slice(0).reverse().forEach((message) => {this.messages.push(message)}) 
    }

    rerenderState(handler = () => {}) {
        this.setState(this.localState, handler)
    }

    updateMessage(newMessage) {
        var messageCopy = this.localState.message
        for (var i = 0; i < (messageCopy.length - 1); i++) {
            messageCopy[i] = messageCopy[i+1]
        }
        messageCopy[messageCopy.length - 1] = newMessage
        this.localState['message'] = messageCopy
    }

    alertWindow(message) {
        if (!this.isAI || this.localState.currentTurn === 1) {
            window.alert(message)
        }
    }

    getArrayForCsvString(csvString) {
        if (csvString === "") return []
        let result = csvString.split(',');
        return result
    }

    getNumericalArrayForCsvString(csvString) {
        if (csvString === "") return []
        let result = csvString.split(',');
        for (let i = 0; i < result.length; i++) {
            result[i] = Number.parseInt(result[i])
        }
        return result;
    }

    getBooleanArrayForCsvString(csvString) {
        if (csvString === "") return []
        let result = csvString.split(',');
        for (let i = 0; i < result.length; i++) {
            if (result[i] === '0') {
                result[i] = false;
            } else if (result[i] === '1'){
                result[i] = true;
            } else {
                console.log("Error parsing boolean");
            }
        }
        return result;
    }
}

export default Game;