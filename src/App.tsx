import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Create } from "./pages/Create";
import { Home } from "./pages/Home";



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
              
            
            </Routes>
          </div>
        </div>
    </>
  )
}

export default App;
