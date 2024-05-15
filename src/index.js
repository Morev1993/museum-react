import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// ie
import 'polyfill-array-includes';
import 'string-includes-polyfill';
import 'whatwg-fetch';
import "ie-array-find-polyfill";
import "array-findindex-polyfill";

require('es6-promise/auto');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
