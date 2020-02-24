import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';


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
                            onClick={() => this.handleClick('difficulty')}>
                                SINGLEPLAYER
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('online')}>
                                ONLINE
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('local')}>
                                LOCAL MULTIPLAYER
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button
                            icon="left arrow" labelPosition="left"
                            color="black" size="massive"
                            onClick={() => history.goBack()} content="Back" />
                        </Container>
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default GameModeScreen;