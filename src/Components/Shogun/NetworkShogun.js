import '../../App.css';
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TokyoRules from './9b-king-of-tokyo-rulebook.pdf'
import Game from '../Game/Game'
import classes from '../Game/Game.module.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

class NetworkShogun extends Game {
    //
    //
    // CHANGE THESE FOR PRODUCTION 

    // portnumber ='';
    // hostname = 'www.scottsherlock.one';
    // withDebug = false
    // waitTime = 1000

    portNumber = 8000;
    hostname = '0.0.0.0';
    withDebug = true
    waitTime = 1000

    // hostname = '44.230.70.0';



    // END CHANGE FOR PRODUCTION
    //
    //

    isAI = false
    gameId = 1
    currentPlayerNumber = 1
    phaseColorToggle = true

    gameName = 'shogun'

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
        {'name': 'Urbavore', 'cost': 4, 'type': 'keep', 'ability': "Gain 1 extra point when starting a turn in Edo. Deal 1 extra damage when dealing damage from Edo."},
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
        deck: this.cards,
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        doShuffle: true,
        points: [0,0,0,0],
        health: [this.maxHealth,this.startHealth,this.startHealth,this.startHealth],
        energy: [0,0,0,0],
        edo: 0,
        bayEdo: 0,
        remainingRolls: 3,
        winPoints: 20,
        maxHealth: 10,
        startEnergy: 0,
        withSpoof: false,
        canBuy: false,
        canYield: false,
        buttonPhase: 0,
        maxPlayers: 4,
        isGameOver: false,
    }

    state = {
        dice: ["none", "none", "none", "none", "none", "none"],
        saved: [false, false, false, false, false, false],
        playersInGame: [1,2,3,4],
        currentTurn: 1,
        hands: [[],[],[],[]],
        deck: this.cards,
        message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
        doShuffle: true,
        points: [0,0,0,0],
        health: [this.maxHealth,this.startHealth,this.startHealth,this.startHealth],
        energy: [0,0,0,0],
        edo: 0,
        bayEdo: 0,
        remainingRolls: 3,
        winPoints: 20,
        maxHealth: 10,
        startEnergy: 0,
        withSpoof: false,
        canBuy: false,
        canYield: false,
        buttonPhase: 0,
        maxPlayers: 4,
        isGameOver: false,
    }

    componentDidMount() {
        this.apiGetGameState(true);
    }

    isCurrentTurn() {
        return (this.currentPlayerNumber === this.localState.currentTurn)
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

    verticalRenderScoreBoards() {
        return(
            <div>
                <Container>
                    <Row>
                {this.state.playersInGame.map((number) => {
                    return(
                        <div>
                            {(number === this.localState.currentTurn) ? 
                        <Row>
                            <Col>
                        <div className={`${classes.scorecard}`}>
                        <div className={classes.red}>Current Turn:</div>
                        <div>Player {number}</div>
                        <div>Score: {this.localState.points[number - 1]}</div>
                        <div>Health: {this.localState.health[number - 1]}</div>
                        <div>Energy: {this.localState.energy[number - 1]}</div>
                        </div>
                            </Col>
                        </Row> : 
                        <Row>
                            <Col>
                        <div className={`${classes.scorecard}`}>
                        <div>Player {number}</div>
                        <div>Score: {this.localState.points[number - 1]}</div>
                        <div>Health: {this.localState.health[number - 1]}</div>
                        <div>Energy: {this.localState.energy[number - 1]}</div>
                        </div>
                            </Col>
                        </Row> }
                        </div>
                        )}
                )}
                    </Row>
                </Container>
            </div>
        )
    }

    isArrayEqual(array1, array2) {
        if (array1.length !== array2.length) return false
        for (let i = 0; i < array1.length; i++) {
            console.log("array1[i] ", array1[i])
            console.log("array2[i] ", array2[i])
            if (array1[i] !== array2[i]) {
                return false
            }
        }
        return true
    }

    spoofDice(diceArray) {
        let diceCode;
        console.log("diceArray ", diceArray)
        if (this.isArrayEqual(diceArray, ["3","3","3","1","2","2"])) {
            diceCode = "333"
        } else if (this.isArrayEqual(diceArray, ["claw","3","3","1","2","2"])){
            diceCode = "oneClaw"
        } else if (this.isArrayEqual(diceArray, ["1","1","2","2","3","3"])){
            diceCode = "nothing"
        } else if (this.isArrayEqual(diceArray, ["claw","claw","claw","claw","claw","claw"])){
            diceCode = "sixClaw"
        } else if (this.isArrayEqual(diceArray, ["heart","1","1","2","2","3"])){
            diceCode = "oneHeart"
        } else if (this.isArrayEqual(diceArray, ["energy","energy","energy","energy","energy","energy"])){
            diceCode = "sixEnergy"
        } else if (this.isArrayEqual(diceArray, ["energy","claw","heart","1","2","3"])){
            diceCode = "completeDestruction"
        } else if (this.isArrayEqual(diceArray, ["energy","energy","energy","3","3","3"])){
            diceCode = "threeEnergyThreePoints"
        } else if (this.isArrayEqual(diceArray, ["energy","energy","1","1","3","3"])){
            diceCode = "twoEnergy"
        } else if (this.isArrayEqual(diceArray, ["energy","energy","energy","energy","energy","claw"])){
            diceCode = "fiveEnergyOneClaw"
        } else if (this.isArrayEqual(diceArray, ["claw","claw","1","1","2","2"])){
            diceCode = "twoClaw"
        } else {
            console.log("DICE ARRAY NOT RECOGNIZED, DICE SET DID NOT HAPPEN")
            return
        }
        this.apiSetDice(diceCode)
        setTimeout(() => {
            this.apiResolveRoll()
        }, 100)
    }

    renderHands() {
        return(
                    <div className={classes.gamestate}>
                <Row>
                        <Row>
                            {this.state.playersInGame.map((number) => {
                                return(
                                    <Col>
                                        Player {number} Hand: {this.renderCards(this.state.hands[number - 1])}
                                    </Col>
                            )})}
                        </Row>
                </Row>
                    </div>
        )
    }

    renderCards(hand) {
        return(
            <div>
                {hand.map((card) => {
                    return(<div>
                        <hr></hr>
                        <div>Name: {card['name']}</div>
                        <div>Ability: {card['ability']}</div>
                    </div>)
                })}
            </div>
        )
    }

    printState() {
        console.log(this.state)
    }

    printLocalState() {
        console.log(this.localState)
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
                : null }
            </div>
        )
    }


    advancePlayerNumber() {
        let nextClosestPlayer;
        var currentIndex = this.localState.playersInGame.indexOf(this.currentPlayerNumber)
        if (currentIndex === -1) {
            var potentialPlayers = []
            for (var i = 1; i < this.localState.totalNumberOfPlayers; i++) {
                var player = i + this.currentPlayerNumber
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
        this.currentPlayerNumber = nextClosestPlayer
        this.rerenderState()
    }

    // setPlayerNumber(playerNumber) {
    //     const parsedInt = parseInt(playerNumber, 10)
    //     if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
    //         window.alert("Player number must be a valid integer.")
    //         return
    //     }
    //     if (parsedInt <= 0 || parsedInt > this.localState.totalNumberOfPlayers) {
    //         window.alert("Player number must within player range.");
    //         return
    //     }
    //     this.currentPlayerNumber = parsedInt;
    //     this.alertWindow("Player number has been set to " + parsedInt + ".");
    //     this.rerenderState();
    // }

    getCurrentPhaseName() {
        let phasename = "";
        switch (this.localState.buttonPhase) {
            case 0:
                phasename = "Roll Phase"
                break
            case 1:
                phasename = "Yield Phase"
                break
            case 2:
                phasename = "Buy Phase"
                break
            default:
                console.log("unrecognized phase number")
        }
        return phasename
    }

    getCurrentPlayerForUpdateMessage() {
        let playerNumber = 0;
        if (this.localState.buttonPhase !== 1) {
            playerNumber = this.localState.currentTurn 
        } else {
            playerNumber = this.localState.edo
        }
        return playerNumber
    }

    setEdoPlayer() {
        if (this.localState.edo) {
            this.currentPlayerNumber = this.localState.edo
            this.apiGetGameState()
        }
    }

    setCurrentTurnPlayer() {
        this.currentPlayerNumber = this.localState.currentTurn
        this.apiGetGameState()
    }

    ////
    ////
    // API CALLS
    ////
    ////

    apiResolveRoll() {
        if (this.localState.isGameOver) {
            this.alertWindow("GAME IS OVER!")
            return
        }
        if (! this.isCurrentTurn()) {
            this.alertWindow("NOT YOUR TURN!")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + '/resolveroll/',
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

    apiSetDice(diceCode) {
        if (this.localState.isGameOver) {
            this.alertWindow("GAME IS OVER!")
            return
        }
        if (! this.isCurrentTurn()) {
            this.alertWindow("NOT YOUR TURN!")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + '/setdice/' + diceCode + "/",
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
        if (this.localState.isGameOver) {
            this.alertWindow("GAME IS OVER!")
            return
        }
        if (! this.isCurrentTurn()) {
            this.alertWindow("NOT YOUR TURN!")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/roll/' + this.gameId + "/" + this.currentPlayerNumber + "/",
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

    apiBuy(buyNumber) {
        if (this.localState.isGameOver) {
            this.alertWindow("GAME IS OVER!")
            return
        }
        if (! this.isCurrentTurn()) {
            this.alertWindow("NOT YOUR TURN!")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + "/buy/" + buyNumber + "/",
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

    apiToggleDiceSave(diceIndex) {
        if (this.localState.isGameOver) {
            this.alertWindow("GAME IS OVER!")
            return
        }
        if (! this.isCurrentTurn()) {
            this.alertWindow("NOT YOUR TURN!")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + "/toggleSave/" + diceIndex + "/",
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

    // apiCreateNewGame() {
    //     const https = require('http')
    //     const options = {
    //     hostname: this.hostname,
    //     port: this.portNumber,
    //     path: '/shogun/creategame/',
    //     method: 'GET'
    //     }

    //     const req = https.request(options, res => {
    //         console.log(`statusCode: ${res.statusCode}`)
    //         var body = '';

    //         res.on('data', function(chunk){
    //             body += chunk;
    //         });

    //         res.on('end', () => {
    //             console.log("Response " + body);
    //             this.alertWindow("New game created! Game ID is " + body);
    //             this.gameId = body;
    //             this.apiGetGameState();
    //         })

    //     })

    //     req.on('error', error => {
    //         console.error(error)
    //     })

    //     req.end()
    // }

    // apiResetGame(numberPlayers=0) {
    //     const https = require('http')
    //     const options = {
    //     hostname: this.hostname,
    //     port: this.portNumber,
    //     path: '/shogun/resetgame/' + this.gameId + "/" + numberPlayers + "/",
    //     method: 'GET'
    //     }

    //     const req = https.request(options, res => {
    //         console.log(`statusCode: ${res.statusCode}`)

    //         res.on('end', () => {
    //             this.alertWindow("Game reset.");
    //             this.apiGetGameState();
    //         })

    //     })

    //     req.on('error', error => {
    //         console.error(error)
    //     })

    //     req.end()
    // }

    // apiGetGameState(isRefresh=false) {
    //     const https = require('http')
    //     const options = {
    //     hostname: this.hostname,
    //     port: this.portNumber,
    //     path: '/shogun/gamestate/' + this.gameId + "/",
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
    //             this.updateMessage("Game state received.");
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

    setLocalStateFromApiData(data) {
        // let doMessage = false;
        if (this.localState.buttonPhase !== data.buttonPhase) {
            this.phaseColorToggle = !this.phaseColorToggle
        }
        // if (this.localState.currentTurn !== data.currentTurn) {
        //     if (data.currentTurn === this.currentPlayerNumber) {
        //         doMessage = true;
        //     }
        // }
        let newMessages = this.getArrayForCsvString(data.message)
        this.localState.dice = this.getArrayForCsvString(data.dice)
        this.localState.saved = this.getBooleanArrayForCsvString(data.notDirectUseSaved)
        this.localState.playersInGame = this.getNumericalArrayForCsvString(data.notDirectUsePlayersInGame)
        this.localState.currentTurn = data.currentTurn
        this.localState.hands = data.hands
        this.localState.deck = data.deck
        this.localState.message = newMessages
        this.localState.doShuffle = data.doShuffle
        this.localState.points = this.getNumericalArrayForCsvString(data.notDirectUsePoints)
        this.localState.health = this.getNumericalArrayForCsvString(data.notDirectUseHealth)
        this.localState.energy = this.getNumericalArrayForCsvString(data.notDirectUseEnergy)
        this.localState.edo = data.edo
        this.localState.bayEdo = data.bayEdo
        this.localState.remainingRolls = data.remainingRolls
        this.localState.winPoints = data.winPoints
        this.localState.maxHealth = data.maxHealth
        this.localState.startEnergy = data.startEnergy
        this.localState.withSpoof = data.withSpoof
        this.localState.canBuy = data.canBuy
        this.localState.canYield = data.canYield
        this.localState.buttonPhase = data.buttonPhase
        this.localState.maxPlayers = data.maxPlayers
        this.localState.isGameOver = data.isGameOver

        this.mergeMessages(newMessages)
        // if (doMessage) {
        //     this.alertWindow("Your turn started!")
        //     this.playTurnSound()
        // }
    }

    // apiSetGameId(gameId) {
    //     const parsedInt = parseInt(gameId, 10)
    //     if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
    //         window.alert("Game ID must be a valid integer.")
    //         return
    //     }
    //     const http = require('http')
    //     const options = {
    //     hostname: this.hostname,
    //     port: this.portNumber,
    //     path: '/shogun/' + gameId + "/checkId/",
    //     method: 'GET'
    //     }

    //     const req = http.request(options, res => {
    //         console.log(`statusCode: ${res.statusCode}`)
    //         var body = '';

    //         res.on('data', function(chunk){
    //             body += chunk;
    //         });

    //         res.on('end', () => {
    //             console.log("Response " + body);
    //             if (body === "ID GOOD") {
    //                 this.alertWindow("Game ID updated to " + gameId);
    //                 this.gameId = gameId;
    //                 this.apiGetGameState();
    //             } else if (body === "ID BAD") {
    //                 this.alertWindow("GAME ID BAD. NOT UPDATED");
    //             }
    //         })

    //     })

    //     req.on('error', error => {
    //         console.error(error)
    //     })

    //     req.end()
    // }

    apiDoneYielding() {
        // NOT DIRECT USE BY BUTTON
        // if (!this.localState.isGameOver) {
        //     this.alertWindow("GAME IS OVER!")
        //     return
        // }
        // if (! this.isCurrentTurn()) {
        //     this.alertWindow("NOT YOUR TURN!")
        //     return
        // }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + "/doneyielding/",
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

    apiSetMaxHealth(maxHealth) {
        const parsedInt = parseInt(maxHealth, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            this.alertWindow("Must be a valid integer.")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + "/setmaxhealth/" + parsedInt + "/",
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

    apiSetVictoryPointTarget(maxVictory) {
        const parsedInt = parseInt(maxVictory, 10)
        if(isNaN(parsedInt) || !Number.isInteger(parsedInt)) {
            this.alertWindow("Must be a valid integer.")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + "/setmaxvictory/" + parsedInt + "/",
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

    apiYieldEdo(edoString) {
        if (this.localState.isGameOver) {
            this.alertWindow("GAME IS OVER!")
            return
        }
        if (this.currentPlayerNumber !== this.localState.edo) {
            this.alertWindow("Player in Edo must click yield button!")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + "/yieldedo/" + edoString + "/",
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
                this.apiDoneYielding();
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiClearBuy() {
        if (this.localState.isGameOver) {
            this.alertWindow("GAME IS OVER!")
            return
        }
        if (! this.isCurrentTurn()) {
            this.alertWindow("NOT YOUR TURN!")
            return
        }
        const https = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/shogun/' + this.gameId + "/clearbuy/",
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
        path: '/shogun/resettests/',
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

    renderBuyCard(cardNumber) {
        // BUG: Disabling button doesn't take into account alien metabolism cost reduction, potential other card effects
        return(
        <Row>
            <Col>
                <Row>
                    <Col className="col-11">
                <div className={classes.scorecard}>
                    <div>{this.renderCardInfo(cardNumber)}</div>
                </div>
                    </Col>
                    {this.localState.deck[cardNumber] ? 
                    <div className="col my-auto">
                    <button id={"buy" + cardNumber} class={((this.localState.buttonPhase === 2 && this.localState.deck[cardNumber] && this.getCostForCard(this.localState.currentTurn, cardNumber) <= this.localState.energy[this.localState.currentTurn - 1]) && this.currentPlayerNumber === this.localState.currentTurn && !this.localState.isGameOver) ? "btn-success" : "btn-danger"} onClick={() => {this.apiBuy(cardNumber)}}>Buy</button>
                    </div> : null}

                </Row>
            </Col>
        </Row>
        )
    }

    getCostForCard(player, cardNumber) {
        let cost = this.localState.deck[cardNumber].cost
        if (this.hasCard(player, 'Alien Metabolism')) { cost -= 1}
        return Math.max(cost, 0)
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


    // ACTUAL RENDER START

    render() {
        return(
            <div className={classes.gamebody}>
                <Container>
                    <Row>
                        <Col className={"col-sm-8 col-12"}>
                            <div className={this.phaseColorToggle ? classes.phasemessage : classes.secondphasemessage}>Current Phase Is <span className={classes.red}>{this.getCurrentPhaseName()}</span> For <span className={classes.blue}>Player {this.getCurrentPlayerForUpdateMessage()}</span>.</div>
                            <Row>
                                <Col>
                                {(this.currentPlayerNumber === this.state.currentTurn) ? <div className={classes.blink_me}>Your Turn</div> : <div className={classes.hidden}>Your turn.</div>}
                                </Col>
                                <Col>
                            <h1 className={classes.gametitle}>Shogun of Edo</h1>
                                </Col>
                                <Col>
                                {(this.currentPlayerNumber === this.state.edo && this.state.buttonPhase === 1) ? <div className={classes.blink_me}>Yielding?</div> : <div className={classes.hidden}>Decide On Yielding Edo.</div>}
                                </Col>
                            </Row>
                                <div className={classes.gamestate}>
                            <Row>
                                <Col>
                                <div>
                                    <h4><u>Dice</u></h4>
                            <button id="dice0" className={this.state.saved[0] ? "btn-secondary" : "btn-warning"} onClick={() => {this.apiToggleDiceSave(0)}}>{this.state.dice[0]}</button>
                            <button id="dice1" class={this.state.saved[1] ? "btn-secondary" : "btn-warning"} onClick={() => {this.apiToggleDiceSave(1)}}>{this.state.dice[1]}</button>
                            <button id="dice2" class={this.state.saved[2] ? "btn-secondary" : "btn-warning"} onClick={() => {this.apiToggleDiceSave(2)}}>{this.state.dice[2]}</button>
                            <button id="dice3" class={this.state.saved[3] ? "btn-secondary" : "btn-warning"} onClick={() => {this.apiToggleDiceSave(3)}}>{this.state.dice[3]}</button>
                            <button id="dice4" class={this.state.saved[4] ? "btn-secondary" : "btn-warning"} onClick={() => {this.apiToggleDiceSave(4)}}>{this.state.dice[4]}</button>
                            <button id="dice5" class={this.state.saved[5] ? "btn-secondary" : "btn-warning"} onClick={() => {this.apiToggleDiceSave(5)}}>{this.state.dice[5]}</button>
                                </div>
                                <div>
                            <div>Remaining Rolls: {this.state.remainingRolls}</div>
                                </div>
                            <div>
                                <button id="roll" class={(this.localState.buttonPhase === 0 && this.state.remainingRolls > 0 && this.currentPlayerNumber === this.localState.currentTurn && !this.localState.isGameOver) ? "btn-success" : "btn-danger"} onClick={() => {this.apiRoll()}}>Roll</button>
                            </div>
                            <div>
                            <button id="resolveRoll" class={(this.localState.buttonPhase === 0 && this.currentPlayerNumber === this.localState.currentTurn && !this.localState.isGameOver) ? "btn-success" : "btn-danger"} onClick={() => {this.apiResolveRoll()}}>Lock-in Roll</button>
                            </div>
                            <div>
                                {this.withDebug && 
                                <div>
                                    <button className={classes.tanStyledButton} id="advancePlayerNumber" onClick={() => this.advancePlayerNumber()}>Advance Player Number</button>
                                    <button className={classes.tanStyledButton} id="setEdo" onClick={() => {this.setEdoPlayer()}}>Set Edo Player</button>
                                    <button className={classes.tanStyledButton} id= "setCurrent" onClick={() => {this.setCurrentTurnPlayer()}}>Set Current Player</button>
                                    <button className={classes.tanStyledButton} onClick={() => {this.apiResetGame(0)}}>Reset Game</button>
                                    <p>Change player numbers and restart game.</p>
                                    <div>
                                        <button className={classes.tanStyledButton} onClick={() => {this.apiResetGame(2)}}>Reset to 2 Players</button>
                                        <button className={classes.tanStyledButton} onClick={() => {this.apiResetGame(4)}}>Reset to 4 Players</button>
                                        {/* <button onClick={() => {this.apiResetGame(5)}}>Reset to 5 Players</button> */}
                                    </div>
                                    <div>
                                        <button className={classes.tanStyledButton} onClick={() => {this.printState()}}>Print State</button>
                                        <button className={classes.tanStyledButton} onClick={() => this.printLocalState()}>Print Local State</button>
                                        <button className={classes.tanStyledButton} id="resetTests" onClick={() => this.apiResetTests()}>Reset Tests</button>
                                    </div>
                                    <div>
                                        <button className={classes.tanStyledButton} id="spoof3" onClick={() => this.spoofDice(["3","3","3","1","2","2"])}>Spoof Dice 333</button>
                                        <button className={classes.tanStyledButton} id="spoofClaw" onClick={() => this.spoofDice(["claw","3","3","1","2","2"])}>Spoof Dice One Claw</button>
                                        <button className={classes.tanStyledButton} id="spoofNone" onClick={() => this.spoofDice(["1","1","2","2","3","3"])}>Spoof None</button>
                                        <button className={classes.tanStyledButton} id="spoof6Claw" onClick={() => this.spoofDice(["claw","claw","claw","claw","claw","claw"])}>Spoof Six Claw</button>
                                        <button className={classes.tanStyledButton} id="spoofHeart" onClick={() => this.spoofDice(["heart","1","1","2","2","3"])}>Spoof Heart</button>
                                        <button className={classes.tanStyledButton} id="spoof6Energy" onClick={() => this.spoofDice(["energy","energy","energy","energy","energy","energy"])}>Spoof 6 Energy</button>
                                        <button className={classes.tanStyledButton} id="spoofCompleteDestruction" onClick={() => this.spoofDice(["energy","claw","heart","1","2","3"])}>Spoof Complete Destruction</button>
                                        <button className={classes.tanStyledButton} id="spoof3Points3Energy" onClick={() => this.spoofDice(["energy","energy","energy","3","3","3"])}>Spoof 3 Energy, 3 Points</button>
                                        <button className={classes.tanStyledButton} id="spoof2Energy" onClick={() => this.spoofDice(["energy","energy","1","1","3","3"])}>Spoof 2 Energy</button>
                                        <button className={classes.tanStyledButton} id="spoof5Energy1Claw" onClick={() => this.spoofDice(["energy","energy","energy","energy","energy","claw"])}>Spoof 5 Energy, 1 Claw</button>
                                        <button className={classes.tanStyledButton} id="spoof2Claw" onClick={() => this.spoofDice(["claw","claw","1","1","2","2"])}>Spoof 2 Claw</button>
                                    </div>
                                </div>
                                }
                            </div>
                            </Col>
                                <Col>
                                <div className={classes.gamestate}>
                                    <div>
                                <h4><u>Edo</u></h4>
                                    </div>
                                    <div>

                                <h4>{(this.state.edo === 0) ? "Empty" : "Player " + this.state.edo}</h4>
                                    </div>
                                {(this.state.playersInGame.length > 4) && <p>Player In Edo Bay: {this.state.bayEdo}</p>}
                                </div>
                                </Col>
                            </Row>
                                </div>
                            {/* <img className={"buffer"} src={bufferIcon} alt="buffer-sign" width="50" height="50" /> */}
                            {/* <div className={classes.gamestate + " col-3"}> */}
                            <div>
                                {this.localState.buttonPhase === 1 ? <div>Waiting for player to yield or not.</div> : <div className={classes.hidden}>Waiting for player to yield or not.</div>}
                                <button id="yieldEdo" class={(this.localState.buttonPhase === 1 && this.currentPlayerNumber === this.localState.edo && !this.localState.isGameOver) ? "btn-success" : "btn-danger"} onClick={() => {this.apiYieldEdo('edo')}}>Yield Edo</button>
                                {/* {(this.state.playersInGame.length > 4) && <button id="yieldBay" class={(this.localState.buttonPhase === 1) ? "btn-success" : "btn-danger"} onClick={() => {this.apiYieldEdo('bay')}}>Yield Edo Bay</button>} */}
                                <button id="doneYielding" class={(this.localState.buttonPhase === 1 && this.currentPlayerNumber === this.localState.edo && !this.localState.isGameOver) ? "btn-success" : "btn-danger"} onClick={() => {this.apiDoneYielding()}}>Don't Yield</button>
                            </div>
                            <div>
                                <button id="clearBuy" class={(this.localState.buttonPhase === 2 && this.localState.energy[this.localState.currentTurn - 1] > 2 && this.currentPlayerNumber === this.localState.currentTurn && !this.localState.isGameOver) ? "btn-success" : "btn-danger"} onClick={() => {this.apiClearBuy()}}>Pay 2 to Clear Buy Cards</button>
                                <button id="doneBuying" class={(this.localState.buttonPhase === 2 && this.currentPlayerNumber === this.localState.currentTurn && !this.localState.isGameOver) ? "btn-success" : "btn-danger"} onClick={() => {this.apiBuy(10)}}>Done Buying</button>
                                <div className={classes.gamestate}>
                                <h5><u>Cards Available For Purchase</u></h5>
                                {this.renderBuyCard(0)}
                                {this.renderBuyCard(1)}
                                {this.renderBuyCard(2)}
                                </div>
                            </div>
                            {this.renderHands()}
                            {/* <div className={classes.gamestate}>Players in game: {JSON.stringify(this.state.playersInGame)}</div> */}
                        </Col>
                        <Col>
                                <div className={classes.gamestate}>
                                {/* <div>Current Turn: Player {this.state.currentTurn}</div> */}
                                
                                <div>You Are Currently <span className={classes.blue}>Player {this.currentPlayerNumber}</span> <a href="#playerArea">Change</a></div>

                                </div>
                            <div>
                                {this.verticalRenderScoreBoards()}
                            </div>
                            <div className={classes.gamestate}>
                                <h3>Game History</h3>
                                <div className={classes.scrollbox}>
                                <PerfectScrollbar component="div">
                                    {this.renderMessages()}
                                </PerfectScrollbar>
                                </div>
                                {/* <p>Message  0: {this.state.message[5]}</p>
                                <p>Message -1: {this.state.message[4]}</p>
                                <p>Message -2: {this.state.message[3]}</p>
                                <p>Message -3: {this.state.message[2]}</p>
                                <p>Message -4: {this.state.message[1]}</p>
                                <p>Message -5: {this.state.message[0]}</p> */}
                            </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col className={"col-sm-8 col-12"}>
                            <div className={classes.gamestate}>
                                <div><b>Configure Game</b></div>
                                <span className={classes.blue}>Change Player Number</span>
                                <input className={classes.styledTextInput} type="text" id="playerArea"></input>
                                <button className={classes.tanStyledButton} id="playerAreaButton" onClick={() => this.setPlayerNumber(document.getElementById("playerArea").value)}>Set Player Number</button>
                            </div>
                            <div className={classes.gamestate}>
                            <Col>
                                <div>
                                        Join Game Number
                                        <input className={classes.styledTextInput} type="text" id="gameArea"></input>
                                        <button className={classes.tanStyledButton} id="gameAreaButton" onClick={() => this.apiSetGameId(document.getElementById("gameArea").value)}>Set Game ID</button>
                                    </div>
                                    <div>
                                        <button className={classes.tanStyledButton} onClick={() => {this.apiResetGame(0)}}>Reset Current Game</button>
                                    </div>
                            </Col>
                            <Col>
                                <div>
                                    <button className={classes.tanStyledButton} onClick={() => {this.apiCreateNewGame()}}>Create New Game</button>
                                </div>
                            </Col>
                            </div>
                            <div className={classes.gamestate}>
                                <div>
                                    Play To Victory Points
                                    <input className={classes.styledTextInput} type="text" id="pointArea"></input>
                                    <button className={classes.tanStyledButton} onClick={() => this.apiSetVictoryPointTarget(document.getElementById("pointArea").value)}>Set Point Target</button>
                                </div>
                                <div>
                                    Max Health:
                                    <input className={classes.styledTextInput} type="text" id="healthInput"></input>
                                    <button className={classes.tanStyledButton} id="maxHealthButton" onClick={() => this.apiSetMaxHealth(document.getElementById("healthInput").value)}>Set Max Health</button>
                                </div>
                                <div>
                                    Number of Players:
                                    <input className={classes.styledTextInput} type="text" id="playerInput"></input>
                                    <button className={classes.tanStyledButton} onClick={() => this.setMaxPlayers(document.getElementById("playerInput").value)}>Set Max Players</button>
                                </div>
                                <div>
                                    <button className={classes.tanStyledButton} onClick={() => {this.setup(this.maxPlayers)}}>Restart Game With New Settings</button>
                                </div>
                                <div>
                                    <button className={classes.tanStyledButton} onClick={() => {this.withDebug = !this.withDebug}}>Toggle Debug Buttons</button>
                                </div>
                            </div>
                        </Col>
                            <Col>
                            <div className={classes.gamestate}>
                                <a className={"App-link"} href={TokyoRules}>King of Tokyo Full Rules</a>
                                <h3>Short Rules</h3>
                                <div>First to <b><u>{this.localState.winPoints} points</u></b> or last player alive wins!</div>
                                <div>Roll dice up 3 (default) times, and then resolve when done. Dice can be saved between rolls.</div>
                                <div>Triple+ # dice get you points (diceValue + # over triple). Claws attack the area you're not in (Edo vs Outside) and put you in Edo if unoccupied or occupant yields to you.</div>
                                <div>Hearts heal, but not in Edo. Energy is money to buy cards.</div>
                                <div>If attacked in Edo, have the option to yield.</div>
                                <div>Get 1 point when go into Edo. Get 2 points if start your turn in Edo.</div>
                                <div>Buy cards with energy. Discard cards have an immediate effect. Keep cards have a persistent effect. Click "Done Buying" to end turn.</div>
                            </div>
                            </Col>
                    </Row>
                    <Row>
                        <div className="col">
                            <div className="float-end">
                            <div className={classes.gameStateNoRound}>
                            <h5><u>Source Code</u></h5>
                            <div>
                            <a href="https://github.com/Axirr/React-Playground/blob/main/src/Components/Shogun/NetworkShogun.js">Front End</a>
                            </div>
                            <div>
                            <a href="https://github.com/Axirr/games-backend/blob/main/hello_world/shogun.py">Back End</a>
                            </div>
                            </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default NetworkShogun;