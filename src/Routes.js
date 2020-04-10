import React from 'react';
import { Route, Router } from 'react-router-dom';
import history from './history';
import AboutScreen from './screens/AboutScreen';
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
import AudioPlayer from './components/AudioPlayer';


const Routes = () => {

    return (
      <Router history={history}>
          <BackgroundVideo />
          <AudioPlayer />
          <Route path="/" component={IntroScreen} exact/>
          <Route path="/menu" component={MainScreen}/>
          <Route path="/mode" component={GameModeScreen}/>
          <Route path="/local" component={LocalSetupScreen}/>
          <Route path="/online" component={OnlineSetupScreen}/>
          <Route path="/play" component={GameModeScreen}/>
          <Route path="/board" component={GameScreen}/>
          <Route path="/about" component={AboutScreen}/>
          <Route path="/tutorial" component={TutorialScreen}/>
          <Route path="/game" component={GameScreen}/>
          <Route path="/connectionLost" component={ConnectionLost}/>
          <Route path="/settings" component={SettingsScreen}/>
          <Route path="/difficulty" component={DifficultyScreen}/>
      </Router>
    );
    
}


export default Routes; 
