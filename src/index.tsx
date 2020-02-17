import React from 'react';
import ReactDOM from 'react-dom';

import "./css/common.css";
import './css/index.css';

import App from './App';
import FirebaseContextProvider from "./firebaseContext";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <FirebaseContextProvider>
        <App />
    </FirebaseContextProvider>
    ,
    document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
