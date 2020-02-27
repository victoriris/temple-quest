import { BOARD_UPDATE_DATA, BOARD_INIT, BOARD_PLACE_PIECE, BOARD_PICK_PIECE, BOARD_RESET_GAME, BOARD_UPDATE_PIECE_OBJECT } from "../actions/types";
import { cellCords, pieceObjects } from '../objects';


const INITIAL_STATE = {
    isUserTurn: true,
    pieces: [],
    selectedPieceId: '',
    isOnlineMode: false,
    isSingleMode: false,
    mounted: false,
    cellCords: cellCords,
    pieceObjects: pieceObjects,
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

        case BOARD_INIT: {
            let pieces = [];

            for (let i = 0; i < 16; i++) {

                // Convert to binary and add leading zeros
                const binaryStr = i.toString(2);
                const leadingZeros = "0".repeat(4 - binaryStr.length);
                const binaryVal = leadingZeros + binaryStr;
                
                // Build current piece
                const piece = {
                    id: i,
                    details: {
                        light: parseInt(binaryVal[0]),
                        tall: parseInt(binaryVal[1]),
                        round: parseInt(binaryVal[2]),
                        pitted: parseInt(binaryVal[3]),
                    },
                    owned: false,
                    location: null
                };
                
                // Add to pieces list
                pieces.push(piece);
            }


            console.log('isUserTurn', state.isUserTurn);

            return { ...state, pieces };
        }

        case BOARD_PICK_PIECE: {
                console.log("userTurn: ", !state.isUserTurn);
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
            return {
                ...INITIAL_STATE
            };
        }

        default:
            return state;

    }
}
