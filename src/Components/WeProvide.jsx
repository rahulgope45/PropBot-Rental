import React from 'react'
import home1 from '/home1.png' 
import home2 from '/home2.png'
import icon3 from '/icon3.png' 
import icon4 from '/icon4.png' 
import icon5 from '/icon5.png' 

function WeProvide() {
  return (
    <div className="relative flex flex-col sm:flex-row items-center sm:items-start mt-10 mb-40 gap-10 sm:gap-75 px-4 sm:px-10">
      {/* Left Side (Images) */}
      <div className="relative flex justify-center sm:block">
        {/* First Image */}
        <img 
          src={home1} 
          alt="Home 1" 
          className="w-[280px] h-[300px] sm:w-[510px] sm:h-[533px] object-cover rounded-lg shadow-lg"
        />

        {/* Second Image Overlay */}
        <img 
          src={home2} 
          alt="Home 2" 
          className="absolute bottom-[-40px] right-[-40px] sm:bottom-[-90px] sm:right-[-110px] 
                     w-[200px] h-[200px] sm:w-[408px] sm:h-[405px] object-cover rounded-lg shadow-lg border-4 border-white"
        />
      </div>

      {/* Right Side (Text + Features) */}
      <div className="max-w-xl flex flex-col items-center sm:items-center text-center sm:text-left mt-20 sm:mt-0">
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <p className="text-2xl sm:text-[45px] leading-snug text-blue-900 font-bold sm:w-[659px]">
            We Provide Latest Properties 
          </p>
          <p className="text-2xl sm:text-[45px] leading-snug text-blue-900 font-bold">
            For Our Valuable Clients
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6 sm:space-y-8 w-full">
          {/* First */}
          <div className="flex gap-4">
            <img src={icon3} className="w-[35px] h-[40px] sm:w-[49px] sm:h-[57px]" />
            <div>
              <p className="text-lg sm:text-2xl text-blue-900 font-bold mb-2">
                Budget Friendly
              </p>
              <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur.<br/>
                Venenatis sed ac aenean tempus. Lectus quis<br/>
                pretium varius iaculis sed.
              </p>
            </div>
          </div>

          {/* Second */}
          <div className="flex gap-4">
            <img src={icon4} className="w-[30px] h-[30px] sm:w-[41px] sm:h-[41px]" />
            <div>
              <p className="text-lg sm:text-2xl text-blue-900 font-bold mb-2">
                Trusted By Thousand
              </p>
              <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur.<br/>
                Venenatis sed ac aenean tempus. Lectus quis<br/>
                pretium varius iaculis sed.
              </p>
            </div>
          </div>

          {/* Third */}
          <div className="flex gap-4">
            <img src={icon5} className="w-[32px] h-[25px] sm:w-[48px] sm:h-[38px]" />
            <div>
              <p className="text-lg sm:text-2xl text-blue-900 font-bold mb-2">
                Prime Location
              </p>
              <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur.<br/>
                Venenatis sed ac aenean tempus. Lectus quis<br/>
                pretium varius iaculis sed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeProvide
