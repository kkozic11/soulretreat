import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKqRMRkvfyhEKobFeJqBUINkWnuS1IFAg",
  authDomain: "soulretreat-9a8c5.firebaseapp.com",
  projectId: "soulretreat-9a8c5",
  storageBucket: "soulretreat-9a8c5.appspot.com",
  messagingSenderId: "222722886686",
  appId: "1:222722886686:web:a6250338319a11746cb20f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
