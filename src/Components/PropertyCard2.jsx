import React from 'react'
import { useNavigate } from 'react-router-dom';
import Geo2 from '/Geo2.png'
import bookmark from '/bookmark.png'





function PropertyCard2({ property }) {

    const navigate = useNavigate();
    //Primary Image
    const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];

    //format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-In', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }

    const handleBookmark = (e) =>{
        e.stopPropagation();
        console.log('Bookmarked:' , property._id);
    }

    const handleKnowMore = (e) => {
        e.stopPropagation();
        navigate(`/property/${property._id}`);
    }


    return (
        <div
            onClick={() => navigate(`/property/${property._id}`)}
            className=''
        >
            <div
                className='flex flex-col sm:flex-row items-center justify-center gap-30 sm:gap-5 mt-15'
            >
                <div
                    className='relative w-[90%] sm:w-auto '
                >
                    <img
                        src={primaryImage?.url || 'placeholder.jpg'}
                        alt={property.title}
                        className='w-full sm:w-[648px] h-[300px] sm:h-[510px] object-cover rounded-xl '
                    />
                    {/* Card Details */}
                    <div
                        className='absolute left-1/2 transform -translate-x-1/2 -bottom-20 sm:-bottom-30 z-20 bg-white rounded-xl w-[90%] sm:w-[583px] h-[180px] sm:h-[200px] shadow-xl p-4 sm:p-6 '
                    >
                        {/* Header (Location + BookMark) */}
                        <div className='flex justify-between items-center mb-3'>
                            <div className='flex items-center gap-2'>
                                <img
                                    src={Geo2}
                                    alt="Geo"
                                    className="w-5 h-5 sm:w-[28px] sm:h-[28px]"
                                />
                                <p className="text-lg sm:text-2xl font-semibold text-blue-900">
                                    {property.address.area}, {property.address.city},{property.address.state}
                                </p>
                            </div>
                            <img
                                src={bookmark}
                                onClick={handleBookmark}
                                alt='Bookmark'
                                className="w-5 h-5 sm:w-[28px] sm:h-[28px] cursor-pointer hover:scale-110 transition-transform"
                            />

                        </div>
                        {/* Description */}
                        <p className='text-gray-500 text-sm sm:text-base mb-4 leading-relaxed'>
                            {property.description}
                        </p>
                        {/* Divider Line */}
                        <div className="border-t border-gray-200 mb-2"></div>
                        <div className="flex justify-between items-center mb-2 sm:mb-4">
                            <p className="text-base sm:text-lg font-semibold text-black">
                                {formatPrice(property.price)}
                                {property.listingType === 'rent' && <span className="text-sm font-normal text-gray-600">/month</span>}
                            </p>
                            <button 
                            onClick={handleKnowMore}
                            className="bg-blue-900 text-white font-semibold px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 transition">
                                Know More
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PropertyCard2