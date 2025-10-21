import React, { useState } from 'react'
import icon from '/icon.png'
import external1 from '/external1.png'
import house1 from '/house1.png'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { doSignOut } from '../firebase/auth'

function NavBar() {
  const { userLoggedIn } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await doSignOut()
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-6 relative">
      {/* Logo + Title */}
      <NavLink className="flex h-16 items-center gap-3" to="/">
        <img src={icon} alt="icon" className="h-12 w-12 object-contain" />
        <h1 className="text-2xl font-extrabold text-gray-800">PropBot</h1>
      </NavLink>

      {/* Desktop Menu Links */}
      <div className="hidden md:flex h-16 items-center gap-6 text-gray-700 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-700 cursor-pointer ${isActive ? 'border-b-2 border-blue-500 text-blue-700' : ''
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/buy"
          className={({ isActive }) =>
            `hover:text-blue-700 cursor-pointer ${isActive ? 'border-b-2 border-blue-500 text-blue-700' : ''
            }`
          }
        >
          Buy
        </NavLink>
        <p className="hover:text-blue-700 cursor-pointer">Rent</p>
        <NavLink
          to="/sell"
          className={({ isActive }) =>
            `hover:text-blue-700 cursor-pointer ${isActive ? 'border-b-2 border-blue-500 text-blue-700' : ''
            }`
          }>
          Sell
        </NavLink>
        <p className="hover:text-blue-700 cursor-pointer">About Us</p>
        <p className="hover:text-blue-700 cursor-pointer">Contact Us</p>
      </div>

      {/* Desktop Auth Button */}
      <div className="hidden md:block">
        {userLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition"
          >
            Logout
            <i className="bi bi-box-arrow-right text-lg"></i>
          </button>
        ) : (
          <NavLink
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition"
            to="/signup"
          >
            Login / Register
            <i className="bi bi-arrow-right-circle text-lg"></i>
          </NavLink>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-3xl text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col px-6 py-10 space-y-6 md:hidden">
          {/* Close button top-right */}
          <button
            className="absolute top-4 right-4 text-3xl text-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>

          {/* Links */}
          <NavLink to="/" className="block text-lg font-medium border-b pb-2">Home</NavLink>
          <NavLink to="/buy" className="block text-lg font-medium border-b pb-2">Buy</NavLink>
          <p className="block text-lg font-medium border-b pb-2">Rent</p>
          <p className="block text-lg font-medium border-b pb-2">Sell</p>
          <p className="block text-lg font-medium border-b pb-2">About Us</p>
          <p className="block text-lg font-medium border-b pb-2">Contact Us</p>

          {/* Auth */}
          <div className="mt-6">
            {userLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition"
              >
                Logout <i className="bi bi-box-arrow-right text-lg"></i>
              </button>
            ) : (
              <NavLink
                to="/signup"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition"
              >
                Login / Register
                <i className="bi bi-arrow-right-circle text-lg"></i>
              </NavLink>
            )}
          </div>
        </div>
      )}


      {/* Lower Search Bar (unchanged, just hidden on small) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-142 z-10 hidden md:flex">
        <div className="flex items-center justify-center bg-white rounded-full border border-gray-300 shadow-lg overflow-hidden 
                        w-[1106px] h-[80px] gap-4">
          {/* Each filter option */}
          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            <div className="flex items-center gap-2">
              <img src={external1} className="h-5 w-5 object-contain" />
              <p>For Rent</p>
            </div>
            <i className="bi bi-chevron-down ml-6"></i>
          </div>

          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            <div className="flex items-center gap-2">
              <img src={house1} className="h-5 w-5 object-contain" />
              <p>House</p>
            </div>
            <i className="bi bi-chevron-down ml-6"></i>
          </div>

          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            <div className="flex items-center gap-2">
              <i className="bi bi-crosshair"></i>
              <p>Location</p>
            </div>
            <i className="bi bi-chevron-down ml-6"></i>
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
