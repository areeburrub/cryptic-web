import React from "react";
import { AdminProtected } from "../../../../src/routes";
import styles from "../../../../styles/Admin.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../../../src/firebase";
import {
  doc,
  setDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
  deleteDoc,
  getDoc,
  where
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useUserContext } from "../../../../src/context/authContext";


const Leaderboard = () => {
  const router = useRouter()
  const { uid } = router.query

  const [Attempts, setAttempts] = useState([]);
  const [userData, setuserData] = useState(null);
  

const getUser = async() =>{
  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);
  const Data = docSnap.data();
  setuserData(Data);
}
  useEffect(() => {
    const q = query(collection(db, "Attempts"), where("uid", "==", uid), orderBy("time","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAttempts(data);
    });
    getUser();
  }, []);


  return (
    <div className={styles.main}>
            <span onClick={() => {router.back();}} className={styles.back}> Back </span>
      <h1 className={styles.heading}>Attempts by {userData?.displayName}</h1>
      
      <div className={styles.players}>
        {Attempts.map((attempt, index) => {
          return (
            <div className={styles.attempt} key={index}>
              <div className={styles.attemptDetail}>
                <span className={styles.attemptLevel}>Level {attempt.level}</span>
                <span className={styles.attemptHint}>{attempt.hint?"Hint Used":"Hint Not Used"}</span>
                <span className={styles.attemptCheck}>{attempt.check ? "correct" : "incorrect"}</span>
                <span className={styles.attemptDate}>Date : {attempt.time.toDate().toDateString()}</span>
                <span className={styles.attemptTime}>Time : {attempt.time.toDate().toLocaleTimeString('en-US')}</span>
              </div>
              <div className={styles.attemptAnswer}>
                <p>
                  answer:<br/>
                  {attempt.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProtected(Leaderboard);
