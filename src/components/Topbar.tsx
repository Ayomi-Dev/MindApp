import { FaBars, FaUserCircle } from "react-icons/fa"
import { Searchbar } from "./Searchbar"
import { FaHashtag, FaMoon } from "react-icons/fa6"
// import {isActive} from "../utility/isActive"
import type { FC } from "react"
import { Link } from "react-router-dom"
import { MdSunny } from "react-icons/md"
import { useThemeContext } from "../context/ThemeContext"

interface TopbarProp {
  toggleSidebar: () => void
}
export const Topbar:FC<TopbarProp> = ({toggleSidebar}) => {
  const {darkMode, toggleDarkMode} = useThemeContext()
  
  return (
    <nav className={`${darkMode ? 'bg-[#101040] text-white' : 'bg-white'} flex items-center md:justify-start justify-between px-0 gap-2 md:px-4 z-[99] w-full h-[60px] top-0 fixed`}>

      <div className="sm:flex hidden sm:justify-self-start sm:items-center px-4 w-[10%] sm:w-[15%] text-sm text-gray-400">
        <FaHashtag className="" /> 
        <h4 className="">MIND</h4>
      </div>

      <div className="px-2 w-[30%] ">
        <Link to="/" className="md:text-3xl text-xl font-semibold">
          MindPad
        </Link>
      </div>

      <Searchbar />

      <div className="flex justify-end gap-4 w-[20%] mx-auto text-sm md:text-xl items-center justify-self-end">
        <FaUserCircle className="mr-1 md:block hidden " /> 
        <h3 className="hidden md:block text-sm ">Ayomide</h3>
        <FaBars className="md:pl-1 mr-3" onClick={toggleSidebar}/>
      </div>
        <div className="flex px-2">
          <MdSunny className={`${darkMode ? 'block' : 'hidden'} cursor-pointer`} onClick={toggleDarkMode} />
          <FaMoon className={`${darkMode ? 'hidden' : 'block'} cursor-pointer`} onClick={toggleDarkMode} />
        </div>
    </nav>
  )
}
