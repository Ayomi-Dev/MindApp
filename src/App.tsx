import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Create } from "./pages/Create";
import { Home } from "./pages/Home";
import { NotePage } from "./pages/NotePage";
import { Edit } from "./pages/Edit";



function App() {
  
  return(
    <>
        <div className="min-h-screen bg-gray-100 w-full">
          <Topbar />
          <div className="flex gap-2">
            <Sidebar />
            <Routes>
            
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/note/:id" element= {<NotePage />} />
              <Route path="/edit-note/:id" element= {<Edit />} />
            
            </Routes>
          </div>
        </div>
    </>
  )
}

export default App;
