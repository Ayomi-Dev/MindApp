import { FaBars, FaUserCircle } from "react-icons/fa"
import { Searchbar } from "./Searchbar"
import { FaHashtag } from "react-icons/fa6"

export const Topbar = () => {
  return (
    <nav className="flex items-center justify-start px-4 z-[999] w-full h-[60px] bg-white top-0 sticky">

      <div className="sm:flex hidden sm:justify-self-start sm:items-center px-4 w-[10%] sm:w-[15%] text-sm text-gray-400">
        <FaHashtag className="" /> 
        <h4 className="">MIND</h4>
      </div>

      <div className="px-2 w-[30%] ">
        <a href="" className="md:text-3xl text-xl font-semibold text-black">
          MindPad
        </a>
      </div>

      <Searchbar />

      <div className="flex justify-end gap-4 w-[20%] mx-auto text-sm md:text-xl items-center justify-self-end">
        <FaUserCircle className="text-black mr-1 " /> 
        <h3 className="text-black hidden md:block text-sm ">Ayomide</h3>
        <FaBars className="text-black pl-1" />
      </div>
    </nav>
  )
}
