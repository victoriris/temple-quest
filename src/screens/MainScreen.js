import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';
import GameLogo from '../img/gameLogo.svg';
import { menuClick } from '../helpers';



class MainScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

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
                            onClick={() => {this.handleClick('mode'); menuClick()}}>
                                PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => {this.handleClick('mode'); menuClick()}}>
                                HOW TO PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="left" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('mode'); menuClick()}}>
                                SETTINGS
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="left" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('mode'); menuClick()}}>
                                ABOUT
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button   floated="right" 
                             color="black" size="massive"
                             onClick={() => {this.handleClick('mode'); menuClick()}}>
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