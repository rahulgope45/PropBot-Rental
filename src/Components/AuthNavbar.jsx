import React from 'react'
import icon from '/icon.png'
import { NavLink } from 'react-router-dom'

function AuthNavbar() {
    return (
        <div className="flex items-center justify-between px-8 py-4 shadow-md bg-white mb-13">
            
            {/* Left: Back to Homepage (hidden on small screens) */}
            <div className="hidden sm:flex items-center gap-2 cursor-pointer hover:text-blue-700 transition border border-blue-900 rounded-full p-2">
                <i className="bi bi-arrow-left-circle text-gray-700 text-xl"></i>
                <NavLink className="text-gray-700 font-medium" to='/'>Back to Homepage</NavLink>
            </div>

            {/* Center: Logo + Title (always visible) */}
            <div className="flex items-center gap-3 mx-auto sm:mx-0">
                <img src={icon} alt="icon" className="h-12 w-12 object-contain" />
                <h1 className="text-2xl font-extrabold text-blue-900">PropBot</h1>
            </div>

            {/* Right: About Us (hidden on small screens) */}
            <div className="hidden sm:flex items-center gap-2 cursor-pointer hover:text-blue-700 transition bg-blue-900 rounded-full p-3">
                <NavLink className="text-white font-medium" to='/'>About Us</NavLink>
                <i className="bi bi-arrow-right-circle text-white text-xl"></i>
            </div>
        </div>
    )
}

export default AuthNavbar
