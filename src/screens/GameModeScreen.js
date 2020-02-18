import React, { Component } from 'react';


class GameModeScreen extends Component{
    render() {
        return (
            <div className="playScreen">
                <button name="localButton">LOCAL</button>
                <button name="onlineButton">ONLINE</button>
                <p></p>
                <p></p>
                <button name="backButton">BACK</button>
            </div>
        );
    }
}

export default GameModeScreen;