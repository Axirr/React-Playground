import React, { Component } from 'react';

class Game extends Component {
    localState = {

    }

    state = {

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
            console.log(result[i]);
            if (result[i] === '0') {
                result[i] = false;
            } else if (result[i] === '1'){
                result[i] = true;
            } else {
                console.log("Error parsing boolean");
            }
        }
        // console.log(result);
        return result;
    }
}

export default Game;