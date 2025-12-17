import React from 'react'
import { fetchProperties } from '../Services/api'
import { useState, useEffect } from 'react'
import Geo2 from '/Geo2.png'
import bookmark from '/bookmark.png'
import axios from 'axios'
import { PROPERTY_URL } from '../Services/consfig'

function Featuredbuy() {


    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchProperties();
                setFeatured(data.slice(0, 25))

            } catch (error) {
                console.log("Failed to fetch Featured data", error);

            }
        })();
    }, []);

    if (featured.length < 4) return null;




    return (
        <div className='mt-25 mb-60'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4  px-6 sm:px-25 py-4 mb-2'>
                <p className='text-3xl sm:text-5xl text-blue-900 font-bold'>
                    Featured Property
                </p>
                <button className="bg-white px-3 py-1 rounded-full border border-blue-900 shadow-md font-medium text-blue-700 text-1.75xl hover:bg-gray-50 h-[47px] w-[260px] flex justify-center items-center gap-2">
                    See New Projects <i className="bi bi-arrow-up-right bg-blue-900"></i>
                </button>
            </div>

            {/* Featured Images Block */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-30 sm:gap-5 mt-15">
                {/* First card */}
                <div className="relative w-[90%] sm:w-auto">
                    <img
                        className="w-full sm:w-[648px] h-[300px] sm:h-[510px] object-cover rounded-xl"
                        src={featured[11].image}
                        alt={featured[11].name}
                    />
                    {/* card details 1 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 sm:-bottom-30 z-20 bg-white rounded-xl w-[90%] sm:w-[583px] h-[180px] sm:h-[200px] shadow-xl p-4 sm:p-6">
                        {/* Header (Location + Bookmark) */}
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={Geo2}
                                    alt="Geo"
                                    className="w-5 h-5 sm:w-[28px] sm:h-[28px]"
                                />
                                <p className="text-lg sm:text-2xl font-semibold text-blue-900">
                                    {featured[11].name}, {featured[11].city}
                                </p>
                            </div>
                            <img
                                src={bookmark}
                                alt="Bookmark"
                                className="w-5 h-5 sm:w-[28px] sm:h-[28px] cursor-pointer hover:scale-110 transition-transform"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 text-sm sm:text-base mb-4 leading-relaxed">
                            Spacious 3BHK apartment in a prime location with <br className="hidden sm:block" /> modern amenities.
                        </p>

                        {/* Divider Line */}
                        <div className="border-t border-gray-200 mb-2"></div>

                        {/* Footer (Price + Button) */}
                        <div className="flex justify-between items-center mb-2 sm:mb-4">
                            <p className="text-base sm:text-lg font-semibold text-black">$1500/month</p>
                            <button className="bg-blue-900 text-white font-semibold px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 transition">
                                Know More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Second card */}
                <div className="relative w-[90%] sm:w-auto">
                    <img
                        className="w-full sm:w-[648px] h-[300px] sm:h-[510px] object-cover rounded-xl"
                        src={featured[8].image}
                        alt={featured[8].name}
                    />
                    {/* card details 2 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 sm:-bottom-30 z-20 bg-white rounded-xl w-[90%] sm:w-[583px] h-[180px] sm:h-[200px] shadow-xl p-4 sm:p-6">
                        {/* Header (Location + Bookmark) */}
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={Geo2}
                                    alt="Geo"
                                    className="w-5 h-5 sm:w-[28px] sm:h-[28px]"
                                />
                                <p className="text-lg sm:text-2xl font-semibold text-blue-900">
                                    {featured[8].name}, {featured[8].city}
                                </p>
                            </div>
                            <img
                                src={bookmark}
                                alt="Bookmark"
                                className="w-5 h-5 sm:w-[28px] sm:h-[28px] cursor-pointer hover:scale-110 transition-transform"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 text-sm sm:text-base -mb-1 leading-relaxed">
                            Spacious 3BHK apartment in a prime location with <br className="hidden sm:block" /> modern amenities.
                        </p>

                        {/* Divider Line */}
                        <div className="border-t border-gray-200 mb-2"></div>

                        {/* Footer (Price + Button) */}
                        <div className="flex justify-between items-center mb-2 sm:mb-4">
                            <p className="text-base sm:text-lg font-semibold text-black">$1500/month</p>
                            <button className="bg-blue-900 text-white font-semibold px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 transition">
                                Know More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featuredbuy