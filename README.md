#TypeScript Blackjack

The current implementation is based on the following requirements:

* The game should have a basic command line interface
* Only supports a single, local, human player
* A single automated dealer
* Hard-coded blackjack rules, with whatever simplifications you would like to make to the rules.  

In the very next version, we want to support:

* A GUI interface
* Multiple local or remote players
* Human and AI players
* Multiple card games with different rules

Design choices:

* Node.js makes it pretty easy to implement a cli, and we can use inquirer to control the flow with player interaction.
* Given it is a Node back end we can provide a gui and multi player (local or remote) easily using a web interface. If we wanted to run it as an installable desktop application we could use something like Electron.
* TypeScript will allow us to use ES6 classes so we can take advantage of its inheritance syntax.
* There is a generic CardGame class that holds the basic data you need to implement a card game, such as a deck of cards and a list of players. it also implements very generic actions such a drawing a card. The Blackjack class then inherits from this CardGame class and extends it to implement the rules of blackjack. This leads us down the path of preparing to support multiple card games with varying rules.
*  There is a generic Player class that holds the players name and their hand. Also, an AIPlayer class extends the Player class to be used for an AI Dealer (and later AI Players). Currently more work needs to be done to refactor player action logic such that players are passed to the game to be used as actors during actions.

Notes about the current state of this project:

* MORE TESTS. I ran out of time and didn't get the full test coverage that I would have liked. Also many functions would be easier to test of the cli interaction was refactored to be outside of the general logic.
* More work needs to be done refactoring some logic in the Blackjack class over to the CardGame class.
* The functions responsible for interaction need to be refactored out of the functions that control logic. This would make it easier to support both a gui and cli without muddying up the logic functions.
* I'd like to refactor the player actions to use an actor model.
* In general I think the Blackjack state logic needs to be cleaned up.

##Requirements

- [Node.js](http://nodejs.org/)
- [TypeScript](http://www.typescriptlang.org/): `$ npm install -g typescript`

##Setup

Install dependencies:

    $ npm install

Transpile the TypeScript files to JavaScript:

    $ npm run build

Play:

    $ node main.js
	
##Testing

Run tests:

	$ npm test