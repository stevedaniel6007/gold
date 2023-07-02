import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
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

import { createClient } from "@supabase/supabase-js";
export const supabase = createClient('https://rsfcqodmucagrxohmkgx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZmNxb2RtdWNhZ3J4b2hta2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5MjY5NDksImV4cCI6MTk3NjUwMjk0OX0.emUFAjUIpou6UOyQlIzvlvv9E4tClWoluh6SOoMNc8I')


async function getData(){
return  await supabase.auth.getSession()
}


export const authuser = getData()
export const app = initializeApp(firebaseConfig) as any;
export const auth = getAuth(app) as any;
export const storage = getStorage(app) as any;