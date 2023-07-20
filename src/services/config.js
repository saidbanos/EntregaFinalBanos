import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-e353c.firebaseapp.com",
  projectId: "react-e353c",
  storageBucket: "react-e353c.appspot.com",
  messagingSenderId: "606903340476",
  appId: "1:606903340476:web:c9a44f78b6da9f8f206fb9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
