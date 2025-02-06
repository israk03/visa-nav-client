// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzRwAQvzS1CaMX9dLak44EijrtnKjKuCA",
  authDomain: "visa-nav.firebaseapp.com",
  projectId: "visa-nav",
  storageBucket: "visa-nav.firebasestorage.app",
  messagingSenderId: "331016086538",
  appId: "1:331016086538:web:61c3962fb9f9a35cd72bf3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
