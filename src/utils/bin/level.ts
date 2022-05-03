import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const level = async (args: string[]): Promise<string> => {
  
  const user = auth.currentUser;
  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();
  
  const level = userData.level;
  return `You are on Level ${level}`;
};

export default level;
