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
import { NavLink } from 'react-router-dom'
import Select from 'react-select';

function Home() {

const LocationOptions = [
  { value: "hingewadi-pune", label: "Hingewadi, Pune" },
  { value: "akurdi-pune", label: "Akurdi, Pune" },
  { value: "kothrud-pune", label: "Kothrud, Pune" },
  { value: "bandra-mumbai", label: "Bandra, Mumbai" },
  { value: "andheri-mumbai", label: "Andheri, Mumbai" },
  { value: "dadar-mumbai", label: "Dadar, Mumbai" },
  { value: "saket-delhi", label: "Saket, Delhi" },
  { value: "karolbagh-delhi", label: "Karol Bagh, Delhi" },
  { value: "koramangala-bangalore", label: "Koramangala, Bangalore" },
  { value: "indiranagar-bangalore", label: "Indiranagar, Bangalore" },
  { value: "saltlake-kolkata", label: "Salt Lake, Kolkata" },
  { value: "newtown-kolkata", label: "New Town, Kolkata" },
];


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
            
            <div className="">
              <div className="flex items-center gap-1 sm:gap-4 bg-white 
                  px-2 sm:px-6 
                  h-[50px] sm:w-[520px] sm:h-[72px] 
                  border rounded-lg shadow-lg relative">

                {/* Left geo icon */}
                <img
                  src={Geo1}
                  alt="geo"
                  className="h-4 w-4 sm:h-6 sm:w-6 object-contain flex-shrink-0"
                />

                
                <Select
                placeholder="Search Location"
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      minHeight: "unset",
                      cursor: "pointer",
                      position: "relative",
                      width:"450px"
                      

                    }),
                    dropdownIndicator: () => ({
                      display: "none"

                    }),
                    indicatorSeparator: () => ({
                      display: "none",             // remove separator line
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",     // rounded-lg
                      marginTop: "0.5rem",
                      width:"400px"
                    }),


                  }}
                  options={LocationOptions} 
                />

                {/* Right search icon */}
                <img
                  src={search1}
                  alt="search"
                  className="h-4 w-4 sm:h-6 sm:w-6 object-contain cursor-pointer absolute right-[30px] top-1/2 -translate-y-1/2"
                />
              </div>
            </div>


            {/* List Your Property button */}
            <NavLink className="bg-white px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-blue-900 shadow-md 
                               font-medium text-blue-700 text-sm sm:text-xl hover:bg-blue-900 hover:text-white
                               h-[50px] w-[194px] sm:h-[62px] sm:w-[250px] flex justify-center items-center
                               cursor-pointer"
                               to="/sell"
                               >
              List Your Property
            </NavLink>
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
