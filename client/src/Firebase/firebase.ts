import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGI0aExGt8-zFMSNvg1abPpSqRORzP3LY",
    authDomain: "react-final-project-auth.firebaseapp.com",
    projectId: "react-final-project-auth",
    storageBucket: "react-final-project-auth.appspot.com",
    messagingSenderId: "656273124100",
    appId: "1:656273124100:web:c984da6c44e39384a67e51"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);