// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9bpr5TF-3gvcN3PdeOmKjkK58J5RIHes",
  authDomain: "global-envoy.firebaseapp.com",
  projectId: "global-envoy",
  storageBucket: "global-envoy.appspot.com",
  messagingSenderId: "918405000764",
  appId: "1:918405000764:web:c8fe31515505e8e8dd5d39",
  measurementId: "G-SZKLKCG1FC",
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Optionally initialize Analytics
const analytics = getAnalytics(firebaseApp);

// Export Firebase app and services
export { firebaseApp, analytics };
