import './App.css';
import React, {Component} from 'react';
import NavigationBar from './Components/Navigation/NavigationBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RPS from './Components/RockPaperScissors/RPS';

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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
