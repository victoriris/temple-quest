import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';
import jungleMainMenu from '../img/mainMenuBackground.mp4';

class GameModeScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="choiceScreen" padded centered columns={3}>
                <video id="jungleVideoMainMenu" src={jungleMainMenu} type="video/mp4" autoPlay muted loop />                
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container
                        className="mainScreen__option">
                            <Button size="massive" color="black"
                            onClick={() => this.handleClick('game')}>
                                SINGLEPLAYER
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button size="massive" color="black"
                            onClick={() => this.handleClick('online')}>
                                ONLINE
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button size="massive" color="black"
                            onClick={() => this.handleClick('local')}>
                                LOCAL MULTIPLAYER
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button size="massive" color="black"
                            onClick={() => history.goBack()}>
                                BACK
                            </Button>
                        </Container>
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default GameModeScreen;