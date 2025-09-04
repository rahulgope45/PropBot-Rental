import React from 'react'
import icon from '/icon.png'

function NavBar() {
  return (
    <div className='flex items-center justify-between px-10 py-6'>
      {/* Logo + Title */}
      <div className='flex h-16 items-center gap-3'>
        <img src={icon} alt='icon' className='h-12 w-12 object-contain' />
        <h1 className='text-2xl font-extrabold text-gray-800'>
          PropBot
        </h1>
      </div>

      {/* Menu Links */}
      <div className='flex h-16 items-center gap-6 text-gray-700 font-medium'>
        <p className='hover:text-blue-500 cursor-pointer'>Home</p>
        <p className='hover:text-blue-500 cursor-pointer'>Buy</p>
        <p className='hover:text-blue-500 cursor-pointer'>Rent</p>
        <p className='hover:text-blue-500 cursor-pointer'>Sell</p>
        <p className='hover:text-blue-500 cursor-pointer'>About Us</p>
        <p className='hover:text-blue-500 cursor-pointer'>Contact Us</p>
      </div>

      {/* Login Button */}
      <div>
        <button className='flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition'>
          Login / Register 
          <i className="bi bi-arrow-right-circle text-lg"></i>
        </button>
      </div>
    </div>
  )
}

export default NavBar
