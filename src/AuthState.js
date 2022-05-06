import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "./context/authContext";
import { auth, db } from "./firebase";

import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
  deleteDoc,
  where,
} from "firebase/firestore";


export default function AuthStateChanged({ children }) {
  const { user, setUser, setTeamData } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data() ?? null);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });


  }, []);

  if (loading) {
    return <div className="loading1"></div>;
  }
  return children;
}
