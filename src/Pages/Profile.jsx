import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import usericon from '/usericon1.png';
import ProfileProperty from '../Components/ProfileProterty';
import { AUTH_BASR_URL, PROPERTY_URL } from '../Services/consfig';
import { useAuth } from '../context/authContext';
import { INQUIRY_URL } from '../Services/consfig';
import OwnerInquiries from '../Components/OwnerInquiry';

function Profile() {
  const navigate = useNavigate();
  const { user, userLoggedIn } = useAuth();
  const [getUser, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
const [loadingInquiries, setLoadingInquiries] = useState(false);


  useEffect(() => {
    // Redirect if not logged in
    if (!userLoggedIn) {
      toast.error('Please login to view profile');
      navigate('/login');
      return;
    }

    fetchUserProperties();
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${AUTH_BASR_URL}/me`, {
          withCredentials: true
        });
        setUser(res.data.user);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
    fetchInquiries();
  }, []);


  const fetchUserProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${PROPERTY_URL}/user/my-properties`,
        { withCredentials: true }
      );

      setProperties(response.data.properties);
      console.log('User properties:', response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load your properties');
    } finally {
      setLoading(false);
    }
  };

  // Handle property deletion
  const handleDelete = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await axios.delete(
        `${PROPERTY_URL}/${propertyId}`,
        { withCredentials: true }
      );

      toast.success('Property deleted successfully');

      // Remove from state
      setProperties(prev => prev.filter(p => p._id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const response = await axios.get(`${INQUIRY_URL}/owner`, {
        withCredentials: true
      });
      setInquiries(response.data.inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoadingInquiries(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* User Info Card */}
        <div className='flex items-center justify-center mb-12'>
          <div className="w-full max-w-2xl bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl shadow-lg p-8">
            <div className="flex items-center gap-8">
              {/* User Icon */}
              <img
                src={usericon}
                alt="User Icon"
                className="w-36 h-36 rounded-full border-4 border-white shadow-md"
              />

              {/* Divider */}
              <div className="h-32 w-px bg-gray-300"></div>

              {/* User Info */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3">
                  <i className="bi bi-person-circle text-2xl text-blue-900"></i>
                  <p className="text-2xl text-gray-800 font-semibold">
                    {getUser?.fullName || 'User Name'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="bi bi-envelope text-2xl text-blue-900"></i>
                  <p className="text-xl text-gray-700">
                    {getUser?.email || 'user@example.com'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="bi bi-house-door text-2xl text-blue-900"></i>
                  <p className="text-xl text-gray-700">
                    {properties.length} {properties.length === 1 ? 'Property' : 'Properties'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries section */}
        <OwnerInquiries/>

        {/* User Properties Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className='text-4xl text-blue-900 font-bold mb-2'>
                Your Properties
              </h2>
              <div className='h-1 w-32 bg-blue-900 rounded-full'></div>
            </div>

            {/* Add Property Button */}
            <button
              onClick={() => navigate('/sell')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-700 transition"
            >
              <i className="bi bi-plus-circle"></i>
              Add Property
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <i className="bi bi-hourglass-split text-4xl text-blue-600 animate-spin mb-4"></i>
                <p className="text-gray-600">Loading your properties...</p>
              </div>
            </div>
          ) : properties.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <i className="bi bi-house-x text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Properties Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by listing your first property!
              </p>
              <button
                onClick={() => navigate('/sell')}
                className="px-8 py-3 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-700 transition"
              >
                List a Property
              </button>
            </div>
          ) : (
            // Properties List
            <div className="space-y-6">
              {properties.map(property => (
                <ProfileProperty
                  key={property._id}
                  property={property}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;