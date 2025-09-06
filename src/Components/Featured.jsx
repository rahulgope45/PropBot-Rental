import React from 'react'

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


    </div>
  )
}

export default Featured