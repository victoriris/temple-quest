import React from 'react';
import { Router, Route } from 'react-router-dom';
import IntroScreen from './screens/IntroScreen';
import GameScreen from './screens/GameScreen';
import history from './history';
import BoardScreen from './screens/BoardScreen';
import MainScreen from './screens/MainScreen';

const Routes = () => {

    return (
      <Router history={history}>
          <Route path="/" component={IntroScreen} exact/>
          <Route path="/mainScreen" component={MainScreen}/>
          <Route path="/gameScreen" component={GameScreen}/>
          <Route path="/boardScreen" component={BoardScreen}/>
      </Router>
    );
    
}

export default Routes;
