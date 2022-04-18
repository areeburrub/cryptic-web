import { createContext, useContext, useState, useEffect } from "react";

import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

import { auth, db } from "../firebase";

import { doc, setDoc, getDoc } from "firebase/firestore";


export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = (props) => {
 
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");


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
      setError(error ?? "");
      setUser(user ?? null);


      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      const userProfile = {
              displayName : user.displayName,
              uid : user.uid,
              email : user.email,
              photo : user.photoURL,
              createdAt : new Date().toISOString(),
              points : docSnap.points || 0,
              completed : docSnap.completed || 0,
          }
      setUser(userProfile ?? null);

      if(!docSnap.exists()){
          await setDoc(docRef, userProfile );   
      }else{
          setUser(docSnap.data() ?? null);
      }
  };

  const logout = async () =>{
      await AuthService.logout();
      setUser(null);
  };


    const contextValue = { 
      loginWithGoogle, logout, user, error, setUser
    };
  
  return (
    <UserContext.Provider value={contextValue} {...props}/>
  );
};