import { AUDIO_UPDATE_DATA, AUDIO_MUTE_SOUND, AUDIO_MUTE_MUSIC, BOARD_PLACE_PIECE, BOARD_PICK_PIECE, BOARD_RESET_GAME, AUDIO_PLAY_SOUND } from "../actions/types";
import stoneSound from '../assets/sounds/stone.wav';
import stonePickSound from '../assets/sounds/stone-pick.wav';


const INITIAL_STATE = {
    musicOn: true,
    musicVolume: 100,
    soundVolume: 100,
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

        case AUDIO_PLAY_SOUND: {
            return { ...state,  
                soundUrl: payload, 
                playingSound: true ,
            };
        }

        case BOARD_PICK_PIECE: {
            return { ...state,  soundUrl: stonePickSound, playingSound: true };
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

        default:
            return state;

    }
}
