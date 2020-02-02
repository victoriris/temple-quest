import { BOARD_UPDATE_DATA, BOARD_INIT, BOARD_PLACE_PIECE } from "../actions/types";

const INITIAL_STATE = {
    isUserTurn: false,
    pieces: [],
    selectedPieceId: '',
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        
        case BOARD_UPDATE_DATA:
            return { ...state, [payload.prop]: payload.value };

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

            return { ...INITIAL_STATE, pieces };
        }
        
        case BOARD_PLACE_PIECE: {

            let newPieces = [ ...state.pieces ];

            // Find piece index, exit otherwise
            let pieceIdx = newPieces.findIndex(p => p.id === parseInt(payload.pieceId));
            if (pieceIdx < 0) return state;

            // Modify piece properties
            newPieces[pieceIdx] = {
                ...newPieces[pieceIdx],
                owned: payload.owned,
                location: payload.location
            };

            return { 
                ...state, 
                pieces: newPieces, 
                selectedPieceId: '',
            };
        }

        default:
            return state;

    }
}
