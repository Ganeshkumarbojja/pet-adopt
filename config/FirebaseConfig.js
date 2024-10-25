// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "react-native-d7d21.firebaseapp.com",
  projectId: "react-native-d7d21",
  storageBucket: "react-native-d7d21.appspot.com",
  messagingSenderId: "955617373608",
  appId: "1:955617373608:web:0db2aa0bfe5136585e019d",
  measurementId: "G-BQYXRHHZFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);
