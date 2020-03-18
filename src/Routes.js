import React from 'react';
import { Route, Router } from 'react-router-dom';
import history from './history';
import AboutScreen from './screens/AboutScreen';
import BoardScreen from './screens/BoardScreen';
import ConnectionLost from './screens/ConnectionLost';
import DifficultyScreen from './screens/DifficultyScreen';
import GameModeScreen from './screens/GameModeScreen';
import GameScreen from './screens/GameScreen';
import IntroScreen from './screens/IntroScreen';
import LocalSetupScreen from './screens/LocalSetupScreen';
import MainScreen from './screens/MainScreen';
import OnlineSetupScreen from './screens/OnlineSetupScreen';
import SettingsScreen from './screens/SettingsScreen';
import TutorialScreen from './screens/TutorialScreen';
import BackgroundVideo from './components/BackgroundVideo';
import { playMenuSound, playIntroSound, muteMusic, muteSound } from './actions';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';


const Routes = (props) => {

    return (
      <Router history={history}>
          <BackgroundVideo />
          <ReactPlayer id="musicPlayer" loop volume height={0} playing={props.musicOn} width={0} url={props.musicUrl}/>
          <ReactPlayer id="soundPlayer" volume playing={props.soundOn} height={0} width={0} url={props.soundUrl}/>
          <Route path="/" component={IntroScreen} exact/>
          <Route path="/menu" component={MainScreen}/>
          <Route path="/mode" component={GameModeScreen}/>
          <Route path="/local" component={LocalSetupScreen}/>
          <Route path="/online" component={OnlineSetupScreen}/>
          <Route path="/play" component={GameModeScreen}/>
          <Route path="/board" component={BoardScreen}/>
          <Route path="/about" component={AboutScreen}/>
          <Route path="/tutorial" component={TutorialScreen}/>
          <Route path="/game" component={GameScreen}/>
          <Route path="/connectionLost" component={ConnectionLost}/>
          <Route path="/settings" component={SettingsScreen}/>
          <Route path="/difficulty" component={DifficultyScreen}/>
      </Router>
    );
    
}

const mapStateToProps = ({ audio }) => {
  const { musicUrl, soundUrl, musicOn, soundOn} = audio;
  return { musicUrl, soundUrl, musicOn, soundOn};
};

export default connect(mapStateToProps, { 
  playMenuSound, playIntroSound, muteMusic, muteSound
})(Routes); 

//export default Routes;
