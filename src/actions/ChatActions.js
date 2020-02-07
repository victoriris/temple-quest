import { CHAT_UPDATE_DATA, CHAT_RECEIVE_MESSSAGE } from './types';
import {peer} from '../Network';


export const updateChatData = (prop, value) => {
    return (dispatch) => {
        dispatch(updateData({ prop, value }));
    }
};

export const sendChatMessage = () => {

    return (dispatch, getState) => {

        const { remotePeerId } = getState().network;
        console.log(`sending to ${remotePeerId}`);
        const conn = peer.connect(remotePeerId);
        conn.on('open', () => {
            conn.send(`Hello ${remotePeerId}`);
        });

    };

};

export const listenNetworkChat = () => {

    return (dispatch) => {
        peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                // Will print 'hi!'
                dispatch({
                    type: CHAT_RECEIVE_MESSSAGE,
                    payload: {
                        peerId: conn.peer,
                        data
                    }
                });
            });
        });
    };

};


const updateData = ({ prop, value }) => {
    return {
        type: CHAT_UPDATE_DATA,
        payload: { prop, value }
    };
};