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
                deck: [
                {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},
                {'name': 'Commuter Train', 'cost': 4, 'type': 'discard', 'ability': '+ 2[Star]'},
                {'name': 'Corner Store', 'cost': 3, 'type': 'discard', 'ability': '+ 1[Star]'},
                {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},
                {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},
                {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy">
              <Shogun withSpoof='true' initialData={{
                dice: ["claw", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},
                {'name': 'Commuter Train', 'cost': 4, 'type': 'discard', 'ability': '+ 2[Star]'},
                {'name': 'Corner Store', 'cost': 3, 'type': 'discard', 'ability': '+ 1[Star]'}],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy2">
              <Shogun withSpoof='true' initialData={{
                dice: ["claw", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Friend of Children', 'cost':	3, 'type': 'keep', 'ability':	'When you gain energy, gain an additional energy.'},
                {'name': 'Acid Attack', 'cost':	6, 'type': 'keep', 'ability':	"Deal one extra damage (even when you don't attack)"},
                {'name': 'Alien Metabolism', 'cost':	3, 'type': 'keep', 'ability':	'Buying cards costs you 1 less energy'},
                {'name': 'Apartment Building', 'cost': 5, 'type': 'discard', 'ability': '+ 3[Star]'},
                {'name': 'Commuter Train', 'cost': 4, 'type': 'discard', 'ability': '+ 2[Star]'},
                {'name': 'Corner Store', 'cost': 3, 'type': 'discard', 'ability': '+ 1[Star]'}],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy3">
              <Shogun withSpoof='true' initialData={{
                dice: ["claw", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [{'name': 'Complete Destruction', 'cost': 3, 'type': 'keep', 'ability': 'If you roll [1][2][3][Heart][Attack][Energy] gain 9[Star] in addition to the regular results.'},
                      {'name': 'Energy Hoarder', 'cost': 3, 'type': 'keep', 'ability': 'You gain 1[Star] for every 6[Energy] you have at the end of your turn.'},
                      {'name': 'Even Bigger', 'cost': 4, 'type': 'keep', 'ability': 'Your maximum [Heart] is increased by 2. Gain 2[Heart] when you get this card.'},
              ],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy4">
              <Shogun withSpoof='true' initialData={{
                dice: ["claw", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Evacuation Orders', 'cost': 7, 'type': 'discard', 'ability': 'All other monsters lose 5[Star]'},
                {'name': 'Fire Blast', 'cost': 3, 'type': 'discard', 'ability': 'Deal 2 damage to all other monsters'},
                {'name': 'Giant Brain', 'cost': 5, 'type': 'keep', 'ability': 'Get an extra reroll each turn.'},
              ],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy5">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Heal', 'cost': 3, 'type': 'discard', 'ability': 'Heal 2 health.'},
                {'name': 'Herbivore', 'cost': 5, 'type': 'keep', 'ability': "Gain 1 point on your turn if you don't attack anyone."},
                {'name': 'Gas Refinery', 'cost': 6, 'type': 'discard', 'ability': "Gain 2[Star] and deal 3 damage to all other monsters."},
              ],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy6">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Gourmet', 'cost': 4, 'type': 'keep', 'ability': "When scoring [1][1][1], score 3"},
                {'name': 'High Altitude Bombing', 'cost': 4, 'type': 'discard', 'ability': "All monsters (including you) take 3 damage."},
                {'name': 'Jet Fighters', 'cost': 5, 'type': 'discard', 'ability': "+5[Star] and take 4 damage."},
              ],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy7">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'National Guard', 'cost': 3, 'type': 'discard', 'ability': "+2[Star] and take 2 damage."},
                {'name': 'Nova Breath', 'cost': 7, 'type': 'keep', 'ability': "Your attacks damage all other players."},
                {'name': 'Nuclear Power Plant', 'cost': 6, 'type': 'discard', 'ability': "+2[Star] and heal 3 damage."},
              ],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
                remainingRolls: 3
              }}/>
            </Route>
            <Route path="/shoguntestbuy8">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Omnivore', 'cost': 4, 'type': 'keep', 'ability': "Can score [1][2][3] for 2 points now. Can still use in other combos."},
                {'name': 'Regeneration', 'cost': 4, 'type': 'keep', 'ability': "When you heal, heal one extra damage."},
                {'name': 'Rooting For The Underdog', 'cost': 3, 'type': 'keep', 'ability': "At the end of a turn where you have the fewest points, gain a point."},
              ],
                message: ["blank message", "blank message", "blank message", "blank message", "blank message", "blank message"],
                doShuffle: false,
                points: [0,0,0,0],
                health: [10,10,10,10],
                energy: [0,0,0,0],
                edo: 0,
                bayEdo: 0,
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
