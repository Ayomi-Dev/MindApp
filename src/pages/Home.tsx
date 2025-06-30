import { NoteCard } from '../components/NoteCard'
import { useFolderContext } from '../context/FolderContext';
import { FolderCard } from '../components/FolderCard';
import Folder from '../assets/folder.png'
import { Link } from 'react-router-dom';
import { MdNoteAdd } from 'react-icons/md';
import { useNoteContext } from '../context/NoteContext';
import { PageWrapper } from '../components/PageWrapper';
import { useThemeContext } from '../context/ThemeContext';

export const Home = () => {
  const { handleFolderFilter, timeFilter, filterData} = useFolderContext();
  const { handleFilter, noteTimeFilter } = useNoteContext()
  const { darkMode } = useThemeContext()


  return (
    <PageWrapper>

      <main className="w-full p-5">
        <section className="w-full">
        <h2 className={`${darkMode ? 'text-white font-semibold' : ''} text-2xl `}>Recent Folders</h2>
        <div className="w-full flex py-4 text-sm gap-5 text-gray-400">
          {["all", "last24hr", 'thisweek', 'thismonth'].map((range) => {
            return <span key={range} onClick={() => handleFolderFilter(range as typeof timeFilter)} 
              className={`cursor-pointer hover:text-black hover:text-bold transition-all ${timeFilter === range ? 'text-black font-bold' : ''}
              ${darkMode ? 'text-gray-400 font-light hover:text-white' : ''} ${darkMode && timeFilter === range ? 'text-white font-bold' : ''}
              `}>
              {range.charAt(0).toUpperCase() + range.slice(1).replace('his', 'his ')}
            </span>
          })}
        </div>
        
        <div className="grid w-full md:w-[90%] grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] py-4 gap-4">
          <div className="w-[150px] h-[150px]">
            <Link to='new-folder'>
              <img src={Folder} className='w-full h-full object-cover' alt="" />
            </Link>
          </div>
          {filterData.map((folder) => {
            return <FolderCard key={folder.id} folder={folder} />
          })}
                      
        </div>
        </section>
          
          
        <section className="w-full block">
        <h2 className={`${darkMode ? 'text-white font-semibold' : ''} text-2xl `}>My Notes</h2>
        <div className="w-full flex py-4 text-sm gap-5 text-gray-400">
          {["all", "last24hr", 'thisweek', 'thismonth'].map((range) => {
            return <span key={range} onClick={() => handleFilter(range as typeof noteTimeFilter)} className={`cursor-pointer hover:text-gray-600 transition-all ${noteTimeFilter === range ? 'text-black font-bold' : ''}
                ${darkMode ? 'text-gray-400 font-light hover:text-white' : ''} ${darkMode && noteTimeFilter === range ? 'text-white font-bold' : ''}
            `}>
              {range.charAt(0).toUpperCase() + range.slice(1).replace('his', 'his ')}
            </span>
          })}
        </div>
        <div className="flex flex-wrap gap-3 w-full">
          <div className="rounded-md flex justify-center items-center p-2">
            <Link to={`/new-note`} className='border rounded-sm'>
              <MdNoteAdd className='text-5xl text-gray-600' />
            </Link>
          </div>
          <NoteCard />
        </div>
        </section>
      </main>
    </PageWrapper>
  )
}
