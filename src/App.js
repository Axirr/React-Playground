import './App.css';
import React, {Component} from 'react';
import NavigationBar from './Components/Navigation/NavigationBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RPS from './Components/RockPaperScissors/RPS';
import LoveLetter from './Components/LoveLetter/OldLoveLetter';
import LoveLetterAI from './Components/LoveLetter/LoveLetterAI';
import Shogun from './Components/Shogun/Shogun'
import 'bootstrap/dist/css/bootstrap.min.css';
import DeepSeaDiving from './Components/DeepSeaDiving/DeepSeaDiving';

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
            <Route path="/deepsea">
              <DeepSeaDiving />
            </Route>
            <Route path="/loveletter">
              {/* <LoveLetter doShuffle={true}/> */}
              <LoveLetterAI doShuffle={true}/>
            </Route>
            <Route path="/loveletterai">
              <LoveLetterAI doShuffle={true}/>
            </Route>
            <Route path="/lovelettertest">
              <LoveLetter deck={["guard", "guard","guard","countess","guard","priest","prince","guard", "princess", "baron", "king", "handmaiden"]} 
              doShuffle={false}/>
            </Route>
            <Route path="/loveletteraitest">
              <LoveLetterAI deck={["guard", "guard","guard","countess","guard","priest","prince","guard", "princess", "baron", "king", "handmaiden"]} 
 doShuffle={false} debug={true}/>
            </Route>
            <Route path="/loveletteraitest2">
              <LoveLetterAI deck={["guard", "guard","guard","countess","guard","priest","guard","prince", "princess", "baron", "king", "countess"]} 
 doShuffle={false} debug={true}/>
            </Route>
            <Route path="/loveletteraitest3">
              <LoveLetterAI deck={["guard", "guard","guard","countess","guard","priest","guard","king", "princess", "baron", "king", "countess"]} 
 doShuffle={false} debug={true}/>
            </Route>
            <Route path="/loveletteraitest4">
              <LoveLetterAI deck={["guard", "guard","guard","countess","guard","priest","guard","king", "princess", "baron", "king", "princess"]} 
 doShuffle={false} debug={true}/>
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
            <Route path="/shoguntestbuy9">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Skyscraper', 'cost': 6, 'type': 'discard', 'ability': "Gain 4[Star]."},
                {'name': 'Spiked Tail', 'cost': 5, 'type': 'keep', 'ability': "When you attack, do 1 additional damage."},
                {'name': 'Solar Powered', 'cost': 2, 'type': 'keep', 'ability': "At the end your turn, if you have 0 energy, gain 1 energy."},
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
            <Route path="/shoguntestbuy10">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': 'Tanks', 'cost': 4, 'type': 'discard', 'ability': "+4 Points and take 3 damage."},
                {'name': 'Urbavore', 'cost': 4, 'type': 'keep', 'ability': "Gain 1 extra point when starting a turn in Tokyo. Deal 1 extra damage when dealing damage from Tokyo."},
                {'name': "We're Only Making It Stronger", 'cost': 3, 'type': 'keep', 'ability': "When you lost 2 health, gain 1 energy."},
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
            <Route path="/shoguntestbuy11">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': "Amusement Park", 'cost': 6, 'type': 'discard', 'ability': "+4 Points"},
                {'name': "Army", 'cost': 2, 'type': 'discard', 'ability': "+1 point and take a damage for every card you have."},
                {'name': "Cannibalistic", 'cost': 5, 'type': 'keep', 'ability': "When you deal damage, gain 1 point."},
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
            <Route path="/shoguntestbuy12">
              <Shogun withSpoof='true' initialData={{
                dice: ["none", "none", "none", "none", "none", "none"],
                saved: [false, false, false, false, false, false],
                playersInGame: [1,2,3,4],
                currentTurn: 1,
                hands: [[],[],[],[]],
                buyCards: ["none", "none", "none"],
                deck: [
                {'name': "Reflective Hide", 'cost': 6, 'type': 'keep', 'ability': "If you suffer damage, the monster that dealt it suffers 1 damage."},
                {'name': "Throw A Tanker", 'cost': 4, 'type': 'keep', 'ability': "On a turn you deal 3 or more damage, gain 2 points."},
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
