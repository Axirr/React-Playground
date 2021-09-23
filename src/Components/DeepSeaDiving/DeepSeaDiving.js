import React from 'react';
import Game from '../Game/Game'
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from '../Game/Game.module.css'

class DeepSeaDiving extends Game {
    //
    //
    // CHANGE THESE FOR PRODUCTION 

    portnumber ='';
    hostname = 'www.scottsherlock.one';
    withDebug = false
    waitTime = 1000

    // portNumber = 8000;
    // hostname = '0.0.0.0';
    // withDebug = true
    // waitTime = 1000

    // hostname = '44.230.70.0';



    // END CHANGE FOR PRODUCTION
    //
    //

    isAI = false
    gameId = 1
    currentPlayerNumber = 1
    phaseColorToggle = true

    withDebug = true
    withSpoof = false
    maxPlayers = 2
    doShuffle = false
    maxRemainingRounds = 1
    buttonPhase = 0
    maxOxygen = 2;
    doRemove = false;

    gameName = 'deepsea'

    constructor(props) {
        super(props)
        if (props.withSpoof) {
            this.withSpoof = props.withSpoof;
        }
    }

    localState = {
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        savedTreasure: [[],[],[],[]],
        heldTreasure: [[],[],[],[]],
        dice: ["none", "none"],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        points: [0,0,0,0],
        board: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        isUp: [false, false, false, false],
        treasureBoard: [1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4],
        oxygenCounter: this.maxOxygen,
        remainingRounds: this.maxRemainingRounds,
        maxPlayers: this.maxPlayers,
        doShuffle: this.doShuffle,
        maxRemainingRounds: this.maxRemainingRounds,
        buttonPhase: this.state.buttonPhase,
        maxOxygen: this.maxOxygen,
    }

    state = {
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        savedTreasure: [[],[],[],[]],
        heldTreasure: [[],[],[],[]],
        dice: ["none", "none"],
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        points: [0,0,0,0],
        board: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        isUp: [false, false, false, false],
        treasureBoard: [1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4],
        oxygenCounter: this.maxOxygen,
        remainingRounds: this.maxRemainingRounds,
        maxPlayers: this.maxPlayers,
        doShuffle: this.doShuffle,
        maxRemainingRounds: this.maxRemainingRounds,
        buttonPhase: this.state.buttonPhase,
        maxOxygen: this.maxOxygen,
    }

    componentDidMount() {
        // this.setup(this.maxPlayers);
        this.apiGetGameState(true);
    }

    setup(playerNumber) {
        this.maxPlayers = playerNumber;
        let newPlayers = [];
        let newSavedTreasures = [];
        let newHeldTreasures = [];
        let newPoints = [];
        let newIsUp = [];
        for (let i = 1; i <= this.maxPlayers; i++) { 
            newPlayers.push(i);
            newSavedTreasures.push([]);
            newHeldTreasures.push([]);
            newPoints.push(0);
            newIsUp.push(false);
        };
        this.localState = {
            playersInGame: newPlayers,
            currentTurn: 1,
            savedTreasure: newSavedTreasures,
            heldTreasure: newHeldTreasures,
            dice: ["none", "none"],
            message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
            points: newPoints,
            board: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            isUp: newIsUp,
            treasureBoard: [1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4],
            oxygenCounter: this.maxOxygen,
            remainingRounds: this.maxRemainingRounds
        }
        this.rerenderState();
    }

    playTurn(withRoll = true, withAdvance = false) {
        if (withRoll) {
            this.roll();
        }
        this.resolveRoll();
        if (withAdvance) {
            this.advanceTurn();
        }
        this.rerenderState();
    }

