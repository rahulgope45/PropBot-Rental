import React from 'react'
import icon from '/icon.png'
import external1 from '/external1.png'
import house1 from '/house1.png'
import { NavLink } from 'react-router-dom'


function NavBar() {
  return (
    <div className="flex items-center justify-between px-10 py-6">
      {/* Logo + Title */}
      <div className="flex h-16 items-center gap-3">
        <img src={icon} alt="icon" className="h-12 w-12 object-contain" />
        <h1 className="text-2xl font-extrabold text-gray-800">PropBot</h1>
      </div>

      {/* Menu Links */}
      <div className="flex h-16 items-center gap-6 text-gray-700 font-medium">
        <NavLink to="/" className="hover:text-blue-700 cursor-pointer">Home</NavLink>
        <NavLink to="/buy" className="hover:text-blue-700 cursor-pointer">Buy</NavLink>
        <p className="hover:text-blue-700 cursor-pointer">Rent</p>
        <p className="hover:text-blue-700 cursor-pointer">Sell</p>
        <p className="hover:text-blue-700 cursor-pointer">About Us</p>
        <p className="hover:text-blue-700 cursor-pointer">Contact Us</p>
      </div>

      {/* Login Button */}
      <div>
        <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition">
          Login / Register
          <i className="bi bi-arrow-right-circle text-lg"></i>
        </button>
      </div>

      {/* Lower Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 z-20">
        <div className="flex  items-center justify-center bg-white rounded-full border border-gray-300 shadow-lg overflow-hidden w-[1106px] h-[80px] gap-4 shadow">
          {/* Each filter option */}
          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            {/* Left Side: Icon + Text */}
            <div className="flex items-center gap-2">
              <img src={external1} className='h-5 w-5 object-contain' />
              <p>For Rent</p>
            </div>

            {/* Right Side: Chevron */}
            <div className="ml-6" >
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            {/* Left Side: Icon + Text */}
            <div className="flex items-center gap-2">
              <img src={house1} className='h-5 w-5 object-contain' />
              <p>House</p>
            </div>

            {/* Right Side: Chevron */}
            <div className="ml-6">
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            {/* Left Side: Icon + Text */}
            <div className="flex items-center gap-2">
              <i className="bi bi-crosshair"></i>
              <p>Location</p>
            </div>

            {/* Right Side: Chevron */}
            <div className="ml-6">
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
          {/* Button */}
          <div className="w-[243px] flex items-center justify-center">
            <button className="w-full px-6 py-3 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition">
              Find Property
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
