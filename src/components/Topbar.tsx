import { FaBars, FaUserCircle } from "react-icons/fa"
import { Searchbar } from "./Searchbar"
import { FaHashtag } from "react-icons/fa6"
// import {isActive} from "../utility/isActive"
import type { FC } from "react"
import { Link } from "react-router-dom"

interface TopbarProp {
  toggleSidebar: () => void
}
export const Topbar:FC<TopbarProp> = ({toggleSidebar}) => {
  // const { toggleSidebar } = isActive();
  
  return (
    <nav className="flex items-center md:justify-start justify-between px-0 gap-2 md:px-4 z-[99] w-full h-[60px] bg-white top-0 fixed">

      <div className="sm:flex hidden sm:justify-self-start sm:items-center px-4 w-[10%] sm:w-[15%] text-sm text-gray-400">
        <FaHashtag className="" /> 
        <h4 className="">MIND</h4>
      </div>

      <div className="px-2 w-[30%] ">
        <Link to="/" className="md:text-3xl text-xl font-semibold text-black">
          MindPad
        </Link>
      </div>

      <Searchbar />

      <div className="flex justify-end gap-4 w-[20%] mx-auto text-sm md:text-xl items-center justify-self-end">
        <FaUserCircle className="text-black mr-1 md:block hidden " /> 
        <h3 className="text-black hidden md:block text-sm ">Ayomide</h3>
        <FaBars className="text-black md:pl-1 mr-3" onClick={toggleSidebar}/>
      </div>
    </nav>
  )
}
