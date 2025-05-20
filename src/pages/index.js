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
  const [showProjects, setShowProjects] = useState(false);
  const [selectedJob, setSelectedJob] = useState("job1");
  const [currentCourse, setCurrentCourse] = useState(0);
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

  const projects = [
    {
      title: "Heimat App",
      image: "/images/heimatapp.png",
      description:
        "We developed a mobile application called Heimat for Gjestvang Eiendom to improve the student housing experience. Through surveys, interviews, and market research, we identified loneliness and lack of social belonging as key issues among students. Using design thinking methodology, we built personas, conducted user testing, and iterated on low- and high-fidelity prototypes. The final product is a Progressive Web App (PWA) built with SvelteKit, using JavaScript, HTML/CSS, and Firebase for user authentication, Firestore database, and hosting. The app features real-time chat, an event calendar, announcement feeds, and structured pages for building-specific information. It uses a modular component-based architecture with route-based file structure (+page.svelte, +layout.svelte) and dynamic routing for handling user-generated content. Data flow and UI states are managed using reactive Svelte stores, and the app includes service workers for offline support and fast load times. Hosting is handled via Firebase Hosting with secure TLS encryption.",
      tech: [
        "#SvelteKit",
        "#Firebase",
        "#JavaScript",
        "#HTML",
        "#CSS",
        "#UXUI",
      ],
      link: "https://appheimat.netlify.app/", // tom hvis ingen link
    },
    {
      title: "Flower Power – Cosmo & Wanda",
      image: "/images/cosmowanda.jpg",
      description:
        "We developed Flower Power, a smart plant care prototype designed to help young adults maintain their indoor plants through automation and digital feedback. The solution uses a Micro:bit microcontroller paired with a soil moisture sensor, OLED display, water pump, and water reservoir to monitor and maintain soil moisture levels. When the moisture drops below a threshold, the system alerts the user and activates the pump to water the plant. Our development process included user research, personas, lo-fi and hi-fi sketches, as well as usability testing to validate the user experience. The system follows Web of Things (WoT) principles, with a communication model aimed at simplifying data flow between sensors and users for better decision-making. The project targeted tech-savvy but forgetful plant owners aged 18–35 and emphasized ease of use, information accessibility, and automation. Although several planned features like temperature sensors and app integration were not fully implemented, the prototype successfully demonstrated a scalable, user-centered IoT solution for smart plant care. Note: The prototype shows selected parts of the design flow. Not all screens are linked, but the core concept is demonstrated.",
      tech: [
        "#Microbit",
        "#Figma",
        "#IoT",
        "#SensorTechnology",
        "#OLEDdisplay",
        "#Automation",
        "#UXDesign",
      ],
      link: "https://www.figma.com/proto/5R4qdV9HUuQtrAhhxCTgXf/Flower-Power?node-id=160-134&t=z5g2qbMi22hYaXM6-1&scaling=scale-down&content-scaling=fixed&page-id=157%3A117&starting-point-node-id=160%3A134&show-proto-sidebar=1",
    },
    {
      title: "My page",
      image: "/images/code.png",
      description:
        "I designed and developed a fully responsive, animated portfolio website using Next.js, React Hooks, and CSS Modules to present my education, experience, and projects in a dynamic and user-friendly way. The site features scroll-based animations with IntersectionObserver, interactive job tabs with stateful display logic, and dynamic project rendering using structured data objects. The layout includes sections such as About Me, Education, Work, Projects, and Contact, each enhanced with smooth transitions and custom styling.Styling is handled with vanilla CSS and CSS animations, including a typing effect for the hero section and animated hearts for interactive elements. All content is modular and component-based, designed for easy updates and extension. The portfolio emphasizes clean UI/UX, attention to detail, and highlights both technical skills and personal interests – such as my love for dogs.",
      tech: ["#NextJS", "#React", "#JavaScript", "#CSSModules"],
      link: "https://github.com/heddaolimb/mypage.git",
    },
  ];

  const courses = [
    {
      title: "Digital Marketing Basics",
      image: "/images/digital-marketing.png",
      link: "https://example.com/marketing-course",
      why: "To understand how digital marketing works and how to promote my own projects.",
      learned:
        "The fundamentals of SEO, paid ads, content strategy, and analytics.",
    },
    {
      title: "Intro to AI",
      image: "/images/ai-course.png",
      link: "https://example.com/ai-course",
      why: "I'm curious about AI and how it's used in real-world applications.",
      learned: "Machine learning basics, ethical use, and practical AI tools.",
    },
    {
      title: "Intro to AI",
      image: "/images/ai-course.png",
      link: "https://example.com/ai-course",
      why: "I'm curious about AI and how it's used in real-world applications.",
      learned: "Machine learning basics, ethical use, and practical AI tools.",
    },
    {
      title: "Intro to AI",
      image: "/images/ai-course.png",
      link: "https://example.com/ai-course",
      why: "I'm curious about AI and how it's used in real-world applications.",
      learned: "Machine learning basics, ethical use, and practical AI tools.",
    },
    // legg til flere kurs her
  ];

  // legg til flere kurs senere

  const handlePrev = () => {
    const newIndex =
      currentCourse === 0 ? courses.length - 1 : currentCourse - 1;
    setCurrentCourse(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentCourse === courses.length - 1 ? 0 : currentCourse + 1;
    setCurrentCourse(newIndex);
  };
  // ...

  const aboutRef = useRef(null);
  const dogsRef = useRef(null);
  const educationRef = useRef(null); // ✅ NY DEL
  const projectsRef = useRef(null);

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
  useEffect(() => {
    const observerProjects = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Projects section is visible");
          setShowProjects(true);
        }
      },
      { threshold: 0.3 }
    );

    if (projectsRef.current) {
      observerProjects.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observerProjects.unobserve(projectsRef.current);
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
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div
            ref={projectsRef}
            className={`${styles.projectsGrid} ${
              showProjects ? styles.show : ""
            }`}
          >
            {projects.map((proj, idx) => (
              <div key={idx} className={styles.projectCard}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  className={styles.projectImage}
                />
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className={styles.techList}>
                  {proj.tech.map((t, i) => (
                    <span key={i} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
        <section id="courses" className={styles.section}>
          <h2 className={styles.sectionTitle}>Courses</h2>

          <div className={styles.courseSlider}>
            <div className={styles.courseNavButtons}>
              <button className={styles.navButton} onClick={handlePrev}>
                &#8592;
              </button>
              <button className={styles.navButton} onClick={handleNext}>
                &#8594;
              </button>
            </div>

            <div
              className={styles.courseTrack}
              style={{
                transform: `translateX(-${currentCourse * 100}%)`,
              }}
            >
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className={`${styles.courseCard} ${
                    idx === currentCourse ? styles.active : ""
                  }`}
                  style={{
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    transition: "transform 0.5s ease",
                  }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className={styles.courseImage}
                  />
                  <a
                    href={course.link}
                    className={styles.courseTitle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {course.title}
                  </a>
                  <h4 className={styles.courseSubtitle}>
                    Why I took this course
                  </h4>
                  <p className={styles.courseText}>{course.why}</p>
                  <h4 className={styles.courseSubtitle}>
                    What I learned in this course
                  </h4>
                  <p className={styles.courseText}>{course.learned}</p>
                </div>
              ))}
            </div>

            <div className={styles.courseDots}>
              {courses.map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles.courseDot} ${
                    idx === currentCourse ? styles.active : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.contactText}>
            I'm currently open to new opportunities, collaborations, or just a
            chat. Feel free to reach out!
          </p>
          <a href="mailto:hedda@example.com" className={styles.contactButton}>
            Say Hello
          </a>
        </section>
      </div>
    </>
  );
}
