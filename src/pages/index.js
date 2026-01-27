import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import TagCloud from "TagCloud";
import Chatbot from "./Chatbot";
import FeedbackBoard from "../components/FeedbackBoard";
import NasaProject from "../components/NasaProject";
import TaskManager from "../components/TaskManager";
import WeatherWidget from "../components/WeatherWidget";
import SpaceShooter from "../components/SpaceShooter";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAboutItems, setShowAboutItems] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedJob, setSelectedJob] = useState("job1");
  const [showContact, setShowContact] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showJobs, setShowJobs] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const [language, setLanguage] = useState("en");

  const cloudRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const jobsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "no" ? "no" : "en";
    }
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined" || !cloudRef.current) return;

    const texts = [
      "JavaScript",
      "React",
      "NextJS",
      "Tailwind",
      "API",
      "UX",
      "UI",
      "Figma",
      "NodeJS",
      "SvelteKit",
      "HTML",
      "CSS",
      "PHP",
      "Python",
      "MongoDB",
      "GitHub",
      "Prototyping",
      "Wireframes",
      "Responsive",
      "Accessibility",
      "SEO",
    ];

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

  const translations = {
    en: {
      meta: {
        title: "Hedda Olimb",
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
      heroTitle: "Hi,Im",
      heroSubtitle: "Welcome to my website!",
      explore: "Explore",

      aboutTitle: "About Me",
      aboutItems: [
        "My name is Hedda, 26 years old from Norway with a bachelor’s degree in Web Development from NTNU – the Norwegian University of Science and Technology.",
        "I’m passionate about creating engaging and user-friendly digital experiences. I enjoy combining creativity and technology to bring ideas to life, whether it’s building sleek or fun websites, designing intuitive interfaces, or experimenting with new ideas.",
        "Outside of this, I love drawing and painting, music, traveling, dogs, movies, and reading books – especially fantasy and sci-fi genres. I’m also interested in AI, emerging technologies, and technology in general.",
        "My goal is to keep challenging myself while contributing to meaningful projects where design and development come together to make a difference.",
      ],
      servicesTitle: "What I Can Do and My Skills",
      services: {
        webDev: {
          title: "Web Development",
          text: "Building modern, responsive websites with React & Next.js.",
        },
        uiux: {
          title: "UI/UX Design",
          text: "Creating intuitive user interfaces, wireframes, and prototypes.",
        },
        api: {
          title: "API Integrations",
          text: "Connecting external APIs like NASA, weather data, or AI models.",
        },
        seo: {
          title: "SEO & Optimization",
          text: "Optimizing for performance, accessibility (WCAG), and SEO.",
        },
        fast: {
          title: "Fast",
          text: "Delivering quick, effective solutions.",
        },
        responsive: {
          title: "Responsive",
          text: "Designs that adapt to mobile, tablet, and desktop.",
        },
        intuitive: {
          title: "Intuitive",
          text: "Putting the user at the center of design and development.",
        },
        dynamic: {
          title: "Dynamic",
          text: "Exploring new tech like AI, game dev, and IoT.",
        },
      },

      educationTitle: "Education",
      education: [
        {
          year: "2015–2018",
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
          year: "2020–2023",
          title:
            "Bachelor in Web Development – Norwegian University of Science and Technology (NTNU)",
          descLead: null,
          desc: [
            "Built static and dynamic websites using HTML, CSS, JavaScript, Node.js, PHP, and React.",
            "Familiar with Tailwind, Express, SQL (MySQL), MongoDB, REST APIs, and Postman.",
            "Used tools like Figma, Miro, GitHub, Adobe Creative Cloud, and VS Code.",
            "Experienced with responsive layouts, prototyping, and mobile-first design principles.",
            "Worked on project-based development with planning and collaboration.",
            "Covered accessibility (WCAG), SEO (meta-tags), and usability testing.",
            "Learned information architecture, databases, and content structuring.",
            "Explored cloud technology, deployment, and Raspberry Pi server usage.",
            "Studied the history and protocols of the Internet and the World Wide Web.",
            "Understood GDPR, ethics, legal frameworks, and research methods.",
            "All coursework conducted in English - advanced written and spoken English skills.",
            "Served as an elected representative for the Faculty of Architecture and Design in 2023.",
          ],
        },
      ],

      workTitle: "Work Experience",
      jobs: {
        job1: {
          title: "Health Care Assistant",
          company: "Villa Skaar Jevnaker",
          period: "Seasonal (summers), 2018–2024",
          description: [
            "Gained practical experience in geriatric care, infection control procedures, and basic medical knowledge related to common illnesses affecting the elderly.",
            "Received training in safe patient handling and mobility techniques, including how to prevent injuries during heavy lifting and transfers.",
            "Worked extensively in one-on-one care settings, including instruction in personal safety and de-escalation techniques.",
            "Also acquired knowledge in nutrition, personal hygiene, and daily routines essential for maintaining residents' physical and mental well-being.",
          ],
        },
        job2: {
          title: "Operational Soldier",
          company:
            "Royal Norwegian Armed Forces (FOH – Norwegian Joint Headquarters)",
          period: "2019",
          description: [
            "Served in the Royal Norwegian Navy at the Joint Operational Headquarters (FOH).",
            "Stationed at a surveillance and operations center, contributing to maritime situational awareness in Norwegian and NATO areas.",
            "Worked in a high-security operational environment supporting monitoring, reporting, and assessment of maritime activity.",
            "Contributed to national defense readiness and coordination with allied forces.",
            "Gained practical experience with technical and operational systems in a maritime context, with a focus on secure information flow, mission support, and operational overview.",
            "Course: Qualified First Aid – Level 2.",
            "Course: Organizational work, meeting techniques, and Health, Safety and Environment (HSE).",
            "Elected representative within the shift team.",
          ],
        },
        job3: {
          title: "Health Care Assistant",
          company: "JORS – Jevnaker Care and Rehabilitation Center",
          period: "Summer 2017",
          description: [
            "Performed a wide range of essential care duties in a nursing home environment.",
            "Gained insight into professional standards of elderly care, communication, and documentation.",
            "Built upon previous knowledge in infection control, nutrition, and basic medical care.",
            "Certificate in training on ethics, user involvement, use of force and coercion, hygiene, dementia, mobility, and fire safety.",
          ],
        },
      },

      projectsTitle: "Projects",
      projectLink: "View Project",
      projects: [
        {
          id: "heimat-app",
          title: "Heimat App",
          image: "/icons/iphone.svg",
          description: (
            <>
              We developed a{" "}
              <span className={styles.highlight}>mobile application</span>{" "}
              called Heimat for Gjestvang Eiendom to improve the student housing
              experience. Through{" "}
              <span className={styles.highlight}>
                surveys, interviews, and market research
              </span>{" "}
              we identified loneliness and a lack of social belonging as key
              challenges among students. Using{" "}
              <span className={styles.highlight}>
                design thinking methodology
              </span>{" "}
              we built{" "}
              <span className={styles.highlight}>
                personas, conducted user testing
              </span>{" "}
              and iterated on{" "}
              <span className={styles.highlight}>
                low- and high-fidelity prototypes
              </span>
              . The final product was a{" "}
              <span className={styles.highlight}>
                Progressive Web App (PWA)
              </span>{" "}
              built with <span className={styles.highlight}>SvelteKit</span>,
              using <span className={styles.highlight}>JavaScript</span>,{" "}
              <span className={styles.highlight}>HTML/CSS</span> and{" "}
              <span className={styles.highlight}>Firebase</span> for
              authentication,{" "}
              <span className={styles.highlight}>Firestore database</span> and
              hosting. Features include real-time chat, an event calendar,
              announcement feeds, and structured building pages. The solution
              uses a{" "}
              <span className={styles.highlight}>
                modular, component-based architecture
              </span>{" "}
              with a{" "}
              <span className={styles.highlight}>
                route-based file structure
              </span>{" "}
              (+page.svelte, +layout.svelte) and{" "}
              <span className={styles.highlight}>dynamic routes</span> for
              handling user-generated content. Data flow and UI states are
              managed using{" "}
              <span className={styles.highlight}>reactive Svelte stores</span>,
              and the app includes service workers for offline support and fast
              load times. Hosting is handled via{" "}
              <span className={styles.highlight}>Firebase Hosting</span> with
              secure <span className={styles.highlight}>TLS encryption</span>.
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
          extraImages: ["/images/heimatapp.png"],
          extraLink:
            "https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/3078733?show=full&locale-attribute=en",
        },

        {
          id: "flower-power",
          title: "Flower Power – Cosmo & Wanda",
          image: "/icons/flower.svg",
          description: (
            <>
              Flower Power is a smart plant care prototype designed to help
              young adults keep indoor plants alive through automation and
              digital feedback. The solution uses a{" "}
              <span className={styles.highlight}>
                Micro:bit microcontroller
              </span>{" "}
              together with a{" "}
              <span className={styles.highlight}>soil moisture sensor</span>,{" "}
              <span className={styles.highlight}>OLED display</span>,{" "}
              <span className={styles.highlight}>water pump</span> and a water
              reservoir to monitor and maintain soil moisture levels. When the
              level drops below the threshold value, the user is notified and
              the pump is activated to water the plant. The development process
              included <span className={styles.highlight}>user research</span>,{" "}
              <span className={styles.highlight}>personas</span>,{" "}
              <span className={styles.highlight}>
                low-fidelity and high-fidelity sketches
              </span>{" "}
              as well as <span className={styles.highlight}>user testing</span>{" "}
              to validate the user experience. The system is based on{" "}
              <span className={styles.highlight}>
                Web of Things (WoT) principles
              </span>{" "}
              with a communication model that simplifies data flow between
              sensors and users for improved decision-making. The project
              targeted tech-savvy but forgetful plant owners aged 18–35 and
              emphasized usability,{" "}
              <span className={styles.highlight}>
                accessibility of information
              </span>{" "}
              and <span className={styles.highlight}>automation</span>.
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
          extraImages: ["/images/cosmowanda.jpg"],
        },
        {
          id: "portfolio-site",
          title: "My Website",
          image: "/icons/website.svg",
          description: (
            <>
              This project is a personal{" "}
              <span className={styles.highlight}>portfolio website</span> that
              showcases who I am and what I can do. The website is built with{" "}
              <span className={styles.highlight}>Next.js</span> and{" "}
              <span className={styles.highlight}>React</span>, and includes
              sections for presentation, education, work experience, projects,
              and contact, as well as modals for project details and integrated
              demos. In this project,{" "}
              <span className={styles.highlight}>HTML</span>,{" "}
              <span className={styles.highlight}>CSS</span> and{" "}
              <span className={styles.highlight}>JavaScript</span> are used on
              the frontend, with <span className={styles.highlight}>React</span>{" "}
              and <span className={styles.highlight}>Next.js</span> as the
              framework. Styling is done using{" "}
              <span className={styles.highlight}>CSS Modules</span>, media
              queries, animations, and responsive adaptation for mobile, tablet,
              and desktop. The website includes dynamic navigation, language
              selection (Norwegian and English), a contact form,{" "}
              <span className={styles.highlight}>SEO metadata</span>, and
              accessibility attributes. The projects integrated into the website
              use, among other things,{" "}
              <span className={styles.highlight}>
                API routes, Node.js, Express, Python and Flask
              </span>
              . <span className={styles.highlight}>MongoDB</span> is used as the
              database in fullstack projects, with{" "}
              <span className={styles.highlight}>CRUD</span> functionality and
              data storage. APIs are tested and validated with{" "}
              <span className={styles.highlight}>Postman</span>, and several
              projects communicate between frontend and backend via{" "}
              <span className={styles.highlight}>fetch</span> and{" "}
              <span className={styles.highlight}>JSON</span>. External APIs are
              used to fetch real-time data, including NASA Open API and weather
              APIs. <span className={styles.highlight}>Python</span> is used
              both for backend APIs and as a command-line tool (CLI), with
              handling of API calls,{" "}
              <span className={styles.highlight}>JSON</span> data, and error
              handling. Game development is represented through a browser-based
              game built with{" "}
              <span className={styles.highlight}>Phaser.js</span>.
            </>
          ),
          tech: ["#NextJS", "#React", "#JavaScript", "#CSSModules"],
          extraImages: ["/images/mypage.png"],
          link: "https://github.com/heddaolimb/mypage.git",
        },
        {
          id: "python-chatbot",
          title: "Python Chatbot",
          image: "/icons/python.svg",
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
          ],
          link: null,
        },
        {
          id: "feedback-board",
          title: "Feedback Board",
          image: "/icons/feedback.svg",
          description: (
            <>
              A small <span className={styles.highlight}>fullstack demo</span>{" "}
              where visitors can leave anonymous feedback on this website.
              Please note: although all feedback is displayed here and is
              visible to both me and other visitors, it remains completely
              anonymous.
              <br />
              <br />
              Built using{" "}
              <span className={styles.highlight}>
                Next.js API routes
              </span> and <span className={styles.highlight}>MongoDB</span> for
              data storage. Demonstrates the connection between{" "}
              <span className={styles.highlight}>frontend</span>,{" "}
              <span className={styles.highlight}>backend</span> and{" "}
              <span className={styles.highlight}>database</span>.
            </>
          ),
          tech: ["#NextJS", "#MongoDB", "#API", "#Fullstack"],
          extraImages: [
            "/images/feedback_postman.png",
            "/images/feedback_code.png",
          ],
          link: null,
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
              <span className={styles.highlight}>NASA Open API</span>. Displays
              the "Astronomy Picture of the Day" with title, description, and
              image. Built using{" "}
              <span className={styles.highlight}>Next.js API routes</span> and{" "}
              <span className={styles.highlight}>fetch</span>. Demonstrates{" "}
              <span className={styles.highlight}>JSON parsing</span>,{" "}
              <span className={styles.highlight}>frontend integration</span> and{" "}
              <span className={styles.highlight}>error handling</span>.
              <br />
              <br />
              The raw JSON response is also displayed at the bottom as a
              demonstration, to prove that the data above is fetched directly
              from NASA's API.
            </>
          ),
          tech: ["#NextJS", "#API", "#JSON", "#FrontendIntegration"],
          link: null,
        },

        {
          id: "task-manager",
          title: "Mini Task Manager",
          image: "/icons/taskmanager.svg",
          description: (
            <>
              A small <span className={styles.highlight}>fullstack demo</span>{" "}
              where users can create, update, and delete tasks. Built with{" "}
              <span className={styles.highlight}>Node.js/Express</span>,{" "}
              <span className={styles.highlight}>React</span> and{" "}
              <span className={styles.highlight}>MongoDB</span>.
              <br />
              <br />
              Unlike the{" "}
              <span className={styles.highlight}>Feedback Board</span> (which
              uses Next.js API routes), this project runs on a{" "}
              <span className={styles.highlight}>
                separate backend deployed on Render
              </span>
              . Since it runs on{" "}
              <span className={styles.highlight}>Render’s free tier</span>, the
              server may “sleep” - it can take 20–30 seconds to start the first
              time, but after that it runs normally.
              <br />
              <br />
              Demonstrates{" "}
              <span className={styles.highlight}>CRUD functionality</span>,{" "}
              <span className={styles.highlight}>database integration</span> and{" "}
              <span className={styles.highlight}>system design</span> — the kind
              of structure real-world applications are built on.
            </>
          ),
          tech: ["#NodeJS", "#React", "#MongoDB", "#CRUD", "#Fullstack"],
          extraImages: ["/images/taskmanager.png", "/images/taskpostman.png"],
          link: null,
        },
        {
          id: "weather-cli",
          title: "Weather CLI",
          image: "/icons/terminal.svg",
          description: (
            <>
              A lightweight <span className={styles.highlight}>Python</span>{" "}
              command-line tool that fetches{" "}
              <span className={styles.highlight}>real-time weather data</span>{" "}
              from public APIs. Demonstrates how to build{" "}
              <span className={styles.highlight}>
                software outside the browser
              </span>
              , make <span className={styles.highlight}>API calls</span> and
              handle <span className={styles.highlight}>fallbacks</span> when a
              service is unavailable. A simple{" "}
              <span className={styles.highlight}>frontend integration</span> has
              also been added so visitors can test the project directly on this
              website and view the{" "}
              <span className={styles.highlight}>raw JSON response</span> below
              the results.
              <br />
              <br />
              <strong>Note:</strong> You must search by city name (e.g. London,
              Paris, Oslo), not country.
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
          ],
          link: null,
        },
        {
          id: "space-shooter",
          title: "Space Shooter",
          image: "/icons/space.svg",
          description: (
            <>
              A small{" "}
              <span className={styles.highlight}>retro arcade game</span> built
              with <span className={styles.highlight}>Phaser.js</span>.
              Demonstrates how to implement a{" "}
              <span className={styles.highlight}>game loop</span>, handle{" "}
              <span className={styles.highlight}>collision detection</span>, and
              implement a{" "}
              <span className={styles.highlight}>scoring system</span>.
              Showcases creativity and interactive programming directly in the
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
        title: "Hedda Olimb",
        description:
          "Nettside for Hedda Olimb – webutvikler. Utforsk prosjekter, utdanning, jobberfaring,kontakt.",
        keywords:
          "Hedda Olimb, webutvikler, nettside, prosjekter, kontakt, UX, UI, React, Next.js",
      },
      skip: "Hopp til innhold",
      nav: [
        "Om meg",
        "Hva jeg kan",
        "Utdanning",
        "Jobb",
        "Prosjekter",
        "Kontakt",
      ],
      heroTitle: "Hei,jeg heter",
      heroSubtitle: "Velkommen til nettsiden min!",
      explore: "Utforsk",

      aboutTitle: "Om meg",
      aboutItems: [
        "Jeg heter Hedda, er 26 år og kommer fra Norge, med en bachelorgrad i webutvikling fra NTNU – Norges teknisk-naturvitenskapelige universitet.",
        "Jeg brenner for å skape engasjerende og brukervennlige digitale opplevelser. Jeg liker å kombinere kreativitet og teknologi for å gjøre ideer til virkelighet, enten det er å bygge stilrene eller morsomme nettsider, designe intuitive grensesnitt eller eksperimentere med nye ideer.",
        "Utenom dette liker jeg å tegne og male, høre på musikk, reise, hunder, filmer og å lese bøker – spesielt innen fantasy- og sci-fi-sjangeren. Jeg er også interessert i AI, fremvoksende teknologier og teknologi generelt.",
        "Målet mitt er å fortsette å utfordre meg selv samtidig som jeg bidrar til meningsfulle prosjekter der design og utvikling kommer sammen for å utgjøre en forskjell.",
      ],

      servicesTitle: "Hva jeg kan og mine ferdigheter",
      services: {
        webDev: {
          title: "Webutvikling",
          text: "Bygger moderne og responsive nettsider med React og Next.js.",
        },
        uiux: {
          title: "UI/UX-design",
          text: "Lager intuitive brukergrensesnitt, wireframes og prototyper.",
        },
        api: {
          title: "API-integrasjoner",
          text: "Kobler eksterne API-er som NASA, værdata og AI-modeller.",
        },
        seo: {
          title: "SEO og optimalisering",
          text: "Optimaliserer for ytelse, universell utforming (WCAG) og SEO.",
        },
        fast: {
          title: "Rask",
          text: "Leverer raske og effektive løsninger.",
        },
        responsive: {
          title: "Responsiv",
          text: "Design som tilpasser seg mobil, nettbrett og desktop.",
        },
        intuitive: {
          title: "Intuitiv",
          text: "Setter brukeren i sentrum av design og utvikling.",
        },
        dynamic: {
          title: "Dynamisk",
          text: "Utforsker ny teknologi som AI, spillutvikling og IoT.",
        },
      },

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
            "Utforsket skytjenester, deployment og Raspberry Pi-servere.",
            "Studert historien og protokollene bak Internett og WWW.",
            "Forståelse av GDPR, etikk, lovverk og forskningsmetoder.",
            "Alt kursarbeid på engelsk – høyt nivå skriftlig og muntlig engelsk.",
            "Valgt som tillitsvalgt for Fakultet for arkitektur og design i 2023.",
          ],
        },
      ],

      workTitle: "Jobberfaring",
      jobs: {
        job1: {
          title: "Pleiemedarbeider",
          company: "Villa Skaar Jevnaker",
          period: "Sesonger(sommer) 2018-2024",
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
            "Tjenestegjorde i Sjøforsvaret ved Forsvarets operative hovedkvarter (FOH).",
            "Stasjonert ved et overvåkings- og operasjonssenter, med bidrag til maritim situasjonsforståelse i norske og NATO-områder.",
            "Arbeidet i et høysikkerhets operativt miljø med støtte til overvåkning, rapportering og vurdering av maritim aktivitet.",
            "Bidro til nasjonal beredskap og koordinering med allierte styrker.",
            "Opparbeidet praktisk erfaring med tekniske og operative systemer i maritim sammenheng, med fokus på sikker informasjonsflyt, oppdragsstøtte og operativ oversikt.",
            "Kurs: Kvalifisert førstehjelp – nivå 2.",
            "Kurs: Organisasjonsarbeid, møteteknikk og helse, miljø og sikkerhet (HMS).",
            "Tillitsvalgt i skiftlaget.",
          ],
        },
        job3: {
          title: "Pleiemedarbeider",
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
          image: "/icons/iphone.svg",
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
          extraImages: ["/images/heimatapp.png"],
          extraLink:
            "https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/3078733?show=full&locale-attribute=en",
        },
        {
          id: "flower-power",
          title: "Flower Power – Cosmo & Wanda",
          image: "/icons/flower.svg",
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
          extraImages: ["/images/cosmowanda.jpg"],
        },
        {
          id: "portfolio-site",
          title: "Min nettside",
          image: "/icons/website.svg",
          description: (
            <>
              Dette prosjektet er en personlig{" "}
              <span className={styles.highlight}>porteføljenettside</span> som
              viser frem hvem jeg er og hva jeg kan. Nettsiden er bygget med{" "}
              <span className={styles.highlight}>Next.js</span> og{" "}
              <span className={styles.highlight}>React</span>, og inneholder
              seksjoner for presentasjon, utdanning, arbeidserfaring, prosjekter
              og kontakt, samt modaler for prosjektdetaljer og integrerte
              demoer. I prosjektet er det brukt{" "}
              <span className={styles.highlight}>HTML</span>,{" "}
              <span className={styles.highlight}>CSS</span> og{" "}
              <span className={styles.highlight}>JavaScript</span> på frontend,
              med <span className={styles.highlight}>React</span> og{" "}
              <span className={styles.highlight}>Next.js</span> som rammeverk.
              Styling er gjort med{" "}
              <span className={styles.highlight}>CSS Modules</span>, media
              queries, animasjoner og responsiv tilpasning for mobil, nettbrett
              og desktop. Nettsiden inkluderer dynamisk navigasjon, språkvalg
              (norsk og engelsk), skjema for kontakt,{" "}
              <span className={styles.highlight}>SEO-metadata</span> og
              tilgjengelighetsattributter. Prosjektene som er integrert i
              nettsiden bruker blant annet{" "}
              <span className={styles.highlight}>
                API-ruter, Node.js, Express, Python og Flask
              </span>
              . Det er brukt <span className={styles.highlight}>MongoDB</span>{" "}
              som database i fullstack-prosjekter, med{" "}
              <span className={styles.highlight}>CRUD</span>-funksjonalitet og
              lagring av data. API-er er testet og validert med{" "}
              <span className={styles.highlight}>Postman</span>, og flere
              prosjekter kommuniserer mellom frontend og backend via{" "}
              <span className={styles.highlight}>fetch</span> og{" "}
              <span className={styles.highlight}>JSON</span>. Eksterne API-er er
              brukt for å hente sanntidsdata, blant annet NASA Open API og
              vær-API-er. <span className={styles.highlight}>Python</span> er
              brukt både til backend-API-er og som kommandolinjeverktøy (CLI),
              med håndtering av API-kall,{" "}
              <span className={styles.highlight}>JSON</span>-data og
              feilhåndtering. Spillutvikling er representert gjennom et
              nettleserbasert spill bygget med{" "}
              <span className={styles.highlight}>Phaser.js</span>.
            </>
          ),
          tech: ["#NextJS", "#React", "#JavaScript", "#CSSModules"],
          extraImages: ["/images/mypage.png"],
          link: "https://github.com/heddaolimb/mypage.git",
        },
        {
          id: "python-chatbot",
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
          ], //
          link: null,
        },
        {
          id: "feedback-board",
          title: "Feedback Board",
          image: "/icons/feedback.svg",
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
          extraImages: ["/images/taskmanager.png", "/images/taskpostman.png"],
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
          ],
          link: null,
        },
        {
          id: "space-shooter",
          title: "Space Shooter",
          image: "/icons/space.svg",
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

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Jobs
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowJobs(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowJobs(true),
      { threshold: 0.3 }
    );

    if (jobsRef.current) observer.observe(jobsRef.current);
    return () => jobsRef.current && observer.unobserve(jobsRef.current);
  }, [prefersReducedMotion]);

  // About
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowAboutItems(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowAboutItems(true),
      { threshold: 0.3 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => aboutRef.current && observer.unobserve(aboutRef.current);
  }, [prefersReducedMotion]);

  // Education
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowEducation(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowEducation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (educationRef.current) observer.observe(educationRef.current);
    return () =>
      educationRef.current && observer.unobserve(educationRef.current);
  }, [prefersReducedMotion]);

  // Projects
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowProjects(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowProjects(true),
      { threshold: 0 }
    );

    if (projectsRef.current) observer.observe(projectsRef.current);
    return () => projectsRef.current && observer.unobserve(projectsRef.current);
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
  }, [selectedProject]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowAboutItems(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAboutItems(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    const node = aboutRef.current;
    if (node) observer.observe(node);
    return () => node && observer.unobserve(node);
  }, []);

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
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onNavKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToSection(id);
      setMenuOpen(false);
    }
  };

  // Services
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowServices(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowServices(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => servicesRef.current && observer.unobserve(servicesRef.current);
  }, []);

  // Contact
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowContact(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowContact(true),
      { threshold: 0.2 }
    );

    if (contactRef.current) observer.observe(contactRef.current);
    return () => contactRef.current && observer.unobserve(contactRef.current);
  }, []);

  // --- Data for språk ---
  const jobs = t.jobs;
  const projects = t.projects;

  // --- Contact form ---
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
    } catch {
      setFormStatus(t.toastError);
    } finally {
      setTimeout(() => setFormStatus(""), 4000);
    }
  };

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content={language === "no" ? "no" : "en"} />

        {/* FAVICON */}
        <link rel="icon" type="image/png" href="/favicon.png" />

        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dittdomene.no/" />
        <meta
          property="og:image"
          content="https://dittdomene.no/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta
          name="twitter:image"
          content="https://dittdomene.no/og-image.jpg"
        />

        <link rel="canonical" href="https://dittdomene.no/" />

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
      <a href="#main" className={styles.skipLink}>
        {t.skip}
      </a>
      <header
        className={`${styles.navbar} ${selectedProject ? styles.hidden : ""}`}
        aria-label="Site header"
      >
        <div
          className={styles.logo}
          role="button"
          tabIndex={0}
          aria-label="Scroll to top"
          onClick={() => scrollToSection("hero")}
          onKeyDown={(e) => onNavKey(e, "hero")}
        >
          HO
        </div>

        <nav
          className={`${styles.navLinks} ${
            menuOpen ? styles.mobileMenuOpen : ""
          }`}
          aria-label="Main navigation"
        >
          {t.nav.map((label, i) => (
            <span
              key={sectionIds[i]}
              role="button"
              tabIndex={0}
              aria-label={label}
              onClick={() => {
                scrollToSection(sectionIds[i]);
                setMenuOpen(false);
              }}
              onKeyDown={(e) => onNavKey(e, sectionIds[i])}
              className={styles.navItem}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* Språkvelger i navbar */}
        <div className={styles.langSwitch} aria-label="Language switcher">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`${styles.langBtn} ${
              language === "en" ? styles.activeLang : ""
            }`}
            aria-pressed={language === "en"}
            aria-current={language === "en" ? "true" : undefined}
            aria-label="Switch language to English"
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
            aria-label="Bytt språk til norsk"
            title="Norsk"
          >
            <img
              src="/icons/flag-no.svg"
              alt="Norwegian flag"
              className={styles.flagIcon}
            />
            NO
          </button>
          {/* Burger menu – mobile */}
          <button
            className={styles.burger}
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>
      {/* HERO */}
      <section
        id="hero"
        className="
    relative
    min-h-screen
    w-full
    flex
    flex-col
    items-center
    justify-center
    px-4

    lg:flex-row
    lg:items-center
    lg:justify-between
    lg:px-8
  "
        aria-labelledby="hero-heading"
      >
        <div
          className="
    relative z-10
    w-full
    flex flex-col
    items-center
    text-center

    xl:items-start
    xl:text-left
    xl:max-w-2xl
    xl:pl-[3vw]
  "
        >
          <h1
            id="hero-heading"
            className="text-white mb-2 font-[VemanemX]"
            style={{
              fontSize: "2.3rem",

              textTransform: "uppercase",
              color: "#b0b0b0ff",
              fontWeight: 700,
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            {t.heroTitle}{" "}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Hedda Olimb
            </span>
          </h1>

          <h2
            id="hero-subtitle"
            className="text-gray-300 mb-8 font-[VemanemX]"
            style={{
              fontSize: "1.8rem",
              textTransform: "uppercase",
              color: "#b0b0b0ff",
              fontWeight: 700,
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            {language === "no"
              ? "Velkommen til min nettside"
              : "Welcome to my website"}
          </h2>

          <p className="mb-6">
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#8f99a6ff",
                fontSize: "1.25rem",
              }}
            >
              <span aria-hidden="true">
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
                />
              </span>

              <span className="sr-only">
                {language === "no"
                  ? "Webutvikler, designer og problemløser"
                  : "Web developer, designer and problem solver"}
              </span>
            </span>
          </p>

          <div className="mt-3 flex flex-col items-center xl:items-start">
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className={styles.heroExploreBtn}
              aria-label={
                language === "no"
                  ? "Gå til Om meg-seksjonen"
                  : "Go to About section"
              }
            >
              {t.explore}
            </button>

            <div className={styles.heroSocialIcons}>
              <a
                href="https://github.com/heddaolimb"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroIconLink}
                aria-label="GitHub profile"
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
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3.5 9h3v12h-3zM9 9h2.88v1.64h.04c.4-.76 1.37-1.64 2.82-1.64 3.02 0 3.58 1.99 3.58 4.58V21h-3v-5.37c0-1.28-.02-2.93-1.79-2.93-1.8 0-2.07 1.4-2.07 2.84V21H9z" />
                </svg>
              </a>

              <a
                href="mailto:heddaolimb134@gmail.com"
                className={styles.heroIconLink}
                aria-label="Send email"
                title="Email"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>

              <a
                href="tel:+4747376579"
                className={styles.heroIconLink}
                aria-label="Call phone number"
                title="Phone"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.9.73 1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.37.25 2.7.73 3.9a1 1 0 01-.21 1.11l-2.4 2.78z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="relative hidden xl:flex flex-none w-[420px] h-[420px] mr-[3vw] items-center justify-center z-10">
          <div
            ref={cloudRef}
            className="tagcloud text-2xl font-[VemanemX]"
            style={{ width: "100%", height: "100%" }}
            aria-hidden="true"
          />
        </div>
      </section>
      {/* MAIN */}
      <main id="main" className={styles.mainContent} role="main">
        <section
          id="about"
          className={styles.aboutSection}
          aria-labelledby="about-title"
        >
          <div ref={aboutRef} className={styles.aboutWrapper}>
            {/* Image */}
            <div className={styles.aboutImage}>
              <img
                src="/images/meg1.png"
                alt="Portrait of Hedda Olimb"
                className={styles.aboutPhoto}
              />
            </div>

            {/* Content */}
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
                  <span className={styles.icon} aria-hidden="true">
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

        <section
          id="services"
          className={styles.section}
          aria-labelledby="services-title"
        >
          <div ref={servicesRef} className={styles.servicesOuter}>
            <h2 id="services-title" className={styles.sectionTitle}>
              {t.servicesTitle}
            </h2>

            <div className={styles.servicesGrid}>
              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  💻
                </div>
                <h3>{t.services.webDev.title}</h3>
                <p>{t.services.webDev.text}</p>
              </div>

              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  🎨
                </div>
                <h3>{t.services.uiux.title}</h3>
                <p>{t.services.uiux.text}</p>
              </div>

              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  🔗
                </div>
                <h3>{t.services.api.title}</h3>
                <p>{t.services.api.text}</p>
              </div>

              <div
                className={`${styles.serviceCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "0.8s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  ⚡
                </div>
                <h3>{t.services.seo.title}</h3>
                <p>{t.services.seo.text}</p>
              </div>

              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  🚀
                </div>
                <h3>{t.services.fast.title}</h3>
                <p>{t.services.fast.text}</p>
              </div>

              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1.2s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  📱
                </div>
                <h3>{t.services.responsive.title}</h3>
                <p>{t.services.responsive.text}</p>
              </div>

              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1.4s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  ✨
                </div>
                <h3>{t.services.intuitive.title}</h3>
                <p>{t.services.intuitive.text}</p>
              </div>

              <div
                className={`${styles.skillCard} ${
                  showServices ? styles.show : ""
                }`}
                style={{ transitionDelay: "1.6s" }}
              >
                <div className={styles.iconPlaceholder} aria-hidden="true">
                  🌍
                </div>
                <h3>{t.services.dynamic.title}</h3>
                <p>{t.services.dynamic.text}</p>
              </div>
            </div>
          </div>
        </section>

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
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeIndex === idx}
                  aria-label={edu.title}
                  onClick={() =>
                    setActiveIndex(activeIndex === idx ? null : idx)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(activeIndex === idx ? null : idx);
                    }
                  }}
                >
                  <div className={styles.educationFront}>
                    <div className={styles.educationYear}>{edu.year}</div>
                    <h3>{edu.title}</h3>
                    {edu.school && <p>{edu.school}</p>}
                  </div>

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
              ref={jobsRef}
              className={`${styles.jobSection} ${showJobs ? styles.show : ""}`}
            >
              <div
                className={styles.jobTabs}
                role="tablist"
                aria-label="Work experience"
              >
                {Object.keys(jobs).map((jobKey) => (
                  <div
                    key={jobKey}
                    id={`tab-${jobKey}`}
                    className={`${styles.jobTab} ${
                      selectedJob === jobKey ? styles.active : ""
                    }`}
                    role="tab"
                    aria-selected={selectedJob === jobKey}
                    aria-controls={`panel-${jobKey}`}
                    tabIndex={0}
                    onClick={() => setSelectedJob(jobKey)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedJob(jobKey);
                      }
                    }}
                  >
                    {jobs[jobKey].company}
                  </div>
                ))}
              </div>

              <div
                className={styles.jobContent}
                role="tabpanel"
                id={`panel-${selectedJob}`}
                aria-labelledby={`tab-${selectedJob}`}
              >
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
                  role="button"
                  tabIndex={0}
                  aria-label={proj.title}
                  onClick={() => setSelectedProject(proj)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(proj);
                    }
                  }}
                >
                  <img src={proj.image} alt="" className={styles.projectIcon} />

                  <h3>{proj.title}</h3>
                </article>
              ))}
            </div>

            {selectedProject && (
              <div
                className={styles.projectTakeover}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-title"
                onClick={() => setSelectedProject(null)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSelectedProject(null);
                  }
                }}
                tabIndex={-1}
              >
                <div
                  className={styles.projectDetails}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={() => setSelectedProject(null)}
                    aria-label={
                      language === "no"
                        ? "Lukk prosjektdetaljer"
                        : "Close project details"
                    }
                  >
                    <span aria-hidden="true">✕</span>
                  </button>

                  {selectedProject.id === "space-shooter" ? (
                    <>
                      <h3 id="project-title">{selectedProject.title}</h3>
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
                      <h3 id="project-title">{selectedProject.title}</h3>
                      <div className={styles.projectDescription}>
                        {selectedProject.description}
                      </div>
                      {selectedProject.extraImages && (
                        <div className={styles.projectImages}>
                          {selectedProject.extraImages.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`${selectedProject.title} screenshot ${
                                i + 1
                              }`}
                            />
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

                      {selectedProject.id === "python-chatbot" && <Chatbot />}
                      {selectedProject.id === "feedback-board" && (
                        <FeedbackBoard />
                      )}
                      {selectedProject.id === "nasa-api" && <NasaProject />}
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

        <>
          {/* Contact */}
          <section
            id="contact"
            className={`${styles.section} ${
              selectedProject ? styles.hideContact : ""
            }`}
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
                <p id="contact-description" className={styles.contactText}>
                  {t.contactText}
                </p>

                <form
                  className={styles.contactForm}
                  onSubmit={handleSubmit}
                  aria-describedby="contact-description"
                >
                  <label htmlFor="contact-name" className="sr-only">
                    {t.form.name}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder={t.form.name}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  <label htmlFor="contact-email" className="sr-only">
                    {t.form.email}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder={t.form.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <label htmlFor="contact-message" className="sr-only">
                    {t.form.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={t.form.message}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={formStatus}
                  >
                    {formStatus === t.form.sending
                      ? t.form.sending
                      : t.form.send}
                  </button>

                  <p
                    className={styles.formStatus}
                    role="status"
                    aria-live="polite"
                  >
                    {formStatus}
                  </p>
                </form>
              </div>
            </div>
          </section>
        </>
      </main>{" "}
      {/* FOOTER */}
      <footer className={styles.footer} role="contentinfo">
        <p>
          &copy; {new Date().getFullYear()} Hedda Olimb. {t.footer}
        </p>
      </footer>
    </>
  );
}
