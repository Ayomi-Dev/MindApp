import React from 'react'
import { FaSearch } from 'react-icons/fa'

export const Searchbar = () => {
  return (
    <div className="flex h-[50%] w-[30%] md:w-[25%] px-1 relative justify-start items-center rounded-sm bg-gray-200">
      <input type="text" className="border-none ml-4 outline-none w-full h-full placeholder:text-gray-400 text-xs md:text-sm" 
          placeholder="Search notes..." 
      />
      <FaSearch className="text-gray-400 text-xl absolute pr-2" />
    </div>
  )
}
