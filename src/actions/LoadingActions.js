import { INTRO_UPDATE_DATA } from './types';
import history from '../history';


export const StopLoading = () => {

    return (dispatch) => {
        dispatch(CloseLoader());
    }
};

const CloseLoader = () => {
    return {
        
    };
};