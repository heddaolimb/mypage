import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAboutItems, setShowAboutItems] = useState(false);
  const [showDogs, setShowDogs] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showEducation, setShowEducation] = useState(false); // ✅ NY DEL

  const [selectedJob, setSelectedJob] = useState("job1");

  const jobs = {
    job1: {
      title: "Frontend Developer",
      company: "Netlife Design",
      period: "2023 - now",
      description:
        "Worked with design systems and React to create scalable frontend solutions.",
    },
    job2: {
      title: "Internship UX/UI",
      company: "Designit",
      period: "2022 - 2023",
      description:
        "Participated in UX research and wireframing using Figma. Collaborated with devs.",
    },
    job3: {
      title: "Freelancer",
      company: "Various clients",
      period: "2021 - 2022",
      description:
        "Built websites and portfolios for small businesses using modern tools.",
    },
  };

  const aboutRef = useRef(null);
  const dogsRef = useRef(null);
  const educationRef = useRef(null); // ✅ NY DEL

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

  useEffect(() => {
    const observerDogs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowDogs(true);
        }
      },
      { threshold: 0.3 }
    );

    if (dogsRef.current) {
      observerDogs.observe(dogsRef.current);
    }

    return () => {
      if (dogsRef.current) {
        observerDogs.unobserve(dogsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observerEducation = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowEducation(true);
        }
      },
      { threshold: 0.3 }
    );

    if (educationRef.current) {
      observerEducation.observe(educationRef.current);
    }

    return () => {
      if (educationRef.current) {
        observerEducation.unobserve(educationRef.current);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSayHi = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 2000);
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
          <h1 className={styles.title}>Hi, I'm Hedda.</h1>
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
        {/* About Me beholdes urørt */}
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

          {/* Hundeseksjon */}
          <div
            ref={dogsRef}
            className={`${styles.dogSection} ${showDogs ? styles.show : ""}`}
          >
            <h3 className={styles.dogTitle}>Say hi to my dogs!</h3>
            <div className={styles.dogImgBox}>
              <img
                src="/images/girls-fotor-bg-remover-20250515175420.png"
                alt="My dogs"
                className={styles.dogImg}
              />
              <div
                className={`${styles.speakBubble} ${
                  showDogs ? styles.show : ""
                }`}
                onClick={handleSayHi}
              >
                Hi!
              </div>
              <span
                className={`${styles.dogName} ${styles.show}`}
                style={{ top: "20%", left: "20%", transitionDelay: "0.3s" }}
              >
                Fido
              </span>
              <span
                className={`${styles.dogName} ${styles.show}`}
                style={{ top: "10%", left: "55%", transitionDelay: "0.6s" }}
              >
                Luna
              </span>
              <span
                className={`${styles.dogName} ${styles.show}`}
                style={{ top: "15%", left: "75%", transitionDelay: "0.9s" }}
              >
                Bella
              </span>
              <span
                className={`${styles.dogName} ${styles.show}`}
                style={{ top: "60%", left: "18%", transitionDelay: "1.2s" }}
              >
                Max
              </span>
              <span
                className={`${styles.dogName} ${styles.show}`}
                style={{ top: "58%", left: "50%", transitionDelay: "1.5s" }}
              >
                Milo
              </span>
              <span
                className={`${styles.dogName} ${styles.show}`}
                style={{ top: "62%", left: "80%", transitionDelay: "1.8s" }}
              >
                Nala
              </span>
              {showHearts && (
                <div className={styles.hearts}>
                  <span>❤️</span>
                  <span>❤️</span>
                  <span>❤️</span>
                  <span>❤️</span>
                  <span>❤️</span>
                  <span>❤️</span>
                  <span>❤️</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Resten */}
        <section id="education" className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div
            ref={educationRef}
            className={`${styles.educationTimeline} ${
              showEducation ? styles.show : ""
            }`}
          >
            <div
              className={styles.educationItem}
              style={{ transitionDelay: "0.3s" }}
            >
              <span className={styles.educationYear}>2021 - 2024</span>
              <div className={styles.educationBox}>
                <h3>Bachelor in Web Development</h3>
                <p>
                  Norwegian University of Science and Technology (NTNU). Focused
                  on modern web technologies, UX/UI principles, and front-end
                  frameworks.
                </p>
              </div>
            </div>

            <div
              className={styles.educationItem}
              style={{ transitionDelay: "0.7s" }}
            >
              <span className={styles.educationYear}>2020 - 2021</span>
              <div className={styles.educationBox}>
                <h3>Front-end & UX Design</h3>
                <p>
                  Completed online courses and bootcamps focusing on user
                  experience, interaction design, and accessibility.
                </p>
              </div>
            </div>

            <div
              className={styles.educationItem}
              style={{ transitionDelay: "1.1s" }}
            >
              <span className={styles.educationYear}>2017 - 2020</span>
              <div className={styles.educationBox}>
                <h3>High School Diploma</h3>
                <p>
                  Specialized in media and communication. Developed early skills
                  in design, web tools, and digital storytelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <div className={styles.workContainer}>
            <div className={styles.workTabs}>
              <button
                className={selectedJob === "job1" ? styles.activeTab : ""}
                onClick={() => setSelectedJob("job1")}
              >
                Netlife
              </button>
              <button
                className={selectedJob === "job2" ? styles.activeTab : ""}
                onClick={() => setSelectedJob("job2")}
              >
                Designit
              </button>
              <button
                className={selectedJob === "job3" ? styles.activeTab : ""}
                onClick={() => setSelectedJob("job3")}
              >
                Freelance
              </button>
            </div>

            <div className={styles.workDetails}>
              <h3>{jobs[selectedJob].title}</h3>
              <p>
                <strong>{jobs[selectedJob].company}</strong> —{" "}
                {jobs[selectedJob].period}
              </p>
              <p>{jobs[selectedJob].description}</p>
            </div>
          </div>
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
