import  { getQuestion, NumberOfQuestion } from "../../api/index.ts";
import {db, auth} from "../../firebase"
import { doc, getDoc, updateDoc, increment,collection,where,query,getDocs } from "firebase/firestore";

const hint = async (args: string[]): Promise<string> => {
  
  const data = await getQuestion();
  const user = auth.currentUser;
  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();

  if(data.bonus){
    return `
no hint for bonus level
    `
  }
     if(userData.level == await NumberOfQuestion()){
      
          return `
Who Needs Hint Now
🥳🥳🥳 You have completed All Levels 🥳🥳🥳
          `
     }

  if( userData?.hint ){
    return`
Hint is :
${data.hint}
`
  }
  else{
    if(! args[0]){
      return `
Taking hint will deduct ${Math.floor(data.pts*0.2)} points 
from your current score
to continue enter command -> hint confirm
      `
    }
    else if(args[0] == 'confirm'){
      await updateDoc(docRef, {
        points:increment(-Math.floor(data.pts*0.2)),
        hint: true,
      });

      return `
Hint is :
${data.hint}
      `
    }
    else{
      return`
shell: command not found: skip ${args[0]}. Try 'help' to get started.
      `
    }
  }

};

export default hint;
