import {CheckWin} from '../helpers';
import DeepEqual from 'deep-equal'


var AlphaBetaResult ={
   coordinates: null, //x,y of selectedPiece
   piece: {bestPiece: null, score: -10000} //newPiece
}

let max;

async function startMinimax(pieces, selectedPieceId, movementAction) {

    return new Promise((resolve, reject) => {

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
       let unusedCopy = unused.filter((u) => {
        return !DeepEqual(u, selectedPiece);
    });
    
        const maxDepth = getDepth(unused.length);
        console.log("Depth: ", maxDepth);
        const bestMove = getBestMove(pieces, emptySpaces, selectedPiece, unusedCopy, maxDepth );
        console.log("BESTMOVE: ", bestMove);

        // Coordinates and piece
        resolve({
            location: bestMove.coordinates,
            pieceId: bestMove.piece.piece.id
        });
    });
}

//returns optimal location, optimal piece to give opponent
function getBestMove(board, emptyLocations, selectedPiece, unusedPieces, maxDepth){
    let result;
    let alpha, beta;
    console.log("Locations: ", emptyLocations);
    emptyLocations.forEach((location)=>{
    max = -10000;
    alpha = -Infinity;
    beta = Infinity;
    selectedPiece.location = location;
    let locationsCopy = emptyLocations.filter((l) =>{
        return !DeepEqual(l, selectedPiece.location);
    });
    let boardPiece = board.find(({ id }) => id === parseInt(selectedPiece.id));
    if (boardPiece){ 
    boardPiece.location = location;
    }
    result = getBoardScore(board, locationsCopy, selectedPiece, unusedPieces, 1, maxDepth, true, alpha, beta);
    // console.log("FINISHED ONE LOOP, RESULT: ", result, "LOCATION: ", location);
    console.log("result: ", result);
    if (result.score >= AlphaBetaResult.piece.score){
    AlphaBetaResult.coordinates = location;
    AlphaBetaResult.piece = result;
    console.log("current best: ", AlphaBetaResult);
    }
    selectedPiece.location = null;
    });


    console.log("final best: ",AlphaBetaResult)
    return AlphaBetaResult;


}


function getBoardScore( board, emptyLocations, selectedPiece, unusedPieces, currentDepth, maxDepth, flip, alpha, beta){
    //console.log("Current depth: ", currentDepth, "/", maxDepth);
    
    //base cases
    //if someone wins:
    if (CheckWin(board, selectedPiece.id)){
        const bestPiece = {piece:selectedPiece, score:50}
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
    });
    let currentPiece;
    var bestPiece = {piece: null, score: 0};
    locationsCopy.forEach((location,locationIndex)=>{
        unusedCopy.forEach((piece,unusedIndex)=>{
            currentPiece = piece;
            currentPiece.location = location;
           let boardPiece = boardCopy.find(({ id }) => id === parseInt(piece.id));
           if (boardPiece){ 
           boardPiece.location = location;
           }else {
               console.log("No Board Piece: " , boardPiece);
           }
            currentDepth++;
            let miniMaxResult = getBoardScore(boardCopy, locationsCopy, currentPiece, unusedCopy, currentDepth, maxDepth, !flip, -alpha, -beta); //MUST FLIP THE RESULT
            
            if (flip){
            miniMaxResult.score = miniMaxResult.score * -1; //I DID IT I FLIPPED THE RESULT
            }
            currentPiece.location = null;
            boardPiece.location = null;
            if (miniMaxResult.score > max){
                max = miniMaxResult.score;
                //console.log("Max: ", max);
            }
            if (currentDepth === 2 && max === 50){
                return {piece: currentPiece, score: Infinity}
            }
            currentDepth--;
                bestPiece.piece = currentPiece;
                bestPiece.score += miniMaxResult.score
            
        })
    } )
    //console.log("Best Piece:", bestPiece);
    //bestPiece.score = max;
    return bestPiece;

}


function getDepth(unusedPieces){
    //if (unusedPieces >= 14) return 2;
    if (unusedPieces >= 10) return 2;
    if (unusedPieces >= 8) return 2;
    if (unusedPieces >= 6) return 2;
    return 2;
}

const gameState =  {
    pieces: [],
    isUserTurn: false,
    isGameOver: false,
    selectedPieceId: '',
}

const move = {
    piece: null,
    location: null 
};


/* 
Your generateMoves function must take a gameState object and
 return an array of all legal moves for that game state. 
You can represent the moves however 
you see fit: integers, objects, strings, etc.
 */
function generateMoves(gameState) {
    const { pieces } = gameState;
    let possibleMoves = [];

    for (let row = 0; row < 16; row++) {
        for (let column = 0; column < 16; column++) {
            const isUsed = pieces.some((piece) => {
                return DeepEqual(piece.location, {row, column});
            });
            if (!isUsed) {
                for (let piece of pieces) {
                    const move = {
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
    const {pieceId, location} = move;
    const { selectedPieceId } = gameState;

    const updatedPiece = gameState.pieces.find((piece) => {
        if (piece.id === selectedPieceId) {
            piece.location = location;
            return true;
        }
        return false;
    });

    if (updatedPiece) {
        gameState.selectedPieceId = move.pieceId;
    }

    return !!updatedPiece;
}

/* 
Your unmakeMove function must take a gameState object and a move object, un-perform the move upon the gameState, altering it in place. This must end up producing the exact same gameState as before having called makeMove.
 */
function unmakeMove (gameState, move) {
    const {pieceId, location} = move;

    const updatedPiece = gameState.pieces.find((piece) => {
        if (piece.id === pieceId) {
            piece.location = null;
            return true;
        }
        return false;
    });

    if (updatedPiece) {
        gameState.selectedPieceId = move.pieceId;
    }
}

function evaluate(gameState){
    /*
    If the current player wins, add 50 points. If current player doesn't win, they get 0. TODO: add threeInARow function
    */
    if (CheckWin(gameState.pieces, gameState.selectedPieceId)){
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



export {startMinimax};