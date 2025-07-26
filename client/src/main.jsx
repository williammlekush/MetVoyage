import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Art from './components/Art/Art.jsx'
import { CssVarsProvider } from '@mui/joy/styles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssVarsProvider>
      <Art />
    </CssVarsProvider>
  </StrictMode>,
)
