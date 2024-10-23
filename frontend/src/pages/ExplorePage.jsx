import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Repos from '../components/Repos';


const ExplorePage = () => {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  
  
  const fetchRepos = useCallback(async (language="javascript") => {
    setLoading(true); 
    try {
      const res = await fetch(
        `http://localhost:5000/explore/${language}`
      );
      const data = await res.json();
      setRepos(data.items || []); 
    } catch (err) {
      toast.error('An error occurred while fetching the repositories');
    } finally {
      setLoading(false); 
    }
  },[]);
  useEffect(()=>{
    fetchRepos()
  },[fetchRepos])
  
  return (
    <div>
      <h1 className='text-center'>Explore Popular Repositories</h1>
      
      {/* Programming Language Icons */}
      <div className="flex justify-center items-center gap-2 my-5 bg-glass w-1/2 mx-auto">
        <img
          src="/javascript.svg"
          className="w-16 cursor-pointer"
          alt="JavaScript"
          onClick={() => fetchRepos('javascript')} // Wrap fetchRepos call in a function
        />
        <img
          src="/typescript.svg"
          className="w-16 cursor-pointer"
          alt="TypeScript"
          onClick={() => fetchRepos('typescript')}
        />
        <img
          src="/c++.svg"
          className="w-16 cursor-pointer"
          alt="C++"
          onClick={() => fetchRepos('c++')}
        />
        <img
          src="/python.svg"
          className="w-16 cursor-pointer"
          alt="Python"
          onClick={() => fetchRepos('python')}
        />
        <img
          src="/java.svg"
          className="w-16 cursor-pointer"
          alt="Java"
          onClick={() => fetchRepos('java')}
        />
      </div>

      {/* Conditional Rendering */}
      {loading ? (
       <p>Loading...</p>
      ) : (
        <div className='flex justify-center items-center flex-col'>
          <div className="flex items-center gap-4 align-middle w-[200px]">
        <p className='bg-teal-600 mb-3 text-center w-24  rounded py-2  text-white'>{repos[0].language}</p>
        <h3 className='mb-3 py-2'>Repositories</h3>
          </div>
        <Repos repos={repos} /> 
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
