let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = [];
  let maxSize = 8;
  for(let i = 0; i < maxSize; i++) {
    grid[i] = [];
    for(let j = 0; j < maxSize; j++ ) {
      grid[i][j] = undefined;
    }
  }
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[3][3] = new Piece("white");
  grid[4][4] = new Piece("white");

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if(!this.isValidPos(pos))
    throw new Error('Not valid pos!');

  let row = pos[0];
  let col = pos[1];
  let piece = this.grid[row][col];

  return piece;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  return this.isOccupied(pos) && this.getPiece(pos).color == color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let row = pos[0];
  let col = pos[1];
  let square = this.grid[row][col];
  return square !== undefined;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return this.validMoves('white').length == 0 && this.validMoves('black').length == 0;
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let row = pos[0];
  let col = pos[1];

  if(row < 0 || row > 7 || col < 0 || col > 7)
    return false;

  return true;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip = []) {
  let new_pos = [];
  new_pos.push(pos[0] + dir[0]);
  new_pos.push(pos[1] + dir[1]);

  if(!board.isValidPos(new_pos) || !board.isOccupied(new_pos)) {
    return null;
  }

  if(board.getPiece(new_pos).color === color) {
    if( piecesToFlip.length > 0 ) {
      return piecesToFlip;
    } else {
      return null;
    }
  } else {
    piecesToFlip.push(board.getPiece(new_pos));
    return _positionsToFlip(board, new_pos, color, dir, piecesToFlip);
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if(this.validMove(pos, color)) {
    let piecesToFlip = [];

    Board.DIRS.forEach(dir => {
      let newPieces = _positionsToFlip(this, pos, color, dir);

      if(newPieces)
        piecesToFlip = piecesToFlip.concat(newPieces);
    });
    console.log("get flipped", piecesToFlip);
    piecesToFlip.forEach(piece => piece.flip());
    this.grid[pos[0]][pos[1]] = new Piece(color);
  } else {
    throw new Error("Invalid move");
  }
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  console.log("");
  console.log("  01234567");
  let counter = 0;
  this.grid.forEach( row => {
    let rowString = `${counter} `;
    counter++;
    row.forEach( square => {
      rowString += square ? square.toString() : "-";
    });
    console.log(rowString);
  });
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if(this.isOccupied(pos))
    return false;

  let valid = false;

  Board.DIRS.forEach( dir => {
    let positions = _positionsToFlip(this, pos, color, dir);

    if(positions)
      valid = true;
  });

  return valid;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let moves = [];

  for(let i = 0; i < this.grid.length; i++) {
    for(let j = 0; j < this.grid[i].length; j++) {
      let pos = [i,j];
      if(this.validMove(pos, color))
        moves.push(pos);
    }
  }

  return moves;
};

module.exports = Board;
