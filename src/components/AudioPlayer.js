import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';


class AudioPlayer extends Component {
    render() {
        const {musicOn, musicUrl, soundOn, soundUrl} = this.props;
        return (
            <>
                <ReactPlayer id="musicPlayer" loop 
                volume 
                height={0} 
                playing={musicOn} 
                width={0} url={musicUrl}/>
                <ReactPlayer id="soundPlayer" 
                volume 
                height={0} 
                playing={soundOn} 
                width={0} url={soundUrl}/>
            </>
        )
    }
}

const mapStateToProps = ({ audio }) => {
    const { musicUrl, soundUrl, musicOn, soundOn} = audio;
    return { musicUrl, soundUrl, musicOn, soundOn};
};

export default connect(mapStateToProps, { 
})(AudioPlayer);