import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAboutItems, setShowAboutItems] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY >= window.innerHeight) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAboutItems(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Hedda Olimb Portfolio</title>
      </Head>

      {/* NAVBAR */}
      <header className={styles.navbar}>
        <div className={styles.logo}>HO</div>
        <nav className={styles.navLinks}>
          <span onClick={() => scrollToSection("about")}>About</span>
          <span onClick={() => scrollToSection("education")}>Education</span>
          <span onClick={() => scrollToSection("work")}>Work</span>
          <span onClick={() => scrollToSection("projects")}>Projects</span>
          <span onClick={() => scrollToSection("courses")}>Courses</span>
          <span onClick={() => scrollToSection("contact")}>Contact</span>
        </nav>
      </header>

      {/* HERO */}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Hi, I'm Hedda Olimb.</h1>
          <p className={styles.subtitle}>Welcome to my website!</p>
          <button
            className={styles.exploreBtn}
            onClick={() => scrollToSection("about")}
          >
            Explore
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      {showSidebar && (
        <div className={styles.sidebar}>
          <img
            src="/images/meg.jpg"
            alt="Hedda Olimb"
            className={styles.sidebarImg}
          />
          <div className={styles.sidebarInfo}>
            <h2>Hedda Olimb</h2>
            <p>Web Developer</p>
            <p>Email: hedda@example.com</p>
            <p>Tlf: 123 45 678</p>
            <p>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className={styles.mainContent}>
        <section id="about" className={styles.section}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div ref={aboutRef} className={styles.aboutBox}>
            <div
              className={`${styles.aboutItem} ${
                showAboutItems ? styles.show : ""
              }`}
            >
              <span className={styles.icon}>
                <img src="/icons/norway.svg" alt="Norway" />
              </span>
              My name is Hedda, and I am a 25-year-old educated web developer
              from Norway.
            </div>
            <div
              className={`${styles.aboutItem} ${
                showAboutItems ? styles.show : ""
              }`}
            >
              <span className={styles.icon}>
                <img src="/icons/webdev.svg" alt="WebDev" />
              </span>
              I have a bachelor's degree in Web Development from NTNU – the
              Norwegian University of Science and Technology.
            </div>
            <div
              className={`${styles.aboutItem} ${
                showAboutItems ? styles.show : ""
              }`}
            >
              <span className={styles.icon}>
                <img src="/icons/drawing.svg" alt="Drawing" />
              </span>
              Experienced in web development, UX/UI design, graphic design, and
              more.
            </div>
            <div
              className={`${styles.aboutItem} ${
                showAboutItems ? styles.show : ""
              }`}
            >
              <span className={styles.icon}>
                <img src="/icons/dogpugface.svg" alt="PugFace" />
              </span>
              In my free time, I love dogs – I have six of them that you’ll get
              to meet soon.
            </div>
            <div
              className={`${styles.aboutItem} ${
                showAboutItems ? styles.show : ""
              }`}
            >
              <span className={styles.icon}>
                <img src="/icons/game.svg" alt="Game" />
              </span>
              Curious and always eager to learn – currently exploring game
              development.
            </div>
          </div>
        </section>

        <section id="education" className={styles.section}>
          <div>Education</div>
        </section>
        <section id="work" className={styles.section}>
          <div>Work experience</div>
        </section>
        <section id="projects" className={styles.section}>
          <div>Projects</div>
        </section>
        <section id="courses" className={styles.section}>
          <div>Courses and Certifications</div>
        </section>
        <section id="contact" className={styles.section}>
          <div>Contact</div>
        </section>
      </div>
    </>
  );
}
