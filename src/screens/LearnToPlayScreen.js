import React, { Component } from 'react';

class LearnToPlayScreen extends Component{
    render() {
        return(
            <div className="learnToPlay">
                <h1>WELCOME TO QUARTO</h1>
                <p>Quarto is an abstract strategy game with 16 different piecces, each with
                    a different set of four characteristics
                </p>
                <h3>Height: There are both short and tall pieces</h3>
                {/*Insert graphic of the side of both a short and a tall piece, same color and shape*/}
                <h3>Color: There are both darka dn light pieces</h3>
                {/*Insert a graphic of the side of both a dark piece and a light piece, same height and shape*/}
                <h3>Shape: There are both square and round pieces</h3>
                {/*Insert a graphic of the top of both a square piece and a round piece, same color*/}
                <h3>Surface: There are both diveted and flat pieces</h3>
                {/*Insert a graphic of the top of both a diveted piece and a flat piece, same color*/}
                <p></p>
                <h2>Rules</h2>
                <p>Each turn a player will give the other playera  piece. That player will then place on the board wherever they like.
                    The roles then reverse.
                </p>
                <h2>Goal</h2>
                <p>A palyer wins a game of Quarto when they place a piece and create a 4-in-a-row of any of the 4 same piece characteristics</p>
                {/*Insert a top down graphic of the board with a win taking place diagonally, horizontally, and vertically. Preferably with the winning row highlighted*/}
                <p></p>
                <p></p>
                <button name="backButton">BACK</button>
            </div>
        );
    }
}