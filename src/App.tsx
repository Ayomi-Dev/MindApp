import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Home } from "./pages/Home";



function App() {
  
  return(
    <>
        <div className="min-h-screen bg-gray-100 w-full">
          <Topbar />
          <div className="flex gap-2">
            <Sidebar />
            <Home />
          </div>
        </div>
    </>
  )
}

export default App;
