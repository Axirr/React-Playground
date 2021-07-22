import React, {Component} from 'react';

class RPS extends Component {
  state = {leftHand: "None",
          rightHand: "None",
          win: "Not Evaluated"}
  
  evaluateGame() {
    if (this.state.leftHand !== "None" && this.state.rightHand !== "None")  {
        if (this.state.leftHand === this.state.rightHand) {
          this.setState({win: "Tie"})
        } else {
            if (this.state.leftHand === "Rock" && this.state.rightHand === "Paper") {
              this.setState({win: "Right Hand"})
          } else if (this.state.leftHand === "Rock" && this.state.rightHand === "Scissors") {
            this.setState({win: "Left Hand"})
          } else if (this.state.leftHand === "Paper" && this.state.rightHand === "Rock") {
            this.setState({win: "Left Hand"})
          } else if (this.state.leftHand === "Paper" && this.state.rightHand === "Scissors") {
            this.setState({win: "Right Hand"})
          } else if (this.state.leftHand === "Scissors" && this.state.rightHand === "Rock") {
            this.setState({win: "Right Hand"})
          } else if (this.state.leftHand === "Scissors" && this.state.rightHand === "Paper") {
            this.setState({win: "Left Hand"})
          }
      }
    }
  }
    render() {
        return (
        <div>
            <p>Left Hand: {this.state.leftHand}</p>
            <p>Right Hand: {this.state.rightHand}</p>
            <p>Win: {this.state.win}</p>
            <button onClick={() => this.evaluateGame()}>Evaluate</button>
            <button onClick={() => this.setState({leftHand: "None", rightHand: "None", win: "Not Evaluated"})}>Reset</button>
            <h1>Left Hand Moves</h1>
            <button onClick={() => this.setState({leftHand: "Rock"})}>Rock</button>
            <button onClick={() => this.setState({leftHand: "Paper"})}>Paper</button>
            <button onClick={() => this.setState({leftHand: "Scissors"})}>Scissors</button>
            <h1>Right Hand Moves</h1>
            <button onClick={() => this.setState({rightHand: "Rock"})}>Rock</button>
            <button onClick={() => this.setState({rightHand: "Paper"})}>Paper</button>
            <button onClick={() => this.setState({rightHand: "Scissors"})}>Scissors</button>
        </div>
        );

    }
}

export default RPS;