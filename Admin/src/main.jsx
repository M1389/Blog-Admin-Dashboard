import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import theme from './components/Theme/theme.js'
import lightTheme from './components/Theme/lightTheme.js'
import authSlice from './Store/authSlice.js'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
        <App />
    
    </BrowserRouter>
  </StrictMode>
)
