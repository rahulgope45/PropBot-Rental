import React from 'react'
import card1 from '/card1.png'
import card2 from '/card2.png'
import card3 from '/card3.png'
import card4 from '/card4.png'

function Aboutus() {
  return (
    <div className='mt-25'>
      <div className="text-center mx-auto w-fit max-w-[90%] sm:max-w-[600px]">
  <p className="text-3xl sm:text-5xl text-blue-900 font-bold mb-2">
    What We Do?
  </p>
  <p className="text-lg sm:text-2xl text-gray-500">
    Helping You find, buy and rent the perfect
  </p>
  <p className="text-lg sm:text-2xl text-gray-500">
    property with ease.
  </p>
</div>

      
      {/* Card section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
        
        {/* 1st card */}
        <div className="w-full bg-gray-100 rounded-2xl shadow-md flex flex-col items-center justify-center text-center p-6 space-y-2">
          <img src={card1} className="h-20 w-20 object-contain bg-stone-300 p-3 rounded-full" />
          <p className='text-2xl font-semibold'>Buy & Sell</p>
          <p className='text-2xl font-semibold'>Properties</p>
          <p>Find verified homes for sale or list</p>
          <p>your property with ease.</p>
        </div>

        {/* 2nd card */}
        <div className="w-full bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center text-center p-6 space-y-2">
          <img src={card2} className="h-20 w-20 object-contain bg-stone-300 p-3 rounded-full" />
          <p className='text-2xl font-semibold'>Find Rental</p>
          <p className='text-2xl font-semibold'>Homes</p>
          <p>Browse through thousands of</p>
          <p>rental options suited to your needs.</p>
        </div>

        {/* 3rd card */}
        <div className="w-full bg-gray-100 rounded-2xl shadow-md flex flex-col items-center justify-center text-center p-6 space-y-2">
          <img src={card3} className="h-20 w-20 object-contain bg-stone-300 p-3 rounded-full" />
          <p className='text-2xl font-semibold'>Smart AI</p>
          <p className='text-2xl font-semibold'>Property Search</p>
          <p>Get instant recommendations</p>
          <p>based on your budget & location.</p>
        </div>

        {/* 4th card */}
        <div className="w-full bg-gray-100 rounded-2xl shadow-md flex flex-col items-center justify-center text-center p-6 space-y-2">
          <img src={card4} className="h-20 w-20 object-contain bg-stone-300 p-3 rounded-full" />
          <p className='text-2xl font-semibold'>Safe & Secure</p>
          <p className='text-2xl font-semibold'>Transactions</p>
          <p>Verified listings & secure deals to</p>
          <p>ensure a smooth experience.</p>
        </div>

      </div>
    </div>
  )
}

export default Aboutus
