import  { useState } from 'react'
import { useNoteContext } from '../context/NoteContext'
import { useNavigate } from 'react-router-dom';

export const NoteForm = () => {
  const {notes,  addNote } = useNoteContext();
  const [ noteTitle, setNoteTitle ] = useState('');
  const [ noteContent, setNoteContent ] = useState('');
  const [ noteCategory, setNoteCategory ] = useState('');
  const date = new Date()
  const dateFormat = date.toDateString() // extracts date from the date object
  const time = new Date()
  const timeFormat = time.toLocaleTimeString('en-US', {hour12: true}) // changing time to 12hr format
  const id = Date.now()
  const [ noteId, setNoteId] = useState(id);

  const navigate = useNavigate()

  const handleChange = (e:any) => {
    e.preventDefault();
    setNoteId(id)
    
    addNote({
      id: noteId,
      title: noteTitle,
      category: noteCategory,
      content: noteContent,
      createdAt: `${dateFormat} at ${timeFormat}`
    })
    console.log(notes)
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }
  return (
    <div className="block w-full h-full">
      <h2 className="text-center font-bold text-2xl py-4">Add Notes or Document</h2>


      <form action="" onSubmit={handleChange} className='bg-white shadow-2xl w-[80%] min-h-[80%] mx-auto p-4 rounded-md'>
        <label htmlFor="" className="block py-4 text-gray-700">Category</label>
        <select name="categories" id="" onChange={(e) => setNoteCategory(e.target.value)}>
          <option value="">Please Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
          <option value="Study">Study</option>
        </select>
        
        <label htmlFor="" className="block text-xl py-4 text-gray-700" >Title</label>
        <input type="text" name='title' required
              className="w-full p-2 text-sm border-[1px] border-gray-300 outline-none" value={noteTitle} 
              onChange={(e) => setNoteTitle(e.target.value)} placeholder='Title' 
        />

        <label htmlFor="" className="block text-xl py-4 text-gray-700">Notes</label>
        <textarea name="notes" id="" rows={10} required
                  className='text-sm w-full border-[1px] border-gray-300 outline-none p-2 placeholder:text-gray-300' 
                  placeholder='Write your idea here...'
                  onChange={(e) => setNoteContent(e.target.value)}
                >
                  
        </textarea>

        <div className="flex items-end gap-5">
          <button className="text-black bg-gray-100 px-3 py-2 rounded-sm cursor-pointer text-sm">Close</button>
          <button className="text-white bg-purple-500 px-4 py-2 rounded-sm cursor-pointer text-sm">Add Note</button>
        </div>
      </form>
    </div>
  )
}
