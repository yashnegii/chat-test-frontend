import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from "./contexts/context";

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <App />
    </UserProvider>
  
)
