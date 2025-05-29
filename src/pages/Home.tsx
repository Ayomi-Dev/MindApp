import { MdFolder} from 'react-icons/md'
import {  FaFolderOpen, FaNoteSticky } from 'react-icons/fa6'
import { NoteCard } from '../components/NoteCard'

export const Home = () => {
 
  return (
    <main className="flex-1 px-4">
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

      
      <section className="w-full p-5 block">
        <h2 className="text-xl font-semibold">My Notes</h2>
        <div className="w-full flex py-4 text-sm gap-5 text-gray-400">
          <span>Today</span>
          <span>This Week</span>
          <span>This Month</span>
        </div>
        <div className="flex flex-wrap gap-3 w-full">
          <div className="rounded-md p-2 flex-[1_1_100%]">
              <FaNoteSticky className='text-2xl text-gray-300' />
          </div>
          <NoteCard />
        </div>
      </section>
    </main>
  )
}
