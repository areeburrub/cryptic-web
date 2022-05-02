import  { getQuestion } from "../../api/index.ts";

const question = async (args: string[]): Promise<string> => {
     const data = await getQuestion();
     const bonus = data.bonus? `

          !!!! This is a bonus question !!!!
          You can skip this question
          use skip command
     ` : '';
     const file = data.files==""? "":`

attached links : <a target="__blank" href="${data.files}"><u>Click Here</u></a>`;
     const question = data.question == "" ? "":`
Question is :
${data.question}
     `
     return `
Level is: ${data.level} ${question} ${file} ${bonus}
`
};

export default question;
