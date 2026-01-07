// Firebase Configuration
// This file initializes Firebase with the modular SDK
// Update with your Firebase project credentials

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Replace with your project details
const firebaseConfig = {
  apiKey: "AIzaSyD1234567890abcdefghijklmnopqrst",
  authDomain: "techblitz-2k26.firebaseapp.com",
  projectId: "techblitz-2k26",
  storageBucket: "techblitz-2k26.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890ghijkl"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
