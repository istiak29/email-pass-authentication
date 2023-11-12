// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbPfV3RY0PzvCPo-RruF7WHkrNEnxSXP8",
  authDomain: "email-pass-authenticatio-d5254.firebaseapp.com",
  projectId: "email-pass-authenticatio-d5254",
  storageBucket: "email-pass-authenticatio-d5254.appspot.com",
  messagingSenderId: "256328399760",
  appId: "1:256328399760:web:095cdf3df344b0ef4cd115",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;