import React from 'react';
// 1. On importe ReactDOM depuis 'react-dom' (et non plus 'react-dom/client')
import ReactDOM from 'react-dom'; 
import './index.css';
import App from './App';

// 2. On utilise l'ancienne méthode ReactDOM.render()
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);