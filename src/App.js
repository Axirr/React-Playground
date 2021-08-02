import './App.css';
import React, {Component} from 'react';
import NavigationBar from './Components/Navigation/NavigationBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RPS from './Components/RockPaperScissors/RPS';
import LoveLetter from './Components/LoveLetter/LoveLetter';
import Shogun from './Components/Shogun/Shogun'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <h3>Home Page</h3>
            </Route>
            <Route path="/rps">
              <RPS />
            </Route>
            <Route path="/loveletter">
              <LoveLetter doShuffle={true}/>
            </Route>
            <Route path="/lovelettertest">
              <LoveLetter deck={["guard", "guard","guard","countess","guard","priest","prince","guard", "princess", "baron", "king", "handmaiden"]} 
              doShuffle={false}/>
            </Route>
            <Route path="/shogun">
              <Shogun />
            </Route>
            <Route path="/shoguntest1">
              <Shogun withSpoof='true'/>
            </Route>
            <Route path="/shoguntest2">
              <Shogun withSpoof='true' initialData={{
                dice: ["claw", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: ["guard", "guard", "guard", "guard", "guard", "priest", "priest", "baron", "baron", "handmaiden",
                "handmaiden", "prince", "prince", "king", "countess", "princess"],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                tokyo: 0,
                bayTokyo: 0,
                remainingRolls: 3
              }}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
