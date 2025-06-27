// firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "TU_WKLEJ_KLUCZ",
  authDomain: "TU_WKLEJ",
  projectId: "TU_WKLEJ",
  storageBucket: "TU_WKLEJ",
  messagingSenderId: "TU_WKLEJ",
  appId: "TU_WKLEJ"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)