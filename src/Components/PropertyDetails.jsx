import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { PROPERTY_URL } from '../Services/consfig';
import axios from 'axios';
import toast from 'react-hot-toast';

function PropertyDetails() {

    const {id} = useParams();
    const navigate = useNavigate();
    const {userLoggedIn} =useAuth();

    const [property, setProperty] = useState(null)
    const [loading, setloading] = useState(true)
    const [selectImage, setSelectImage] = useState(0);
    const [showContentModal, setshowContentModal] = useState(false);

    useEffect(() => {
        fetchProperty();
    }, [id])

    const fetchProperty = async () => {
        setloading(true);
        try {
            const responce = await axios.get(`${PROPERTY_URL}/${id}`);
            setProperty(responce.data.property);

        } catch (error) {
            console.log('Error fetching property', error);
            toast.error('Failed to load Property');
            navigate('/buy');
        } finally {
            setloading(false)
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleContactOwner = () => {
        if (!userLoggedIn) {
            toast.error("Please login to conrtact owner");
            console.log("user not logged in");
            navigate("/login")
            return;
        }
        setshowContentModal(true);
    }


    //Loading State
    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='text-center'>
                    <i className='bi bi-hourglass-split text-4xl text-blue-900 animate-spin mb-4 '></i>
                    <p className='text-gray-600'>
                        Loading properties details....
                    </p>
                </div>

            </div>
        )
    }

    //no property state 
    if (!property) {
        return(
            <div className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <i className='bi bi-exclamation-triangle text-6xl text-red-600 mb-4'></i>
                <p className='text-gray-600 font-bold text-2xl mb-2'>
                    Property Not Found
                </p>
                <button className='mt-4 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700'>
                    Back to Properties
                </button>
            </div>
        </div>
        )
    }

    //Property state
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/buy')}
                    className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                    <i className="bi bi-arrow-left"></i>
                    <span>Back to Properties</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Image Gallery */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Main Image */}
                            <div className="relative h-96">
                                <img
                                    src={property.images?.[selectImage]?.url}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                                    {selectImage + 1} / {property.images.length}
                                </div>
                            </div>

                            {/* Thumbnail Grid */}
                            {property.images?.length > 1 && (
                                <div className="grid grid-cols-5 gap-2 p-4 bg-gray-100">
                                    {property.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img.url}
                                            alt={`Thumbnail ${index + 1}`}
                                            onClick={() => setSelectImage(index)}
                                            className={`w-full h-20 object-cover rounded cursor-pointer transition ${selectImage === index
                                                    ? 'ring-4 ring-blue-600'
                                                    : 'hover:opacity-75'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Info */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            {/* Title & Price */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center text-gray-600 text-lg">
                                        <i className="bi bi-geo-alt mr-2"></i>
                                        <span>
                                            {property.address.street && `${property.address.street}, `}
                                            {property.address.area && `${property.address.area}, `}
                                            {property.address.city}, {property.address.state}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-3xl font-bold text-blue-900">
                                        {formatPrice(property.price)}
                                    </div>
                                    {property.listingType === 'rent' && (
                                        <div className="text-sm text-gray-600">per month</div>
                                    )}
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-3 mb-6">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${property.listingType === 'sale'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
                                </span>
                                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 capitalize">
                                    {property.propertyType}
                                </span>
                                {property.specifications?.furnished && (
                                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 capitalize">
                                        {property.specifications.furnished.replace('-', ' ')}
                                    </span>
                                )}
                            </div>

                            {/* Specifications Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                {property.specifications?.bedrooms && (
                                    <div className="text-center">
                                        <i className="bi bi-door-closed text-2xl text-blue-600 mb-2"></i>
                                        <div className="font-semibold text-gray-800">{property.specifications.bedrooms}</div>
                                        <div className="text-sm text-gray-600">Bedrooms</div>
                                    </div>
                                )}
                                {property.specifications?.bathrooms && (
                                    <div className="text-center">
                                        <i className="bi bi-droplet text-2xl text-blue-600 mb-2"></i>
                                        <div className="font-semibold text-gray-800">{property.specifications.bathrooms}</div>
                                        <div className="text-sm text-gray-600">Bathrooms</div>
                                    </div>
                                )}
                                {property.specifications?.area && (
                                    <div className="text-center">
                                        <i className="bi bi-arrows-angle-expand text-2xl text-blue-600 mb-2"></i>
                                        <div className="font-semibold text-gray-800">{property.specifications.area}</div>
                                        <div className="text-sm text-gray-600">Sq Ft</div>
                                    </div>
                                )}
                                {property.specifications?.parking && (
                                    <div className="text-center">
                                        <i className="bi bi-car-front text-2xl text-blue-600 mb-2"></i>
                                        <div className="font-semibold text-gray-800">{property.specifications.parking}</div>
                                        <div className="text-sm text-gray-600">Parking</div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {property.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            {property.amenities && property.amenities.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3">Amenities</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {property.amenities.map((amenity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg"
                                            >
                                                <i className="bi bi-check-circle-fill text-green-600"></i>
                                                <span className="capitalize">{amenity.replace('-', ' ')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Contact & Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">

                            {/* Owner Info */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Property Owner</h3>
                                <div className="space-y-3">
                                    {property.owner.name && (
                                        <div className="flex items-center gap-3">
                                            <i className="bi bi-person-circle text-xl text-gray-600"></i>
                                            <span className="text-gray-700">{property.owner.name}</span>
                                        </div>
                                    )}
                                    {property.owner.phone && (
                                        <div className="flex items-center gap-3">
                                            <i className="bi bi-telephone text-xl text-gray-600"></i>
                                            <span className="text-gray-700">{property.owner.phone}</span>
                                        </div>
                                    )}
                                    {property.owner.email && (
                                        <div className="flex items-center gap-3">
                                            <i className="bi bi-envelope text-xl text-gray-600"></i>
                                            <span className="text-gray-700 text-sm break-all">{property.owner.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contact Button */}
                            <button
                                onClick={handleContactOwner}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3"
                            >
                                <i className="bi bi-chat-dots mr-2"></i>
                                Contact Owner
                            </button>

                            {/* Book/Schedule Visit Button */}
                            <button
                                onClick={handleContactOwner}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                <i className="bi bi-calendar-check mr-2"></i>
                                Schedule Visit
                            </button>

                            {/* Property Stats */}
                            <div className="mt-6 pt-6 border-t">
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                    <span>Posted:</span>
                                    <span className="font-semibold">
                                        {new Date(property.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Views:</span>
                                    <span className="font-semibold">{property.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section - Will add in next step */}
                <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews & Ratings</h2>
                    <p className="text-gray-600 text-center py-8">
                        Reviews feature coming soon...
                    </p>
                </div>
            </div>

            {/* Contact Modal */}
            {showContentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Contact Owner</h3>
                        <p className="text-gray-600 mb-4">
                            You can contact the property owner using the following details:
                        </p>
                        <div className="space-y-3 mb-6">
                            {property.owner.phone && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                    <i className="bi bi-telephone-fill text-blue-600"></i>
                                    <a href={`tel:${property.owner.phone}`} className="text-blue-600 hover:underline">
                                        {property.owner.phone}
                                    </a>
                                </div>
                            )}
                            {property.owner.email && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                    <i className="bi bi-envelope-fill text-blue-600"></i>
                                    <a href={`mailto:${property.owner.email}`} className="text-blue-600 hover:underline break-all">
                                        {property.owner.email}
                                    </a>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setshowContentModal(false)}
                            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PropertyDetails