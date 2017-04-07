/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var board = new Board({'n': n});
  var solution = board.rows(); //fixme

  for (var i = 0; i < board.rows().length; i++) {
    for (var j = 0; j < board.rows()[i].length; j++) {
      if (board.rows()[i][j] === 0) {
        board.togglePiece(i, j);
        if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
          board.togglePiece(i, j);
        }
      }
    }
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  var recurseOverBoard = function(board, row) {
    if (row === n) {
      // return the board
      solutionCount ++;
      return;
    }

    for (var k = 0; k < board.rows().length; k++) {

      if (row[k] !== 1) {
        board.togglePiece(row, k);
        // check for conflict on the table
        // !board.hasAnyRooksConflicts(row, k)   
        if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(k)) {
          // if no conflict recurse on this table
          // recurse on the board
          recurseOverBoard(board, row + 1);
        }
        board.togglePiece(row, k);
      }
    }
  };

  recurseOverBoard(board, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var solution;

  var recurseOverBoard = function(board, row) {
    if (row === n) {
      // return the board
      if (solution === undefined) {
        // solution = new Board(board.rows());
        solution = JSON.parse(JSON.stringify(board.rows()));
      }
      return;
    }

    for (var k = 0; k < board.rows().length; k++) {
      if (solution !== undefined) {
        break;
      }

      if (row[k] !== 1) {
        board.togglePiece(row, k);
        // check for conflict on the table
        if (!board.hasAnyQueenConflictsOn(row, k)) {
          // if no conflict recurse on this table
          // recurse on the board
          recurseOverBoard(board, row + 1);
        }
        board.togglePiece(row, k);
      }
    }
  };

  recurseOverBoard(board, 0);

  var resBoard = new Board(solution);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return resBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  var recurseOverBoard = function(board, row) {
    if (row === n) {
      // return the board
      solutionCount ++;
      return;
    }

    for (var k = 0; k < board.rows().length; k++) {

      if (row[k] !== 1) {
        board.togglePiece(row, k);
        // check for conflict on the table
        // !board.hasAnyRooksConflicts(row, k)   
        if (!board.hasAnyQueensConflicts()) {
          // if no conflict recurse on this table
          // recurse on the board
          recurseOverBoard(board, row + 1);
        }
        board.togglePiece(row, k);
      }
    }
  };

  recurseOverBoard(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
