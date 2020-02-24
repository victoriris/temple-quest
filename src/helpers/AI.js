import {CheckWin} from '../helpers';
import DeepEqual from 'deep-equal'
import { selectBoardCell, selectBagPiece } from '../actions/BoardActions';


var AlphaBetaResult ={
   coordinates: null, //x,y of selectedPiece
   piece: {bestPiece: null, score: -10000} //newPiece
}



async function startMinimax(pieces, selectedPieceId, movementAction) {

    return new Promise((resolve, reject) => {

        //copy pieces, find unusedPieces, find emptyLocations
    
        //fill up spaces array
        AlphaBetaResult.piece.score = -10000;
        let spaces = [];
        for (let row = 0; row < 4; row++){
            for (let column = 0; column < 4; column++){
                spaces.push({row, column});
            }
        }

       //create array of empty spaces, only taking an item if the return is false(and the space isn't filled)
       const emptySpaces = spaces.filter((item)=>{
           //switches the nested return
           return !pieces.some((piece)=>{
               //returns true if a piece has a location
               return DeepEqual(piece.location, item);
           })
       })
    
          //find pieces without locations
        const unused = pieces.filter((item)=>{
            return !item.location;
        })
        //console.log("unused: ",unused);
    
        let selectedPiece = unused.find(u => u.id === parseInt(selectedPieceId));
       // console.log("selectedPiece: ", selectedPiece);
    
        const maxDepth = getDepth(unused.length);
        const bestMove = getBestMove(pieces, emptySpaces, selectedPiece, unused, maxDepth );
        console.log("BESTMOVE: ", bestMove);

        // Coordinates and piece
        resolve({
            location: bestMove.coordinates,
            pieceId: bestMove.piece.piece.id
        });
    });
}



// function makeMove(bestMove, selectedPiece, dispatch){
//     //selectedPiece.location = bestMove.location
//     selectBoardCell(bestMove.coordinates.row, bestMove.coordinates.column);
//     console.log("Coordinates: ", bestMove.coordinates.row, bestMove.coordinates.column);
//     selectBagPiece(bestMove.piece.piece.id);
//     console.log("Piece: ", bestMove.piece.piece.id);
    
//     //selectedPiece = bestMove.piece
// }

//returns optimal location, optimal piece to give opponent
function getBestMove(board, emptyLocations, selectedPiece, unusedPieces, maxDepth){
    let result;
    
    emptyLocations.forEach((location)=>{
    selectedPiece.location = location;
    result = getBoardScore(board, emptyLocations, selectedPiece, unusedPieces, 1, maxDepth);
    // console.log("FINISHED ONE LOOP, RESULT: ", result, "LOCATION: ", location);
    // console.log(AlphaBetaResult);
    if (result.score > AlphaBetaResult.piece.score){
    AlphaBetaResult.coordinates = location;
    AlphaBetaResult.piece = result;
   // console.log("current best: ", AlphaBetaResult);
    }
    selectedPiece.location = null;
    });


    //console.log("final best: ",AlphaBetaResult)
    return AlphaBetaResult;


}


function getBoardScore( board, emptyLocations, selectedPiece, unusedPieces, currentDepth, maxDepth ){
    //console.log("Current depth: ", currentDepth, "/", maxDepth);
    let max = -Infinity;
    //base cases
    //if someone wins:
    if (CheckWin(board, selectedPiece.id)){
        const bestPiece = {piece:selectedPiece, score:5}
        return bestPiece;
    }//if depth is reached (or tie)
    else if (currentDepth === maxDepth || emptyLocations.length === 0){
        const bestPiece = {piece:selectedPiece, score:0}
        return bestPiece;
    }
    
    let boardCopy = [...board];
    let locationsCopy = emptyLocations.filter((l) =>{
        return !DeepEqual(l, selectedPiece.location);
    });
    let unusedCopy = unusedPieces.filter((u) => {
        return !DeepEqual(u, selectedPiece);
    });;
    let currentPiece;
    var bestPiece;
    locationsCopy.forEach((location,locationIndex)=>{
        unusedCopy.forEach((piece,unusedIndex)=>{
            //TODO: set currentPiece on boardCopy while popping from arrays
            currentPiece = piece;
            currentPiece.location = location;

            //I don't know how to do this.
           let boardPiece = boardCopy.find(({ id }) => id === parseInt(piece.id));
           if (boardPiece){ 
           boardPiece.location = location;
           }else {
               console.log("No Board Piece: " , boardPiece);
           }
            currentDepth++;
            let miniMaxResult = getBoardScore(boardCopy, locationsCopy, currentPiece, unusedCopy, currentDepth, maxDepth) //MUST FLIP THE RESULT
            currentDepth--;
            miniMaxResult.score = (miniMaxResult.score === -Infinity ? 0 : (miniMaxResult.score * -1)); //I DID IT I FLIPPED THE RESULT
            currentPiece.location = null;
            boardPiece.location = null;
            if (miniMaxResult.score > max){
                bestPiece = {piece: currentPiece, score: miniMaxResult.score};
                max = miniMaxResult.score;
                //console.log("Max: ", max);
            }
        })
    } )
    //console.log("Best Piece:", bestPiece);
    return bestPiece;

}


function getDepth(unusedPieces){
    switch (unusedPieces) {
        case 16:;
        case 15:;
        case 14: return 2;
        case 13:;
        case 12: return 2;
        case 11:;
        case 10: return 2;
        case 9:;
        case 8: return 2;
        case 7:;
        case 6:;
        case 5:;
        case 4:;
        case 3:;
        case 2:;
        case 1:;
        default: return 2;
    }
}

export {startMinimax};