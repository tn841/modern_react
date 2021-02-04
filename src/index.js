import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import './index.css';
// import App from './App';
// import AppSass from './AppSass'
// import AppStyled from './AppStyled'
// import AppTodo from './AppTodo'
// import AppUsers from './AppUsers'
// import AppRouter from './AppRouter'
// import AppRedux from './AppRedux'
// import AppMiddleware from './AppMiddleware'
import AppPost from './AppPost'
import reportWebVitals from './reportWebVitals';
// import './reduxExercise'

import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules'
import { composeWithDevTools } from 'redux-devtools-extension';
// import myLogger from './middlewares/myLogger'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga';

const customHistory = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
}); 

const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({history: customHistory}), 
      sagaMiddleware,
      logger
    )
  ) //logger는 가장 마지막에 와야한다.
);
// console.log(store.getState())
    
sagaMiddleware.run(rootSaga)


ReactDOM.render(
  <Router history={customHistory}>
    <Provider store ={store}>
      <AppPost />
    </Provider>  
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
