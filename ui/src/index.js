import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/nucleo-icons.css';
import './css/nucleo-svg.css';
import './css/material-dashboard.css?v=3.0.4';
// import './js/core/popper.min';
import './js/core/bootstrap.min';
import './js/plugins/perfect-scrollbar.min';
import './js/plugins/smooth-scrollbar.min';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
