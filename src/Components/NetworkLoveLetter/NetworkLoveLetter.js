import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LoveLetter/LoveLetter.module.css'
import guardCard from '../LoveLetter/CardImages/guard.png'
import priestCard from '../LoveLetter/CardImages/priest.png'
import baronCard from '../LoveLetter/CardImages/baron.png'
import handmaidenCard from '../LoveLetter/CardImages/handmaiden.png'
import princeCard from '../LoveLetter/CardImages/prince.png'
import kingCard from '../LoveLetter/CardImages/king.png'
import countessCard from '../LoveLetter/CardImages/countess.png'
import princessCard from '../LoveLetter/CardImages/princess.png'
import Game from '../Game';

class NetworkLoveLetter extends Game {

    // portNumber = 80;
    portNumber = 8000;
    // portNumber = 443;
    portnumber ='';

    hostname = '0.0.0.0';
    // hostname = '44.230.70.0';
    // hostname = 'www.scottsherlock.one';

    isAI = false
    isGameOver = false
    withDebug = false
    gameId = 1;
    playerNumber = 0;
    displayHands = true;

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
        // this.deal(4)

        // Pre-load card images
        let pictures = [guardCard, priestCard, baronCard, handmaidenCard, princeCard, kingCard, countessCard, princessCard]
        pictures.forEach((picture) => {
            let img = new Image();
            img.src = picture
        })
        this.apiGetGameState(true);
    }

    rerenderState(handler = () => {}) {
        this.setState(this.localState, handler)
    }
    
    alertWindow(message) {
        if (!this.isAI || this.localState.currentTurn === 1) {
            window.alert(message)
        }
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

    getGuardGuess() {
        var radios = document.getElementsByName("guardGuess")
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value
            }
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
        var displayCopy = this.localState.isDisplayed
        for (var i = 0; i < displayCopy.length; i++) {
            displayCopy[i] = false
        }
        this.localState['isDisplayed'] = displayCopy
        this.rerenderState()
    }

    showAllCards() {
        var displayCopy = this.localState.isDisplayed
        for (var i = 0; i < displayCopy.length; i++) {
            displayCopy[i] = true
        }
        this.localState['isDisplayed'] = displayCopy
        this.rerenderState()
    }

    renderHands() {
        if (this.withDebug) {
            return(
                <div>
                    {this.state.playersInGame.map((number) => {
                        return(
                        <div class="col-12">Hand {number}{true && 
                            <div>
                                <div>
                            <button id={"hand"+number}> 
                            <img src={this.getLinkForCard(this.localState.hands[number - 1])} width="100" 
                            onClick={(() => { this.playerPlayCard(number, this.localState.hands[number - 1]) })}/>
                            </button> 
                                </div>
                            </div>}
                        </div>);
                    })}
                </div>
            );
        } else {
            return(
                <div>
                    {this.state.playersInGame.map((number) => {
                        return(
                        <div class="col-12">Hand {number}{(this.playerNumber === number) && 
                            <div>
                                <div>
                                    <button id={"hand"+number}> 
                                        <img src={this.getLinkForCard(this.localState.hands[number - 1])} width="100" 
                                        onClick={(() => { this.apiPlayCard(this.localState.hands[number - 1], number) })}/>
                                    </button> 
                                </div>
                            </div>}
                        </div>);
                    })}
                </div>
            );
        }
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
        // Random choice if not princess
        let chosenCard = this.getCardToPlay(player)

        // Random valid target
        let playersCopy = [...this.localState.playersInGame]
        playersCopy = this.returnShuffledArray(playersCopy)
        let playerTarget = playersCopy[0]
        for (let i = 0; i < playersCopy.length; i++) {
            if (playersCopy[i] !== player && !this.localState.isHandMaiden[playersCopy[i] - 1]) {
                playerTarget = playersCopy[i]
                break
            }
        }
        this.setTarget(playerTarget)

        this.setRandomGoodGuess()

        let cardNumber = 0
        if (this.localState.hands[this.currentTurn - 1] === chosenCard) {
            cardNumber = this.currentTurn - 1
        }
        this.rerenderState(() => {
            // this.playerPlayCard(this.localState.currentTurn, chosenCard)
            this.apiPlayCard(chosenCard, cardNumber, true)
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

    returnShuffledArray(deck) {
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
        // console.log(deckCopy)
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
            <div>
                <div>Current Live Players: </div>
                {this.localState.playersInGame.map(number => {
                    return(<div>Player {number}</div>)
                })}
            </div>
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
    
    setPlayerNumber(playerNumber) {
        const parsedInt = parseInt(playerNumber, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Player number must be a valid integer.")
            return
        }
        if (parsedInt <= 0 || parsedInt > this.localState.totalNumberOfPlayers) {
            window.alert("Player number must within player range.");
            return
        }
        this.playerNumber = parsedInt;
        // this.alertWindow("Player number has been set to " + parsedInt + ".");
        this.rerenderState();
    }

    apiCreateNewGame() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/loveletter/creategame/',
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                console.log("Response " + body);
                this.alertWindow("New game created! Game ID is " + body);
                this.gameId = body;
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiGetGameState(isRefresh=false) {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/loveletter/gamestate/' + this.gameId + "/",
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                const result = JSON.parse(body);
                console.log(result[0].fields);
                // console.log(result);
                this.updateMessage("Game state received.");
                this.setLocalStateFromApiData(result[0].fields)
                this.rerenderState();
                if (isRefresh) {
                    setTimeout(() => {this.apiGetGameState(true)}, 3000);
                }
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    setLocalStateFromApiData(data) {
        this.localState.hands = this.getArrayForCsvString(data.hands);
        this.localState.drawCard = data.drawCard;
        this.localState.currentTurn = data.currentTurn;
        this.localState.deck = this.getArrayForCsvString(data.deck);
        this.localState.playersInGame = this.getNumericalArrayForCsvString(data.playersInGame);
        this.localState.isHandMaiden = this.getBooleanArrayForCsvString(data.isHandMaiden);
        this.localState.message = this.getArrayForCsvString(data.message);
        this.localState.setAsideCard = data.setAsideCard;
        this.localState.isDisplayed = this.getBooleanArrayForCsvString(data.isDisplayed);
        this.localState.useDefaultDeck = data.useDefaultDeck;
        this.localState.totalNumberOfPlayers = data.totalNumberOfPlayers;
        this.localState.playedCards = data.playedCards;
    }

    getArrayForCsvString(csvString) {
        if (csvString === "") return []
        let result = csvString.split(',');
        return result
    }

    getNumericalArrayForCsvString(csvString) {
        if (csvString === "") return []
        let result = csvString.split(',');
        for (let i = 0; i < result.length; i++) {
            result[i] = Number.parseInt(result[i])
        }
        return result;
    }

    getBooleanArrayForCsvString(csvString) {
        if (csvString === "") return []
        let result = csvString.split(',');
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
            if (result[i] === '0') {
                result[i] = false;
            } else if (result[i] === '1'){
                result[i] = true;
            } else {
                console.log("Error parsing boolean");
            }
        }
        // console.log(result);
        return result;
    }

    apiAdvanceTurn() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/loveletter/advanceturn/' + this.gameId + "/",
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                const result = JSON.parse(body);
                console.log(result[0].fields);
                // this.updateMessage("Game state received.");
                this.setLocalStateFromApiData(result[0].fields)
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiDeal(numberOfPlayers) {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/loveletter/deal/' + this.gameId + "/" + numberOfPlayers + "/",
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                const result = JSON.parse(body);
                console.log(result[0].fields);
                this.isGameOver = false;
                // this.updateMessage("Game state received.");
                this.setLocalStateFromApiData(result[0].fields)
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiPlayCard(card, cardNumberSelected, isAi=false) {
        if (!isAi) {
            if (this.playerNumber != this.localState.currentTurn) {
                this.alertWindow("Not current turn!")
                return
            }
            if (cardNumberSelected !== 0 && cardNumberSelected != this.playerNumber) {
                this.alertWindow("Can't select another player's card!")
                return
            }

            // Note: invalidty alert messages generated by isValidTarget()
            if (['king', 'prince', 'baron', 'priest', 'guard'].indexOf(card) != -1) {
                if (!this.isValidTarget()) {
                    return
                }
            }
        }
        let spoofPlayerNumber = this.playerNumber;
        if (isAi) spoofPlayerNumber = this.localState.currentTurn
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/loveletter/playCard/' + this.gameId + "/" + card + "/" + spoofPlayerNumber + "/" + this.getTargetPlayerNumber() + "/" + this.getGuardGuess() + "/",
        method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                const result = JSON.parse(body);
                console.log(result[0].fields);
                this.updateMessage("Game state received.");
                this.setLocalStateFromApiData(result[0].fields)
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }
    
    setGameId(gameId) {
        const parsedInt = parseInt(gameId, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            window.alert("Game ID must be a valid integer.")
            return
        }
        const http = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/loveletter/' + gameId + '/checkId/',
        method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                console.log("Response " + body);
                if (body == "ID GOOD") {
                    this.updateMessage("Game ID updated to " + gameId);
                    this.gameId = gameId;
                } else if (body === "ID BAD") {
                    this.updateMessage("GAME ID BAD. NOT UPDATED");
                }
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiResetCurrentGame(gameId) {
        const http = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/loveletter/' + gameId + '/resetGame/',
        method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                const result = JSON.parse(body);
                console.log(result[0].fields);
                // this.updateMessage("Game state received.");
                this.setLocalStateFromApiData(result[0].fields)
                this.rerenderState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    toggleDebug() {
        this.withDebug = !this.withDebug
        this.apiGetGameState()
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    <div>Current Player Id: {this.playerNumber}</div>
                    <div>
                        Player Number
                        <input type="text" id="playerArea"></input>
                        <button onClick={() => this.setPlayerNumber(document.getElementById("playerArea").value)}>Set Player Number</button>
                    </div>
                    <button id="playAiTurn" onClick={() => {this.playTurn(this.localState.currentTurn)}}>Play AI Turn</button>
                    <div>Current Turn: Player {this.state.currentTurn}</div>
                    <div>Cards Left in the Deck: {this.state.deck.length}</div>
                    <Row className="border">
                        <Col>
                    <div>
                        <div>Current Draw Card</div>
                        {(this.playerNumber == this.localState.currentTurn || this.withDebug) && <button id="drawCard" onClick={ () => { this.apiPlayCard(this.state.drawCard, 0)}}>
                        <img src={this.getLinkForCard(this.localState.drawCard)} width="100" />
                        </button> }
                        {this.renderHands()}
                    </div>
                        </Col>
                        <Col>
                    <div>
                        Target of Card
                        {this.renderTargets()}
                    </div>
                    <hr></hr>
                    <div>
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
                    <p>...</p>
                    <Row>
                    <Col>{this.renderLivePlayers()}</Col>
                    <Col>{this.renderHandmaidenStatus()}</Col>
                    </Row>
                    <button onClick = {() => { this.toggleDebug()}}>Show/Hide All Cards</button>
                    {/* <button onClick = {() => { this.showCurrentPlayerCards()}}>Show Current Player Cards</button>
                    <button onClick={() => { this.hideAllCards()}}>Hide All Cards</button>
                    <button onClick={() => { this.showAllCards()}}>Show All Cards</button>
                    <button onClick={() => {this.apiGetGameState()}}>Get Game State</button>
                    <button onClick={() => {this.apiAdvanceTurn()}}>Advance Turn</button>
                    <button onClick={() => {this.apiDeal(4)}}>Restart Game for 4</button>
                    <button onClick={() => {this.apiPlayCard("handmaiden")}}>Play Card Test</button> */}
                    <div><b>Configure Game</b></div>
                    {this.withDebug ? 
                    <div>
                        <button onClick={() => {this.printState()}}>Print State</button>
                        <button onClick={() => {this.rerenderState()}}>Rerender State</button>
                    </div> : <p></p>}
                    </Col>
                    <Col>
                        <h3>Game History</h3>
                        <p>Message  0: {this.state.message[0]}</p>
                        <p>Message -1: {this.state.message[1]}</p>
                        <p>Message -2: {this.state.message[2]}</p>
                        <p>Message -3: {this.state.message[3]}</p>
                        <p>Message -4: {this.state.message[4]}</p>
                        <p>Message -5: {this.state.message[5]}</p>
                        <div><b>Configure Game</b></div>
                        <div>
                            Game Number
                            <input type="text" id="gameArea"></input>
                            <button onClick={() => this.setGameId(document.getElementById("gameArea").value)}>Set Game ID</button>
                        </div>
                        <div>
                            <button onClick={() => this.apiCreateNewGame()}>Create New Game</button>
                        </div>
                        <div>
                            <button onClick={() => {this.apiResetCurrentGame(this.gameId)}}>Reset Game</button>
                        </div>
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
                    <h3>Choose Number of Players and Restart Game</h3>
                    <button onClick={() => {this.redeal(2)} }>2 Players</button>
                    <button onClick={() => {this.redeal(3)} }>3 Players</button>
                    <button onClick={() => {this.redeal(4)} }>4 Players</button>
                    <p></p>
                    <a href="https://github.com/Axirr/React-Playground/blob/main/src/Components/LoveLetter/LoveLetterAI.js">Love Letter Source Code</a>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NetworkLoveLetter;