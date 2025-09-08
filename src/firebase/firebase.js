// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDguAlaHQg_cOPhZQ0yTGdkk-90ToSQEsY",
  authDomain: "rental-proboat.firebaseapp.com",
  projectId: "rental-proboat",
  storageBucket: "rental-proboat.firebasestorage.app",
  messagingSenderId: "105466606274",
  appId: "1:105466606274:web:6e4163e183a38ea40ec15b",
  measurementId: "G-ZVSWQNMPDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app ,auth};