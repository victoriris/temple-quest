import React, {Component} from 'react';
import jungleAudioMainMenu from '../sounds/JungleMenu.wav';
import { connect } from 'react-redux';

class Audio extends Component {


    render () {
        return (
            <audio id="jungleAudioMainMenu" 
            src={jungleAudioMainMenu} 
            type="audio/mp4" 
            autoPlay loop /> 
        );
    }
};

export default connect(null)(Audio);