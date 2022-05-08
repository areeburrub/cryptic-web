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
  getDocs,
  limit
} from "firebase/firestore";
import { useState, useEffect, useRef, useCallback } from "react";
import { db } from "../src/firebase";
import { toast } from "react-toastify";

import { Input } from "../src/components/input/Input.tsx";
import { History } from "../src/components/history/History.tsx";
import { useHistory } from "../src/hooks/history.ts";
import { banner } from "../src/utils/bin/utils.ts";
import { motion, useAnimation } from "framer-motion"

const Home = () => {


  const PointsBounce =  useAnimation();
  const upSideDown =  useAnimation();
  const ElevenPop =  useAnimation();

  const router = useRouter();
  const { user } = useUserContext();
  const username = user.displayName.replace(/\s/g, "").toLowerCase();
  const [userData, setuserData] = useState(user);
  const [players, setPlayers] = useState(
    [{
  "level": 11,
  "createdAt": "2022-05-07T04:51:29.781Z",
  "photo": "https://lh3.googleusercontent.com/a-/AOh14GjQEw6Qve_8DDqV6eUsaQ3XEXjt4MjTr3u1Rx2YnA=s96-c",
  "displayName": "Lord Itachi",
  "hint": false,
  "email": "mehulkumar2199@gmail.com",
  "points": 1120,
  "uid": "a0uZnWDMVFdXXGHPWnHwLHHbGzQ2"
}, {
  "createdAt": "2022-05-07T04:06:34.805Z",
  "uid": "GtTxKXUxvMXaAG89wd2TIrbHU793",
  "level": 11,
  "hint": false,
  "photo": "https://lh3.googleusercontent.com/a-/AOh14Gh1cHRSj7CzdX8HYRYWqlocM7i9ChJsp2YTM-Z8=s96-c",
  "email": "karthick17702@gmail.com",
  "displayName": "Karthick K",
  "points": 1040
}, {
  "photo": "https://lh3.googleusercontent.com/a-/AOh14GgoGdEVMgCU9Dq50jNBtSJ01d-gcQsn-ROI8EpU5A=s96-c",
  "uid": "gSgSERQhZJRi7JGzLN5MM3e2qZ33",
  "email": "riteshsagar2002@gmail.com",
  "displayName": "Ritesh Sagar",
  "createdAt": "2022-05-07T10:26:09.437Z",
  "points": 1010,
  "hint": false,
  "level": 11
}, {
  "displayName": " Parth Shinde",
  "points": 1010,
  "uid": "OC6Ci1Nr5La8Iaw6wiHYEB37U1G2",
  "createdAt": "2022-05-07T06:44:38.718Z",
  "photo": "https://lh3.googleusercontent.com/a/AATXAJzdvdWldwVTxHjbF04LBWaphR1gpfHEjRRpDVdM=s96-c",
  "hint": false,
  "level": 11,
  "email": "parthshinde91@gmail.com"
}, {
  "photo": "https://lh3.googleusercontent.com/a-/AOh14Gi_ekhigQIFhzdljyJjgAmV1YHeOBK5j8G4JqdytA=s96-c",
  "hint": false,
  "level": 11,
  "uid": "IW3mmRHyW9SmEAuyf4XCCjFDB0w1",
  "displayName": "Samiksha Chaudhari",
  "createdAt": "2022-05-07T08:06:56.033Z",
  "points": 1010,
  "email": "samichaudhari82@gmail.com"
}, {
  "uid": "CNZO0Xd7pYd9sEt7hceBKE4u8372",
  "email": "gauravss3703@gmail.com",
  "createdAt": "2022-05-07T08:22:02.106Z",
  "points": 1010,
  "level": 11,
  "hint": false,
  "displayName": "Gaurav Suryawanshi",
  "photo": "https://lh3.googleusercontent.com/a-/AOh14GgNMypLVb-zE_vHS8VpJsF-3HASbg4-fcI_NDZoOQ=s96-c"
}]
  );

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
  }, [userData])

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


    const qq4 = query(collection(db, "Users"), where("uid","==", user.uid));
    const unsubscribe4 = onSnapshot(qq4, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setuserData(data[0]);
    });



    //update score
    const q4 = query(collection(db, "Questions"), where("level", "==", userData.level));
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
      data[0].isChecked ? toast.success(`Anyone can Answer Now`, { toastId: "unique" }) : toast.error(`Answers are not Being Recorded`, { toastId: "uniqueID" });
    });
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
          <span className={styles.points}>{null ?? userData.points}pts</span>
        </div>

        <motion.div className={styles.mainArea}>

          <motion.div className={styles.QuestionBox}
           animate={PointsBounce}
          transition={{ duration: 1 }}
          >
            <div className={styles.details}>
              <span className={styles.level}  title= {'You are at Level ' + userData.level} >Level {userData.level}</span>
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
            <h2>Final Winners</h2>

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
                      {index+1 + " - " + player.displayName}
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
