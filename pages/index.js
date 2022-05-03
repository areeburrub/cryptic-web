import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withPublic } from '../src/routes';
import { useUserContext } from "../src/context/authContext";
import { useRouter } from 'next/router';

const Home = () => {

  const router = useRouter();

  const { loginWithGoogle } = useUserContext();

  const SignIn = async (e) => {
    e.preventDefault();
    const loginProcess = await loginWithGoogle();
    router.replace("/dashboard");
  }

  return (
    <div className={styles.container}  style={{ background: `linear-gradient(#00000053,#0000008b) , url("/main-bg.gif")  no-repeat center center `, backgroundSize:"cover" }}>
      <Head>
        <title>Cryptic Hunt Website - Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Cryptic Hunt Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Cryptic Hunt
          </h1>
          <p className={styles.description}>            
            
            Rules & Guidelines:<br/>
            1. Only lowercase letters should be used<br/>
            2. use PCs, laptops, etc for better experience<br/>
            <br/>
            <br/>
            All the very best Guys!!!
            <br/>
            <br/>
            Date : 6 th - 7 th May 2022
            <br/>
            <br/>

            Event Registration Fees:<br/>
            ₹150 for team(up to 4 members)<br/>
            ₹ 60for individual
            <br/>
            <br/>

            Registration Link : <a href="https://docs.google.com/forms/d/e/1FAIpQLScIs7qTLrEfJEi-MhSoanHwFu1HtTf4h-Zr6hFvqMuVhJclVw/viewform?usp=sf_link" target="__blank">click here</a>
          
          </p>
        </div>

        <div className={styles.login}>
          <h1 className={styles.title}>Login to Participate </h1>
          <button className={styles.googleBTN} onClick={(e)=>{SignIn(e)}}>Continue with Google</button>
        </div>
      </main>


    </div>
  )
}

export default withPublic(Home)