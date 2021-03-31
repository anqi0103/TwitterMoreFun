// using ES6 import syntax
import React from 'react';
// render components to webpage
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

ReactDOM.render(
  //StrictMode is a tool for highlighting potential problems in an application. 
  //Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // render the <App /> into root
  document.getElementById('root')
);
