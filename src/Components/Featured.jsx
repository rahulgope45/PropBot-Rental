import React, { useState, useEffect } from 'react'
import { fetchProperties } from '../Services/api'

function Featured() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProperties();
        setFeatured(data.slice(0, 25));
      } catch (error) {
        console.log("Failed to fetch Featured data", error);
      }
    })();
  }, []);

  if (featured.length < 7) return null;

  return (
    <div className="mt-25">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4  px-6 sm:px-25 py-4">
        <p className="text-3xl sm:text-5xl text-blue-900 font-bold">
          Featured Property
        </p>
        <button className="bg-white px-3 py-1 rounded-full border border-blue-900 shadow-md 
                           font-medium text-blue-700 text-base sm:text-xl 
                           hover:bg-gray-50 h-[42px] sm:h-[47px] w-full sm:w-[260px] 
                           flex justify-center items-center gap-2">
          See 268 New Projects <i className="bi bi-arrow-up-right color-blue-900"></i>
        </button>
      </div>

      {/* Featured Images Block */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-10 px-4 sm:px-0">
        {/* Left side big + medium image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {/* First image with overlay */}
          <div className="relative w-full sm:w-[650px] h-[250px] sm:h-[478px]">
            <img
              className="w-full h-full object-cover"
              src={featured[11].image}
              alt={featured[11].name}
            />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-medium">{featured[11].name}</p>
              <p className="text-base sm:text-lg font-semibold">
                {featured[11].country}, {featured[11].city}
              </p>
            </div>
          </div>

          {/* Second tall image */}
          <img
            className="w-full sm:w-[307px] h-[250px] sm:h-[478px] object-cover"
            src={featured[1].image}
            alt={featured[1].name}
          />
        </div>

        {/* Right side stacked images */}
        <div className="flex flex-col gap-5 w-full sm:w-auto">
          <img
            src={featured[4].image}
            alt={featured[4].name}
            className="w-full sm:w-[309px] h-[180px] sm:h-[226px] object-cover"
          />
          <img
            src={featured[6].image}
            alt={featured[6].name}
            className="w-full sm:w-[309px] h-[180px] sm:h-[226px] object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Featured
