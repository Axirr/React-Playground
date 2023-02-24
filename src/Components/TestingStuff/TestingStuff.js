import { Component } from "react";
import classes from '../Game/Game.module.css'

class TestingStuff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBoxBlue: true,
            date: Date.now()
        }

        // this.onToggleLoop = this.onToggleLoop.bind(this);
    }
    
    toggleColor() {
        this.setState({
            isBoxBlue: false,
        });
    }

    render() {
        return(
            <div>
                <button onClick={() => { this.setState( {isBoxBlue: false})}}>Change Box Color</button>
                <p>Date {this.state.date}</p>
                <button onClick={() => { this.setState( {date: Date.now()})}}>Update date</button>
                {this.state.isBoxBlue ? 
                <p className={classes.blueMessage}>Text</p>
                :
                <p className={classes.greenMessage}>Text</p>
                }
                <button onClick={() => console.log(this.state) } >Print State</button>
            </div>
        )
    }
}

export default TestingStuff;