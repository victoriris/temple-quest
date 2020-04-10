import CongaSound from '../sounds/CongaSound-4.wav';
import MenuMusic from '../sounds/JungleMenu.wav';
import IntroMusic from '../sounds/TeamLogo.wav';
import { AUDIO_MOVE_PIECE, AUDIO_UPDATE_DATA } from './types';


export const stopMusic = () => {
    return (dispatch, getState) => {
        const { soundOn } = getState().audio;
        if(soundOn)
        {
            dispatch(updateAudioData('musicUrl', null));
        }
    }
};

export const playMenuSound = () => {
    
    return (dispatch, getState) => {
        const { soundOn } = getState().audio;
        if(soundOn)
        {
            dispatch(updateAudioData('musicUrl', MenuMusic));
        }
    }
}

export const playIntroSound = () => {
    
    return (dispatch, getState) => {
        const { soundOn } = getState().audio;

        if(soundOn)
        {
            dispatch(updateAudioData('musicUrl', IntroMusic));
        }
    }
}

export const playButtonSound = () => {
    return (dispatch, getState) => {
        const { soundOn } = getState().audio;

        if(soundOn)
        {
            let audio = new Audio(CongaSound);
            audio.play();
        }
    }
};

export const moveSound = () => {
    return{
        type:AUDIO_MOVE_PIECE
    }
}

export const muteMusic = () => {
    return (dispatch, getState) => {
        const { musicOn } = getState().audio;
        let musicOpposite = !musicOn;
        dispatch(updateAudioData('musicOn', musicOpposite));
    }
}

export const muteSound = () => { 
    return (dispatch, getState) => {
        const { soundOn } = getState().audio;
        let soundOpposite = !soundOn;
        dispatch(updateAudioData('soundOn', soundOpposite));
    }
}

export const changeSong = (url) => {
    return (dispatch) => {
       dispatch(updateAudioData('musicUrl', url));
    }
}

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
