import React from 'react'
import usericon from '/usericon1.png'

function Profile() {
  return (
    <div>
      <div className='flex items-center justify-center'>
      <div className="w-[560px] h-[312px] bg-blue-100 rounded-[25px] mb-20 p-6">
  <div className="flex items-end  mt-10">
    {/* User Icon */}
    <img
      src={usericon}
      alt="User Icon"
      className="w-[148px] h-[142px] rounded-full border-4 border-amber-50"
    />

    {/* Divider */}
    <div className="h-[142px] border-3 border-neutral-300 ml-5 "></div>

    {/* User Info */}
    <div className="flex flex-col items-start space-y-3 ml-8">
      <p className="text-[30px] text-neutral-600 font-bold">User : xxx</p>
      <p className="text-[30px] text-neutral-600 font-bold">User : xxx</p>
      <p className="text-[30px] text-neutral-600 font-bold">User : xxx</p>
    </div>
  </div>
</div>

    </div>
    </div>
  )
}

export default Profile