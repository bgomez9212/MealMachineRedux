// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCmqHKGlCgkWOM8YU5DbcNwspwHQvhdZA",
  authDomain: "mealmachine-23b5b.firebaseapp.com",
  projectId: "mealmachine-23b5b",
  storageBucket: "mealmachine-23b5b.appspot.com",
  messagingSenderId: "1080227942139",
  appId: "1:1080227942139:web:56b4f9bf977b05e0236a5e",
  measurementId: "G-BXX1181GWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
