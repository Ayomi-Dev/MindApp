import React from 'react'
import { MdFolder, MdNote, MdNoteAdd} from 'react-icons/md'
import { FolderCard } from '../components/FolderCard'
import { FaFolder, FaFolderOpen } from 'react-icons/fa6'
import { FaNotEqual } from 'react-icons/fa'

export const Home = () => {
  return (
    <main className="flex-1">
      <section className="w-full p-5">
        <h2 className="text-xl font-semibold">Recent Folders</h2>
        <div className="w-full flex py-4 text-sm gap-5 text-gray-400">
          <span>Today</span>
          <span>This Week</span>
          <span>This Month</span>
        </div>
        
        <div className="folder-cards flex">
          <div className="grid w-[80%] md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] py-4 gap-4">
            <div className="bg-blue-200 rounded-xl p-3">
              <FaFolderOpen className='text-[4.5rem] py-2 text-violet-400' />
              <h3 className="text-black mt-6">Movie Review</h3>
              <span className='text-gray-600 text-xs py-2'>25/05/2025</span>
            </div>
            <div className="bg-red-300 rounded-xl p-3">
              <FaFolderOpen className='text-[4.5rem] py-3 text-amber-800' />
              <h3 className="text-black mt-6">Movie Review</h3>
              <span className='text-gray-600 text-xs py-2'>25/05/2025</span>
            </div>
            <div className="bg-amber-100 rounded-xl p-3">
              <FaFolderOpen className='text-[4.5rem] py-3 text-amber-400' />
              <h3 className="text-black mt-6">Movie Review</h3>
              <span className='text-gray-600 text-xs py-2'>25/05/2025</span>
            </div>
                                    
          </div>
          <MdFolder className='text-[3rem] text-red-400' />
        </div>
      </section>

      
      <section className="w-full p-5 note-card grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]">
        <h2 className="text-xl font-semibold">My Notes</h2>
        <div className="w-full flex py-4 text-sm gap-5 text-gray-400">
          <span>Today</span>
          <span>This Week</span>
          <span>This Month</span>
        </div>
        <div className="flex flex-wrap gap-4 w-full">
          <div className="bg-yellow-200 rounded-md p-2 flex-[1_1_100%] md:flex-[1_1_calc(30%_-_1rem)] min-h-[100px]">

            <span className="text-gray-400 text-xs">26/05/2025</span>
            <div className="flex flex-1 justify-between items-center py-2">
              <h3 className="text-black">Holiday Shopping</h3>
              <MdNoteAdd className='text-xs text-black' />
            </div>
            <hr className="bg-gray-100 w-[95%] mx-auto text-gray-300" />
            <p className="text-xl text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Excepturi, sapiente at delectus illo quaerat porro cum quasi, 
              voluptates omnis expedita repellendus. Eligendi neque 
              repellat facere velit ipsam aut sed harum.
            </p>
          </div>
          <div className="bg-green-200 rounded-md p-2 flex-[1_1_100%] md:flex-[1_1_calc(30%_-_1rem)] min-h-[100px]">

            <span className="text-gray-400 text-xs">26/05/2025</span>
            <div className="flex flex-1 justify-between items-center py-2">
              <h3 className="text-black">Holiday Shopping</h3>
              <MdNoteAdd className='text-xs text-black' />
            </div>
            <hr className="bg-gray-100 w-[95%] mx-auto text-gray-300" />
            <p className="text-xl text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Excepturi, sapiente at delectus illo quaerat porro cum quasi, 
              voluptates omnis expedita repellendus. Eligendi neque 
              repellat facere velit ipsam aut sed harum.
            </p>
          </div>

          <div className="bg-indigo-200 rounded-md p-2 flex-[1_1_100%] md:flex-[1_1_calc(30%_-_1rem)] min-h-[100px]">

            <span className="text-gray-400 text-xs">26/05/2025</span>
            <div className="flex flex-1 justify-between items-center py-2">
              <h3 className="text-black">Holiday Shopping</h3>
              <MdNoteAdd className='text-xs text-black' />
            </div>
            <hr className="bg-gray-100 w-[95%] mx-auto text-gray-400" />
            <p className="text-xl text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Excepturi, sapiente at delectus illo quaerat porro cum quasi, 
              voluptates omnis expedita repellendus. Eligendi neque 
              repellat facere velit ipsam aut sed harum.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
