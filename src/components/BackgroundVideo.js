import React, {Component} from 'react';
import jungleMainMenu from '../assets/img/bgvideo.mp4';
import { connect } from 'react-redux';

class BackgroundVideo extends Component {


    render () {
        return (
            <video id="jungleVideoMainMenu" 
            src={jungleMainMenu} 
            type="video/mp4" 
            autoPlay muted loop /> 
        );
    }
};

export default connect(null)(BackgroundVideo);