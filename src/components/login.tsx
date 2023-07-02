

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const login = async () => {
  // Frontend configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAmZmuckTBZuUwetU3xROn0DBmdFjGZpvE",
    authDomain: "ttstvsschool.firebaseapp.com",
    databaseURL: "https://ttstvsschool-default-rtdb.firebaseio.com",
    projectId: "ttstvsschool",
    storageBucket: "ttstvsschool.appspot.com",
    messagingSenderId: "557949322894",
    appId: "1:557949322894:web:564892b7f3b3600ff7abdf",
    measurementId: "G-H56FQJJJ16"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();

 

  return token;
};