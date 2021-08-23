import React, {Component} from 'react';
import Game from '../Game';

class RPS extends Game {
    http = require('https');
    gameId = 1;
    playerNumber = 0;
    portNumber = 80;
    // portNumber = 8000;
    // hostname = '0.0.0.0';
    hostname = '44.230.70.0';

    localState = {leftHand: "None",
        rightHand: "None",
        win: "Not Evaluated",
        }

    state = {leftHand: "None",
        rightHand: "None",
        win: "Not Evaluated", 
        }
    
    evaluateGame() {
        this.isGameId();
        let http = require('http')
        let options;
        let path = '/rps/' + this.gameId + '/evaluate/';
        options = {
            hostname: this.hostname,
            port: this.portNumber,
            path: path,
            method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    setLeftHand(string) {
        this.localState.leftHand = string;
        this.rerenderState();
    }

    setRightHand(string) {
        this.localState.rightHand = string;
        this.rerenderState();
    }

    getGameState() {
        const http = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/rps/' + this.gameId + '/',
        method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                // console.log("Got a response: ", body);
                console.log("Got a response: ");
                console.log(body);
                const result = JSON.parse(body);
                console.log(result[0].fields);
                this.localState = result[0].fields;
                this.rerenderState();
                setTimeout(() => {this.getGameState()}, 1000);
            });

            // this.localState.time = d
            // this.rerenderState();
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiSetHand(handString, handNumber) {
        this.isGameId();
        let http = require('http')
        let options;
        let whichHand = "left";
        if (handNumber === 1) {
            whichHand = "right";
        }
        let codeForHand;
        if (handString === "Rock") {
            codeForHand = 1;
        } else if (handString === "Paper") {
            codeForHand = 2;
        } else if (handString === "Scissors") {
            codeForHand = 3;
        } else {
            window.alert("ERROR");
            return;
        }
        let path = '/rps/' + this.gameId + '/' + whichHand + '/' + codeForHand + '/';
        options = {
            hostname: this.hostname,
            port: this.portNumber,
            path: path,
            method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    apiReset() {
        const http = require('http')
        const options = {
        hostname: this.hostname,
        port: this.portNumber,
        path: '/rps/' + this.gameId + '/reset/',
        method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    isGameId() {
        if (this.gameId) return true;
        return false;
    }

    setGameId(gameId) {
        console.log("VALIDATE GAME NUMBER");
        this.gameId = gameId;
    }

    setPlayerNumber(playerNumber) {
        console.log("VALIDATE PLAYER NUMBER");
        this.playerNumber = playerNumber;
    }

    render() {
        return (
        <div>
            <p>Left Hand: {this.state.leftHand}</p>
            <p>Right Hand: {this.state.rightHand}</p>
            <p>Win: {this.state.win}</p>
            <button onClick={() => this.evaluateGame()}>Evaluate</button>
            <button onClick={() => { this.apiReset() }}>Reset</button>
            <h1>Left Hand Moves</h1>
            <button onClick={() => {this.apiSetHand("Rock", 0)}}>Rock</button>
            <button onClick={() => {this.apiSetHand("Paper", 0)}}>Paper</button>
            <button onClick={() => {this.apiSetHand("Scissors", 0)}}>Scissors</button>
            <h1>Right Hand Moves</h1>
            <button onClick={() => this.apiSetHand("Rock", 1)}>Rock</button>
            <button onClick={() => this.apiSetHand("Paper", 1)}>Paper</button>
            <button onClick={() => this.apiSetHand("Scissors", 1)}>Scissors</button>
            <div>...</div>
            <div>
                <button onClick={() => {this.getGameState()}}>Request Game State</button>
                <button onClick={() => {this.rerenderState()}}>Rerender</button>
            </div>
            <div><b>Configure Game</b></div>
            <div>
                Game Number
                <input type="text" id="gameArea"></input>
                <button onClick={() => this.setGameId(document.getElementById("gameArea").value)}>Set Game ID</button>
            </div>
            <div>
                Player Number
                <input type="text" id="playerNumberArea"></input>
                <button onClick={() => this.setPlayerNumber(document.getElementById("playerNumberArea").value)}>Set Player Number</button>
            </div>
        </div>
        );

    }
    }

export default RPS;