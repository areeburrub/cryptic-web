import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyAv0fautzu7-WGY0ZOYQwxTQAB3ZpDH2PI",
  authDomain: "cryptic-web-2022.firebaseapp.com",
  projectId: "cryptic-web-2022",
  storageBucket: "cryptic-web-2022.appspot.com",
  messagingSenderId: "1086019378140",
  appId: "1:1086019378140:web:959d666af3bfde4a744d19",
  measurementId: "G-86XW9BCZ7D"
};


export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore();