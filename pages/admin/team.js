import React from "react";
import { AdminProtected } from "../../src/routes";
import styles from "../../styles/Admin.module.css";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
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

function Team() {
  const router = useRouter();


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

  //  State
  const [ModalOpen, setModalOpen] = useState(true)
  const [TeamModalData, setTeamModalData] = useState({
    tid:makeid(6),
    teamName: ""
  })

  const [Emails, setEmails] = useState([])
  const [Team, setTeam ] = useState([])
  
  const [EmailInput, setEmailInput] = useState("")
  useEffect(() => {
    const q = query(collection(db, "Email"), orderBy("email"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setEmails(data);
    });
  }, []);
  
  useEffect(() => {
    const unique = [...new Map(Emails.map(item => [item["tid"], item])).values()];
    setTeam(unique);
  }, [Emails])
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(TeamModalData.teamName === ""){
      toast.error("Please enter a team name", { toastId: "unique" });
      return 0;
    }
    const email = EmailInput;
    
    if (email === "") {
      toast.error("Please enter an email address", { toastId: "unique" });
      return;
    }
    else if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
      toast.error("Please enter a valid email address", { toastId: "unique" });
      return;
    }

    const emailExists = Emails.filter(Emails => Emails.email === email)
    if(emailExists.length != 0){
      toast.error("Email already belongs to Team "+emailExists[0]?.teamName, { toastId: "unique", duration: 200  });
    }else{
      const eid = makeid(10);
      const data = {
        id: eid,
        tid: TeamModalData.tid,
        teamName: TeamModalData.teamName,
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
    <div>
      <span
        onClick={() => {
          router.back();
        }}
        className={styles.back}
      >
        Back
      </span>
      <h1 className={styles.heading}>Manage Teams</h1>
      <div className={styles.menu}>
        <span
          onClick={() => {
            setModalOpen(true);
            setTeamModalData({...TeamModalData,"tid":makeid(6)})
          }}
        >
          Add&nbsp;Team
        </span>
      </div>
    <div className={styles.TeamContainer}>
  {
    Team.map((team,index)=>{
      return(
      <div className={styles.Team} key={index}>
        <span className={styles.TeamName}>Team Name : <u>{team.teamName}</u></span>
        <div className={styles.TeamMemberEmails}>
          <div className={styles.TeamMemberEmailsList}>
            { Emails.filter(x => x.tid == team.tid).map((email,index) => {
                return (
                <span className={styles.Emails} key={index}>{email.email}</span>
                )})}
          </div>
        </div>
        <button id={team.tid} onClick={(e)=>{setTeamModalData(team);setModalOpen(true);}}>Modify</button>
      </div>
      )})}
     

    </div>


    {ModalOpen && 
      <div className={styles.AddModalContatiner}>
        <div className={styles.AddModal}>
        <span className={styles.modalClose} onClick={()=>{setModalOpen(false);setTeamModalData({"teamName":"","tid":makeid(6)});}}><FaTimes/></span>
          <div className={styles.AddModalHeader}>
            <h1>Add/Modify Team</h1>
          </div>
          <div className={styles.AddModalBody}>
            <span className={styles.TeamID}>Team ID : {TeamModalData.tid}</span>
            <input type="text" placeholder="Team Name" value={TeamModalData.teamName} onChange={(e)=>{setTeamModalData({...TeamModalData,"teamName":e.target.value})}}/>
            <div className={styles.AddMemberEmails}>
              <form onSubmit={(e)=>{handleFormSubmit(e)}}>
                <input type="text" placeholder="Member Email" value={EmailInput} onChange = {(e)=>{setEmailInput(e.target.value)}} />
                <button type="submit">Add Email</button>
              </form>
            </div>
            
            <div className={styles.ViewMemberEmails}>
              <span>Member Emails</span>
              { Emails.filter(x => x.tid == TeamModalData.tid).map(email => {
                return (
                  <div className={styles.MemberEmails} key={email.email}>
                    <span>
                      <span className={styles.emails}>
                        {email.email}
                      </span>
                      <button id={email.id} onClick={(e)=>{deleteEmail(e.target.id)}}>Remove</button>
                    </span>
                  </div>
                )
              })}

            </div>


          </div>
        </div>
      </div>
    }
    </div>
  )
}

export default AdminProtected(Team)