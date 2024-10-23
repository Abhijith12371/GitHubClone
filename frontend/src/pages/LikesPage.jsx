import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/likes", { credentials: "include" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        // console.log("Fetched likes data:", data);
        setLikes(data.likedBy); // Update this line to set likes from likedBy array
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    getLikes();
  }, []);

  return (
    <div className='relative flex justify-center align-middle items-center mx-auto'>
      <table className='bg-glass w-full'>
        <thead className='bg-glass'>
          <tr className='bg-glass'>
            <th scope='col' className='border border-gray-600 border-b-2 rounded px-6 py-3'>No</th>
            <th scope='col' className='border border-gray-600 border-b-2 rounded px-6 py-3'>Username</th>
            <th scope='col' className='border border-gray-600 border-b-2 rounded px-6 py-3'>Date</th>
            <th scope='col' className='border border-gray-600 border-b-2 rounded px-6 py-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            likes.map((user, idx) => {
              return (
                <tr className='bg-glass' key={user._id}>
                  <td className='bg-slate-800 px-3 py-3 border border-gray-500'>
                    <span>{idx + 1}</span>
                  </td>
                  <td className='bg-slate-800 px-3 py-3 border border-gray-500'>
                    <div>{user.username}</div>
                  </td>
                  <td className='bg-slate-800 px-3 py-3 border border-gray-500'>
                    <div>{new Date(user.likedDate).toLocaleString()}</div> {/* Format the date */}
                  </td>
                  <td className='bg-slate-800 px-3 py-3 border border-gray-500'>
                    <div className='flex gap-2 items-center'>
                      <FaHeart className='text-red-600' />
                      <p>Liked</p>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default LikesPage;
