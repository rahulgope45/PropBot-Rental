import React from 'react'
import banner2 from '/banner2.png'
import Geo1 from '/Geo1.png'
import search1 from '/search1.png'
import Featuredbuy from '../Components/Featuredbuy'

function Buy() {
  return (
    <div>
      <div>
        <div className="flex justify-center items-center mb-10">
          {/* relative container sized to the banner */}
          <div className="relative w-[1334px] h-[527px] max-w-full">
            {/* banner image */}
            <img
              src={banner2}
              alt="banner"
              className="w-full h-full object-cover rounded-xl z-0"
            />
            

            <div className="absolute left-[500px] transform -translate-x-1/2 bottom-20 z-20 flex  ">
              {/* Search box overlay - centered, sits above image */}
              <div className=" w-[90%] max-w-[820px]">
                <div className=" gap-4  px-6 py-4 h-[72px] w-[900px] ">
                  <p className='text-white text-5xl font-bold'>
                    Featured Properties For Sale
                  </p>
                  <p className='text-white text-[20px]xl'>
                  Discover, Buy, or Rent Verified Properties with Ease.
                  </p>
                </div>
              </div>

              
             

            </div>
            {/* background blur */}
             <div className="absolute bottom-0 left-0 w-full h-[208px] w-[1328px] bg-gradient-to-t from-black/10 to-transparent backdrop-blur-[1.8px] rounded-xl"></div>


          </div>
        </div>
        <div>
          <Featuredbuy/>
        </div>




      </div>
    </div>
  )
}

export default Buy