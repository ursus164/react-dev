import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Strict mode is used during development. It executes every component function twice, which is done to help catch certain errors in the app. In theory, application should work in exactly the same way no matter if the componen function gets executed once (when being rendered to the screen) or 100 times :)
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
)
