import React from "react";
import { AdminProtected } from "../../../src/routes";
import styles from "../../../styles/Admin.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../../src/firebase";

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


const Admin = () => {
  const router = useRouter();

  const [EmailInput, setEmailInput] = useState("")
  const [EmailList, setEmailList] = useState([])

  //  Make ID function, I use this to create random ID
  // credit : https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  const makeid = (length) => {
  var result = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
  result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
  }
  return result;
  }

  useEffect(() => {
    const q = query(collection(db, "Email"), orderBy("email"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setEmailList(data);
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = EmailInput;
    
    if (email === "") {
      toast.error("Please enter an email address", { toastId: "unique" });
      return;
    }

    const emailExists = EmailList.find(emailList => emailList.email === email)
    if(emailExists){
      toast.error("Email already exists", { toastId: "unique", duration: 200  });
    }else{
      const eid = makeid(10);
      const data = {
        id: eid,
        email: email,
      }
      const docRef = doc(db, "Email", eid);
      setDoc(docRef, data);
    }
    setEmailInput("");
  }

  const deleteEmail = (id) => {
    window.confirm("Are you sure you want to delete this email?") && deleteDoc(doc(db, "Email", id));
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
      <h1 className={styles.heading}>Manage Users</h1>
      <form className={styles.AddEmail} onSubmit={(e)=>{handleFormSubmit(e)}}>
        <input type="email" name="email" value={EmailInput} placeholder="Enter Email to Add" onChange={(e)=>{setEmailInput(e.target.value)}}/>
        <button type="submit">Add</button>
      </form>
      <div className={styles.userList}>

        {EmailList.map(email => (
        <div className={styles.user} key={email.id}>
          <span className={styles.email}>{email.email}</span>
          <button value={email.id} onClick={(e)=>{deleteEmail(e.target.value)}}>Remove</button>
        </div>
        ))}

      </div>

    </div>
  );
};

export default AdminProtected(Admin);
