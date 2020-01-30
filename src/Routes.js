import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';


const Routes = () => {

    return (
      <Router>
          <Switch>
            <Route path="/">
                <Route path="/" component={App} exact/>
            </Route>
          </Switch>
      </Router>
    );
    
}

export default Routes;
