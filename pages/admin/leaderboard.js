import React from "react";
import { AdminProtected } from "../../src/routes";
import styles from "../../styles/Admin.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../src/firebase";
import {
  doc,
  setDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";
import { useRouter } from "next/router";



const Leaderboard = () => {
  const router = useRouter()

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Users"), orderBy("points", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setPlayers(data);
    });
    
  }, []);
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Leaderboard</h1>
      <span className={styles.copyToClipboardBtn} onClick={() => {navigator.clipboard.writeText(JSON.stringify(players))}}>
        Copy Leaderboard as JSON to clipboard
      </span>
      
      <div className={styles.players}>
        {players.map((player, index) => {
          return (
            <div title="click to view more" className={styles.player} key={index} >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.playerImg}
                src={player.photo}
                alt={player.displayName}
              />
              <span className={styles.playerName}>
                  {index+1 + " - " +player.displayName}
              </span>
              <span className={styles.playerPts}>{player.points} pts - {player.level} Level</span>
              <a href={'/admin/users/attempt/' + player.uid} className={styles.playerPts}>View Logs</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProtected(Leaderboard);
