/// <reference path="player.ts"/>
/// <reference path="aidealer.ts"/>
/// <reference path="deck.ts"/>
/// <reference path="cardgame.ts"/>
declare function require(name:string);
var inquirer = require('inquirer');

class Blackjack extends CardGame {
	turnQuestions: Object[];
	
	//Creates an instance of Blackjack class.
	constructor() {
		super();
		this.turnQuestions = [
			{	
			    choices: [
			      "Hit",
			      "Stay",
			      "Fold"
			    ],
			    type: "list",
			    name: "turn",
			    message: "What do you want to do?"
			}
		];
	}
	
	//Input as prompt to the user during their turn. This output says if dealer or person want to hit, stay, or fold
	turnPrompt() {
		var turn = this;
		inquirer.prompt( this.turnQuestions, function( answers ) {
			switch(answers.turn){
				case 'Stay':
					turn.stay();
					break;
				case 'Hit':
					turn.hit();
					break;
				case 'Fold':
					turn.fold();
					break;
			}
		});	
	}
	
	
	//Prompt the user if he wants to play, informs him whether he wants to keep playing or not
	roundPrompt() {
		var game = this;
		inquirer.prompt([
			{	choices: [
			      "Yes",
			      "No"
			    ],
			    type: "list",
			    name: "keepPlaying",
			    message: "Do you want to keep playing?",
			    
			}
		], function(answers){
			switch(answers.keepPlaying){
				case 'Yes':
					game.clearHands();
					game.start();
					break;
				case 'No':
				
					console.log('Bye thanks for playing');
					break;
			}
		});
	}
	
	//Start the game
	start() {
		this.currentPlayerIndex = 1;
		this.deal(2);
		this.printInitialState();
		this.evaluateState();
	}
	//Quit the game
	quit() {
		console.log('Astalavista bye');
	}
	
	// The current player will hit
	hit() {
		this.draw();
		this.printLastDraw();
		console.log(`Now your hand value is: ${this.players[this.currentPlayerIndex].handValue}`);
		this.evaluateState();
	}
	
	//The current player choose stay and now the turn goes to next player 
	stay() {
		this.incrementTurn();
		this.evaluateState();
	}
	
	
	//Fold the hand of current player
	fold() {
		console.log("You have folded Try next time");
		this.players[this.currentPlayerIndex].hand = [];
		this.players[this.currentPlayerIndex].handValue = this.calculateHandValue(this.players[this.currentPlayerIndex].hand);
		this.evaluateState();
	}
	
	
	draw() {
		super.draw();
		this.players[this.currentPlayerIndex].handValue = this.calculateHandValue(this.players[this.currentPlayerIndex].hand);
	}
	
	
	evaluateState() {
		var winner = new Player("No One"), draw = false;
		
		if (this.currentPlayerIndex === 0) {
		
			console.log(`Dealer reveals ${this.players[0].handToString()}`);
			while (this.players[0].handValue < 16) {
				this.draw();
				this.printLastDraw();
				if(this.players[0].handValue > 21) {
					this.players[0].handValue = 0;
					console.log('The dealer is busted');
					break;
				}
			}
			
			this.players.forEach(function(player){
				if (player.handValue > winner.handValue) {
					winner = player;
					draw = false;
				}
				else if(player.handValue === winner.handValue) {
					draw = true;
				}
			});
			if(draw) {
				console.log("round is draw");	
			}
			else {
				console.log(`${winner.name} has win the round with ${winner.handValue}.`);
			}
			this.roundPrompt();
		} else {
			if (this.players[this.currentPlayerIndex].handValue === 21) {
				console.log('It is blackjack you win');
				this.currentPlayerIndex++;
				this.roundPrompt();
			} 
			else if (this.players[this.currentPlayerIndex].handValue > 21) {
				console.log('You lose this...Busted');
				this.players[this.currentPlayerIndex].handValue = 0;
				this.currentPlayerIndex++;
				
				this.roundPrompt();
			} else {
				this.turnPrompt();
			}
		}
	}
	
	
	calculateHandValue(cards:Card[]): number {
		var value = 0;
		cards.forEach(function(card){
			value += card.value;
			if(card.rank == 'A' && value > 21) {
				value -= 10;
			}
		});
		return value;
	}
	
	
	printInitialState() {
		this.printDealerState();
		this.printPlayerState(1);
	}
	
	
	printDealerState() {
		console.log(`The dealer has ${this.players[0].hand[0].toString()} showing`);
	}
	
	
	printPlayerState(playerIndex:number) {
		console.log(`Your hand is: ${this.players[playerIndex].handToString()}`);
		console.log(`Your hand value is now: ${this.players[playerIndex].handValue}`);
	}
	
	
	printLastDraw() {
		console.log(`${this.players[this.currentPlayerIndex].name} drew ${this.players[this.currentPlayerIndex].hand[this.players[this.currentPlayerIndex].hand.length-1]}`);
	}
	}
