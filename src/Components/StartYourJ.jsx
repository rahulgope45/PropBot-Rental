import React from 'react'

function StartYourJ() {
    return (
        <div className='mt-20 flex flex-col items-center'>
            {/* Upper text aligned with lower section left */}
            <div className="w-[1440px] text-left">
                <h1 className='text-5xl text-blue-900 font-bold mb-2'>
                    Start Your Journey Today!
                </h1>
                <p className='text-gray-600'>
                    Create a profile in seconds and find your ideal home.
                </p>
            </div>

            {/* Lower section */}
            <div className="mt-5 w-[1440px]">
                <div className="flex items-center justify-between bg-white overflow-hidden h-[80px] gap-4">
                    
                    {/* Name input */}
                    <div className="w-[336px] flex items-center px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-lg">
                        <input 
                            className="w-full text-gray-900 focus:outline-none"
                            type='text'
                            placeholder='Enter Your Name'
                        />
                    </div>

                    {/* User Type */}
                    <div className="w-[336px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium  rounded-lg">
                        <p className='text-gray-400'>Select User Type</p>
                        <i className="bi bi-chevron-down"></i>
                    </div>

                    {/* Location input */}
                    <div className="w-[336px] flex items-center px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-lg">
                        <input 
                            className="w-full text-gray-900 focus:outline-none"
                            type='text'
                            placeholder='Enter Your Location'
                        />
                    </div>

                    {/* Button */}
                    <div className="w-[336px] flex items-center justify-center">
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
