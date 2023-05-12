// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVXKB2J4x3exFGyRkhiLgZ2NGCuMtfVXE",
  authDomain: "project-doing-feb9d.firebaseapp.com",
  projectId: "project-doing-feb9d",
  storageBucket: "project-doing-feb9d.appspot.com",
  messagingSenderId: "1087718117518",
  appId: "1:1087718117518:web:51ab525fed75844b9f79df",
  measurementId: "G-R4NG0SP7S0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);
