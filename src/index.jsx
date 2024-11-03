import './styles/index.css'
import './styles/custom.css'

import React from 'react'
import ReactDOM from 'react-dom/client' 
import App from './App' 
import './lib/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <App /> 
  </React.StrictMode>
);