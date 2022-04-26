import  { getQuestion } from "../../api/index.ts";

const question = async (args: string[]): Promise<string> => {
     const data = await getQuestion();
     const bonus = data.bonus? `

          !!!! This is a bonus question !!!!
          You can skip this question
          use skip command
     ` : '';
     const file = data.files==""? "":`
attached files : <a target="__blank" href="${data.files}"><u>Click Download</u></a>`;
     return `
Level is: ${data.level}
Question is :
${data.question}
${file}
${bonus}
`
};

export default question;
