import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Create } from "./pages/Create";
import { Home } from "./pages/Home";
import { NotePage } from "./pages/NotePage";
import { Edit } from "./pages/Edit";
import { SearchPage } from "./pages/SearchPage";
import { CreateFolderPage } from "./pages/CreateFolderPage";
import { FolderPage } from "./pages/FolderPage";
import { useEffect, useState } from "react";




function App() {
  const location = useLocation()
  const [sideBarOpen, setSidebarOpen] = useState(false)
 
  const toggleSidebar = () => {
    setSidebarOpen(!sideBarOpen)
  }
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname]) // Reset sidebars state when the route changes

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => { 
      if(event.key === 'Escape') {
        setSidebarOpen(false) // Close sidebar when Escape key is pressed
      }
    }
    window.addEventListener('keydown', handleEscape) // Add event listener for Escape key to close sidebar when esc key is pressed
    return () => {
      window.addEventListener('keydown', handleEscape) // Cleanup event listener on component unmount
    }
  }, [])
  return(
    <div className="w-full relative">
          <Topbar toggleSidebar={toggleSidebar} />
          <div className="relative min-h-screen gap-2">
            <Sidebar sideBarOpen={sideBarOpen} />
            {sideBarOpen && <div
              className="fixed inset-0 bg-black opacity-95 z-[80] sm:hidden"
              onClick={() => setSidebarOpen(false)}
            > 
            </div> /* Overlay to close sidebar when clicked outside */
            }
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
            
                <Route path="/" element={<Home />} />
                <Route path="/new-note" element={<Create />} />
                <Route path="/note/:id" element= {<NotePage />} />
                <Route path="/edit-note/:id" element= {<Edit />} />
                <Route path="/search" element= {<SearchPage />} />
                <Route path="/new-folder" element= {<CreateFolderPage />} />
                <Route path="/folder/:id" element= {<FolderPage />} />
            
              </Routes>
          </AnimatePresence>
          </div>
        </div>
  )
}

export default App;
