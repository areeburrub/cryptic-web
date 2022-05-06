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

  const msg = `
Welcome to the Cryptic hunt! Glad You are here.

As u are aware, cryptic hunt event is an online treasure hunt being conducted under the Metacognition '22 by Team Enthiran ! 

Before beginning, please go through the below mentioned rules and Guidelines!

We wish you luck!

  `

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
            {msg}
            
  Get Rules & Guidelines : <a href="https://firebasestorage.googleapis.com/v0/b/cryptic-22.appspot.com/o/rules.pdf?alt=media&token=be89d62f-94fe-420b-9417-69d7733e71c2" target="__blank" download>click here</a>
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