import { AUDIO_UPDATE_DATA, AUDIO_PLAY_MENU_SOUND, AUDIO_MOVE_PIECE, AUDIO_MUTE_SOUND, AUDIO_MUTE_MUSIC, AUDIO_INTRO_SOUND} from './types';
import CongaSound from '../sounds/CongaSound-4.wav';


export const playMenuSound = () => {
    
    return (dispatch, getState) => {
        const { soundOn } = getState().audio;
        if(soundOn)
        {
            dispatch(updateAudioData('soundUrl', '../sounds/CongaSound-4.wav'));
            console.log("Played CongaSound-4.wav");
        }
    }
}

export const playIntroSound = () => {
    
    return (dispatch, getState) => {
        const { soundOn } = getState().audio;

        if(soundOn)
        {
            dispatch(updateAudioData('soundUrl', '../sounds/TeamLogo.wav'));
            console.log("Played TeamLogo.wav");
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
