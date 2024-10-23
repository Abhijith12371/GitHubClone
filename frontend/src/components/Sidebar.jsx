import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import Logout from "./Logout";
import { useAuthContext } from "../../context/AppContext";
import { SiGnuprivacyguard } from "react-icons/si";
const Sidebar = () => {
  const { authUser } = useAuthContext();
  return (
    <aside
      className="flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8 overflow-y-auto bg-glass"
    >
      <Link to="/" className="flex justify-center">
        <img src="/github.svg" className="h-8" alt="" />
      </Link>
      <Link to="/" className="mt-5 p-2  hover:bg-gray-800 rounded text-white">
        <AiFillHome size={20} />
      </Link>
      {
        !authUser &&(
          <Link to="/signup" className="p-2  hover:bg-gray-800 rounded">
            <SiGnuprivacyguard />
          </Link>
        )
      }
      {authUser && (
        <Link to="/likespage" className="p-2  hover:bg-gray-800 rounded">
          <FaHeart size={20} />
        </Link>
      )}
      <Link to="/explore" className="p-2  hover:bg-gray-800 rounded">
        <MdOutlineExplore size={20} />
      </Link>
      
      {authUser && (
        <div className="mt-auto">
          
          <Logout />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
