import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyClTcXpAV3ETWt9t-WnDunfnbirLVkSWmg",
    authDomain: "brainlox-quiz.firebaseapp.com",
    projectId: "brainlox-quiz",
    storageBucket: "brainlox-quiz.appspot.com",
    messagingSenderId: "668802053264",
    appId: "1:668802053264:web:df697a354d25f325109415",
    measurementId: "G-SDSVZTJ39Q"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export {auth,provider}

