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
import { useState } from "react";



function App() {
  const location = useLocation()
  const [sideBarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sideBarOpen)
  }
  return(
    <div className="w-full">
          <Topbar toggleSidebar={toggleSidebar} />
          <div className="flex h-screen relative gap-2">
            <Sidebar sideBarOpen={sideBarOpen} />
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
