import { db } from "../../src/firebase";
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

// const q = query(collection(db, "Email"), orderBy("email"));
// const querySnapshot = await getDocs(q);
// const emails = []
// querySnapshot.forEach((doc) => {
//   emails.push(doc.data());
// });

// const unique = [...new Map(emails.map((item) => [item["tid"], item])).values()];

export const getTeamId = async (email) => {
  const q = query(collection(db, "Email"), orderBy("email"));
  const querySnapshot = await getDocs(q);
  const emails = []
  querySnapshot.forEach((doc) => {
    emails.push(doc.data());
  });
  const teamId = emails.filter((item) => item["email"] == email);
  const output = teamId.length == 0 ? "":teamId[0]["tid"];
  return output;
}

export const getTeamData = async (teamId) => {
  const docRef = doc(db, "Teams", teamId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  else{
    const q = query(collection(db, "Email"), where("tid", "==", teamId));
    const querySnapshot = await getDocs(q);
    const emails = []
    querySnapshot.forEach((doc) => {
      emails.push(doc.data());
    });
    const teamData =  {
        tid: teamId,
        name: emails[0]["teamName"],
        points: 0,
        level: 1,
        hint : false
      }
    const data = await setDoc(docRef,teamData);
    return data;
  }
}