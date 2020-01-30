import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    reducers, {}, 
    applyMiddleware(ReduxThunk)
);

render(
        <Routes />
    document.getElementById('root')
);

// Service worker
serviceWorker.unregister();
