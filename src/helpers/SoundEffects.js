
import CongaSound from '../sounds/CongaSound-4.wav';
import IntroSound from '../sounds/staticRadio.wav';

export function menuClick()
{
    //console.log("Made it into function");
    var audio = new Audio(CongaSound);
    audio.play();
}

export function introSound()
{
    var audio = new Audio(IntroSound);
    audio.play();
}

