import React from "react";
import { AdminProtected } from "../../src/routes";
import styles from "../../styles/Admin.module.css";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

import { db } from "../../src/firebase";
import {
  doc,
  setDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Admin = () => {
  const router = useRouter();

  //  Make ID function, I use this to create random ID
  // credit : https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const [Question, setQuestion] = useState([]);
  const [QuestionModal, setQuestionModal] = useState(false);
  const [Modaldata, setModaldata] = useState({
    id: null,
    question: "",
    answer: "",
    level: 0,
    pts:0,
    bonus: false,
    files: "",
    hint:""
  });

  const addQuestion = async () => {
    const data = Modaldata;
    const qid = Modaldata.id == null ? makeid(10) : Modaldata.id;
    data.id = qid;
    const docRef = doc(db, "Questions", qid);
    setDoc(docRef, data);
    setModaldata({
      id: null,
      question: "",
      answer: "",
      level: 0,
      pts:0,
      bonus: false,
      files: "",
      hint:""
    });
    setQuestionModal(false);
  };

  const modifyQuestion = (index) => {
    const data = Question[index];
    setModaldata(data);
    setQuestionModal(true);
  };


  

  useEffect(() => {
    const q = query(collection(db, "Questions"), orderBy("level"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setQuestion(data);
    });

  }, []);

  return (
    <div className={styles.main}>
      <span
        onClick={() => {
          router.back();
        }}
        className={styles.back}
      >
        Back
      </span>
      <h1 className={styles.heading}>Manage Questions</h1>
      <div className={styles.menu}>
        <span
          onClick={() => {
            setQuestionModal(true);
          }}
        >
          Add&nbsp;Question
        </span>
      </div>
      <div className={styles.questions}>
        {Question.map((q, i) => {
          return (
            <div className={styles.question} key={i}>
              <div className={styles.questionText}>
                <div>
                  <span className={styles.number}>Level {q.level}</span>
                  <span className={styles.number}>{q.pts} points</span>
                  { q.bonus && <span className={styles.number}>Bonus</span>}
                </div>
                <span>{q.question}</span>
              </div>
              <div className={styles.questionAnswer}>
                <span>Answer: </span>
                <span className={styles.hidden}>{q.answer}</span>
              </div>
              <div className={styles.questionAnswer}>
                <span>Hint: </span>
                <span className={styles.hidden}>{q.hint}</span>
              </div>
              <div className={styles.questionFiles}>
                <span>Files: </span>
                <span>{q.files}</span>
              </div>
              <div className={styles.questionActions}>
                <button
                  value={i}
                  onClick={(e) => {
                    modifyQuestion(e.target.value);
                  }}
                >
                  Modify
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {QuestionModal && (
        <div className={styles.AddQuestionModal}>
          <div className={styles.AddQuestionModalContent}>
            <div className={styles.AddQuestionModalHeader}>
              <span>Add Question</span>
              <span
                className={styles.close}
                onClick={() => {
                  setQuestionModal(false);
                }}
              >
                <FaTimes />
              </span>
            </div>
            <div className={styles.AddQuestionModalBody}>
              <div>
                <span>Level: </span>
                <input
                  type="number"
                  value={Modaldata.level}
                  onChange={(e) => {
                    setModaldata({ ...Modaldata, level: parseInt(e.target.value) });
                  }}
                />
              </div>
              <div>
                <span>Points Alloted: </span>
                <input
                  type="number"
                  value={Modaldata.pts}
                  onChange={(e) => {
                    setModaldata({ ...Modaldata, pts : parseInt(e.target.value) });
                  }}
                />
              </div>
              <div>
                <span>Bonus: </span>
                <input
                  type="checkbox"
                  checked={Modaldata.bonus}
                  onChange={(e) => {
                    setModaldata({ ...Modaldata, bonus: e.target.checked });
                  }}
                />
              </div>
              <div>
                <span>Question: </span>
                <br />
                <textarea
                  onChange={(e) => {
                    setModaldata({ ...Modaldata, question: e.target.value });
                  }}
                >
                  {Modaldata.question}
                </textarea>
              </div>
              <div>
                <span>Answer: </span>
                <input
                  type="text"
                  value={Modaldata.answer}
                  onChange={(e) => {
                    setModaldata({ ...Modaldata, answer: e.target.value });
                  }}
                />
              </div>
              <div>
                <span>Hint: </span>
                <input
                  type="text"
                  value={Modaldata.hint}
                  onChange={(e) => {
                    setModaldata({ ...Modaldata, hint: e.target.value });
                  }}
                />
              </div>
              <div>
                <span>File URL: </span>
                <input
                  type="text"
                  value={Modaldata.files}
                  onChange={(e) => {
                    setModaldata({ ...Modaldata, files: e.target.value });
                  }}
                />
              </div>
              <button
                onClick={() => {
                  addQuestion();
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProtected(Admin);
