import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Shogun extends Component {

    constructor(props) {
        super(props)
    }

    winPoints = 20
    startHealth = 5
    withSpoof = false

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
        health: [this.startHealth,this.startHealth,this.startHealth,this.startHealth],
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
        health: [this.startHealth,this.startHealth,this.startHealth,this.startHealth],
        energy: [0,0,0,0],
        tokyo: 0,
        bayTokyo: 0,
        remainingRolls: 3
    }

    componentDidMount() {
        console.log(this.props.initialData)
        if (!this.props.initialData) {
            this.setup(4)
        } else {
            this.localState = this.props.initialData
            this.rerenderState()
        }
        if (this.props.withSpoof) {
            this.withSpoof = this.props.withSpoof
        }
    }

    setup(numberPlayers) {
        var newDice = ["none", "none", "none", "none", "none", "none"]
        var newSaved = [false, false, false, false, false, false]
        var newHands = []
        var newPlayers = []
        var newDeck = ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"]
        if (this.localState.doShuffle) {
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
            newHealth.push(this.startHealth)
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
        var currentIndex = this.localState.playersInGame.indexOf(this.state.currentTurn)
        if (currentIndex === -1) {
            var potentialPlayers = []
            for (var i = 1; i < this.localState.totalNumberOfPlayers; i++) {
                var player = i + this.localState.currentTurn 
                if (player <= this.localState.totalNumberOfPlayers) {
                    potentialPlayers.push(player)
                } else {
                    potentialPlayers.push(player % this.localState.totalNumberOfPlayers)
                }
            }
            console.log("Ordered player list")
            console.log(potentialPlayers)
            nextClosestPlayer = this.localState.playersInGame[0]
            for (var i = 0; i < potentialPlayers.length; i++) {
                if (this.localState.playersInGame.indexOf(potentialPlayers[i]) !== -1) {
                    console.log("Next player is " + potentialPlayers[i])
                    nextClosestPlayer = potentialPlayers[i]
                    break
                }
            }
        } else {
            nextClosestPlayer = this.localState.playersInGame[(currentIndex + 1) % this.state.playersInGame.length] 
        }
        this.localState['currentTurn'] = nextClosestPlayer
        this.resetRolls()
        this.startTurnProcedures()
    }

    startTurnProcedures() {
        if (this.inTokyo(this.localState.currentTurn)) {
            this.updateMessage("Player " + this.localState.currentTurn + " gets 2 points for starting in Tokyo.")
            this.addPoints(this.localState.currentTurn, 2)
        }
        this.rerenderState()
    }

    addPoints(player, newPoints) {
        this.localState.points[player - 1] += newPoints
        this.checkPointsWin()
    }

    checkPointsWin() {
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            let playerToCheck = this.localState.playersInGame[i]
            if (this.localState.points[playerToCheck - 1] >= this.winPoints) {
                window.alert("Player " + playerToCheck + " wins!")
                this.rerenderState()
                break;
            }
        }
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
        var damage = 0;
        var count = this.count(this.localState.dice, '1')
        if (count >= 3) pointsToAdd += count - 2
        count = this.count(this.localState.dice, '2')
        if (count >= 3) pointsToAdd += count - 1
        count = this.count(this.localState.dice, '3')
        if (count >= 3) pointsToAdd += count 
        count = this.count(this.localState.dice, 'energy')
        energyToAdd += count
        count = this.count(this.localState.dice, 'heart')
        if (!this.inTokyo(this.localState.currentTurn)) healthToAdd = count
        count = this.count(this.localState.dice, 'claw')
        damage += count
        this.addPoints(this.localState.currentTurn, pointsToAdd)
        // this.localState.points[this.localState.currentTurn - 1] += pointsToAdd
        this.localState.energy[this.localState.currentTurn - 1] += energyToAdd
        this.localState.health[this.localState.currentTurn - 1] = Math.min(this.localState.health[this.localState.currentTurn - 1] + healthToAdd, 10)
        console.log("points to add")
        console.log(pointsToAdd)
        console.log("energy to add")
        console.log(energyToAdd)
        console.log("health to add")
        console.log(healthToAdd)
        console.log("damage to deal")
        console.log(damage)
        this.updateMessage("Player " + this.localState.currentTurn + " earns " + pointsToAdd + " points, " + energyToAdd + " energy, " + healthToAdd 
        + " health, and deals " + damage + " damage.")
        this.attack(damage)
        this.checkElim()
        if (damage > 0) {
            if (this.localState.tokyo === 0) {
                this.localState.tokyo = this.localState.currentTurn
                this.updateMessage("Player " + this.localState.currentTurn + " goes into Tokyo.")
            }
            // Fix for both and yield
        }
        this.advanceTurn()
        this.rerenderState()
    }

    checkElim() {
        let playersToElim = []
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            let playerToCheck = this.localState.playersInGame[i]
            if (this.localState.health[playerToCheck - 1] <= 0) {
                playersToElim.push(playerToCheck)
                console.log("Player " + playerToCheck + " dies.")
            } else {
                console.log("Player " + playerToCheck + " survives.")
            }
        }
        for (let i = 0; i < playersToElim.length; i++) {
            this.eliminatePlayer(playersToElim[i])
        }
        if (this.localState.playersInGame.length === 1) {
            window.alert("Player " + this.localState.playersInGame[0] + " wins!")
        }
    }

    eliminatePlayer(player) {
        const playerIndex = this.localState.playersInGame.indexOf(player)
        this.localState.playersInGame.splice(playerIndex, 1)
        if (this.inTokyo(player)) {
            this.removeFromTokyo(player)
        }
        this.updateMessage("Player " + player + " is eliminated!")
    }

    removeFromTokyo(player) {
        if (this.localState.tokyo === player) {
            this.localState.tokyo = 0
        } else if (this.localState.bayTokyo === player) {
            this.localState.bayTokyo = 0
        }
    }

    attack(damage) {
        let damageBool = true
        if (this.inTokyo(this.localState.currentTurn)) {
            damageBool = false
            console.log("Looking for not in Tokyo")
        }
        let playersToDamage = []
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            if (this.inTokyo(this.localState.playersInGame[i]) == damageBool) {
                console.log("Player " + this.localState.playersInGame[i])
                playersToDamage.push(this.localState.playersInGame[i])
            }
        }
        for (let i = 0; i < playersToDamage.length; i++) {
            this.localState.health[playersToDamage[i] - 1] -= damage
        }
    }

    rerenderState(handler = () => {}) {
        this.setState(this.localState, handler)
    }

    inTokyo(playerNumber) {
        if (this.localState.playersInGame.length <= 4) {
            if (playerNumber !== this.localState.tokyo) return false
        } else {
            if (playerNumber !== this.localState.tokyo && playerNumber !== this.localState.bayTokyo) return false
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
                    Score: {this.localState.points[number - 1]}
                    Health: {this.localState.health[number - 1]}
                    Energy: {this.localState.energy[number - 1]}
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

    spoofDice(diceArray) {
        this.localState.dice = diceArray
        this.rerenderState(() => {
            this.resolveRoll()
        })
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
                            <p>Current Turn: Player {this.state.currentTurn}</p>
                            <p>Remaining Rolls: {this.state.remainingRolls}</p>
                            <p>In Tokyo: {this.state.tokyo}</p>
                            <button id="roll" onClick={() => {this.roll()}}>Roll</button>
                            <button id="resolveRoll" onClick={() => {this.resolveRoll()}}>Lock-in Roll</button>
                            <p>Players in game: {JSON.stringify(this.state.playersInGame)}</p>
                            <p>Change player numbers and restart game.</p>
                            <button onClick={() => {this.setup(2)}}>2 Players</button>
                            <button onClick={() => {this.printState()}}>Print State</button>
                            <button onClick={() => this.printLocalState()}>Print Local State</button>
                            <div>
                                {this.withSpoof && 
                                <div>
                                <button id="spoof3" onClick={() => this.spoofDice(["3","3","3","1","2","2"])}>Spoof Dice 333</button>
                                <button id="spoofClaw" onClick={() => this.spoofDice(["claw","3","3","1","2","2"])}>Spoof Dice One Claw</button>
                                <button id="spoofNone" onClick={() => this.spoofDice(["1","1","2","2","3","3"])}>Spoof Dice One Claw</button>
                                <button id="spoof6Claw" onClick={() => this.spoofDice(["claw","claw","claw","claw","claw","claw"])}>Spoof Dice One Claw</button>
                                <button id="spoofHeart" onClick={() => this.spoofDice(["heart","1","1","2","2","3"])}>Spoof Dice One Claw</button>
                                </div>
    }
                            </div>
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