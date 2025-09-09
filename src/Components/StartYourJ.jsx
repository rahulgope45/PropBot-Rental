import React from 'react'

function StartYourJ() {
  return (
    <div className="mt-20 flex flex-col items-center">
      {/* Upper text */}
      <div className="w-full max-w-[1440px] text-left px-4 sm:px-0">
        <h1 className="text-3xl sm:text-5xl text-blue-900 font-bold mb-2">
          Start Your Journey Today!
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Create a profile in seconds and find your ideal home.
        </p>
      </div>

      {/* Lower section */}
      <div className="mt-5 w-full max-w-[1440px] px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between 
                        bg-white overflow-hidden gap-4 sm:h-[80px]">
          {/* Name input */}
          <div className="w-full sm:w-[336px] flex items-center px-4 py-3 
                          border border-gray-300 font-medium text-gray-700 rounded-lg">
            <input
              className="w-full text-gray-900 focus:outline-none text-sm sm:text-base"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>

          {/* User Type */}
          <div className="w-full sm:w-[336px] flex items-center justify-between px-4 py-3 
                          border border-gray-300 font-medium rounded-lg">
            <p className="text-gray-400 text-sm sm:text-base">Select User Type</p>
            <i className="bi bi-chevron-down"></i>
          </div>

          {/* Location input */}
          <div className="w-full sm:w-[336px] flex items-center px-4 py-3 
                          border border-gray-300 font-medium text-gray-700 rounded-lg">
            <input
              className="w-full text-gray-900 focus:outline-none text-sm sm:text-base"
              type="text"
              placeholder="Enter Your Location"
            />
          </div>

          {/* Button */}
          <div className="w-full sm:w-[336px] flex items-center justify-center">
            <button className="w-full px-6 py-3 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartYourJ
