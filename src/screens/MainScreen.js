import React, { Component } from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import MenuButton from '../components/MenuButton';
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
                        <MenuButton title='play'
                        onClick={() => this.handleClick('mode')}/>
                        <MenuButton title='how to play'
                        onClick={() => this.handleClick('tutorial')}/>
                        <MenuButton title='settings'
                        onClick={() => this.handleClick('settings')}/>
                        <MenuButton title='about'
                        onClick={() => this.handleClick('about')}/>
                        <MenuButton title='exit'
                        onClick={() => this.handleExit()}/>
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default MainScreen;