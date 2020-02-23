import React, { Component } from 'react';
import history from '../history';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import jungleMainMenu from '../img/mainMenuBackground.mp4';


class TutorialScreen extends Component{
    render() {
        return(
            <Grid stretched className="tutorialScreen" padded centered columns={3}>
            <video id="jungleVideoMainMenu" src={jungleMainMenu} type="video/mp4" autoPlay muted loop />                
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container
                    className="howToPlay">
                                      <h1>How To Play</h1>
                <p>Quarto is an abstract strategy game with 16 different pieces, each with
                    a different set of four characteristics:
                </p>
                <h2>Height, color, shape, and surface.</h2>
                <p>
                    The goal of the game is to complete a row of 4 pieces
                    with 1 characteristic in common. It doesn't matter who placed the other 3 pieces,
                    the winner is the player that placed the last piece.
                    Players will take turns placing pieces on the board. The catch is, 
                    the opponent picks the current player's piece.
                </p>
                <h2>Tips:</h2>
                <ul>
                <li>Try to check the board for each different characteristic. Sometimes you may be 
                    watching for 3 different characteristics, but one might go unnoticed. </li>
                    <p></p>
                    <li>Once a row of 3 pieces has been placed, the next turn could win the game.
                         Pay close attention to that last spot and what could win there.</li>                    
                </ul>
                    </Container>
                    <Container className="mainScreen__option">
                        <Button color="black" size="massive"
                        onClick={() => history.goBack()}>
                            BACK
                        </Button>
                    </Container>
                </GridColumn>
            </GridRow>
        </Grid>
            // <div className="learnToPlay">
                // <h1>WELCOME TO QUARTO</h1>
                // <p>Quarto is an abstract strategy game with 16 different piecces, each with
                //     a different set of four characteristics
                // </p>
                // <h3>Height: There are both short and tall pieces</h3>
                // {/*Insert graphic of the side of both a short and a tall piece, same color and shape*/}
                // <h3>Color: There are both darka dn light pieces</h3>
                // {/*Insert a graphic of the side of both a dark piece and a light piece, same height and shape*/}
                // <h3>Shape: There are both square and round pieces</h3>
                // {/*Insert a graphic of the top of both a square piece and a round piece, same color*/}
                // <h3>Surface: There are both diveted and flat pieces</h3>
                // {/*Insert a graphic of the top of both a diveted piece and a flat piece, same color*/}
                // <p></p>
                // <h2>Rules</h2>
                // <p>Each turn a player will give the other playera  piece. That player will then place on the board wherever they like.
                //     The roles then reverse.
                // </p>
                // <h2>Goal</h2>
                // <p>A palyer wins a game of Quarto when they place a piece and create a 4-in-a-row of any of the 4 same piece characteristics</p>
                // {/*Insert a top down graphic of the board with a win taking place diagonally, horizontally, and vertically. Preferably with the winning row highlighted*/}
                // <p></p>
                // <p></p>
            //     <Button name="backButton" color="black"
            //     onClick={() => history.goBack()}>
            //         BACK
            //     </Button>
            // </div>
        );
    }
}

export default TutorialScreen;