import { checkBoardWin } from './BoardActions';
import deepEqual from 'deep-equal';
import { isWinMove } from '../helpers';
var min;
var max;
export const miniMaxStart = () =>{
return (dispatch, getstate) => {
    const board = getstate().board;
    const {selectedPieceId} = board;
    const newPieces = [ ...board.pieces ];
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
    const emptySpaces = spaces.filter((item)=>{
        //switches the nested return
        return !newPieces.some((piece)=>{
            //returns true if a piece has a location
            return deepEqual(piece.location, item);
        })
    })

    let depth;
    switch(emptySpaces.length){
            case 16:
            case 15:
            case 14:
            case 13:
            case 12:  depth =  3;
            break;
            case 11:
            case 10:  depth =  4;
            break;
            case 9:  depth =  5;
            break;
            case 8:
            default:  depth =  8;
    }
    //removes selected piece from unused, sets it to start piece

    let start = unused.find(u => u.id === parseInt(selectedPieceId));

    let currentPiece = {...start};
    let lastPiece = {...currentPiece};
    console.log("empty spaces: ",emptySpaces.length, " depth: ", depth);
    console.time("time");
    let trash = miniMax(newPieces, turn, currentPiece, unused, emptySpaces, depth, 0 );
    console.timeEnd("time");

}
}


function miniMax (pieces, turn, currentPiece, unused, emptySpaces, depth, currentDepth){
    let tempEmptySpaces = [...emptySpaces];
    let tempUnused = [...unused];
    let current = {...currentPiece}; 
    const isGameOver = isWinMove(pieces, current.id);
    //base cases: win, lose, tie/run out of depth
        
    if ( isGameOver && turn) { //player
        return -10;
    }
    else if ( isGameOver && !turn){ //ai
        return 10;
    }
    else if (tempEmptySpaces.length === 0 || currentDepth === depth){
        return 0;
    }
        


    var moves = [];
        var move = {};
        var bestValue, v;
        if (turn){
            bestValue = Number.NEGATIVE_INFINITY;
            for (let p in tempUnused){
                tempUnused.shift();
                v = miniMax(pieces, !turn, p, tempUnused, tempEmptySpaces, depth, currentDepth+1);
                bestValue = Math.max(v, bestValue);
            }
            return bestValue;
        }else{
            bestValue = Number.POSITIVE_INFINITY;
            for (let p in tempUnused){
                tempUnused.shift();
                v = miniMax(pieces, !turn, p, tempUnused, tempEmptySpaces, depth, currentDepth+1);
                bestValue = Math.min(v, bestValue);
            }
            return bestValue; 
        }





    //     if (currentDepth > 0){
    //         move.index = tempEmptySpaces.pop();
    //         console.log("index if depth > 0: " , move.index);
    //     }
    //     else if (currentDepth === 0) {
    //         move.index = start.location;
    //         console.log("index if depth === 0: " , move.index);
    //     }
    //     move.score = 0;
    //     move.parent = null;
    //     last = {...start};
    //     last.location = move.index;
    //   //  for (let j = 0; j < (unused.length); j++){
    //       //  console.log("tempUnused.length: ", tempUnused.length);
    //         move.parent = last.location;
    //         start = tempUnused.pop();
    //       //  console.log("start: ", start);
    //         move.piece = {...start};
    //         let result = miniMax(pieces, !turn, start, tempUnused, tempEmptySpaces, last, depth, (currentDepth + 1));
    //          move.score += result;
    //          subMoves.push(move);
    //   //  }
    //    // console.log("score: ", move.score);
    //    if (currentDepth === 0){
    //      moves.push(move);
    //    }
    // //}

        //todo: find best move
        if (currentDepth === 0){
        let bestScore = -Infinity;
        let worstScore = Infinity;
        let top;
        console.log("moves: ",moves);
        // console.log("submoves: ",subMoves);
        moves.forEach(item =>{
            if (item.score > bestScore){
                top = item;
            } 
        })
        let bestMove = top;
        
       console.log(bestMove);
    }
    // let bestChildren = subMoves.filter((item)=>{ 

    //         return deepEqual(item.parent, bestMove.location);
        
    // })

    // let worstMove = ()=>{
    //     let bottom;
    //      bestChildren.forEach(item =>{
    //          if (item.score < worstScore){
    //              bottom = item;
    //          } 
    //      })
    //      return bottom;
    // }


    // //todo: make best move, give worst piece
    // console.log(bestMove.location);

}

