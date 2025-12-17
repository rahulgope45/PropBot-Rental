export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://pro-boat-rental-backend.vercel.app"
    : "http://localhost:5000";

export const AUTH_BASR_URL = `${BASE_URL}/api/auth`;
export const PROPERTY_URL = `${BASE_URL}/api/properties`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const REVIEW_URL = `${BASE_URL}/api/reviews`; 
export const INQUIRY_URL =`${BASE_URL}/api/inquiries`;