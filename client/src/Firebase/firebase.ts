// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGI0aExGt8-zFMSNvg1abPpSqRORzP3LY",
    authDomain: "react-final-project-auth.firebaseapp.com",
    projectId: "react-final-project-auth",
    storageBucket: "react-final-project-auth.appspot.com",
    messagingSenderId: "656273124100",
    appId: "1:656273124100:web:c984da6c44e39384a67e51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);