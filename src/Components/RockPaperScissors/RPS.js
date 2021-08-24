import React, {Component} from 'react';
import Game from '../Game';
import { Container, Col, Row} from 'react-bootstrap';

class RPS extends Game {
    http = require('https');
    gameId = 1;
    playerNumber = 0;
    // portNumber = 80;
    portnumber ='';
    // portNumber = 443;
    // hostname = '0.0.0.0';
    // hostname = '44.230.70.0';
    hostname = 'www.scottsherlock.one';
    displayHands = false;

    localState = {leftHand: "None",
        rightHand: "None",
        win: "Not Evaluated",
        message: ["blank message","blank message","blank message","blank message","blank message","blank message"]
        }

    state = {leftHand: "None",
        rightHand: "None",
        win: "Not Evaluated", 
        message: ["blank message","blank message","blank message","blank message","blank message","blank message"]
        }
    
    componentDidMount() {
        this.updateMessage("Playing Game 1.");
        this.rerenderState();
        this.getGameState();
    }

    evaluateGame() {
        this.isGameId();
        let https = require('https')
        let options;
        let path = '/rps/' + this.gameId + '/evaluate/';
        options = {
            hostname: this.hostname,
            port: this.portNumber,
            path: path,
            method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });


            res.on('end', () => {
                console.log("body " + body);
                if (body !== "Left Hand" && body !== "Right Hand" && body != "Tie") {
                    this.updateMessage("GAME COULD NOT BE EVALUATED BECAUSE ALL HANDS ARE NOT SET.");
                    this.rerenderState();
                } else {
                    this.displayHands = true;
                }
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    setLeftHand(string) {
        this.localState.leftHand = string;
        this.rerenderState();
    }

    setRightHand(string) {
        this.localState.rightHand = string;
        this.rerenderState();
    }

    getGameState() {
        const https = require('https')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/rps/' + this.gameId + '/',
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`getGameState statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                const result = JSON.parse(body);
                console.log(result[0].fields);
                this.localState.leftHand = result[0].fields.leftHand;
                this.localState.rightHand = result[0].fields.rightHand;
                this.localState.win = result[0].fields.win;
                this.rerenderState();
                setTimeout(() => {this.getGameState()}, 1000);
            });

            // this.localState.time = d
            // this.rerenderState();
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiSetHand(handString, handNumber) {
        this.isGameId();
        let https = require('https')
        let options;
        let whichHand = "left";
        if (handNumber === 1) {
            whichHand = "right";
        }
        let codeForHand;
        if (handString === "Rock") {
            codeForHand = 1;
        } else if (handString === "Paper") {
            codeForHand = 2;
        } else if (handString === "Scissors") {
            codeForHand = 3;
        } else {
            window.alert("ERROR");
            return;
        }
        let path = '/rps/' + this.gameId + '/' + whichHand + '/' + codeForHand + '/';
        options = {
            hostname: this.hostname,
            port: this.portNumber,
            path: path,
            method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiReset() {
        const https = require('https')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/rps/' + this.gameId + '/reset/',
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                this.displayHands = false;
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    isGameId() {
        if (this.gameId) return true;
        return false;
    }


    setGameId(gameId) {
        const parsedInt = parseInt(gameId, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Must be a valid integer.")
            return
        }
        const http = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/rps/' + gameId + '/checkId/',
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
                if (body == "ID GOOD") {
                    this.updateMessage("Game ID updated to " + gameId);
                    this.gameId = gameId;
                } else if (body === "ID BAD") {
                    this.updateMessage("GAME ID BAD. NOT UPDATED");
                }
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    setPlayerNumber(playerNumber) {
        if (playerNumber === 0 || playerNumber === 1) {
            this.playerNumber = playerNumber;
        }
        this.playerNumber = playerNumber;
    }

    createNewGame() {
        const http = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/rps/createGame/',
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
                this.updateMessage("New game created! Game ID is " + body);
                this.gameId = body;
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
        // this.gameId = gameId;
    }

    toggleHidden() {
        this.displayHands = !this.displayHands;
    }

    render() {
        return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <p>Left Hand: {this.displayHands ? this.state.leftHand : "Hidden"}</p>
                        <p>Right Hand: {this.displayHands ? this.state.rightHand : "Hidden"}</p>
                        <p>Win: {this.displayHands ? this.state.win : "Hidden"}</p>
                        <button onClick={() => this.evaluateGame()}>Evaluate</button>
                        <button onClick={() => { this.apiReset() }}>Reset</button>
                        <h1>Left Hand Moves</h1>
                        <button onClick={() => {this.apiSetHand("Rock", 0)}}>Rock</button>
                        <button onClick={() => {this.apiSetHand("Paper", 0)}}>Paper</button>
                        <button onClick={() => {this.apiSetHand("Scissors", 0)}}>Scissors</button>
                        <h1>Right Hand Moves</h1>
                        <button onClick={() => this.apiSetHand("Rock", 1)}>Rock</button>
                        <button onClick={() => this.apiSetHand("Paper", 1)}>Paper</button>
                        <button onClick={() => this.apiSetHand("Scissors", 1)}>Scissors</button>
                        <div>
                            <button onClick={() => this.toggleHidden()}>Toggle Hidden</button>
                        </div>
                        {/* <div>...</div>
                        <div>
                            <button onClick={() => {this.getGameState()}}>Request Game State</button>
                            <button onClick={() => {this.rerenderState()}}>Rerender</button>
                        </div> */}
                        <div><b>Configure Game</b></div>
                        <div>
                            Game Number
                            <input type="text" id="gameArea"></input>
                            <button onClick={() => this.setGameId(document.getElementById("gameArea").value)}>Set Game ID</button>
                        </div>
                        <div>
                            <button onClick={() => this.createNewGame()}>Create New Game</button>
                        </div>
                    </Col>
                    <Col>
                            <div>
                                <h3>Game History</h3>
                                <p>Message  0: {this.state.message[0]}</p>
                                <p>Message -1: {this.state.message[1]}</p>
                                <p>Message -2: {this.state.message[2]}</p>
                                <p>Message -3: {this.state.message[3]}</p>
                                <p>Message -4: {this.state.message[4]}</p>
                                <p>Message -5: {this.state.message[5]}</p>
                            </div>
                    </Col>
                </Row>
            </Container>
        </div>
        );

    }
    }

export default RPS;