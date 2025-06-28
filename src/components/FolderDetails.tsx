import { useFolderContext } from '../context/FolderContext'
import { Link, useParams } from 'react-router-dom'
import { useNoteContext } from '../context/NoteContext'
import { MdDelete } from 'react-icons/md'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { FaNoteSticky } from 'react-icons/fa6'

export const FolderDetails = () => {
    const { folders, removeNoteFromFolder } = useFolderContext()
    const { notes } = useNoteContext()
    const { id } = useParams()
    const currentFolder = folders.find(folder => folder.id.toString() === id)
    const folderNotes = notes.filter(note => currentFolder?.noteIds.includes(note.id))

   if(!currentFolder) return <div className="w-full text-center py-5">Folder not found</div>
  return (
    <div className="flex-1 py-4">
        {currentFolder && (
            <div className="w-[95%] md:w-[80%] mx-auto bg-white shadow-md py-3">
              <h1 className='text-center text-2xl font-bold'>{currentFolder.title}</h1>  
              {folderNotes.length === 0 
              ? 
              (
                <div className="block">
                  <p className='text-center font-semibold'>No notes in this folder yet  <Link to="/">Back To Home</Link></p>
                  <div className="flex justify-center gap-4 border px-4 py-2">
                    <Link to='/' className=''>Back To Home <FaArrowAltCircleLeft className='inline-block' /></Link>
                    <Link to={`/add-note/${currentFolder.id}`} >Add Note <FaNoteSticky className='inline-block' /></Link>
                  </div>
                </div>
              )
              :
              <ul className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] px-2 gap-4">
                {folderNotes.map(note => (
                  <li key={note.id} className="p-4 hover:bg-gray-100 shadow-sm rounded-md">
                    <Link to={`/note/${note.id}`}>
                      <h3 className='font-bold text-xl'>{note.title}</h3>
                      <p className='text-sm font-semibold text-black'>{note.content.slice(0,4)}...</p>
                      <span className='text-xs font-light flex items-center gap-2'>view more <FaArrowAltCircleRight  /></span>
                    </Link>
                    <MdDelete className='text-2xl pt-2' onClick={() => removeNoteFromFolder(currentFolder.id, note.id)} />
                  </li>
                ))}
              </ul>
            }
            </div>
        )}
    </div>
  )
}
