import {CheckWin} from '../utils';
import DeepEqual from 'deep-equal';
import negamaxAlphaBeta from 'negamax-alpha-beta';
import { countWinMoves } from './countWinMoves';


async function startMinimax(pieces, selectedPieceId, level) {

    return new Promise((resolve, reject) => {
        var gameState =  {
            pieces: [],
            selectedPieceId,
            lastPieceID: '',
            isUserTurn: false,
            isUserPerspective: true,
            difficulty: level,
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
         // console.log('result', result);
          resolve({
            location: result.bestMove.location,
            pieceId: result.bestMove.pieceId
        });
    
    });
}

function getDepth(pieces, level) {
    const leftCount = pieces.filter(p => !p.location).length;
    if (level === 0){
        if (leftCount > 14){
            return 1;
        }
        return 2;
    }else{
        if (leftCount > 14) return 1;
        if (leftCount > 11) return 2;
        if (leftCount > 7) return 4;
        if (leftCount > 1) return 6;
        const turn = pieces.length - leftCount
        return turn - 2;
    }
}


/* 
Your generateMoves function must take a gameState object and
 return an array of all legal moves for that game state. 
You can represent the moves however 
you see fit: integers, objects, strings, etc.
 */
function generateMoves(gameState) {
    const { pieces, selectedPieceId } = gameState;
    let possibleMoves = [];
    gameState.isUserPerspective = !gameState.isUserPerspective;
    gameState.isUserTurn = gameState.isUserPerspective;

    // For each possible board cell location
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            const isUsed = pieces.some((piece) => {
                return DeepEqual(piece.location, {row, column});
            });
            if (!isUsed) {
                // Try with all available pieces
                const avaliablePieces = pieces.filter(p => {
                    return !p.location && p.id !== parseInt(selectedPieceId)
                });
                for (let piece of avaliablePieces) {
                    const move = {
                        selectedPieceId: selectedPieceId,
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
Your makeMove function must take a gameState object and a move object, 
perform the move upon the gameState, altering it in place, and return a 
boolean value that represents whether or not the side-to-move has 
changed after having performed the move.
 */
function makeMove(gameState, move) {
    const { pieceId, location, selectedPieceId } = move;
    gameState.isUserTurn = !gameState.isUserTurn;

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
Your unmakeMove function must take a gameState object and a move object, 
un-perform the move upon the gameState, altering it in place. 
This must end up producing the exact same gameState as before having called makeMove.
 */
function unmakeMove (gameState, move) {
    const { selectedPieceId } = move;
    gameState.isUserTurn = !gameState.isUserTurn;

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
    const { isUserTurn, pieces, isUserPerspective, difficulty } = gameState;

    result = countWinMoves(pieces);
    if (result) {
       // console.log('evaluating....');
       // console.log(gameState, result);
    }
    if (difficulty === 0){
    result *= ((isUserTurn && isUserPerspective)?1:-1);
    }else{
    result *= ((isUserTurn && isUserPerspective)?-1:-1);
    }
    return result;
}

function evaluateTerminal(gameState){
    let result = null;
    const {isUserTurn, pieces, lastPieceID, isUserPerspective} = gameState;
    const didWin = CheckWin(pieces, lastPieceID);
    const boardIsFull = pieces.every(piece => !!piece.location);

    if (didWin) {
        result = Infinity * ((isUserTurn && isUserPerspective)?1:-1);
    }
    else if (boardIsFull) {
        result = 0;
    }

    return result;
}


export {startMinimax};