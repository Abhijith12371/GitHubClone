import React from 'react';

const SortRepos = ({onSort,sortType}) => {
  return (
    <div className='relative flex justify-end items-center'>
      <button 
        className={`px-4 py-2 mr-2 mt-2 rounded hover:cursor-pointer bg-glass 
          ${sortType === 'recent' ? 'border-blue-500 ' : 'border-transparent'}`}
        onClick={() => onSort("recent")}
        aria-label="Sort by most recent"
      >
        Most Recent
      </button>
      <button 
        className={`px-4 py-2 mr-2 mt-2 rounded hover:cursor-pointer border bg-glass
          ${sortType === 'stars' ? 'border-2 border-blue-500' : 'border-transparent'}`}
        onClick={() => onSort("stars")}
        aria-label="Sort by most stars"
      >
        Most Stars
      </button>
      <button 
        className={`px-4 py-2 mr-2 mt-2 rounded hover:cursor-pointer bg-glass
          ${sortType === 'forks' ? 'border-2 border-blue-500 ' : 'border-transparent'}`}
        onClick={() => onSort("forks")}
        aria-label="Sort by most forks"
      >
        Most Forks
      </button>
    </div>
  );
};

export default SortRepos;
