import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';
import GameLogo from '../img/gameLogo.svg';
import { menuClick, menuSound } from '../helpers';
import ReactPlayer from 'react-player';
import JungleMenu from '../sounds/JungleMenu.wav'


class MainScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="mainScreen" padded centered columns={3}>
                <ReactPlayer playing loop height={0} width={0}
                url={JungleMenu}
                />
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <div className="mainScreen__logo" >
                            <img src={GameLogo} alt=""/>
                        </div>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('mode'); menuClick()}}>
                                PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('tutorial'); menuClick()}}>
                                HOW TO PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="left" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('settings'); menuClick()}}>
                                SETTINGS
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="left" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('about'); menuClick()}}>
                                ABOUT
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="right" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('menu'); menuClick()}}>
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