import React, { useContext } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'

import Sidebar from "./components/Sidebar"
import { Toaster } from 'react-hot-toast'

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignupPage"
import LikesPage from "./pages/LikesPage"
import ProfilePage from "./pages/ProfilePage"
import ExplorePage from "./pages/ExplorePage"
import { useAuthContext } from '../context/AppContext'

const App = () => {
  const {authUser,Loading}=useAuthContext()

  if(Loading) return null
  return (
    <div className='flex text-white'>
      <Sidebar />
      <Toaster/>
      <div className="max-w-5xl my-5 mx-auto flex-1 text-white font-bold">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
            <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
            <Route path='/explore' element={authUser?<ExplorePage/>:<Navigate to="/login"/>}/>
            <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
            <Route path='/LikesPage' element={authUser?<LikesPage/>:<Navigate to="/login"/>}/>
          </Routes>

      </div>
    </div>
  )
}

export default App
