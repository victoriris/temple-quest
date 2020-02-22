import { NETWORK_UPDATE_DATA, NETWORK_RECEIVE_MESSSAGE } from './types';
import Peer from 'peerjs';
import { selectBagPiece, selectBoardCell } from './BoardActions';


export const updateNetworkData = (prop, value) => {
    console.log('updating network data at', prop, ' with value of ', value);
    return (dispatch) => {
        dispatch(updateData({ prop, value }));
    }
};

export const sendNetworkData = (type, data) => {

    return (dispatch, getState) => {

        const { remotePeerId, peer } = getState().network;
        console.log(`sending to ${remotePeerId}`);
        const conn = peer.connect(remotePeerId);
        conn.on('open', () => {
            conn.send({ type, data });
        });

    };

};

export const listenNetworkData = () => {

    return (dispatch, getState) => {
        const { peer } = getState().network;
        
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
            peer.listAllPeers(list => {
                const onlineUsers = list.filter((user) => {
                    return user !== id;
                });
                dispatch(updateNetworkData('onlineUsers', onlineUsers));
                for(var i = 0; i < 100; i++) {
                    console.log(list[i])
                }
            });
        });
        
        peer.on('error', function({type}) {
            if (type === 'unavailable-id') {
                console.log('Id is taken already');
                alert('Username is already taken, please select another');
            }
        });
        peer.on('connection', (conn) => {
            conn.on('data', ({type, data}) => {

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
                    console.log('receiving selection...');
                    dispatch(
                        selectBagPiece(data, true)
                    );
                }

                if (type === 'place_piece') {
                    console.log('receving placement...');
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
    console.log('Action called!!!')
    return (dispatch, getState) => {
        var { peer } = getState().network;
        console.log('refreshing peer list for ' + peer.id);
        peer.listAllPeers(list => {
            const onlineUsers = list.filter((user) => {
                return user !== peer.id;
            });
            dispatch(updateNetworkData('onlineUsers', onlineUsers));
            for(var i = 0; i < 100; i++) {
                console.log(list[i])
            }
        });
    }
}


const updateData = ({ prop, value }) => {
    return {
        type: NETWORK_UPDATE_DATA,
        payload: { prop, value }
    };
};