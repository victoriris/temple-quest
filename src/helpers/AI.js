import {CheckWin} from '../helpers';
import DeepEqual from 'deep-equal';
import negamaxAlphaBeta from 'negamax-alpha-beta';


async function startMinimax(pieces, selectedPieceId) {

    return new Promise((resolve, reject) => {
        var gameState =  {
            pieces: [],
            selectedPieceId,
            lastPieceID: '',
        }

        for (const piece of pieces) {
            gameState.pieces.push({...piece})
        }

        let config = {
            generateMoves,
            makeMove,
            unmakeMove,
            evaluate,
            evaluateTerminal
          };

          let negamax = new negamaxAlphaBeta(config);
          const depth = getDepth(gameState.pieces.length);
          let result = negamax.search(gameState, depth);
          console.log(`Result: score = ${result.score}, bestMove = `, result.bestMove);
          resolve({
            location: result.bestMove.location,
            pieceId: result.bestMove.pieceId
        });
    
        
    });
}


function getDepth(unusedPieces){
    //if (unusedPieces >= 14) return 2;
    if (unusedPieces >= 10) return 3;
    if (unusedPieces >= 8) return 3;
    if (unusedPieces >= 6) return 3;
    return 3;
}



/* 
Your generateMoves function must take a gameState object and
 return an array of all legal moves for that game state. 
You can represent the moves however 
you see fit: integers, objects, strings, etc.
 */
function generateMoves(gameState) {
    const { pieces } = gameState;
    let possibleMoves = [];

    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            const isUsed = pieces.some((piece) => {
                return DeepEqual(piece.location, {row, column});
            });
            if (!isUsed) {
                for (let piece of pieces.filter(p => !p.location)) {
                    const move = {
                        selectedPieceId: gameState.selectedPieceId,
                        pieceId: piece.id, 
                        location: { row, column }
                    }
                    possibleMoves.push(move);
                }
            }
        }
    }

    return possibleMoves;
}

/* 
Your makeMove function must take a gameState object and a move object, perform the move upon the gameState, altering it in place, and return a boolean value that represents whether or not the side-to-move has changed after having performed the move.
 */
function makeMove(gameState, move) {
    const { pieceId, location, selectedPieceId } = move;

    const updatedPiece = gameState.pieces.find((piece) => {
        if (piece.id === parseInt(selectedPieceId)) {
            piece.location = location;
            return true;
        }
        return false;
    });

    if (updatedPiece){
        gameState.lastPieceID = selectedPieceId;
        gameState.selectedPieceId = pieceId;
    }

    return !!updatedPiece;
}

/* 
Your unmakeMove function must take a gameState object and a move object, un-perform the move upon the gameState, altering it in place. This must end up producing the exact same gameState as before having called makeMove.
 */
function unmakeMove (gameState, move) {
    const { selectedPieceId } = move;

    const updatedPiece = gameState.pieces.find((piece) => {
        if (piece.id === parseInt(gameState.lastPieceID)) {
            piece.location = null;
            return true;
        }
        return false;
    });

    if (updatedPiece) {
        gameState.lastPieceID = '';
        gameState.selectedPieceId = selectedPieceId;
    }
}

/*
If the current player wins, add 50 points. If current player doesn't win, they get 0. TODO: add threeInARow function
*/
function evaluate(gameState){
    if (CheckWin(gameState.pieces, gameState.lastPieceID)){
        return 50;
    }
    return threeInARow(gameState.pieces) * 3;
}

function threeInARow(pieces){
    let row0 = [], row1 = [], row2 = [], row3 = [], col0 = [], col1 = [], col2 = [], col3 = [], diag0 = [], diag1 = [], countOf3s = 0;
    pieces.forEach((p) => {
        if (!p.location){
            return false;
        }
        switch (p.location.row){
            case 0: row0.push(p);
            break;
            case 1: row1.push(p);
            break;
            case 2: row2.push(p);
            break;
            case 3: row3.push(p);
            break;
            default: return false;
        }
        switch (p.location.column){
            case 0: col0.push(p);
            break;
            case 1: col1.push(p);
            break;
            case 2: col2.push(p);
            break;
            case 3: col3.push(p);
            break;
            default: return false;
        }

        if (p.location.row === p.location.column){
            diag0.push(p);
        }
        else if (p.location === {row: 0, column: 3} || 
                 p.location === {row: 1, column: 2} || 
                 p.location === {row: 2, column: 1} || 
                 p.location === {row: 3, column: 0}){
            diag1.push(p);
        }
    }
    );
    
    //tally 3 in a rows:
    if (row0.length === 3)
    countOf3s++;
    if (row1.length === 3)
    countOf3s++;
    if (row2.length === 3)
    countOf3s++;
    if (row3.length === 3)
    countOf3s++;

    if (col0.length === 3)
    countOf3s++;
    if (col1.length === 3)
    countOf3s++;
    if (col2.length === 3)
    countOf3s++;
    if (col3.length === 3)
    countOf3s++;

    if (diag0.length === 3)
    countOf3s++;
    if (diag1.length === 3)
    countOf3s++;

    return countOf3s;

}

function evaluateTerminal(gameState){
    if (CheckWin(gameState.pieces, gameState.lastPieceID)){
        return evaluate(gameState);
    }
    return null;
}


export {startMinimax};