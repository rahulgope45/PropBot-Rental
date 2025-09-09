import React from 'react'
import { fetchProperties } from '../Services/api'
import { useState, useEffect } from 'react'
import icon6 from '/icon6.png'


function BestProperty() {


  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProperties();
        setFeatured(data.slice(0, 8))

      } catch (error) {
        console.log("Failed to fetch Featured data", error);

      }
    })();
  }, []);

  if (featured.length < 4) return null;



  return (
    <div className='mt-25'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4  px-6 sm:px-10 py-4 '>
        <p className='text-3xl sm:text-5xl text-blue-900 font-bold '>
          Best Properties Available For Sale
        </p>
        <button className="bg-blue-900 px-3 py-1 rounded-full border border-blue-900 shadow-md 
                           font-medium text-white text-base sm:text-xl 
                           hover:bg-blue-700 h-[42px] sm:h-[47px] w-full sm:w-[260px] 
                           flex justify-center items-center gap-2">
          View More Properties
        </button>
      </div>
      <div className="text-left px-10 mb-15 ">
        <p className='text-2xl text-gray-500 font-semibold mt-5'>
          Browse our top-rated properties for sale, featuring premium listings tailored to<br/> your needs. Find your dream home today!
        </p>
      </div>
      <div className="flex flex-wrap gap-6 justify-center px-10">
        {/* Property Card 1*/}
        <div className="h-[440px] w-[341px] bg-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <img
            className="w-full h-[200px] object-cover rounded-t-2xl p-2"
            src={featured[0].image}
            alt={featured[0].name}
          />

          {/* Content */}
          <div className="p-4 flex flex-col h-[240px]">
            {/* Location + Rating */}
            <div className="flex items-center justify-between mb-3">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <img src={icon6} alt="location" className="w-4 h-4" />
                <p className="font-medium text-gray-500">
                  {featured[0].state}, {featured[0].countryCode}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <i className="bi bi-star-fill text-yellow-400"></i>
                <p className="text-gray-600 text-sm font-medium">4.5/5</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-1.9xl mb-4 leading-relaxed">
              Spacious 3BHK apartment in a<br />prime location with modern<br />amenities.
            </p>

            {/* Footer (Button + Price) */}
            <div className="flex justify-between items-center ">
              <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              <p className="text-lg font-semibold text-gray-800">$450,000</p>
            </div>
          </div>
        </div>



        {/* Property Card 2*/}
        <div className="h-[440px] w-[341px] bg-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <img
            className="w-full h-[200px] object-cover rounded-t-2xl p-2"
            src={featured[1].image}
            alt={featured[1].name}
          />

          {/* Content */}
          <div className="p-4 flex flex-col h-[240px]">
            {/* Location + Rating */}
            <div className="flex items-center justify-between mb-3">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <img src={icon6} alt="location" className="w-4 h-4" />
                <p className="font-medium text-gray-500">
                  {featured[1].state}, {featured[1].countryCode}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <i className="bi bi-star-fill text-yellow-400"></i>
                <p className="text-gray-600 text-sm font-medium">4.5/5</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-1.9xl mb-4 leading-relaxed">
              Spacious 3BHK apartment in a<br />prime location with modern<br />amenities.
            </p>

            {/* Footer (Button + Price) */}
            <div className="flex justify-between items-center ">
              <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              <p className="text-lg font-semibold text-gray-800">$450,000</p>
            </div>
          </div>
        </div>




        {/* Property Card 3*/}
        <div className="h-[440px] w-[341px] bg-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <img
            className="w-full h-[200px] object-cover rounded-t-2xl p-2"
            src={featured[4].image}
            alt={featured[4].name}
          />

          {/* Content */}
          <div className="p-4 flex flex-col h-[240px]">
            {/* Location + Rating */}
            <div className="flex items-center justify-between mb-3">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <img src={icon6} alt="location" className="w-4 h-4" />
                <p className="font-medium text-gray-500">
                  {featured[4].state}, {featured[4].countryCode}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <i className="bi bi-star-fill text-yellow-400"></i>
                <p className="text-gray-600 text-sm font-medium">4.5/5</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-1.9xl mb-4 leading-relaxed">
              Spacious 3BHK apartment in a<br />prime location with modern<br />amenities.
            </p>

            {/* Footer (Button + Price) */}
            <div className="flex justify-between items-center ">
              <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              <p className="text-lg font-semibold text-gray-800">$450,000</p>
            </div>
          </div>
        </div>




        {/* Property Card 4*/}
        <div className="h-[440px] w-[341px] bg-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <img
            className="w-full h-[200px] object-cover rounded-t-2xl p-2"
            src={featured[6].image}
            alt={featured[6].name}
          />

          {/* Content */}
          <div className="p-4 flex flex-col h-[240px]">
            {/* Location + Rating */}
            <div className="flex items-center justify-between mb-3">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <img src={icon6} alt="location" className="w-4 h-4" />
                <p className="font-medium text-gray-500">
                  {featured[6].state}, {featured[6].countryCode}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <i className="bi bi-star-fill text-yellow-400"></i>
                <p className="text-gray-600 text-sm font-medium">4.5/5</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-1.9xl mb-4 leading-relaxed">
              Spacious 3BHK apartment in a<br />prime location with modern<br />amenities.
            </p>

            {/* Footer (Button + Price) */}
            <div className="flex justify-between items-center ">
              <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              <p className="text-lg font-semibold text-gray-800">$450,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestProperty