import React, { useState } from 'react'
import banner from '/bannerBuy5.jpg'
import Geo1 from '/Geo1.png'
import search1 from '/search1.png'
import Featuredbuy from '../Components/Featuredbuy'
import nativebanner from '/nativeBuy.jpg'
import axios from 'axios'
import toast from 'react-hot-toast';
import { PROPERTY_URL } from '../Services/consfig'
import PropertyCard from '../Components/PropertyCard'

function Buy() {

const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);
const [filters, setFilters] = useState({
  city: '',
  propertyType: '',
  listingType:'',
  minPrice: '',
  maxPrice: '',
  bedrooms: ''
})


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
        <div>
          <Featuredbuy />
        </div>




      </div>
    </div>
  )
}

export default Buy