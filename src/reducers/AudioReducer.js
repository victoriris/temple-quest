import { AUDIO_UPDATE_DATA, AUDIO_MUTE_SOUND, AUDIO_MUTE_MUSIC, AUDIO_INTRO_SOUND, BOARD_PLACE_PIECE, BOARD_PICK_PIECE } from "../actions/types";
import stoneSound from '../assets/sounds/stone.wav';


const INITIAL_STATE = {
    musicOn: true,
    musicUrl: null,
    playingSound: false,
    soundOn: true,
    soundUrl: null,
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {

        case AUDIO_UPDATE_DATA: {
            return { ...state, [payload.prop]: payload.value };
        }

        case BOARD_PICK_PIECE: {
            return { ...state,  soundUrl: stoneSound, playingSound: true };
        }

        case BOARD_PLACE_PIECE: {
            return { ...state,  soundUrl: stoneSound, playingSound: true };
        }
        
        case AUDIO_MUTE_MUSIC:
            let newMusicOn = !state.musicOn;
            return { ...state, musicOn: newMusicOn };

        case AUDIO_MUTE_SOUND:
            let newSoundOn = !state.soundOn;
            return { ...state, soundOn: newSoundOn };

        case AUDIO_INTRO_SOUND:
            return state;

        default:
            return state;

    }
}
