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
}

export default Game;