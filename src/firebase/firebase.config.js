// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0fdUznaihnl_jtr7xT68HoGO_vIjf0Bw",
  authDomain: "sadatfast.firebaseapp.com",
  projectId: "sadatfast",
  storageBucket: "sadatfast.appspot.com",
  messagingSenderId: "423629433644",
  appId: "1:423629433644:web:2ad3bb6180d547cc399a89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;