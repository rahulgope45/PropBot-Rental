import { useNavigate } from "react-router-dom";

import React from 'react'

function PropertyCard({property}) {
    const navigate = useNavigate();

    //Primary Image
    const primaryImage = property.images?.find(img => img.isPrimary) || property?.[0];

    //format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-In', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }


    return (
        // if user click it will direct to property page
        <div
      onClick={() => navigate(`/property/${property._id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={primaryImage?.url || '/placeholder.jpg'}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        
        {/* Listing Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            property.listingType === 'sale' ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-white capitalize">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="text-2xl font-bold text-blue-900 mb-2">
          {formatPrice(property.price)}
          {property.listingType === 'rent' && <span className="text-sm font-normal text-gray-600">/month</span>}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <i className="bi bi-geo-alt mr-1"></i>
          <span>{property.address.area ? `${property.address.area}, ` : ''}{property.address.city}, {property.address.state}</span>
        </div>

        {/* Specifications */}
        <div className="flex items-center gap-4 text-gray-700 text-sm border-t pt-3">
          {property.specifications?.bedrooms && (
            <div className="flex items-center gap-1">
              <i className="bi bi-door-closed"></i>
              <span>{property.specifications.bedrooms} Beds</span>
            </div>
          )}
          {property.specifications?.bathrooms && (
            <div className="flex items-center gap-1">
              <i className="bi bi-droplet"></i>
              <span>{property.specifications.bathrooms} Baths</span>
            </div>
          )}
          {property.specifications?.area && (
            <div className="flex items-center gap-1">
              <i className="bi bi-arrows-angle-expand"></i>
              <span>{property.specifications.area} sqft</span>
            </div>
          )}
        </div>

        {/* Rating */}
        {property.ratings?.count > 0 && (
          <div className="flex items-center gap-2 mt-3 text-sm">
            <div className="flex items-center text-yellow-500">
              <i className="bi bi-star-fill mr-1"></i>
              <span className="font-semibold">{property.ratings.average}</span>
            </div>
            <span className="text-gray-500">({property.ratings.count} reviews)</span>
          </div>
        )}
      </div>
    </div>
    )
}

export default PropertyCard