import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Art from './components/Art/Art.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Art />
  </StrictMode>,
)
