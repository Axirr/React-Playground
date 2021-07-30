import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Shogun extends Component {
    state = {
        dice: ["none", "none", "none", "none", "none", "none"],
        saved: [false, false, false, false, false, false],
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        hands: [[],[],[],[]],
        buyCards: ["none", "none", "none"],
        deck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        doShuffle: false,
        points: [0,0,0,0],
        health: [10,10,10,10],
        energy: [0,0,0,0],
        tokyo: 0,
        bayTokyo: 0
    }

    componentDidMount() {
        this.setup(4)
    }

    setup(numberPlayers) {
        var newDice = ["none", "none", "none", "none", "none", "none"]
        var newSaved = [false, false, false, false, false, false]
        var newHands = []
        var newPlayers = []
        var newDeck = ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"]
        if (this.state.doShuffle) {
            console.log("Shuffling")
            newDeck = this.returnShuffledDeck(newDeck)
        } else {
            console.log("Not shuffling.")
        }
        var buyCards = ["none","none","none"]
        var newPoints = []
        var newHealth = []
        var newEnergy = []
        for (var i = 0; i < numberPlayers; i++) {
            newPlayers.push(i + 1)
            newHands.push([])
            newPoints.push(0)
            newHealth.push(10)
            newEnergy.push(0)
        }
        this.setState({
            dice: newDice,
            saved: newSaved,
            playersInGame: newPlayers,
            currentTurn: 1,
            buyCards: buyCards,
            deck: newDeck,
            points: newPoints,
            health: newHealth,
            energy: newEnergy,
            tokyo: 0,
            bayTokyo: 0
        })

    }

    returnShuffledDeck(deck) {
        var tempDeck = [...deck]
        var shuffledDeck = []
        while (true) {
            var n = tempDeck.length
            var index = Math.floor(Math.random() * n)
            shuffledDeck.push(tempDeck.splice(index, 1)[0])
            n -= 1
            if (n === 0) {
                break
            }
        }
        return shuffledDeck
    }

    roll() {
        var numberOfDice = 6
        var newDice = []
        for(var i = 0; i < numberOfDice; i++) {
            if (!this.state.saved[i]) {
                newDice.push(this.getRollResult())
            } else {
                newDice.push(this.state.dice[i])
            }
        }
        this.setState( {
            dice: newDice
        })
    }

    resolveRoll() {
        var pointsToAdd = 0;
        var energyToAdd = 0;
        var healthToAdd = 0;
        var count = this.count(this.state.dice, '1')
        if (count >= 3) pointsToAdd += count - 2
        count = this.count(this.state.dice, '2')
        if (count >= 3) pointsToAdd += count - 1
        count = this.count(this.state.dice, '3')
        if (count >= 3) pointsToAdd += count 
        count = this.count(this.state.dice, 'energy')
        energyToAdd += count
        count = this.count(this.state.dice, 'heart')
        if (!this.inTokyo(this.state.currentTurn)) healthToAdd = count
        console.log("points to add")
        console.log(pointsToAdd)
        console.log("energy to add")
        console.log(energyToAdd)
        console.log("health to add")
        console.log(healthToAdd)
    }

    inTokyo(playerNumber) {
        if (this.state.playersInGame.length <= 4) {
            if (playerNumber !== this.state.tokyo) return false
        } else {
            if (playerNumber !== this.state.tokyo && playerNumber !== this.state.bayTokyo) return false
        }
        return true
    }

    count(myArray, item) {
        var count = 0
        for(var i = 0; i < myArray.length; i++) {
            if (myArray[i] === item) count++
        }
        return count
    }

    getRollResult() {
        const numberOfDice = 6
        var rollNumber = Math.floor(Math.random() * numberOfDice)
        console.log(rollNumber)
        return(this.getNameForRollNumber(rollNumber))
    }

    toggleSave(diceIndexNumber) {
        var copySaved = this.state.saved
        copySaved[diceIndexNumber] = !copySaved[diceIndexNumber]
        this.setState(
            {saved: copySaved}
        )
    }

    getNameForRollNumber(rollNumber) {
        var rollName = "default"
        switch(rollNumber) {
            case 0:
                rollName = "claw"
                break;
            case 1:
                rollName = "energy"
                break;
            case 2:
                rollName = "heart"
                break;
            case 3:
                rollName = "1"
                break;
            case 4:
                rollName = "2"
                break;
            case 5:
                rollName = "3"
                break;
            default:
                console.log("ERROR, UNIDENTIFIED ROLL")
        }
        return rollName
    }

    renderScoreBoards() {
        return(
            <div>
                {this.state.playersInGame.map((number) => {
                    return(<div>Player {number}
                    Score: {this.state.points[number - 1]}
                    Health: {this.state.health[number - 1]}
                    Energy: {this.state.energy[number - 1]}
                    </div>)
                })}
            </div>
        )
    }

    printState() {
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Shogun of Edo</h1>
                            <button class={this.state.saved[0] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(0)}}>{this.state.dice[0]}</button>
                            <button class={this.state.saved[1] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(1)}}>{this.state.dice[1]}</button>
                            <button class={this.state.saved[2] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(2)}}>{this.state.dice[2]}</button>
                            <button class={this.state.saved[3] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(3)}}>{this.state.dice[3]}</button>
                            <button class={this.state.saved[4] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(4)}}>{this.state.dice[4]}</button>
                            <button class={this.state.saved[5] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(5)}}>{this.state.dice[5]}</button>
                            {this.renderScoreBoards()}
                            <button onClick={() => {this.roll()}}>Roll</button>
                            <button onClick={() => {this.resolveRoll()}}>Lock-in Roll</button>
                            <p>Change player numbers and restart game.</p>
                            <button onClick={() => {this.setup(2)}}>2 Players</button>
                            <button onClick={() => {this.printState()}}>Print State</button>
                        </Col>
                        <Col>
                            <h3>Game History</h3>
                            <p>Message  0: {this.state.message[0]}</p>
                            <p>Message -1: {this.state.message[1]}</p>
                            <p>Message -2: {this.state.message[2]}</p>
                            <p>Message -3: {this.state.message[3]}</p>
                            <p>Message -4: {this.state.message[4]}</p>
                            <p>Message -5: {this.state.message[5]}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Shogun;