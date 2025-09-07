import React from 'react'
import email from '/email.png'
import eye from '/eye.png'
import loginbanner from '/loginbanner.png'

function Signin() {
  return (
    <div className="flex min-h-screen mb-16">
      {/* Left Form Section */}
      <div className="flex flex-col justify-center w-1/2 px-20 bg-white">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center ">
          Create new account
        </h1>

        {/* Name */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-2">Name</p>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter Your Email Id"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <img
              src={email}
              alt="email icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-4"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <img
              src={eye}
              alt="toggle password"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-2">Confirm Password</p>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Your Password"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <img
              src={eye}
              alt="toggle password"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-4 cursor-pointer"
            />
          </div>
        </div>
        <div className='flex item-center justify-center'>
            {/* Button */}
        <button className=" bg-blue-900 text-white py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition w-[417px] ">
          Create Account
        </button>

        </div>

        

        {/* Footer */}
        <p className="mt-6 text-gray-600 text-sm text-center">
          Already have an account?{" "}
          <span className="text-blue-700 font-medium cursor-pointer hover:underline ">
            Log In
          </span>
        </p>
      </div>

      {/* Right Image Section */}
      <div className="w-1/2">
        <img
          src={loginbanner}
          alt="login banner"
          className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
        />
      </div>
    </div>
  )
}

export default Signin
