//config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBWiQFLOWkJfMYdF3e-DGL1QC16NqnJPjo",
    authDomain: "echolingo-dd50f.firebaseapp.com",
    projectId: "echolingo-dd50f",
    storageBucket: "echolingo-dd50f.appspot.com",
    messagingSenderId: "824689091852",
    appId: "1:824689091852:web:f0d5be1b3732535e7a5529",
    measurementId: "G-KDC4E6HKNT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);