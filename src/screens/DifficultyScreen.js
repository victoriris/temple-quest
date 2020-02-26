import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn } from 'semantic-ui-react';
import BackButton from '../components/BackButton';
import history from '../history';


class DifficultyScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
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
                       <BackButton />
                    </GridColumn>
            </Grid>
        );
    }
}

export default DifficultyScreen;