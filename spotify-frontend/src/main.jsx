import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     <ToastContainer position="top-center" autoClose={3000} />
  </StrictMode>,
)
