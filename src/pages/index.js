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

  // ✅ Endret: description er nå array
  const jobs = {
    job1: {
      title: "Health care assistant",
      company: "Villa Skaar Jevnaker",
      period: "Summers/with more- 2018, 2020, 2021, 2022, 2023, year 2024",
      description: [
        "Gained practical experience in geriatric care, infection control procedures, and basic medical knowledge related to common illnesses affecting the elderly. ",
        "Received training in safe patient handling and mobility techniques, including how to prevent injuries during heavy lifting and transfers.",
        "Worked extensively in one-on-one care settings, which included instruction in personal safety and de-escalation techniques to manage potentially aggressive or unpredictable situations.",
        "Also acquired knowledge in nutrition, personal hygiene, and the daily routines essential for maintaining residents' physical and mental well-being.",
      ],
    },
    job2: {
      title: "Operational Soldier",
      company:
        "Royal Norwegian Armed Forces (FOH - Norwegian Joint Headquarters)",
      period: "2019",
      description: [
        "Served in the Norwegian Armed Forces at the Joint Operational Headquarters (FOH) as part of the Royal Norwegian Navy.",
        "Stationed at the Surveillance Center, where I worked with real-time maritime monitoring and situational awareness across Norwegian and NATO waters.",
        "Operated classified surveillance and command systems in a high-security environment to track, report, and assess sea activity in strategic areas such as the North Atlantic.",
        "Supported national defense readiness and contributed to the coordination and communication of joint military operations between Norwegian and allied forces.",
        "Gained hands-on experience with both technical and operational military systems in a maritime setting, focusing on secure information flow, mission support, and operational oversight.",
        "Certificate in Qualified First Aid – Level 2",
        "Certificate in Training on Organizational Work, Meeting Management Techniques, and Health, Safety and Environment (HSE).",
        "I was appointed as the elected representative within my shift team.",
      ],
    },

    job3: {
      title: "Health care assistant",
      company: "JORS - Jevnaker Care and Rehabilitation Center",
      period: "Summer 2017",
      description: [
        "Performed a wide range of essential care duties in a nursing home environment, focusing on hygiene routines, assistance with meals, mobility support, and observing residents' physical and mental health.",
        "Gained insight into professional standards of elderly care, including communication with residents, documentation of care, and working as part of a multidisciplinary team. ",
        "Built upon previous knowledge in infection control, nutrition, and basic medical care, while adapting to the structured routines of a larger care facility.",
        "Certificate in Training on Ethics and Attitudes, User Involvement, Use of Force and Coercion, Hygiene and Personal Care, Dementia, Mobility, and Fire Safety",
      ],
    },
  };

  // ...

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
              My name is Hedda, I'm a 25-year-old educated web developer from
              Norway.
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
              My biggest passion is dogs – I have six of them that you’ll get to
              meet soon.
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
              <span className={styles.educationYear}>2015 - 2018</span>
              <div className={styles.educationBox}>
                <h3>High School – Hadeland Upper Secondary School (Norway)</h3>
                <ul className={styles.bulletList}>
                  <p>
                    Specialization in general studies, with subjects including:
                  </p>

                  <li>
                    English and Spanish (participated in Erasmus+ project
                    Learning through Languages and Culture in 2017 at Institut
                    de Bruguers, Gava, Spain).
                  </li>
                  <li>Information Technology 1.</li>
                  <li>Marketing and Management 1 & 2.</li>
                  <li>Politics and Human Rights 1 & 2.</li>
                  <li>Sociology and Social Anthropology.</li>
                  <li>Law 1 (Norwegian Legal Studies).</li>
                </ul>
              </div>
            </div>

            <div
              className={styles.educationItem}
              style={{ transitionDelay: "0.7s" }}
            >
              <span className={styles.educationYear}>2020 - 2023</span>
              <div className={styles.educationBox}>
                <h3>
                  Bachelor in Web Development - Norwegian University of Science
                  and Technology (NTNU)
                </h3>
                <ul className={styles.bulletList}>
                  <li>
                    Built static and dynamic websites using HTML, CSS,
                    JavaScript, Node.js, PHP, and React.
                  </li>
                  <li>
                    Familiar with Tailwind, Express, SQL (MySQL), MongoDB, REST
                    APIs, and Postman.
                  </li>
                  <li>
                    Used tools like Figma, Miro, GitHub, Adobe Creative Cloud
                    (Photoshop, InDesign), and VS Code.
                  </li>
                  <li>
                    Experienced with responsive layouts, prototyping, and
                    mobile-first design principles.
                  </li>
                  <li>
                    Worked on project-based development with planning and
                    collaboration.
                  </li>
                  <li>
                    Covered accessibility (WCAG), SEO (meta-tags), and usability
                    testing.
                  </li>
                  <li>
                    Learned information architecture, databases, and content
                    structuring.
                  </li>
                  <li>
                    Explored cloud tech, deployment, and Raspberry Pi server
                    usage.
                  </li>
                  <li>
                    Studied history and protocols of the Internet and the WWW.
                  </li>
                  <li>
                    Understood GDPR, ethics, legal frameworks, and research
                    methods.
                  </li>
                  <li>
                    All coursework in English – fluent in written and spoken
                    English.
                  </li>
                  <li>
                    Served as an elected representative for the Faculty of
                    Architecture and Design in 2023. The Student Council
                    (Studenttinget) is the highest student body at NTNU and
                    represents all NTNU students. During council meetings,
                    policies affecting the entire student body are discussed and
                    decided—ranging from exchange opportunities to the
                    psychosocial learning environment.
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={styles.educationItem}
              style={{ transitionDelay: "1.1s" }}
            >
              <span className={styles.educationYear}>2024 - 2025</span>
              <div className={styles.educationBox}>
                <h3>Courses</h3>
                <p>
                  Completed online courses and bootcamps focused on topics
                  related to my field of study, such as digital marketing,
                  digital strategy, and AI. I also pursued additional courses
                  out of personal interest, including Lean Manufacturing and
                  Robotics in Systems, as well as Financial Markets. A more
                  detailed overview is available under the "Courses" section.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Endret WORK SECTION */}
        <section id="work" className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <div
            className={`${styles.jobSection} ${
              showEducation ? styles.show : ""
            }`}
          >
            <div className={styles.jobTabs}>
              {Object.keys(jobs).map((jobKey) => (
                <div
                  key={jobKey}
                  className={`${styles.jobTab} ${
                    selectedJob === jobKey ? styles.active : ""
                  }`}
                  onClick={() => setSelectedJob(jobKey)}
                >
                  {jobs[jobKey].company}
                </div>
              ))}
            </div>
            <div className={styles.jobContent}>
              <h3>{jobs[selectedJob].title}</h3>
              <div className={styles.jobCompany}>
                {jobs[selectedJob].company}
              </div>
              <div className={styles.jobPeriod}>{jobs[selectedJob].period}</div>
              <ul>
                {jobs[selectedJob].description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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
