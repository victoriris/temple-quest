import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';
import jungleMainMenu from '../img/mainMenuBackground.mp4';

class LocalSetupScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="choiceScreen" padded centered columns={3}>
                <video id="jungleVideoMainMenu" src={jungleMainMenu} type="video/mp4" autoPlay muted loop />                
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container className="playerChoice">
                            <h2>Who goes first?</h2>
                        </Container>
                        <Container className="mainScreen__option">
                            <Button.Group class="btnSwitch">
                            <Button color="red" class="btnSwitch">Player 1</Button>
                            <Button.Or />
                            <Button color="blue" class="btnSwitch">Player 2</Button>
                            </Button.Group>
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

export default LocalSetupScreen;