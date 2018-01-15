import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import phoneBookApp from './store/reducers';
import { Provider } from 'react-redux';
import Main from './pages/Main/Main';

import createSagaMiddleware from 'redux-saga';

let sagaMiddleman = createSagaMiddleware();
let store = createStore(phoneBookApp, applyMiddleware(sagaMiddleman));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is a test project</h1>
        </header>
        <p className="App-intro">
        </p>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

export default App;
