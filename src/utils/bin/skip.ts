import  { getQuestion } from "../../api/index.ts";
import {db, auth} from "../../firebase"
import { doc, updateDoc, increment } from "firebase/firestore";

const skip = async (args: string[]): Promise<string> => {
  
  const data = await getQuestion();
  if(! data.bonus){
    return `
You can't skip this question
    `
  }
  else{
    if(! args[0]){
      return `
once skipped this question can't be reviewed
enter command -> skip confirm
      `
    }
    else if(args[0] == 'confirm'){
      const user = auth.currentUser;
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, {
        level: increment(1),
        hint: false
      });

      return `
      Bonus Level ${data.level} skipped
      `
    }
    else{
      return`
shell: command not found: skip ${args[0]}. Try 'help' to get started.
      `
    }
  }

     const bonus = data.bonus? `

          !!!! This is a bonus question !!!!
          You can skip this question
          use skip command
     ` : '';
     return `
Level is: ${data.level}
Question is :
${data.question}
attached files : <a target="__blank" href="${data.files}"><u>Click Download</u></a>
${bonus}
`
};

export default skip;
