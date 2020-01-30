import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import IntroScreen from './screens/IntroScreen';
import GameScreen from './screens/GameScreen';
import history from './history';

const Routes = () => {

    return (
      <Router history={history}>
          <Route path="/" component={IntroScreen} exact/>
          <Route path="/gameScreen" component={GameScreen}/>
      </Router>
    );
    
}

export default Routes;
