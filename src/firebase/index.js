import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyC585XeyX1ZTvg7dR3_RtxPEY4FAF7WMzg",
  authDomain: "cryptic-22.firebaseapp.com",
  projectId: "cryptic-22",
  storageBucket: "cryptic-22.appspot.com",
  messagingSenderId: "853948601325",
  appId: "1:853948601325:web:680c0f438515e6227d8de4",
  measurementId: "G-T7J8S2C6E4"
};


export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore();