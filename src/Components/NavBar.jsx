import React, { useState, useEffect } from 'react'
import icon from '/icon.png'
import external1 from '/external1.png'
import house1 from '/house1.png'
import usericon from '/usericon1.png'
import { NavLink } from 'react-router-dom'
import { AUTH_BASR_URL } from '../Services/consfig'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/authContext'
import Select from 'react-select'
import { PROPERTY_URL } from '../Services/consfig'
import { useNavigate } from 'react-router-dom'


function NavBar() {

  //User Login status
  const { userLoggedIn, setUserLoggedIn, setUser } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const navigate = useNavigate();
  const [searchFillters, setSearchFilters] = useState({
    listingType: "",
    propertyType: "",
    location: ""
  });

  //Options For SE
  const typePropertyOption = [
    { value: "", label: "Buy/Rent" },
    { value: "rent", label: "Rent" },
    { value: "sale", label: "Sale" },
  ];
  const typeHouse = [
    { value: '', label: "All Types" },
    { value: 'house', label: "House" },
    { value: 'apartment', label: "Apartment" },
    { value: 'villa', label: "Villa" },
    { value: 'land', label: "Land" },
    { value: 'commercial', label: "Commercial" },
    { value: 'office', label: "Office" }
  ];
  const LocationOptions = [
    { value: "Pune", label: "Pune" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Chennai", label: "Chennai" },
  ];

  //Search filter here




  const handleFindProperty = () => {
    const params = new URLSearchParams();

    if (searchFillters.propertyType) {
      params.append('propertyType', searchFillters.propertyType);
    }
    if (searchFillters.location) {
      params.append('city', searchFillters.location)
    }

    //The Logic here is that if the property is sale it would show the filter in the buy page but if the type is rent it would show in the rent page
    let targetPage = '/buy'; //Default to buy Page
    if (searchFillters.listingType === 'rent') {
      targetPage = '/rent';
    } else if (searchFillters.listingType === 'sale') {
      targetPage = '/buy';
    }
    // And if the property type is empty the target page is by default /buy page

    //Navigating with query parameters
    const queryString = params.toString();
    navigate(`${targetPage}${queryString ? `?${queryString}` : ''}`);
  }




  //Logout here
  async function handleLogout(e) {
    e.preventDefault();
    try {
      const result = await axios.post(`${AUTH_BASR_URL}/logout`,
      )
      if (result.status === 200) {
        setUser(null)
        setUserLoggedIn(false)
        toast.success("Logout Succesfully")
        console.log("Logout Succesfully")

      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(" Logout failed")
        console.log("Error in logot", error)

      }

    }

  }

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-6 relative">
      {/* Logo + Title */}
      <NavLink className="flex h-16 items-center gap-3" to="/">
        <img src={icon} alt="icon" className="h-12 w-12 object-contain" />
        <h1 className="text-2xl font-extrabold text-gray-800">PropBot</h1>
      </NavLink>

      {/* Desktop Menu Links */}
      <div className="hidden md:flex h-16 items-center gap-6 text-gray-700 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-700 cursor-pointer ${isActive ? 'border-b-2 border-blue-500 text-blue-700' : ''
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/buy"
          className={({ isActive }) =>
            `hover:text-blue-700 cursor-pointer ${isActive ? 'border-b-2 border-blue-500 text-blue-700' : ''
            }`
          }
        >
          Buy
        </NavLink>
        <NavLink
          to="/rent"
          className={({ isActive }) =>
            `hover:text-blue-700 cursor-pointer ${isActive ? 'border-b-2 border-blue-500 text-blue-700' : ''
            }`
          }
        >
          Rent
        </NavLink>

        <NavLink
          to="/sell"
          className={({ isActive }) =>
            `hover:text-blue-700 cursor-pointer ${isActive ? 'border-b-2 border-blue-500 text-blue-700' : ''
            }`
          }>
          Sell
        </NavLink>
        <p className="hover:text-blue-700 cursor-pointer">About Us</p>
        <p className="hover:text-blue-700 cursor-pointer">Contact Us</p>
      </div>

      {/* Desktop Auth Button */}
      <div className="hidden md:block">
        
        

          {userLoggedIn ? (
            <div className='relative group '>
            <img
              src={usericon}
              className=' w-[40px] h-[40px] hover:bg-blue-200 p-1 rounded-full'
            />
            <div
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md 
               opacity-0 group-hover:opacity-100 transform scale-95 
               group-hover:scale-100 transition-all duration-200 z-50"
            >
              
                <div className="flex flex-col divide-y divide-gray-200">
                  {/* Profile */}
                  <NavLink
                    to="/profile"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Profile
                  </NavLink>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    <i className="bi bi-box-arrow-right text-lg"></i>
                    Logout
                  </button>
                </div>
              
            </div>
            </div>
          ) : (
            <NavLink
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition"
              to="/signup"
            >
              Login / Register
              <i className="bi bi-arrow-right-circle text-lg"></i>
            </NavLink>
          )}
        </div>
      

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-3xl text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col px-6 py-10 space-y-6 md:hidden">
          {/* Close button top-right */}
          <button
            className="absolute top-4 right-4 text-3xl text-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>

          {/* Links */}
          <NavLink to="/" className="block text-lg font-medium border-b pb-2">Home</NavLink>
          <NavLink to="/buy" className="block text-lg font-medium border-b pb-2">Buy</NavLink>
          <NavLink to="/rent" className="block text-lg font-medium border-b pb-2">Rent</NavLink>
          <NavLink to="/sell" className="block text-lg font-medium border-b pb-2">Sell</NavLink>

          <p className="block text-lg font-medium border-b pb-2">About Us</p>
          <p className="block text-lg font-medium border-b pb-2">Contact Us</p>

          {/* Auth */}
          <div className="mt-6">
            {userLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition"
              >
                Logout <i className="bi bi-box-arrow-right text-lg"></i>
              </button>
            ) : (
              <NavLink
                to="/signup"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition"
              >
                Login / Register
                <i className="bi bi-arrow-right-circle text-lg"></i>
              </NavLink>
            )}
          </div>
        </div>
      )}


      {/* Lower Search Bar (unchanged, just hidden on small) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-142 z-10 hidden md:flex">
        <div className="flex items-center justify-center bg-white rounded-full border border-gray-300 shadow-lg  
                        w-[1106px] h-[80px] gap-4">
          {/* Each filter option */}
          <div className="w-[243px] h-[55px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            <div className="flex items-center gap-2">
              <img src={external1} className="h-5 w-5 object-contain" />
              <div className='w-[120px] '>
                <Select
                  placeholder="Property For"
                  value={typePropertyOption.find(opt => opt.value === searchFillters.listingType)}
                  onChange={(option) => setSearchFilters(prev => ({ ...prev, listingType: option.value }))}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      minHeight: "unset",
                      cursor: "pointer",
                      position: "relative"

                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#4B5563",            // Tailwind gray-700
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "-60px",
                      padding: 0,

                    }),
                    indicatorSeparator: () => ({
                      display: "none",             // remove separator line
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",     // rounded-lg
                      marginTop: "0.5rem",
                    }),


                  }}
                  options={typePropertyOption} />
              </div>
            </div>

          </div>
          {/* Properrty Type(House /Apartment/etc) */}
          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            <div className="flex items-center gap-2">
              <img src={house1} className="h-5 w-5 object-contain" />
              <div className='w-[120px] '>
                <Select
                  placeholder="Type"
                  value={typeHouse.find(opt => opt.value === searchFillters.propertyType)}
                  onChange={(option) => setSearchFilters(prev => ({ ...prev, propertyType: option.value }))}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      minHeight: "unset",
                      cursor: "pointer",
                      position: "relative"

                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#4B5563",            // Tailwind gray-700
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "-60px",
                      padding: 0,

                    }),
                    indicatorSeparator: () => ({
                      display: "none",             // remove separator line
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",     // rounded-lg
                      marginTop: "0.5rem",
                    }),


                  }}
                  options={typeHouse} />
              </div>

            </div>

          </div>
          {/* Location */}
          <div className="w-[243px] flex items-center justify-between px-4 py-3 border border-gray-300 font-medium text-gray-700 rounded-full">
            <div className="flex items-center gap-2">
              <i className="bi bi-crosshair"></i>
              <div className='w-[120px] '>
                <Select
                  placeholder="Location"
                  value={LocationOptions.find(opt => opt.value === searchFillters.location)}
                  onChange={(option) => setSearchFilters(prev => ({ ...prev, location: option.value }))}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      minHeight: "unset",
                      cursor: "pointer",
                      position: "relative"

                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#4B5563",            // Tailwind gray-700
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "-60px",
                      padding: 0,

                    }),
                    indicatorSeparator: () => ({
                      display: "none",             // remove separator line
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",     // rounded-lg
                      marginTop: "0.5rem",
                      width: "200px"
                    }),


                  }}
                  options={LocationOptions} />
              </div>
            </div>

          </div>

          {/* Button */}
          <div className="w-[243px] flex items-center justify-center">
            <button
              onClick={handleFindProperty}
              className="w-full px-6 py-3 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-700 transition">
              Find Property
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
