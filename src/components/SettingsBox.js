import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import Slider from 'react-rangeslider';
import { connect } from 'react-redux';
import { updateAudioData } from '../actions';


function SettingsBox(props) {
    const setVolume = (type, value) => props.updateAudioData(`${type}Volume`, value);
    const { musicVolume, soundVolume } = props;
    return (
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
                    onChange={(value) => setVolume('music', value)}
                    />
                </div>
                <div>
                    Sound Volume
                    <Slider
                    min={0}
                    max={100}
                    value={soundVolume}
                    onChange={(value) => setVolume('sound', value)}
                    />
                </div>
            </Segment>
        </Segment.Group>
    )
}


const mapStateToProps = ({ audio }) => {
    const { musicOn, soundOn, musicVolume, soundVolume} = audio;
    return { musicOn, soundOn, musicVolume, soundVolume};
};

export default connect(mapStateToProps, { 
    updateAudioData
})(SettingsBox);


