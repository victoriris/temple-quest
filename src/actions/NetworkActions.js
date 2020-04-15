import { NETWORK_UPDATE_DATA, NETWORK_RECEIVE_MESSSAGE, NETWORK_RESET_DATA } from './types';
import Peer from 'peerjs';
import history from '../history';
import { selectBagPiece, selectBoardCell, updateBoardData, launchMultiplayer } from './BoardActions';


export const resetNetwork = (prop, value) => {
    return (dispatch) => {
        dispatch({ type: NETWORK_RESET_DATA });
    };
};

export const updateNetworkData = (prop, value) => {
    return (dispatch) => {
        dispatch(updateData({ prop, value }));
    }
};

export const connectToPeer = (peerId) => {

    return (dispatch, getState) => {
        
        // Make connection to remote peer
        const { peer } = getState().network;
        peer.connect(peerId);
        dispatch(updateNetworkData('remotePeerId', peerId));

    };

};

export const sendMessage = (message) => {

    return (dispatch, getState) => {

        const { peer } = getState().network;
        dispatch(sendNetworkData('message', message));
        dispatch({
            type: NETWORK_RECEIVE_MESSSAGE,
            payload: {
                peerId: peer._id,
                data: message
            }
        });
        dispatch(updateNetworkData('messageInput', ''));

    };

}

export const sendNetworkData = (type, data) => {

    return (dispatch, getState) => {

        const { remotePeerId, peer } = getState().network;
        console.log(`sending to ${remotePeerId}`, data);
        const conn = peer.connect(remotePeerId);
        conn.on('open', () => {
            conn.send({ type, data });
        });

    };

};

export const listenNetworkData = () => {

    return (dispatch, getState) => {
        const { peer, remotePeerId } = getState().network;
        
        // Listen for own connection
        peer.on('open', function(id) {

            dispatch(getPeersList());

        });
        
        peer.on('error', function({type}) {
            if (type === 'unavailable-id') {
                console.log('Id is taken already');
                alert('Username is already taken, please select another');
                dispatch(updateNetworkData('peer', null));
            }
            if(type === "peer-unavaliable") {
                console.log('Peer disconnected');
                alert('Your opponent appears to have disconnected!');
                peer.destroy();
                history.push('/menu');
            }
        });
        peer.on('connection', (conn) => {

            // Connection was made by remote peer
            conn.on('open', () => {
                if (!remotePeerId.length) {
                    dispatch(updateNetworkData('remotePeerId', conn.peer));
                    dispatch(updateNetworkData('isInvited', true));
                }
            })
            // Data was received from remote peer
            conn.on('data', ({type, data}) => {
                if (type === 'inviteStatus' && data === 'accepted') {
                    alert('Your invite was accepted!');
                    dispatch(updateBoardData('isUserTurn', false));
                    dispatch(launchMultiplayer(true));

                } else if (type === 'inviteStatus') {
                    //alert('Your invite was declined.');
                    dispatch(updateNetworkData('inviteSent', false));
                    dispatch(updateNetworkData('isInvited', false));
                }

                if (type === 'message') {
                    dispatch({
                        type: NETWORK_RECEIVE_MESSSAGE,
                        payload: {
                            peerId: conn.peer,
                            data
                        }
                    });
                }

                if (type === 'select_piece') {
                    console.log('receiving selection...', data);
                    dispatch(
                        selectBagPiece(data, true)
                    );
                }

                if (type === 'place_piece') {
                    console.log('receving placement...', data);
                    const { row, column } = data;
                    dispatch(
                        selectBoardCell(row, column, true)
                    );
                }
            });
        });
    };

};

export const initPeer = ( userId ) => {
    return (dispatch, getState) => {
        const data = new Peer(userId, {
            host: 'temple-quest-peerjs.herokuapp.com',
            port: 80,
            debug: 2,
        });

        dispatch(updateNetworkData('peer', data));
    };
}

export const getPeersList = () => {

    return (dispatch, getState) => {
        // Refresh connected users list
        var { peer } = getState().network;
        if (!peer) return;
        peer.listAllPeers(list => {
            const onlineUsers = list.filter((user) => {
                return user !== peer.id;
            });
            dispatch(updateNetworkData('onlineUsers', onlineUsers));
        });
    }

}


const updateData = ({ prop, value }) => {
    return {
        type: NETWORK_UPDATE_DATA,
        payload: { prop, value }
    };
};