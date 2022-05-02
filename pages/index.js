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
            A website for the Cryptic Hunt game.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            In cum ad at molestiae sunt excepturi praesentium,
            vitae eos vero quas voluptatum cupiditate fuga error velit!
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ad ab ullam ipsam nulla illum quam quod consequatur consectetur vitae.
            Debitis minima fugiat maxime voluptates ad quae est laudantium quam tempora
            perspiciatis magnam corrupti ducimus, officiis veniam sint similique inventore rerum neque nostrum,
            unde impedit? Eos, quae illum illo provident laboriosam maiores impedit dolore?
            Nemo architecto natus deleniti voluptatibus alias a, soluta labore minus nulla
            reprehenderit deserunt debitis sapiente exercitationem! Ab ipsa, numquam sapiente
            placeat itaque ea maxime magnam. Similique cum minus est eligendi deleniti provident
            id quos praesentium ex pariatur. Pariatur deserunt molestiae velit sint sed nobis illo dicta nihil?
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