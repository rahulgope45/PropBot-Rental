import React, { useState } from 'react'

import email from '/email.png'
import eye from '/eye.png'
import loginbanner from '/loginbanner.png'
import google from '/google.png'
import facebook from '/facebook.png'
import apple from '/apple.png'

function Login() {
    const [isChecked, setIsChecked] = useState(false);
    const handleChecked = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className="flex min-h-screen mb-16">
            {/* Left Form Section */}
            <div className="flex flex-col justify-center w-1/2 px-20 bg-white">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center ">
                    Log In
                </h1>



                {/* Email */}
                <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter Your Email Id"
                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <img
                            src={email}
                            alt="email icon"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-4"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <img
                            src={eye}
                            alt="toggle password"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-4 cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 mb-6">
                    {/* Remember me */}
                    <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleChecked}
                            className="cursor-pointer"
                        />
                        Remember me
                    </label>

                    {/* Forgot password */}
                    <p className="text-red-500 text-sm font-medium cursor-pointer hover:underline">
                        Forgot Password?
                    </p>
                </div>


                <div className='flex item-center justify-center'>
                    {/* Button */}
                    <button className=" bg-blue-900 text-white py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition w-[417px] ">
                        Log In
                    </button>

                </div>


                {/* Icon section */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500 font-medium">OR CONTINUE WITH</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>
                <div className='flex items-center justify-center gap-14 mt-5 mb-20'>
                    <img
                    src={apple}
                    className='w[31px] h-[37px] '
                    />
                    <img
                    src={facebook}
                    className='w[31px] h-[37px] '
                    />
                    <img
                    src={google}
                    className='w[31px] h-[37px] '
                    />
                </div>




                {/* Footer */}
                <p className="mt-6 text-gray-600 text-xl text-center font-bold">
                    Don't have an account?{" "}
                    <span className="text-blue-700 font-bold cursor-pointer hover:underline text-xl ">
                        Create One
                    </span>
                </p>
            </div>

            {/* Right Image Section */}
            <div className="w-1/2">
                <img
                    src={loginbanner}
                    alt="login banner"
                    className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
                />
            </div>
        </div>
    )
}

export default Login