
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration with your provided values
const firebaseConfig = {
  apiKey: "AIzaSyCYqMNtW8ah7o5MRYUYGI0-QRKSoOoWvvg",
  authDomain: "rentwise-helpers.firebaseapp.com",
  projectId: "rentwise-helpers",
  storageBucket: "rentwise-helpers.firebasestorage.app",
  messagingSenderId: "680764091732",
  appId: "1:680764091732:web:159b6f0f15814482586cc1"
};

// Initialize Firebase
let firebaseApp;
let firebaseAuth;

try {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export const app = firebaseApp;
export const auth = firebaseAuth;
