import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function renderApp() {
  let appElem = document.getElementById('app-container');
  if (appElem) ReactDOM.render(<App />, appElem);
}

renderApp();
