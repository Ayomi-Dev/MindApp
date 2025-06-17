import  { useState } from 'react'
import { useNoteContext } from '../context/NoteContext'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

export const NoteForm = () => {
  const { addNote } = useNoteContext();
  const [ noteTitle, setNoteTitle ] = useState('');
  const [ noteContent, setNoteContent ] = useState('');
  const [ noteCategory, setNoteCategory ] = useState('');
  const [ noteBgColor, setNoteBgColor ] = useState<string>('#ffffff');
  const date = new Date()
  const dateFormat = date.toDateString() // extracts date from the date object
  const time = new Date()
  const timeFormat = time.toLocaleTimeString('en-US', {hour12: true}) // changing time to 12hr format
  const id = Date.now()
  const [ noteId, setNoteId] = useState(id);

  const navigate = useNavigate()

  const handleChange = (e:React.FormEvent) => {
    e.preventDefault();
    setNoteId(id)
    addNote({
      id: Date.now(),
      title: noteTitle,
      category: noteCategory,
      content: noteContent,
      bgColor: noteBgColor,
      createdAt: `${dateFormat} at ${timeFormat}`,
      updatedAt: '',
      timestamp: noteId
    })
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }
  const { darkMode } = useThemeContext()
  return (
      <div className="block w-full">
      <h2 className={`${darkMode ? 'text-white' : ''} text-center font-bold text-2xl py-4`}>Add Notes or Document</h2>


      <form action="" onSubmit={handleChange} className='bg-white shadow-2xl w-[95%] md:w-[80%] min-h-[80%] mx-auto p-4 rounded-md'>
        <div className="flex justify-between w-full px-4 items-center">
          <div className="block">
            <select className='text-xs text-gray-400' name="categories" id="" onChange={(e) => setNoteCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
              <option value="Study">Study</option>
            </select>
          </div>
          <div className="flex gap-2">
            {['bg-black', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'].map((color, index) => (
              <div key={index} className={`w-4 h-4 rounded-full cursor-pointer ${color}`}
                  onClick={() => setNoteBgColor(color)}
              ></div>
            ))}
          </div>
        </div>

        <label htmlFor="" className="text-sm block py-2 text-gray-700" >Title</label>
        <input type="text" name='title' required
              className="w-full p-2 rounded-sm text-sm border-[1px] border-gray-300 outline-none" value={noteTitle} 
              onChange={(e) => setNoteTitle(e.target.value)} placeholder='Title' 
        />

        <label htmlFor="" className="block text-xs py-2 text-gray-700">Notes</label>
        <textarea name="notes" id="" rows={10} required
                  className={`${noteBgColor} text-sm text-white rounded-sm w-full border-[1px] border-gray-300 outline-none p-2 placeholder:text-gray-500 font-semibold `}
                  placeholder='Write your idea here...'
                  onChange={(e) => setNoteContent(e.target.value)}
                  // style={{ backgroundColor: noteBgColor }}
                >
                  
        </textarea>

        <div className="flex items-end gap-5">
          <Link to={`/`} >
            <motion.button whileHover={{scale: 1.1}} className="text-black bg-gray-100 px-3 py-2 rounded-sm cursor-pointer text-sm">Close</motion.button>
          </Link>
          
          <button className="text-white bg-green-400 transition-all hover:bg-green-500 px-4 py-2 rounded-sm cursor-pointer text-sm">Add Note</button>
        </div>
      </form>
      </div>
  )
}
