
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Check if Firebase environment variables are defined
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

// Check for missing environment variables
const missingVars = requiredEnvVars.filter(
  varName => !import.meta.env[varName]
);

// Display warning if environment variables are missing
if (missingVars.length > 0) {
  console.error(
    `Firebase initialization error: Missing environment variables: ${missingVars.join(', ')}\n` +
    `Please create a .env.local file in the project root with these variables.`
  );
}

// Firebase configuration - values will be loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase - wrap in try/catch to handle initialization errors
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  console.log("Please check your .env.local file and ensure all Firebase configuration variables are set correctly.");
}

export const auth = auth;
export default app;
