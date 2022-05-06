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
<<<<<<< HEAD

  // const q = query(collection(db, "Email"), orderBy("email"));
  // const querySnapshot = await getDocs(q);
  // const emails = []
  // querySnapshot.forEach((doc) => {
  //   emails.push(doc.data());
  // });

  const docRef = doc(db, "Controls", "Emails");
  const docSnap = await getDoc(docRef);
  const emails = docSnap.data().Emails;

=======
  const q = query(collection(db, "Email"), orderBy("email"));
  const querySnapshot = await getDocs(q);
  const emails = []
  querySnapshot.forEach((doc) => {
    emails.push(doc.data());
  });
>>>>>>> 0c1579952845cb4bd34230d33eeb03718b2b0db8
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
<<<<<<< HEAD
    // const q = query(collection(db, "Email"), where("tid", "==", teamId));
    // const querySnapshot = await getDocs(q);
    // const team = [];
    // querySnapshot.forEach((doc) => {
    //   team.push(doc.data());
    // });

  const docRef = doc(db, "Controls", "Emails");
  const docSnap = await getDoc(docRef);
  const emails = docSnap.data().Emails;
  const team = emails.filter((item) => item["tid"] == teamId);
    const teamData =  {
        tid: teamId,
        name: team[0]["teamName"],
=======
    const q = query(collection(db, "Email"), where("tid", "==", teamId));
    const querySnapshot = await getDocs(q);
    const emails = []
    querySnapshot.forEach((doc) => {
      emails.push(doc.data());
    });
    const teamData =  {
        tid: teamId,
        name: emails[0]["teamName"],
>>>>>>> 0c1579952845cb4bd34230d33eeb03718b2b0db8
        points: 0,
        level: 1,
        hint : false
      }
    const data = await setDoc(docRef,teamData);
    return data;
  }
}