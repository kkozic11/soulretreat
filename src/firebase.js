import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore"; // Dodajemo getDoc ovdje

const firebaseConfig = {
  apiKey: "AIzaSyB7v3U3gqZnT3sbG3zMFBbk3CPTBx9iWeg",
  authDomain: "soulretreat-500fa.firebaseapp.com",
  projectId: "soulretreat-500fa",
  storageBucket: "soulretreat-500fa.appspot.com",
  messagingSenderId: "468076301717",
  appId: "1:468076301717:web:f41a7ce4cb49286d217a9c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, getDoc }; 