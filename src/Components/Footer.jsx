import React from 'react'
import icon2 from '/icon2.png'

function Footer() {
  return (
    <div className='bg-blue-900/80 text-white '>
      {/* Newsletter Section */}
      <div className='max-w-6xl mx-auto px-6 py-12 text-center'>
        <h1 className='text-5xl font-bold mb-6'>Get in Touch with Us</h1>
        <p className='text-gray-200  text-3xl'>Subscribe now for exclusive</p>
        <p className='text-gray-200 mb-6 text-3xl'>Property insights and deals!</p>

        <div className='flex justify-center items-center gap-3 max-w-lg mx-auto bg-gray-200 px-6 py-2 rounded-full '>
          <input
            type='email'
            placeholder='Enter Your Email'
            className='w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none'
          />
          <button className='flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition'>
            Submit
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className='mt-20 '>
        <div className='max-w-7xl mx-auto px-5 py-7 flex flex-col md:flex-row items-center justify-between gap-7 space-y-6'>
          
          {/* Logo + Title */}
          <div className='flex items-center gap-3'>
            <img src={icon2} alt='icon' className='h-12 w-12 object-contain' />
            <h1 className='text-2xl font-extrabold'>PropBot</h1>
          </div>

          {/* Menu Links */}
          <div className='flex gap-6 text-gray-200 font-medium'>
            <p className='hover:text-blue-300 cursor-pointer'>For Sale</p>
            <p className='hover:text-blue-300 cursor-pointer'>Rentals</p>
            <p className='hover:text-blue-300 cursor-pointer'>New Projects</p>
            <p className='hover:text-blue-300 cursor-pointer'>Property News</p>
          </div>

          {/* Copyright */}
          <div className='text-white text-sm text-center md:text-right'>
            © 2025 PropBot. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
