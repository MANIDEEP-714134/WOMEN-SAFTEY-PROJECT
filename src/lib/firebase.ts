import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD7Qj6dCyh5p1OqzfLYdDi796lw2zyzziA",
  authDomain: "women-safety-4aafa.firebaseapp.com",
  projectId: "women-safety-4aafa",
  storageBucket: "women-safety-4aafa.firebasestorage.app",
  messagingSenderId: "799409850803",
  appId: "1:799409850803:web:3303b96adc39b8e820e3c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
