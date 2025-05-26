import React from 'react'
import { FaFolder } from 'react-icons/fa6'

export const FolderCard = () => {
  return (
    <div>
        <div className="bg-blue-300 rounded-xl p-4">
            <FaFolder className='text-[3rem] py-4' />
            <h3 className="text-black mt-6">Movie Review</h3>
            <span className='py-2'>25/05/2025</span>
        </div>

        <div className="bg-blue-300 rounded-xl p-4">
            <FaFolder className='text-[3rem] py-4' />
            <h3 className="text-black mt-6">Movie Review</h3>
            <span className='py-2'>25/05/2025</span>
        </div>

        <div className="bg-blue-300 rounded-xl p-4">
            <FaFolder className='text-[3rem] py-4' />
            <h3 className="text-black mt-6">Movie Review</h3>
            <span className='py-2'>25/05/2025</span>
        </div>
    </div>
  )
}
