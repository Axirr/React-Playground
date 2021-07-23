import React, { Component } from 'react';

class LoveLetter extends Component {
    state = {
        hands: ["none", "none"],
        drawCard: "none",
        currentTurn: 1,
        //deck: ["guard", "king", "prince", "countess", "cleric"],
        deck: ["guard", "king", "prince", "countess"],
        playersInGame: [1, 2],
        isHandMaid: [0, 1]
    }

    componentDidMount() {
        this.deal()
    }
    
    deal() {
        var shuffledDeck = this.returnShuffledDeck()
        this.setState( { deck: shuffledDeck }, () => {
            console.log(this.state.deck)
            var deckCopy = [...this.state.deck]
            console.log(deckCopy.length)
            var card1 = deckCopy.pop()
            console.log(deckCopy.length)
            console.log(card1)
            var card2 = deckCopy.pop()
            var card3 = deckCopy.pop()
            this.setState( {
                hands: [card1, card2],
                drawCard: card3,
                deck: deckCopy} )
        })
    }

    returnShuffledDeck() {
        var tempDeck = [...this.state.deck]
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

    playerPlayCard(playerNumber, card) {
        if (playerNumber !== this.state.currentTurn) {
            window.alert("Not your turn")
            return
        }
        this.playCard(card, playerNumber)
    }

    playCard(card, playerNumber) {
        if (this.state.currentTurn === -1 ) {
            window.alert("Game is over")
            return
        }

        if (!this.isValidMove(card)) {
            return
        }

        var isGameOver = this.state.deck.length == 0 ? true : false
        let isElim = this.isElimCardEffect(card)
        if (isElim === false) {
            this.replaceCard(playerNumber)
            console.log("Replacing")
        }
        console.log("Current draw card is " + this.state.drawCard)
        if (isGameOver) {
            this.setState( {currentTurn: -1})
            this.evaluateShowdownWin()
            return
        }
        this.advanceTurn()
    }

    isElimCardEffect(card) {
        window.alert("You are playing a " + card)
        var myTarget = this.getTargetPlayerNumber()
        switch(card) {
            case 'princess':
                this.eliminatePlayer(this.state.currentTurn)
                return true;
                break;
            case 'countess':
                return false
                break;
            case 'king':
                var handsCopy = [...this.state.hands]
                var playerOriginalHand = handsCopy[myTarget - 1]
                handsCopy[myTarget - 1] = this.state.drawCard
                this.setState({ hands: handsCopy, drawCard: playerOriginalHand})
                console.log("BUG: To use same replacement card format, can't setState to draw card or it doesn't happen in time.")
                return false
                break;
            case 'prince':
                // code
                return false
                break;
            case 'handmaid':
                // code
                return false
                break;
            case 'baron':
                // code
                return false
                break;
            case 'priest':
                // code
                return false
                break;
            case 'guard':
                // code
                return false
                break;
            default:
                console.log("ERROR, unidentified card found")
                return false
        }
    }

    isValidMove(card) {
        // Countess check
        let currentHandCard = this.state.hands[this.state.currentTurn - 1]
        if (currentHandCard === "countess" || this.state.drawCard === "countess") {
            if (card !== "countess") {
                if ((currentHandCard === "prince") || (currentHandCard === "king") || (this.state.drawCard === "prince") || (this.state.drawCard) === "king") {
                    window.alert("Invalid move. Must play the countess")
                    return false
                }
            }
        } 

        // Valid target check
        if (['king', 'guard', 'prince', 'baron', 'priest', 'guard'].indexOf(card) !== -1) {
            console.log("checking valid target")
            if (!this.isValidTarget(card)) {
                return false
            }
        }

        return true
    }

    getTargetPlayerNumber() {
        var radios = document.getElementsByName("target")
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return i + 1
            }
        }
    }

    isValidTarget(card) {
        //Get current target
        var myTarget = this.getTargetPlayerNumber()

        // Check still in game
        if (this.state.playersInGame.indexOf(myTarget) === -1) {
            window.alert("INVALID MOVE. Target not in game.")
            return false
        }

        // Check not self unless prince
        if (['king', 'guard', 'baron', 'priest', 'guard'].indexOf(card) !== -1) {
            if (myTarget === this.state.currentTurn) {
                window.alert("INVALID MOVE. Cannot target self except with prince.")
                return false
            }
        }

        // Check if handmaiden
        if (this.state.isHandMaid[myTarget - 1] === 1) {
            if (this.state.playersInGame.length > 2) {
                window.alert("INVALID MOVE. Cannot target handmaid player.")
                return false
            } else if (card === "prince") {
                window.alert("INVALID MOVE. Cannot target handmaid player. Remember, Prince can target self.")
                return false
            }
        }
        console.log("CHECK IF HANDMAIDEN CHECK WORKS WITH MORE THAN 2 PEOPLE.")
        return true
    }

    replaceCard(playerNumber) {
        var deckCopy = [...this.state.deck]
        if (deckCopy.length == 0) {
            var drawnCard = "none"
        } else {
            var drawnCard = deckCopy.pop()
            console.log(drawnCard)
        }
        if (playerNumber === 0) {
            this.setState( {drawCard: drawnCard,
                deck: deckCopy} )
        } else {
            var copyHands = [...this.state.hands]
            copyHands[playerNumber - 1] = this.state.drawCard
            this.setState( {hands: copyHands,
                drawCard: drawnCard,
                deck: deckCopy} )
        }
    }

    evaluateShowdownWin() {
        console.log("SHOWDOWN!")
    }

    advanceTurn() {
        var currentIndex = this.state.playersInGame.indexOf(this.state.currentTurn)
        console.log(currentIndex)
        this.setState({ currentTurn: this.state.playersInGame[(currentIndex + 1) % this.state.playersInGame.length] } )
    }

    eliminatePlayer(playerNumber) {
        var copyPlayers = [...this.state.playersInGame]
        let index = copyPlayers.indexOf(playerNumber)
        copyPlayers.splice(index, 1)
        this.setState( { playersInGame: copyPlayers })
        if (copyPlayers.length == 1) {
            window.alert("Player " + copyPlayers[0] + " wins!")
        }
    }


    evaluateWin() {

    }

    printState() {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <p>Current Live Players: { this.state.playersInGame }</p>
                <p>Current Turn: Player {this.state.currentTurn}</p>
                <div>
                    <p>Hand One</p>
                    <button onClick={(() => { this.playerPlayCard(1, this.state.hands[0]) })}>{this.state.hands[0]}</button>
                </div>
                <div>
                    <p>Hand Two</p>
                    <button onClick={ () => { this.playerPlayCard(2, this.state.hands[1]) }}>{this.state.hands[1]}</button>
                </div>
                <div>
                    <p>Target of Card</p>
                    <input type="radio" value="1" name="target" checked="checked"/>Player 1
                    <input type="radio" value="2" name="target" />Player 2
                </div>
                <p>...</p>
                <p>...</p>
                <button onClick={ () => { this.playCard(this.state.drawCard, 0)}}>{this.state.drawCard}</button>
                <p>Debug</p>
                <button onClick={ () => { this.printState()}}>Print State</button>
                <button onClick={ () => this.deal()}>Deal</button>
            </div>
        );
    }
}

export default LoveLetter;