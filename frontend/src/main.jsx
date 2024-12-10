import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './stylesheets/index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
// for using other componenet coming from react-router-dom 
// eg routes for navigating to other pages


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
