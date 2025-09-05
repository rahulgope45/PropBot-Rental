import React from 'react'
import banner1 from '/banner1.png'
import Geo1 from '/Geo1.png'
import search1 from '/search1.png'
import Featured from '../Components/Featured'

function Home() {
  return (
    <div>
      <div className="flex justify-center items-center mb-10">
      {/* relative container sized to the banner */}
      <div className="relative w-[1334px] h-[527px] max-w-full">
        {/* banner image */}
        <img
          src={banner1}
          alt="banner"
          className="w-full h-full object-cover rounded-xl z-0"
        />

        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 z-20 flex gap-100">
        {/* Search box overlay - centered, sits above image */}
        <div className=" w-[90%] max-w-[820px]">
          <div className="flex items-center gap-4 bg-white px-6 py-4 h-[72px] border rounded-lg shadow-lg">
            <img src={Geo1} alt="geo" className="h-6 w-6 object-contain" />
            <input
              type="text"
              placeholder="Search Location"
              className="flex-1 px-4 py-2 rounded-full text-gray-900 focus:outline-none"
            />
            <img src={search1} alt="search" className="h-6 w-6 object-contain cursor-pointer" />
          </div>
        </div>

        {/* List Your Property overlay - a bit lower than the search box */}
        <button className="bg-white px-3 py-1 rounded-full border border-blue-900 shadow-md font-medium text-blue-700 text-1.75xl hover:bg-gray-50 h-[62px] w-[450px] flex justify-center items-center">
          List Your Property
        </button>

        </div>
          
        </div>


        
      
    </div>

    {/* About Us Section */}
        <div>
          <Featured/>
        </div>
    </div>
  )
}

export default Home
