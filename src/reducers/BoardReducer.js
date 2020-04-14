import { BOARD_PICK_PIECE, BOARD_PLACE_PIECE, BOARD_RESET_GAME, BOARD_UPDATE_DATA, BOARD_UPDATE_PIECE_OBJECT } from "../actions/types";
import { cellCords, getInitialPieces, pieceObjects } from '../utils';


const INITIAL_STATE = {
    isUserTurn: true,
    pieces: getInitialPieces(),
    selectedPieceId: '',
    isOnlineMode: false,
    isSingleMode: true,
    mounted: false,
    cellCords: cellCords,
    pieceObjects: pieceObjects,
    isGameOver: false,
<<<<<<< HEAD
    difficultyLevel: 0,
=======
    score: 0,
>>>>>>> master
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        
        case BOARD_UPDATE_DATA:
            return { ...state, [payload.prop]: payload.value };

        case BOARD_UPDATE_PIECE_OBJECT: {
            let newPieceObjects = [ ...state.pieceObjects ];

            // Find piece index, exit otherwise
            let pieceIdx = newPieceObjects.findIndex(p => p.id === parseInt(payload.id));
            if (pieceIdx < 0) return state;

            // Modify piece properties
            newPieceObjects[pieceIdx] = {
                ...newPieceObjects[pieceIdx],
                [payload.prop]: payload.value
            };

            return { ...state, pieceObjects: newPieceObjects };
        }

        case BOARD_PICK_PIECE: {
                //console.log("userTurn: ", !state.isUserTurn);
            return {
                ...state,
                selectedPieceId: payload.selectedPieceId,
                isUserTurn: !state.isUserTurn
            };

        }
        
        case BOARD_PLACE_PIECE: {

            let newPieces = [ ...state.pieces ];

            // Find piece index, exit otherwise
            let pieceIdx = newPieces.findIndex(p => p.id === parseInt(payload.pieceId));
            if (pieceIdx < 0) return state;

            // Modify piece properties
            newPieces[pieceIdx] = {
                ...newPieces[pieceIdx],
                owned: state.isUserTurn,
                location: payload.location
            };

            return { 
                ...state, 
                pieces: newPieces, 
                selectedPieceId: '',
            };
        }

        case BOARD_RESET_GAME: {

            // If the game continues, preserve settings
            if (payload && payload.playAgain) {
                const scoreWon = state.isUserTurn ? state.pieces.filter(p=>!p.location).length : 0;
                return {
                    ...INITIAL_STATE,
                    isOnlineMode: state.isOnlineMode,
                    isSingleMode: state.isSingleMode,
                    score: state.score += scoreWon,

                }
            }

            // Otherwise wipe out everything
            return {
                ...INITIAL_STATE
            };
        }

        default:
            return state;

    }
}
