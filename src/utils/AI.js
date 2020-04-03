import {CheckWin} from '../utils';
import DeepEqual from 'deep-equal';
import negamaxAlphaBeta from 'negamax-alpha-beta';
import { getNeighborMatches } from './CheckWin';
import { countWinMoves } from './countWinMoves';


async function startMinimax(pieces, selectedPieceId) {

    return new Promise((resolve, reject) => {
        var gameState =  {
            pieces: [],
            selectedPieceId,
            lastPieceID: '',
            isUserTurn: true,
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
          const depth = getDepth(gameState.pieces);
          let result = negamax.search(gameState, depth);
          console.log('result', result);
          resolve({
            location: result.bestMove.location,
            pieceId: result.bestMove.pieceId
        });
    
    });
}

function getDepth(pieces) {
    const piecesLeft = pieces.filter(p => !p.location);
    const length = piecesLeft.length;
    if (length >= 15) return 2;
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
    gameState.isUserTurn = !gameState.isUserTurn;

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

    return true;
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
Take a gameState object and return a numeric value representing the score of the gameState 
from the perspective of the gameState's current player-to-move. Higher numbers mean the 
gameState is better for the current player-to-move.
*/
function evaluate(gameState){
    let result = 0;
    const { isUserTurn } = gameState;

    result = countWinMoves(gameState.pieces);
    result *= (isUserTurn?-1:1);
    
    return result;
}

function evaluateTerminal(gameState){
    let result = null;
    const {isUserTurn, pieces, lastPieceID} = gameState;
    const didWin = CheckWin(pieces, lastPieceID);
    const boardIsFull = pieces.every(piece => !!piece.location);

    if (didWin) {
        result = Infinity * (isUserTurn?-1:1);
    }
    else if (boardIsFull) {
        result = 0;
    }

    return result;
}


export {startMinimax};