import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import IntroScreen from './screens/IntroScreen';


const Routes = () => {

    return (
      <Router>
          <Switch>
            <Route path="/">
                <Route path="/" component={IntroScreen} exact/>
            </Route>
          </Switch>
      </Router>
    );
    
}

export default Routes;
