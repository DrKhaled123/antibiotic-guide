import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Fixed mounting approach
const rootElement = document.getElementById('root')
if (rootElement) {
  // Create root first
  const root = createRoot(rootElement)
  
  // Render the app - this will replace the loading spinner
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  console.error('Root element not found')
}