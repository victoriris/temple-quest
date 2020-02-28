import React, {Component} from 'react';
import jungleMenuMusic from '../sounds/JungleMenu.wav';
import { connect } from 'react-redux';

class Audio extends Component{
    

    render() { 
        return (
            <audio id="JungleMenuAudio" 
            src={jungleMenuMusic} 
            type="audio/wav" 
            autoPlay loop /> 
        );
    }
};

export default connect(null)(Audio);