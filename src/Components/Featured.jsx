import React from 'react'
import testf1 from '/testf1.png'
import testf2 from '/testf2.png'
import testf3 from '/testf3.png'
import testf4 from '/testf4.png'


function Featured() {
  return (
    <div className='mt-25'>
      <div className='flex justify-between px-10 py-4 '>
        <p className='text-5xl text-blue-900 font-bold mb-2'>
          Featured Property
        </p>
        <button className="bg-white px-3 py-1 rounded-full border border-blue-900 shadow-md font-medium text-blue-700 text-1.75xl hover:bg-gray-50 h-[47px] w-[260px] flex justify-center items-center gap-2">
        See 268 New Projects <i class="bi bi-arrow-up-right color-blue-900"></i>
        </button>
        
      </div>

      {/* Featured Images Block */}
        <div className='flex items-center justify-center gap-5 mt-15'>
          <div className='flex items-center justify-center gap-5'>
            <img
            className='w-[650px] h-[478px] '
            src={testf1}
            />
            <img
            src={testf2}
            className='w-[307px] h-[478px] '
            />
          </div>
          <div className='flex flex-col gap-5'>
            <img
            src={testf3}
            className='w-[309px] h-[226px] '
            />
            <img
            src={testf4}
            className='w-[309px] h-[226px] '
            />
          </div>

        </div>


    </div>
  )
}

export default Featured