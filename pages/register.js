import React from 'react'
import { useUserContext } from "../src/context/authContext";



function Register() {
  const { user } = useUserContext();
  return (
    <>
      <h1>Register</h1>
      <div className={styles.BasicInfo}>
    
      </div>

    </>
  )
}

export default Register