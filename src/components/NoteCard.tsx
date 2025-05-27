import React from 'react'
import { MdNoteAdd } from 'react-icons/md'

export const NoteCard = () => {
  return (
    <div className="bg-indigo-200 rounded-md p-2 flex-[1_1_100%] md:flex-[1_1_calc(30%_-_1rem)] min-h-[100px]">
    
                <span className="text-gray-400 text-xs">26/05/2025</span>
                <div className="flex flex-1 justify-between items-center py-2">
                  <h3 className="text-black">Holiday Shopping</h3>
                  <MdNoteAdd className='text-xs text-black' />
                </div>
                <hr className="bg-gray-100 w-[95%] mx-auto text-gray-400" />
                <p className="text-xl text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                  Excepturi, sapiente at delectus illo quaerat porro cum quasi, 
                  voluptates omnis expedita repellendus. Eligendi neque 
                  repellat facere velit ipsam aut sed harum.
                </p>
              </div>
  )
}
