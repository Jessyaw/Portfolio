import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBorGIRSvsZiRef1_7Q5eXJWFmzx8VTgj0",
    authDomain: "wealth-79d10.firebaseapp.com",
    projectId: "wealth-79d10",
    storageBucket: "wealth-79d10.firebasestorage.app",
    messagingSenderId: "911578225940",
    appId: "1:911578225940:web:5cf412576c6caad10bb601",
    measurementId: "G-L8NXTWZBSS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, signOut };