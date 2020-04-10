import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';
import GameLogo from '../img/gameLogo.svg';
//import ReactPlayer from 'react-player';
//import JungleMenu from '../sounds/JungleMenu.wav'
import { playMenuSound } from '../actions';




class MainScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    //handleMenuSound = () => {
    //    this.props.playMenuSound();
    //}

    render () {
        return(
            <Grid stretched className="mainScreen" padded centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <div className="mainScreen__logo" >
                            <img src={GameLogo} alt=""/>
                        </div>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('mode'); playMenuSound()}}>
                                PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('tutorial'); playMenuSound()}}>
                                HOW TO PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="left" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('settings'); playMenuSound()}}>
                                SETTINGS
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="left" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('about'); playMenuSound()}}>
                                ABOUT
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="right" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('menu'); playMenuSound()}}>
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