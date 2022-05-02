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
  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();
  
  const q = query(collection(db, "Questions"), where("level", "==", userData.level));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
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
  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();

  
  const q = query(collection(db, "Questions"), where("level", "==", userData.level));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  
  const output = (answer == data[0].answer) ? true : false;
  
  //Add Attempt
  const attempt = await addDoc(collection(db, "Attempts"), {
    uid : userData.uid,
    level : userData.level,
    answer : answer,
    time : serverTimestamp(),
    check : output,
    hint : userData.hint
  });
  return output;
}

export const NumberOfQuestion = async (args: string[]) =>{
  const q = query(collection(db, "Questions"));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  
  return data.length;
}
