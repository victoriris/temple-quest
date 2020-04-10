
import CongaSound from '../sounds/CongaSound-4.wav';

export function menuClick()
{
    //console.log("Made it into function");
    var audio = new Audio(CongaSound);
    audio.play();
}

export var musicUrl = '../sounds/JungleMenu.wav';
export var soundUrl = '../sounds/TeamLogo.wav';

