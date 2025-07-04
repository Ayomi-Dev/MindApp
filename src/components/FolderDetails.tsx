import { useFolderContext } from '../context/FolderContext';
import { Link, useParams } from 'react-router-dom';
import { useNoteContext } from '../context/NoteContext';
import { MdDelete, MdNoteAdd } from 'react-icons/md';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';





export const FolderDetails = () => {
    const { folders, removeNoteFromFolder, addNoteToFolder } = useFolderContext()
    const { notes, addNote, deleteNote } = useNoteContext()
    const { darkMode } = useThemeContext()
    const { id } = useParams()
    const currentFolder = folders.find(folder => folder.id.toString() === id)
    const folderNotes = notes.filter(note => currentFolder?.noteIds.includes(note.id))
    const [create, setCreate] = useState(false) // State to control note creation
    const [ noteTitle, setNoteTitle ] = useState('');
    const [ noteContent, setNoteContent ] = useState('');
    const [ noteCategory, setNoteCategory ] = useState('');
    const [ noteBgColor, setNoteBgColor ] = useState<string>('#ffffff');
    const date = new Date()
    const dateFormat = date.toDateString() // extracts date from the date object
    const time = new Date()
    const timeFormat = time.toLocaleTimeString('en-US', {hour12: true}) // changing time to 12hr format
    const noteId = Date.now()
  
    
    const handleCreateNote = (e:React.FormEvent) => {
      e.preventDefault();
  
      addNote ({ 
        id: noteId,
        title: noteTitle,
        category: noteCategory,
        content: noteContent,
        bgColor: noteBgColor,
        createdAt: `${dateFormat} at ${timeFormat}`,
        updatedAt: '',
        timestamp: noteId
      });
      addNoteToFolder(currentFolder!.id, noteId);
      setTimeout(() => {
        setCreate(false);
        setNoteTitle('');
        setNoteContent('');
        setNoteCategory('');
        setNoteBgColor('#ffffff');
      }, 1000)
    }
    const handleFolderDelete = (folderId: number, selectedNoteId: number) => {
      if (window.confirm("Are you sure you want to delete this note?")) {
        removeNoteFromFolder(folderId, selectedNoteId);
        deleteNote(selectedNoteId);
      }
    }
       
  if(!currentFolder) return <div className={`${darkMode ? 'text-white' : 'text-black'} md:text-3xl font-bold h-[500px] w-full flex justify-center items-center`}>
        <Link to="/" className='p-2 align-middle text-sm rounded-[50%]'><FaArrowAltCircleLeft /></Link> Folder Not Found 
  </div>



  return (
    <div className="flex-1 py-4">
        {currentFolder && (
          <div className="w-[95%] md:w-[80%] mx-auto bg-white shadow-md py-3">
            <h1 className='text-center text-2xl py-3 font-bold'><Link to={`/`} className='p-2 align-middle rounded-[50%] inline-block'><FaArrowAltCircleLeft /></Link>{currentFolder.title}</h1>  
            {
              folderNotes.length === 0 ? 
              (
                  <div className="block">
                    <p className='text-center font-semibold py-2'>No notes in this folder yet  </p>

                    <div className="flex justify-center gap-4 items-center w-full">
                      <Link to="/" className='text-xs hover:bg-gray-200 p-2 rounded-sm bg-gray-100'>Back To Home  <FaArrowAltCircleLeft className='inline-block' /></Link>

                        <button className="flex justify-center cursor-pointer bg-green-500 hover:bg-green-600 text-white gap-4 rounded-md px-4 py-2" onClick={() => setCreate(true)}>
                          <FaNoteSticky className='text-xs' />
                          <span className='text-xs font-semibold'>Add A Note</span>
                        </button>
                    </div>
                  </div>
              )
                :
              (
                <ul className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] px-2 gap-4">
               
                  {folderNotes.map(note => (
                      <li key={note.id} className="p-4 hover:bg-gray-100 shadow-sm rounded-md">
                        <Link to={`/note/${note.id}`}>
                          <h3 className='font-bold text-xl'>{note.title}</h3>
                          <p className='text-sm font-semibold text-black'>{note.content.slice(0,4)}...</p>
                          <span className='text-xs font-light flex items-center gap-2'>view more <FaArrowAltCircleRight  /></span>
                        </Link>
                        <MdDelete className='text-2xl pt-2' onClick={() => handleFolderDelete(currentFolder.id, note.id)} />
                      </li>
                    ))
                  }
                  <li className='border text-center flex justify-center font-semibold text-[4rem] cursor-pointer bg-green-500 hover:bg-green-600 text-white items-center gap-4 p-2 rounded-md shadow-2xl' onClick={() => setCreate(true)}>
                    <button className="flex flex-col justify-center items-center">
                      <MdNoteAdd className='text-center'  />
                      {/* <span>Add More Notes</span> */}
                    </button>
                  </li>
                </ul>
              )
            }

            {create && (
              <form action="" onSubmit={handleCreateNote} className='bg-white shadow-2xl w-[95%] md:w-[80%] min-h-[80%] mx-auto p-4 rounded-md'>Add Note
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
                          className={`${noteBgColor} ${noteBgColor ? 'text-white' : 'text-black'} text-sm rounded-sm w-full border-[1px] border-gray-300 outline-none p-2 placeholder:text-gray-500 font-semibold `}
                          placeholder='Write your idea here...'
                          onChange={(e) => setNoteContent(e.target.value)}
                          // style={{ backgroundColor: noteBgColor }}
                        >
                          
                </textarea>
          
                <div className="flex items-end gap-5">
                  <motion.button whileHover={{scale: 1.1}} className="text-black bg-gray-100 px-3 py-2 rounded-sm cursor-pointer text-sm" onClick={() => setCreate(false)}>Close</motion.button>
                  <button className="text-white bg-green-400 transition-all hover:bg-green-500 px-4 py-2 rounded-sm cursor-pointer text-sm">Add Note</button>
                </div>
              </form>
            )}
          </div>   

          
        )}
    </div>
  )
}
