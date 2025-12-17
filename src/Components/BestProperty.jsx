import React from 'react'
import { fetchProperties } from '../Services/api'
import { useState, useEffect } from 'react'
import icon6 from '/icon6.png'
import { PROPERTY_URL } from '../Services/consfig'
import axios from 'axios'
import PropertyCardBuy from './PropertyCardBuy'
import { useNavigate } from 'react-router-dom'


function BestProperty() {


  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    const fetchSaleProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('listingType', 'sale');

        const res = await axios.get(`${PROPERTY_URL}?${params}`);
        setProperties(res.data.properties.slice(0, 4)); // only 4 cards
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProperties();
  }, []);




  return (
    <div className='mt-25'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4  px-6 sm:px-10 py-4 '>
        <p className='text-3xl sm:text-5xl text-blue-900 font-bold '>
          Best Properties Available For Sale
        </p>
        <button className="bg-blue-900 px-3 py-1 rounded-full border border-blue-900 shadow-md 
                           font-medium text-white text-base sm:text-xl 
                           hover:bg-blue-700 h-[42px] sm:h-[47px] w-full sm:w-[260px] 
                           flex justify-center items-center gap-2"
                           onClick={() => navigate("/buy")}
                           >
          View More Properties
        </button>
      </div>
      <div className="text-left px-10 mb-15 ">
        <p className='text-2xl text-gray-500 font-semibold mt-5'>
          Browse our top-rated properties for sale, featuring premium listings tailored to<br /> your needs. Find your dream home today!
        </p>
      </div>
      {/*here are the properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center px-10">
        {properties.map(property => (
          <PropertyCardBuy
            key={property._id}
            property={property}
          />
        ))}
      </div>


    </div>
  )
}

export default BestProperty