import React, {Component} from 'react';
import Game from '../Game'
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DeepSeaDiving extends Game {
    constructor(props) {
        super(props)
    }

    winPoints = 20
    maxHealth = 10
    startEnergy = 0
    withSpoof = false
    canBuy = false
    canYield = false
    buttonPhase = 0
    maxPlayers = 4
    doShuffle = false

    localState = {
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        savedTreasure: [[],[],[],[]],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        points: [0,0,0,0],
    }

    state = {
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        savedTreasure: [[],[],[],[]],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        points: [0,0,0,0],
    }

    componentDidMount() {
        this.setup()
    }

    setup() {

    }

    renderScoreBoards() {
        return(
            <div>

            </div>
        )
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Deep Sea Diving</h1>
                            {this.renderScoreBoards()}
                            <div>Current Turn: Player {this.state.currentTurn}</div>
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
                            <div>
                                <h3>Short Rules</h3>
                            </div>
                            <div>
                                <h3>Configure Game</h3>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DeepSeaDiving;