import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dividerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSidebarVisibility = () => {
      const divider = dividerRef.current;
      if (divider) {
        const rect = divider.getBoundingClientRect();
        if (rect.top <= 0) {
          setShowSidebar(true);
        } else {
          setShowSidebar(false);
        }
      }
    };
    window.addEventListener("scroll", handleSidebarVisibility);
    return () => window.removeEventListener("scroll", handleSidebarVisibility);
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

      <header
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      >
        <div className={styles.logo}>HO</div>
        <nav className={styles.navLinks}>
          <span onClick={() => scrollToSection("about")}>About</span>
          <span onClick={() => scrollToSection("courses")}>
            Courses & Certificates
          </span>
          <span onClick={() => scrollToSection("education")}>Education</span>
          <span onClick={() => scrollToSection("work")}>Work</span>
          <span onClick={() => scrollToSection("projects")}>Projects</span>
          <span onClick={() => scrollToSection("contact")}>Contact</span>
        </nav>
      </header>

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
      <div className={styles.divider} ref={dividerRef}></div>

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

      <div
        className={`${styles.mainContent} ${
          showSidebar ? styles.withSidebar : ""
        }`}
      >
        <section id="about" className={styles.section}>
          About Me
        </section>
        <section id="courses" className={styles.section}>
          Courses and Certificates
        </section>
        <section id="education" className={styles.section}>
          Education
        </section>
        <section id="work" className={styles.section}>
          Work Experience
        </section>
        <section id="projects" className={styles.section}>
          Projects
        </section>
        <section id="contact" className={styles.section}>
          Contact
        </section>
      </div>
    </>
  );
}
