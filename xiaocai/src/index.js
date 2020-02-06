import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

import axios from "axios";
import * as serviceWorker from './serviceWorker';
import AppRouter from './AppRouter'
import store from './store'
import { Provider } from 'react-redux'
React.Component.prototype.axios = axios;

ReactDOM.render(<Provider store={store}>< AppRouter /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();