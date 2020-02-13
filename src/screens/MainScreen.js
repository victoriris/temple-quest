import React, { Component } from 'react';

class MainScreen extends Component {
    render () {
        return(
            <div className="MainScreen">
                <button name="playButton">PLAY</button>
                <button name="learnButton">LEARN TO PLAY</button>
                <button name="aboutButton">ABOUT</button>
                <button name="exitButton">Exit</button>
            </div>
        );
    }
}