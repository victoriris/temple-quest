import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';
import BackButton from '../components/BackButton';
import { menuClick } from '../helpers';

class GameModeScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('difficulty'); menuClick()}}>
                                SINGLEPLAYER
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('online'); menuClick()}}>
                                ONLINE
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('local'); menuClick()}}>
                                LOCAL MULTIPLAYER
                            </Button>
                        </Container>
                        <BackButton />
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default GameModeScreen;