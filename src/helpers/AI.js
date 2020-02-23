import CheckWin from './CheckWin';
import DeepEqual from 'deep-equal'
import { selectBoardCell, selectBagPiece } from '../actions/BoardActions';


let AlphaBetaResult ={
    coordinates, //x,y of selectedPiece
    piece = {piece, score: -1000} //newPiece
}


function startMinimax(pieces, selectedPieceId){
    //copy pieces, find unusedPieces, find emptyLocations
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
       return !pieces.some((piece)=>{
           //returns true if a piece has a location
           return deepEqual(piece.location, item);
       })
   })

      //find pieces without locations
      const unused = newPieces.filter((item)=>{
        return !item.location;
    })

    selectedPiece = unused.find(u => u.id === parseInt(selectedPieceId));


    const maxDepth = getDepth(unused);
    const bestMove = getBestMove(pieces, emptySpaces, selectedPiece, unused, maxDepth );
    makeMove(bestMove, selectedPiece);
}

//returns optimal location, optimal piece to give opponent
function getBestMove(board, emptyLocations, selectedPiece, unusedPieces, maxDepth){
    let result;
    
    emptyLocations.foreach((location, index)=>{
    selectedPiece.location = location;
    result = getBoardScore(board, emptyLocations, selectedPiece, unusedPieces, 1, maxDepth);
    if (result.score > ABResult.piece.score){
    ABResult.coordinates = location;
    ABResult.piece = result;
    console.log(`current best:  ${ABResult}`);
    }
    selectedPiece.location = null;
    });


    console.log(`final best: ${ABResult}`)
    return ABResult;


}


function getBoardScore( board, emptyLocations, selectedPiece, unusedPieces, currentDepth, maxDepth ){
    
    let max = -infinity;
    //base cases
    //if someone wins:
    if (checkWin(board, selectedPiece)){
        const bestPiece = {piece:selectedPiece, score:1}
        return bestPiece;
    }//if depth is reached (or tie)
    else if (currentDepth === maxDepth || emptyLocations.isEmpty()){
        const bestPiece = {piece:selectedPiece, score:0}
        return bestPiece;

    }
    
    let boardCopy = [...board];
    let locationsCopy = emptyLocations.filter((l) =>{
        return !DeepEqual(l, selectedPiece.location);
    });
    let unusedCopy = unusedPieces.filter((u) => {
        return !DeepEqual(u, piece);
    });;
    let currentPiece;
    var bestPiece;
    locationsCopy.foreach((location,locationIndex)=>{
        unusedCopy.foreach((piece,unusedIndex)=>{
            //TODO: set currentPiece on boardCopy while popping from arrays
            currentPiece = piece;
            currentPiece.location = location;

            //I don't know how to do this.
            boardPiece = boardCopy.find(({ id }) => id === parseInt(piece));
            boardPiece.location = location;

            //deepEqual to make copies of arrays without the current elements
            // const otherLocations = locationsCopy.filter((l) => {
            //     return !DeepEqual(l, currentPiece.location);
            // });
            // const otherPieces = unusedCopy.filter((u) => {
            //     return !DeepEqual(u, piece);
            // });

            currentDepth++;
            let miniMaxResult = getBoardScore(boardCopy, otherLocations, currentPiece, otherPieces, currentDepth, maxDepth) //MUST FLIP THE RESULT
            miniMaxResult.score = (miniMaxResult.score * -1); //I DID IT I FLIPPED THE RESULT
            currentPiece.location = null;
            if (minimaxResult.score > max){
                bestPiece = {piece: currentPiece, score: minimaxResult.score};
                max = miniMaxResult.score;
            }
        })
        return bestPiece;
    } )
    

}

function makeMove(bestMove, selectedPiece){
    //selectedPiece.location = bestMove.location
    selectBoardCell(bestMove.location.row, bestMove.location.column);
    selectBagPiece(bestMove.piece.piece.id);
    //selectedPiece = bestMove.piece
}

function getDepth(unusedPieces){
    switch (unusedPieces) {
        case 16:;
        case 15:;
        case 14: return 2;
        case 13:;
        case 12: return 3;
        case 11:;
        case 10: return 4;
        case 9:;
        case 8: return 6;
        case 7:;
        case 6:;
        case 5:;
        case 4:;
        case 3:;
        case 2:;
        case 1:;
        default: return 8;
    }
}