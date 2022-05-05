import React from 'react'
import { AdminProtected } from '../../src/routes'
import styles from '../../styles/Admin.module.css'
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Admin Page</h1>
      <div className={styles.menu}>
        <span onClick={()=>{router.push('/admin/questions')}}>
          Manage&nbsp;Question
        </span>
        <span onClick={()=>{router.push('/admin/users')}}>
          Manage&nbsp;User
        </span>
        <span onClick={()=>{router.push('/admin/team')}}>
          Manage Teams
        </span>
        <span onClick={()=>{router.push('/admin/leaderboard')}}>
          Leaderboard
        </span>
        <span onClick={()=>{router.push('/admin/controls')}}>
          Admin Controls
        </span>
      </div>
    </div>
  )
}

export default AdminProtected(Admin)