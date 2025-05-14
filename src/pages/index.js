import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hedda Olimb Portfolio</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Hi, I'm Hedda Olimb.</h1>
          <p className={styles.subtitle}>Welcome to my website!</p>
          <button className={styles.exploreBtn}>Explore</button>
        </div>
      </div>
    </>
  );
}
