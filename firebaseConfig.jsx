import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdKcytG-XAg0XMpxfyBwPKaCbT-3xBfaA",
  authDomain: "rakta-5925f.firebaseapp.com",
  projectId: "rakta-5925f",
  storageBucket: "rakta-5925f.appspot.com",
  messagingSenderId: "454953270477",
  appId: "1:454953270477:web:b8163e0bc78611f414bd84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
