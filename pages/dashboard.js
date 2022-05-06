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
import { toast } from "react-toastify";

import { Input } from "../src/components/input/Input.tsx";
import { History } from "../src/components/history/History.tsx";
import { useHistory } from "../src/hooks/history.ts";
import { banner } from "../src/utils/bin/utils.ts";
import { motion, useAnimation } from "framer-motion"
import { getTeamData } from "../src/api/index"
const Home = () => {


  const PointsBounce =  useAnimation();
  const upSideDown =  useAnimation();
  const ElevenPop =  useAnimation();

  const router = useRouter();
  const { user, TeamData, setTeamData } = useUserContext();
  const username = user.displayName.replace(/\s/g, "").toLowerCase();
  const [players, setPlayers] = useState([]);

  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");

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
  

  useEffect(()=>{
    PointsBounce.start({
      y: ["0px", "-30px", "20px", "0px"]
    });
  }, [TeamData])

  const [inputRef, setInputFocus] = useFocus();

  const [isBon, setIsBon] = useState(false)
  const [Background, setBackground] = useState('/up.png')

  useEffect(() => {
    if(isBon){
      setBackground('/down.png')
      PointsBounce.start({
        x: ["0px", "-10px", "10px", "-10px", "0px"],
        y: ["0px", "10px", "-10px", "10px", "0px"],
        transition : { duration: 3}
      });
      upSideDown.start(
        {
          rotate: [0, 360 * 2, 360 * 2.5, 360 * 3],
              scale: [1, 2, 3, 1],
              transition : { duration: 2,times: [0, 0.2,0.3, 1] }
            })
      ElevenPop.start({
          opacity:[1,1],
          y: ["10px", "20px", "10px"],
          transition : { repeat: Infinity, duration: 2 }
        })
    }else{
      ElevenPop.start({
        opacity:[0,0],
        transition : { repeat: Infinity, duration: 2 }
        })
      setBackground('/up.png')
    }
  }, [isBon])
  

  useEffect(() => {

    const q = query(collection(db, "Teams"), orderBy("points", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setPlayers(data);
      const TeamD = data.find((team) => team.tid == user.tid);
      setTeamData(TeamD);
    });

    
    //update score
    const q4 = query(collection(db, "Questions"), where("level", "==", TeamData.level));
     const unsub4 = onSnapshot(q4, (querySnapshot) => {
      const d5 = [];
      querySnapshot.forEach((doc) => {
        d5.push(doc.data());
      });
      setPoint(d5[0].pts);
      setIsBon(d5[0].bonus);
    });

    const q2 = query(collection(db, "Controls"));
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      data[0].isChecked ? toast.success(`Cryptic Hunt accepting Answers`, { toastId: "unique" }) : toast.error(`Cryptic Hunt not accepting Answers `, { toastId: "uniqueID" });
    });

    getTeamData(user.tid);
  }, []);


  return (
    <div className={styles.container} >


      <Head>
        <title>Cryptic Hunt Website - {user.displayName}</title>
        <meta name="description" content="Cryptic Hunt Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bg}>
      <div className={styles.bgH}>
        <motion.div 
          className={styles.bgHolder}  
          style={
            { 
              background: `linear-gradient(#00000053,#0000008b) , url(${Background})  no-repeat center center `, 
              backgroundSize:"cover" 
            }}
          animate={upSideDown}
          
            />
      </div>
      </div>

      <main className={styles.main}>
        <div className={styles.elements}>
          <motion.img src="/eleven.png" alt="eleven" className={styles.eleven} 
        animate={ElevenPop}
          />
        </div>

        <span className={styles.logo}>Cryptic Hunt</span>
        <div className={styles.user}>
          <img src={user.photo} alt={user.displayName} />
          <span className={styles.username}>{user.displayName}</span>
          <span className={styles.points}>{TeamData.points}pts</span>
        </div>

        <motion.div className={styles.mainArea}>

          <motion.div className={styles.QuestionBox}
           animate={PointsBounce}
          transition={{ duration: 1 }}
          >
            <div className={styles.details}>
              <span className={styles.level}  title= {'You are at Level ' + TeamData.level} >Level {TeamData.level}</span>
              {isBon && <motion.span className={styles.Bonus}
                animate = {
                  {
                    scale: [1, 1.2, 1],
                  }
                }
                transition = {{
                  duration: 1,repeat: Infinity,ease: "easeInOut"
                }}
              >Bonus Level</motion.span>}
              <span className={styles.value} title= {'This question will give you ' + Point + 'points'} >{Point} pts</span>
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
          </motion.div>

          <div className={styles.leaderboard} >
            <h2>Leaderboard</h2>

            <div className={styles.players}>
              {players.map((player, index) => {
                return (
                  <div className={styles.player} key={index}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.playerImg}
                      src={"https://ui-avatars.com/api/?background=random&name="+player.name}
                      alt={player.name}
                    />
                    <span className={styles.playerName}>
                      {player.name}
                    </span>
                    <span className={styles.playerPts}>{player.points}pts</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className={styles.modal}></div>
      </main>
    </div>
  );
};

export default withProtected(Home);
