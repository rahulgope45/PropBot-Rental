import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import banner from '/bannerBuy5.jpg'
import Geo1 from '/Geo1.png'
import search1 from '/search1.png'
import Featuredbuy from '../Components/Featuredbuy'
import nativebanner from '/nativeBuy.jpg'
import axios from 'axios'
import toast from 'react-hot-toast';
import { PROPERTY_URL } from '../Services/consfig'
import PropertyCard from '../Components/PropertyCard'
import PropertyCard2 from '../Components/PropertyCard2'

function Buy() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    propertyType: '',
    listingType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });
  //Adding Search params For Sale denoted properties

  const [searchParams] = useSearchParams();

  //fetch properties added
  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('listingType','sale');

      const propertyType = searchParams.get('propertyType');
      const city = searchParams.get('city');

      if(propertyType) params.append('propertyType',propertyType);
      if(city) params.append('city',city);

      const response = await axios.get(`${PROPERTY_URL}?${params}`);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('failed to load properties');

    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

    const handleApplyFilters = () => {
    fetchProperties();
  };

  const handleClearFilters = () => {
    setFilters({
      city: '',
      propertyType: '',
      listingType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: ''
    });
    fetchProperties();
  }


  



  return (
    <div>
      <div>
        <div className="flex justify-center items-center mb-10">
          {/* relative container sized to the banner */}
          <div className="relative w-[1334px] h-[527px] max-w-full">
            {/* banner image */}
            <img
              src={banner}
              alt="banner"
              className="hidden sm:block w-full h-full object-cover rounded-xl z-0"
            />
            <img
              src={nativebanner}
              alt="native banner"
              className="block sm:hidden w-full h-full object-cover rounded-xl z-0"
            />


            <div className="absolute left-1/2 sm:left-[500px] transform -translate-x-1/2 bottom-10 sm:bottom-20 z-20 flex justify-center">
              {/* Search box overlay - centered, sits above image */}
              <div className="w-[90%] max-w-[820px]">
                <div className="px-2 sm:px-6 py-3 sm:py-4 w-full sm:w-[900px]">
                  <p className="text-white text-2xl sm:text-5xl font-bold text-center sm:text-left">
                    Featured Properties For Sale
                  </p>
                  <p className="text-white text-base text-1xl sm:text-[20px] mt-2 text-center sm:text-left">
                    Discover, Buy, or Rent Verified Properties with Ease.
                  </p>
                </div>
              </div>
            </div>
            {/* background blur */}
            <div className="absolute bottom-0 left-0 w-full h-[208px] w-[1328px] bg-gradient-to-t from-black/10 to-transparent backdrop-blur-[1.8px] rounded-xl"></div>


          </div>
        </div>
        
        <div className='mt-3'>
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">

              {/* Header */}
              {/* <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Browse Properties</h1>
                <p className="text-gray-600">Find your dream property from our listings</p>
              </div>

              Filters
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"> */}
                  {/* City */}
                  {/* <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="City"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  /> */}

                  {/* Property Type */}
                  {/* <select
                    name="propertyType"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                    <option value="office">Office</option>
                  </select> */}

                  {/* Listing Type */}
                  {/* <select
                    name="listingType"
                    value={filters.listingType}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Buy/Rent</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select> */}

                  {/* Min Price */}
                  {/* <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min Price"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  /> */}

                  {/* Max Price */}
                  {/* <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  /> */}

                  {/* Bedrooms */}
                  {/* <select
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Bedrooms</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div> */}

                {/* Filter Buttons */}
                {/* <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleApplyFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div> */}

              {/* Loading */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <i className="bi bi-hourglass-split text-4xl text-blue-600 animate-spin mb-4 gap-3 "></i>
                    <p className="text-gray-600">Loading properties...</p>
                  </div>
                </div>
              ) : properties.length === 0 ? (
                // No properties found
                <div className="text-center py-20">
                  <i className="bi bi-house-x text-6xl text-gray-400 mb-4"></i>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
                  <p className="text-gray-600">Try adjusting your filters</p>
                </div>
              ) : (
                // Property Grid
                <>
                  <div className="mb-4 text-gray-600">
                    Found {properties.length} properties for Sale
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-2 gap-y-30 gap-10 mb-30">
                    {properties.map(property => (
                      <PropertyCard2 key={property._id} property={property} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
          <Featuredbuy />
        </div>

        </div>




      </div>
    </div>
  )
}

export default Buy