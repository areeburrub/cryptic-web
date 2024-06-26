import React, { useEffect, useState } from "react";
import { useUserContext } from "../src/context/authContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../src/firebase";
<<<<<<< HEAD
import { collection, query, where, getDocs, orderBy,doc, onSnapshot } from "firebase/firestore";
=======
import { collection, query, where, getDoc, orderBy,doc, onSnapshot } from "firebase/firestore";
>>>>>>> 0c1579952845cb4bd34230d33eeb03718b2b0db8

export function withPublic(Component) {
  return function WithPublic(props) {
    const useauth = useUserContext();
    const router = useRouter();
    useEffect(() => {
    }, []);
    return <Component useauth={useauth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const useauth = useUserContext();
    const router = useRouter();

    const [EmailExist, setEmailExist] = useState(true);

    const emailUpadate = async () =>{
<<<<<<< HEAD
      // const q = query(collection(db, "Email"), orderBy("email"));
      // const querySnapshot = await getDocs(q);
      // const emails = [];
      // querySnapshot.forEach((doc) => {
      //   emails.push(doc.data());
      // });

      const docRef = doc(db, "Controls", "Emails");
      const docSnap = await getDoc(docRef);
      const emails = docSnap.data().Emails
      if (emails.find((emailList) => emailList.email == useauth.user?.email)) {
        setEmailExist(true);
      } else {
=======
      const docRef = doc(db, "Controls", "Emails");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data().Emails
      if (data.find(emailList => emailList.email == useauth.user?.email)){
        setEmailExist(true);
      }
      else{
>>>>>>> 0c1579952845cb4bd34230d33eeb03718b2b0db8
        setEmailExist(false);
      }
    }

    useEffect(() => {
      emailUpadate();
    }, []);


    if (!useauth.user || !EmailExist) {
      router.replace("/");
      toast.info("Please Login using Registered Email", { toastId: "unique" });
      return <div className="loading1"></div>;
    }
    return <Component useauth={useauth} {...props} />;
  };
}

export function AdminProtected(Component) {
  return function AdminProtected(props) {
    const useauth = useUserContext();
    const router = useRouter();

    if (!useauth.user?.admin) {
      toast.info("You don't have Admin Access", { toastId: "unique" });
      router.replace("/");
      return <div className="loading1"></div>;
    }

    return <Component useauth={useauth} {...props} />;
  };
}
