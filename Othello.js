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
	moves.sort(function(a, b){return a.tiles - b.tiles});
	return moves.reverse();
}

/**
  * @function checkUpLeft
  * recursively determines if up left results in a legal move.
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns the number of tiles flipped by going that direction
  */
function checkUpLeft(x, y, depth){
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
function checkUp(x, y, depth){
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
function checkUpRight(x, y, depth){
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
function checkRight(x, y, depth){
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
function checkDownRight(x, y, depth){
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
function checkDown(x, y, depth){
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
function checkDownLeft(x, y, depth){
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
function CheckLeft(x, y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth-1;
	return checkUpLeft(x-1,y, depth+1);	
}



/**
  * @function applyMove
  * applies a move
  * @param {object} move - applies the moved passed in for state.turn
  */
function applyMove (move){
	applyUpLeft{move.x, move.y, 0};
	applyUp{move.x, move.y, 0};
	applyUpRight{move.x, move.y, 0};
	applyRight{move.x, move.y, 0};
	applyDownRight{move.x, move.y, 0};
	applyDown{move.x, move.y, 0};
	applyDownLeft{move.x, move.y, 0};
	applyLeft{move.x, move.y, 0};
}

/**
  * @function applyUpLeft
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyUpLeft(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x-1,y-1, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

/**
  * @function applyUp
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyUp(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x,y-1, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

/**
  * @function applyUpRight
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyUpRight(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x+1,y-1, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

/**
  * @function applyRight
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyRight(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x+1,y, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

/**
  * @function applyDownRight
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyDownRight(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x+1,y+1, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

/**
  * @function applyDown
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyDown(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x,y+1, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

/**
  * @function applyDownLeft
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyDownLeft(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x-1,y+1, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

/**
  * @function applyLeft
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
funtion applyLeft(x,y, depth){
	if(x < 0 || x > 9 || y < 0 || y > 9) return false;//ensures we're still on the board
	if(depth > 0 && !state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (checkUpLeft(x-1,y, depth+1)){
			state.board[y][x] = state.turn;
			return true;
		}
		return false;
}

