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

  const msg =`
  As we have completed our main event
  this website is now open for everyone to enjoy 😉


  `;
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