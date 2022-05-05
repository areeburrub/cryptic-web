import { checkAnswer, getQuestion, NumberOfQuestion } from './../../api/index.ts';
import {db, auth} from "../../firebase"
import { doc, getDoc, updateDoc, increment,query,collection,getDocs } from "firebase/firestore";


const question = async (args: string[]): Promise<string> => {
     const data = await getQuestion();
     const user = auth.currentUser;
  const docRef1 = doc(db, "Users", user.uid);
  const docSnap1 = await getDoc(docRef1);
  const userData = docSnap1.data();
  const docRef = doc(db, "Teams", userData.tid);

    const q2 = query(collection(db, "Controls"));
    const querySnapshot = await getDocs(q2);
    const accepting = [];
    querySnapshot.forEach((doc) => {
      accepting.push(doc.data());
    });





     if(!accepting[0].isChecked){
      
          return `
We are no more accepting answers.
Wait for results to be released
          `
     }

     if(userData.level == await NumberOfQuestion()){
      
          return `
No Need to Answer Now
🥳🥳🥳 You have completed All Levels 🥳🥳🥳
          `
     }

    if(! args[0]){
      return `
enter some answer after using answer command
like this:
answer YOUR ANSWER HERE
      `
    }
    else {
      
      if(await checkAnswer(args)){
          await updateDoc(docRef, {
            level: increment(1),
            points: increment(data.pts),
            hint:false
          });
          return `
Correct 🥳 Answer moving to Next Level
          `
        }
      else{
        return `
        Wrong 🤯 Answer
        `
      }

    }
  

};

export default question;
