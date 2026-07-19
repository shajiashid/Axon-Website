import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App.jsx'

// Hash routing for the standalone single-file build so navigation works
// from file:// with no server; clean URLs (BrowserRouter) otherwise.
const Router = import.meta.env.VITE_SINGLEFILE ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
