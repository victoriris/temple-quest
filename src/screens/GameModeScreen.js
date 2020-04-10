import React, { Component } from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import MenuButton from '../components/MenuButton';
import history from '../history';

class GameModeScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <MenuButton title="singleplayer"  
                        onClick={() => this.handleClick('difficulty')}/>
                        <MenuButton title="multiplayer"  
                        onClick={() => this.handleClick('local')}/>
                        <MenuButton title="online"  
                        onClick={() => this.handleClick('online')}/>
                        <MenuButton back />
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default GameModeScreen;