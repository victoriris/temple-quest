import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';


class DifficultyScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="choiceScreen" padded centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('board')}>
                                EASY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('board')}>
                                MEDUIM
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('board')}>
                                HARD
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
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

export default DifficultyScreen;