import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import TagCloud from "TagCloud";
import Chatbot from "./Chatbot";
import FeedbackBoard from "../components/FeedbackBoard";
import NasaProject from "../components/NasaProject";
import SentimentProject from "../components/SentimentProject";
import TaskManager from "../components/TaskManager";
import WeatherWidget from "../components/WeatherWidget";
import SpaceShooter from "../components/SpaceShooter";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showAboutItems, setShowAboutItems] = useState(false);
  const [ufoPlayed, setUfoPlayed] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedJob, setSelectedJob] = useState("job1");
  const [showContact, setShowContact] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [language, setLanguage] = useState("en"); // "en" | "no"

  // Refs
  const cloudRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const jobsRef = useRef(null);
  const contactRef = useRef(null);

  const [showJobs, setShowJobs] = useState(false);

  // --- Oppdater <html lang> ---
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "no" ? "no" : "en";
    }
  }, [language]);

  // --- TagCloud init ---

  useEffect(() => {
    if (typeof window === "undefined" || !cloudRef.current) return;

    const texts = [
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind",
      "Firebase",
      "UX",
      "UI",
      "Figma",
      "Node.js",
      "SvelteKit",
      "HTML",
      "CSS",
      "PHP",
      "SQL",
      "MongoDB",
      "GitHub",
      "Prototyping",
      "Wireframes",
      "Responsive",
      "Accessibility",
      "SEO",
    ];

    // ✅ Bruker riktig pakke: "TagCloud" (stor T, stor C)
    const sphere = TagCloud(cloudRef.current, texts, {
      radius: 270,
      maxSpeed: "normal",
      initSpeed: "slow",
      direction: 90,
      keep: true,
    });

    return () => {
      if (sphere && typeof sphere.destroy === "function") {
        sphere.destroy();
      }
      if (cloudRef.current) {
        cloudRef.current.innerHTML = "";
      }
    };
  }, []);

  // --- TRANSLATIONS: (EN + NO) ---
  const translations = {
    en: {
      meta: {
        title: "Hedda Olimb – Website",
        description:
          "Website of Hedda Olimb – Web Developer. Explore projects, education, work experience, and contact.",
        keywords:
          "Hedda Olimb, web developer, website, projects, contact, UX, UI, React, Next.js",
      },
      skip: "Skip to content",
      nav: [
        "About",
        "What I Can Do",
        "Education",
        "Work",
        "Projects",
        "Contact",
      ],
      heroTitle: "Hi, Im",
      heroSubtitle: "Welcome to my website!",
      explore: "Explore",

      aboutTitle: "About Me",
      aboutItems: [
        "My name is Hedda, a 26-year-old web developer from Norway with a bachelor’s degree in Web Development from NTNU – the Norwegian University of Science and Technology.",
        "I’m passionate about creating engaging and user-friendly digital experiences, with a background in web development, some UX/UI design, and some graphic design. I enjoy combining creativity and technology to bring ideas to life, whether it’s building sleek or fun websites, designing intuitive interfaces, or experimenting with new ideas.",
        "Outside of this, I love drawing and painting, music, traveling, watching movies and series, and reading books – especially fantasy and sci-fi. And above all, I’m a huge dog lover.",
        "My goal is to keep challenging myself while contributing to meaningful projects where design and development come together to make a difference.",
      ],

      educationTitle: "Education",
      education: [
        {
          year: "2015 - 2018",
          title: "High School – Hadeland Upper Secondary School (Norway)",
          descLead:
            "Specialization in general studies, with subjects including:",
          desc: [
            "English and Spanish (Erasmus+ project in 2017, Institut de Bruguers, Spain).",
            "Information Technology 1.",
            "Marketing and Management 1 & 2.",
            "Politics and Human Rights 1 & 2.",
            "Sociology and Social Anthropology.",
            "Law 1 (Norwegian Legal Studies).",
          ],
        },
        {
          year: "2020 - 2023",
          title:
            "Bachelor in Web Development - Norwegian University of Science and Technology (NTNU)",
          descLead: null,
          desc: [
            "Built static and dynamic websites using HTML, CSS, JavaScript, Node.js, PHP, and React.",
            "Familiar with Tailwind, Express, SQL (MySQL), MongoDB, REST APIs, and Postman.",
            "Used tools like Figma, Miro, GitHub, Adobe Creative Cloud, and VS Code.",
            "Experienced with responsive layouts, prototyping, and mobile-first design principles.",
            "Worked on project-based development with planning and collaboration.",
            "Covered accessibility (WCAG), SEO (meta-tags), and usability testing.",
            "Learned information architecture, databases, and content structuring.",
            "Explored cloud tech, deployment, and Raspberry Pi server usage.",
            "Studied history and protocols of the Internet and the WWW.",
            "Understood GDPR, ethics, legal frameworks, and research methods.",
            "All coursework in English – fluent in written and spoken English.",
            "Served as an elected representative for the Faculty of Architecture and Design in 2023.",
          ],
        },
      ],

      workTitle: "Work Experience",
      jobs: {
        job1: {
          title: "Health care assistant",
          company: "Villa Skaar Jevnaker",
          period: "Summers/more – 2018, 2020, 2021, 2022, 2023, 2024",
          description: [
            "Gained practical experience in geriatric care, infection control procedures, and basic medical knowledge related to common illnesses affecting the elderly.",
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
            "Certificate in Qualified First Aid – Level 2.",
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
            "Gained insight into professional standards of elderly care, including communication with residents, documentation of care, and working as part of a multidisciplinary team.",
            "Built upon previous knowledge in infection control, nutrition, and basic medical care, while adapting to the structured routines of a larger care facility.",
            "Certificate in Training on Ethics and Attitudes, User Involvement, Use of Force and Coercion, Hygiene and Personal Care, Dementia, Mobility, and Fire Safety.",
          ],
        },
      },

      projectsTitle: "Projects",
      projectLink: "View Project",
      projects: [
        {
          id: "heimat-app",
          title: "Heimat App",
          image: "/images/heimatapp.png",
          description: (
            <>
              We developed a{" "}
              <span className={styles.highlight}>mobile application</span>{" "}
              called Heimat for Gjestvang Eiendom to improve the student housing
              experience. Through{" "}
              <span className={styles.highlight}>
                surveys, interviews, and market research
              </span>
              , we identified loneliness and lack of social belonging as key
              issues among students. Using{" "}
              <span className={styles.highlight}>
                design thinking methodology
              </span>
              , we built{" "}
              <span className={styles.highlight}>
                personas, conducted user testing,
              </span>{" "}
              and iterated on{" "}
              <span className={styles.highlight}>
                low- and high-fidelity prototypes.
              </span>{" "}
              The final product is a{" "}
              <span className={styles.highlight}>
                Progressive Web App (PWA)
              </span>{" "}
              built with
              <span className={styles.highlight}>SvelteKit</span>, using
              <span className={styles.highlight}>JavaScript</span>,
              <span className={styles.highlight}>HTML/CSS</span>, and
              <span className={styles.highlight}>Firebase</span> for user
              authentication,
              <span className={styles.highlight}>Firestore database</span>, and
              hosting. The app features real-time chat, an event calendar,
              announcement feeds, and structured pages for building-specific
              information. It uses a
              <span className={styles.highlight}>
                modular component-based architecture
              </span>{" "}
              with
              <span className={styles.highlight}>
                route-based file structure
              </span>{" "}
              (+page.svelte, +layout.svelte) and
              <span className={styles.highlight}>dynamic routing</span> for
              handling user-generated content. Data flow and UI states are
              managed using
              <span className={styles.highlight}>reactive Svelte stores</span>,
              and the app includes service workers for offline support and fast
              load times. Hosting is handled via
              <span className={styles.highlight}>Firebase Hosting</span> with
              secure
              <span className={styles.highlight}>TLS encryption</span>.
            </>
          ),

          tech: [
            "#SvelteKit",
            "#Firebase",
            "#JavaScript",
            "#HTML",
            "#CSS",
            "#UXUI",
          ],
          link: "https://appheimat.netlify.app/",
          extraLink:
            "https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/3078733?show=full&locale-attribute=en",
        },
        {
          id: "flower-power",
          title: "Flower Power – Cosmo & Wanda",
          image: "/images/cosmowanda.jpg",
          description: (
            <>
              We developed Flower Power, a smart plant care prototype designed
              to help young adults maintain their indoor plants through
              automation and digital feedback. The solution uses a
              <span className={styles.highlight}>
                Micro:bit microcontroller
              </span>{" "}
              paired with a
              <span className={styles.highlight}>soil moisture sensor</span>,
              <span className={styles.highlight}>OLED display</span>,
              <span className={styles.highlight}>water pump</span>, and water
              reservoir to monitor and maintain soil moisture levels. When the
              moisture drops below a threshold, the system alerts the user and
              activates the pump to water the plant. Our development process
              included
              <span className={styles.highlight}>user research</span>,
              <span className={styles.highlight}>personas</span>,
              <span className={styles.highlight}>lo-fi and hi-fi sketches</span>
              , as well as
              <span className={styles.highlight}>usability testing</span> to
              validate the user experience. The system follows
              <span className={styles.highlight}>
                Web of Things (WoT) principles
              </span>
              , with a communication model aimed at simplifying data flow
              between sensors and users for better decision-making. The project
              targeted tech-savvy but forgetful plant owners aged 18–35 and
              emphasized ease of use,{" "}
              <span className={styles.highlight}>
                information accessibility
              </span>
              , and
              <span className={styles.highlight}>automation</span>.
            </>
          ),
          tech: [
            "#Microbit",
            "#Figma",
            "#IoT",
            "#SensorTechnology",
            "#OLEDdisplay",
            "#Automation",
            "#UXDesign",
          ],
        },
        {
          id: "portfolio-site",
          title: "My Website",
          image: "/images/code.png",
          description: (
            <>
              I designed and developed a fully responsive, animated portfolio
              website using Next.js, React Hooks, and CSS Modules to present my
              education, experience, and projects in a dynamic and user-friendly
              way. The site features scroll-based animations with
              IntersectionObserver, interactive job tabs with stateful display
              logic, and dynamic project rendering using structured data
              objects. The layout includes sections such as About Me, Education,
              Work, Projects, and Contact, each enhanced with smooth transitions
              and custom styling.
            </>
          ),
          tech: ["#NextJS", "#React", "#JavaScript", "#CSSModules"],
          link: "https://github.com/heddaolimb/mypage.git",
        },
        {
          id: "python-chatbot", // 👈 samme id i NO
          title: "Python Chatbot",
          image: "/icons/python.svg", // finn eller lag et ikon
          description: (
            <>
              A small{" "}
              <span className={styles.highlight}>
                Python Flask API (Flask + Gunicorn)
              </span>{" "}
              that replies with random jokes. Integrated directly into this
              website to demonstrate{" "}
              <span className={styles.highlight}>Python</span>,{" "}
              <span className={styles.highlight}>API integration</span>, and{" "}
              <span className={styles.highlight}>frontend + backend</span>{" "}
              communication. Tested and validated with{" "}
              <span className={styles.highlight}>Postman</span> during
              development.
              <br />
              <br />
              Ask it to tell you a joke! All jokes are in English.
            </>
          ),
          tech: ["#Python", "#Flask", "#API", "#FrontendIntegration"],
          extraImages: [
            "/images/chatbot_postman.png",
            "/images/chatbot_code.png",
          ], // 👈 nye bilder
          link: null,
        },
        {
          id: "feedback-board", // 👈 unikt id
          title: "Feedback Board",
          image: "/icons/mongodb.svg", // lag et ikon/bilde eller placeholder
          description: (
            <>
              A small <span className={styles.highlight}>fullstack demo</span>{" "}
              where visitors can leave anonymous feedback on this website.
              Please note: while all feedback is displayed here and visible to
              both me and other visitors, it remains completely anonymous.
              <br />
              <br />
              Built with{" "}
              <span className={styles.highlight}>Next.js API routes</span> and
              <span className={styles.highlight}>MongoDB</span> for data
              storage. Shows how to connect{" "}
              <span className={styles.highlight}>frontend</span>,
              <span className={styles.highlight}>backend</span> and
              <span className={styles.highlight}>database</span>.
            </>
          ),
          tech: ["#NextJS", "#MongoDB", "#API", "#Fullstack"],
          extraImages: [
            "/images/feedback_postman.png",
            "/images/feedback_code.png",
          ], //
          link: null, // ingen ekstern lenke
        },
        {
          id: "nasa-api",
          title: "NASA API Integration",
          image: "/icons/nasa.svg",
          description: (
            <>
              A small{" "}
              <span className={styles.highlight}>API integration demo</span>{" "}
              that fetches data from the{" "}
              <span className={styles.highlight}>NASA Open API</span>. It
              displays the "Astronomy Picture of the Day" with its title,
              explanation, and image. Built with{" "}
              <span className={styles.highlight}>Next.js API routes</span> and{" "}
              <span className={styles.highlight}>fetch</span>. Demonstrates{" "}
              <span className={styles.highlight}>JSON parsing</span>,{" "}
              <span className={styles.highlight}>frontend integration</span>,
              and <span className={styles.highlight}>error handling</span>.
              <br />
              <br />
              The raw JSON response is also shown below for demonstration
              purposes - to prove that the data above actually comes directly
              from NASA's API.
            </>
          ),
          tech: ["#NextJS", "#API", "#JSON", "#FrontendIntegration"],
          link: null,
        },
        {
          id: "nlp-sentiment",
          title: "AI Named Entity Recognition (NER)",
          image: "/icons/ai.svg", // finn eller lag et lite ikon
          description: (
            <>
              A small <span className={styles.highlight}>AI demo</span> that
              integrates with a
              <span className={styles.highlight}>
                {" "}
                HuggingFace Named Entity Recognition (NER) model
              </span>
              . Enter a sentence in English, and the system will analyze it
              using
              <span className={styles.highlight}>
                Natural Language Processing (NLP)
              </span>{" "}
              to extract named entities such as{" "}
              <span className={styles.highlight}>persons (PER)</span>,
              <span className={styles.highlight}>locations (LOC)</span>,
              <span className={styles.highlight}>organizations (ORG)</span>, and
              <span className={styles.highlight}>
                miscellaneous entities (MISC)
              </span>
              .
              <br />
              <br />
              For example, typing:
              <code>
                "Emma Watson starred in Harry Potter, which was filmed in
                London."
              </code>
              will extract: <strong>- Emma Watson (PER) - 100%</strong>{" "}
              <strong>- Harry Potter (MISC) - 90.1%</strong>-{" "}
              <strong>London (LOC) - 99.9%</strong>
              <br />
              <br />
              The system highlights entities with color coding:{" "}
              <span style={{ color: "#4caf50", fontWeight: "bold" }}>
                Green = Person (PER)
              </span>{" "}
              <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                Blue = Organization (ORG)
              </span>{" "}
              <span style={{ color: "#ff9800", fontWeight: "bold" }}>
                Orange = Location (LOC)
              </span>{" "}
              <span style={{ color: "#9c27b0", fontWeight: "bold" }}>
                Purple = Miscellaneous (MISC)
              </span>
              <br />
              <br />
              <strong>Note:</strong> The NER model is trained on a limited
              dataset, so entity classifications are not always perfect. For
              example, the model correctly tags *Harry Potter* as{" "}
              <strong>MISC</strong>, but confidence scores and labels can vary
              depending on context. The model is primarily trained on English,
              but can sometimes generalize to other languages such as Norwegian.
              <br />
              <br />
              Demonstrates{" "}
              <span className={styles.highlight}>AI integration</span>,
              <span className={styles.highlight}>NLP</span>, and
              <span className={styles.highlight}>JSON handling</span> in a
              frontend + backend setup.
            </>
          ),
          tech: [
            "#NextJS",
            "#API",
            "#AI",
            "#NLP",
            "#NER",
            "#FrontendIntegration",
          ],

          link: null,
        },
        {
          id: "task-manager",
          title: "Mini Task Manager",
          image: "/icons/taskmanager.svg", // legg et ikon i /public/icons/
          description: (
            <>
              A small <span className={styles.highlight}>fullstack demo</span>{" "}
              where users can create, update and delete tasks. Built with{" "}
              <span className={styles.highlight}>Node.js/Express</span>,{" "}
              <span className={styles.highlight}>React</span> and{" "}
              <span className={styles.highlight}>MongoDB</span>.
              <br />
              <br />
              Unlike the{" "}
              <span className={styles.highlight}>Feedback Board</span> (which
              uses Next.js API routes), this project runs on a{" "}
              <span className={styles.highlight}>
                separate backend deployed to Render
              </span>
              . Since it's on the{" "}
              <span className={styles.highlight}>free Render plan</span>, the
              server may “sleep” - it can take 20-30 seconds to wake up the
              first time you use it, but after that it runs normally.
              <br />
              <br />
              Demonstrates{" "}
              <span className={styles.highlight}>CRUD functionality</span>,{" "}
              <span className={styles.highlight}>database integration</span> and{" "}
              <span className={styles.highlight}>system design</span> - showing
              how real-world applications are structured.
            </>
          ),
          tech: ["#NodeJS", "#React", "#MongoDB", "#CRUD", "#Fullstack"],
          extraImages: ["/images/taskmanager.png", "/images/taskpostman.png"], // 👈 nye bilder
          link: null,
        },
        {
          id: "weather-cli",
          title: "Weather CLI",
          image: "/icons/terminal.svg", // legg et ikon i /public/icons/
          description: (
            <>
              A lightweight <span className={styles.highlight}>Python</span>{" "}
              command-line tool that fetches{" "}
              <span className={styles.highlight}>live weather data</span> from
              public APIs. Demonstrates how to build{" "}
              <span className={styles.highlight}>
                software outside the browser
              </span>
              , make <span className={styles.highlight}>API requests</span>, and
              handle <span className={styles.highlight}>fallbacks</span> when
              one service is unavailable. A simple{" "}
              <span className={styles.highlight}>frontend integration</span> is
              also included so visitors can interact with the project directly
              on this website and see the{" "}
              <span className={styles.highlight}>raw JSON response</span> below
              the results. <br />
              <br />
              <strong>Note:</strong> Please search for city names (e.g. London,
              Paris, Oslo), not countries.
            </>
          ),
          tech: [
            "#Python",
            "#CLI",
            "#API",
            "#Requests",
            "#FallbackHandling",
            "#SoftwareDev",
          ],
          extraImages: [
            "/images/weather_code.png",
            "/images/weather_python.png",
          ], // 👈 nye bilder
          link: null,
        },
        {
          id: "space-shooter",
          title: "Space Shooter",
          image: "/icons/space.svg", // legg et ikon i /public/icons/
          description: (
            <>
              A small{" "}
              <span className={styles.highlight}>retro arcade game</span> built
              with <span className={styles.highlight}>Phaser.js</span>.
              Demonstrates how to create a{" "}
              <span className={styles.highlight}>game loop</span>, handle{" "}
              <span className={styles.highlight}>collision detection</span>, and
              implement a <span className={styles.highlight}>score system</span>
              . Shows creativity and interactive programming directly in the
              browser.
            </>
          ),
          tech: [
            "#PhaserJS",
            "#JavaScript",
            "#GameDev",
            "#FrontendIntegration",
          ],
          link: null,
        },
      ],

      contactTitle: "Contact",
      contactText:
        "I'm currently open to new opportunities, collaborations, or just a chat. Feel free to reach out! My email: heddaolimb134@gmail.com - or use the contact form below.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
      },
      footer: "All rights reserved.",
      toastSuccess: "Message sent!",
      toastError: "Something went wrong. Try again.",
    },

    // NORSK OVERSETTELSE
    no: {
      meta: {
        title: "Hedda Olimb – Nettside",
        description:
          "Nettside for Hedda Olimb – webutvikler. Utforsk prosjekter, utdanning, arbeidserfaring, kurs og kontakt.",
        keywords:
          "Hedda Olimb, webutvikler, nettside, prosjekter, kurs, kontakt, UX, UI, React, Next.js",
      },
      skip: "Hopp til innhold",
      nav: [
        "Om meg",
        "Hva jeg kan",
        "Utdanning",
        "Arbeid",
        "Prosjekter",
        "Kurs",
        "Kontakt",
      ],
      heroTitle: "Hei, jeg heter",
      heroSubtitle: "Velkommen til nettsiden min!",
      explore: "Utforsk",

      aboutTitle: "Om meg",
      aboutItems: [
        "Jeg heter Hedda, er en 26 år gammel webutvikler fra Norge med en bachelorgrad i webutvikling fra NTNU – Norges teknisk-naturvitenskapelige universitet.",
        "Jeg brenner for å skape engasjerende og brukervennlige digitale opplevelser, med bakgrunn innen webutvikling, litt UX/UI-design og litt grafisk design. Jeg liker å kombinere kreativitet og teknologi for å gjøre ideer til virkelighet – enten det er å bygge moderne eller morsomme nettsider, designe intuitive grensesnitt eller eksperimentere med nye løsninger.",
        "Utenom dette liker jeg å tegne og male, høre på musikk, reise, se filmer og serier, samt lese bøker – spesielt innen fantasy og sci-fi. Og aller mest elsker jeg hunder.",
        "Målet mitt er å fortsette å utfordre meg selv, samtidig som jeg bidrar til meningsfulle prosjekter der design og utvikling møtes for å skape noe som virkelig betyr noe.",
      ],

      educationTitle: "Utdanning",
      education: [
        {
          year: "2015 - 2018",
          title: "Videregående – Hadeland videregående skole",
          descLead: "Studiespesialisering med fag som:",
          desc: [
            "Engelsk og spansk (Erasmus+ i 2017, Institut de Bruguers, Spania).",
            "Informasjonsteknologi 1.",
            "Markedsføring og ledelse 1 & 2.",
            "Politikk og menneskerettigheter 1 & 2.",
            "Sosiologi og sosialantropologi.",
            "Rettslære 1.",
          ],
        },
        {
          year: "2020 - 2023",
          title: "Bachelor i webutvikling – NTNU",
          descLead: null,
          desc: [
            "Utviklet statiske og dynamiske nettsider med HTML, CSS, JavaScript, Node.js, PHP og React.",
            "Kjent med Tailwind, Express, SQL (MySQL), MongoDB, REST-APIer og Postman.",
            "Brukte verktøy som Figma, Miro, GitHub, Adobe Creative Cloud og VS Code.",
            "Erfaring med responsive layouts, prototyping og mobile-first design.",
            "Jobbet prosjektbasert med planlegging og samarbeid.",
            "Dekket universell utforming (WCAG), SEO (meta-tags) og brukertesting.",
            "Lært informasjonsarkitektur, databaser og innholdsstrukturering.",
            "Utforsket skytjenester, utrulling og Raspberry Pi-servere.",
            "Studert historien og protokollene bak Internett og WWW.",
            "Forståelse av GDPR, etikk, lovverk og forskningsmetoder.",
            "Alt kursarbeid på engelsk – flytende skriftlig og muntlig engelsk.",
            "Valgt som tillitsvalgt for Fakultet for arkitektur og design i 2023.",
          ],
        },
        {
          year: "2024 - 2025",
          title: "Kurs",
          descLead: null,
          desc: [
            "Gjennomført nettkurs og bootcamps innen digital markedsføring, AI, Lean Manufacturing, robotikk og finansmarkeder. Mer detaljert oversikt i «Kurs»-seksjonen.",
          ],
        },
      ],

      workTitle: "Arbeidserfaring",
      jobs: {
        job1: {
          title: "Helsefagarbeider",
          company: "Villa Skaar Jevnaker",
          period: "Somre/mer – 2018, 2020, 2021, 2022, 2023, 2024",
          description: [
            "Fikk praktisk erfaring innen geriatrisk omsorg, smittevernrutiner og grunnleggende medisinsk kunnskap knyttet til vanlige sykdommer hos eldre.",
            "Opplæring i trygg pasienthåndtering og forflytningsteknikker, inkludert forebygging av skader ved tunge løft og forflytninger.",
            "Arbeidet mye i én-til-én-situasjoner med opplæring i egen sikkerhet og de-eskalering ved potensielt utagerende situasjoner.",
            "Tilegnet kunnskap om ernæring, personlig hygiene og daglige rutiner som ivaretar beboernes fysiske og psykiske helse.",
          ],
        },
        job2: {
          title: "Operativ soldat",
          company: "Forsvaret (FOH – Forsvarets operative hovedkvarter)",
          period: "2019",
          description: [
            "Tjenestegjorde i Sjøforsvaret ved FOH.",
            "Stasjonert på Overvåkingssenteret med sanntids maritim overvåkning og situasjonsforståelse i norske og NATO-områder.",
            "Opererte klassifiserte overvåknings- og kommandosystemer i et høysikkerhetsmiljø for å spore, rapportere og vurdere sjøaktivitet i strategiske farvann som Nord-Atlanteren.",
            "Bidro til nasjonal beredskap og samhandling med allierte styrker.",
            "Praktisk erfaring med både tekniske og operative systemer i maritimt miljø, med fokus på sikker informasjonsflyt, oppdragsstøtte og operativ oversikt.",
            "Kurs: Kvalifisert førstehjelp nivå 2.",
            "Kurs: Organisasjonsarbeid, møteteknikk og HMS.",
            "Tillitsvalgt i skiftlaget.",
          ],
        },
        job3: {
          title: "Helsefagarbeider",
          company: "JORS – Jevnaker omsorg og rehabilitering",
          period: "Sommer 2017",
          description: [
            "Utførte et bredt spekter av pleieoppgaver i sykehjemsmiljø, med fokus på hygienerutiner, måltidshjelp, mobilitetsstøtte og observasjon av beboernes fysiske og psykiske helse.",
            "Fikk innsikt i profesjonelle standarder for eldreomsorg, inkludert kommunikasjon med beboere, dokumentasjon av pleie og samarbeid i tverrfaglig team.",
            "Bygde videre på kunnskap innen smittevern, ernæring og grunnleggende medisinsk pleie, tilpasset rutiner i en større omsorgsinstitusjon.",
            "Kurs: Etikk og holdninger, brukermedvirkning, bruk av tvang og makt, hygiene og personlig stell, demens, mobilitet og brannsikkerhet.",
          ],
        },
      },

      projectsTitle: "Prosjekter",
      projectLink: "Se prosjekt",
      projects: [
        {
          id: "heimat-app",
          title: "Heimat App",
          image: "/images/heimatapp.png",
          description: (
            <>
              Vi utviklet en{" "}
              <span className={styles.highlight}>mobilapplikasjon</span> kalt
              Heimat for Gjestvang Eiendom for å forbedre
              studentboligopplevelsen. Gjennom{" "}
              <span className={styles.highlight}>
                spørreundersøkelser, intervjuer og markedsundersøkelser
              </span>{" "}
              identifiserte vi ensomhet og mangel på sosial tilhørighet som
              nøkkelutfordringer blant studenter. Med{" "}
              <span className={styles.highlight}>design thinking-metodikk</span>{" "}
              bygde vi{" "}
              <span className={styles.highlight}>
                personas, gjennomførte brukertester
              </span>{" "}
              og itererte på{" "}
              <span className={styles.highlight}>
                lav- og høyoppløselige prototyper
              </span>
              . Sluttproduktet ble en{" "}
              <span className={styles.highlight}>
                Progressive Web App (PWA)
              </span>{" "}
              bygget med <span className={styles.highlight}>SvelteKit</span>,
              ved bruk av <span className={styles.highlight}>JavaScript</span>,{" "}
              <span className={styles.highlight}>HTML/CSS</span> og{" "}
              <span className={styles.highlight}>Firebase</span> for
              autentisering,{" "}
              <span className={styles.highlight}>Firestore database</span> og
              hosting. Funksjoner: sanntidschat, arrangementskalender,
              kunngjøringsstrømmer og strukturerte bygningssider. Løsningen
              bruker en{" "}
              <span className={styles.highlight}>
                modulær, komponentbasert arkitektur
              </span>{" "}
              med{" "}
              <span className={styles.highlight}>route-basert filstruktur</span>{" "}
              (+page.svelte, +layout.svelte) og{" "}
              <span className={styles.highlight}>dynamiske ruter</span> for
              håndtering av brukergenerert innhold. Dataflyt og UI-stater styres
              ved hjelp av{" "}
              <span className={styles.highlight}>reaktive Svelte stores</span>,
              og appen inkluderer service workers for offline-støtte og raske
              lastetider. Hosting håndteres via{" "}
              <span className={styles.highlight}>Firebase Hosting</span> med
              sikker <span className={styles.highlight}>TLS-kryptering</span>.
            </>
          ),
          tech: [
            "#SvelteKit",
            "#Firebase",
            "#JavaScript",
            "#HTML",
            "#CSS",
            "#UXUI",
          ],
          link: "https://appheimat.netlify.app/",
          extraLink:
            "https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/3078733?show=full&locale-attribute=en",
        },
        {
          id: "flower-power",
          title: "Flower Power – Cosmo & Wanda",
          image: "/images/cosmowanda.jpg",
          description: (
            <>
              Flower Power er en smart plantepleieprototyp laget for å hjelpe
              unge voksne med å holde liv i inneplanter gjennom automatisering
              og digital tilbakemelding. Løsningen bruker en{" "}
              <span className={styles.highlight}>
                Micro:bit-mikrokontroller
              </span>{" "}
              sammen med en{" "}
              <span className={styles.highlight}>jordfuktighetssensor</span>,{" "}
              <span className={styles.highlight}>OLED-skjerm</span>,{" "}
              <span className={styles.highlight}>vannpumpe</span> og et
              vannreservoar for å overvåke og opprettholde jordfuktighetsnivåer.
              Når nivået går under terskelverdien, varsles brukeren og pumpen
              aktiveres for å vanne planten. Utviklingsprosessen inkluderte{" "}
              <span className={styles.highlight}>brukerundersøkelser</span>,{" "}
              <span className={styles.highlight}>personas</span>,{" "}
              <span className={styles.highlight}>lo-fi og hi-fi skisser</span>{" "}
              samt <span className={styles.highlight}>brukertester</span> for å
              validere brukeropplevelsen. Systemet bygger på{" "}
              <span className={styles.highlight}>
                Web of Things (WoT)-prinsipper
              </span>{" "}
              med en kommunikasjonsmodell som forenkler dataflyt mellom sensorer
              og brukere for bedre beslutningsgrunnlag. Prosjektet rettet seg
              mot teknologivante, men glemske planteeiere i alderen 18–35 år og
              la vekt på brukervennlighet,{" "}
              <span className={styles.highlight}>
                tilgjengelighet av informasjon
              </span>{" "}
              og <span className={styles.highlight}>automatisering</span>.
            </>
          ),
          tech: [
            "#Microbit",
            "#Figma",
            "#IoT",
            "#SensorTechnology",
            "#OLEDdisplay",
            "#Automation",
            "#UXDesign",
          ],
        },
        {
          id: "portfolio-site",
          title: "Min nettside",
          image: "/images/code.png",
          description:
            "En fullt responsiv, animert porteføljeside bygget med Next.js, React Hooks og CSS Modules for å vise utdanning, erfaring og prosjekter. Inneholder scroll-animasjoner med IntersectionObserver, interaktive jobbtabs og dynamisk prosjektrendering. Seksjoner: Om meg, Utdanning, Arbeid, Prosjekter, Kurs, Kontakt.",
          tech: ["#NextJS", "#React", "#JavaScript", "#CSSModules"],
          link: "https://github.com/heddaolimb/mypage.git",
        },
        {
          id: "python-chatbot", // 👈 samme id
          title: "Python chatbot",
          image: "/icons/python.svg",
          description: (
            <>
              En liten{" "}
              <span className={styles.highlight}>
                Python Flask-API (Flask + Gunicorn)
              </span>{" "}
              som svarer med tilfeldige vitser. Integrert direkte i denne
              nettsiden for å vise{" "}
              <span className={styles.highlight}>Python</span>,{" "}
              <span className={styles.highlight}>API-integrasjon</span> og{" "}
              <span className={styles.highlight}>frontend + backend</span>{" "}
              kommunikasjon. Testet og validert med{" "}
              <span className={styles.highlight}>Postman</span> under utvikling.
              <br />
              <br />
              Spør den om å fortelle en vits! Alle vitser er på engelsk.
            </>
          ),
          tech: ["#Python", "#Flask", "#API", "#FrontendIntegrasjon"],
          extraImages: [
            "/images/chatbot_postman.png",
            "/images/chatbot_code.png",
          ], // 👈 nye bilder
          link: null,
        },
        {
          id: "feedback-board",
          title: "Feedback Board",
          image: "/icons/mongodb.svg",
          description: (
            <>
              En liten <span className={styles.highlight}>fullstack-demo</span>{" "}
              der besøkende kan legge igjen anonym tilbakemelding på denne
              nettsiden. Vennligst merk: selv om alle tilbakemeldinger vises her
              og er synlige for både meg og andre besøkende, forblir de helt
              anonyme.
              <br />
              <br />
              Bygget med{" "}
              <span className={styles.highlight}>Next.js API-ruter</span> og
              <span className={styles.highlight}>MongoDB</span> for datalagring.
              Viser koblingen mellom{" "}
              <span className={styles.highlight}>frontend</span>,
              <span className={styles.highlight}>backend</span> og
              <span className={styles.highlight}>database</span>.
            </>
          ),
          tech: ["#NextJS", "#MongoDB", "#API", "#Fullstack"],
          extraImages: [
            "/images/feedback_postman.png",
            "/images/feedback_code.png",
          ], //
          link: null,
        },
        {
          id: "nasa-api",
          title: "NASA API-integrasjon",
          image: "/icons/nasa.svg",
          description: (
            <>
              En liten{" "}
              <span className={styles.highlight}>API-integrasjonsdemo</span> som
              henter data fra{" "}
              <span className={styles.highlight}>NASA Open API</span>. Viser
              "Astronomy Picture of the Day" med tittel, forklaring og bilde.
              Bygget med{" "}
              <span className={styles.highlight}>Next.js API-ruter</span> og{" "}
              <span className={styles.highlight}>fetch</span>. Demonstrerer{" "}
              <span className={styles.highlight}>JSON-parsing</span>,{" "}
              <span className={styles.highlight}>frontend-integrasjon</span> og{" "}
              <span className={styles.highlight}>feilhåndtering</span>.
              <br />
              <br />
              Rå JSON-respons vises også nederst som en demonstrasjon - for å
              bevise at dataen over faktisk hentes direkte fra NASA sitt API.
            </>
          ),
          tech: ["#NextJS", "#API", "#JSON", "#FrontendIntegrasjon"],
          link: null,
        },
        {
          id: "nlp-sentiment",
          title: "AI Entitetsgjenkjenning (NER)",
          image: "/icons/ai.svg", // finn eller lag et lite ikon
          description: (
            <>
              En liten <span className={styles.highlight}>AI-demo</span> som
              integrerer med en
              <span className={styles.highlight}>
                {" "}
                HuggingFace Named Entity Recognition (NER)-modell
              </span>
              . Skriv inn en setning på engelsk, og systemet analyserer den ved
              hjelp av
              <span className={styles.highlight}>
                Natural Language Processing (NLP)
              </span>{" "}
              for å trekke ut navngitte entiteter som{" "}
              <span className={styles.highlight}>personer (PER)</span>,
              <span className={styles.highlight}>steder (LOC)</span>,
              <span className={styles.highlight}>organisasjoner (ORG)</span> og
              <span className={styles.highlight}>andre entiteter (MISC)</span>.
              <br />
              <br />
              For eksempel, hvis du skriver:
              <code>
                "Emma Watson starred in Harry Potter, which was filmed in
                London."
              </code>
              vil systemet finne: <strong>- Emma Watson (PER) - 100%</strong>{" "}
              <strong>- Harry Potter (MISC) - 90.1%</strong>{" "}
              <strong>- London (LOC) - 99.9%</strong>
              <br />
              <br />
              Systemet markerer entitetene med fargekoder:{" "}
              <span style={{ color: "#4caf50", fontWeight: "bold" }}>
                Grønn = Person (PER)
              </span>{" "}
              <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                Blå = Organisasjon (ORG)
              </span>{" "}
              <span style={{ color: "#ff9800", fontWeight: "bold" }}>
                Oransje = Sted (LOC)
              </span>{" "}
              <span style={{ color: "#9c27b0", fontWeight: "bold" }}>
                Lilla = Annet (MISC)
              </span>
              <br />
              <br />
              <strong>Merk:</strong> NER-modellen er trent på et begrenset
              datasett, så klassifiseringene er ikke alltid perfekte. For
              eksempel merkes *Harry Potter* korrekt som <strong>MISC</strong>,
              men sikkerhetsscorene og etikettene kan variere avhengig av
              konteksten. Modellen er primært trent på engelsk, men kan noen
              ganger generalisere til andre språk som norsk.
              <br />
              <br />
              Demonstrerer{" "}
              <span className={styles.highlight}>AI-integrasjon</span>,
              <span className={styles.highlight}>NLP</span> og
              <span className={styles.highlight}>JSON-håndtering</span> i et
              frontend + backend-oppsett.
            </>
          ),
          tech: [
            "#NextJS",
            "#API",
            "#AI",
            "#NLP",
            "#NER",
            "#FrontendIntegrasjon",
          ],

          link: null,
        },
        {
          id: "task-manager",
          title: "Mini Task Manager",
          image: "/icons/taskmanager.svg",
          description: (
            <>
              En liten <span className={styles.highlight}>fullstack-demo</span>{" "}
              der brukere kan opprette, oppdatere og slette oppgaver. Bygget med{" "}
              <span className={styles.highlight}>Node.js/Express</span>,{" "}
              <span className={styles.highlight}>React</span> og{" "}
              <span className={styles.highlight}>MongoDB</span>.
              <br />
              <br />I motsetning til{" "}
              <span className={styles.highlight}>Feedback Board</span> (som
              bruker Next.js API-ruter), kjører dette prosjektet på en{" "}
              <span className={styles.highlight}>
                separat backend deployert på Render
              </span>
              . Siden det kjører på{" "}
              <span className={styles.highlight}>gratisplanen til Render</span>{" "}
              kan serveren “sove” - det kan ta 20-30 sekunder å starte første
              gang, men etter det fungerer den som normalt.
              <br />
              <br />
              Demonstrerer{" "}
              <span className={styles.highlight}>
                CRUD-funksjonalitet
              </span>,{" "}
              <span className={styles.highlight}>database-integrasjon</span> og{" "}
              <span className={styles.highlight}>systemdesign</span> - den typen
              struktur ekte applikasjoner bygger på.
            </>
          ),
          tech: ["#NodeJS", "#React", "#MongoDB", "#CRUD", "#Fullstack"],
          extraImages: ["/images/taskmanager.png", "/images/taskpostman.png"], // 👈 nye bilder
          link: null,
        },
        {
          id: "weather-cli",
          title: "Weather CLI",
          image: "/icons/terminal.svg",
          description: (
            <>
              Et lettvekts <span className={styles.highlight}>Python</span>{" "}
              kommandolinje-verktøy som henter{" "}
              <span className={styles.highlight}>sanntids værdata</span> fra
              offentlige API-er. Viser hvordan man kan bygge{" "}
              <span className={styles.highlight}>
                programvare utenfor nettleseren
              </span>
              , gjøre <span className={styles.highlight}>API-kall</span> og
              håndtere <span className={styles.highlight}>fallbacks</span> når
              en tjeneste er utilgjengelig. En enkel{" "}
              <span className={styles.highlight}>frontend-integrasjon</span> er
              også lagt til slik at besøkende kan teste prosjektet direkte på
              denne nettsiden og se den{" "}
              <span className={styles.highlight}>rå JSON-responsen</span> under
              resultatene. <br />
              <br />
              <strong>Merk:</strong> Du må søke på bynavn (f.eks. London, Paris,
              Oslo), ikke land.
            </>
          ),
          tech: [
            "#Python",
            "#CLI",
            "#API",
            "#Requests",
            "#Fallback",
            "#Programvareutvikling",
          ],
          extraImages: [
            "/images/weather_code.png",
            "/images/weather_python.png",
          ], // 👈 nye bilder
          link: null,
        },
        {
          id: "space-shooter",
          title: "Space Shooter",
          image: "/icons/space.svg", // legg et ikon i /public/icons/
          description: (
            <>
              Et lite{" "}
              <span className={styles.highlight}>retro arkadespill</span> laget
              med <span className={styles.highlight}>Phaser.js</span>. Viser
              hvordan man lager en{" "}
              <span className={styles.highlight}>game loop</span>, håndterer{" "}
              <span className={styles.highlight}>collision detection</span>
              og implementerer et{" "}
              <span className={styles.highlight}>poengsystem</span>.
              Demonstrerer kreativitet og interaktiv programmering direkte i
              nettleseren.
            </>
          ),
          tech: [
            "#PhaserJS",
            "#JavaScript",
            "#Spillutvikling",
            "#FrontendIntegrasjon",
          ],
          link: null,
        },
      ],

      contactTitle: "Kontakt",
      contactText:
        "Jeg er åpen for nye muligheter, samarbeid eller bare en prat. Ta gjerne kontakt! Min email: heddaolimb134@gmail.com - eller bruk kontaktskjemaet under.",
      form: {
        name: "Navn",
        email: "E-post",
        message: "Melding",
        send: "Send melding",
        sending: "Sender...",
      },
      footer: "Alle rettigheter forbeholdt.",
      toastSuccess: "Meldingen ble sendt!",
      toastError: "Noe gikk galt. Prøv igjen.",
    },
  };

  const t = translations[language];

  // --- Hooks og observers (beholder logikken din) ---

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowJobs(true),
      { threshold: 0.3 }
    );
    if (jobsRef.current) ob.observe(jobsRef.current);
    return () => jobsRef.current && ob.unobserve(jobsRef.current);
  }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowAboutItems(true),
      { threshold: 0.3 }
    );
    if (aboutRef.current) ob.observe(aboutRef.current);
    return () => aboutRef.current && ob.unobserve(aboutRef.current);
  }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowEducation(true);
          ob.disconnect(); // 👈 så den ikke toggler fram og tilbake
        }
      },
      { threshold: 0.2 } // trigges når 20% av seksjonen er synlig
    );
    if (educationRef.current) ob.observe(educationRef.current);
    return () => educationRef.current && ob.unobserve(educationRef.current);
  }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowProjects(true),
      { threshold: 0 }
    );
    if (projectsRef.current) ob.observe(projectsRef.current);
    return () => projectsRef.current && ob.unobserve(projectsRef.current);
  }, []);

  // Lås scroll når takeover er åpen
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"; // lås scrolling
    } else {
      document.body.style.overflow = ""; // gjenopprett
    }
  }, [selectedProject]);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAboutItems(true);
          if (!ufoPlayed) setUfoPlayed(true); // trigger UFO kun én gang
        }
      },
      { threshold: 0.4 }
    );

    const node = aboutRef.current;
    if (node) ob.observe(node);
    return () => node && ob.unobserve(node);
  }, [ufoPlayed]);
  // --- Navigasjon ---
  const sectionIds = [
    "about",
    "services",
    "education",
    "work",
    "projects",
    "contact",
  ];
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };
  const onNavKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToSection(id);
    }
  };

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowServices(true);
          ob.disconnect(); // 👈 kjører bare én gang
        }
      },
      { threshold: 0.2 } // 20% av seksjonen synlig
    );
    if (servicesRef.current) ob.observe(servicesRef.current);
    return () => servicesRef.current && ob.unobserve(servicesRef.current);
  }, []);
  // --- For contact ---

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowContact(true),
      { threshold: 0.2 }
    );
    if (contactRef.current) ob.observe(contactRef.current);
    return () => contactRef.current && ob.unobserve(contactRef.current);
  }, []);

  // --- Data for språk (jobs, projects) ---
  const jobs = t.jobs;
  const projects = t.projects;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(t.form.sending);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus(t.toastSuccess);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus(t.toastError);
      }
    } catch (err) {
      setFormStatus(t.toastError);
    } finally {
      setTimeout(() => setFormStatus(""), 4000);
    }
  };

  return (
    <>
      <Head>
        {/* SEO base */}
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content={language === "no" ? "no" : "en"} />

        {/* Open Graph */}
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:type" content="website" />
        {/* Sett riktig URL og et faktisk bilde hvis du har */}
        <meta property="og:url" content="https://dittdomene.no/" />
        <meta
          property="og:image"
          content="https://dittdomene.no/og-image.jpg"
        />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta
          name="twitter:image"
          content="https://dittdomene.no/og-image.jpg"
        />

        {/* Canonical (oppdater domenet) */}
        <link rel="canonical" href="https://dittdomene.no/" />

        {/* Strukturerte data (Schema.org – Person) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hedda Olimb",
              jobTitle: language === "no" ? "Webutvikler" : "Web Developer",
              url: "https://dittdomene.no/",
              image: "https://dittdomene.no/images/meg.jpg",
              sameAs: ["https://www.linkedin.com/in/din-profil/"],
            }),
          }}
        />
      </Head>
      {/* Skip-link for tastaturbrukere */}
      <a href="#main" className={styles.skipLink}>
        {t.skip}
      </a>
      {/* NAVBAR */}
      <header
        className={`${styles.navbar} ${selectedProject ? styles.hidden : ""}`}
        role="banner"
        aria-label="Site header"
      >
        <div
          className={styles.logo}
          onClick={() => scrollToSection("hero")}
          role="link"
          tabIndex={0}
        >
          HO
        </div>

        <nav
          className={styles.navLinks}
          role="navigation"
          aria-label="Main navigation"
        >
          {t.nav.map((label, i) => (
            <span
              key={sectionIds[i]}
              role="link"
              tabIndex={0}
              aria-label={label}
              onClick={() => scrollToSection(sectionIds[i])}
              onKeyDown={(e) => onNavKey(e, sectionIds[i])}
              className={styles.navItem}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* Språkvelger på navbaren (høyre side) */}
        <div className={styles.langSwitch} aria-label="Language switcher">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`${styles.langBtn} ${
              language === "en" ? styles.activeLang : ""
            }`}
            aria-pressed={language === "en"}
            aria-current={language === "en" ? "true" : undefined}
            aria-label="Switch to English"
            title="English"
          >
            <img
              src="/icons/flag-gb.svg"
              alt="English flag"
              className={styles.flagIcon}
            />
            EN
          </button>
          <span aria-hidden="true" className={styles.langSep}>
            |
          </span>
          <button
            type="button"
            onClick={() => setLanguage("no")}
            className={`${styles.langBtn} ${
              language === "no" ? styles.activeLang : ""
            }`}
            aria-pressed={language === "no"}
            aria-current={language === "no" ? "true" : undefined}
            aria-label="Bytt til norsk"
            title="Norsk"
          >
            <img
              src="/icons/flag-no.svg"
              alt="Norsk flagg"
              className={styles.flagIcon}
            />
            NO
          </button>
        </div>
      </header>
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen overflow-hidden px-8 flex items-center justify-between"
      >
        {/* LEFT: text (just a tiny nudge from the left edge) */}
        <div className="relative z-10 max-w-2xl pl-[3vw]">
          <h1
            className="text-white mb-2 font-[VemanemX]"
            style={{
              fontSize: "2.3rem",
              textAlign: "left",
              textTransform: "uppercase", // capitalize, lowercase
              color: "#b0b0b0ff",
              fontWeight: 700,
              letterSpacing: "0.03em",
              lineHeight: 1,
              transform: "scaleX(1.15)", // 👈 strekker teksten 15% bredere
              display: "inline-block", // viktig for at transform kun påvirker h1
            }}
          >
            {t.heroTitle}{" "}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Hedda Olimb
            </span>
          </h1>

          <h2
            className="text-gray-300 mb-8 font-[VemanemX]"
            style={{
              fontSize: "1.8rem",

              textTransform: "uppercase", // capitalize, lowercase
              color: "#b0b0b0ff",
              fontWeight: 700,
              letterSpacing: "0.03em",
              lineHeight: 1,
              transform: "scaleX(1.15)", // 👈 strekker teksten 15% bredere
              display: "inline-block", // viktig for at transform kun påvirker h1
            }}
          >
            {language === "no"
              ? "Velkommen til min nettside"
              : "Welcome to my website"}
          </h2>

          <p className="mb-6">
            {" "}
            <span
              style={{
                fontFamily: "Poppins, sans-serif", // 👈
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#8f99a6ff",
                fontSize: "1.25rem",
              }}
            >
              {" "}
              <Typewriter
                words={[
                  language === "no" ? "WEBUTVIKLER" : "WEB DEVELOPER",
                  language === "no" ? "DESIGNER" : "DESIGNER",
                  language === "no" ? "PROBLEMLØSER" : "PROBLEM SOLVER",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />{" "}
            </span>{" "}
          </p>

          <div className="mt-3 flex flex-col items-start">
            <button
              onClick={() => scrollToSection("about")}
              className={styles.heroExploreBtn}
            >
              {t.explore}
            </button>

            <div className={styles.heroSocialIcons}>
              <a
                href="https://github.com/heddaolimb"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroIconLink}
                aria-label="GitHub"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.98 0-1.32.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.66-2.81 5.68-5.49 5.98.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/heddaolimb"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroIconLink}
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3.5 9h3v12h-3zM9 9h2.88v1.64h.04c.4-.76 1.37-1.64 2.82-1.64 3.02 0 3.58 1.99 3.58 4.58V21h-3v-5.37c0-1.28-.02-2.93-1.79-2.93-1.8 0-2.07 1.4-2.07 2.84V21H9z" />
                </svg>
              </a>
              <a
                href="mailto:heddaolimb134@gmail.com"
                className={styles.heroIconLink}
                aria-label="Email"
                title="Email"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 
             1.1.9 2 2 2h16c1.1 0 2-.9 
             2-2V6c0-1.1-.9-2-2-2zm0 
             4-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </a>
              <a
                href="tel:+4747376579"
                className={styles.heroIconLink}
                aria-label="Phone"
                title="Phone"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 
             6.59l2.2-2.2a1 1 0 011.11-.21 
             11.36 11.36 0 003.9.73 1 1 0 
             011 1v3.5a1 1 0 01-1 1C10.07 
             22 2 13.93 2 4a1 1 0 
             011-1h3.5a1 1 0 011 
             1c0 1.37.25 2.7.73 
             3.9a1 1 0 01-.21 1.11l-2.4 
             2.78z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* HØYRE: fast boks til cluster (kan ikke krympe bort) */}
        <div className="relative flex-none w-[420px] h-[420px] mr-[3vw] flex items-center justify-center z-10">
          <div
            ref={cloudRef}
            className="tagcloud text-2xl font-[VemanemX]"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </section>
      {/* MAIN */}
      <main id="main" className={styles.mainContent} role="main">
        {/* About */}
        <section
          id="about"
          className={styles.aboutSection}
          aria-labelledby="about-title"
        >
          <div ref={aboutRef} className={styles.aboutWrapper}>
            {/* Venstre: kun bilde */}
            <div className={styles.aboutImage}>
              <img
                src="/images/meg1.png"
                alt="Hedda Olimb"
                className={styles.aboutPhoto}
              />
            </div>

            {/* Høyre: tittel + punkter */}
            <div className={styles.aboutContent}>
              <h2 id="about-title" className={styles.aboutTitle}>
                {t.aboutTitle}
              </h2>

              {t.aboutItems.map((text, i) => (
                <div
                  key={i}
                  className={`${styles.aboutItem} ${
                    showAboutItems ? styles.show : ""
                  }`}
                  style={{ "--i": i }}
                >
                  <span className={styles.icon}>
                    <img
                      src="/icons/glitter.svg"
                      alt=""
                      aria-hidden="true"
                      className={styles.glitter}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT I CAN DO + MY SKILLS */}
        <section id="services" className={styles.section}>
          <div ref={servicesRef} className={styles.servicesOuter}>
            <h2 className={styles.sectionTitle}>What I Can Do and My Skills</h2>

            <div className={styles.servicesGrid}>
              {/* Row 1 - What I Can Do */}
              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <div className={styles.iconPlaceholder}>💻</div>
                <h3>Web Development</h3>
                <p>
                  Building modern, responsive websites with React & Next.js.
                </p>
              </div>

              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <div className={styles.iconPlaceholder}>🎨</div>
                <h3>UI/UX Design</h3>
                <p>
                  Creating intuitive user interfaces, wireframes, and
                  prototypes.
                </p>
              </div>

              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <div className={styles.iconPlaceholder}>🔗</div>
                <h3>API Integrations</h3>
                <p>
                  Connecting external APIs like NASA, weather data, or AI
                  models.
                </p>
              </div>

              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.8s" }}
              >
                <div className={styles.iconPlaceholder}>⚡</div>
                <h3>SEO & Optimization</h3>
                <p>
                  Optimizing for performance, accessibility (WCAG), and SEO.
                </p>
              </div>

              {/* Row 2 - My Skills */}
              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1s" }}
              >
                <div className={styles.iconPlaceholder}>🚀</div>
                <h3>Fast</h3>
                <p>Delivering quick, effective solutions.</p>
              </div>

              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1.2s" }}
              >
                <div className={styles.iconPlaceholder}>📱</div>
                <h3>Responsive</h3>
                <p>Designs that adapt to mobile, tablet, and desktop.</p>
              </div>

              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1.4s" }}
              >
                <div className={styles.iconPlaceholder}>✨</div>
                <h3>Intuitive</h3>
                <p>Putting the user at the center of design and development.</p>
              </div>

              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1.6s" }}
              >
                <div className={styles.iconPlaceholder}>🌍</div>
                <h3>Dynamic</h3>
                <p>Exploring new tech like AI, game dev, and IoT.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section
          id="education"
          className={styles.section}
          aria-labelledby="education-title"
        >
          <div className={styles.educationOuter}>
            <h2 id="education-title" className={styles.sectionTitle}>
              {t.educationTitle}
            </h2>

            <div
              ref={educationRef}
              className={`${styles.educationTimeline} ${
                showEducation ? styles.show : ""
              }`}
            >
              {t.education.map((edu, idx) => (
                <article
                  key={idx}
                  className={`${styles.educationItem} ${
                    activeIndex === idx ? styles.active : ""
                  }`}
                  style={{ transitionDelay: `${0.3 + idx * 0.4}s` }}
                  aria-label={edu.title}
                  onClick={() =>
                    setActiveIndex(activeIndex === idx ? null : idx)
                  }
                >
                  {/* Forside (synlig alltid) */}
                  <div className={styles.educationFront}>
                    <div className={styles.educationYear}>{edu.year}</div>
                    <h3>{edu.title}</h3>
                    {edu.school && <p>{edu.school}</p>}
                  </div>

                  {/* Baksiden / detaljene */}
                  <div className={styles.educationBack}>
                    {edu.descLead && <p>{edu.descLead}</p>}
                    <ul>
                      {edu.desc.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section
          id="work"
          className={styles.section}
          aria-labelledby="work-title"
        >
          <div className={styles.workOuter}>
            <h2 id="work-title" className={styles.sectionTitle}>
              {t.workTitle}
            </h2>

            <div
              ref={jobsRef} // 👈 fiksen: nå observerer IntersectionObserver denne
              className={`${styles.jobSection} ${showJobs ? styles.show : ""}`}
            >
              <div className={styles.jobTabs} role="tablist" aria-label="Jobs">
                {Object.keys(jobs).map((jobKey) => (
                  <div
                    key={jobKey}
                    className={`${styles.jobTab} ${
                      selectedJob === jobKey ? styles.active : ""
                    }`}
                    role="tab"
                    aria-selected={selectedJob === jobKey}
                    tabIndex={0}
                    onClick={() => setSelectedJob(jobKey)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      setSelectedJob(jobKey)
                    }
                  >
                    {jobs[jobKey].company}
                  </div>
                ))}
              </div>

              <div className={styles.jobContent} role="tabpanel">
                <h3>{jobs[selectedJob].title}</h3>
                <div className={styles.jobCompany}>
                  {jobs[selectedJob].company}
                </div>
                <div className={styles.jobPeriod}>
                  {jobs[selectedJob].period}
                </div>
                <ul>
                  {jobs[selectedJob].description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className={styles.section}
          aria-labelledby="projects-title"
        >
          <div className={styles.projectsOuter}>
            <h2 id="projects-title" className={styles.sectionTitle}>
              {t.projectsTitle}
            </h2>

            <div
              ref={projectsRef}
              className={`${styles.projectsGrid} ${
                showProjects ? styles.show : ""
              }`}
            >
              {projects.map((proj) => (
                <article
                  key={proj.id}
                  className={styles.projectCard}
                  onClick={() => setSelectedProject(proj)}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className={
                      proj.id === "feedback-board"
                        ? styles.mongoDbImage
                        : proj.id === "python-chatbot"
                        ? styles.smallProjectImage
                        : proj.id === "nasa-api"
                        ? styles.nasaImage
                        : proj.id === "nlp-sentiment"
                        ? styles.aiImage
                        : proj.id === "task-manager"
                        ? styles.taskManagerImage
                        : proj.id === "weather-cli"
                        ? styles.cliImage
                        : proj.id === "space-shooter"
                        ? styles.spaceShooterImage // 👈 nytt
                        : styles.projectImage
                    }
                  />

                  <h3>{proj.title}</h3>
                </article>
              ))}
            </div>

            {/* Fullscreen takeover */}
            {selectedProject && (
              <div
                className={styles.projectTakeover}
                onClick={() => setSelectedProject(null)}
              >
                <div
                  className={styles.projectDetails}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.closeBtn}
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project details"
                  >
                    ✕
                  </button>

                  {/* 👇 Unntak for SpaceShooter */}
                  {selectedProject.id === "space-shooter" ? (
                    <>
                      <h3>{selectedProject.title}</h3>
                      <div className={styles.projectDescription}>
                        {selectedProject.description}
                      </div>

                      <div className={styles.spaceShooterWrapper}>
                        <SpaceShooter />
                      </div>

                      <div className={styles.techList}>
                        {selectedProject.tech.map((tag, i) => (
                          <span key={i} className={styles.techTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 👇 Ikke vis stort bilde for Chatbot, Feedback eller NASA */}
                      {selectedProject.id !== "python-chatbot" &&
                        selectedProject.id !== "feedback-board" &&
                        selectedProject.id !== "nasa-api" &&
                        selectedProject.id !== "nlp-sentiment" &&
                        selectedProject.id !== "task-manager" &&
                        selectedProject.id !== "weather-cli" &&
                        selectedProject.id !== "space-shooter" && (
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className={styles.projectImageLarge}
                          />
                        )}

                      <h3>{selectedProject.title}</h3>
                      <div className={styles.projectDescription}>
                        {selectedProject.description}
                      </div>

                      {/* 👇 Viser små ekstra bilder for prosjekter som har dem */}
                      {(selectedProject.id === "python-chatbot" ||
                        selectedProject.id === "feedback-board" ||
                        selectedProject.id === "task-manager" ||
                        selectedProject.id === "weather-cli") &&
                        selectedProject.extraImages && (
                          <div className={styles.projectImages}>
                            {selectedProject.extraImages.map((img, i) => (
                              <img key={i} src={img} alt="Project screenshot" />
                            ))}
                          </div>
                        )}

                      <div className={styles.techList}>
                        {selectedProject.tech.map((tag, i) => (
                          <span key={i} className={styles.techTag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 👇 Komponenter inni prosjektene */}
                      {selectedProject.id === "python-chatbot" && <Chatbot />}
                      {selectedProject.id === "feedback-board" && (
                        <FeedbackBoard />
                      )}
                      {selectedProject.id === "nasa-api" && <NasaProject />}
                      {selectedProject.id === "nlp-sentiment" && (
                        <SentimentProject />
                      )}
                      {selectedProject.id === "task-manager" && <TaskManager />}
                      {selectedProject.id === "weather-cli" && (
                        <WeatherWidget />
                      )}

                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t.projectLink}
                        </a>
                      )}
                      {selectedProject.extraLink && (
                        <a
                          href={selectedProject.extraLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: "1.5rem" }}
                        >
                          {language === "no"
                            ? "Les bacheloroppgaven"
                            : "Read the bachelor thesis"}
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className={styles.section}
          aria-labelledby="contact-title"
        >
          <div
            ref={contactRef}
            className={`${styles.contactOuter} ${
              showContact ? styles.showContact : ""
            }`}
          >
            <h2 id="contact-title" className={styles.sectionTitle}>
              {t.contactTitle}
            </h2>

            <div className={styles.contactBox}>
              <p className={styles.contactText}>{t.contactText}</p>

              <form
                className={styles.contactForm}
                onSubmit={handleSubmit}
                aria-label="Contact form"
              >
                <input
                  type="text"
                  name="name"
                  placeholder={t.form.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.form.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder={t.form.message}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className={styles.submitBtn}>
                  {t.form.send}
                </button>
                {formStatus && (
                  <p className={styles.formStatus}>{formStatus}</p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>{" "}
      {/* 👈 main lukkes her */}
      {/* FOOTER */}
      <footer className={styles.footer} role="contentinfo">
        <p>
          &copy; {new Date().getFullYear()} Hedda Olimb. {t.footer}
        </p>
      </footer>
    </>
  );
}
