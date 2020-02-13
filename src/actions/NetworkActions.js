import { NETWORK_UPDATE_DATA, NETWORK_RECEIVE_MESSSAGE } from './types';
import Peer from 'peerjs';


export const updateNetworkData = (prop, value) => {
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
                console.log(list)
            });
        });
        
        peer.on('error', function({type}) {
            if (type === 'unavailable-id') {
                console.log('Id is taken already');
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
                    // dispatch({
                    //     type: NETWORK_RECEIVE_MESSSAGE,
                    //     payload: {
                    //         peerId: conn.peer,
                    //         data
                    //     }
                    // });
                }

                if (type === 'place_piece') {
                    // dispatch({
                    //     type: NETWORK_RECEIVE_MESSSAGE,
                    //     payload: {
                    //         peerId: conn.peer,
                    //         data
                    //     }
                    // });
                }
            });
        });
    };

};

export const initPeer = () => {
    return (dispatch, getState) => {

        const data = new Peer({
            host: 'temple-quest-peerjs.herokuapp.com',
            port: 80,
            debug: 2,
        });

        dispatch(updateNetworkData('peer', data));
    };
}


const updateData = ({ prop, value }) => {
    return {
        type: NETWORK_UPDATE_DATA,
        payload: { prop, value }
    };
};