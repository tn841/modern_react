import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import AppSass from './AppSass'
// import AppStyled from './AppStyled'
// import AppTodo from './AppTodo'
import Users from './Users'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
