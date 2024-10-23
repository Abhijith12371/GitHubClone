import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaUnlockAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import handleGitHubSignup from '../../lib/functions'
const SignupPage = () => {

  return (
    <div className='flex rounded flex-col justify-center items-center px-6 py-8 mx-auto h-screen'>
      <div className="flex justify-center align-middle flex-col signup bg-glass  shadow w-[50%]">
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h1 className='text-xl font-bold md:text-2xl text-center'>Create Account</h1>
					<button
						type='button'
						onClick={handleGitHubSignup}
						className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4
						focus:ring-[#24292F]/50 font-medium rounded-lg flex gap-2 p-2 items-center w-full 
						text-center justify-center'
					>
						<FaGithub className='w-5 h-5' />
						Sign up with Github
					</button>
          <p className='text-gray-300 text-[12px]'>
						By signing up, you will unlock all the features of the app.
						<span>
							<FaUnlockAlt className='w-4 h-4 inline mx-2' />
						</span>
					</p>
					<p className='text-sm font-light text-gray-500'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-primary-600 hover:underline text-blue-600'>
							Login
						</Link>
					</p>
          </div>
      </div>
    </div>
  )
}

export default SignupPage
