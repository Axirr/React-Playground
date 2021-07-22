import React, { Component } from 'react';

class LoveLetter extends Component {
    state = {
        hand1card: "none",
        drawCard: "none",
        hand2card: "none",
        currentTurn: 1,
        deck: ["guard", "princess", "baron", "king", "prince"],
        playersInGame: [1,2]
    }

    componentDidMount() {
        this.deal()
    }
    
    deal() {
        var shuffledDeck = this.returnShuffledDeck()
        this.setState( { deck: shuffledDeck }, () => {
            console.log(this.state.deck)
            // this.replaceCard(1)
            // this.replaceCard(2)
            // this.replaceCard(0)
            var deckCopy = [...this.state.deck]
            console.log(deckCopy.length)
            var card1 = deckCopy.pop()
            console.log(deckCopy.length)
            console.log(card1)
            var card2 = deckCopy.pop()
            var card3 = deckCopy.pop()
            this.setState( {hand1card: card1,
                hand2card: card2,
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

    playCard(playerNumber, card) {
        if (playerNumber !== this.state.currentTurn) {
            window.alert("Not your turn")
            return
        }
        this.playDrawCard(card, playerNumber)
    }

    playDrawCard(card, playerNumber) {
        let isElim = this.isElimCardEffect(card)
        if (this.state.deck.length == 0) {
            console.log("BUG: DRAW CARD TOO")
            this.evaluateShowdownWin()
            return
        }
        if (isElim === false) {
            this.replaceCard(playerNumber)
            console.log("Replacing")
        }
        this.advanceTurn()
    }

    replaceCard(playerNumber) {
        var deckCopy = [...this.state.deck]
        console.log(deckCopy.length)
        var card = deckCopy.pop()
        console.log(deckCopy.length)
        console.log(card)
        this.setState( {hand1card: card,
            deck: deckCopy} )
    }

    evaluateShowdownWin() {

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

    isElimCardEffect(card) {
        window.alert("You are playing a " + card)
        switch(card) {
            case 'princess':
                this.eliminatePlayer(this.state.currentTurn)
                return true;
                break;
            case 'countess':
                // code
                return false
                break;
            case 'king':
                // code
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
                    <button onClick={(() => { this.playCard(1, this.state.hand1card) })}>{this.state.hand1card}</button>
                </div>
                <div>
                    <p>Hand Two</p>
                    <button onClick={ () => { this.playCard(2, this.state.hand2card) }}>{this.state.hand2card}</button>
                </div>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <button onClick={ () => { this.playDrawCard(this.state.drawCard)}}>{this.state.drawCard}</button>
                <p>Debug</p>
                <button onClick={ () => { this.printState()}}>Print State</button>
                <button onClick={ () => this.deal()}>Deal</button>
            </div>
        );
    }
}

export default LoveLetter;