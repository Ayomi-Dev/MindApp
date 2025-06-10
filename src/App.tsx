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



function App() {
  const location = useLocation()
  return(
    <AnimatePresence mode="wait" initial={false}>
        <div className="min-h-screen bg-gray-200 w-full">
          <Topbar />
          <div className="flex gap-2">
            <Sidebar />
            <Routes location={location} key={location.pathname}>
            
              <Route path="/" element={<Home />} />
              <Route path="/new-note" element={<Create />} />
              <Route path="/note/:id" element= {<NotePage />} />
              <Route path="/edit-note/:id" element= {<Edit />} />
              <Route path="/search" element= {<SearchPage />} />
              <Route path="/new-folder" element= {<CreateFolderPage />} />
              <Route path="/folder/:id" element= {<FolderPage />} />
            
            </Routes>
          </div>
        </div>
    </AnimatePresence>
  )
}

export default App;
