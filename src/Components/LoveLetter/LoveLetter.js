import React, { Component } from 'react';

class LoveLetter extends Component {
    state = {
        hands: ["none", "none"],
        drawCard: "none",
        currentTurn: 1,
        deck: ["guard", "princess", "king", "baron", "prince", "handmaiden", "countess", "priest"],
        //deck: ["baron", "prince", "guard"],
        playersInGame: [1, 2],
        isHandMaiden: [false, false],
        message: "Default Message."
    }

    componentDidMount() {
        this.deal()
    }
    
    deal() {
        var shuffledDeck = this.returnShuffledDeck()
        //var shuffledDeck = this.state.deck
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
        this.isElimCardEffect(card)
        //console.log("Current draw card is " + this.state.drawCard)
        if (isGameOver) {
            //this.setState( {currentTurn: -1})
            this.evaluateShowdownWin()
            return
        }
    }

    isElimCardEffect(card) {
        //window.alert("You are playing a " + card)
        var handmaidenCopy = this.state.isHandMaiden
        handmaidenCopy[this.state.currentTurn - 1] = false
        var myTarget = this.getTargetPlayerNumber()
        console.log("target")
        console.log(myTarget)
        var returnBool = false
        var isDrawCardPlayed = (card === this.state.drawCard)
        if (isDrawCardPlayed) {
            var notPlayedCard = this.state.hands[this.state.currentTurn - 1]
        } else {
            var notPlayedCard = this.state.drawCard
        }
        switch(card) {
            case 'princess':
                this.eliminatePlayer(this.state.currentTurn)
                this.replaceCard(0)
                this.advanceTurn()
                break;
            case 'countess':
                this.normalDrawAndAdvance(isDrawCardPlayed)
                break;
            case 'king':
                var handsCopy = [...this.state.hands]
                var playerOriginalHand = handsCopy[myTarget - 1]
                handsCopy[myTarget - 1] = notPlayedCard
                handsCopy[this.state.currentTurn - 1] = playerOriginalHand
                this.setState({ hands: handsCopy}, () => {
                    if (!isDrawCardPlayed) {
                        this.replaceCard(this.state.currentTurn)
                    } else {
                        this.replaceCard(0)
                    }
                    this.advanceTurn()
                })
                break;
            case 'prince':
                var deckCopy = [...this.state.deck]
                if (deckCopy.length >= 1) {
                    var handsCopy = [...this.state.hands]
                    var discardedCard = handsCopy[myTarget - 1]
                    if (myTarget === this.state.currentTurn) {
                        if (discardedCard === "prince") {
                            var discardedCard = this.state.drawCard
                        }
                    }
                    handsCopy[myTarget - 1] = deckCopy.pop()
                    console.log(handsCopy)
                    console.log("Discarded card")
                    console.log(discardedCard)
                    this.setState({hands: handsCopy, deck: deckCopy}, () => {
                        if (myTarget === this.state.currentTurn) {
                            this.replaceCard(0)
                        } else {
                            this.replaceCard(this.state.currentTurn)
                        }
                        if (discardedCard === "princess") {
                            this.eliminatePlayer(myTarget)
                        } 
                        this.advanceTurn()
                    })
                } else {
                    console.log("BUG: Implement draw face down card.")
                }
                break;
            case 'handmaiden':
                var handmaidenCopy = this.state.isHandMaiden
                handmaidenCopy[this.state.currentTurn - 1] = true
                console.log("Current handmaiden list")
                console.log(handmaidenCopy)
                this.setState( { isHandMaiden: handmaidenCopy }, () => {
                    if (!isDrawCardPlayed) {
                        this.replaceCard(this.state.currentTurn)
                    } else {
                        this.replaceCard(0)
                    }
                    this.advanceTurn()
                })
                break;
            case 'baron':
                if (isDrawCardPlayed) {
                    var playerValue = this.getCardValue(this.state.hands[this.state.currentTurn - 1])
                } else {
                    var playerValue = this.getCardValue(this.state.drawCard)
                }
                var targetValue = this.getCardValue(this.state.hands[myTarget - 1])
                var playerToEliminate = 0
                if (playerValue > targetValue) {
                    playerToEliminate = myTarget
                } else if (targetValue > playerValue) {
                    playerToEliminate = this.state.currentTurn
                }
                if (playerToEliminate !== 0) {
                    this.eliminatePlayer(playerToEliminate, () => {
                        if (!isDrawCardPlayed) {
                            this.replaceCard(this.state.currentTurn)
                        } else {
                            this.replaceCard(0)
                        }
                        this.advanceTurn()
                    })
                } else {
                    if (!isDrawCardPlayed) {
                        this.replaceCard(this.state.currentTurn)
                    } else {
                        this.replaceCard(0)
                    }
                    this.advanceTurn()
                }
                break;
            case 'priest':
                this.setState({message: ("Their card is a " + this.state.hands[myTarget - 1])})
                this.normalDrawAndAdvance(isDrawCardPlayed)
                break;
            case 'guard':
                var guess = this.getGuardGuess()
                console.log("Guard guess")
                console.log(guess)
                var actualHand = this.state.hands[myTarget - 1]
                var playerToEliminate = 0
                if (guess === actualHand) {
                    playerToEliminate = myTarget
                } else {
                    this.setState( {message: "WRONG GUESS"})
                }
                if (playerToEliminate !== 0) {
                    this.eliminatePlayer(playerToEliminate, () => {
                        this.normalDrawAndAdvance(isDrawCardPlayed)
                    })
                } else {
                    this.normalDrawAndAdvance(isDrawCardPlayed)
                } 
                break;
            default:
                console.log("ERROR, unidentified card found")
                console.log(card)
        }
    }

