import { NETWORK_RECEIVE_MESSSAGE, NETWORK_UPDATE_DATA } from "../actions/types";
import moment from "moment";


const INITIAL_STATE = {
    peer: null,
    messages: [],
    peerId: '',
    remotePeerId: '',
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        
        case NETWORK_UPDATE_DATA:
            return { ...state, [payload.prop]: payload.value };

        case NETWORK_RECEIVE_MESSSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    createdBy: payload.peerId,
                    createdOn: moment().utc(),
                    content: payload.data,
                }]
            };
        
        default:
            return state;

    }
}