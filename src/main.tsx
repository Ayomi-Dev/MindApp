import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NoteProvider } from './context/NoteContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FolderProvider } from './context/FolderContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FolderProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </FolderProvider>
    </BrowserRouter>
  </StrictMode>
)