    getGuardGuess() {
        var radios = document.getElementsByName("guardGuess")
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value
            }
        }
    }

    normalDrawAndAdvance(isDrawCardPlayed) {
        if (!isDrawCardPlayed) {
            this.replaceCard(this.state.currentTurn)
        } else {
            this.replaceCard(0)
        }
        this.advanceTurn()
    }

    getCardValue(card) {
        switch(card) {
            case "princess":
                return 8
            case "countess":
                return 7
            case "king":
                return 6
            case "prince":
                return 5
            case "handmaiden":
                return 4
            case "baron":
                return 3
            case "priest":
                return 2
            case "guard":
                return 1
            default:
                console.log("ERROR, unidentified card found")
                console.log(card)
                return 0
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
        if (this.state.isHandMaiden[myTarget - 1]) {
            if (this.state.playersInGame.length > 2) {
                window.alert("INVALID MOVE. Cannot target handmaiden player.")
                return false
            } else if (card === "prince") {
                window.alert("INVALID MOVE. Cannot target handmaiden player. Remember, Prince can target self.")
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
        var maxPlayer = 0
        var maxValue = 0
        for (var i = 0; i < this.state.playersInGame.length; i++) {
            var currentPlayer = this.state.playersInGame[i]
            console.log(currentPlayer)
            var cardValue = this.getCardValue(this.state.hands[currentPlayer - 1])
            if (cardValue > maxValue) {
                maxPlayer = currentPlayer
                maxValue = cardValue
                console.log("New champ")
            }
        }
        window.alert("Player " + maxPlayer + " wins showdown!")
    }

    advanceTurn() {
        var currentIndex = this.state.playersInGame.indexOf(this.state.currentTurn)
        console.log(currentIndex)
        this.setState({ currentTurn: this.state.playersInGame[(currentIndex + 1) % this.state.playersInGame.length] } )
    }

    eliminatePlayer(playerNumber, handler = () => {}) {
        var copyPlayers = [...this.state.playersInGame]
        let index = copyPlayers.indexOf(playerNumber)
        copyPlayers.splice(index, 1)
        this.setState( { playersInGame: copyPlayers }, () => {
            handler()
        })
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
                <p>{this.state.message}</p>
                <div>
                    Hand One
                    <button onClick={(() => { this.playerPlayCard(1, this.state.hands[0]) })}>{this.state.hands[0]}</button>
                </div>
                <div>
                    Hand Two
                    <button onClick={ () => { this.playerPlayCard(2, this.state.hands[1]) }}>{this.state.hands[1]}</button>
                </div>
                <div>
                    Target of Card
                    <input type="radio" value="1" name="target" defaultChecked/>Player 1
                    <input type="radio" value="2" name="target" />Player 2
                </div>
                <div>
                    Guess for Guard
                    <input type="radio" value="priest" name="guardGuess" defaultChecked/>Priest
                    <input type="radio" value="baron" name="guardGuess" />Baron
                    <input type="radio" value="handmaiden" name="guardGuess" />Handmaiden
                    <input type="radio" value="prince" name="guardGuess" />Prince
                    <input type="radio" value="king" name="guardGuess" />King
                    <input type="radio" value="countess" name="guardGuess" />Countess
                    <input type="radio" value="princess" name="guardGuess" />Princess
                </div>
                <p>...</p>
                <button onClick={ () => { this.playCard(this.state.drawCard, 0)}}>{this.state.drawCard}</button>
                <p>Current Live Players: { this.state.playersInGame }</p>
                <p>Current Turn: Player {this.state.currentTurn}</p>
                <p>Debug</p>
                <button onClick={ () => { this.printState()}}>Print State</button>
                <button onClick={ () => this.deal()}>Deal</button>
            </div>
        );
    }
}

export default LoveLetter;