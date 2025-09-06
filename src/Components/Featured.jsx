import React from 'react'
import testf1 from '/testf1.png'
import testf2 from '/testf2.png'
import testf3 from '/testf3.png'
import testf4 from '/testf4.png'

import { fetchProperties } from '../Services/api'
import { useState ,useEffect } from 'react'

function Featured() {

const [featured , setFeatured] = useState([]);

useEffect(() =>{
  (async () =>{
    try {
      const data = await fetchProperties();
      setFeatured(data.slice(0,8))
      
    } catch (error) {
      console.log("Failed to fetch Featured data",error);
      
    }
  })();
},[]);

  if (featured.length < 4) return null;



  return (
    <div className='mt-25'>
      <div className='flex justify-between px-10 py-4 '>
        <p className='text-5xl text-blue-900 font-bold mb-2'>
          Featured Property
        </p>
        <button className="bg-white px-3 py-1 rounded-full border border-blue-900 shadow-md font-medium text-blue-700 text-1.75xl hover:bg-gray-50 h-[47px] w-[260px] flex justify-center items-center gap-2">
          See 268 New Projects <i className="bi bi-arrow-up-right color-blue-900"></i>
        </button>
      </div>

      {/* Featured Images Block */}
      <div className='flex items-center justify-center gap-5 mt-15'>
        <div className='flex items-center justify-center gap-5'>

          {/* First image with overlay */}
          <div className="relative">
            <img
              className='w-[650px] h-[478px]'
              src={featured[0].image}
              alt={featured[0].name}
            />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium">{featured[0].name}</p>
              <p className="text-lg font-semibold">{featured[0].country}, {featured[0].city}</p>
            </div>
          </div>

          <img
            
            className='w-[307px] h-[478px]'
            src={featured[1].image}
            alt={featured[1].name}
          />
        </div>

        <div className='flex flex-col gap-5'>
          <img
            src={featured[4].image}
            alt={featured[4].name}
            className='w-[309px] h-[226px]'
            
          />
          <img
            src={featured[6].image}
            alt={featured[6].name}
            className='w-[309px] h-[226px]'
            
          />
        </div>
      </div>
    </div>
  )
}

export default Featured
