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
	score: {w: 2, b: 2},
	bMoves: []
}  

/** @function updateScore
  * helper function which updates the score and over fields in the state variable
  */
function updateState (){
	var countW = 0;
	var countB = 0;
	for(var y = 0; y < state.board.length; y++){
		for(var x = 0; x < state.board[y].length; x++){
			if(state.board[y][x]){
				switch(state.board[y][x]){
					case 'w': 
						countW ++;
						break;
					case 'b':
						countB ++;
						break;
					default:
					break;
				}
			}
		}
	}
	state.score = {w: countW, b: countB};
	if(countW+countB === 64){
		state.over = true;
	}
}




/** @function getLegalMoves
  * returns the coordinates of all locations the player whose turn it is can place their tile.
  * @returns {Array} the coordinates the next move can be played in, along with the number of pieces they flip.
  */
function getLegalMoves (){
	var moves = [];
	for(var y = 0; y < state.board.length; y++){
		for(var x = 0; x < state.board[y].length; x++){
			if(!state.board[y][x]){//this makes sure only non-occupied squares are checked
				var moveSum = 0;
				moveSum += checkUpLeft(x-1, y-1, 0);
				moveSum += checkUp(x, y-1, 0);
				moveSum += checkUpRight(x+1, y-1, 0);
				moveSum += checkRight(x+1, y, 0);
				moveSum += checkDownRight(x+1, y+1, 0);
				moveSum += checkDown(x, y+1, 0);
				moveSum += checkDownLeft(x-1, y+1, 0);
				moveSum += checkLeft(x-1, y, 0);
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
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
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
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
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
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
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
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
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
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
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
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
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
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
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
function checkLeft(x, y, depth){
	if(x < 0 || x > 7 || y < 0 || y > 7) return 0;//ensures we're still on the board
	if(!state.board[y][x]) return 0;
	if(state.board[y][x] === state.turn) return depth;
	return checkUpLeft(x-1,y, depth+1);	
}



/**
  * @function applyMove
  * applies a move
  * @param {object} move - applies the moved passed in for state.turn
  */
function applyMove (move){
	state.board[move.y][move.x] = state.turn;
	applyUpLeft(move.x-1, move.y-1);
	applyUp(move.x, move.y-1);
	applyUpRight(move.x+1, move.y-1);
	applyRight(move.x+1, move.y);
	applyDownRight(move.x+1, move.y+1);
	applyDown(move.x, move.y+1);
	applyDownLeft(move.x-1, move.y+1);
	applyLeft(move.x-1, move.y);
}

/**
  * @function applyUpLeft
  * recursively flips tiles in a direction
  * @param {integer} x - x coordinate on board
  * @param {integer} y - y coordinate on board
  * @param {integer} depth - distance from calling location
  * @returns boolean of if flipped in direction
  */
function applyUpLeft(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyUpLeft(x-1,y-1)){
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
function applyUp(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyUp(x,y-1)){
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
function applyUpRight(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyUpRight(x+1,y-1)){
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
function applyRight(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyRight(x+1,y)){
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
function applyDownRight(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyDownRight(x+1,y+1)){
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
function applyDown(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyDown(x,y+1)){
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
function applyDownLeft(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyDownLeft(x-1,y+1)){
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
function applyLeft(x,y){
	if(x < 0 || x > 7 || y < 0 || y > 7) return false;//ensures we're still on the board
	if(!state.board[y][x]) return false;
	if(state.board[y][x] === state.turn) return true;
	if (applyLeft(x-1,y)){
			state.board[y][x] = state.turn;
			return true;
		}
	return false;
}

/** @function nextTurn()
  * Starts the next turn by changing the turn property of state.
  */
function nextTurn() {
  if(state.turn === 'b') state.turn = 'w';
  else state.turn = 'b';
}

/**
  * @function updateBoard
  * updates the board
  */
function updateBoard(){
	
		for(var y = 0; y < state.board.length; y++){
			for(var x = 0; x < state.board[y].length; x++){
				if(state.board[y][x]) {
					var square = document.getElementById("square-" + x + "-" + y)
					if(square.children.length >0)
						square.removeChild(square.lastChild);
					var tile = document.createElement('div');
					tile.classList.add('tile');
					tile.classList.add('tile-' + state.board[y][x]);
					square.appendChild(tile);
				}
			}
		}	
}

/**
  * @function highlight
  * highlights the squares the player can place a tile in
  */
function highlight(){
	var moves = state.bMoves;
	//console.log(moves.length);
	moves.forEach(function(move){
		//console.log(move.x+" "+move.y+" "+move.tiles+"\n");
		var square = document.getElementById('square-' + move.x + '-' + move.y);
		square.classList.add('highlight');
    })
}

/** @function clearHighlights
  * Clears all highligted squares
  */
function clearHighlights() {
  var highlighted = document.querySelectorAll('.highlight');
  highlighted.forEach(function(square){
    square.classList.remove('highlight');
  });
}

/** @function handleCheckerClick
  * Click handler for checker
  */
function handleSquareClick(event) {
  event.preventDefault();
  var squareId = event.target.id;
  if(document.getElementById(squareId).classList.contains('highlight')){
	var x = parseInt(squareId.charAt(7));
	var y = parseInt(squareId.charAt(9));
	state.bMoves.forEach(function(move){
		if(move.x === x && move.y === y){
			applyMove(move);
		}
	})
  }
}



/** @function setup
  * Sets up the game environment
  */
 function setup() {
	var board = document.createElement('section');
	board.id = 'game-board';
	document.body.appendChild(board);
	for(var y = 0; y < state.board.length; y++){
		for(var x = 0; x < state.board[y].length; x++){
		  var square = document.createElement('div');
		  square.id = "square-" + x + "-" + y;
		  square.classList.add('square');
		  if((y+x) % 2 === 1) square.classList.add('black');
		  square.onclick = handleSquareClick;
		  board.appendChild(square);
		  if(state.board[y][x]) {
			var tile = document.createElement('div');
			tile.classList.add('tile');
			tile.classList.add('tile-' + state.board[y][x]);
			square.appendChild(tile);
		  }
		}
	} 
}

function turn()
{
	if(state.turn === 'b'){
		state.bMoves = getLegalMoves();
		if(state.bMoves.length > 0){
			highlight();
			//wait for user input???
			updateState();
			updateBoard();
			clearHighlights();
			state.bMoves = [];
			nextTurn();
		}
		else nextTurn();
	}
		else {
			var moves = getLegalMoves();
			if (moves.length > 0){
				applyMove(moves.pop());
				updateState();
				updateBoard();
			}
			nextTurn();
		}
		if(state.over){
			if(state.score.w > state.score.b) alert("The Computer has won with a score of W: "+state.score.w+" to B: "+state.score.b);
			else if(state.score.w > state.score.b) alert("You have won with a score of B: "+state.score.b+" to W: "+state.score.w);
			else alert("There has been a tie with a score of B: "+state.score.b+" to W: "+state.score.w);
			return;
		}
		else alert("The score is B: "+state.score.b+" to W: "+state.score.w);
}

function main(){
	setup();
	turn();	
}
main();