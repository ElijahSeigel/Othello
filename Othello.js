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
  * @returns {Array} the coordinates the next move can be played in, along with the number of pieces they flip.
  */
function getLegalMoves (){
	var moves = [];
	for(var y = 0; y < state.board.length; y++){
		for(var y = 0; y < state.board[y].length; y++){
			if(!state.board[y][x]){//this makes sure only non-occupied squares are checked
				var moveSum = 0;
				moveSum += checkUpLeft(x, y, 0);
				moveSum += checkUp(x, y, 0);
				moveSum += checkUpRight(x, y, 0);
				moveSum += checkRight(x, y, 0);
				moveSum += checkDownRight(x, y, 0);
				moveSum += checkDown(x, y, 0);
				moveSum += checkDownLeft(x, y, 0);
				moveSum += checkLeft(x, y, 0);
				if (moveSum > 0) moves.push({x: x, y: y, tiles: moveSum});
			}
		}
	}
	return moves;
}

/**
  * @function checkUpLeft
  * recursively determines if up left results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
checkUpLeft(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x-1,y-1, depth+1);
	
}

/**
  * @function checkUp
  * recursively determines if up results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
checkUp(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x,y-1, depth+1);	
}

/**
  * @function checkUpRight
  * recursively determines if up right results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
checkUpRight(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x+1,y-1, depth+1);	
}

/**
  * @function checkRight
  * recursively determines if right results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
checkRight(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x+1,y, depth+1);	
}

/**
  * @function checkDownRight
  * recursively determines if Down right results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
checkDownRight(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x+1,y+1, depth+1);	
}

/**
  * @function checkDown
  * recursively determines if down results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
checkDown(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x,y+1, depth+1);	
}

/**
  * @function checkDownLeft
  * recursively determines if down and left results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
checkDownLeft(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x-1,y+1, depth+1);	
}

/**
  * @function checkLeft
  * recursively determines if left results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
CheckLeft(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x-1,y, depth+1);	
}