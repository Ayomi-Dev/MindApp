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
        <div className={`${note.bgColor} rounded-md relative p-3 w-[100%] md:w-[30%] min-h-[300px]`} style={{backgroundColor: note.bgColor}} key={index}>
          
          <Link to={`/note/${note.id}`} className='py-3'>
            <div className="flex justify-between gap-3 w-full">
                <span className="text-gray-50 font-light text-[.6rem]">Created: {note.createdAt}</span>
                <span className="text-gray-50 font-light text-[.6rem]">Updated: {note.updatedAt}</span>
            </div>

            <h3 className="text-white font-semibold py-2">{note.title}</h3>

            <hr className="bg-gray-100 w-[95%] mx-auto text-gray-300" />
            <p className="text-sm text-white py-2">
              {note.content}
            </p>
          </Link>
          <div className="w-full mx-auto flex justify-between">
            <FaTrash className='text-amber-50 font-light cursor-pointer' onClick={() => deleteNote(note.id)} />
            <Link to={`/edit-note/${note.id}`}>
              <FaEdit className='text-amber-50 font-light' />
            </Link>
          </div>
        </div>
        )
      })}
    </>
  )
}
