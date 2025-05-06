import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tienda from './client/pages/Tienda'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tienda />
  </StrictMode>,
)
