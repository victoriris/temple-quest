
import CongaSound from '../sounds/CongaSound-4.wav';
import IntroSound from '../sounds/staticRadio1.wav';

export function menuClick()
{
    //console.log("Made it into function");
    var audio = new Audio(CongaSound);
    audio.play();
}

export function teamLogoSound()
{
    var audio = new Audio(IntroSound);
    audio.play();
}

