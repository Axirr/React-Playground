import React, { Component } from 'react';

class Game extends Component {
    localState = {

    }

    state = {

    }

    rerenderState(handler = () => {}) {
        this.setState(this.localState, handler)
    }

}

export default Game;