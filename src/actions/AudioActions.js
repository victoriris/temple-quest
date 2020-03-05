import { AUDIO_UPDATE_DATA, AUDIO_PLAY_MENU_SOUND, AUDIO_MOVE_PIECE, AUDIO_MUTE_SOUND, AUDIO_MUTE_MUSIC} from './types';



export const playMenuSound = () => {
    return{
        type:AUDIO_PLAY_MENU_SOUND
    }
}

export const movePiece = () => {
    return{
        type:AUDIO_MOVE_PIECE
    }
}

export const muteMusic = () => {
    return{
        type: AUDIO_MUTE_MUSIC
    }
}

export const muteSound = () => { 
    return{
        type: AUDIO_MUTE_SOUND
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
