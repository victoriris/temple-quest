import { BOARD_UPDATE_DATA, BOARD_INIT, BOARD_PLACE_PIECE } from './types';


export const checkBoardWin = (pieceId) => {
    return (dispatch, getState) => {
        const { pieces } = getState().board;

        // Find piece, exit otherwise
        const piece = pieces.find(({ id }) => id === parseInt(pieceId));
        if (!piece) return;

        // Get located pieces with same row OR column
        const neighbors = pieces.filter((p) => {
            if (!p.location) return false;
            return (
                p.location.row === piece.location.row 
                || p.location.column === piece.location.column
            );
        });
        
        // Accumulate similarities per direction
        const directions = neighbors.reduce((acc, item) => {

            // For each characteristic
            Object.keys(item.details).forEach((key) => {

                // Sum its boolean value to the matched row or column
                const matches = item.details[key] === piece.details[key];
                if (item.location.row === piece.location.row) {
                    acc['row'][key] = (acc['row'][key] || 0) + matches;
                }
                if (item.location.column === piece.location.column) {
                    acc['column'][key] = (acc['column'][key] || 0) + matches;
                }

            });

            return acc;
        }, {row: {}, column: {}, diagonal: {}});

        // Check if some value in some direction totally matched
        const hasWon = Object.values(directions).some(direction => {
            return Object.values(direction).some(value => value === 4);
        });

        if (hasWon) alert('Game over');
        
    };
};

export const initBoard = () => {
    return {
        type: BOARD_INIT
    };
};

export const selectBagPiece = (pieceId) => {
    return (dispatch) => {
        dispatch(updateBoardData('selectedPieceId', pieceId.toString()));
    };
};

export const selectBoardCell = (row, column) => {
    return (dispatch, getState) => {

        // Get selected piece or exit otherwise
        const { selectedPieceId } = getState().board;
        if (!selectedPieceId) return;

        // Assign location to piece
        dispatch({ 
            type: BOARD_PLACE_PIECE, 
            payload: {
                pieceId: selectedPieceId, 
                location: { row, column },
                owned: true
            } 
        });
        
        // Check if it is a winning move
        dispatch(checkBoardWin(selectedPieceId));

    }
};

export const updateBoardData = (prop, value) => {
    return (dispatch) => {
        dispatch(updateData({ prop, value }));
    }
};

const updateData = ({ prop, value }) => {
    return {
        type: BOARD_UPDATE_DATA,
        payload: { prop, value }
    };
};