import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from "@heroui/react";
import CounterContextProvider from './contexts/CounterContext.jsx';
import AuthContextProvider from './contexts/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>

      <HeroUIProvider>
        <CounterContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </CounterContextProvider>
      </HeroUIProvider>
  </StrictMode>,
)
