import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyBTFTIUg8Z-C3TZu5_KwLUdx-y1BZ1rK6o",
  authDomain: "cryptic-hunt-web.firebaseapp.com",
  projectId: "cryptic-hunt-web",
  storageBucket: "cryptic-hunt-web.appspot.com",
  messagingSenderId: "236402709063",
  appId: "1:236402709063:web:b8d980ec6ddee13c769762",
  measurementId: "G-0CVVGVXSYV",
};


export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore();