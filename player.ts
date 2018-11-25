
declare function require(name:string);
var Observer = require('observed');

class Player {
	name: string;
	hand: Card[];
	handValue: number;
	
	//Created an instance of the Player class
	constructor(name:string) {
		this.name = name;
		this.hand = [];
		this.handValue = 0;
	}
	
	//Returns a string identifier for the player currently the player name
	toString(): string {
		return this.name;
	}
	
	//Gives list of the cards of player's hand
	handToString(): string {
		var handString = '';
		for (var i = 0; i<this.hand.length; i++) {
			handString += this.hand[i].toString();
			if (i<this.hand.length-1) {
				handString += ', ';
			}
		}
		return handString;
	}
}