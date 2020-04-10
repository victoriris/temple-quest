import React, { Component } from 'react';
import { Checkbox, Container, Grid, GridColumn, GridRow, Segment } from 'semantic-ui-react';
import history from '../history';
import MenuButton from '../components/MenuButton';
import { connect } from 'react-redux';
import { muteSound, muteMusic } from '../actions';


class SettingsScreen extends Component{
    handleClick = (route) => history.push(route);

    handleMuteMusicClick(){
        this.props.muteMusic();
    }

    handleMuteSoundClick(){
        this.props.muteSound();
    }

    render() {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container className="screen__box">
                        <Segment.Group class="settingsGroup">
                            <Segment compact>
                                <Checkbox toggle label="Mute Music" onChange={() => this.handleMuteMusicClick()}/>
                            </Segment>
                            <Segment compact>
                                <Checkbox toggle label="Mute Sound" onChange={() => this.handleMuteSoundClick()}/>
                            </Segment>
                        </Segment.Group>
                    </Container>
                   <MenuButton back />
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
}

const mapStateToProps = ({ audio }) => {
    const { musicOn, soundOn} = audio;
    return { musicOn, soundOn};
};

export default connect(mapStateToProps, { 
    muteSound, muteMusic
})(SettingsScreen);

//export default SettingsScreen;