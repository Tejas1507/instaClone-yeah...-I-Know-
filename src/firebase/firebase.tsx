// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb9CuUdffrJ5hOhbvWJcjvMUz-ssV1Feg",
  authDomain: "instaclone-3854e.firebaseapp.com",
  projectId: "instaclone-3854e",
  storageBucket: "instaclone-3854e.firebasestorage.app",
  messagingSenderId: "27855810905",
  appId: "1:27855810905:web:c4dbc67aa49094c320dc48",
  measurementId: "G-9TW94MP5CE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { app, auth, fireStore, storage };
