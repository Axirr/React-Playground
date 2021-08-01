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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
