import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyDYcjnUDm-JWvHTgJYpKCfmysgdweUjcI4",
  authDomain: "crytic-demo.firebaseapp.com",
  projectId: "crytic-demo",
  storageBucket: "crytic-demo.appspot.com",
  messagingSenderId: "438697868668",
  appId: "1:438697868668:web:4278d812da9ed12eefb8f9",
  measurementId: "G-MLB9Y8S9ZR"
};


export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore();