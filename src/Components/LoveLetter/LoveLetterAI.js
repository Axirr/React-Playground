import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoveLetter.module.css'
import guardCard from './CardImages/guard.png'
import priestCard from './CardImages/priest.png'
import baronCard from './CardImages/baron.png'
import handmaidenCard from './CardImages/handmaiden.png'
import princeCard from './CardImages/prince.png'
import kingCard from './CardImages/king.png'
import countessCard from './CardImages/countess.png'
import princessCard from './CardImages/princess.png'
import cardBack from './CardImages/cardback.svg'
import classes from '../Game/Game.module.css'
import tombstone from './CardImages/tombstone.jpg'

class LoveLetterAI extends Component{
    isAI = true
    isGameOver = false
    withDebug = false
    allAI = true
    // allAI = false
    doShowAllCards = false
    cardWidth = "100"
    cardHeight = "130"

    localState = {
        hands: ["none", "none", "none", "none"],
        drawCard: "none",
        currentTurn: 1,
        deck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"],
        playersInGame: [1, 2, 3, 4],
        isHandMaiden: [false, false, false, false],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        setAsideCard: "none",
        isDisplayed: [false, false, false, false, false, false],
        useDefaultDeck: true,
        defaultDeck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"],
        totalNumberOfPlayers: 4,
        playedCards: []
    }


    state = {
        hands: ["none", "none", "none", "none"],
        drawCard: "none",
        currentTurn: 1,
        deck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"],
        playersInGame: [1, 2, 3, 4],
        isHandMaiden: [false, false, false, false],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        setAsideCard: "none",
        isDisplayed: [false, false, false, false, false, false],
        useDefaultDeck: true,
        defaultDeck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"],
        totalNumberOfPlayers: 4,
        playedCards: []
    }

    constructor(props) {
        super(props)
        if (props.debug) {
            this.withDebug = props.debug
        }
    }
    

    componentDidMount() {
        this.deal(4)

        // Pre-load card images
        let pictures = [guardCard, priestCard, baronCard, handmaidenCard, princeCard, kingCard, countessCard, princessCard]
        pictures.forEach((picture) => {
            let img = new Image();
            img.src = picture
        })
    }

    rerenderState(handler = () => {}) {
        this.setState(this.localState, handler)
    }
    
    deal(numberPlayers) {
        this.isGameOver = false
        var newDeck = []
        if (!this.props.deck) {
            newDeck = ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
        "handmaiden", "prince", "prince", "king", "countess", "princess"]
        } else {
            newDeck = this.props.deck
        }
        if (this.props.doShuffle) {
            newDeck = this.returnShuffledDeck(newDeck)
        }
        var deckCopy = [...newDeck]
        var newHands = [];
        var isHandMaiden = [];

        // Unsure why isDisplayed is numPlayers + 2, should only be plus 1 for drawCard?
        // Don't want to change the state because relied on by database
        // var isDisplayed = [false,false]
        // var isDisplayed = [true,true]
        var isDisplayed = []
        var playersInGame = []
        for (var i = 0; i < numberPlayers; i++) {
            newHands.push(deckCopy.pop())
            isHandMaiden.push(false)
            isDisplayed.push(false)
            // isDisplayed.push(true)
            playersInGame.push(i + 1)
        }

        // Remove if don't want display card displayed by default
        isDisplayed.push(true)

        // Remove if don't want Player 1 card displayed by default
        isDisplayed[0] = true

        var drawCard = deckCopy.pop()
        var setAsideCard = deckCopy.pop()
        console.log("Set aside card: " + setAsideCard)
        this.setState( {
            hands: newHands,
            drawCard: drawCard,
            currentTurn: 1,
            deck: deckCopy,
            playersInGame: playersInGame,
            isHandMaiden: isHandMaiden,
            setAsideCard: setAsideCard,
            isDisplayed: isDisplayed,
            totalNumberOfPlayers: numberPlayers,
            playedCards: []}, () => {
                this.localState = JSON.parse(JSON.stringify(this.state))
                // this.hideAllCards()
                this.rerenderState()
            } )
    }

    redeal(numberPlayers) {
        // if (this.localState.useDefaultDeck) {
        //     this.localState['deck'] = [...this.localState.defaultDeck]
        //     this.deal(numberPlayers)
        // }
        this.localState['deck'] = [...this.localState.defaultDeck]
        this.deal(numberPlayers)
        this.doShowAllCards = false;
        // this.rerenderState()
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

    playerPlayCard(playerNumber, card) {
        if (this.isGameOver) {
            window.alert("Game is over.")
            return
        }
        if (playerNumber !== this.localState.currentTurn) {
            this.alertWindow("Not your turn")
            return
        }
        this.playCard(card, playerNumber)
    }

    alertWindow(message) {
        if (!this.isAI || this.localState.currentTurn === 1) {
            window.alert(message)
        }
    }

    playCard(card, playerNumber) {
        if (playerNumber === 0 & this.isGameOver) {
            window.alert("Game is over.")
            return
        }

        if (this.localState.currentTurn === -1 ) {
            this.alertWindow("Game is over")
            return
        }

        this.removeSelfHandmaiden()

        if (!this.isValidMove(card)) {
            return
        }
        console.log(this.localState.isDisplayed)
        console.log(this.state.isDisplayed)

        if (["king", "prince", "guard", "priest", "baron"].indexOf(card) !== -1 && this.isOnlyHandmaidenTargets()) {
            this.updateMessage("Player " + this.localState.currentTurn + " played a " + card + " but had no valid targets.")
            var isDrawCardPlayed = (card === this.localState.drawCard)
            this.normalDrawAndAdvance(isDrawCardPlayed)
            // this.removeSelfHandmaiden( () => {
            //     this.normalDrawAndAdvance(isDrawCardPlayed)
            // })
        } else {
            this.isElimCardEffect(card)
        }
        console.log(this.localState.isDisplayed)
        console.log(this.state.isDisplayed)
    }

    isOnlyHandmaidenTargets(card) {
        var onlyHandmaidens = false
        if (card === "prince") {
            return onlyHandmaidens
        }
        for (var i = 0; i < this.localState.playersInGame.length; i++) {
            var potentialTarget = this.localState.playersInGame[i]

            // found valid target
            if (this.localState.isHandMaiden[potentialTarget - 1] === false && potentialTarget !== this.localState.currentTurn) {
                break;
            }

            // Reached end of search, no valid target found
            if (i === (this.localState.playersInGame.length - 1)) {
                onlyHandmaidens = true;
            }
        }
        return onlyHandmaidens
    }

    removeSelfHandmaiden() {
        var handmaidenCopy = this.localState.isHandMaiden
        handmaidenCopy[this.localState.currentTurn - 1] = false
        this.localState['isHandMaiden'] = handmaidenCopy
    }

    isElimCardEffect(card) {
        var myTarget = this.getTargetPlayerNumber()
        this.localState.playedCards.push(card)
        if (["guard","priest","baron", "prince", "king"].indexOf(card) !== -1) {
            this.updateMessage("Player " + this.localState.currentTurn + " played a " + card + " targeting Player " + myTarget + ".")
        } else if (["handmaiden"].indexOf(card) !== -1){
            this.updateMessage("Player " + this.localState.currentTurn + " played a " + card + ".")
        } else {
            this.updateMessage("Player " + this.localState.currentTurn + " played a " + card + " with no direct effect.")
        }
        var isDrawCardPlayed = (card === this.localState.drawCard)
        var notPlayedCard;
        if (isDrawCardPlayed) {
            notPlayedCard = this.localState.hands[this.localState.currentTurn - 1]
        } else {
            notPlayedCard = this.localState.drawCard
        }
        switch(card) {
            case 'princess':
                this.eliminatePlayer(this.localState.currentTurn)
                this.replaceDrawCard()
                this.advanceTurn()
                break;
            case 'countess':
                this.normalDrawAndAdvance(isDrawCardPlayed)
                break;
            case 'king':
                this.updateMessage("Player " + this.localState.currentTurn + " trades hand with Player " + myTarget + ".")
                var handsCopy = [...this.localState.hands]
                var playerOriginalHand = handsCopy[myTarget - 1]
                handsCopy[myTarget - 1] = notPlayedCard
                handsCopy[this.localState.currentTurn - 1] = playerOriginalHand
                this.localState['hands'] = handsCopy
                if (!isDrawCardPlayed) {
                    this.replaceDrawCard()
                    this.advanceTurn()
                } else {
                    this.replaceDrawCard()
                    this.advanceTurn()
                }
                break;
            case 'prince':
                // BUG: playing prince draw card you end up with the prince in your hand instead of your original hand
                //      Possibly fixed
                this.updateMessage("Player " + myTarget + " discards their hand.")
                this.updateMessage("Player " + myTarget + " hand card was a " + this.localState.hands[myTarget - 1] + ".")
                var deckCopy = [...this.localState.deck]
                handsCopy = [...this.localState.hands]
                var discardedCard = handsCopy[myTarget - 1]
                if (myTarget === this.localState.currentTurn) {
                    if (discardedCard === "prince") {
                        discardedCard = this.localState.drawCard
                    }
                }
                if (deckCopy.length >= 1) {
                    handsCopy[myTarget - 1] = deckCopy.pop()
                } else {
                    handsCopy[myTarget - 1] = this.localState.setAsideCard
                }
                this.localState['hands'] = handsCopy
                if (discardedCard === "princess") {
                    this.eliminatePlayer(myTarget)
                    // Double advance turn in case of princess seems wrong?
                    // this.advanceTurn()
                } 
                // BUG player eliminated by princess discard gets a replacement card I believe
                if (myTarget === this.localState.currentTurn) {
                    this.replaceDrawCard()
                    this.advanceTurn()
                } else {
                    this.replaceCard(this.localState.currentTurn - 1)
                    // this.replaceCard(this.localState.currentTurn)
                    this.advanceTurn()
                }
                break;
            case 'handmaiden':
                this.updateMessage("Player " + this.localState.currentTurn + " is immune until their next turn.")
                var handmaidenCopy = this.localState.isHandMaiden
                handmaidenCopy[this.localState.currentTurn - 1] = true
                this.localState['isHandMaiden'] = handmaidenCopy
                this.normalDrawAndAdvance(isDrawCardPlayed)
                break;
            case 'baron':
                var playerValue;
                if (isDrawCardPlayed) {
                    playerValue = this.getCardValue(this.localState.hands[this.localState.currentTurn - 1])
                } else {
                    playerValue = this.getCardValue(this.localState.drawCard)
                }
                var targetValue = this.getCardValue(this.localState.hands[myTarget - 1])
                var playerToEliminate = 0
                var message = "Player " + myTarget + " and Player " + this.localState.currentTurn + " tie in baron comparison."
                if (playerValue > targetValue) {
                    playerToEliminate = myTarget
                    message = "Player " + this.localState.currentTurn + " wins against Player " + myTarget + " in baron comparison."
                } else if (targetValue > playerValue) {
                    playerToEliminate = this.localState.currentTurn
                    message = "Player " + this.localState.currentTurn + " loses against Player " + myTarget + " in baron comparison."
                }
                this.updateMessage(message)
                if (playerToEliminate !== 0) {
                    this.eliminatePlayer(playerToEliminate)
                }
                if (!isDrawCardPlayed) {
                    this.replaceCard(this.localState.currentTurn)
                } else {
                    this.replaceDrawCard()
                }
                    this.advanceTurn()
                break;
            case 'priest':
                this.updateMessage("Player " + this.localState.currentTurn + " looks at the hand of Player " + myTarget + ".")
                this.alertWindow("Player " + myTarget + " has a " + this.localState.hands[myTarget - 1])
                this.normalDrawAndAdvance(isDrawCardPlayed)
                break;
            case 'guard':
                var guess = this.getGuardGuess()
                this.updateMessage("Player " + this.localState.currentTurn + " guessed " + guess + ".")
                var actualHand = this.localState.hands[myTarget - 1]
                playerToEliminate = 0
                message = "Guess was wrong."
                if (guess === actualHand) {
                    message = "Guess was right!"
                    playerToEliminate = myTarget
                } 
                this.updateMessage(message)
                if (playerToEliminate !== 0) {
                    this.eliminatePlayer(playerToEliminate)
                    this.normalDrawAndAdvance(isDrawCardPlayed)
                } else {
                    this.normalDrawAndAdvance(isDrawCardPlayed)
                } 
                break;
            default:
                console.log("ERROR, unidentified card found")
                console.log(card)
        }
        this.rerenderState()
    }

    updateMessage(newMessage) {
        // console.log("Updating message")
        var messageCopy = this.localState.message
        for (var i = 0; i < (messageCopy.length - 1); i++) {
            messageCopy[i] = messageCopy[i+1]
        }
        messageCopy[messageCopy.length - 1] = newMessage
        this.localState["message"] = messageCopy
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
            this.replaceCard(this.localState.currentTurn)
        } else {
            this.replaceDrawCard()
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
        let currentHandCard = this.localState.hands[this.localState.currentTurn - 1]
        if (currentHandCard === "countess" || this.localState.drawCard === "countess") {
            if (card !== "countess") {
                if ((currentHandCard === "prince") || (currentHandCard === "king") || (this.localState.drawCard === "prince") || (this.localState.drawCard) === "king") {
                    this.alertWindow("Invalid move. Must play the countess")
                    return false
                }
            }
        } 

        // Valid target check
        if (['king', 'guard', 'prince', 'baron', 'priest', 'guard'].indexOf(card) !== -1) {
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
        if (this.localState.playersInGame.indexOf(myTarget) === -1) {
            this.alertWindow("INVALID MOVE. Target not in game.")
            return false
        }


        // Check if handmaiden
        if (this.isOnlyHandmaidenTargets()) {
            return true
        } else if (this.localState.isHandMaiden[myTarget - 1]) {
        // Check not self unless prince
            // #BUG CAN TARGET SELF
            if (['king', 'guard', 'baron', 'priest', 'guard'].indexOf(card) !== -1) {
                if (myTarget === this.localState.currentTurn) {
                    this.alertWindow("INVALID MOVE. Cannot target self except with prince.")
                    return false
                }
            } else if (this.localState.playersInGame.length > 2) {
                this.alertWindow("INVALID MOVE. Cannot target handmaiden player.")
                return false
            } else if (card === "prince") {
                this.alertWindow("INVALID MOVE. Cannot target handmaiden player. Remember, Prince can target self.")
                return false
            }
        }
        return true
    }

    replaceDrawCard() {
        this.replaceCard(0)
    }

    replaceCard(playerNumber) {
        // var deckCopy = [...this.localState.deck]
        var drawnCard;
        if (this.localState.deck.length === 0) {
            drawnCard = "none"
        } else {
            drawnCard = this.localState.deck.pop()
        }
        if (playerNumber === 0) {
            this.localState['drawCard'] = drawnCard
            this.checkIfGameOver()
        } else {
            var copyHands = [...this.localState.hands]
            copyHands[playerNumber - 1] = this.localState.drawCard
            this.localState['hands'] = copyHands
            this.localState['drawCard'] = drawnCard
            this.checkIfGameOver()
        }
        // this.hideAllCards()
        this.hideDrawCard();
    }

    checkIfGameOver() {
        if (this.localState.deck.length === 0) {
            this.evaluateShowdownWin()
            return
        }
    }

    // BUG double win message if elimination of second last player happens when deck runs out?
    evaluateShowdownWin() {
        this.updateMessage("SHOWDOWN! Players compare card values, highest wins.")
        this.showAllCards()
        var maxPlayer = 0
        var maxValue = 0
        var isTie = false
        for (var i = 0; i < this.localState.playersInGame.length; i++) {
            var currentPlayer = this.localState.playersInGame[i]
            var cardValue = this.getCardValue(this.localState.hands[currentPlayer - 1])
            if (cardValue > maxValue) {
                maxPlayer = currentPlayer
                maxValue = cardValue
                isTie = false
            } else if (cardValue === maxValue) {
                isTie = true
            }
        }
        this.localState['currentTurn'] = -1
        this.rerenderState()
        if (!isTie) {
            this.winProcedures(maxPlayer)
            // this.updateMessage("Player " + maxPlayer + " wins showdown!")
            // window.alert("Player " + maxPlayer + " wins showdown!")
        } else {
            this.updateMessage("Tie!")
            console.log("BUG: Implement tie solution.")
        }
    }

    advanceTurn() {
        var currentIndex = this.localState.playersInGame.indexOf(this.localState.currentTurn)
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
            var nextClosestPlayer = this.localState.playersInGame[0]
            for (i = 0; i < potentialPlayers.length; i++) {
                if (this.localState.playersInGame.indexOf(potentialPlayers[i]) !== -1) {
                    nextClosestPlayer = potentialPlayers[i]
                    break
                }
            }
            this.localState['currentTurn'] = nextClosestPlayer
        } else {
            this.localState['currentTurn'] = this.localState.playersInGame[(currentIndex + 1) % this.localState.playersInGame.length]  
        }
        if (this.localState['currentTurn'] === 1) {
            this.showDrawCard();
        }
        this.rerenderState()
    }

    eliminatePlayer(playerNumber) {
        var copyPlayers = [...this.localState.playersInGame]
        let index = copyPlayers.indexOf(playerNumber)
        copyPlayers.splice(index, 1)
        this.localState['playersInGame'] = copyPlayers
        this.updateMessage("Player " + playerNumber + " was eliminated.")
        this.updateMessage("Player " + playerNumber + " discarded a " + this.localState.hands[playerNumber - 1] + ".")
        this.localState.playedCards.push(this.localState.hands[playerNumber - 1])
        if (copyPlayers.length === 1) {
            this.winProcedures(copyPlayers[0])
        }
    }

    winProcedures(player) {
        this.updateMessage("Player " + player + " wins!")
        this.isGameOver = true
        window.alert("Player " + player + " wins!")
        this.showAllCards()
    }


    printState() {
        console.log(this.state)
    }

    showCurrentPlayerCards() {
        var displayCopy = this.localState.isDisplayed
        displayCopy[this.localState.currentTurn - 1] = true
        displayCopy[this.localState.totalNumberOfPlayers] = true
        this.localState['isDisplayed'] = displayCopy
        this.rerenderState()
    }

    hideAllCards() {
        this.doShowAllCards = false
        // var displayCopy = this.localState.isDisplayed
        // for (var i = 0; i < displayCopy.length; i++) {
        //     displayCopy[i] = false
        // }
        // this.localState['isDisplayed'] = displayCopy
        this.rerenderState()
    }

    hideDrawCard() {
        var displayCopy = this.localState.isDisplayed
        displayCopy[this.state.totalNumberOfPlayers] = false
        this.localState['isDisplayed'] = displayCopy
        this.rerenderState()
    }

    showAllCards() {
        this.doShowAllCards = true
        // var displayCopy = this.localState.isDisplayed
        // for (var i = 0; i < displayCopy.length; i++) {
        //     displayCopy[i] = true
        // }
        // this.localState['isDisplayed'] = displayCopy
        this.rerenderState()
    }

    showDrawCard() {
        var displayCopy = this.localState.isDisplayed
        displayCopy[this.state.totalNumberOfPlayers] = true
        this.localState['isDisplayed'] = displayCopy
        this.rerenderState()
    }

    renderSelf() {
        return( this.state.playersInGame.includes(1) ?
            <Row>
                <Col>
                    <p>Hand</p>
                    <img alt="" src={this.getLinkForCard(this.localState.hands[0])} width={this.cardWidth} height={this.cardHeight}/>
                </Col>
                <Col>
                    {this.localState.currentTurn === 1 ? 
                    <button className={classes.tanStyledButton} id={"hand"+1} onClick={(() => { this.playerPlayCard(1, this.localState.hands[0]) })}>Play Hand Card</button> 
                    :
                    <button className={classes.tanStyledButton} id={"hand"+1} disabled>Play Hand Card</button> 
                    }
                </Col>
            </Row>
            : 
            <Row>
                <Col>
                    <p>Eliminated!</p>
                    <img alt="" src={tombstone} width={this.cardWidth} height={this.cardHeight}></img>
                </Col>
                <Col>
                    <button className={classes.tanStyledButton} id={"hand"+1} disabled>Play Hand Card</button> 
                </Col>
            </Row> 
        );
    }
    
    renderDraw() {
        return(
            (this.state.isDisplayed[this.state.totalNumberOfPlayers] || this.doShowAllCards) ?
            <Row>
            <Col>
                <div>Current Draw Card for Player {this.state.currentTurn}</div>
                <img alt="" src={this.getLinkForCard(this.localState.drawCard)} width={this.cardWidth} height={this.cardHeight} /> 
            </Col>
            <Col>
                {this.state.currentTurn === 1 ? 
                <button className={classes.tanStyledButton} id="drawCard" onClick={ () => { this.playCard(this.state.drawCard, 0)}}>Play Draw Card</button> 
                : 
                <button className={classes.tanStyledButton} id="drawCard" disabled>Play Draw Card</button> 
                }
            </Col>
            </Row>
            :
            <Row>
                <Col>
                    <div>Current Draw Card for Player {this.state.currentTurn}</div>
                    <img alt="" src={cardBack} width={this.cardWidth} height={this.cardHeight} />
                </Col>
                <Col>
                {this.state.currentTurn === 1 ? 
                <button className={classes.tanStyledButton} id="drawCard" onClick={ () => { this.playCard(this.state.drawCard, 0)}}>Play Draw Card</button> 
                : 
                <button className={classes.tanStyledButton} id="drawCard" disabled>Play Draw Card</button> 
                }
                </Col>
            </Row>  
        )
    }

    renderHands() {
        return(
            <Row>
                {this.__handsHtml(this.localState, this.doShowAllCards)}
            </Row>
        );
    }

    __handsHtml(passedLocalState, passedDoShowAllCards) {
        return(
                passedDoShowAllCards ? this.__showHandsHtml(passedLocalState, passedDoShowAllCards) : this.__dontShowOpponentHandsHtml(passedLocalState)
        );
    }

    __showHandsHtml(passedLocalState, passedDoShowAllCards) {
        return(
                this.ownRange(passedLocalState.totalNumberOfPlayers + 1, 2).map((number) => {
                    return( number === 1 ? "" :
                        <Col>Hand {number} 
                        {this.__targetHtml(passedLocalState, number)}
                                {passedLocalState.playersInGame.includes(number) ? 
                                <img alt="" src={this.getLinkForCard(this.localState.hands[number - 1])} width={this.cardWidth} height={this.cardHeight} />
                                : 
                                <img alt="" src={tombstone} width={this.cardWidth} height={this.cardHeight} ></img>}
                        </Col>
                    );
                        }))
    }

    __dontShowOpponentHandsHtml(passedLocalState) {
        return(
            (this.ownRange(passedLocalState.totalNumberOfPlayers + 1, 2)).map((number) => {
                return( number === 1 ? 
                    ""
                    : 
                    <Col>Hand {number}{ 
                        <div>
                            <div>
                                {this.__targetHtml(passedLocalState, number)}
                                {passedLocalState.playersInGame.includes(number) ? 
                                <img alt="" src={cardBack} width={this.cardWidth} height={this.cardHeight}></img>
                                : 
                                <img alt="" src={tombstone} width={this.cardWidth} height={this.cardHeight} ></img>}
                            </div>
                        </div>}
                    </Col>);
            })
        )
    }

    __targetHtml(passedLocalState, number) {
        return(
            passedLocalState.isHandMaiden[number - 1] || (!passedLocalState.playersInGame.includes(number)) ?
            <div className={classes.red}>Untargetable</div>
            :
            <div className={classes.green}>Targetable</div>
        )
    }

    ownRange(endExclusive, startInclusive=0) {
        var resultArray = []
        for (var i = startInclusive; i < endExclusive; i++) {
            resultArray.push(i)
        }
        console.log(resultArray)
        return resultArray;
    }

    getLinkForCard(card) {
        let imageLink=""
        switch (card) {
            case "guard":
                imageLink=guardCard
                break
            case "priest":
                imageLink=priestCard
                break
            case "baron":
                imageLink=baronCard
                break
            case "handmaiden":
                imageLink=handmaidenCard
                break
            case "prince":
                imageLink=princeCard
                break
            case "king":
                imageLink=kingCard
                break
            case "countess":
                imageLink=countessCard
                break
            case "princess":
                imageLink=princessCard
                break
            default:
                console.log("Error, unrecognized")
        }
        console.log(imageLink)
        return imageLink
    }

    renderTargets() {
        let allPlayers = []
        for (let i = 1; i <= this.localState.totalNumberOfPlayers; i++) {
            allPlayers.push(i)
        }
        return(
            <div>
                {allPlayers.map((number) => {
                    return(
                        <div class="col-12">
                            <input type="radio" value={number} name="target" defaultChecked/>Player {number}
                        </div>
                )})}
            </div>
        );
    }

    playTurn(player) {
        if (this.isGameOver) {
            window.alert("Game is over.")
            return
        }
        if (player === 1 && !this.allAI) {
            window.alert("Current turn is Player 1 (you). Click 'Toggle All AI' button to allow clicking 'Play AI Turn' on all turns.")
            return
        }
        // Random choice if not princess
        let chosenCard = this.getCardToPlay(player)

        // Random valid target
        let playersCopy = [...this.localState.playersInGame]
        playersCopy = this.returnShuffledDeck(playersCopy)
        let playerTarget = playersCopy[0]
        for (let i = 0; i < playersCopy.length; i++) {
            if (playersCopy[i] !== player && !this.localState.isHandMaiden[playersCopy[i] - 1]) {
                playerTarget = playersCopy[i]
                break
            }
        }
        this.setTarget(playerTarget)

        this.setRandomGoodGuess()

        this.rerenderState(() => {
            this.playerPlayCard(this.localState.currentTurn, chosenCard)
        })
    }
    
    doesActivePlayerHaveCard(player, card) {
        return (this.localState.hands[player - 1] === card || this.localState.drawCard === card)
    }

    getCardToPlay(player) {
        const playerIndex = player - 1
        let playerHand = [this.localState.hands[playerIndex], this.localState.drawCard]
        let chosenCard;
        if (playerHand.indexOf("princess") !== -1) {
            console.log("Non-princess card played")
            playerHand.splice(playerHand.indexOf("princess"), 1)
            chosenCard = playerHand[0]
        } else if ((this.doesActivePlayerHaveCard(player, "countess")) && ((this.doesActivePlayerHaveCard(player, "prince") || this.doesActivePlayerHaveCard(player, "king")))) {
            console.log("Forced countess play.")
            chosenCard = "countess"
        } else {
            if (this.localState.deck.length <= this.localState.playersInGame) {
                // play low card to keep higher one for showdown
                const handCardValue = this.getCardValue(this.localState.hands[player - 1])
                const drawCardValue = this.getCardValue(this.localState.drawCard)
                chosenCard = this.localState.hands[player - 1]
                if (drawCardValue < handCardValue) {
                    chosenCard = this.localState.drawCard
                }
            } else {
                chosenCard = playerHand[Math.floor(Math.random() * 2)]
                if (this.doesActivePlayerHaveCard(this.localState.currentTurn, 'guard') && Math.random() < 0.8) {
                    chosenCard = "guard"
                } else if (this.doesActivePlayerHaveCard(this.localState.currentTurn, "handmaiden") && Math.random() < 0.9) {
                    chosenCard = "handmaiden"
                } else if (this.doesActivePlayerHaveCard(this.localState.currentTurn, "baron")) {
                    let handCopy = [...playerHand]
                    handCopy.splice(handCopy.indexOf("baron"), 1)
                    if ((this.getCardValue(handCopy[0]) >= 3) && (this.getCardValue(handCopy[0]) > (Math.random() * 10))) {
                        chosenCard = "baron"
                    }
                }
            }

            // // check if close to end

        }
        return chosenCard
    }

    setTarget(number) {
        let radioList = document.getElementsByName("target")
        for (let i = 0; i < radioList.length; i++) {
            let button = radioList[i]
            // console.log(button["value"])
            if (Number.parseInt(button["value"]) === number) {
                button.checked = true;
                break
            } 
        }
        // console.log(radioList)
    }

    setRandomGoodGuess(player) {
        // console.log(this.localState.playedCards)
        let deckCopy = [...this.localState.defaultDeck]
        for (let i = 0; i < this.localState.playedCards.length; i++) {
            deckCopy.splice(deckCopy.indexOf(this.localState.playedCards[i]), 1)
        }
        for (let i = (deckCopy.length - 1); i >= 0; i--) {
            if (deckCopy[i] === "guard") {
                deckCopy.splice(i, 1)
            }
        }
        deckCopy.splice(deckCopy.indexOf(this.localState.drawCard), 1)
        deckCopy.splice(deckCopy.indexOf(this.localState.hands[player - 1]), 1)
        console.log(deckCopy)
        const randomGuessNumber = Math.floor(Math.random() * deckCopy.length)
        let randomGuessString = "princess"
        if (deckCopy.length > 0) {
            randomGuessString = deckCopy[randomGuessNumber]
        }
        let radioList = document.getElementsByName("guardGuess")
        for (let i = 0; i < radioList.length; i++) {
            let button = radioList[i]
            if (button["value"] === randomGuessString) {
                button.checked = true;
                break
            } 
        }
    }

    renderLivePlayers() {
        return(
            <div></div>
            // <div>
            //     <div>Current Live Players: </div>
            //     {this.localState.playersInGame.map(number => {
            //         return(<div>Player {number}</div>)
            //     })}
            // </div>
        )
    }

    renderHandmaidenStatus() {
        return(
            <div className="border">
                Can Target Player (Handmaiden Status):
                {this.localState.playersInGame.map((number) => {
                    return(<div>{this.localState.isHandMaiden[number - 1] ? <div className="bg-danger">Player {number} </div> : <div><div className="bg-success">Player {number} </div></div>}</div>)
                })}
            </div>
        )
    }

    render() {
        return (
            <div className={classes.gamebody}>
                <Container>
                    <Row>
                        <div className='col-sm-6 col-xs-12'>
                            <div className={classes.gamestate + " row align-items-center"}>
                                <div className='col-sm-6 col-xs-12'>
                                    <p>You are Player 1</p>
                                    {(this.state.currentTurn === 1) ? <div className={classes.blink_me_small}>Current Turn: Player 1 (Your Turn)</div> : <div><b>Current Turn: Player {this.state.currentTurn}</b></div> }
                                    <p>Cards in the Deck: {this.state.deck.length}</p>
                                </div>
                                <div className='col-sm-6 col-xs-12 align-right'>
                                    {this.state.currentTurn !== 1 ?
                                    <button className={classes.blink_button} id="playAiTurn" onClick={() => {this.playTurn(this.localState.currentTurn)}}>Play AI Turn</button>
                                    : 
                                    <button className={classes.tanStyledButton} id="playAiTurn" onClick={() => {this.playTurn(this.localState.currentTurn)}}>Play AI Turn</button>
                                    }
                                </div>
                            </div>
                            <Row className="border">
                                <Col className={classes.gamestate}>
                                    <Row>
                                        {this.renderDraw()}
                                        {this.renderSelf()}
                                    </Row>
                                </Col>
                                <Col>
                                    <div className={classes.gamestate}>
                                        Target of Card
                                        {this.renderTargets()}
                                    </div>
                                    <div className={classes.gamestate}>
                                        Guess for Guard
                                        <Row>
                                            <Col>
                                                <input type="radio" value="priest" name="guardGuess" defaultChecked/>Priest
                                                <input type="radio" value="baron" name="guardGuess" />Baron
                                                <input type="radio" value="handmaiden" name="guardGuess" />Handmaiden
                                                <input type="radio" value="prince" name="guardGuess" />Prince
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <input type="radio" value="king" name="guardGuess" />King
                                                <input type="radio" value="countess" name="guardGuess" />Countess
                                                <input type="radio" value="princess" name="guardGuess" />Princess
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={classes.gamestate}>
                                <h4>Opponent's Hands</h4>
                                {this.renderHands()}
                            </Row>
                            <div>
                                <p>{this.renderLivePlayers()}</p>
                                {/* <p>{this.renderHandmaidenStatus()}</p> */}
                                {/* <button className={classes.tanStyledButton} onClick = {() => { this.showCurrentPlayerCards()}}>Show Current Player Cards</button> */}
                                <button className={classes.tanStyledButton} onClick={() => { this.hideAllCards()}}>Hide Opponent Cards</button>
                                <button className={classes.tanStyledButton} onClick={() => { this.showAllCards()}}>Show Opponent Cards</button>
                                <button className={classes.tanStyledButton} onClick={() => { this.allAI = !this.allAI; } }>Toggle ALL AI</button>
                                {this.withDebug ? <div>
                                <p>Debug</p>
                                <button onClick={() => {this.printState()}}>Print State</button>
                                <button onClick={() => {this.rerenderState()}}>Rerender State</button>
                                </div> : <p></p>}
                            </div>
                        </div>
                        <div className='col-sm-6 col-xs-12'>
                            <div className={classes.gamestate}>
                                <h3>Game History</h3>
                                <p>Message  0: {this.state.message[0]}</p>
                                <p>Message -1: {this.state.message[1]}</p>
                                <p>Message -2: {this.state.message[2]}</p>
                                <p>Message -3: {this.state.message[3]}</p>
                                <p>Message -4: {this.state.message[4]}</p>
                                <p>Message -5: {this.state.message[5]}</p>
                            </div>
                            <div className={classes.rules}>
                                <h3 className="white">If deck runs out, player with the highest value card wins! Or win by being the last remaining player.</h3>
                                <h4>Reference Card (Name (# in deck)):</h4>
                                <p>Princess (1): If played/discarded, player is eliminated. (Value: 8)</p>
                                <p>Countess (1): Must play if your other card is a king or prince. (Value: 7)</p>
                                <p>King (1): Trade cards with another player. (Value: 6)</p>
                                <p>Prince (2): Force target to discard their hand. Can target self. (Value: 5)</p>
                                <p>Handmaiden (2): Player cannot be targeted until their next turn. (Value: 4)</p>
                                <p>Baron (2): Compare cards with another player. Lower value card player is eliminated. No effect on tie. (Value: 3)</p>
                                <p>Priest (2): Look at another player's hand card. (Value: 2)</p>
                                <p>Guard (5): Guess another player's card. If correct, they are eliminated. Cannot guess 'Guard'. (Value: 1)</p>
                            </div>
                            <div className={classes.rules}>
                                <h3>Choose Number of Players and Restart Game</h3>
                                <button onClick={() => {this.redeal(2)} }>2 Players</button>
                                <button onClick={() => {this.redeal(3)} }>3 Players</button>
                                <button onClick={() => {this.redeal(4)} }>4 Players</button>
                                <p></p>
                                <a href="https://github.com/Axirr/React-Playground/blob/main/src/Components/LoveLetter/LoveLetterAI.js">Love Letter Source Code</a>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LoveLetterAI;