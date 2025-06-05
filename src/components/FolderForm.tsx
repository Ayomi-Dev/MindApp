import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFolderContext } from '../context/FolderContext';

export const FolderForm = () => {
    const { createFolder } = useFolderContext()
    const [folderBgColor, setFolderBgColor] = React.useState('bg-white');
    const [folderTitle, setFolderTitle] = React.useState('');
    const navigate = useNavigate()

    const addFolder = (e:React.FormEvent ) => {
        e.preventDefault()
        if(folderTitle.trim() === '') {
            alert('Please enter a title for the folder');
            return;
        }
        const newFolder = {
            id: Date.now(),
            title: folderTitle,
            createdAt: new Date().toLocaleDateString(),
            bgColor: folderBgColor,
            noteIds: [],
            timestamp: Date.now(),
        };
        createFolder(newFolder);
        setFolderTitle('');
        setFolderBgColor('bg-white');

        setTimeout(() => {
            navigate(`/`);  
        }, 1000);
    }
  return (
    <div className="block w-full h-full">
      <h2 className="text-center font-bold text-2xl py-4">Add New Folder</h2>


      <form action="" onSubmit={addFolder}  className='bg-white shadow-2xl w-[80%] min-h-[80%] mx-auto p-4 rounded-md'>
    
        <div className="flex gap-2 py-4">
          {['bg-black', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'].map((color, index) => (
            <div key={index} className={`w-4 h-4 rounded-full cursor-pointer ${color}`}
                onClick={() => setFolderBgColor(color)}
            ></div>
          ))}
        </div>
        

        <label htmlFor="" className="text-sm block py-2 text-gray-700" >Title</label>
        <input type="text" name='title' required
              className="w-full p-2 rounded-sm text-sm border-[1px] border-gray-300 outline-none" value={folderTitle} 
              onChange={(e) => setFolderTitle(e.target.value)} placeholder='Title' 
        />
        
        <div className="flex items-end py-4 gap-5">
          <Link to={`/`} >
            <button className="text-black bg-gray-100 px-3 py-2 rounded-sm cursor-pointer text-sm">Close</button>
          </Link>
          <button className="text-white bg-green-400 transition-all hover:bg-green-500 px-4 py-2 rounded-sm cursor-pointer text-sm">Add Folder</button>
        </div>

        <div className={`w-[50%] h-[200px] mx-auto ${folderBgColor} text-center rounded-md`}>
            <input type="text" className='rounded-md border-none w-[50%] text-center text-2xl mx-auto h-full text-white p-2 placeholder:text-gray-300 ' 
                placeholder='Preview here'
                value={folderTitle}
                onChange={(e) => setFolderTitle(e.target.value)}
            />
        </div>

      </form>
    </div>
  )
}
