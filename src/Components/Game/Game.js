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