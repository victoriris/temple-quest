import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Container, Grid, GridColumn, GridRow, Header, Icon, Segment } from 'semantic-ui-react';
import { muteMusic, muteSound } from '../actions';
import MenuButton from '../components/MenuButton';
import history from '../history';


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
                    <Container>
                        <Segment.Group class="settingsGroup" 
                        raised>
                            <Segment>
                                <Header as='h3' 
                                dividing
                                textAlign="center">
                                    <Icon name="music" />
                                    Audio
                                </Header>
                                <Grid columns="2">
                                    <Grid.Column>
                                        <Checkbox toggle
                                        label="Mute Music" 
                                        checked={!this.props.musicOn}
                                        onChange={() => this.handleMuteMusicClick()}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Checkbox toggle 
                                        checked={!this.props.soundOn}
                                        label="Mute Sound" 
                                        onChange={() => this.handleMuteSoundClick()}/>
                                    </Grid.Column>
                                </Grid>
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
