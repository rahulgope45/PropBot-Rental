export const AUTH_BASR_URL =
 import.meta.env.MODE === "production"
 ? ""
: "http://localhost:5000/api/auth";

export const PROPERTY_URL =
import.meta.env.MODE === "production"
? ""
: "http://localhost:5000/api/properties"



export const UPLOAD_URL =
import.meta.env.MODE === "production"
? ""
: "http://localhost:5000/api/upload"