import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Shogun extends Component {

    localState = {
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
        bayTokyo: 0,
        remainingRolls: 3
    }

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
        bayTokyo: 0,
        remainingRolls: 3
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
            bayTokyo: 0,
            remainingRolls: 3
        }, () => {
            this.localState = JSON.parse(JSON.stringify(this.state))
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
        if (this.localState.remainingRolls <= 0) {
            window.alert("No rolls left!")
            return
        }
        var numberOfDice = 6
        var newDice = []
        for(var i = 0; i < numberOfDice; i++) {
            if (!this.localState.saved[i]) {
                newDice.push(this.getRollResult())
            } else {
                newDice.push(this.state.dice[i])
            }
        }
        this.localState['dice'] = newDice
        this.updateMessage("Player " + this.localState.currentTurn + " rolled!")
        this.localState['remainingRolls'] -= 1
        this.rerenderState()
    }

    advanceTurn() {
        console.log("Turn advancing.")
        let nextClosestPlayer;
        var currentIndex = this.state.playersInGame.indexOf(this.state.currentTurn)
        if (currentIndex === -1) {
            var potentialPlayers = []
            for (var i = 1; i < this.state.totalNumberOfPlayers; i++) {
                var player = i + this.state.currentTurn 
                if (player <= this.state.totalNumberOfPlayers) {
                    potentialPlayers.push(player)
                } else {
                    potentialPlayers.push(player % this.state.totalNumberOfPlayers)
                }
            }
            console.log("Ordered player list")
            console.log(potentialPlayers)
            nextClosestPlayer = this.state.playersInGame[0]
            for (var i = 0; i < potentialPlayers.length; i++) {
                if (this.state.playersInGame.indexOf(potentialPlayers[i]) !== -1) {
                    console.log("Next player is " + potentialPlayers[i])
                    nextClosestPlayer = potentialPlayers[i]
                    break
                }
            }
            // this.setState({ currentTurn: nextClosestPlayer})
        } else {
            console.log("Player was found. Is that weird?")
            nextClosestPlayer = this.state.playersInGame[(currentIndex + 1) % this.state.playersInGame.length] 
        }
        this.localState['currentTurn'] = nextClosestPlayer
        this.resetRolls()
    }

    resetRolls() {
        this.localState['remainingRolls'] = 3
        console.log("Add in cards that change number of rolls")
        this.resetDiceState()
    }

    resetDiceState() {
        this.localState['saved'] = [false,false,false,false,false,false]
        this.localState['dice'] = ['none','none','none','none','none','none']
    }


    resolveRoll() {
        if (document.getElementById("dice0").innerText === "none") {
            window.alert("Cannot finish turn without rolling.")
            return
        }
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
        this.advanceTurn()
        this.rerenderState()
    }

    rerenderState() {
        this.setState(this.localState)
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
        var index = "dice" + parseInt(diceIndexNumber)
        const button = document.getElementById(index)
        if (button.innerText === "none") {
            window.alert("Cannot save an unrolled dice.")
            return
        }
        var copySaved = this.state.saved
        copySaved[diceIndexNumber] = !copySaved[diceIndexNumber]
        this.localState['saved'] = copySaved
        this.rerenderState()
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

    updateMessage(newMessage) {
        console.log("Updating message")
        var messageCopy = this.localState.message
        for (var i = 0; i < (messageCopy.length - 1); i++) {
            messageCopy[i] = messageCopy[i+1]
        }
        messageCopy[messageCopy.length - 1] = newMessage
        this.localState['message'] = messageCopy
    }

    printState() {
        console.log(this.state)
    }

    printLocalState() {
        console.log(this.localState)
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Shogun of Edo</h1>
                            <button id="dice0" class={this.state.saved[0] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(0)}}>{this.state.dice[0]}</button>
                            <button id="dice1" class={this.state.saved[1] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(1)}}>{this.state.dice[1]}</button>
                            <button id="dice2" class={this.state.saved[2] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(2)}}>{this.state.dice[2]}</button>
                            <button id="dice3" class={this.state.saved[3] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(3)}}>{this.state.dice[3]}</button>
                            <button id="dice4" class={this.state.saved[4] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(4)}}>{this.state.dice[4]}</button>
                            <button id="dice5" class={this.state.saved[5] ? "btn-success" : "btn-danger"} onClick={() => {this.toggleSave(5)}}>{this.state.dice[5]}</button>
                            {this.renderScoreBoards()}
                            <p>Current Turn: {this.state.currentTurn}</p>
                            <p>Remaining Rolls: {this.state.remainingRolls}</p>
                            <button id="roll" onClick={() => {this.roll()}}>Roll</button>
                            <button onClick={() => {this.resolveRoll()}}>Lock-in Roll</button>
                            <p>Change player numbers and restart game.</p>
                            <button onClick={() => {this.setup(2)}}>2 Players</button>
                            <button onClick={() => {this.printState()}}>Print State</button>
                            <button onClick={() => this.printLocalState()}>Print Local State</button>
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