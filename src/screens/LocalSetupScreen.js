import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Grid, GridColumn, Header, Input, Segment } from 'semantic-ui-react';
import { launchMultiplayer, updateBoardData } from '../actions';
import MenuButton from '../components/MenuButton';

class LocalSetupScreen extends Component {

    handleClick = () => this.props.launchMultiplayer();
    handleInputChange = (playerNum,value) => this.props.updateBoardData(`player${playerNum}`, value);
    handleExit = () => {};

    render () {
        const {playerTwo, playerOne} = this.props;
        console.log(playerOne.length && playerTwo.length);
        return(
            <Grid stretched className="screen" padded centered columns={3}>
                <GridColumn verticalAlign="middle"
                mobile={16} tablet={8} computer={6}
                >
                    <Container>
                        <Segment raised>
                            <Header as="h3" textAlign="center" dividing>
                                Who are the players?
                            </Header>
                            <Input fluid
                            size="massive"
                            placeholder="Player one" >
                                <input onChange={({target: {value}}) => this.handleInputChange('One', value)}
                                value={playerOne}/>
                            </Input>
                            <Divider />
                            <Input fluid
                            size="massive"
                            placeholder="Player two" >
                                <input onChange={({target: {value}}) => this.handleInputChange('Two', value)}
                                value={playerTwo}/>
                            </Input>
                        </Segment>
                        </Container>
                    <MenuButton title="Start" 
                    hide={!playerOne.length || !playerTwo.length}
                    onClick={() => {this.handleClick('game')}}/>
                    <MenuButton back/>
                </GridColumn>
            </Grid>
        );
    }
}

const mapStateToProps = ({ board }) => {
    const { playerOne, playerTwo } = board;
    return { playerOne, playerTwo };
};

export default connect (mapStateToProps, {
    launchMultiplayer, updateBoardData
})(LocalSetupScreen);