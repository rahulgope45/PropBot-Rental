import React from 'react'
import banner1 from '/banner1.png'
import Geo1 from '/Geo1.png'
import search1 from '/search1.png'
import Featured from '../Components/Featured'
import Aboutus from '../Components/Aboutus'
import BestProperty from '../Components/BestProperty'
import PerfectRentedH from '../Components/PerfectRentedH'
import StartYourJ from '../Components/StartYourJ'
import WeProvide from '../Components/WeProvide'
import nativebanner from '/nativebanner.jpg'

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
            className="hidden sm:block w-full h-full object-cover rounded-xl z-0"
          />
          <img
            src={nativebanner}
            alt="native banner"
            className="block sm:hidden w-full h-full object-cover rounded-xl z-0"
          />

          {/* Banner text */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[15%] z-35 text-white text-center mx-auto 
                          w-[90%] sm:w-[900px]">
            <p className="text-2xl sm:text-5xl font-bold mb-2">
              Find Your Dream Home in One Click!
            </p>
            <p className="text-sm sm:text-lg">
              Discover, Buy, or Rent Verified Properties with Ease.
            </p>
          </div>

          {/* Search + List Property buttons */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 z-20 flex flex-col sm:flex-row items-center  gap-6 sm:gap-100">

            {/* Search box overlay */}
            
            <div className="w-[92%] max-w-[820px]">
              <div className="flex items-center gap-1 sm:gap-4 bg-white 
                  px-2 sm:px-6 
                  h-[50px] sm:h-[72px] 
                  border rounded-lg shadow-lg">

                {/* Left geo icon */}
                <img
                  src={Geo1}
                  alt="geo"
                  className="h-4 w-4 sm:h-6 sm:w-6 object-contain flex-shrink-0"
                />

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search Location"
                  className="flex-1 w-full px-2 sm:px-4 
                 text-gray-900 focus:outline-none 
                 text-sm sm:text-base"
                />

                {/* Right search icon */}
                <img
                  src={search1}
                  alt="search"
                  className="h-4 w-4 sm:h-6 sm:w-6 object-contain cursor-pointer flex-shrink-0"
                />
              </div>
            </div>


            {/* List Your Property button */}
            <button className="bg-white px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-blue-900 shadow-md 
                               font-medium text-blue-700 text-sm sm:text-xl hover:bg-gray-50 
                               h-[50px] w-[194px] sm:h-[62px] sm:w-[450px] flex justify-center items-center">
              List Your Property
            </button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div>
        <Aboutus />
      </div>
      <div>
        <Featured />
      </div>
      <div>
        <BestProperty />
      </div>
      <div>
        <PerfectRentedH />
      </div>
      <div>
        <StartYourJ />
      </div>
      <div>
        <WeProvide />
      </div>
    </div>
  )
}

export default Home
