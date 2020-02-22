import React from 'react';
import { Router, Route } from 'react-router-dom';
import IntroScreen from './screens/IntroScreen';
import GameScreen from './screens/GameScreen';
import history from './history';
import BoardScreen from './screens/BoardScreen';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';
import TutorialScreen from './screens/TutorialScreen';
import GameModeScreen from './screens/GameModeScreen';
import OnlineSetupScreen from './screens/OnlineSetupScreen';
import LocalSetupScreen from './screens/LocalSetupScreen';
import DifficultyScreen from './screens/DifficultyScreen';
import ConnectionLost from './screens/ConnectionLost';

const Routes = () => {

    return (
      <Router history={history}>
          <Route path="/" component={IntroScreen} exact/>
          <Route path="/menu" component={MainScreen}/>
          <Route path="/mode" component={DifficultyScreen}/>
          <Route path="/local" component={LocalSetupScreen}/>
          <Route path="/online" component={OnlineSetupScreen}/>
          <Route path="/play" component={GameModeScreen}/>
          <Route path="/board" component={BoardScreen}/>
          <Route path="/about" component={AboutScreen}/>
          <Route path="/tutorial" component={TutorialScreen}/>
          <Route path="/game" component={GameScreen}/>
          <Route path="/connectionLost" component={ConnectionLost}/>
      </Router>
    );
    
}

export default Routes;
