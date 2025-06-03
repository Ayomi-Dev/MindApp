import type{ FC }from 'react'
import { FaFolder } from 'react-icons/fa6'
import type{ Folder } from '../context/FolderContext'
import { Link } from 'react-router-dom';

interface FolderCardProps {
  folder: Folder;
}

export const FolderCard: FC<FolderCardProps> = ({folder}) => {
  
  return (
    <Link to={`/folder/${folder.id}`}>
      <div className={`${folder.bgColor} cursor-pointer rounded-xl p-4`}>
          <FaFolder className='text-[3rem] text-white text-xl font-light py-4' />
          <h3 className="text-white font-bold text-2xl mt-6">{folder.title}</h3>
          <span className='py-2 text-xs text-white font-light'>{folder.createdAt}</span>
      </div>
    </Link>
  )
}
