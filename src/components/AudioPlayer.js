import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { updateAudioData } from '../actions';

class AudioPlayer extends Component {
    render() {
        const {musicOn, musicUrl, soundOn, soundUrl, playingSound} = this.props;
        return (
            <>
                <ReactPlayer id="musicPlayer" 
                loop 
                volume 
                height={0} 
                muted={!musicOn}
                width={0} url={musicUrl}/>
                <ReactPlayer id="soundPlayer" 
                volume 
                height={0} 
                muted={!soundOn} 
                playing={playingSound}
                onEnded={() => this.props.updateAudioData('playingSound', false)}
                width={0} url={soundUrl}/>
            </>
        )
    }
}

const mapStateToProps = ({ audio }) => {
    const { musicUrl, soundUrl, musicOn, soundOn, playingSound } = audio;
    return { musicUrl, soundUrl, musicOn, soundOn, playingSound };
};

export default connect(mapStateToProps, { 
    updateAudioData
})(AudioPlayer);