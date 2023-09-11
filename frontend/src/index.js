import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import './bootstrap.min.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './store';
import {disableReactDevTools } from '@fvilers/disable-react-devtools';


/*
 * NODE_ENV values in CRA (Create React App):
 * 1. 'development' when using `npm start`
 * 2. 'test' when using `npm test`
 * 3. 'production' after using `npm run build`
 * 
 * Note: NODE_ENV can't be overridden in `.env` for CRA projects. 
 * When using `npm start`, NODE_ENV is always 'development'.
 */

// Disable React DevTools for production
if (process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