    advanceTurn() {
        this.state.buttonPhase = 0;
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
            for (i = 0; i < potentialPlayers.length; i++) {
                if (this.localState.playersInGame.indexOf(potentialPlayers[i]) !== -1) {
                    console.log("Next player is " + potentialPlayers[i])
                    nextClosestPlayer = potentialPlayers[i]
                    break
                }
            }
        } else {
            nextClosestPlayer = this.localState.playersInGame[(currentIndex + 1) % this.state.playersInGame.length] 
        }
        if (this.doRemove) {
            this.doRemove = false
            this.localState.playersInGame.splice(this.localState.playersInGame.indexOf(this.localState.currentTurn), 1);
        }
        console.log("Next closest player" + nextClosestPlayer);
        this.localState.currentTurn = nextClosestPlayer
        this.startTurnProcedures()
        this.rerenderState()
    }

    startTurnProcedures() {
        this.subtractOxygen();
        this.resetRoll();
        if (this.localState.oxygenCounter <= 0) {
            this.localState.remainingRounds -= 1;
            if (this.localState.remainingRounds === 0) {
                this.state.buttonPhase = -1;
                this.determineWinner();
            } else {
                this.createNewRound();
            }
        }
    }

    createNewRound() {
        // Drop held treasures
        this.updateMessage("IMPLEMENT TREASURE DROP");
        this.printTreasureStatus();

        this.localState.playersInGame = []
        console.log("Max players " + this.maxPlayers);
        for (let i = 0; i < this.maxPlayers; i++) {
            this.localState.playersInGame.push(i + 1);
        }

        // Reset saved treasures
        for (let i = 0; i < this.localState.playersInGame.length; i++) {
            this.localState.heldTreasure[i] = [];
        }

        for (let i = this.localState.treasureBoard.length - 1; i >= 0; i--) {
            if (this.localState.treasureBoard[i] === "x") {
                this.localState.treasureBoard.splice(i, 1);
            }
        }
        this.localState.board = []
        for (let i = 0; i < this.localState.treasureBoard.length; i++) {
            this.localState.board.push(0);
        }

        this.localState.oxygenCounter = this.maxOxygen;
        this.localState.currentTurn = 1;
        this.localState.dice = ["none", "none"];
        this.localState.isUp = [false, false, false, false];
        this.rerenderState()
    }

    printTreasureStatus() {
        for (let i = 0; i < this.localState.savedTreasure.length; i++) {
            this.updateMessage("Player " + (i + 1) + " treaure: " + this.localState.savedTreasure[i])
        }
    }

    // determineWinner() {
    //     let singlePoints = [0,0,1,1,2,2,3,3];
    //     let doublePoints = [4,4,5,5,6,6,7,7];
    //     let triplePoints = [8,8,9,9,10,10,11,11];
    //     let quadPoints = [12,12,13,13,14,14,15,15];
    //     let points = [];
    //     for (let i = 0; i < this.maxPlayers; i++) {
    //         points.push(0);
    //     }
    //     for (let i = 0; i < this.maxPlayers; i++) {
    //         let treasures = this.localState.savedTreasure[i];
    //         for (let j = 0; j < treasures.length; j++) {
    //             if (treasures[j] === 1) {
    //                 points[i] = points[i] + singlePoints.splice(Math.floor(Math.random() * singlePoints.length), 1);
    //             } else {
    //                 console.log("Not equal to 1. Is this right?");
    //             }
    //         }
    //     }
    //     let maxPlayerNumber = -1;
    //     let maxPointValue = -1;
    //     for (let i = 0; i < points.length; i++) {
    //         if (points[i] > maxPointValue) {
    //             maxPlayerNumber = i;
    //             maxPointValue = points[i];
    //         }
    //     }
    //     this.updateMessage("Player " + (maxPlayerNumber + 1) + " wins with " + maxPointValue + " points!");
    //     this.updateMessage("IMPLEMENT TIE.")
    //     this.rerenderState();
    // }

    subtractOxygen() {
        let treasureNumber = this.getCurrentTreasureNumberForPlayer();
        this.updateMessage(treasureNumber + " oxygen is subtracted.");
        this.localState.oxygenCounter -= treasureNumber;
    }

    getCurrentTreasureNumberForPlayer() {
        console.log(this.localState.heldTreasure);
        console.log(this.localState.currentTurn);
        return this.localState.heldTreasure[this.localState.currentTurn - 1].length;
    }

    resolveRoll() {
        this.movePlayerForDice();
    }

    resetRoll() {
        this.localState.dice = ["none", "none"];
    }

    movePlayerForDice() {
        let movementValue = Math.max(this.getRollValue() - this.getCurrentTreasureNumberForPlayer(),0);
        // if (this.localState.isUp[this.localState.currentTurn - 1]) {
        //     movementValue = -movementValue;
        // }
        let playerIndex = this.localState.board.indexOf(this.localState.currentTurn);
        let indexToMoveTo;
        if (playerIndex === -1) {
            indexToMoveTo = -1;
            console.log("Initial move.");
        } else {
            this.localState.board[playerIndex] = 0;
            console.log("Not initial move.");
            indexToMoveTo = playerIndex;
        }
        let remainingMoves = movementValue;
        let incrementor = 1;
        if (this.localState.isUp[this.localState.currentTurn - 1]) {
            incrementor = -1;
            console.log("negative incrementor")
            console.log("remaining moves(outside) " + remainingMoves);
        }
        while (remainingMoves > 0) {
            indexToMoveTo = this.nextFreeSpace(indexToMoveTo + incrementor);
            remainingMoves--;
            console.log("Remaining moves" + remainingMoves);
        }
        if (indexToMoveTo >= 0) {
            this.localState.board[indexToMoveTo] = this.localState.currentTurn;
        } else {
            this.doRemove = true;
            console.log("Players " + this.localState.playersInGame);
            for(let i = 0; i < this.localState.heldTreasure[this.localState.currentTurn - 1].length; i++) {
                this.localState.savedTreasure[this.localState.currentTurn - 1].push(this.localState.heldTreasure[this.localState.currentTurn - 1][i]);
            }
            this.localState.heldTreasure[this.localState.currentTurn - 1] = [];
        }
    }

    nextFreeSpace(targetIndex) {
        let returnIndex;
        let incrementor = 1;
        if (this.localState.isUp[this.localState.currentTurn - 1]) incrementor = -1;
        if (true) {
            for (let i = targetIndex; i >= -1; i = i + incrementor) {
                // Bounce back
                let testValue = i;
                if (i >= this.localState.board.length) {
                    testValue = (this.localState.board.length - 1) - (i - this.localState.board.length)
                }
                console.log("Testing index " + testValue);
                if (this.localState.board[testValue] === 0) {
                    returnIndex = testValue;
                    break;
                }
                if (testValue === -1) {
                    returnIndex = -1;
                    break;
                }
            }
        }
        return returnIndex;
    }

    getRollValue() {
        let value = parseInt(this.localState.dice[0]) + parseInt(this.localState.dice[1]);
        console.log("Roll is " + value);
        return value;
    }


    roll() {
        this.localState.dice = [
            Math.floor(Math.random() * 3 + 1),
            Math.floor(Math.random() * 3 + 1)
        ]
        this.state.buttonPhase = 2;
        this.updateMessage("Player " + this.localState.currentTurn + " rolls " + (this.localState.dice[0] + this.localState.dice[1]) + ".");
    }

    changeDirection(isChangingDirection) {
        if (isChangingDirection) {
            this.updateMessage("Player " + this.localState.currentTurn + " turns around!");
            this.localState.isUp[this.localState.currentTurn - 1] = true;
        } else {
            this.updateMessage("Player " + this.localState.currentTurn + " continues on!");
        }
        this.state.buttonPhase = 1;
        this.rerenderState()
    }

    spaceHasTreasure() {
        let playerIndex = this.localState.board.indexOf(this.localState.currentTurn);
        if (playerIndex === -1) {
            return false;
        }
        return this.localState.treasureBoard[playerIndex] !== "x";
    }

    playerIsHoldingTreasure() {
        return (this.localState.heldTreasure[this.localState.currentTurn - 1].length > 0)
    }

    takeTreasure() {
        let playerIndex = this.localState.board.indexOf(this.localState.currentTurn);
        this.localState.heldTreasure[this.localState.currentTurn - 1].push(this.localState.treasureBoard[playerIndex]);
        this.updateMessage("Player " + this.localState.currentTurn + " takes a treasure with " + this.localState.treasureBoard[playerIndex] + " pips.")
        this.localState.treasureBoard[playerIndex] = "x";
        this.advanceTurn();
    }

    // dropTreasure() {
    //     let playerIndex = this.localState.board.indexOf(this.localState.currentTurn);
    //     // this.localState.heldTreasure[this.localState.currentTurn - 1].push(this.localState.treasureBoard[playerIndex]);
    //     // this.localState.treasureBoard[playerIndex] = "x";
    //     // this.updateMessage("Player " + this.localState.currentTurn + " drops a treasure with " + this.localState.treasureBoard[playedIndex] + " pips.")
    //     this.advanceTurn();
    // }

    renderScoreBoards() {
        return(
            <div>

            </div>
        )
    }

    renderPath() {
        return(
            <div>
                {this.state.board}
            </div>
        )
    }

    renderTreasurePath() {
        return(
            <div>
                {this.state.treasureBoard}
            </div>
        )
    }

    renderHeldTreasure() {
        return(
            <div>
                {this.state.playersInGame.map((playerNumber) => {
                    return (<div>
                        {"Player " + playerNumber + " Held Treasure: " + this.state.heldTreasure[playerNumber - 1]}
                        </div>)
                })}
            </div>
        )
    }

    renderSavedTreasure() {
        return(
            <div>
                {this.state.playersInGame.map((playerNumber) => {
                    return (<div>
                        {"Player " + playerNumber + " Saved Treasure: " + this.state.savedTreasure[playerNumber - 1]}
                        </div>)
                })}
            </div>
        )
    }

    setLocalStateFromApiData(data) {
        // if (this.localState.buttonPhase !== data.buttonPhase) {
        //     this.phaseColorToggle = !this.phaseColorToggle
        // }
        this.localState.playersInGame = data.playersInGame;
        this.localState.currentTurn = data.currentTurn;
        this.localState.savedTreasure = data.savedTreasure;
        this.localState.heldTreasure = data.heldTreasure;
        this.localState.dice = data.dice;
        this.localState.message = data.message;
        this.localState.points = data.points;
        this.localState.board = data.board;
        this.localState.isUp = data.isUp;
        this.localState.treasureBoard = data.treasureBoard;
        this.localState.oxygenCounter = data.oxygenCounter;
        this.localState.remainingRounds = data.remainingRounds;
        this.localState.maxPlayers = data.maxPlayers;
        this.localState.doShuffle = data.doShuffle;
        this.localState.maxRemainingRounds = data.maxRemainingRounds;
        this.localState.buttonPhase = data.buttonPhase;
        this.localState.maxOxygen = data.maxOxygen;

        // this.mergeMessages(newMessages)
    }

    toggleDebug() {
        this.withDebug = !this.withDebug;
    }



    /// BEGIN API CALLS


    // apiGetGameState(isRefresh=false) {
    //     const https = require('http')
    //     const options = {
    //     hostname: this.hostname,
    //     port: this.portNumber,
    //     path: '/deepsea/gamestate/' + this.gameId + "/",
    //     method: 'GET'
    //     }

    //     const req = https.request(options, res => {
    //         console.log(`statusCode: ${res.statusCode}`)
    //         var body = '';

    //         res.on('data', function(chunk){
    //             body += chunk;
    //         });

    //         res.on('end', () => {
    //             const result = JSON.parse(body);
    //             if (this.withDebug) {
    //                 console.log(result[0].fields);
    //             }
    //             // this.updateMessage("Game state received.");
    //             this.setLocalStateFromApiData(result[0].fields)
    //             // console.log("Hands " + this.localState.hands)
    //             this.rerenderState();
    //             if (isRefresh) {
    //                 setTimeout(() => {this.apiGetGameState(true)}, this.waitTime);
    //             }
    //         })

    //     })

    //     req.on('error', error => {
    //         console.error(error)
    //     })

    //     req.end()
    // }

    apiChangeDirection(isChangingDirection) {
        let changeDirectionText = '0'
        if (isChangingDirection) changeDirectionText = '1'
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/changedirection/' + this.gameId + "/" + this.currentPlayerNumber + "/" + changeDirectionText + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiRoll() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/roll/' + this.gameId + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiTakeTreasure() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/taketreasure/' + this.gameId + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiDropTreasure() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/droptreasure/' + this.gameId + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiAdvanceTurn() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/advanceturn/' + this.gameId + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiSpoofDice(diceValue) {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + '/spoofdice/' + this.gameId + "/" + diceValue + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiResetTests() {
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName + "/resettests/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiSetOxygen(maxOxygen) {
        const parsedInt = parseInt(maxOxygen, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            this.alertWindow("Must be a valid integer.")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName +  "/setmaxoxygen/" + this.gameId + '/' + parsedInt + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiSetRounds(maxRounds) {
        const parsedInt = parseInt(maxRounds, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            this.alertWindow("Must be a valid integer.")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/' + this.gameName +  "/setmaxrounds/" + this.gameId + '/' + parsedInt + "/",
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
                if (body.length > 0) {
                    this.alertWindow(body)
                }
                this.apiGetGameState();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    /// END API CALLS

    // ACTUAL RENDER START

    render() {
        return(
            <div className={classes.gamebody}>
                <Container>
                    <Row>
                        <Col>
                        <div className={classes.gamestate}>
                            <h1>Deep Sea Diving</h1>
                            {this.renderScoreBoards()}
                            <div>Oxygen Counter {this.state.oxygenCounter}</div>
                            <div>Remaining Rounds (Excluding Current Round) {this.state.remainingRounds}</div>
                            <div>Current Turn: Player {this.state.currentTurn}</div>
                            {this.state.isUp[this.state.currentTurn - 1] ? <div>Current Direction Up</div> : <div>Current Direction Down</div>}
                            <div>{this.state.dice[0]}</div>
                            <div>{this.state.dice[1]}</div>
                            <div>
                                {/* {(this.state.buttonPhase === 0) ? <button id="continue" className="bg-success" onClick={() => {this.apiChangeDirection(false)}}>Continue On</button> : <button id="turnAround" className="bg-danger" disabled>Continue On</button> } */}
                                {(this.state.buttonPhase === 0) ? <button id="continue" className="bg-success" onClick={() => {this.apiChangeDirection(false)}}>Continue On</button> : null }
                            </div>
                            <div>
                                {(!this.state.isUp[this.state.currentTurn - 1] && this.state.buttonPhase === 0) ? <button id="turnAround" className="bg-success" onClick={() => {this.apiChangeDirection(true)}}>Turn Around</button> : <button id="turnAround" className="bg-danger" disabled>Turn Around</button> }
                            </div>
                            <div>
                                {(this.state.buttonPhase === 1) ? <button className="bg-success" onClick={() => {this.apiRoll()}}>Roll</button> : <button className="bg-danger" disabled>Roll</button>}
                            </div>
                            {this.withDebug ? 
                            <div>
                                <button id="spoof2" onClick={() => {this.apiSpoofDice(2)}} className={classes.tanStyledButton}>Spoof 2</button>
                                <button id="spoof3" onClick={() => {this.apiSpoofDice(3)}} className={classes.tanStyledButton}>Spoof 3</button>
                                <button id="spoof4" onClick={() => {this.apiSpoofDice(4)}} className={classes.tanStyledButton}>Spoof 4</button>
                                <button id="spoof5" onClick={() => {this.apiSpoofDice(5)}} className={classes.tanStyledButton}>Spoof 5</button>
                                <button id="spoof6" onClick={() => {this.apiSpoofDice(6)}} className={classes.tanStyledButton}>Spoof 6</button>
                                <div>
                                    <button id="resetTests" onClick={() => {this.apiResetTests()}} className={classes.tanStyledButton}>Reset Tests</button>
                                </div>
                            </div>
                            : null}
                            <div>
                                {(this.state.buttonPhase === 2 && this.spaceHasTreasure()) ? <button id="takeTreasure" className="bg-success" onClick={() => {this.apiTakeTreasure()}}>Take Treasure</button> : <button className="bg-danger" disabled>Take Treasure</button>}
                            </div>
                            <div>
                                {(this.state.buttonPhase === 2 && !this.spaceHasTreasure && this.playerIsHoldingTreasure()) ? <button id="dropTreasure" className="bg-success" onClick={() => {this.apiDropTreasure()}}>Drop Lowest Treasure</button> : <button className="bg-danger" disabled>Drop Lowest Treasure</button>}
                            </div>
                            <div>
                                {(this.state.buttonPhase === 2) ? <button id="noAction" className="bg-success" onClick={() => {this.apiAdvanceTurn()}}>No Action</button> : <button className="bg-danger" disabled>No Action</button>}
                            </div>
                            <div>{this.renderPath()}</div>
                            <div>{this.renderTreasurePath()}</div>
                            <div>Players In Game</div>
                            <div>{this.state.playersInGame}</div>
                            {this.renderSavedTreasure()}
                            {this.renderHeldTreasure()}
                            <div>
                                {this.withSpoof && 
                                <div>
                                <p>Change player numbers and restart game.</p>
                                <button onClick={() => {this.setup(2)}}>2 Players</button>
                                <button onClick={() => {this.setup(5)}}>5 Players</button>
                                </div>
    }
                            </div>
                            </div>
                        </Col>
                        <Col>
                        <div className={classes.gamestate}>
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
                                <h3>Short Rules</h3>
                                <div>Win by getting the most valuable treasure.</div>
                                <div>The group shares an oxygen tank.</div>
                                <div>Players roll to move down and up the diving path, with further treasures being worth more.</div>
                                <div>You can pick up treasures that you land on.</div>
                                <div>At the start of your turn, subtract one oxygen for each treasure you carry.</div>
                                <div>Players start moving down the path, and can choose to turn around at the start of their turn.</div>
                                <div>Once turned around, the player cannot go down again until the next round.</div>
                                <div>Also, each treasure you pick up subtracts one from your rolled movement.</div>
                                <div>At the end of 3 rounds, recovered treasure values are revealed and the player with the most points wins.</div>
                            </div>
                            <div>
                                <h3>Configure Game</h3>
                                <span className={classes.blue}>Change Player Number</span>
                                <input className={classes.styledTextInput} type="text" id="playerArea"></input>
                                <button className={classes.tanStyledButton} id="playerAreaButton" onClick={() => this.setPlayerNumber(document.getElementById("playerArea").value)}>Set Player Number</button>
                                <button className={classes.tanStyledButton} onClick={() => {this.apiCreateNewGame()}}>Create Game</button>
                                <button className={classes.tanStyledButton} onClick={() => {this.apiResetGame()}}>Reset Game</button>
                                <div>
                                        Join Game Number
                                        <input className={classes.styledTextInput} type="text" id="gameArea"></input>
                                        <button className={classes.tanStyledButton} id="gameAreaButton" onClick={() => this.apiSetGameId(document.getElementById("gameArea").value)}>Set Game ID</button>
                                </div>
                                <div>
                                    <button className={classes.tanStyledButton} onClick={() => {this.toggleDebug()}}>Toogle Debug</button>
                                </div>
                                {this.withDebug ? 
                                <div>
                                    <div>
                                    <input className={classes.styledTextInput} type="text" id="oxygenArea"></input>
                                    <button className={classes.tanStyledButton} onClick={() => {this.apiSetOxygen(document.getElementById("oxygenArea").value)}}>Set Max Oxygen</button>
                                    </div>
                                    <div>
                                    <input className={classes.styledTextInput} type="text" id="roundsArea"></input>
                                    <button className={classes.tanStyledButton} onClick={() => {this.apiSetRounds(document.getElementById("roundsArea").value)}}>Set Max Rounds</button>
                                    </div>
                                </div>
                                : null}
                            </div>
                            </div>
                            <div>
                            <h5><u>Source Code</u></h5>
                            <div>
                            <a href="https://github.com/Axirr/React-Playground/blob/main/src/Components/DeepSeaDiving/DeepSeaDiving.js">Front End</a>
                            </div>
                            <div>
                            <a href="https://github.com/Axirr/games-backend/blob/main/hello_world/deepSea.py">Back End</a>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DeepSeaDiving;