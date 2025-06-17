import Img from '../assets/img.jpg'
import { FaFolder } from 'react-icons/fa6'
import { MdNoteAdd } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

import { useState, type FC } from 'react'
import { useThemeContext } from '../context/ThemeContext'

interface SidebarProp {
  sideBarOpen:boolean;
}

export const Sidebar: FC<SidebarProp> = ({sideBarOpen}) => {
  const location = useLocation();
  const { darkMode } = useThemeContext()
  const [openAddNew, setOpenAddNew] = useState(false)
  
  const toggleOpenAddNew = () => {
    setOpenAddNew(prev => !prev)
  }
  const activePage = (path: string) => { // Function to check if the current path matches the given path
    window.scrollTo(0, 0) // Scroll to top when the sidebar is opened
    return location.pathname === path 
  }
  return (
    <div 
      className={`fixed right-0 z-[90] md:translate-x-0 
       md:left-0 top-[60px] min-h-screen md:h-screen md:flex justify-between flex-col items-center w-[75%]
      transform transition-transform duration-300 ease-in-out
      md:w-[15%] py-4 ${darkMode ? 'bg-[#101040]' : 'bg-white'} ${sideBarOpen ? 'translate-x-0' : 'translate-x-full'}`} 
      >
      <div className="py-2 w-[80%] mx-auto">
        
        <div className={`${darkMode ? 'text-white font-light' : 'text-gray-600 font-light'} cursor-pointer text-xs sm:text-sm relative flex items-center w-[80%] md:gap-4 mx-auto`}
         onClick={toggleOpenAddNew}
        >
          <MdNoteAdd className='md:text-xl' />
          <h4 className='text-xs sm:text-sm'>Add new</h4>
          <div className={`${openAddNew ? 'hidden' : ''} block rounded-md top-[30px] bg-black text-white absolute p-4`}>
            <Link to='/new-note' className='block pb-2'>New Note</Link>
            <Link to='/new-folder' className='block'>New Folder</Link>
          </div>
        </div>
       
        <div className="flex flex-col gap-1 w-[80%] mx-[50px] py-4">
          <span className="bg-yellow-500 rounded-full w-5 h-5"></span>
          <span className="bg-blue-500 rounded-full w-5 h-5"></span>
          <span className="bg-red-500 rounded-full w-5 h-5"></span>
        </div>
        <ul className={`block w-[80%] mx-auto justify-center items-center ${darkMode ? 'text-white font-light' : 'text-gray-600 font-light'} py-2`}>
            <Link to={"/"}>
              <li className={`flex items-center gap-3 text-sm py-1 ${activePage('/') ? 'font-bold' : ''}`}>
                <FaHome className='' />
                <span>Home</span>
              </li>
            </Link>

            <Link to="/new-note">
              <li className={`flex items-center gap-3 text-sm py-1 ${activePage('/new-note') ? 'font-bold' : ''}`}>

                <MdNoteAdd />
                <span>New Note</span>
              </li>
            </Link>

            <Link to="/new-folder">
              <li className={`flex items-center gap-3 text-sm py-1 ${activePage('/new-folder') ? 'font-bold' : ''}`}>
                <FaFolder />
                <span>New Folder</span>
              </li>
            </Link>
        </ul>
      </div>

      <div className="w-[80%] mx-auto text-center">
        <p className='text-[.5rem] text-gray-400 pb-4 overflow-hidden'>Stay organized, stay creative.
          Our Notes App is your personal space to capture thoughts, tasks, and ideas — anytime, anywhere. 
          Whether you're jotting down meeting notes, planning a project, or writing your next big idea, our intuitive 
          and minimal interface makes note-taking fast and distraction-free.
        </p>
        <div className="max-w-[150px] h-[150px] mx-auto py-3">
          <img src={Img} alt="Promo" className='w-full object-cover h-full rounded-sm' />
        </div>

        <button className="bg-blue-900 py-2 w-full rounded-sm text-xs mx-auto cursor-pointer text-white">Upgrade</button>
      </div>


    </div>
  )
}
