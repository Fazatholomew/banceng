import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import StoreProvider from 'util/store';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <StoreProvider>
    <Router>
      <App/>
    </Router>
  </StoreProvider> , 
  document.getElementById('root')
);
