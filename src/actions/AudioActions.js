import { AUDIO_UPDATE_DATA } from './types';


export const updateAudioData = (prop, value) => {
    return (dispatch) => {
        dispatch(updateData({ prop, value }));
    }
};

const updateData = ({ prop, value }) => {
    return {
        type: AUDIO_UPDATE_DATA,
        payload: { prop, value }
    };
};
