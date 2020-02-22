import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';
import jungleMainMenu from '../img/mainMenuBackground.mp4';

class MainScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="mainScreen" padded centered columns={3}>
                <video id="jungleVideoMainMenu" src={jungleMainMenu} type="video/mp4" autoPlay muted loop />                
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('play')}>
                                PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('tutorial')}>
                                HOW TO PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="left" 
                             color="black" size="massive"
                            onClick={() => this.handleClick('about')}>
                                ABOUT
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="right" 
                             color="black" size="massive"
                            onClick={() => this.handleExit()}>
                                EXIT
                            </Button>
                        </Container>
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default MainScreen;