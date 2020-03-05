import { AUDIO_UPDATE_DATA, AUDIO_PLAY_MENU_SOUND, AUDIO_MOVE_PIECE, AUDIO_MUTE_SOUND, AUDIO_MUTE_MUSIC} from "../actions/types";
import {musicUrl} from '../helpers/SoundEffects';
//import { Action } from "babylonjs";

const INITIAL_STATE = {
    loading: true,
    soundOn: true,                //will be used to mute sound
    musicOn: true,                //will be used to mute music
    musicUrl: musicUrl,

}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        //case AUDIO_INIT:
            //return {};

        case AUDIO_UPDATE_DATA: {
            return { ...state, [payload.prop]: payload.value };
        }

        case AUDIO_PLAY_MENU_SOUND: {
            if(state.soundOn)
                return;
            else
                return state;
        }
        
        case AUDIO_MOVE_PIECE:{
            if(state.soundOn)
                return;
            else
                return state;
        }
        
        case AUDIO_MUTE_MUSIC:
            let newMusicOn = !state.musicOn;
            return { ...state, musicOn: newMusicOn };

        case AUDIO_MUTE_SOUND:
            let newSoundOn = !state.soundOn;
            return { ...state, soundOn: newSoundOn };


        default:
            return state;

    }
}
