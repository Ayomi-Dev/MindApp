import { MdNoteAdd } from 'react-icons/md'
import { useNoteContext } from '../context/NoteContext'
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';

export const NoteCard = () => {
  const { notes, deleteNote } = useNoteContext();
  return (
    <>
    {notes.map((note, index) => {
      return (
        <div className={` rounded-md p-2 w-[100%] md:w-[30%] min-h-[300px]`} style={{backgroundColor: note.bgColor}} key={index}>
          
            <Link to={`/note/${note.id}`}>
        <div className="flex justify-between w-full">
            <span className="text-gray-50 font-light text-xs">Created: {note.createdAt}</span>
            <span className="text-gray-50 font-light text-xs">Updated: {note.updatedAt}</span>
        </div>
            <div className="flex flex-1 justify-between items-center py-2">
              <h3 className="text-white font-semibold">{note.title}</h3>
              <MdNoteAdd className='text-xs text-black' />
            </div>
            <hr className="bg-gray-100 w-[95%] mx-auto text-gray-300" />
            <p className="text-sm text-white">
              {note.content}
            </p>
           </Link>
           <FaTrash className='text-amber-50 font-light' onClick={() => deleteNote(note.id)} />

            <Link to={`/edit-note/${note.id}`}>
              <FaEdit className='text-amber-50 font-light' onClick={() => console.log('Edit Note')} />
            </Link>
            </div>
        )
      })}
    </>
  )
}
