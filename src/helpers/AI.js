import CheckWin from './CheckWin';
import DeepEqual from 'deep-equal'


let AlphaBetaResult ={
    coordinates, //x,y of selectedPiece
    piece = {piece, score} //newPiece
}


function startMinimax(pieces){
    //copy pieces, find unusedPieces, find emptyLocations
    const maxDepth = getDepth(unusedPieces);
    const bestMove = getBestMove();
    placePiece(bestMove);
}

//returns optimal location, optimal piece to give opponent
function getBestMove(board, emptyLocations, selectedPiece, unusedPieces, maxDepth){
    
    
    emptyLocations.foreach((location, index)=>{
    // ABResult.coordinates = location;
    // place selectedPiece on board in next coordinate from emptyLocations
    // ABResult.piece = getBoardScore(board, emptyLocations, selectedPiece, unusedPieces, 1, maxDepth);
    // push ABResult to array
    });


    
    // return move


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
    let locationsCopy = [...emptyLocations];
    let unusedCopy = [...unusedPieces];
    let currentPiece;
    var bestPiece;
    locationsCopy.foreach((location,locationIndex)=>{
        unusedCopy.foreach((piece,unusedIndex)=>{
            //TODO: set currentPiece on boardCopy while popping from arrays
            currentPiece = piece;
            currentPiece.location = location;

            //I don't know how to do this.
            boardCopy.find(({ id }) => id === parseInt(piece)).location = currentPiece.location;


            //deepEqual to make copies of arrays without the current elements
            const otherLocations = locationsCopy.filter((l) => {
                return !DeepEqual(l, currentPiece.location);
            });
            const otherPieces = unusedCopy.filter((u) => {
                return !DeepEqual(u, piece);
            });

            currentDepth++;
            let miniMaxResult = getBoardScore(boardCopy, otherLocations, currentPiece, otherPieces, currentDepth, maxDepth) //MUST FLIP THE RESULT
            miniMaxResult.score = (miniMaxResult.score * -1); //I DID IT I FLIPPED THE RESULT
            if (minimaxResult.score > max){
                bestPiece = {piece: currentPiece, score: minimaxResult.score};
                max = miniMaxResult.score;
            }
        })
        return bestPiece;
    } )
    

}

function placePiece(miniMaxResult){
    
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