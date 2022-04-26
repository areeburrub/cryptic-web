import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import { withProtected, withPublic } from "../src/routes";
import { useUserContext } from "../src/context/authContext";
import { useRouter } from "next/router";
import {
  doc,
  onSnapshot,
  query,
  orderBy,
  collection,
  where,
  getDoc,
  getDocs
} from "firebase/firestore";
import { useState, useEffect, useRef, useCallback } from "react";
import { db } from "../src/firebase";

import { Input } from "../src/components/input/Input.tsx";
import { History } from "../src/components/history/History.tsx";
import { useHistory } from "../src/hooks/history.ts";
import { banner } from "../src/utils/bin/utils.ts";

const Home = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const username = user.displayName.replace(/\s/g, "").toLowerCase();
  const [userData, setuserData] = useState(user);
  const [players, setPlayers] = useState([]);

  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");

  const getOutput = (e) => {
    e.preventDefault();
    if (input === "clear") {
      setOutput([]);
      setInput("");
    } else {
      const output = terminal(input);
      const userIn = username + "@CrypticHunt: " + input;
      setInput("");
      setOutput((prev) => [...prev, userIn, output]);
    }
  };

  const containerRef = useRef(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const init = useCallback(() => setHistory(banner()), []);

  useEffect(() => {
    init();
  }, [init]);

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };


  const [Point, setPoint] = useState(0);
  
  const getPts = async () =>{
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
  console.log(data[0])
  setPoint(data[0].pts);
  }

  useEffect(()=>{
    getPts();
  }, [userData])

  const [inputRef, setInputFocus] = useFocus();

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
  }, []);

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
              <span className={styles.level}>Level {userData.level}</span>
              <span className={styles.value}>{Point} pts</span>
            </div>
            <div className={styles.question}>
              <div
                className={styles.terminal}
                ref={containerRef}
                onClick={setInputFocus}
              >
                <div className={styles.output}>
                  <History history={history} />
                  <Input
                    inputRef={inputRef}
                    containerRef={containerRef}
                    command={command}
                    history={history}
                    lastCommandIndex={lastCommandIndex}
                    setCommand={setCommand}
                    setHistory={setHistory}
                    setLastCommandIndex={setLastCommandIndex}
                    clearHistory={clearHistory}
                  />
                </div>
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

        <div className={styles.modal}></div>
      </main>
    </div>
  );
};

export default withProtected(Home);
