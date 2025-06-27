import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrr0ibMTlHor_uw6o9e3ruKeOKubXKqIQ",
  authDomain: "metzlii.firebaseapp.com",
  projectId: "metzlii",
  storageBucket: "metzlii.firebasestorage.app",
  messagingSenderId: "909223317208",
  appId: "1:909223317208:web:3e1a57545ff5aaf5e211ad",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
