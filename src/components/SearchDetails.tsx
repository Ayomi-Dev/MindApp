import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useNoteContext } from "../context/NoteContext";
import { highlightText } from "../utility/highlightText";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useThemeContext } from "../context/ThemeContext";


export const SearchDetails = () => {
  const { searchResults } = useNoteContext();
  const query = searchResults.length > 0 ? searchResults[0].title : '';
  const navigate = useNavigate()
  const { darkMode } = useThemeContext()
  
  return (
    <div className="w-full h-full">
      <div className="p-4 w-[95%] md:w-[70%] mx-auto flex flex-col items-center">
      <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-2xl py-3 font-bold`}>Search Results</h2>
      <button
        onClick={() => navigate('/')}
        className="text-sm bg-gray-400 flex gap-2 items-center text-black px-3 py-1 rounded mb-4 hover:bg-gray-200"
      >
        <FaArrowLeftLong /><span>Back</span>
      </button>
      {searchResults.length === 0 ? (
        <p className="text-gray-500">No notes match your search.</p>
      ) : (
        <ul className="space-y-4 w-full">
          {searchResults.map(note => (
            <motion.li key={note.id} 
              className="bg-white shadow-md p-4 w-full rounded-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              >
              <Link to={`/note/${note.id}`}>
                <h3 className="text-lg font-semibold">{highlightText(note.title, query)}</h3>
                <p className="text-sm text-gray-500">{highlightText(note.content.slice(0, 60), query)}...</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  </div>
  )
}
