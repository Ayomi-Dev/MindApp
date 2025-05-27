import React from 'react'

export const NoteForm = () => {
  return (
    <div className="block w-full h-full">
      <h2 className="text-center font-bold text-2xl py-4">Add Notes or Document</h2>
      <form action="" className='bg-white shadow-2xl w-[80%] min-h-[80%] mx-auto p-4 rounded-md'>
        <label htmlFor="" className="block py-4 text-gray-700">Category</label>
        <select name="categories" id="">
          <option value="">Please Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
          <option value="Study">Study</option>
        </select>
        
        <label htmlFor="" className="block text-xl py-4 text-gray-700">Title</label>
        <input type="text" name='title' className="w-full p-2 text-sm border-[1px] border-gray-300 outline-none" placeholder='Title' />

        <label htmlFor="" className="block text-xl py-4 text-gray-700">Notes</label>
        <textarea name="notes" id="" rows={10} className='text-sm w-full border-[1px] border-gray-300 outline-none p-2 placeholder:text-gray-300' placeholder='Write your idea here...'></textarea>

        <div className="flex items-end gap-5">
          <button className="text-black bg-gray-100 px-3 py-2 rounded-sm cursor-pointer text-sm">Close</button>
          <button className="text-white bg-purple-500 px-4 py-2 rounded-sm cursor-pointer text-sm">Add Note</button>
        </div>
      </form>
    </div>
  )
}
