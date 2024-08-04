import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKJo8iLEKA99aRaLFxSNQ5ivrofjen-bc",
  authDomain: "rakta-android-project.firebaseapp.com",
  projectId: "rakta-android-project",
  storageBucket: "rakta-android-project.appspot.com",
  messagingSenderId: "275266781580",
  appId: "1:275266781580:web:5011d0ff6758c3be0916a9"
};

// Initializing Firebase Services
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };
