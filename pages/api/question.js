import { db, auth } from "../../src/firebase";
import {
  doc,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  getDoc
} from "firebase/firestore";

 const handler = async (req, res) => {

  const docRef = doc(db, "Users", req.query.uid);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();

  const q = query(collection(db, "Questions"), where("level", "==", userData.level));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  const output = await data[0];

  res.status(200).json(output);
}

export default handler;
