// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyA0fdUznaihnl_jtr7xT68HoGO_vIjf0Bw",
  // authDomain: "sadatfast.firebaseapp.com",
  // projectId: "sadatfast",
  // storageBucket: "sadatfast.appspot.com",
  // messagingSenderId: "423629433644",
  // appId: "1:423629433644:web:2ad3bb6180d547cc399a89"
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;