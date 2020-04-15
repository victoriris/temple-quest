import React, { Component } from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import MenuButton from '../components/MenuButton';
import history from '../history';
import GameLogo from '../assets/img/gameLogo.svg';
import { playMenuSound } from '../actions';
import { connect } from 'react-redux';


class MainScreen extends Component {

    handleClick = (route) => history.push(route);

    componentDidMount() {
        this.props.playMenuSound();
    }

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
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default connect(null, {
    playMenuSound
})(MainScreen);