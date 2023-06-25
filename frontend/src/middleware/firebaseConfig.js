// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-g6fciGANHIF7FND_pYJvIUXCHUXjHhY",
  authDomain: "wealthsimpler-875f9.firebaseapp.com",
  projectId: "wealthsimpler-875f9",
  storageBucket: "wealthsimpler-875f9.appspot.com",
  messagingSenderId: "34696672176",
  appId: "1:34696672176:web:5b682b7b9f330522d79c75",
  measurementId: "G-C1Q14ZJ2VZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
