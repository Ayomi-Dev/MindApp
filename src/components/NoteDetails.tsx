import { FaNoteSticky } from 'react-icons/fa6';
import { useNoteContext } from '../context/NoteContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { useThemeContext } from '../context/ThemeContext';

export const NoteDetails = () => {
  const { notes, deleteNote } = useNoteContext();
  const { darkMode } = useThemeContext();
  const navigate = useNavigate()
  const { id } = useParams()
  const note = notes.find(note => note.id.toString() === id)
  const handleDelete = (id: number) => {
      deleteNote(id);
      setTimeout(() => {
        navigate('/')
      }, 1000)
  }
  return (
    <section className="w-full h-full text-center">
        <h2 className={`${darkMode ? 'text-white' : ''} text-2xl font-semibold text-center py-4`}>Note Details</h2>
        <div className="w-[95%] md:w-[60%] mx-auto">
            {note ? (
                <div className="bg-white shadow-2xl flex flex-col items-center justify-center rounded-md p-3 min-h-[500px]">
                    <h3 className="text-black text-lg pb-2">{note.title}</h3>
                    <span className="text-gray-400 text-xs">{note.createdAt}</span>
                    <p className="text-[1rem] text-gray-400 mt-2 font-semibold">{note.content}</p>
                    <div className="w-[70%] gap-4 flex text-xs pt-4 justify-between mx-auto">
                      <button className="transition-[2s_ease_in_out] bg-green-400 text-xs  hover:bg-green-600 outline-none rounded-md py-2 px-4 text-white cursor-pointer"
                      >
                        <Link to={`/edit-note/${note.id}`} className='flex items-center justify-center gap-2'>
                          <FaNoteSticky />
                          <span>Edit</span> 
                        </Link>
                      </button>
                      <button className="bg">
                        <Link to="/" className='flex items-center justify-center bg-gray-300 gap-2 text-xs hover:bg-gray-200 outline-none rounded-md px-4 py-2 text-white transition-[2s_ease_in_out] cursor-pointer'>
                          <span>Back Home</span>
                        </Link>
                      </button>
                      <button className="bg-red-400 flex gap-2 items-center text-xs hover:bg-red-600 outline-none rounded-md px-4 py-2 text-white transition-[2s_ease_in_out] cursor-pointer" 
                        onClick={() => handleDelete(note.id)}>
                        <MdDelete />
                        <span>Delete</span>
                      </button>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">Note not found</p>
            )}
        </div>
    </section>
  )
}
