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
  where
} from "firebase/firestore";
import { useRouter } from "next/router";


const Admin = () => {
  const router = useRouter();

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
    const q2 = query(collection(db, "Controls"));
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setControls(data[0]);
    });
  }, []);

  const ChangeControl = (checked) => {

    const docRef = doc(db, "Controls", "AdminControlCrytic");
    const control = {
      isChecked: checked
    }
    setDoc(docRef, control);

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

    </div>
  );
};

export default AdminProtected(Admin);
