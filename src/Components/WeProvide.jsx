import React from 'react'
import home1 from '/home1.png' 
import home2 from '/home2.png'
import icon3 from '/icon3.png' 
import icon4 from '/icon4.png' 
import icon5 from '/icon5.png' 

function WeProvide() {
  return (
    <div className="relative flex items-start mt-10 mb-40 gap-45 px-10">
      {/* Left Side (Images) */}
      <div className="relative">
        {/* First Image */}
        <img 
          src={home1} 
          alt="Home 1" 
          className="w-[510px] h-[533px] object-cover rounded-lg shadow-lg"
        />

        {/* Second Image Overlay */}
        <img 
          src={home2} 
          alt="Home 2" 
          className="absolute bottom-[-90px] right-[-110px] w-[408px] h-[405px] object-cover rounded-lg shadow-lg border-4 border-white"
        />
      </div>

      {/* Right Side (Text + Features) */}
      <div className="max-w-xl flex flex-col item-center justify-center">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-[45px] w-[659px] leading-snug text-blue-900 font-bold">
            We Provide Latest Properties 
          </p>
          <p className="text-[45px] leading-snug text-blue-900 font-bold">
            For Our Valuable Clients
          </p>
        </div>

        {/* Features */}
        <div className="space-y-8 ">
          {/* First */}
          <div className="flex gap-4">
            <img src={icon3} className="w-[49px] h-[57px]" />
            <div>
              <p className="text-2xl text-blue-900 font-bold mb-2">
                Budget Friendly
              </p>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur.<br/>
                Venenatis sed ac aenean tempus. Lectus quis<br/>
                pretium varius iaculis sed.
              </p>
            </div>
          </div>

          {/* Second */}
          <div className="flex gap-4">
            <img src={icon4} className="w-[41px] h-[41px]" />
            <div>
              <p className="text-2xl text-blue-900 font-bold mb-2">
                Trusted By Thousand
              </p>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur.<br/>
                Venenatis sed ac aenean tempus. Lectus quis<br/>
                pretium varius iaculis sed.
              </p>
            </div>
          </div>

          {/* Third */}
          <div className="flex gap-4">
            <img src={icon5} className="w-[48px] h-[38px]" />
            <div>
              <p className="text-2xl text-blue-900 font-bold mb-2">
                Prime Location
              </p>
              <p className="text-gray-600 leading-relaxed">
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
