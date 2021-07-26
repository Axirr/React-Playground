import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoveLetter.module.css'

class LoveLetter extends Component {
    state = {
        hands: ["none", "none", "none", "none"],
        drawCard: "none",
        currentTurn: 1,
        deck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"],
        //deck: ["guard", "guard", "guard", "guard", "guard", "guard", "guard", "handmaiden"],
        playersInGame: [1, 2, 3, 4],
        // isHandMaiden: [false, false, false, false],
        isHandMaiden: [false, false, false, false],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        setAsideCard: "none",
        isDisplayed: [false, false, false, false, false, false],
        doShuffle: true
    }

    componentDidMount() {
        this.deal()
    }
    
    deal() {
        if (this.state.doShuffle) {
            var shuffledDeck = this.returnShuffledDeck()
        } else {
            var shuffledDeck = this.state.deck
        }
        this.setState( { deck: shuffledDeck }, () => {
            console.log(this.state.deck)
            var deckCopy = [...this.state.deck]
            var card1 = deckCopy.pop()
            var card2 = deckCopy.pop()
            var card3 = deckCopy.pop()
            var card4 = deckCopy.pop()
            var card5 = deckCopy.pop()
            var card6 = deckCopy.pop()
            console.log("Set aside card: " + card6)
            this.setState( {
                hands: [card1, card2, card3, card4],
                drawCard: card5,
                setAsideCard: card6,
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

        if (["king", "prince", "guard", "priest", "baron"].indexOf(card) !== -1 && this.isOnlyHandmaidenTargets()) {
            this.updateMessage("Player " + this.state.currentTurn + " played a " + card + " but had no valid targets.", () => {
                var isDrawCardPlayed = (card === this.state.drawCard)
                this.removeSelfHandmaiden( () => {
                    this.normalDrawAndAdvance(isDrawCardPlayed)
                })
            })
        } else {
            this.isElimCardEffect(card)
        }
    }

    isOnlyHandmaidenTargets(card) {
        var onlyHandmaidens = false
        if (card === "prince") {
            return onlyHandmaidens
        }
        for (var i = 0; i < this.state.playersInGame.length; i++) {
            var potentialTarget = this.state.playersInGame[i]
            if (this.state.isHandMaiden[potentialTarget - 1] === false && potentialTarget !== this.state.currentTurn) {
                break;
            }
            if (i === (this.state.playersInGame.length - 1)) {
                onlyHandmaidens = true;
            }
        }
        return onlyHandmaidens
    }

    removeSelfHandmaiden(handler = () => {}) {
        var handmaidenCopy = this.state.isHandMaiden
        handmaidenCopy[this.state.currentTurn - 1] = false
        this.setState( {isHandMaiden: handmaidenCopy}, () => {handler()})
    }

    isElimCardEffect(card) {
        this.updateMessage("Player " + this.state.currentTurn + " played a " + card + ".", () => {
            this.removeSelfHandmaiden(() => {
                var myTarget = this.getTargetPlayerNumber()
                var isDrawCardPlayed = (card === this.state.drawCard)
                if (isDrawCardPlayed) {
                    var notPlayedCard = this.state.hands[this.state.currentTurn - 1]
                } else {
                    var notPlayedCard = this.state.drawCard
                }
                switch(card) {
                    case 'princess':
                        this.eliminatePlayer(this.state.currentTurn, () => {
                            this.replaceCard(0)
                            this.advanceTurn()
                        })
                        break;
                    case 'countess':
                        this.normalDrawAndAdvance(isDrawCardPlayed)
                        break;
                    case 'king':
                        var handsCopy = [...this.state.hands]
                        var playerOriginalHand = handsCopy[myTarget - 1]
                        console.log("Here")
                        console.log(playerOriginalHand)
                        handsCopy[myTarget - 1] = notPlayedCard
                        console.log(playerOriginalHand)
                        handsCopy[this.state.currentTurn - 1] = playerOriginalHand
                        this.setState({ hands: handsCopy}, () => {
                            console.log("Is Draw Card")
                            console.log(isDrawCardPlayed)
                            if (!isDrawCardPlayed) {
                                console.log("shouldn't be here")
                                //this.replaceCard(this.state.currentTurn)
                            } else {
                                this.replaceCard(0)
                            }
                            this.advanceTurn()
                        })
                        break;
                    case 'prince':
                        var deckCopy = [...this.state.deck]
                        var handsCopy = [...this.state.hands]
                        var discardedCard = handsCopy[myTarget - 1]
                        if (myTarget === this.state.currentTurn) {
                            if (discardedCard === "prince") {
                                var discardedCard = this.state.drawCard
                            }
                        }
                        if (deckCopy.length >= 1) {
                            handsCopy[myTarget - 1] = deckCopy.pop()
                        } else {
                            handsCopy[myTarget - 1] = this.state.setAsideCard
                        }
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
                        var message = "Player " + myTarget + " and Player " + this.state.currentTurn + " tie in baron comparison."
                        if (playerValue > targetValue) {
                            playerToEliminate = myTarget
                            var message = "Player " + this.state.currentTurn + " wins against Player " + myTarget + " in baron comparison."
                        } else if (targetValue > playerValue) {
                            playerToEliminate = this.state.currentTurn
                            var message = "Player " + myTarget + " wins against Player " + this.state.currentTurn + " in baron comparison."
                        }
                        this.updateMessage(message, () => {
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
                        })
                        break;
                    case 'priest':
                        window.alert("Player " + myTarget + " has a " + this.state.hands[myTarget - 1])
                        //this.updateMessage("Their card is a " + this.state.hands[myTarget - 1], this.normalDrawAndAdvance(isDrawCardPlayed))
                        //this.setState({message: ("Their card is a " + this.state.hands[myTarget - 1])})
                        this.normalDrawAndAdvance(isDrawCardPlayed)
                        break;
                    case 'guard':
                        var guess = this.getGuardGuess()
                        this.updateMessage("Player " + this.state.currentTurn + " guessed " + guess + ".", () => {
                            var actualHand = this.state.hands[myTarget - 1]
                            var playerToEliminate = 0
                            var message = "Guess was wrong."
                            if (guess === actualHand) {
                                message = "Guess was right!"
                                playerToEliminate = myTarget
                            } 
                            this.updateMessage(message, () => {
                                if (playerToEliminate !== 0) {
                                    this.eliminatePlayer(playerToEliminate, () => {
                                        this.normalDrawAndAdvance(isDrawCardPlayed)
                                    })
                                } else {
                                    this.normalDrawAndAdvance(isDrawCardPlayed)
                                } 
                            })
                        })
                        break;
                    default:
                        console.log("ERROR, unidentified card found")
                        console.log(card)
                }
            })
        })
    }

    updateMessage(newMessage, nextStateChange = () => {}) {
        var messageCopy = this.state.message
        for (var i = 0; i < (messageCopy.length - 1); i++) {
            messageCopy[i] = messageCopy[i+1]
        }
        messageCopy[messageCopy.length - 1] = newMessage
        //var newMessages = [this.state.message[1], this.state.message[2], newMessage]
        this.setState( {message: messageCopy}, nextStateChange)
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
        if (this.isOnlyHandmaidenTargets()) {
            return true
        } else if (this.state.isHandMaiden[myTarget - 1]) {
            if (this.state.playersInGame.length > 2) {
                window.alert("INVALID MOVE. Cannot target handmaiden player.")
                return false
            } else if (card === "prince") {
                window.alert("INVALID MOVE. Cannot target handmaiden player. Remember, Prince can target self.")
                return false
            }
        }
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
                deck: deckCopy}, () => {
                    this.checkIfGameOver()
                })
        } else {
            var copyHands = [...this.state.hands]
            copyHands[playerNumber - 1] = this.state.drawCard
            this.setState( {hands: copyHands,
                drawCard: drawnCard,
                deck: deckCopy}, () => {
                    this.checkIfGameOver()
                })
        }
        this.hideAllCards()
    }

    checkIfGameOver() {
        if (this.state.deck.length === 0) {
            this.evaluateShowdownWin()
            return
        }
    }

    evaluateShowdownWin() {
        console.log("SHOWDOWN!")
        console.log("BUG: Deal with tie.")
        this.showAllCards()
        var maxPlayer = 0
        var maxValue = 0
        var isTie = false
        for (var i = 0; i < this.state.playersInGame.length; i++) {
            var currentPlayer = this.state.playersInGame[i]
            console.log(currentPlayer)
            var cardValue = this.getCardValue(this.state.hands[currentPlayer - 1])
            if (cardValue > maxValue) {
                maxPlayer = currentPlayer
                maxValue = cardValue
                console.log("New champ")
                isTie = false
            } else if (cardValue === maxValue) {
                isTie = true
            }
        }
        this.setState( {currentTurn: -1})
        if (!isTie) {
            window.alert("Player " + maxPlayer + " wins showdown!")
        } else {
            window.alert("Tie!")
            console.log("BUG: Implement tie solution.")
        }
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
            this.updateMessage("Player " + playerNumber + " was eliminated.", handler())
        })
        if (copyPlayers.length == 1) {
            window.alert("Player " + copyPlayers[0] + " wins!")
        }
    }


    printState() {
        console.log(this.state)
    }

    showCurrentPlayerCards() {
        var displayCopy = this.state.isDisplayed
        displayCopy[this.state.currentTurn - 1] = true
        displayCopy[4] = true
        this.setState({isDisplayed: displayCopy})
    }

    hideAllCards() {
        var displayCopy = this.state.isDisplayed
        for (var i = 0; i < displayCopy.length; i++) {
            displayCopy[i] = false
        }
        this.setState({isDisplayed: displayCopy})
    }

    showAllCards() {
        var displayCopy = this.state.isDisplayed
        for (var i = 0; i < displayCopy.length; i++) {
            displayCopy[i] = true
        }
        this.setState({isDisplayed: displayCopy})
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    <p>Current Turn: Player {this.state.currentTurn}</p>
                    <div>
                        Current Draw Card
                        {this.state.isDisplayed[4] && <button onClick={ () => { this.playCard(this.state.drawCard, 0)}}>{this.state.drawCard}</button> }
                        <div>
                            Hand One{this.state.isDisplayed[0] && 
                            <button onClick={(() => { this.playerPlayCard(1, this.state.hands[0]) })}>{this.state.hands[0]}</button> }
                        </div> 
                        <div>
                            Hand Two{this.state.isDisplayed[1] && 
                            <button onClick={ () => { this.playerPlayCard(2, this.state.hands[1]) }}>{this.state.hands[1]}</button>}
                        </div> 
                        
                        <div>
                            Hand Three{ this.state.isDisplayed[2] &&
                            <button onClick={ () => { this.playerPlayCard(3, this.state.hands[2]) }}>{this.state.hands[2]}</button> }
                        </div> 
                        <div>
                            Hand Four{ this.state.isDisplayed[3] && 
                            <button onClick={ () => { this.playerPlayCard(4, this.state.hands[3]) }}>{this.state.hands[3]}</button> }
                        </div> 
                    </div>
                    <div>
                        Target of Card
                        <input type="radio" value="1" name="target" defaultChecked/>Player 1
                        <input type="radio" value="2" name="target" />Player 2
                        <input type="radio" value="3" name="target" />Player 3
                        <input type="radio" value="4" name="target" />Player 4
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
                    <p>Current Live Players: { JSON.stringify(this.state.playersInGame)}</p>
                    <p>Handmaiden Status for Players (in order): { JSON.stringify(this.state.isHandMaiden)}</p>
                    <p>Cards in the deck {this.state.deck.length}</p>
                    <p>Debug</p>
                    <button onClick = {() => { this.showCurrentPlayerCards()}}>Show Current Player Cards</button>
                    <button onClick={() => { this.hideAllCards()}}>Hide All Cards</button>
                    <button onClick={() => { this.showAllCards()}}>Show All Cards</button>
                    {/* <button onClick={() => {this.printState()}}>Print State</button> */}
                    </Col>
                    <Col>
                        <h3>Game History</h3>
                        <p>Message  0: {this.state.message[0]}</p>
                        <p>Message -1: {this.state.message[1]}</p>
                        <p>Message -2: {this.state.message[2]}</p>
                        <p>Message -3: {this.state.message[3]}</p>
                        <p>Message -4: {this.state.message[4]}</p>
                        <p>Message -5: {this.state.message[5]}</p>
                        <h3 className="bg-primary">If deck runs out, player with the highest value card wins! Or win by being the last remaining player.</h3>
                        <h4>Reference Card (Name (# in deck)):</h4>
                        <p>Princess (1): If played/discarded, player is eliminated. (Value: 8)</p>
                        <p>Countess (1): Must play if your other card is a king or prince. (Value: 7)</p>
                        <p>King (1): Trade cards with another player. (Value: 6)</p>
                        <p>Prince (2): Force target to discard their hand. Can target self. (Value: 5)</p>
                        <p>Handmaiden (2): Player cannot be targeted until their next turn. (Value: 4)</p>
                        <p>Baron (2): Compare cards with another player. Lower value card player is eliminated. No effect on tie. (Value: 3)</p>
                        <p>Priest (2): Look at another player's hand card. (Value: 2)</p>
                        <p>Guard (5): Guess another player's card. If correct, they are eliminated. Cannot guess 'Guard'. (Value: 1)</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoveLetter;