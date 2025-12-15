import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileProperty({ property, onDelete }) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleView = () => {
    navigate(`/property/${property._id}`);
  };

  const handleEdit = () => {
    navigate(`/edit-property/${property._id}`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(property._id);
    setDeleting(false);
  };

  return (
    <div className='bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6'>
      <div className='flex flex-col md:flex-row gap-6'>
        
        {/* Property Image */}
        <div className='flex-shrink-0'>
          <img
            src={primaryImage?.url || '/placeholder.jpg'}
            alt={property.title}
            onClick={handleView}
            className='w-full md:w-64 h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition'
          />
        </div>

        {/* Property Details */}
        <div className='flex-grow'>
          <div className='flex flex-col h-full justify-between'>
            
            {/* Top Section - Property Info */}
            <div>
              {/* Title */}
              <h3
                onClick={handleView}
                className='text-2xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-900 transition'
              >
                {property.title}
              </h3>

              {/* Location */}
              <div className='flex items-center text-gray-600 mb-3'>
                <i className="bi bi-geo-alt mr-2"></i>
                <span>
                  {property.address.area && `${property.address.area}, `}
                  {property.address.city}, {property.address.state}
                </span>
              </div>

              {/* Price */}
              <div className='text-3xl font-bold text-blue-900 mb-3'>
                {formatPrice(property.price)}
                {property.listingType === 'rent' && (
                  <span className="text-lg font-normal text-gray-600">/month</span>
                )}
              </div>

              {/* Badges */}
              <div className='flex flex-wrap gap-2 mb-3'>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  property.listingType === 'sale'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 capitalize">
                  {property.propertyType}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  property.status === 'active' ? 'bg-green-100 text-green-800' :
                  property.status === 'sold' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status}
                </span>
              </div>

              {/* Specifications */}
              <div className='flex flex-wrap gap-4 text-sm text-gray-600 mb-3'>
                {property.specifications?.bedrooms && (
                  <div className='flex items-center gap-1'>
                    <i className="bi bi-door-closed"></i>
                    <span>{property.specifications.bedrooms} Beds</span>
                  </div>
                )}
                {property.specifications?.bathrooms && (
                  <div className='flex items-center gap-1'>
                    <i className="bi bi-droplet"></i>
                    <span>{property.specifications.bathrooms} Baths</span>
                  </div>
                )}
                {property.specifications?.area && (
                  <div className='flex items-center gap-1'>
                    <i className="bi bi-arrows-angle-expand"></i>
                    <span>{property.specifications.area} sqft</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className='flex gap-4 text-sm text-gray-500'>
                <div className='flex items-center gap-1'>
                  <i className="bi bi-calendar3"></i>
                  <span>Posted: {formatDate(property.createdAt)}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <i className="bi bi-eye"></i>
                  <span>{property.views} views</span>
                </div>
              </div>
            </div>

            {/* Bottom Section - Action Buttons */}
            <div className='flex flex-wrap gap-3 mt-4'>
              <button
                onClick={handleView}
                className='flex items-center gap-2 px-6 py-2 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-700 transition'
              >
                <i className="bi bi-eye"></i>
                View
              </button>
              
              <button
                onClick={handleEdit}
                className='flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition'
              >
                <i className="bi bi-pencil-square"></i>
                Edit
              </button>
              
              <button
                onClick={handleDelete}
                disabled={deleting}
                className='flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                {deleting ? (
                  <>
                    <i className="bi bi-hourglass-split animate-spin"></i>
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash"></i>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileProperty;