import React, {Component} from 'react';
import Game from '../Game'
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class DeepSeaDiving extends Game {
    withDebug = true
    withSpoof = false
    maxPlayers = 2
    doShuffle = false
    maxRemainingRounds = 1
    buttonPhase = 0
    maxOxygen = 2;
    doRemove = false;

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
        remainingRounds: this.maxRemainingRounds
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
        remainingRounds: this.maxRemainingRounds
    }

    componentDidMount() {
        this.setup(this.maxPlayers);
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
        this.buttonPhase = 0;
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
                this.buttonPhase = -1;
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

    determineWinner() {
        let singlePoints = [0,0,1,1,2,2,3,3];
        let doublePoints = [4,4,5,5,6,6,7,7];
        let triplePoints = [8,8,9,9,10,10,11,11];
        let quadPoints = [12,12,13,13,14,14,15,15];
        let points = [];
        for (let i = 0; i < this.maxPlayers; i++) {
            points.push(0);
        }
        for (let i = 0; i < this.maxPlayers; i++) {
            let treasures = this.localState.savedTreasure[i];
            for (let j = 0; j < treasures.length; j++) {
                if (treasures[j] === 1) {
                    points[i] = points[i] + singlePoints.splice(Math.floor(Math.random() * singlePoints.length), 1);
                } else {
                    console.log("Not equal to 1. Is this right?");
                }
            }
        }
        let maxPlayerNumber = -1;
        let maxPointValue = -1;
        for (let i = 0; i < points.length; i++) {
            if (points[i] > maxPointValue) {
                maxPlayerNumber = i;
                maxPointValue = points[i];
            }
        }
        this.updateMessage("Player " + (maxPlayerNumber + 1) + " wins with " + maxPointValue + " points!");
        this.updateMessage("IMPLEMENT TIE.")
        this.rerenderState();
    }

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

    spoofDice(diceArray) {
        this.localState.dice = diceArray;
        this.playTurn(false, true);
    }

    roll() {
        this.localState.dice = [
            Math.floor(Math.random() * 3 + 1),
            Math.floor(Math.random() * 3 + 1)
        ]
        this.buttonPhase = 2;
        this.updateMessage("Player " + this.localState.currentTurn + " rolls " + (this.localState.dice[0] + this.localState.dice[1]) + ".");
    }

    changeDirection(isChangingDirection) {
        if (isChangingDirection) {
            this.updateMessage("Player " + this.localState.currentTurn + " turns around!");
            this.localState.isUp[this.localState.currentTurn - 1] = true;
        } else {
            this.updateMessage("Player " + this.localState.currentTurn + " continues on!");
        }
        this.buttonPhase = 1;
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

    dropTreasure() {
        let playerIndex = this.localState.board.indexOf(this.localState.currentTurn);
        // this.localState.heldTreasure[this.localState.currentTurn - 1].push(this.localState.treasureBoard[playerIndex]);
        // this.localState.treasureBoard[playerIndex] = "x";
        // this.updateMessage("Player " + this.localState.currentTurn + " drops a treasure with " + this.localState.treasureBoard[playedIndex] + " pips.")
        this.advanceTurn();
    }

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

    renderPlayerTreasure() {
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

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Deep Sea Diving</h1>
                            {this.renderScoreBoards()}
                            <div>Oxygen Counter {this.state.oxygenCounter}</div>
                            <div>Remaining Rounds {this.state.remainingRounds}</div>
                            <div>Current Turn: Player {this.state.currentTurn}</div>
                            {this.state.isUp[this.state.currentTurn - 1] ? <div>Current Direction Up</div> : <div>Current Direction Down</div>}
                            <div>{this.state.dice[0]}</div>
                            <div>{this.state.dice[1]}</div>
                            <div>
                                {(this.buttonPhase === 0) ? <button id="continueOn" className="bg-success" onClick={() => {this.changeDirection(false)}}>Continue On</button> : <button id="turnAround" className="bg-danger" disabled>Continue On</button> }
                            </div>
                            <div>
                                {(!this.state.isUp[this.state.currentTurn - 1] && this.buttonPhase === 0) ? <button id="turnAround" className="bg-success" onClick={() => {this.changeDirection(true)}}>Turn Around</button> : <button id="turnAround" className="bg-danger" disabled>Turn Around</button> }
                            </div>
                            <div>
                                {(this.buttonPhase === 1) ? <button className="bg-success" onClick={() => {this.playTurn()}}>Roll</button> : <button className="bg-danger" disabled>Roll</button>}
                            </div>
                            <div>
                                {(this.buttonPhase === 2 && this.spaceHasTreasure()) ? <button className="bg-success" onClick={() => {this.takeTreasure()}}>Take Treasure</button> : <button className="bg-danger" disabled>Take Treasure</button>}
                            </div>
                            <div>
                                {(this.buttonPhase === 2 && !this.spaceHasTreasure && this.playerIsHoldingTreasure()) ? <button className="bg-success" onClick={() => {this.dropTreasure()}}>Drop Lowest Treasure</button> : <button className="bg-danger" disabled>Drop Lowest Treasure</button>}
                            </div>
                            <div>
                                {(this.buttonPhase === 2) ? <button className="bg-success" onClick={() => {this.advanceTurn()}}>No Action</button> : <button className="bg-danger" disabled>No Action</button>}
                            </div>
                            <div>{this.renderPath()}</div>
                            <div>{this.renderTreasurePath()}</div>
                            {this.renderPlayerTreasure()}
                            <div>
                                {this.withSpoof && 
                                <div>
                                <p>Change player numbers and restart game.</p>
                                <button onClick={() => {this.setup(2)}}>2 Players</button>
                                <button onClick={() => {this.setup(5)}}>5 Players</button>
                                <button id="spoof33" onClick={() => this.spoofDice(["3","3"])}>Spoof Dice 3 3</button>
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DeepSeaDiving;