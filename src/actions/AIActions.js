import {BOARD_PLACE_PIECE} from './types';
import { StateCondition } from 'babylonjs';
import { checkBoardWin } from './BoardActions';
import deepEqual from 'deep-equal';

export const miniMaxStart = () =>{
return (dispatch, getstate) => {
    const board = getstate().board;
    let newPieces = [ ...board.pieces ];
    let turn = board.isUserTurn;

    //find pieces without locations
    const unused = newPieces.filter((item)=>{
        return !item.location;
    })
    //fill up spaces array
    let spaces = [];
        for (let row = 0; row < 4; row++){
            for (let column = 0; column < 4; column++){
                spaces.push({row, column});
            }
        }
    //create array of empty spaces, only taking an item if the return is false(and the space isn't filled)
    let emptySpaces = spaces.filter((item)=>{
        //switches the nested return
        return !newPieces.some((piece)=>{
            //returns true if a piece has a location
            return deepEqual(piece.location, item);
        })
    })

    let depth = ()=>{
        switch(emptySpaces.length){
            case 16:
            case 15:
            case 14:
            case 13: return 2;
            case 12: return 3;
            case 11:
            case 10: return 4;
            case 9: return 5;
            case 8:
            default: return 8;
        }
    }
    //removes selected piece from unused, sets it to start piece
    let startPiece = unused.splice(unused.indexOf(board.selectedPieceID), 1);
    let lastPiece = startPiece;
    miniMax(turn, startPiece, unused, emptySpaces, lastPiece, depth, 0);
/*
get copy of board and player turn

*/
}
}

function miniMax (turn, startPiece, unused, emptySpaces, lastPiece, depth, currentDepth){
        let tempUnused = unused.slice(0);
        let tempEmptySpaces = emptySpaces.slice(0);
        //first run hasn't made a move, therefore it's still our turn
        if (currentDepth === 0){
            turn = !turn;
        }
        //base cases: win, lose, tie/run out of depth
        if (checkBoardWin(lastPiece) && turn){
            return {score:-10};
        }
        else if (checkBoardWin(lastPiece) && !turn){
            return {score:10};
        }
        else if (emptySpaces.length === 0 || currentDepth === depth){
            return {score:0};
        }
        var moves = [];
        for (let i = 0; i < emptySpaces.length; i++){
            var move = {};
            move.index = emptySpaces.pop();
            lastPiece = startPiece;
            lastPiece.location = move.index;
            for (let j = 0; j < unused.length; j++){

            startPiece = unused.pop();
            move.piece = startPiece;
            let result = miniMax(!turn, startPiece, tempUnused, tempEmptySpaces, lastPiece, depth, (currentDepth + 1));
            move.score = result.score;
            moves.push(move);
            }
        }

        //todo: find best move


}
