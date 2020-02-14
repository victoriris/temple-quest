import React, { Component } from 'react';


class LocalSetupScreen extends Component{
    render() {
        return(
            <div className="localScreen">
                <h2>SELECT DIFFICULTY</h2>
                <input type="radio" name="difficulty" value="beginner">BEGINNER</input>
                <input type="radio" name="difficulty" value="expert">EXPERT</input>
                <h2>WHO GOES FIRST?</h2>
                <input type="radio" name="turnOrder" value="player">PLAYER GOES FIRST</input>
                <input type="radio" name="turnOrder" value="computer">COMPUTER GOES FIRST</input>
                <p></p>
                <p></p>
                <button name="backButton">BACK</button>
            </div>
        );
    }
}

export default LocalSetupScreen;