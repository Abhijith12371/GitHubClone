import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = ({OnSearch}) => {
  const [search,setSearch]=useState(null)
  return (
    <div className='flex justify-center mt-4'>
      <form action="" className='relative flex items-center w-[50%] max-w-lg bg-glass px-4 py-2 rounded-lg shadow-lg' onSubmit={e=>OnSearch(e,search)} >
        <FaSearch className='hover:cursor-pointer text-white mr-2' />
        <input 
        onChange={e=>setSearch(e.target.value)}
          type="text" 
          className='flex-grow bg-transparent border-none py-2 px-4 outline-none text-white placeholder-gray-500' 
          placeholder='Search here' 
        />
        <button 
          type="submit" 
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300'
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search