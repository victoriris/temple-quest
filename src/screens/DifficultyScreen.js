import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import MenuButton from '../components/MenuButton';
import history from '../history';


class DifficultyScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
                    <GridColumn verticalAlign="middle">
                        <MenuButton title="easy"
                        onClick={() => this.handleClick('board')} />
                        <MenuButton title="medium"
                        onClick={() => this.handleClick('board')} />
                        <MenuButton title="hard"
                        onClick={() => this.handleClick('board')} />
                       <MenuButton back/>
                    </GridColumn>
            </Grid>
        );
    }
}

export default DifficultyScreen;