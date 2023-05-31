import React from 'react'

const BoardNavBar = () => {
  return (
    <div className='boardNavBar flex justify-between items-center p-[3rem]'>
      <div className='logoDiv'>
        <h1 className='logo text-[25px] text-blue-500'>
          <strong>Job</strong>Search</h1>
      </div>

      <div className='menu flex gap-8'>
        <li className='menuList text-[#6f6f6f] hover:text-blue-500'>Jobs</li>
        <li className='menuList text-[#6f6f6f] hover:text-blue-500'>Companies</li>
        <li className='menuList text-[#6f6f6f] hover:text-blue-500'>About</li>
        <li className='menuList text-[#6f6f6f] hover:text-blue-500'>Contact</li>
        <li className='menuList text-[#6f6f6f] hover:text-blue-500'>Blog</li>
        <li className='menuList text-[#6f6f6f] hover:text-blue-500'>Login</li>
         <li className='menuList text-[#6f6f6f] hover:text-blue-500'>Register</li>
        
      </div>
    </div>
  )
}

export default BoardNavBar