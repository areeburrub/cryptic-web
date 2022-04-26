import React from 'react';
import { useUserContext } from "../../context/authContext.js";
import styles from "./Ps1.module.css"


export const Ps1 = () => {
  const { user } = useUserContext();
  const username = user.displayName.replace(/\s/g, "").toLowerCase();
  return (
    <div>
      <span className={styles.username}>{username}</span>
      <span className={styles.at}>@</span>
      <span className={styles.cryptic}>
         cryptichunt
      </span>
      <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
    </div>
  );
};

export default Ps1;
