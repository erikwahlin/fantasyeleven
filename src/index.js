import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

import { MongoClient } from 'mongodb';

import { format } from 'util';

/*
 * MONGO TEST TEMP
 */
//import assert from 'assert';
var user = encodeURIComponent(process.env.REACT_APP_MONGO_USER);
var password = encodeURIComponent(process.env.REACT_APP_MONGO_PWS);
var host = encodeURIComponent(process.env.REACT_APP_MONGO_HOST);
var port = encodeURIComponent(process.env.REACT_APP_MONGO_PORT);
var authMechanism = 'DEFAULT';

// Connection URL
var uri = format(
	'mongodb+srv://%s:%s@%s:%s/test?retryWrites=true&w=majority',
	user,
	password,
	host,
	port,
	authMechanism
);

//const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
	if (err) {
		console.log('mongo err', err);
	}

	// ??? const collection = client.db('test').collection('devices');
	client.close();
});

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
