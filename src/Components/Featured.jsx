import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PROPERTY_URL } from '../Services/consfig';
import { useNavigate } from 'react-router-dom';

function Featured() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomProperties();
  }, []);

  const fetchRandomProperties = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${PROPERTY_URL}/random?listingType=sale&limit=4` // ✅ Get 4 properties
      );
      setFeatured(res.data.properties);
      console.log('Featured properties:', res.data.properties);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get random image from property's images array
  const getRandomImage = (property) => {
    if (!property?.images || property.images.length === 0) {
      return '/placeholder.jpg';
    }
    const randomIndex = Math.floor(Math.random() * property.images.length);
    return property.images[randomIndex].url;
  };

  // ✅ Get primary or first image
  const getPrimaryImage = (property) => {
    if (!property?.images || property.images.length === 0) {
      return '/placeholder.jpg';
    }
    const primaryImg = property.images.find(img => img.isPrimary);
    return primaryImg ? primaryImg.url : property.images[0].url;
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="mt-25 px-6">
        <p className="text-3xl sm:text-5xl text-blue-900 font-bold mb-8">
          Featured Property
        </p>
        <div className="flex justify-center items-center py-20">
          <i className="bi bi-hourglass-split text-4xl text-blue-600 animate-spin"></i>
        </div>
      </div>
    );
  }

  if (!featured || featured.length === 0) {
    return (
      <div className="mt-25 px-6">
        <p className="text-3xl sm:text-5xl text-blue-900 font-bold mb-8">
          Featured Property
        </p>
        <p className="text-gray-600 text-center py-10">No featured properties available</p>
      </div>
    );
  }

  return (
    <div className="mt-25">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 sm:px-25 py-4">
        <p className="text-3xl sm:text-5xl text-blue-900 font-bold">
          Featured Property
        </p>
        <button
          onClick={() => navigate('/buy')}
          className="bg-white px-3 py-1 rounded-full border border-blue-900 shadow-md 
                     font-medium text-blue-700 text-base sm:text-xl 
                     hover:bg-gray-50 h-[42px] sm:h-[47px] w-full sm:w-[260px] 
                     flex justify-center items-center gap-2"
        >
          See New Projects <i className="bi bi-arrow-up-right color-blue-900"></i>
        </button>
      </div>

      {/* Featured Images Block */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-10 px-4 sm:px-0">
        
        {/* Left side - Big image + Medium image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          
          {/* ✅ First big image with overlay */}
          {featured[0] && (
            <div
              onClick={() => navigate(`/property/${featured[0]._id}`)}
              className="relative w-full sm:w-[650px] h-[250px] sm:h-[478px] cursor-pointer group overflow-hidden"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                src={getPrimaryImage(featured[0])}
                alt={featured[0].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">{featured[0].propertyType}</p>
                <p className="text-base sm:text-xl font-bold mb-1">
                  {featured[0].title}
                </p>
                <p className="text-sm">
                  {featured[0].address.city}, {featured[0].address.state}
                </p>
                <p className="text-lg font-bold mt-2">
                  {formatPrice(featured[0].price)}
                </p>
              </div>
            </div>
          )}

          {/* ✅ Second tall image */}
          {featured[1] && (
            <div
              onClick={() => navigate(`/property/${featured[1]._id}`)}
              className="relative w-full sm:w-[307px] h-[250px] sm:h-[478px] cursor-pointer group overflow-hidden"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                src={getPrimaryImage(featured[1])}
                alt={featured[1].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium line-clamp-1">{featured[1].title}</p>
                <p className="text-sm">
                  {featured[1].address.city}
                </p>
                <p className="text-base font-bold mt-1">
                  {formatPrice(featured[1].price)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Stacked images */}
        <div className="flex flex-col gap-5 w-full sm:w-auto">
          
          {/* ✅ Third image */}
          {featured[2] && (
            <div
              onClick={() => navigate(`/property/${featured[2]._id}`)}
              className="relative w-full sm:w-[309px] h-[180px] sm:h-[226px] cursor-pointer group overflow-hidden"
            >
              <img
                src={getPrimaryImage(featured[2])}
                alt={featured[2].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-medium line-clamp-1">{featured[2].title}</p>
                <p className="text-xs">
                  {featured[2].address.city}
                </p>
                <p className="text-sm font-bold mt-1">
                  {formatPrice(featured[2].price)}
                </p>
              </div>
            </div>
          )}

          {/* ✅ Fourth image */}
          {featured[3] && (
            <div
              onClick={() => navigate(`/property/${featured[3]._id}`)}
              className="relative w-full sm:w-[309px] h-[180px] sm:h-[226px] cursor-pointer group overflow-hidden"
            >
              <img
                src={getPrimaryImage(featured[3])}
                alt={featured[3].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-medium line-clamp-1">{featured[3].title}</p>
                <p className="text-xs">
                  {featured[3].address.city}
                </p>
                <p className="text-sm font-bold mt-1">
                  {formatPrice(featured[3].price)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Featured;