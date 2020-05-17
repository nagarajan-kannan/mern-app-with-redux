import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as networkWorker from './helpers/index';
import { AppReducer } from './reducer/app.reducer';
import * as serviceWorker from './serviceWorker';
import { Router } from './router';
import './index.scss';

networkWorker.setupInterceptors();

const store = createStore(AppReducer);

// Render the router in DOM
ReactDOM.render(
  <Provider store={store}>
    <Router></Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
