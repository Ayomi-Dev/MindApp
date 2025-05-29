import { MdNoteAdd } from 'react-icons/md'
import { useNoteContext } from '../context/NoteContext'
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';

export const NoteCard = () => {
  const { notes, deleteNote } = useNoteContext();
  return (
    <>
    {notes.map((note, index) => {
      return (
        <div className="bg-blue-400 rounded-md p-2 w-[100%] md:w-[30%] min-h-[300px]" key={index}>
            <Link to={`/note/${note.id}`}>
    
            <span className="text-gray-400 text-xs">{note.createdAt}</span>
            <div className="flex flex-1 justify-between items-center py-2">
              <h3 className="text-black">{note.title}</h3>
              <MdNoteAdd className='text-xs text-black' />
            </div>
            <hr className="bg-gray-100 w-[95%] mx-auto text-gray-300" />
            <p className="text-sm text-gray-300">
              {note.content}
            </p>
           </Link>
           <FaTrash onClick={() => deleteNote(note.id)} />
            </div>
        )
      })}
    </>
  )
}
