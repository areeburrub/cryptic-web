import React, { useEffect, useState } from "react";
import { useUserContext } from "../src/context/authContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../src/firebase";
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";

export function withPublic(Component) {
  return function WithPublic(props) {
    const useauth = useUserContext();
    const router = useRouter();
    useEffect(() => {
      //   console.log("route",useauth.user);
      //   if(useauth.user){
      //       router.replace("/dashboard");
      //       return <div className="loading1"></div>;
      //   }
    }, []);
    return <Component useauth={useauth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const useauth = useUserContext();
    const router = useRouter();

    const [EmailExist, setEmailExist] = useState(true);

    useEffect(() => {
      const q = query(collection(db, "Email"), orderBy("email"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        if (data.find(emailList => emailList.email == useauth.user?.email)){
          setEmailExist(true);
        }
        else{
          setEmailExist(false);
        }
      });
    }, []);


    console.log(useauth.user);
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

    if (!useauth.user.admin) {
      toast.info("You don't have Admin Access", { toastId: "unique" });
      router.replace("/");
      return <div className="loading1"></div>;
    }

    return <Component useauth={useauth} {...props} />;
  };
}
