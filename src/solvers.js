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

  var board = new Board({'n':n});
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
  // var solution = board.rows(); //fixme

  // function recurseOverBoard(board, depth) {
  //   if (depth === n) {
  //     // return the board
  //     solution = board;
  //     return board;
  //   }
  //   // iterate over board
  //   for (var i = 0; i < board.rows().length; i++) {

  //     // get our row
  //     var row = board.get(i)
  //     // iterate over the row
  //     for (var k = 0; k < row.length; k++) {
  //       // for each iteration we modify the board
  //       if (row[k] !== 1) {
  //         board.togglePiece(i, k)
  //         // check for conflict on the table
  //         if (!hasRowConflictAt(i) && !hasColConflictAt(k)) {
  //           // if no conflict recurse on this table
  //           // recurse on the board
  //           recurseOverBoard(board, )
  //         }
  //       }
  //         // test for conflict
  //     }
  //   }
    

  //     // for each for each square recurse on new board and depth + 1
  // }

  // recurseOverBoard(board);

  // console.log('Number of solutions for ' + n + ' rooks:', solution);
  // return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n':n});
  var solution;

  function recurseOverBoard(board, depth) {
    if (depth === n) {
      // return the board
      if (solution === undefined) {
        solution = JSON.parse(JSON.stringify(board.rows()));
      }

      return;
    }
    // iterate over board
    // If var i is indefined, i === 0
    for (var i = 0; i < board.rows().length; i++) {
      // get our row
      var row = board.get(i)
      // iterate over the row
      for (var k = 0; k < row.length; k++) {
        // for each iteration we modify the board
        if (row[k] !== 1) {
          board.togglePiece(i, k)
          // check for conflict on the table
          if (!board.hasAnyQueensConflicts()) {
            // if no conflict recurse on this table
            // recurse on the board
            recurseOverBoard(board, depth + 1, i, k);
          }
          board.togglePiece(i, k);
        }
          // test for conflict
      }
    }
    

      // for each for each square recurse on new board and depth + 1
  }

  recurseOverBoard(board, 0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
