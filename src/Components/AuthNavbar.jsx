import React from 'react'
import icon from '/icon.png'

function AuthNavbar() {
    return (
        <div className="flex items-center justify-between px-8 py-4 shadow-md bg-white mb-13">
            
            {/* Left: Back to Homepage */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700 transition border border-blue-900 rounded-full p-2">
                <i className="bi bi-arrow-left-circle text-gray-700 text-xl"></i>
                <p className="text-gray-700 font-medium">Back to Homepage</p>
            </div>

            {/* Center: Logo + Title */}
            <div className="flex items-center gap-3">
                <img src={icon} alt="icon" className="h-12 w-12 object-contain" />
                <h1 className="text-2xl font-extrabold text-blue-900">PropBot</h1>
            </div>

            {/* Right: About Us */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700 transition bg-blue-900 rounded-full p-3">
                <p className="text-white font-medium">About Us</p>
                <i className="bi bi-arrow-right-circle text-white text-xl"></i>
            </div>
        </div>
    )
}

export default AuthNavbar
