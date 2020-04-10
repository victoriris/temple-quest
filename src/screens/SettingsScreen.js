import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import { connect } from 'react-redux';
import { Container, Grid, GridColumn, GridRow, Header, Icon, Segment } from 'semantic-ui-react';
import { muteMusic, muteSound, updateAudioData } from '../actions';
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

    setVolume = (type, value) => this.props.updateAudioData(`${type}Volume`, value);

    render() {
        const { musicVolume, soundVolume } = this.props;
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
                                <div>
                                    Music Volume
                                    <Slider
                                    min={0}
                                    max={100}
                                    value={musicVolume}
                                    onChange={(value) => this.setVolume('music', value)}
                                    />
                                </div>
                                <div>
                                    Sound Volume
                                    <Slider
                                    min={0}
                                    max={100}
                                    value={soundVolume}
                                    onChange={(value) => this.setVolume('sound', value)}
                                    />
                                </div>
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
    const { musicOn, soundOn, musicVolume, soundVolume} = audio;
    return { musicOn, soundOn, musicVolume, soundVolume};
};

export default connect(mapStateToProps, { 
    muteSound, muteMusic, updateAudioData
})(SettingsScreen);
