import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MenuButton from '../components/MenuButton';
import history from '../history';
import { updateBoardData } from '../actions';


class DifficultyScreen extends Component {

    handleClick(level) {
        this.props.updateBoardData('difficultyLevel', level);
        history.push('board');
    }

    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
                    <GridColumn verticalAlign="middle">
                        <MenuButton title="easy"
                        onClick={() => this.handleClick(0)} />
                        <MenuButton title="medium"
                        onClick={() => this.handleClick(1)} />
                        <MenuButton title="hard"
                        onClick={() => this.handleClick(2)} />
                       <MenuButton back/>
                    </GridColumn>
            </Grid>
        );
    }
}

export default connect(null, {
    updateBoardData
})(DifficultyScreen);