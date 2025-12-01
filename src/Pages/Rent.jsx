import React, { useState,useEffect } from 'react'
import banner from '/bannerRent.jpg'
import Geo1 from '/Geo1.png'
import search1 from '/search1.png'
import Featuredbuy from '../Components/Featuredbuy'
import nativebanner from '/nativeRent.jpg'
import { useSearchParams } from 'react-router-dom'
import PropertyCard2 from '../Components/PropertyCard2'
import axios from 'axios';
import { PROPERTY_URL } from '../Services/consfig';
import toast from 'react-hot-toast'


function Rent() {

  const [properties , setProperties] = useState([]);
  const[loading, setLoading] = useState(true);
  const[filters,setFilters] =useState({
    city: '',
    propertyType: '',
    listingType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  })

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
      params.append('listingType','rent');

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
                    Featured Properties For Rent
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
        <div className='mb-50'>
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
                  <div className="mb-4 text-gray-600 text-center">
                    Found {properties.length} properties for Rent
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-2 gap-y-30 gap-10 mb-30">
                    {properties.map(property => (
                      <PropertyCard2 key={property._id} property={property} />
                    ))}
                  </div>
                </>
              )}


        </div>
        <div>
          <Featuredbuy />
        </div>




      </div>
    </div>
  )
}

export default Rent