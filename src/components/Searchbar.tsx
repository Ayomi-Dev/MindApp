import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNoteContext } from '../context/NoteContext'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../context/ThemeContext'

export const Searchbar = () => {
  const { notes, setSerachResults } = useNoteContext();

  const { darkMode } = useThemeContext()

  const [searchInput, setSearchInput] = useState<string>('');

  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      handleSearch(searchInput)
    }
    else if(e.key == 'Escape'){
      setSearchInput('')
      setSerachResults([])
      navigate('/')
    }
  }

  const handleSearch = (query: string) => {
    const searchValue = notes.filter(note => {
      return note.title.toLowerCase().includes(query.toLowerCase())
    })
    if(query.trim() !== '') {
      setSerachResults(searchValue)
      navigate('/search')
    }
    else {
      setSerachResults([])
      navigate('/')
    }
    
  }
  return (
    <div className="flex h-[50%] w-[50%] md:w-[25%] gap-2 px-1 relative md:justify-start justify-between items-center rounded-sm bg-gray-200">
      <input type="text" className={`${darkMode ? 'text-black font-bold' : ''} border-none ml-4 outline-none w-full h-full placeholder:text-gray-400 text-xs md:text-sm `}
          placeholder="Search notes..." 
          value={searchInput.trim()}
          onChange={(e)=> {
            const value = e.target.value
            setSearchInput(value)
            handleSearch(value)
          }}
          onKeyDown={handleKeyDown}
      />
      <FaSearch className="text-gray-400 text-xl absolute pr-2" onClick={() => handleSearch(searchInput)} />
    </div>
  )
}
