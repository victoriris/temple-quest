import { INTRO_UPDATE_DATA } from './types';
import history from '../history';


export const stopIntroLoading = () => {

    return (dispatch) => {
        history.push('/gameScreen');
        dispatch(updateIntroData('loading', false));
    }
};

export const updateIntroData = (prop, value) => {
    return (dispatch) => {
        dispatch(updateData({ prop, value }));
    }
};

const updateData = ({ prop, value }) => {
    return {
        type: INTRO_UPDATE_DATA,
        payload: { prop, value }
    };
};