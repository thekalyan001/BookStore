import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIKJGWT5e__JotSm5mjbKnEVcONVQdZMA",
  authDomain: "bookmgn-60f8f.firebaseapp.com",
  projectId: "bookmgn-60f8f",
  storageBucket: "bookmgn-60f8f.appspot.com",
  messagingSenderId: "548767462562",
  appId: "1:548767462562:web:22beaa3bf63bd751dcd3fb",
  measurementId: "G-YCYPY6R555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;