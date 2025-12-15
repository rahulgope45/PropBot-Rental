import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PROPERTY_URL, UPLOAD_URL } from '../Services/consfig';

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

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

  // Existing images from database
  const [existingImages, setExistingImages] = useState([]);
  
  // New images selected by user
  const [newSelectedFiles, setNewSelectedFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  // Images marked for deletion
  const [imagesToDelete, setImagesToDelete] = useState([]);

  // Fetch property data
  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${PROPERTY_URL}/${id}`, {
        withCredentials: true
      });

      const property = response.data.property;

      // Populate form with existing data
      setFormData({
        title: property.title,
        description: property.description,
        propertyType: property.propertyType,
        listingType: property.listingType,
        price: property.price,
        address: {
          street: property.address.street || '',
          area: property.address.area || '',
          city: property.address.city,
          state: property.address.state,
          country: property.address.country || 'India',
          zipCode: property.address.zipCode || ''
        },
        specifications: {
          bedrooms: property.specifications?.bedrooms || '',
          bathrooms: property.specifications?.bathrooms || '',
          area: property.specifications?.area || '',
          furnished: property.specifications?.furnished || 'unfurnished',
          parking: property.specifications?.parking || ''
        },
        amenities: property.amenities || [],
        owner: {
        
          name: property.owner?.name || '',
          phone: property.owner?.phone || '',
          email: property.owner?.email || ''
        }
      });

      setExistingImages(property.images || []);

    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Failed to load property');
      navigate('/profile');
    } finally {
      setLoading(false);
    }
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

  // Handle new file selection
  const handleNewFileSelect = (e) => {
    const files = Array.from(e.target.files);

    const totalImages = existingImages.length - imagesToDelete.length + newSelectedFiles.length + files.length;

    if (totalImages > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    setNewSelectedFiles(prev => [...prev, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews(prev => [...prev, ...previews]);
  };

  // Remove new selected image (before upload)
  const removeNewImage = (index) => {
    setNewSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Mark existing image for deletion
  const markExistingImageForDeletion = (publicId) => {
    if (imagesToDelete.includes(publicId)) {
      // Unmark
      setImagesToDelete(prev => prev.filter(id => id !== publicId));
    } else {
      // Mark for deletion
      setImagesToDelete(prev => [...prev, publicId]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const remainingImages = existingImages.length - imagesToDelete.length + newSelectedFiles.length;
    if (remainingImages === 0) {
      toast.error('Property must have at least one image');
      return;
    }

    setSubmitting(true);

    try {
      let uploadedNewImages = [];

      // Upload new images if any
      if (newSelectedFiles.length > 0) {
        setUploadingImages(true);
        const formDataForUpload = new FormData();

        newSelectedFiles.forEach(file => {
          formDataForUpload.append('images', file);
        });

        const uploadResponse = await axios.post(
          UPLOAD_URL,
          formDataForUpload,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
          }
        );

        uploadedNewImages = uploadResponse.data.images;
        setUploadingImages(false);
        toast.success(`${uploadedNewImages.length} new images uploaded`);
      }

      // Combine existing images (not marked for deletion) with newly uploaded images
      const updatedImages = [
        ...existingImages.filter(img => !imagesToDelete.includes(img.publicId)),
        ...uploadedNewImages.map((img, index) => ({
          url: img.url,
          publicId: img.publicId,
          isPrimary: existingImages.length === 0 && index === 0 // First image is primary if no existing images
        }))
      ];

      // Prepare update data
      const updateData = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        price: Number(formData.price),
        address: {
          street: formData.address.street || '',
          area: formData.address.area || '',
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country || 'India',
          zipCode: formData.address.zipCode || ''
        },
        specifications: {
          bedrooms: formData.specifications.bedrooms ? Number(formData.specifications.bedrooms) : undefined,
          bathrooms: formData.specifications.bathrooms ? Number(formData.specifications.bathrooms) : undefined,
          area: formData.specifications.area ? Number(formData.specifications.area) : undefined,
          furnished: formData.specifications.furnished,
          parking: formData.specifications.parking ? Number(formData.specifications.parking) : undefined
        },
        amenities: formData.amenities,
        images: updatedImages,
        imagesToDelete: imagesToDelete, // Send images to delete
        owner: {
            
          name: formData.owner.name || '',
          phone: formData.owner.phone || '',
          email: formData.owner.email || ''
        }
      };

      // Update property
      const response = await axios.put(
        `${PROPERTY_URL}/${id}`,
        updateData,
        { withCredentials: true }
      );

      toast.success('Property updated successfully! 🎉');
      navigate('/profile');

    } catch (error) {
      console.error('Error updating property:', error);

      if (error.response) {
        toast.error(error.response.data.message || 'Failed to update property');
      } else {
        toast.error('Failed to update property. Please try again.');
      }
    } finally {
      setSubmitting(false);
      setUploadingImages(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <i className="bi bi-hourglass-split text-4xl text-blue-600 animate-spin mb-4"></i>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <i className="bi bi-arrow-left"></i>
          Back to Profile
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Edit Property</h1>

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
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Parking</label>
              <input
                type="number"
                name="specifications.parking"
                value={formData.specifications.parking}
                onChange={handleChange}
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Property Images</h2>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Current Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((img, index) => (
                  <div
                    key={index}
                    className={`relative group ${
                      imagesToDelete.includes(img.publicId) ? 'opacity-40' : ''
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => markExistingImageForDeletion(img.publicId)}
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition ${
                        imagesToDelete.includes(img.publicId)
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      } text-white`}
                    >
                      <i className={`bi ${imagesToDelete.includes(img.publicId) ? 'bi-arrow-counterclockwise' : 'bi-trash'}`}></i>
                    </button>
                    {img.isPrimary && (
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                    {imagesToDelete.includes(img.publicId) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <span className="text-white font-semibold">Marked for deletion</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images */}
          <div>
            <h3 className="text-lg font-medium mb-3">Add New Images</h3>
            <label className="block w-full">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
                <i className="bi bi-cloud-upload text-5xl text-gray-400 mb-3 block"></i>
                <p className="text-gray-700 font-medium text-lg">
                  Click to upload new images
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Maximum 10 images total • JPG, PNG, WebP supported
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleNewFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* New Image Previews */}
          {newImagePreviews.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">New Images to Upload</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {newImagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`New ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-green-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                    >
                      <i className="bi bi-x text-xl"></i>
                    </button>
                    <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                      New
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
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
                    Updating Property...
                  </>
                )}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="bi bi-check-circle"></i>
                Update Property
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            disabled={submitting}
            className="px-8 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProperty;