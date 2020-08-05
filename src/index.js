import React from 'react';

import fastClickCopy from './constants/react-fast-click-copy'; // temp* copied from repo cuz import probs

import ReactDOM from 'react-dom';
import 'normalize.css';

import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

fastClickCopy();

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
