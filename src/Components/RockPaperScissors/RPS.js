import React, {Component} from 'react';
import Game from '../Game';
import { setConstantValue } from 'typescript';

class RPS extends Game {
    http = require('https');

    localState = {leftHand: "None",
        rightHand: "None",
        win: "Not Evaluated",
        time: "None"}

    state = {leftHand: "None",
        rightHand: "None",
        win: "Not Evaluated", 
        time: "None"}
    
    evaluateGame() {
        if (this.localState.leftHand !== "None" && this.localState.rightHand !== "None")  {
            if (this.localState.leftHand === this.localState.rightHand) {
                this.localState.win = "Tie";
            } else {
                if (this.state.leftHand === "Rock" && this.state.rightHand === "Paper") {
                this.localState.win = "Right Hand";
            } else if (this.state.leftHand === "Rock" && this.state.rightHand === "Scissors") {
                this.localState.win = "Left Hand";
            } else if (this.state.leftHand === "Paper" && this.state.rightHand === "Rock") {
                this.localState.win = "Left Hand";
            } else if (this.state.leftHand === "Paper" && this.state.rightHand === "Scissors") {
                this.localState.win = "Right Hand";
            } else if (this.state.leftHand === "Scissors" && this.state.rightHand === "Rock") {
                this.localState.win = "Right Hand";
            } else if (this.state.leftHand === "Scissors" && this.state.rightHand === "Paper") {
                this.localState.win = "Left Hand";
            }
        }
        }
        this.rerenderState();
    }

    setLeftHand(string) {
        this.localState.leftHand = string;
        this.rerenderState();
    }

    setRightHand(string) {
        this.localState.rightHand = string;
        this.rerenderState();
    }

    requestApi() {
        const http = require('http')
        const options = {
        // hostname: '44.230.70.0',
        hostname: '0.0.0.0',
        port: 8000,
        path: '/',
        method: 'GET'
        }

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                console.log("Got a response: ", body);
                // body = JSON.decode(body);
                const result = JSON.parse(body);
                this.localState = result;
                this.rerenderState();
                setTimeout(() => {this.requestApi()}, 3000);
            });

            // this.localState.time = d
            // this.rerenderState();
        })

        req.on('error', error => {
        console.error(error)
        })

        req.end()
    }

    render() {
        return (
        <div>
            <p>Left Hand: {this.state.leftHand}</p>
            <p>Right Hand: {this.state.rightHand}</p>
            <p>Win: {this.state.win}</p>
            <button onClick={() => this.evaluateGame()}>Evaluate</button>
            <button onClick={() => {
                this.localState.leftHand = "None";
                this.localState.rightHand = "None";
                this.localState.win = "Not Evaluated";
                this.rerenderState();
            }}>Reset</button>
            <h1>Left Hand Moves</h1>
            <button onClick={() => this.setLeftHand("Rock")}>Rock</button>
            <button onClick={() => this.setLeftHand("Paper")}>Paper</button>
            <button onClick={() => this.setLeftHand("Scissors")}>Scissors</button>
            <h1>Right Hand Moves</h1>
            <button onClick={() => this.setRightHand("Rock")}>Rock</button>
            <button onClick={() => this.setRightHand("Paper")}>Paper</button>
            <button onClick={() => this.setRightHand("Scissors")}>Scissors</button>
            <button onClick={() => {this.requestApi()}}>Request API</button>
            <button onClick={() => {this.rerenderState()}}>Rerender</button>
        </div>
        );

    }
    }

export default RPS;