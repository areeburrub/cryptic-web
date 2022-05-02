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
  where
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useUserContext } from "../../../../src/context/authContext";


const Leaderboard = () => {
  const { user } = useUserContext();
  const router = useRouter()
  const { uid } = router.query

  const [Attempts, setAttempts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Attempts"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAttempts(data);
    });
  }, []);
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Attempts by {user.displayName}</h1>
      
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
