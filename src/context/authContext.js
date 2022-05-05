import { createContext, useContext, useState, useEffect } from "react";

import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

import { auth, db } from "../firebase";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getTeamId, getTeamData } from "../api";


export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = (props) => {
 
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [TeamData, setTeamData] = useState({
        tid: "",
        name: "",
        points: 0,
        level: 1,
        hint : true
  });

  const AuthService = {
    loginWithGoogle : async () => {

        const provider = new GoogleAuthProvider();
        try {
            const userCred = await signInWithPopup(auth, provider)
            
            return {
                user:userCred.user
            }
            
        }catch(e){
            return{
                error:e.message
            }
        }


    },
    logout: async () => {
        await signOut(auth);
    },
  }

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
      const q = query(collection(db, "Email"), orderBy("email"));
      const querySnapshot = await getDocs(q);
      const emails = [];
      querySnapshot.forEach((doc) => {
        emails.push(doc.data());
      });
      if (emails.find(emailList => emailList.email == user.email)){
        setError(error ?? "");
        setUser(user ?? null);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        const tid = await getTeamId(user.email)
        const userProfile = {
                admin : docSnap.data().admin || false,
                displayName : user.displayName,
                uid : user.uid,
                email : user.email,
                photo : user.photoURL,
                tid : tid,
            }
        setTeamData(await getTeamData(tid));
        setUser(userProfile ?? null);
        await setDoc(docRef, userProfile );
      }
  };

  const logout = async () =>{
      await AuthService.logout();
      setUser(null);
  };


    const contextValue = { 
      loginWithGoogle, logout, user, error, setUser,TeamData, setTeamData
    };
  
  return (
    <UserContext.Provider value={contextValue} {...props}/>
  );
};