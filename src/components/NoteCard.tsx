import { useNoteContext } from '../context/NoteContext'
import { useFolderContext } from '../context/FolderContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';


export const NoteCard = () => {
  const { deleteNote, notesToFilter} = useNoteContext();
  const { folders, addNoteToFolder} = useFolderContext()


  return (
    <>
    {notesToFilter.map((note, index) => {
      return (
        <div className={`${note.bgColor} rounded-md relative w-[250px] p-3 min-h-[100px]`} style={{backgroundColor: note.bgColor}} key={index}>
          
          
          <div className="w-full py-3">
                <span className="block text-gray-50 font-light text-[.6rem]">Created: {note.createdAt}</span>
                <span className="block text-gray-50 font-light text-[.6rem]">Updated: {note.updatedAt}</span>
          </div>
          <div className="w-full flex justify-between items-center py-3">
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
                  <option key={folder.id} value={folder.id}>
                    {folder.title}
                  </option>
                ))}
              </select>
            </div> 
          </div>
                          
          <hr className="bg-gray-100 w-[95%] mx-auto mb-3 text-gray-300" />
          <hr className="bg-gray-100 w-[95%] mx-auto text-gray-300" />

          <Link to={`/note/${note.id}`} className='py-3'>
            <p className="text-sm text-white py-2">
              {note.content.slice(0, 20)}...
            </p>
          </Link>
          <div className="w-full mx-auto py-3 flex justify-between">
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
