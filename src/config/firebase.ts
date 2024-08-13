// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqAZjlopEFxKA1W_qDY7DTprVlA2jlEHI",
  authDomain: "firetwitter-457f1.firebaseapp.com",
  projectId: "firetwitter-457f1",
  storageBucket: "firetwitter-457f1.appspot.com",
  messagingSenderId: "250598515137",
  appId: "1:250598515137:web:31fb6a4eb8e92cd1530f40",
  measurementId: "G-VK1TTGNEGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);