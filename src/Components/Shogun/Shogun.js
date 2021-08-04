import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Shogun extends Component {

    constructor(props) {
        super(props)
    }

    winPoints = 20
    startHealth = 10
    startEnergy = 0
    withSpoof = false
    canBuy = false
    canYield = false
    buttonPhase = 0

    cards = [
        {'name': 'Friend of Children', 'cost':	3, 'type': 'keep', 'ability':	'When you gain energy, gain an additional energy.'},
        {'name': 'Acid Attack', 'cost':	6, 'type': 'keep', 'ability':	"Deal one extra damage (even when you don't attack)"},
        {'name': 'Alien Metabolism', 'cost':	3, 'type': 'keep', 'ability':	'Buying cards costs you 1 less energy'},
        {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},
        {'name': 'Commuter Train', 'cost': 4, 'type': 'discard', 'ability': '+ 2[Star]'},
        {'name': 'Corner Store', 'cost': 3, 'type': 'discard', 'ability': '+ 1[Star]'},
        {'name': 'Complete Destruction', 'cost': 3, 'type': 'keep', 'ability': 'If you roll [1][2][3][Heart][Attack][Energy] gain 9[Star] in addition to the regular results.'},
        {'name': 'Energy Hoarder', 'cost': 3, 'type': 'keep', 'ability': 'You gain 1[Star] for every 6[Energy] you have at the end of your turn.'},
    ]

    localState = {
        dice: ["none", "none", "none", "none", "none", "none"],
        saved: [false, false, false, false, false, false],
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        hands: [[],[],[],[]],
        buyCards: ["none", "none", "none"],
        deck: this.cards,
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        doShuffle: true,
        points: [0,0,0,0],
        health: [this.startHealth,this.startHealth,this.startHealth,this.startHealth],
        energy: [0,0,0,0],
        tokyo: 0,
        bayTokyo: 0,
        remainingRolls: 3,
    }

    state = {
        dice: ["none", "none", "none", "none", "none", "none"],
        saved: [false, false, false, false, false, false],
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        hands: [[],[],[],[]],
        buyCards: ["none", "none", "none"],
        deck: this.cards,
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        doShuffle: true,
        points: [0,0,0,0],
        health: [this.startHealth,this.startHealth,this.startHealth,this.startHealth],
        energy: [0,0,0,0],
        tokyo: 0,
        bayTokyo: 0,
        remainingRolls: 3,
    }

    componentDidMount() {
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
        this.canBuy = false
        this.canYield = false
        this.buttonPhase = 0
        var newDice = ["none", "none", "none", "none", "none", "none"]
        var newSaved = [false, false, false, false, false, false]
        var newHands = []
        var newPlayers = []
        var newDeck = this.localState.deck
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
            newEnergy.push(this.startEnergy)
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
            this.rerenderState()
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
        if (this.buttonPhase !== 0) {
            window.alert("Not the rolling phase right now.")
            return
        }
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
        // this.updateMessage("Player " + this.localState.currentTurn + " rolled!")
        this.localState['remainingRolls'] -= 1
        this.rerenderState()
    }

    advanceTurn() {
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
        if (this.hasCard(this.localState.currentTurn, "Energy Hoarder")) {
            this.updateMessage("Energy Hoarder activated.")
            const energyToAdd = Math.floor(this.localState.energy[this.localState.currentTurn - 1] / 6)
            console.log("energy" + energyToAdd)
            this.addEnergy(this.localState.currentTurn, energyToAdd)
            this.rerenderState()
        }
        this.buttonPhase = 0
        this.rerenderState()
        this.canBuy = false
        this.canYield = false
    }

    addPoints(player, newPoints) {
        this.localState.points[player - 1] += newPoints
        this.updateMessage("Player " + player + " earns " + newPoints + " points.")
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
        console.log("Add in cards that change number of rolls and change number of dice")
        this.resetDiceState()
    }

    resetDiceState() {
        this.localState['saved'] = [false,false,false,false,false,false]
        this.localState['dice'] = ['none','none','none','none','none','none']
    }


    resolveRoll() {
        if (this.buttonPhase !== 0) {
            window.alert("Not the rolling phase right now.")
            return
        }
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
        this.addEnergy(this.localState.currentTurn, energyToAdd)
        this.localState.health[this.localState.currentTurn - 1] = Math.min(this.localState.health[this.localState.currentTurn - 1] + healthToAdd, 10)
        // this.updateMessage("Player " + this.localState.currentTurn + " earns " + pointsToAdd + " points, " + energyToAdd + " energy, " + healthToAdd 
        // + " health, and deals " + damage + " damage.")
        this.attack(damage)
        this.checkElim()
        if (damage > 0) {
            if (this.localState.playersInGame.length <= 4) {
                if (this.localState.tokyo === 0) {
                    this.enterTokyo(this.localState.currentTurn)
                }
                if (!this.onlyCurrentPlayerInTokyo()) {
                    this.canYield = true
                }
            } else {
                window.alert("Implement yield for double tokyo")
            }
            // Fix for both and yield
        }
        // if (this.hasCard(this.localState.currentTurn, "Complete Destruction")) {
        if (true) {
            let diceFaces = ['claw','heart','energy', '1','2','3']
            let diceCounts = diceFaces.map((face) => {
                return this.count(this.localState.dice, face)
            })
            console.log(diceCounts)
            if (this.count(diceCounts, 1) === 6) {
                this.updateMessage("Player " + this.localState.currentTurn + " earns 9 points for COMPLETE DESTRUCTION!")
                this.addPoints(this.localState.currentTurn, 9)
            }
        }
        this.canBuy = true
        this.rerenderState()
        if (this.canYield) {
            this.buttonPhase = 1
        } else {
            this.buttonPhase = 2
        }
    }

    addEnergy(player, energyToAdd) {
        if (this.hasCard(player, "Friend of Children")) energyToAdd += 1
        this.localState.energy[player - 1] += energyToAdd
    }

    hasCard(player, cardName) {
        const playerHand = this.localState.hands[player - 1]
        for (let i = 0; i < playerHand.length; i++) {
            if (playerHand[i]['name'] === cardName) {
                return true
            }
        }
        return false
    }

    enterTokyo(player) {
        this.localState.tokyo = player
        this.updateMessage("Player " + this.localState.currentTurn + " goes into Tokyo.")
        this.addPoints(player, 1)
    }

    enterBayTokyo(player) {
        this.localState.bayTokyo = player
        this.updateMessage("Player " + this.localState.currentTurn + " goes into Tokyo Bay.")
        this.addPoints(player, 1)
    }

    onlyCurrentPlayerInTokyo() {
        return (this.localState.tokyo === this.localState.currentTurn || this.localState.tokyo === 0) && (this.localState.bayTokyo === this.localState.currentTurn || this.localState.bayTokyo === 0)
    }

    checkElim() {
        let playersToElim = []
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            let playerToCheck = this.localState.playersInGame[i]
            if (this.localState.health[playerToCheck - 1] <= 0) {
                playersToElim.push(playerToCheck)
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

    isTokyoEmpty() {
        if (this.localState.playersInGame.length <= 4) {
            return this.localState.tokyo === 0 
        } else {
            return (this.localState.tokyo === 0 && this.localState.bayTokyo === 0)
        }
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
        let attackString = "Tokyo"
        if (this.hasCard(this.localState.currentTurn, "Acid Attack")) damage += 1
        if (this.inTokyo(this.localState.currentTurn)) {
            damageBool = false
            attackString = "Outside Tokyo"
        }
        this.updateMessage("Player " + this.localState.currentTurn + " deals " + damage + " damage to " + attackString + ".")
        let playersToDamage = []
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            if (this.inTokyo(this.localState.playersInGame[i]) == damageBool) {
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
        return(this.getNameForRollNumber(rollNumber))
    }

    toggleSave(diceIndexNumber) {
        if (this.buttonPhase !== 0) {
            window.alert("Not the rolling phase right now.")
            return
        }
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
                <Container>
                    <Row>
                {this.state.playersInGame.map((number) => {
                    return(
                        <Col>
                        <div class={(this.state.currentTurn === number) ? "border border-success" : "border border-danger"}>
                        <div>Player {number}</div>
                        <div>Score: {this.localState.points[number - 1]}</div>
                        <div>Health: {this.localState.health[number - 1]}</div>
                        <div>Energy: {this.localState.energy[number - 1]}</div>
                        </div>
                        </Col>)
                })}
                    </Row>
                </Container>
            </div>
        )
    }

    updateMessage(newMessage) {
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

    buy(cardNumber) {
        if (this.canYield) {
            window.alert("Deal with yield before buying.")
            return
        }
        if (this.localState.deck.length - 1 < cardNumber) {
            window.alert("Cannot buy card " + (cardNumber + 1) + " because it doesn't exist.")
            return
        }
        if (this.canBuy) {
            if (cardNumber === -1) {
                this.advanceTurn()
                this.rerenderState()
                return
            } else {
                const boughtCard = this.localState.deck[cardNumber]
                let boughtCardModifiedCost = this.getModifiedCost(this.localState.currentTurn, boughtCard['cost'])
                if (boughtCardModifiedCost > this.localState.energy[this.localState.currentTurn - 1]) {
                    window.alert('Not enough money to buy.')
                    return
                } else {
                    this.localState.energy[this.localState.currentTurn - 1] -= boughtCardModifiedCost
                    this.localState.deck.splice(cardNumber, 1)
                    if (boughtCard['type'] === 'discard') {
                        this.discardCardEffect(boughtCard)
                    } else {
                        this.localState.hands[this.localState.currentTurn - 1].push(boughtCard)
                    }
                    this.rerenderState()
                }
            }
        } else {
            window.alert("Cannot buy until you resolve your roll.")
        }
    }

    getModifiedCost(player, originalCost) {
        let returnCost = originalCost
        if (this.hasCard(player, "Alien Metabolism")) {
            returnCost -= 1
        }
        return returnCost
    }

    discardCardEffect(card) {
        switch (card['name']) {
            case 'Apartment Building':
                this.updateMessage("Player " + this.localState.currentTurn + " earns 3 points from card.")
                this.addPoints(this.localState.currentTurn, 3)
                break;
            case 'Commuter Train':
                this.updateMessage("Player " + this.localState.currentTurn + " earns 2 points from card.")
                this.addPoints(this.localState.currentTurn, 2)
                break;
            case 'Corner Store':
                this.updateMessage("Player " + this.localState.currentTurn + " earns 1 points from card.")
                this.addPoints(this.localState.currentTurn, 1)
                break;
            default:
                window.alert("ERROR: Unrecognized card.")

        }
    }

    yieldTokyo(location) {
        if (this.buttonPhase !== 1) {
            window.alert("Not yield phase.")
            return
        }
        if(!this.canYield) {
            window.alert("Can't yield, didn't take damage.")
            return
        } else {
            if (this.localState.currentTurn !== this.localState.tokyo && this.localState.currentTurn !== this.localState.bayTokyo) {
                if (location === 'tokyo') {
                    // Possibly can remove inside checks
                    if (this.localState.tokyo !== this.localState.currentTurn) {
                        this.updateMessage("Player " + this.localState.tokyo + " is yielding Tokyo.")
                        this.enterTokyo(this.localState.currentTurn)
                        // this.localState.tokyo = this.localState.currentTurn
                    } else {
                        window.alert("Can't yield Tokyo on own turn")
                    }
                } else if (location === 'bay') {
                    if (this.localState.bayTokyo !== this.localState.currentTurn) {
                        this.updateMessage("Player " + this.localState.bayTokyo + " is yielding Tokyo Bay.")
                        this.enterBayTokyo(this.localState.currentTurn)
                    } else {
                        window.alert("Can't yield Tokyo on own turn")
                    }
                }
            } else {
                window.alert("Can't yield Tokyo on own turn")
            }
        }
        this.rerenderState()
    }

    renderPlayerHands() {
        return(<Container>
                    <div class="border">
                        <Row>
                            {this.state.playersInGame.map((number) => {
                                return(
                                    <Col>
                                        Player {number} Hand: {this.renderCards(this.state.hands[number - 1])}
                                    </Col>
                            )})}
                        </Row>
                    </div>
                </Container>
        )
    }

    renderCards(hand) {
        return(
            <div>
                {hand.map((card) => {
                    return(<div class="border">
                        <div>Name: {card['name']}</div>
                        <div>Ability: {card['ability']}</div>
                    </div>)
                })}
            </div>
        )
    }

    clearBuy() {
        if (this.buttonPhase !== 2) {
            window.alert("Not buy phase.")
            return
        }
        if (this.localState.energy[this.localState.currentTurn - 1] < 2) {
            window.alert("Not enough money to clear.")
            return
        } else {
            this.addEnergy(this.localState.currentTurn, -2)
            this.localState.deck.splice(0, 3)
            this.rerenderState()
        }
    }

    printState() {
        console.log(this.state)
    }

    printLocalState() {
        console.log(this.localState)
    }

    doneYielding() {
        if (this.buttonPhase !== 1) {
            window.alert("Not yield phase.")
            return
        }
        if (this.buttonPhase !== 1) {
            return
        }
        this.canYield = false;
        this.buttonPhase = 2;
        this.rerenderState()
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Shogun of Edo</h1>
                            <button id="dice0" class={this.state.saved[0] ? "btn-secondary" : "btn-warning"} onClick={() => {this.toggleSave(0)}}>{this.state.dice[0]}</button>
                            <button id="dice1" class={this.state.saved[1] ? "btn-secondary" : "btn-warning"} onClick={() => {this.toggleSave(1)}}>{this.state.dice[1]}</button>
                            <button id="dice2" class={this.state.saved[2] ? "btn-secondary" : "btn-warning"} onClick={() => {this.toggleSave(2)}}>{this.state.dice[2]}</button>
                            <button id="dice3" class={this.state.saved[3] ? "btn-secondary" : "btn-warning"} onClick={() => {this.toggleSave(3)}}>{this.state.dice[3]}</button>
                            <button id="dice4" class={this.state.saved[4] ? "btn-secondary" : "btn-warning"} onClick={() => {this.toggleSave(4)}}>{this.state.dice[4]}</button>
                            <button id="dice5" class={this.state.saved[5] ? "btn-secondary" : "btn-warning"} onClick={() => {this.toggleSave(5)}}>{this.state.dice[5]}</button>
                            {this.renderScoreBoards()}
                            <div>Current Turn: Player {this.state.currentTurn}</div>
                            <div>Remaining Rolls: {this.state.remainingRolls}</div>
                            <div>In Tokyo: {this.state.tokyo}</div>
                            {(this.state.playersInGame.length > 4) && <p>In Tokyo Bay: {this.state.bayTokyo}</p>}
                            <div>
                                <button id="roll" class={(this.buttonPhase === 0) ? "btn-success" : "btn-danger"} onClick={() => {this.roll()}}>Roll</button>
                            </div>
                            <button id="resolveRoll" class={(this.buttonPhase === 0) ? "btn-success" : "btn-danger"} onClick={() => {this.resolveRoll()}}>Lock-in Roll</button>
                            <div>
                            <button id="yieldTokyo" class={(this.buttonPhase === 1) ? "btn-success" : "btn-danger"} onClick={() => {this.yieldTokyo('tokyo')}}>Yield Tokyo</button>
                            {(this.state.playersInGame.length > 4) && <button id="yieldBay" class={(this.buttonPhase === 1) ? "btn-success" : "btn-danger"} onClick={() => {this.yieldTokyo('bay')}}>Yield Tokyo Bay</button>}
                            <button id="doneYielding" class={(this.buttonPhase === 1) ? "btn-success" : "btn-danger"} onClick={() => {this.doneYielding()}}>Done Yielding</button>
                            </div>
                            <div>
                                <div>
                                <button id="buy0" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(0)}}>{this.localState.deck[0] ? this.localState.deck[0]['name'] + " Cost: " + this.localState.deck[0]['cost'] + " Ability: " + this.localState.deck[0]['ability'] : 'none'}</button>
                                </div>
                                <div>
                                <button id="buy1" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(1)}}>{this.localState.deck[1] ? this.localState.deck[1]['name'] + " Cost: " + this.localState.deck[1]['cost'] + " Ability: " + this.localState.deck[1]['ability'] : 'none'}</button>
                                </div>
                                <div>
                                <button id="buy2" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(2)}}>{this.localState.deck[2] ? this.localState.deck[2]['name'] + " Cost: " + this.localState.deck[2]['cost'] + " Ability: " + this.localState.deck[2]['ability'] : 'none'}</button>
                                </div>
                            </div>
                            <button id="clearBuy" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.clearBuy()}}>Pay 2 to Clear Buy Cards</button>
                            <button id="doneBuying" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(-1)}}>Done Buying</button>
                            <p>Players in game: {JSON.stringify(this.state.playersInGame)}</p>
                            {this.renderPlayerHands()}
                            <div>
                                {this.withSpoof && 
                                <div>
                                <p>Change player numbers and restart game.</p>
                                <button onClick={() => {this.setup(2)}}>2 Players</button>
                                <button onClick={() => {this.setup(5)}}>5 Players</button>
                                <button onClick={() => {this.printState()}}>Print State</button>
                                <button onClick={() => this.printLocalState()}>Print Local State</button>
                                <button id="spoof3" onClick={() => this.spoofDice(["3","3","3","1","2","2"])}>Spoof Dice 333</button>
                                <button id="spoofClaw" onClick={() => this.spoofDice(["claw","3","3","1","2","2"])}>Spoof Dice One Claw</button>
                                <button id="spoofNone" onClick={() => this.spoofDice(["1","1","2","2","3","3"])}>Spoof None</button>
                                <button id="spoof6Claw" onClick={() => this.spoofDice(["claw","claw","claw","claw","claw","claw"])}>Spoof Six Claw</button>
                                <button id="spoofHeart" onClick={() => this.spoofDice(["heart","1","1","2","2","3"])}>Spoof Heart</button>
                                <button id="spoof6Energy" onClick={() => this.spoofDice(["energy","energy","energy","energy","energy","energy"])}>Spoof 6 Energy</button>
                                <button id="spoofCompleteDestruction" onClick={() => this.spoofDice(["energy","claw","heart","1","2","3"])}>Spoof Complete Destruction</button>
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
                            <div>
                                <a href="https://cdn.1j1ju.com/medias/f9/2f/9b-king-of-tokyo-rulebook.pdf">King of Tokyo Full Rules</a>
                                <h3>Short Rules</h3>
                                <div>First to 20 points or last monster alive wins!</div>
                                <div>Roll dice up 3 (default) times, and then resolve when done. Dice can be saved between rolls.</div>
                                <div>Triple+ # dice get you points (diceValue + # over triple). Claws attack the area you're not in (Tokyo vs Outside) and put you in Tokyo if unoccupied or occupant yields to you.</div>
                                <div>Hearts heal, but not in Tokyo. Energy is money to buy cards.</div>
                                <div>If attacked in Tokyo, have the option to yield. Must press "Done Yielding" to finish phase either way.</div>
                                <div>Get 1 point when go into Tokyo. Get 2 points if start your turn in Tokyo.</div>
                                <div>Buy cards with energy. Discard cards have an immediate effect. Keep cards have a persistent effect. Click "Done Buying" to end turn.</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Shogun;