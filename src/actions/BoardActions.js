import history from '../history';
import { CheckWin, getCellPosition, startMinimax } from '../utils';
import { sendNetworkData } from './NetworkActions';
import { BOARD_INIT, BOARD_PICK_PIECE, BOARD_PLACE_PIECE, BOARD_RESET_GAME, BOARD_UPDATE_DATA, BOARD_UPDATE_PIECE_OBJECT } from './types';
import { playGameEndSound } from './AudioActions';

export const endGame = (playAgain = false) => {
    return (dispatch, getState) => {
        dispatch({ type: BOARD_RESET_GAME, payload: { playAgain } });
        if (!playAgain) history.push('/menu');
    };
};

export const updatePieceObject = (pieceId, prop, value) => {
    
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
        const { isOnlineMode, isSingleMode } = getState().board;
        let hasWon = CheckWin(pieces, pieceId);
        const boardIsFull = pieces.every(piece => !!piece.location);

        if (hasWon || boardIsFull) {
            dispatch(updateBoardData("isGameOver", true));
            // if is not win, then is tie due to full board
            if (!hasWon) {
                dispatch(updateBoardData("isTie", true));
            }
            const isMultiplayer = !isOnlineMode && !isSingleMode;
            dispatch(playGameEndSound(isUserTurn || isMultiplayer));
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
        const { selectedPieceId, difficultyLevel } = getState().board;

        // Block acction if there is already a selected piece
        if (selectedPieceId) return;

        // Verify unplaced piece, block otherwise
        const isUnplaced = pieces.find(({ id, location }) => id === parseInt(pieceId) && !location);
        if (!isUnplaced) return;
        
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
            var t1 = performance.now();
            startMinimax(pieces, pieceId, difficultyLevel)
                .then(({ location, pieceId }) => {
                    dispatch(selectBoardCell(location.row, location.column, false));
                    const {isGameOver} = getState().board;
                    if (!isGameOver){
                    dispatch(selectBagPiece(pieceId, true));
                    }
                })
                .catch(err => {
                    alert('The AI failed');
                })
            var t2 = performance.now();
            console.log("Time elapsed: ", (t2-t1) / 1000, " seconds");
        }
    };
};

export const selectBoardCell = (row, column, isRemote = false) => {
    return (dispatch, getState) => {
        const {isOnlineMode} = getState().board;
        const position = getCellPosition(row, column);

        // Get selected piece id or exit otherwise
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

