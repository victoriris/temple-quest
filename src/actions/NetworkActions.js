import { NETWORK_UPDATE_DATA, NETWORK_RECEIVE_MESSSAGE } from './types';
import {peer} from '../Network';


export const updateNetworkData = (prop, value) => {
    return (dispatch) => {
        dispatch(updateData({ prop, value }));
    }
};

export const sendNetworkData = (type, data) => {

    return (dispatch, getState) => {

        const { remotePeerId } = getState().network;
        console.log(`sending to ${remotePeerId}`);
        const conn = peer.connect(remotePeerId);
        conn.on('open', () => {
            conn.send({ type, data });
        });

    };

};

export const listenNetworkData = () => {

    return (dispatch) => {
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


const updateData = ({ prop, value }) => {
    return {
        type: NETWORK_UPDATE_DATA,
        payload: { prop, value }
    };
};