import type{ FC }from 'react'
import { FaFolder } from 'react-icons/fa6'
import{ useFolderContext, type Folder } from '../context/FolderContext'
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';


interface FolderCardProps {
  folder: Folder;

}

export const FolderCard: FC<FolderCardProps> = ({folder}) => {
  const {deleteFolder} = useFolderContext()
  return (
    <>
      <div className={`${folder.bgColor} shadow-lg cursor-pointer relative rounded-xl p-4`}>
        <div className="absolute w-[20px] h-[20px] right-0 top-[-10px] flex justify-center items-center rounded-full bg-red-400 text-white font-bold">
          <span>{folder.noteIds.length}</span>
        </div>
        <Link to={`/folder/${folder.id}`}>
              <FaFolder className='text-[3rem] text-white text-xl font-light py-4' />
              <h3 className="text-white font-bold text-2xl mt-6">{folder.title}</h3>
              <span className='py-2 text-xs text-white font-light'>{folder.createdAt}</span>
        </Link>
        <MdDelete className='text-2xl text-black' onClick={()=> {deleteFolder(folder.id)}} />
      </div>
    </>

  )
}
