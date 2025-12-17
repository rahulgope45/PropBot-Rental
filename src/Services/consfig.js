
const isDevelopment = import.meta.env.MODE === 'development' || 
                      window.location.hostname === 'localhost';

export const BASE_URL = isDevelopment
    ? "http://localhost:5000"
    : "https://pro-boat-rental-backend.vercel.app";

export const AUTH_BASR_URL = `${BASE_URL}/api/auth`;
export const PROPERTY_URL = `${BASE_URL}/api/properties`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const REVIEW_URL = `${BASE_URL}/api/reviews`;
export const INQUIRY_URL = `${BASE_URL}/api/inquiries`;

// ✅ Log for debugging
console.log('Environment:', import.meta.env.MODE);
console.log('API Base URL:', BASE_URL);