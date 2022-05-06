import { db, auth } from "../firebase";
import {
  doc,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  getDoc,
  serverTimestamp,
  addDoc 
} from "firebase/firestore";
import axios from 'axios';


export const getQuestion = async () =>{
  
  const user = auth.currentUser;
  const docRef1 = doc(db, "Users", user.uid);
  const docSnap1 = await getDoc(docRef1);
  const userData = docSnap1.data();
  const docRef = doc(db, "Teams", userData.tid);
  const docSnap = await getDoc(docRef);
  
  const q = query(collection(db, "Questions"), where("level", "==", docSnap.data().level));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  const output = await data[0];;

  return output;
}

export const checkAnswer = async (args: string[]) =>{
  const answer = args.join(' ');
  const user = auth.currentUser;
  const docRef1 = doc(db, "Users", user.uid);
  const docSnap1 = await getDoc(docRef1);
  const userData = docSnap1.data();
  const docRef = doc(db, "Teams", userData.tid);
  const docSnap = await getDoc(docRef);
  const TeamData = docSnap.data()
  

  
  const q = query(collection(db, "Questions"), where("level", "==", TeamData.level));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  
  const output = (answer == data[0].answer) ? true : false;
  
  //Add Attempt
  const attempt = await addDoc(collection(db, "Attempts"), {
    tid : TeamData.tid,
    byName : userData.displayName,
    byEmail : userData.email,
    level : TeamData.level,
    answer : answer,
    time : serverTimestamp(),
    check : output,
    hint : TeamData.hint
  });
  return output;
}

export const NumberOfQuestion = async (args: string[]) =>{
  const q = query(collection(db, "Questions"));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  
  return data.length;
}
