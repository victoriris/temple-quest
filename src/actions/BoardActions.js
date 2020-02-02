import { BOARD_UPDATE_DATA, BOARD_INIT, BOARD_PLACE_PIECE } from './types';

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