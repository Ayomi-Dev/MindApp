import { StrictMode } from 'react'
import { ToastContainer, Bounce } from 'react-toastify'
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <App />
        </NoteProvider>
      </FolderProvider>
    </BrowserRouter>
  </StrictMode>
)
