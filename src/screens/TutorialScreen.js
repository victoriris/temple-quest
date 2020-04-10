import React, { Component } from 'react';
import MenuButton from '../components/MenuButton';
import { Container, Grid, GridColumn } from 'semantic-ui-react';


class TutorialScreen extends Component{
    render() {
        return(
            <Grid className="screen" 
            stretched padded centered>
                <GridColumn verticalAlign="middle"
                mobile={16} tablet={8} computer={10}>
                    <Container
                    textAlign="center"
                    className="screen__box">
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
                    <MenuButton back />
                </GridColumn>
        </Grid>
        );
    }
}

export default TutorialScreen;