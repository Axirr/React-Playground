import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Shogun extends Component {

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

    cards = [
        {'name': 'Friend of Children', 'cost':	3, 'type': 'keep', 'ability':	'when you gain energy, gain an additional energy.'},
        {'name': 'Acid Attack', 'cost':	6, 'type': 'keep', 'ability':	"Deal one extra damage (even when you don't attack)"},
        {'name': 'Alien Metabolism', 'cost':	3, 'type': 'keep', 'ability':	'Buying cards costs you 1 less energy'},
        {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},
        {'name': 'Commuter Train', 'cost': 4, 'type': 'discard', 'ability': '+ 2[Star]'},
        {'name': 'Corner Store', 'cost': 3, 'type': 'discard', 'ability': '+ 1[Star]'},
        {'name': 'Complete Destruction', 'cost': 3, 'type': 'keep', 'ability': 'If you roll [1][2][3][Heart][Attack][Energy] gain 9[Star] in addition to the regular results.'},
        {'name': 'Energy Hoarder', 'cost': 3, 'type': 'keep', 'ability': 'You gain 1[Star] for every 6[Energy] you have at the end of your turn.'},
        {'name': 'Even Bigger', 'cost': 4, 'type': 'keep', 'ability': 'Your maximum [Heart] is increased by 2. Gain 2[Heart] when you get this card.'},
        {'name': 'Evacuation Orders', 'cost': 7, 'type': 'discard', 'ability': 'All other monsters lose 5[Star]'},
        {'name': 'Fire Blast', 'cost': 3, 'type': 'discard', 'ability': 'Deal 2 damage to all other monsters'},
        {'name': 'Giant Brain', 'cost': 5, 'type': 'keep', 'ability': 'Get an extra reroll each turn.'},
        {'name': 'Heal', 'cost': 3, 'type': 'discard', 'ability': 'Heal 2 health.'},
        {'name': 'Herbivore', 'cost': 5, 'type': 'keep', 'ability': "Gain 1 point on your turn if you don't attack anyone."},
        {'name': 'Gas Refinery', 'cost': 6, 'type': 'discard', 'ability': "Gain 2[Star] and deal 3 damage to all other monsters."},
        {'name': 'Gourmet', 'cost': 4, 'type': 'keep', 'ability': "When scoring [1][1][1], score 3"},
        {'name': 'High Altitude Bombing', 'cost': 4, 'type': 'discard', 'ability': "All monsters (including you) take 3 damage."},
        {'name': 'Jet Fighters', 'cost': 5, 'type': 'discard', 'ability': "+5[Star] and take 4 damage."},
        {'name': 'National Guard', 'cost': 3, 'type': 'discard', 'ability': "+2[Star] and take 2 damage."},
        {'name': 'Nova Breath', 'cost': 7, 'type': 'keep', 'ability': "Your attacks damage all other players."},
        {'name': 'Nuclear Power Plant', 'cost': 6, 'type': 'discard', 'ability': "+2[Star] and heal 3 damage."},
        {'name': 'Omnivore', 'cost': 4, 'type': 'keep', 'ability': "Can score [1][2][3] for 2 points once per turn. Can still use dice in other combos."},
        {'name': 'Regeneration', 'cost': 4, 'type': 'keep', 'ability': "When you heal, heal one extra damage."},
        {'name': 'Rooting For The Underdog', 'cost': 3, 'type': 'keep', 'ability': "At the end of a turn where you have the fewest points, gain a point."},
        {'name': 'Skyscraper', 'cost': 6, 'type': 'discard', 'ability': "Gain 4[Star]."},
        {'name': 'Spiked Tail', 'cost': 5, 'type': 'keep', 'ability': "When you attack, do 1 additional damage."},
        {'name': 'Solar Powered', 'cost': 2, 'type': 'keep', 'ability': "At the end your turn, if you have 0 energy, gain 1 energy."},
        {'name': 'Tanks', 'cost': 4, 'type': 'discard', 'ability': "+4 Points and take 3 damage."},
        {'name': 'Urbavore', 'cost': 4, 'type': 'keep', 'ability': "Gain 1 extra point when starting a turn in Edo. Deal 1 extra damage when dealing damage from Tokyo."},
        {'name': "We're Only Making It Stronger", 'cost': 3, 'type': 'keep', 'ability': "When you lost 2 health, gain 1 energy."},
        {'name': "Amusement Park", 'cost': 6, 'type': 'discard', 'ability': "+4 Points"},
        {'name': "Army", 'cost': 2, 'type': 'discard', 'ability': "+1 point and take a damage for every card you have."},
        {'name': "Cannibalistic", 'cost': 5, 'type': 'keep', 'ability': "When you deal damage, gain 1 point."},
        {'name': "Reflective Hide", 'cost': 6, 'type': 'keep', 'ability': "If you suffer damage, the monster that dealt it suffers 1 damage."},
        {'name': "Throw A Tanker", 'cost': 4, 'type': 'keep', 'ability': "On a turn you deal 3 or more damage, gain 2 points."},
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
        health: [this.maxHealth,this.startHealth,this.startHealth,this.startHealth],
        energy: [0,0,0,0],
        edo: 0,
        bayEdo: 0,
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
        health: [this.maxHealth,this.startHealth,this.startHealth,this.startHealth],
        energy: [0,0,0,0],
        edo: 0,
        bayEdo: 0,
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
            newHealth.push(this.maxHealth)
            newEnergy.push(this.startEnergy)
        }
        this.setState({
            dice: newDice,
            saved: newSaved,
            playersInGame: newPlayers,
            currentTurn: 1,
            hands: newHands,
            buyCards: buyCards,
            deck: newDeck,
            points: newPoints,
            health: newHealth,
            energy: newEnergy,
            edo: 0,
            bayEdo: 0,
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
        this.endTurnSelfProcedures()
        this.localState['currentTurn'] = nextClosestPlayer
        this.endTurnAllProcedures()
        this.startTurnProcedures()
    }

    endTurnSelfProcedures() {
        if (this.hasCard(this.localState.currentTurn, "Solar Powered")) {
            if (this.localState.energy[this.localState.currentTurn - 1] === 0) {
                this.updateMessage("Solar Powered activated.")
                this.addEnergy(this.localState.currentTurn, 1)
            }
        }
        if (this.hasCard(this.localState.currentTurn, "Energy Hoarder") && this.localState.energy[this.localState.currentTurn - 1] >= 6) {
            this.updateMessage("Energy Hoarder activated.")
            const energyToAdd = Math.floor(this.localState.energy[this.localState.currentTurn - 1] / 6)
            console.log("energy" + energyToAdd)
            this.addEnergy(this.localState.currentTurn, energyToAdd)
            this.rerenderState()
        }
    }

    endTurnAllProcedures() {
        this.rootingForUnderdog()
    }

    rootingForUnderdog() {
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            if (this.hasCard(this.localState.playersInGame[i], "Rooting For The Underdog")) {
                let underdogPoints = this.localState.points[this.localState.playersInGame[i] - 1]
                for (let j = 0; j < this.localState.playersInGame.length; j++) {
                    if (this.localState.playersInGame[i] !== this.localState.playersInGame[j]) {
                        if (this.localState.points[this.localState.playersInGame[j] - 1] <= underdogPoints) {
                            break
                        }
                    }
                    if (j === (this.localState.playersInGame.length - 1)) {
                        this.updateMessage("Underdog activated.")
                        this.addPoints(this.localState.playersInGame[i], 1)
                    }
                }
            }
        }
    }

    startTurnProcedures() {
        if (this.inEdo(this.localState.currentTurn)) {
            let pointsToEarn = 2
            if (this.hasCard(this.localState.currentTurn, "Urbavore")) {
                pointsToEarn += 1
            }
            this.updateMessage("Player " + this.localState.currentTurn + " gets " + pointsToEarn + " points for starting in Edo.")
            this.addPoints(this.localState.currentTurn, pointsToEarn)
        }
        this.resetRolls()
        this.buttonPhase = 0
        this.rerenderState()
        this.canBuy = false
        this.canYield = false
    }

    addPoints(player, newPoints) {
        if (this.localState.playersInGame.indexOf(player) === -1) {
            console.log("Can't add points to a dead player.")
            return
        }
        const originalPoints = this.localState.points[player - 1]
        let newPointValue = Math.max(this.localState.points[player - 1] + newPoints,0)
        this.localState.points[player - 1] = newPointValue
        if (newPointValue !== originalPoints) {
            this.updateMessage("Player " + player + " earns " + newPoints + " points.")
        }
        this.checkPointsWin()
    }

    checkPointsWin() {
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            let playerToCheck = this.localState.playersInGame[i]
            if (this.localState.points[playerToCheck - 1] >= this.winPoints) {
                if (this.localState.health[playerToCheck - 1] > 0) {
                    window.alert("Player " + playerToCheck + " wins!")
                    this.rerenderState()
                }
                break;
            }
        }
    }

    resetRolls() {
        if (this.hasCard(this.localState.currentTurn, "Giant Brain")) {
            this.localState['remainingRolls'] = 4
        } else {
            this.localState['remainingRolls'] = 3
        }
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
        pointsToAdd = this.pointsForRoll()
        var count = this.count(this.localState.dice, 'energy')
        energyToAdd += count
        count = this.count(this.localState.dice, 'heart')
        if (!this.inEdo(this.localState.currentTurn)) healthToAdd = count
        count = this.count(this.localState.dice, 'claw')
        damage += count
        this.addEnergy(this.localState.currentTurn, energyToAdd)
        this.changeHealth(this.localState.currentTurn, healthToAdd)
        this.addPoints(this.localState.currentTurn, pointsToAdd)
        // this.updateMessage("Player " + this.localState.currentTurn + " earns " + pointsToAdd + " points, " + energyToAdd + " energy, " + healthToAdd 
        // + " health, and deals " + damage + " damage.")
        this.attack(damage)
        this.checkElim()
        if (damage > 0) {
            if (this.localState.playersInGame.length <= 4) {
                if (this.localState.edo === 0) {
                    this.enterEdo(this.localState.currentTurn)
                }
                if (!this.onlyCurrentPlayerInEdo()) {
                    this.canYield = true
                }
            } else {
                window.alert("Implement yield for double edo")
            }
            // Fix for both and yield
        }
        if (this.hasCard(this.localState.currentTurn, "Complete Destruction")) {
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

    pointsForRoll() {
        let pointsToAdd = 0
        var count = this.count(this.localState.dice, '1')
        if (this.hasCard(this.localState.currentTurn, "Gourmet")) {
            if (count >= 3) pointsToAdd += count 
        } else {
            if (count >= 3) pointsToAdd += count - 2
        }
        count = this.count(this.localState.dice, '2')
        if (count >= 3) pointsToAdd += count - 1
        count = this.count(this.localState.dice, '3')
        if (count >= 3) pointsToAdd += count 
        if (this.hasCard(this.localState.currentTurn, "Omnivore")) {
            const onesCount = this.count(this.localState.dice, '1')
            const twosCount = this.count(this.localState.dice, '2')
            const threesCount = this.count(this.localState.dice, '3')
            if (onesCount >= 1 && twosCount >= 1 && threesCount >= 1) {
                this.updateMessage("Omnivore effect activated.")
                pointsToAdd += 2
            }
        }
        return pointsToAdd
    }

    changeHealth(player, healthToAdd) {
        let healString = " heals for "
        if (healthToAdd < 0) {
            healString = " is damaged for "
        }
        if (Math.abs(healthToAdd) > 0) {
            this.updateMessage("Player " + player + healString + healthToAdd)
        }
        if (this.hasCard(player, "Regeneration") && healthToAdd > 0) {
            this.updateMessage("Regeneration effect activated.")
            healthToAdd += 1
        }
        if (this.hasCard(player, "Even Bigger")) {
            this.localState.health[player - 1] = Math.min(this.localState.health[player - 1] + healthToAdd, this.maxHealth + 2)
        } else {
            this.localState.health[player - 1] = Math.min(this.localState.health[player - 1] + healthToAdd, this.maxHealth)
        }
        if (this.localState.health[player - 1] <= 0) {
            this.eliminatePlayer(player)
        }
        if (this.hasCard(player, "We're Only Making It Stronger") && healthToAdd <= -2) {
            this.updateMessage("We're Only Making It Stronger activated.")
            this.addEnergy(player, 1)
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

    enterEdo(player) {
        this.localState.edo = player
        this.updateMessage("Player " + this.localState.currentTurn + " goes into Edo.")
        this.addPoints(player, 1)
    }

    enterBayEdo(player) {
        this.localState.bayEdo = player
        this.updateMessage("Player " + this.localState.currentTurn + " goes into Edo Bay.")
        this.addPoints(player, 1)
    }

    onlyCurrentPlayerInEdo() {
        let returnValue = (this.localState.edo === this.localState.currentTurn || this.localState.edo === 0) && (this.localState.bayEdo === this.localState.currentTurn || this.localState.bayEdo === 0)
        console.log("return value" + returnValue)
        console.log(this.localState.edo)
        console.log(this.localState.bayEdo)
        return returnValue
        // return (this.localState.edo === this.localState.currentTurn || this.localState.edo === 0) && (this.localState.bayEdo === this.localState.currentTurn || this.localState.bayEdo === 0)
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
        if (this.inEdo(player)) {
            this.removeFromEdo(player)
        }
        this.updateMessage("Player " + player + " is eliminated!")
    }

    isEdoEmpty() {
        if (this.localState.playersInGame.length <= 4) {
            return this.localState.edo === 0 
        } else {
            return (this.localState.edo === 0 && this.localState.bayEdo === 0)
        }
    }

    removeFromEdo(player) {
        if (this.localState.edo === player) {
            this.localState.edo = 0
        } else if (this.localState.bayEdo === player) {
            this.localState.bayEdo = 0
        }
    }

    attack(damage) {
        let damageBool = true
        let attackString = "Edo"
        if (this.hasCard(this.localState.currentTurn, "Acid Attack")) damage += 1
        if (this.hasCard(this.localState.currentTurn, "Spiked Tail") && damage > 0) damage += 1
        if (this.hasCard(this.localState.currentTurn, "Urbavore") && damage > 0) damage += 1
        if (damage >= 3 && this.hasCard(this.localState.currentTurn, "Throw A Tanker")) {
            this.updateMessage("Throw A Tanker activated.")
            this.addPoints(this.localState.currentTurn, 2)
        }
        if (this.inEdo(this.localState.currentTurn)) {
            damageBool = false
            attackString = "Outside Edo"
        }
        if (damage > 0) {
            this.updateMessage("Player " + this.localState.currentTurn + " deals " + damage + " damage to " + attackString + ".")
            if(this.hasCard(this.localState.currentTurn, "Cannibalistic")) {
                this.updateMessage("Cannibalistic activated.")
                this.addPoints(this.localState.currentTurn, 1)
            }
        } else {
            if (this.hasCard(this.localState.currentTurn, "Herbivore")) {
                this.updateMessage("Herbivore activated!")
                this.addPoints(this.localState.currentTurn, 1)
            }
        }
        let playersToDamage = []
        if (this.hasCard(this.localState.currentTurn, "Nova Breath")) {
            for (let i = 0; i < this.localState.playersInGame.length; i++) {
                if (this.localState.playersInGame[i] !== this.localState.currentTurn) {
                    playersToDamage.push(this.localState.playersInGame[i])
                }
            }
        } else {
            for (let i = 0; i < this.localState.playersInGame.length; i++) {
                if (this.inEdo(this.localState.playersInGame[i]) == damageBool) {
                    playersToDamage.push(this.localState.playersInGame[i])
                }
        }
        }
        for (let i = 0; i < playersToDamage.length; i++) {
            this.changeHealth(playersToDamage[i], -damage)
            if (this.hasCard(playersToDamage[i], "Reflective Hide") && damage > 1) {
                this.updateMessage("Reflective Hide activated.")
                this.changeHealth(this.localState.currentTurn, -1)
            }
        }
    }

    rerenderState(handler = () => {}) {
        this.setState(this.localState, handler)
    }

    inEdo(playerNumber) {
        if (this.localState.playersInGame.length <= 4) {
            if (playerNumber !== this.localState.edo) return false
        } else {
            if (playerNumber !== this.localState.edo && playerNumber !== this.localState.bayEdo) return false
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
        if (this.buttonPhase !== 2) {
            window.alert("Not buy phase.")
            return
        }
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
                        this.keepCardImmediateEffect(boughtCard)
                    }
                    this.rerenderState()
                }
            }
        } else {
            window.alert("Cannot buy until you resolve your roll.")
        }
    }

    keepCardImmediateEffect(card) {
        if (card['name'] === 'Even Bigger') {
            this.changeHealth(this.localState.currentTurn, 2)
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
        this.updateMessage(card['name'] + " activated.")
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
            case 'Evacuation Orders':
                this.updateMessage("All players (other than the active player) lose 5 points.")
                for (let i = 0; i < this.localState.playersInGame.length; i++) {
                    if (this.localState.currentTurn !== this.localState.playersInGame[i]) {
                        this.addPoints(this.localState.playersInGame[i], -5)
                    }
                }
                break;
            case 'Fire Blast':
                this.updateMessage("All players (other than the active player) take 2 damage.")
                for (let i = 0; i < this.localState.playersInGame.length; i++) {
                    if (this.localState.currentTurn !== this.localState.playersInGame[i]) {
                        this.changeHealth(this.localState.playersInGame[i], -2)
                    }
                }
                break;
            case 'Heal':
                this.changeHealth(this.localState.currentTurn, 2)
                break
            case 'Gas Refinery':
                this.updateMessage("All players (other than the active player) take 3 damage.")
                for (let i = 0; i < this.localState.playersInGame.length; i++) {
                    if (this.localState.currentTurn !== this.localState.playersInGame[i]) {
                        this.changeHealth(this.localState.playersInGame[i], -3)
                    }
                }
                this.addPoints(this.localState.currentTurn, 2)
                break
            case 'High Altitude Bombing':
                for (let i = 0; i < this.localState.playersInGame.length; i++) {
                    this.changeHealth(this.localState.playersInGame[i], -3)
                }
                break
            case "Jet Fighters":
                this.changeHealth(this.localState.currentTurn, -4)
                this.addPoints(this.localState.currentTurn, 5)
                break
            case "National Guard":
                this.changeHealth(this.localState.currentTurn, -2)
                this.addPoints(this.localState.currentTurn, 2)
                break
            case "Nuclear Power Plant":
                this.changeHealth(this.localState.currentTurn, 3)
                this.addPoints(this.localState.currentTurn, 2)
                break
            case "Skyscraper":
                this.addPoints(this.localState.currentTurn, 4)
                break
            case "Tanks":
                this.changeHealth(this.localState.currentTurn, -3)
                this.addPoints(this.localState.currentTurn, 4)
                break
            case "Amusement Park":
                this.addPoints(this.localState.currentTurn, 4)
                break
            case "Army":
                const cardNumber = this.localState.hands[this.localState.currentTurn - 1].length
                console.log("Card number" + cardNumber)
                this.changeHealth(this.localState.currentTurn, -cardNumber)
                this.addPoints(this.localState.currentTurn, cardNumber)
                break
            default:
                window.alert("ERROR: Unrecognized card.")

        }
    }

    yieldEdo(location) {
        if (this.buttonPhase !== 1) {
            window.alert("Not yield phase.")
            return
        }
        if(!this.canYield) {
            window.alert("Can't yield, didn't take damage.")
            return
        } else {
            if (this.localState.currentTurn !== this.localState.edo && this.localState.currentTurn !== this.localState.bayEdo) {
                if (location === 'edo') {
                    // Possibly can remove inside checks
                    if (this.localState.edo !== this.localState.currentTurn) {
                        this.updateMessage("Player " + this.localState.edo + " is yielding Edo.")
                        this.enterEdo(this.localState.currentTurn)
                        // this.localState.edo = this.localState.currentTurn
                    } else {
                        window.alert("Can't yield Edo on own turn")
                    }
                } else if (location === 'bay') {
                    if (this.localState.bayEdo !== this.localState.currentTurn) {
                        this.updateMessage("Player " + this.localState.bayEdo + " is yielding Edo Bay.")
                        this.enterBayEdo(this.localState.currentTurn)
                    } else {
                        window.alert("Can't yield Edo on own turn")
                    }
                }
            } else {
                window.alert("Can't yield Edo on own turn")
            }
        }
        this.rerenderState()
    }

    renderHands() {
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

    setVictoryPointTarget(points) {
        const parsedInt = parseInt(points, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Must be a valid integer.")
            return
        }
        this.updateMessage("Points to win set to " + parsedInt)
        this.winPoints = parsedInt
        this.rerenderState()
    }

    setMaxHealth(health) {
        const parsedInt = parseInt(health, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Must be a valid integer.")
            return
        }
        this.updateMessage("Max Health set to " + parsedInt)
        this.maxHealth = parsedInt
        this.resetHealthsToMax()
        this.rerenderState()
    }

    resetHealthsToMax() {
        for (let i = 0; i < this.localState.health.length; i++) {
            this.localState.health[i] = Math.min(this.localState.health[i], this.maxHealth)
        }
    }

    setMaxPlayers(player) {
        const parsedInt = parseInt(player, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Must be a valid integer.")
            return
        }
        this.updateMessage("Max players set to " + parsedInt)
        this.maxPlayers = parsedInt
        this.rerenderState()
    }

    renderCardInfo(number) {
        return(
            <div>
                {this.localState.deck[number] ? 
                <div>
                    <div>{this.localState.deck[number]['name']}</div> 
                    <div>{" Cost: " + this.localState.deck[number]['cost']}</div>
                    <div>{" Type: " + this.localState.deck[number]['type']}</div>
                    <div>{" Ability: " + this.localState.deck[number]['ability'] }</div>
                </div>
                : "none:"}
            </div>
        )
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
                            <div>Player In Edo: {(this.state.edo === 0) ? "empty" : this.state.edo}</div>
                            {(this.state.playersInGame.length > 4) && <p>Player In Edo Bay: {this.state.bayEdo}</p>}
                            <div>
                                <button id="roll" class={(this.buttonPhase === 0) ? "btn-success" : "btn-danger"} onClick={() => {this.roll()}}>Roll</button>
                            </div>
                            <button id="resolveRoll" class={(this.buttonPhase === 0) ? "btn-success" : "btn-danger"} onClick={() => {this.resolveRoll()}}>Lock-in Roll</button>
                            <div>
                            <button id="yieldEdo" class={(this.buttonPhase === 1) ? "btn-success" : "btn-danger"} onClick={() => {this.yieldEdo('edo')}}>Yield Edo</button>
                            {(this.state.playersInGame.length > 4) && <button id="yieldBay" class={(this.buttonPhase === 1) ? "btn-success" : "btn-danger"} onClick={() => {this.yieldEdo('bay')}}>Yield Edo Bay</button>}
                            <button id="doneYielding" class={(this.buttonPhase === 1) ? "btn-success" : "btn-danger"} onClick={() => {this.doneYielding()}}>Done Yielding</button>
                            </div>
                            <div>
                                <button id="clearBuy" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.clearBuy()}}>Pay 2 to Clear Buy Cards</button>
                                <button id="doneBuying" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(-1)}}>Done Buying</button>
                                <Row>
                                    <Col>
                                        <div class="border border-primary rounded">
                                            <div>{this.renderCardInfo(0)}</div>
                                            <button id="buy0" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(0)}}>Buy</button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div class="border border-primary">
                                    <div>{this.renderCardInfo(1)}</div>
                                    <button id="buy1" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(1)}}>Buy</button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div class="border border-primary">
                                        <div>{this.renderCardInfo(2)}</div>
                                        <button id="buy2" class={(this.buttonPhase === 2) ? "btn-success" : "btn-danger"} onClick={() => {this.buy(2)}}>Buy</button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {this.renderHands()}
                            <p>Players in game: {JSON.stringify(this.state.playersInGame)}</p>
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
                                <button id="spoof3Points3Energy" onClick={() => this.spoofDice(["energy","energy","energy","3","3","3"])}>Spoof 3 Energy, 3 Points</button>
                                <button id="spoof2Energy" onClick={() => this.spoofDice(["energy","energy","1","1","3","3"])}>Spoof 2 Energy</button>
                                <button id="spoof5Energy1Claw" onClick={() => this.spoofDice(["energy","energy","energy","energy","energy","claw"])}>Spoof 5 Energy, 1 Claw</button>
                                <button id="spoof2Claw" onClick={() => this.spoofDice(["claw","claw","1","1","2","2"])}>Spoof 2 Claw</button>
                                </div>
    }
                            </div>
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
                                <a href="https://cdn.1j1ju.com/medias/f9/2f/9b-king-of-edo-rulebook.pdf">King of Tokyo Full Rules</a>
                                <h3>Short Rules</h3>
                                <div>First to <b><u>{this.winPoints} points</u></b> or last player alive wins!</div>
                                <div>Roll dice up 3 (default) times, and then resolve when done. Dice can be saved between rolls.</div>
                                <div>Triple+ # dice get you points (diceValue + # over triple). Claws attack the area you're not in (Edo vs Outside) and put you in Edo if unoccupied or occupant yields to you.</div>
                                <div>Hearts heal, but not in Edo. Energy is money to buy cards.</div>
                                <div>If attacked in Edo, have the option to yield. Must press "Done Yielding" to finish phase either way.</div>
                                <div>Get 1 point when go into Edo. Get 2 points if start your turn in Edo.</div>
                                <div>Buy cards with energy. Discard cards have an immediate effect. Keep cards have a persistent effect. Click "Done Buying" to end turn.</div>
                            </div>
                            <div>
                                <div><b>Configure Game</b></div>
                                <div>
                                    Play To Victory Points
                                    <input type="text" id="pointArea"></input>
                                    <button onClick={() => this.setVictoryPointTarget(document.getElementById("pointArea").value)}>Set Point Target</button>
                                </div>
                                <div>
                                    Max Health:
                                    <input type="text" id="healthInput"></input>
                                    <button onClick={() => this.setMaxHealth(document.getElementById("healthInput").value)}>Set Max Health</button>
                                </div>
                                <div>
                                    Number of Players:
                                    <input type="text" id="playerInput"></input>
                                    <button onClick={() => this.setMaxPlayers(document.getElementById("playerInput").value)}>Set Max Players</button>
                                </div>
                                <button onClick={() => {this.setup(this.maxPlayers)}}>Restart Game With New Settings</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Shogun;