import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PROPERTY_URL, UPLOAD_URL } from '../Services/consfig';

function Sell() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'house',
    listingType: 'sale',
    price: '',
    address: {
      street: '',
      area: '',
      city: '',
      state: '',
      country: 'India',
      zipCode: ''
    },
    specifications: {
      bedrooms: '',
      bathrooms: '',
      area: '',
      furnished: 'unfurnished',
      parking: ''
    },
    amenities: [],
    owner: {
      name: '',
      phone: '',
      email: ''
    }
  });

  // Images selected by user (NOT uploaded yet)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  // Loading states
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    setSelectedFiles(files);

    // Create preview URLs for display
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove selected image
  const removeImage = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle amenities checkbox
  const handleAmenities = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  // ✅ MAIN SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    if (!formData.title || !formData.description || !formData.price) {
      toast.error('Please fill all required fields');
      return;
    }

    setSubmitting(true);

    try {
      // STEP 1: Upload images to Cloudinary
      setUploadingImages(true);
      const formDataForUpload = new FormData();
      
      selectedFiles.forEach(file => {
        formDataForUpload.append('images', file);
      });

      const uploadResponse = await axios.post(
        UPLOAD_URL, // ✅ Clean URL usage
        formDataForUpload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      const uploadedImages = uploadResponse.data.images;
      setUploadingImages(false);
      toast.success(`${uploadedImages.length} images uploaded ✅`);

      // STEP 2: Create property with uploaded image URLs
      const propertyData = {
        ...formData,
        images: uploadedImages.map((img, index) => ({
          url: img.url,
          publicId: img.publicId,
          isPrimary: index === 0 // First image is primary
        })),
        price: Number(formData.price),
        specifications: {
          ...formData.specifications,
          bedrooms: formData.specifications.bedrooms ? Number(formData.specifications.bedrooms) : undefined,
          bathrooms: formData.specifications.bathrooms ? Number(formData.specifications.bathrooms) : undefined,
          area: formData.specifications.area ? Number(formData.specifications.area) : undefined,
          parking: formData.specifications.parking ? Number(formData.specifications.parking) : undefined
        }
      };

      const response = await axios.post(
        PROPERTY_URL, // ✅ Clean URL usage
        propertyData,
        { withCredentials: true }
      );

      toast.success('Property listed successfully! 🎉');
      console.log('Property created:', response.data);
      
      // Redirect to home or property details page
      navigate('/');

    } catch (error) {
      console.error('Error:', error);
      
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data.message || 'Failed to create property');
      } else if (error.request) {
        // Request made but no response
        toast.error('No response from server. Please check your connection.');
      } else {
        // Something else happened
        toast.error('Failed to create property. Please try again.');
      }
    } finally {
      setSubmitting(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">List Your Property</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="mb-4">
            <label className="block font-medium mb-2">Property Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Spacious 3BHK House in Mumbai"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property in detail..."
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Property Type *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
                <option value="office">Office</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Listing Type *</label>
              <select
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-2">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price in rupees"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Location Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Street</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Area</label>
              <input
                type="text"
                name="address.area"
                value={formData.address.area}
                onChange={handleChange}
                placeholder="Area/Locality"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">City *</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">State *</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Zip Code</label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                placeholder="Zip code"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                name="specifications.bedrooms"
                value={formData.specifications.bedrooms}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                name="specifications.bathrooms"
                value={formData.specifications.bathrooms}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Area (sq ft)</label>
              <input
                type="number"
                name="specifications.area"
                value={formData.specifications.area}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Parking Spaces</label>
              <input
                type="number"
                name="specifications.parking"
                value={formData.specifications.parking}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Furnished Status</label>
              <select
                name="specifications.furnished"
                value={formData.specifications.furnished}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="fully-furnished">Fully Furnished</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['gym', 'pool', 'garden', 'security', 'lift', 'power-backup', 'internet', 'air-conditioning', 'balcony', 'terrace'].map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenities(amenity)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="capitalize">{amenity.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Owner Details */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Contact Name</label>
              <input
                type="text"
                name="owner.name"
                value={formData.owner.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="owner.phone"
                value={formData.owner.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="owner.email"
                value={formData.owner.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Property Images *</h2>
          
          {/* File Input */}
          <div className="mb-4">
            <label className="block w-full">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
                <i className="bi bi-cloud-upload text-5xl text-gray-400 mb-3 block"></i>
                <p className="text-gray-700 font-medium text-lg">
                  Click to upload property images
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Maximum 10 images • JPG, PNG, WebP supported
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                    >
                      <i className="bi bi-x text-xl"></i>
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                        Primary Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <i className="bi bi-info-circle mr-2"></i>
                {selectedFiles.length} image(s) selected • First image will be the primary image
              </p>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-3">
                {uploadingImages ? (
                  <>
                    <i className="bi bi-cloud-upload animate-bounce"></i>
                    Uploading Images...
                  </>
                ) : (
                  <>
                    <i className="bi bi-hourglass-split animate-spin"></i>
                    Creating Property...
                  </>
                )}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="bi bi-check-circle"></i>
                List Property
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sell;