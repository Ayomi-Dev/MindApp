import { useNoteContext } from '../context/NoteContext'
import { useFolderContext } from '../context/FolderContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { FaArrowAltCircleRight, FaEdit } from 'react-icons/fa';


export const NoteCard = () => {
  const { deleteNote, notesToFilter} = useNoteContext();
  const { folders, addNoteToFolder, removeNoteFromAllFolders} = useFolderContext()

  const handleDeleteNote = (noteId:number) => {
    deleteNote(noteId);
    removeNoteFromAllFolders(noteId);
  }

  return (
    <>
    {notesToFilter.map((note, index) => {
      return (
        <div className={`${note.bgColor} rounded-md relative w-full mx-auto md:mx-0 md:w-[250px] p-3 min-h-[100px]`} style={{backgroundColor: note.bgColor}} key={index}>
          
          
          <div className="w-full py-3 flex justify-between gap-3">
                <span className="block text-gray-50 font-light text-[.6rem]">Created: {note.createdAt}</span>
                <span className="block text-gray-50 font-light text-[.6rem]">Updated: {note.updatedAt}</span>
          </div>
          <div className="w-full flex justify-between items-center">
            <h3 className="text-white font-semibold py-2">{note.title}</h3> 
            <div className="">
              <select
                id="folderSelect"
                className={`rounded ${note.bgColor} text-white text-xs outline-none border-none`}
                onChange={(e) => {
                  const folderId = parseInt(e.target.value);
                  addNoteToFolder(folderId, note.id);
                }}
              >
               <option value=""></option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id} className={`${note.bgColor}`}>
                    {folder.title}
                  </option>
                ))}
              </select>
            </div> 
          </div>
                          
          <hr className="bg-gray-100 w-full mx-auto mb-3 text-gray-300" />
          

          <Link to={`/note/${note.id}`} className='py-3'>
            <p className="text-[1rem] text-white font-semibold pb-1 ">
              {note.content.slice(0, 30)}... 
            </p>
            <span className="text-white font-light text-sm flex items-center gap-2">view more <FaArrowAltCircleRight /></span>
          </Link>
          <div className="w-full mx-auto py-3 flex justify-between">
            <FaTrash className='text-amber-50 font-light cursor-pointer' onClick={() => handleDeleteNote(note.id)} />
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
