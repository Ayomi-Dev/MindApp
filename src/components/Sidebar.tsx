import Img from '../assets/img.jpg'
import { FaNoteSticky, FaTrash } from 'react-icons/fa6'
import { MdNoteAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

export const Sidebar = () => {
  return (
    <div className="hidden sticky left-0 top-0 h-screen sm:flex justify-between flex-col items-center w-[25%] sm:w-[20%] md:w-[15%] py-4 bg-white">
      <div className="py-2 w-[80%] mx-auto">
        <div className="flex items-center w-[80%] md:gap-4 mx-auto">
          <MdNoteAdd className='text-sm md:text-xl text-black' />
          <h4 className='font-light text-xs sm:text-sm'>Add new</h4>
        </div>
        <div className="flex flex-col gap-1 w-[80%] mx-[50px] py-4">
          <span className="bg-yellow-500 rounded-full w-5 h-5"></span>
          <span className="bg-blue-500 rounded-full w-5 h-5"></span>
          <span className="bg-red-500 rounded-full w-5 h-5"></span>
        </div>
        <ul className="block w-[80%] mx-auto justify-center items-center text-gray-400 py-2">
            <Link to="/">
              <li className="flex items-center gap-3 text-sm py-1">
                <FaHome className=' text-black' />
                <span>Home</span>
              </li>
            </Link>

            <Link to="/create">
              <li className="flex items-center gap-3 text-sm py-1">

                <FaNoteSticky className=' text-black' />
                <span>New Note</span>
              </li>
            </Link>
            <li className="flex items-center gap-3 text-sm py-1">
              <FaTrash className='' />
              <span>Trash</span>
            </li>
        </ul>
      </div>

      <div className="w-[80%] mx-auto text-center">
        <p className='text-[.5rem] sm:text-xs text-gray-400 pb-4 overflow-hidden'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Molestias laboriosam quasi consequatur culpa omnis! Labore 
        </p>
        <div className="max-w-[150px] h-[150px] mx-auto py-3">
          <img src={Img} alt="Promo" className='w-full object-cover h-full rounded-sm' />
        </div>

        <button className="bg-blue-900 py-2 w-full rounded-sm text-xs mx-auto cursor-pointer text-white">Upgrade</button>
      </div>


    </div>
  )
}
