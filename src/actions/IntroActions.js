import { INTRO_UPDATE_DATA } from './types';
import history from '../history';
import { stopMusic } from './AudioActions';

// Stop the intro if loading, nothing otherwise
export const stopIntroLoading = () => {
    return (dispatch, getState) => {
        const { loading } = getState().intro;
        if (!loading)  return null;
        dispatch(stopMusic());
        history.push('/menu');
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