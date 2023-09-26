import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux'

import '../src/statics/styles/css/app.css';
import '../src/statics/styles/css/index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>, document.getElementById('root')
);

serviceWorker.register();

