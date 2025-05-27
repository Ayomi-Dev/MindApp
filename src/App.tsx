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
            {/* <Home /> */}
            <Create />
          </div>
        </div>
    </>
  )
}

export default App;
