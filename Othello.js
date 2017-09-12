//Othello.js
//This program was authored by Elijah Seigel for CIS580
//Any un-authorized reproduction of this code is not cool dude

/** This is the state of the game
  * over: set to true at end of game
  * turn: keeps track of whose turn it is
  * board: represents the current game board and placed tiles
  * score: contains the number of black and white tiles on the board
  */
var state = {
	over: false,
	turn: 'b',
	board: [
	[null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null],
	[null,null,null,'w','b',null,null,null],
	[null,null,null,'b','w',null,null,null],
	[null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null],
	],
	score: {w: 2, b: 2}
}  

/** @function updateScore
  * helper function which updates the score field in the state variable
  */
function updateScore (){
	var countW = 0;
	var countB = 0;
	for(var y = 0; y < state.board.length; y++){
		for(var y = 0; y < state.board[y].length; y++){
			switch(state.board[y][x]){
				case 'w': 
					countW ++;
					break;
				case 'b':
					countW ++;
					break;
				default:
				break;
			}
		}
	}
	state.score = {w: countW, b: countB};
}

/** @function getLegalMoves
  * returns the coordinates of all locations the player whose turn it is can place their tile.
  * @returns {Array} the coordinates the next move can be played in.
  */
function getLegalMoves