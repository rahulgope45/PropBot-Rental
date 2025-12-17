import React from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProperties } from '../Services/api'
import { useState, useEffect } from 'react'
import icon6 from '/icon6.png'


function PropertyCardBuy({property}) {

const navigate = useNavigate();

//Setting up primary image 
const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];

 //format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-In', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }

const handleBuy = (e) => {
    e.stopPropogation();
    navigate(`/property/${property._id}`)
}

  return (
    <div
    onClick={() => navigate(`/property/${property._id}`)}
    > 
        
        <div className="h-[440px] w-[341px] bg-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <img
            className="w-full h-[200px] object-cover rounded-t-2xl p-2"
            src={primaryImage?.url || 'placeholder.jpg'}
            alt={property.title}
          />

          {/* Content */}
          <div className="p-4 flex flex-col h-[240px]">
            {/* Location + Rating */}
            <div className="flex items-center justify-between mb-3">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <img src={icon6} alt="location" className="w-4 h-4" />
                <p className="font-medium text-gray-500">
                  {property.address.city},{property.address.state}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <i className="bi bi-star-fill text-yellow-400"></i>
                <p className="text-gray-600 text-sm font-medium">4.5/5</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-1.9xl mb-4 leading-relaxed"
            
            >
              {property.description.slice(0,70)}...
            </p>

            {/* Footer (Button + Price) */}
            <div className="flex justify-between items-center ">
              <button 
              onClick={handleBuy}
              className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              <p className="text-lg font-semibold text-gray-800">
                {formatPrice(property.price)}
                {property.listingType === 'rent' && <span className="text-sm font-normal text-gray-600">/month</span>}
                </p>
            </div>
          </div>
        </div>
        </div>
  )
}

export default PropertyCardBuy