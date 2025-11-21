import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AUTH_BASR_URL } from '../Services/consfig';

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


  // ✅ Images selected by user (NOT uploaded yet)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  // Loading states
  const [submitting, setSubmitting] = useState(false);

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

  // ✅ MAIN SUBMIT FUNCTION - Everything happens automatically!
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setSubmitting(true);

    try {
      // STEP 1: Upload images to Cloudinary
      const formDataForUpload = new FormData();
      selectedFiles.forEach(file => {
        formDataForUpload.append('images', file);
      });

      const uploadResponse = await axios.post(
        `${AUTH_BASR_URL.replace('/auth', '')}/upload`,
        formDataForUpload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      const uploadedImages = uploadResponse.data.images;
      toast.success(`${uploadedImages.length} images uploaded`);

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
          bedrooms: Number(formData.specifications.bedrooms),
          bathrooms: Number(formData.specifications.bathrooms),
          area: Number(formData.specifications.area),
          parking: Number(formData.specifications.parking)
        }
      };

      await axios.post(
        `${AUTH_BASR_URL.replace('/auth', '')}/properties`,
        propertyData,
        { withCredentials: true }
      );

      toast.success('Property listed successfully! 🎉');
      navigate('/');

    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to create property'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow my-10">
      <h1 className="text-3xl font-bold mb-6">List Your Property</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <div>
          <label className="block font-medium mb-2">Property Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Spacious 3BHK House in Mumbai"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property..."
            rows="4"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Property Type *</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
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
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Price (₹) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Address */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">City *</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
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
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                name="specifications.bedrooms"
                value={formData.specifications.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                name="specifications.bathrooms"
                value={formData.specifications.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Area (sq ft)</label>
              <input
                type="number"
                name="specifications.area"
                value={formData.specifications.area}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* ✅ IMAGE UPLOAD SECTION */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Property Images *</h2>
          
          {/* File Input */}
          <div className="mb-4">
            <label className="block w-full">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
                <i className="bi bi-cloud-upload text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-600 font-medium">
                  Click to upload images
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Maximum 10 images (JPG, PNG, WebP)
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <i className="bi bi-x text-xl"></i>
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedFiles.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {selectedFiles.length} image(s) selected
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <i className="bi bi-hourglass-split animate-spin"></i>
                Creating Property...
              </span>
            ) : (
              'Create Property'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Sell