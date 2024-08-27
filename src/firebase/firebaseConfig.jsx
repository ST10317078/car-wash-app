// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAvSUCJg9q1lPpJOBrB0nRfR82lNHA0_YY",
  
    authDomain: "carwashdb-bb310.firebaseapp.com",
  
    projectId: "carwashdb-bb310",
  
    storageBucket: "carwashdb-bb310.appspot.com",
  
    messagingSenderId: "873514033397",
  
    appId: "1:873514033397:web:1a5fb4451d1fbe834365bc",
  
    measurementId: "G-FFZ63C022N"
  
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
