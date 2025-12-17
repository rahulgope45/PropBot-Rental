import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { INQUIRY_URL } from '../Services/consfig';
import { useNavigate } from 'react-router-dom';

function OwnerInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, contacted, closed

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const response = await axios.get(`${INQUIRY_URL}/owner${params}`, {
        withCredentials: true
      });
      setInquiries(response.data.inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  // Update inquiry status
  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await axios.put(
        `${INQUIRY_URL}/${inquiryId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Update local state
      setInquiries(prev =>
        prev.map(inquiry =>
          inquiry._id === inquiryId
            ? { ...inquiry, status: newStatus }
            : inquiry
        )
      );

      toast.success(`Inquiry marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className='text-3xl text-blue-900 font-bold mb-2'>
            Inquiries Received
          </h2>
          <p className="text-gray-600">Manage property inquiries from interested buyers</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {['all', 'pending', 'contacted', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-medium capitalize transition ${
              filter === status
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {status}
            {status !== 'all' && (
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                {inquiries.filter(i => i.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <i className="bi bi-hourglass-split text-4xl text-blue-600 animate-spin mb-4"></i>
          <p className="text-gray-600">Loading inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        // Empty State
        <div className="text-center py-12">
          <i className="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Inquiries Yet
          </h3>
          <p className="text-gray-600">
            {filter === 'all'
              ? "You haven't received any inquiries yet"
              : `No ${filter} inquiries`}
          </p>
        </div>
      ) : (
        // Inquiries List
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
            >
              {/* Header Row */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {/* Property Info */}
                  <div className="flex items-center gap-3 mb-2">
                    {inquiry.property?.images?.[0]?.url && (
                      <img
                        src={inquiry.property.images[0].url}
                        alt={inquiry.property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3
                        onClick={() => navigate(`/property/${inquiry.property._id}`)}
                        className="font-semibold text-lg text-gray-800 hover:text-blue-600 cursor-pointer"
                      >
                        {inquiry.property?.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {inquiry.property?.address?.city}, {inquiry.property?.address?.state}
                      </p>
                    </div>
                  </div>

                  {/* Inquiry Type Badge */}
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 capitalize">
                      {inquiry.inquiryType.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(inquiry.status)} capitalize`}>
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Inquirer Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Contact Information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-person-circle text-blue-600"></i>
                    <span className="text-sm">
                      <strong>Name:</strong> {inquiry.inquirer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-telephone text-blue-600"></i>
                    <a
                      href={`tel:${inquiry.inquirer.phone}`}
                      className="text-sm text-blue-600 hover:underline"
                    > 
                      {inquiry.inquirer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-envelope text-blue-600"></i>
                    <a
                      href={`mailto:${inquiry.inquirer.email}`}
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {inquiry.inquirer.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border">
                  {inquiry.message}
                </p>
              </div>

              {/* Visit Details (if applicable) */}
              {inquiry.preferredDate && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    <i className="bi bi-calendar-check mr-2"></i>
                    Preferred Visit:
                  </p>
                  <p className="text-sm text-blue-700">
                    {new Date(inquiry.preferredDate).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {inquiry.preferredTime && ` at ${inquiry.preferredTime}`}
                  </p>
                </div>
              )}

              {/* Footer - Actions & Date */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t">
                <div className="text-xs text-gray-500">
                  Received: {formatDate(inquiry.createdAt)}
                </div>

                {/* Status Update Buttons */}
                <div className="flex gap-2">
                  {inquiry.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(inquiry._id, 'contacted')}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <i className="bi bi-check-circle"></i>
                        Mark as Contacted
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(inquiry._id, 'closed')}
                        className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                      >
                        <i className="bi bi-x-circle"></i>
                        Close
                      </button>
                    </>
                  )}
                  {inquiry.status === 'contacted' && (
                    <button
                      onClick={() => handleStatusUpdate(inquiry._id, 'closed')}
                      className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                    >
                      <i className="bi bi-check-circle"></i>
                      Mark as Closed
                    </button>
                  )}
                  {inquiry.status === 'closed' && (
                    <button
                      onClick={() => handleStatusUpdate(inquiry._id, 'pending')}
                      className="px-4 py-2 bg-yellow-600 text-white text-sm font-semibold rounded-lg hover:bg-yellow-700 transition flex items-center gap-2"
                    >
                      <i className="bi bi-arrow-counterclockwise"></i>
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerInquiries;