import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
<<<<<<< HEAD
  apiKey: "AIzaSyAv0fautzu7-WGY0ZOYQwxTQAB3ZpDH2PI",
  authDomain: "cryptic-web-2022.firebaseapp.com",
  projectId: "cryptic-web-2022",
  storageBucket: "cryptic-web-2022.appspot.com",
  messagingSenderId: "1086019378140",
  appId: "1:1086019378140:web:959d666af3bfde4a744d19",
  measurementId: "G-86XW9BCZ7D"
=======
  apiKey: "AIzaSyBTFTIUg8Z-C3TZu5_KwLUdx-y1BZ1rK6o",
  authDomain: "cryptic-hunt-web.firebaseapp.com",
  projectId: "cryptic-hunt-web",
  storageBucket: "cryptic-hunt-web.appspot.com",
  messagingSenderId: "236402709063",
  appId: "1:236402709063:web:b8d980ec6ddee13c769762",
  measurementId: "G-0CVVGVXSYV",
>>>>>>> 0c1579952845cb4bd34230d33eeb03718b2b0db8
};


export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore();