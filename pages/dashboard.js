import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import { withProtected, withPublic } from "../src/routes";
import { useUserContext } from "../src/context/authContext";
import { useRouter } from "next/router";
import { doc, onSnapshot, query, orderBy, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../src/firebase";
import {BsFillArrowRightCircleFill} from 'react-icons/bs';


const Home = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [userData, setuserData] = useState(user);
  const [players, setPlayers] = useState([]);

  
  useEffect(() => {

    const unsub = onSnapshot(doc(db, "Users", user.uid), (doc) => {
        setuserData(doc.data());
      });

      const q = query(collection(db, "Users"), orderBy("points", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setPlayers(data);
      });
      
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Cryptic Hunt Website - {user.displayName}</title>
        <meta name="description" content="Cryptic Hunt Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logo}>Cryptic Hunt</span>
        <div className={styles.user}>
          <img src={user.photo} alt={user.displayName} />
          <span className={styles.username}>{user.displayName}</span>
          <span className={styles.points}>{null ?? userData.points}pts</span>
        </div>

        <div className={styles.mainArea}>
          <div className={styles.QuestionBox}>
            <div className={styles.details}>
              <span className={styles.level}>Level 1</span>
              <span className={styles.value}>15 pts</span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionText}>
                What is the name of the first president of the United States?
              </span>
              <div className={styles.questionInput}>
                <input className={styles.answer} type="text" />
                <button className={styles.submit}>SUBMIT</button>
                <button className={styles.hint}>HINT</button>
              </div>
            </div>
          </div>

          <div className={styles.leaderboard}>
            <h2>Leaderboard</h2>

            <div className={styles.players}>
              {players.map((player, index) => {
                return (
                  <div className={styles.player} key={index}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.playerImg}
                      src={player.photo}
                      alt={player.displayName}
                    />
                    <span className={styles.playerName}>
                      {player.displayName}
                    </span>
                    <span className={styles.playerPts}>{player.points}pts</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className={styles.modal}>
              
        </div>

      </main>
    </div>
  );
};

export default withProtected(Home);
