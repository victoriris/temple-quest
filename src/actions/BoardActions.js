import { CheckWin, startMinimax } from '../helpers';
import history from '../history';
import { sendNetworkData } from './NetworkActions';
import { BOARD_INIT, BOARD_PICK_PIECE, BOARD_PLACE_PIECE, BOARD_RESET_GAME, BOARD_UPDATE_DATA, BOARD_UPDATE_PIECE_OBJECT } from './types';


export const endGame = () => {
    return (dispatch, getState) => {
        dispatch({ type: BOARD_RESET_GAME });
        history.push('/menu');
    };
};

export const updatePieceObject = (pieceId, prop, value) => {
    
    console.log("Position after move: ", value);
    return (dispatch) => {
        dispatch({
            type: BOARD_UPDATE_PIECE_OBJECT,
            payload: {
                id: pieceId, prop, value
            }
        })
    };
};

export const launchMultiplayer = (isOnlineMode = false) => {
    return (dispatch, getState) => {
        dispatch(updateBoardData('isSingleMode', false));
        if (isOnlineMode) dispatch(updateBoardData('isOnlineMode', true));
        history.push('board');
    };
};

export const checkBoardWin = (pieceId) => { 
    return (dispatch, getState) => {
        const { pieces, isUserTurn } = getState().board;
        let hasWon = CheckWin(pieces, pieceId);

        if (hasWon) {
            const message = isUserTurn ? "You've won!!!!!!" : "Game Over, you lost";
            alert(message);
            dispatch(endGame());
        }
    };
};

export const initBoard = () => {
    return {
        type: BOARD_INIT
    };
};

export const selectBagPiece = (pieceId, isRemote = false) => {
    return (dispatch, getState) => {
        const { isOnlineMode, isSingleMode, pieces, cellCords } = getState().board;
        console.log("Selecting Piece: ", pieceId);
        dispatch({
            type: BOARD_PICK_PIECE,
            payload: {
                selectedPieceId: pieceId.toString(),
            }
        })

        // Update 3D view
        dispatch(updatePieceObject(pieceId, 'loc', [0, 0.069, -13]))

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
                    const cellId = location.column + (location.row * 4);
                    const cell = cellCords.find((cords, idx) => idx === cellId);
                    console.log(location,cellId, position);
                    const [x, y, z] = cell;
                    const position = {x, y, z};
                    dispatch(selectBoardCell(location.row, location.column, false, position));
                    dispatch(selectBagPiece(pieceId, true));
                })
                .catch(err => {
                    alert('The AI failed');
                })
        }
    };
};

export const selectBoardCell = (row, column, isRemote = false, position = null) => {
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

        // Update 3d view
        if (position) {
            const {x, y, z} = position;
            dispatch(updatePieceObject(selectedPieceId, 'loc', [x,y,z]));
        }
        
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

