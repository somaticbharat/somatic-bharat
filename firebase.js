// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXD3yyuKWNsn4bAZaLBrXucl_9Z-eauF0",
  authDomain: "shatkonalife-saas.firebaseapp.com",
  projectId: "shatkonalife-saas",
  storageBucket: "shatkonalife-saas.firebasestorage.app",
  messagingSenderId: "491921572098",
  appId: "1:491921572098:web:a5d266c41fbe72a3e6421b"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize & export the services you need
export const db = getFirestore(app);
export const auth = getAuth(app);