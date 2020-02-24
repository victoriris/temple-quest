import { BOARD_UPDATE_DATA, BOARD_INIT, BOARD_PLACE_PIECE, BOARD_PICK_PIECE } from './types';
import { sendNetworkData } from './NetworkActions';
import { CheckWin } from '../helpers';
import {startMinimax}  from '../helpers';


export const checkBoardWin = (pieceId) => { 
    return (dispatch, getState) => {
        const { pieces, isUserTurn } = getState().board;
        let hasWon = CheckWin(pieces, pieceId);

        const message = 'Game over. The winner is Player ' + (isUserTurn ? 1 : 2);
        if (hasWon) alert(message);
    };
};

export const initBoard = () => {
    return {
        type: BOARD_INIT
    };
};

export const selectBagPiece = (pieceId, isRemote = false) => {
    return (dispatch, getState) => {
        const { isOnlineMode, isSingleMode, pieces } = getState().board;
        console.log("Selecting Piece: ", pieceId);
        dispatch({
            type: BOARD_PICK_PIECE,
            payload: {
                selectedPieceId: pieceId.toString(),
            }
        })

        // Send to peer
        if (isOnlineMode && !isRemote) {
            dispatch(
                sendNetworkData('select_piece', pieceId)
            );
        }

        // AI
        else if (isSingleMode && !isRemote){
            
            startMinimax(pieces, pieceId)
                .then(({ location, pieceId }) => {
                    dispatch(selectBoardCell(location.row, location.column));
                    dispatch(selectBagPiece(pieceId, true));
                })
                .catch(err => {
                    alert('The AI failed');
                })

        }
    };
};

export const selectBoardCell = (row, column, isRemote = false) => {
    return (dispatch, getState) => {
        const {isOnlineMode} = getState().board;

        // Get selected piece or exit otherwise
        const { selectedPieceId } = getState().board;
        if (!selectedPieceId) return;

        // Assign location to piece
        dispatch({ 
            type: BOARD_PLACE_PIECE, 
            payload: {
                pieceId: selectedPieceId, 
                location: { row, column },
            } 
        });
        
        // Check if it is a winning move
        dispatch(checkBoardWin(selectedPieceId));

        if (isOnlineMode) {
            dispatch(updateBoardData('isUserTurn', !isRemote));
            
            // Send to peer
            if (!isRemote) {
                dispatch(
                    sendNetworkData('place_piece', {row, column})
                );
            }
        }

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

