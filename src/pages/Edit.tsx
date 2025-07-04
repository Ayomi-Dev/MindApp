import  { useEffect, useState } from 'react'
import { useNoteContext } from '../context/NoteContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useThemeContext } from '../context/ThemeContext';

export const Edit = () => {
  const { darkMode } = useThemeContext()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const {notes, updateNote } = useNoteContext();
  const noteToEdit = notes.find(note => note.id.toString() === id);
  
  const [ noteTitle, setNoteTitle ] = useState('');
  const [ noteContent, setNoteContent ] = useState('');
  const [ noteCategory, setNoteCategory ] = useState('');
  const [ noteBgColor, setNoteBgColor ] = useState<string>(''); // Default to white if bgColor is not set
  const date = new Date()
  const dateFormat = date.toDateString() // extracts date from the date object
  const time = new Date()
  const timeFormat = time.toLocaleTimeString('en-US', {hour12: true}) // changes time to 12hr format
 

  useEffect(() => { // Populate the form fields with the note data if it exists
    
    if (noteToEdit) { // Check if noteToEdit is defined before accessing its properties
      setNoteTitle(noteToEdit.title);
      setNoteContent(noteToEdit.content);
      setNoteCategory(noteToEdit.category);
      setNoteBgColor(noteToEdit.bgColor || '#ffffff'); // Default to white if bgColor is not set
    }
  }, [noteToEdit])


  const handleUpdate = (e:React.FormEvent) => {
    e.preventDefault();
    
    if(noteToEdit){
      updateNote( noteToEdit?.id, { 
        title: noteTitle,
        category: noteCategory,
        content: noteContent,
        bgColor: noteBgColor,
        createdAt: `${noteToEdit.createdAt}`,
        updatedAt: `${dateFormat} at ${timeFormat}`
      })
      setTimeout(() => {
        navigate(`/note/${noteToEdit.id}`)
      }, 1000)
    }

  }
  return (
    <PageWrapper>
      <div className="block flex-1">
      <h2 className={`${darkMode ? 'text-white' : ''} text-center font-bold text-2xl py-4`}>Edit Your Notes</h2>


      <form action="" onSubmit={handleUpdate} className='bg-white shadow-2xl w-[80%] min-h-[80%] mx-auto p-4 rounded-md'>
        <div className="flex justify-between w-full px-4 items-center">
          <div className="block">
            <select className='text-xs text-gray-400' value={noteCategory} name="categories" id="" onChange={(e) => setNoteCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
              <option value="Study">Study</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label htmlFor="bgColor" className='text-xs text-gray-400'>Background Color</label>
            <input type="color" name="bgColor" id="bgColor" value={noteTitle} 
              onChange={(e) => setNoteBgColor(e.target.value)} 
              className='w-6 h-6 rounded-[50%] cursor-pointer'  
            />
          </div>
        </div>
          
          
    
        
        <label htmlFor="" className="text-sm block py-2 text-gray-700" >Title</label>
        <input type="text" name='title' required
              className="w-full p-2 rounded-sm text-sm border-[1px] border-gray-300 outline-none" value={noteTitle} 
              onChange={(e) => setNoteTitle(e.target.value)} placeholder='Title' 
        />

        <label htmlFor="" className="block text-xs py-2 text-gray-700">Notes</label>
        <textarea name="notes" id="" rows={10} required
                  className={`${noteBgColor} text-sm text-white rounded-sm w-full border-[1px] border-gray-300 outline-none p-2 placeholder:text-gray-300 `}
                  placeholder='Write your idea here...'
                  onChange={(e) => setNoteContent(e.target.value)}
                  style={{ backgroundColor: noteBgColor }}
                  value={noteContent}
                >
                  
        </textarea>

        <div className="flex items-end gap-5">
          <Link to={`/`} >
            <button className="text-black bg-gray-100 px-3 py-2 rounded-sm cursor-pointer text-sm">Close</button>
          </Link>
          <button className="text-white bg-purple-500 px-4 py-2 rounded-sm cursor-pointer text-sm">Save</button>
        </div>
      </form>
      </div>
    </PageWrapper>
  )
}
