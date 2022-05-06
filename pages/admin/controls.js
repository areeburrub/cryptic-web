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
  deleteDoc,
  where,
  getDocs
} from "firebase/firestore";
import { useRouter } from "next/router";


const Admin = () => {
  const router = useRouter();
  const [players, setPlayers] = useState([ ]);

  const [controls, setControls] = useState({
    isChecked:false,
  });
  const [EmailList, setEmailList] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "Users"), where("admin", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setEmailList(data);
    });
    const q2 = query(doc(db, "Controls", "AdminControlCrytic"));
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
      setControls(querySnapshot.data());
    });

    const q3 = query(doc(db, "Controls", "Leaderboard"));
    const unsubscribe3 = onSnapshot(q3, (querySnapshot) => {
      setPlayers(querySnapshot.data().Leaderboard);
    });
  }, []);



  const ChangeControl = (checked) => {

    const docRef = doc(db, "Controls", "AdminControlCrytic");
    const control = {
      isChecked: checked
    }
    setDoc(docRef, control);

  }

  const saveLeaderboard = async() =>{

    if(window.confirm(`are you sure you want to save as this will remove last saved leadeboarf?`)){

        const q = query(collection(db, "Users"), orderBy("points", "desc"));
        const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const docRef = doc(db, "Controls", "Leaderboard");
      const control = {
        Leaderboard: data
              }
      setDoc(docRef, control);
      toast.success("Saved Leaderboard");
    }
  }


  const _handleChange = (e) => {
    const { checked } = e.target;
    window.confirm(`do in this will ${checked?'turn on':'turn off'} taking responses ?`) && ChangeControl(checked);
    toast.success(`${checked?'Turned on':'Turned off'} taking responses`);
    }
  return (
    <div className={styles.main}>
      <span
        onClick={() => {
          router.back();
        }}
        className={styles.back}
      >
        Back
      </span>
      <h1 className={styles.heading}>Admins</h1>
      <div className={styles.userList}>
        {EmailList.map(email => (
        <div className={styles.user} key={email.id}>
          <span className={styles.email}>{email.email}</span>
        </div>
        ))}
      </div>
      <h1 className={styles.heading}>Controls</h1>
      <div className={styles.control}>

        <div className={styles.text}>
          Accepting Responses
        </div>
        <div className="switch-container">
            <label>
                <input checked={ controls.isChecked } onChange={ (e)=>{_handleChange(e)} } className={styles.switch} type="checkbox" />
                <div>
          
                    <div></div>
                </div>
            </label>
        </div>
      </div>

      <div className={styles.control}>

        <div className={styles.text}>
          Save Leaderboard
        </div>
        <div className="switch-container">
            <label>
                <input type="button" value="save" className={styles.save} onClick={()=>{saveLeaderboard()}}/>
                <div>
          
                    <div></div>
                </div>
            </label>
        </div>
      </div>

{/*       
      <div className={styles.controlAbout}>

        <div className={styles.text}>
          Save Leaderboard
        </div>
        <form>
          <textarea></textarea>

          <div className="switch-container">
            <label>
                <input type="button" value="save" className={styles.save} onClick={()=>{}}/>
                <div>
          
                    <div></div>
                </div>
            </label>
        </div>
        </form>
      </div> */}

      <h1 className={styles.heading}>Last Saved Leaderboard</h1>
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

export default AdminProtected(Admin);
