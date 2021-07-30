import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Shogun extends Component {
    state = {
        dice: ["none", "none", "none", "none", "none", "none"],
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        hands: ["none", "none", "none", "none"],
        buyCards: ["none", "none", "none"],
        deck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        setAsideCard: "none",
        doShuffle: false
    }

    componentDidMount() {
        this.setup()
    }

    setup() {
        if (this.state.doShuffle) {
            console.log("Shuffling")
        } else {
            console.log("Not shuffling.")
        }
    }

    render() {
        return(
            <div>
                <h1>Shogun of Edo</h1>
                <button>none</button>
                <button>none</button>
                <button>none</button>
                <button>none</button>
                <button>none</button>
                <button>none</button>
                <h3>Game History</h3>
                <p>Message  0: {this.state.message[0]}</p>
                <p>Message -1: {this.state.message[1]}</p>
                <p>Message -2: {this.state.message[2]}</p>
                <p>Message -3: {this.state.message[3]}</p>
                <p>Message -4: {this.state.message[4]}</p>
                <p>Message -5: {this.state.message[5]}</p>
            </div>
        )
    }
}

export default Shogun;