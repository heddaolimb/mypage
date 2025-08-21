import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showAboutItems, setShowAboutItems] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [selectedJob, setSelectedJob] = useState("job1");
  const [currentCourse, setCurrentCourse] = useState(0);
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
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const jobsRef = useRef(null);
  const coursesRef = useRef(null);
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
    let sphere = null;

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

    import("tagcloud").then(({ default: TagCloud }) => {
      sphere = TagCloud(cloudRef.current, texts, {
        radius: 220,
        maxSpeed: "normal",
        initSpeed: "slow",
        direction: 90,
        keep: true,
      });
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
  // --- TRANSLATIONS: ALLT INNHOLD (EN + NO) ---
  const translations = {
    en: {
      meta: {
        title: "Hedda Olimb – Website",
        description:
          "Website of Hedda Olimb – Web Developer. Explore projects, education, work experience, courses and contact.",
        keywords:
          "Hedda Olimb, web developer, website, projects, courses, contact, UX, UI, React, Next.js",
      },
      skip: "Skip to content",
      nav: ["About", "Education", "Work", "Projects", "Courses", "Contact"],
      heroTitle: "Hi, I'm",
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
        {
          year: "2024 - 2025",
          title: "Courses",
          descLead: null,
          desc: [
            "Completed online courses and bootcamps focused on digital marketing, AI, Lean Manufacturing, Robotics, and Financial Markets. A more detailed overview is available under the 'Courses' section.",
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
        },
        {
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
          link: "https://www.figma.com/proto/5R4qdV9HUuQtrAhhxCTgXf/Flower-Power",
        },
        {
          title: "My page",
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
      ],

      coursesTitle: "Courses",
      courseWhy: "Why I took this course",
      courseLearned: "What I learned in this course",
      courses: [
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
          learned:
            "Machine learning basics, ethical use, and practical AI tools.",
        },
        {
          title: "JavaScript Basics",
          image: "/images/js.png",
          link: "https://example.com",
          why: "To understand how JavaScript works and how to build my own projects.",
          learned: "The fundamentals of JavaScript.",
        },
      ],

      contactTitle: "Contact",
      contactText:
        "I'm currently open to new opportunities, collaborations, or just a chat. Feel free to reach out!",
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
      nav: ["Om meg", "Utdanning", "Arbeid", "Prosjekter", "Kurs", "Kontakt"],
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
        },
        {
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
          link: "https://www.figma.com/proto/5R4qdV9HUuQtrAhhxCTgXf/Flower-Power",
        },
        {
          title: "Min nettside",
          image: "/images/code.png",
          description:
            "En fullt responsiv, animert porteføljeside bygget med Next.js, React Hooks og CSS Modules for å vise utdanning, erfaring og prosjekter. Inneholder scroll-animasjoner med IntersectionObserver, interaktive jobbtabs og dynamisk prosjektrendering. Seksjoner: Om meg, Utdanning, Arbeid, Prosjekter, Kurs, Kontakt.",
          tech: ["#NextJS", "#React", "#JavaScript", "#CSSModules"],
          link: "https://github.com/heddaolimb/mypage.git",
        },
      ],

      coursesTitle: "Kurs",
      courseWhy: "Hvorfor jeg tok dette kurset",
      courseLearned: "Hva jeg lærte i dette kurset",
      courses: [
        {
          title: "Grunnleggende digital markedsføring",
          image: "/images/digital-marketing.png",
          link: "https://example.com/marketing-course",
          why: "For å forstå hvordan digital markedsføring fungerer og hvordan jeg kan promotere egne prosjekter.",
          learned:
            "Grunnleggende SEO, betalt annonsering, innholdsstrategi og analyse.",
        },
        {
          title: "Introduksjon til kunstig intelligens",
          image: "/images/ai-course.png",
          link: "https://example.com/ai-course",
          why: "Jeg er nysgjerrig på AI og hvordan det brukes i praksis.",
          learned:
            "Grunnleggende maskinlæring, etisk bruk og praktiske AI-verktøy.",
        },
      ],

      contactTitle: "Kontakt",
      contactText:
        "Jeg er åpen for nye muligheter, samarbeid eller bare en prat. Ta gjerne kontakt!",
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
      ([entry]) => entry.isIntersecting && setShowEducation(true),
      { threshold: 0 }
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
  // --- Navigasjon ---
  const sectionIds = [
    "about",
    "education",
    "work",
    "projects",
    "courses",
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
  // --- Data for språk (jobs, projects, courses) ---
  const jobs = t.jobs;
  const projects = t.projects;
  const courses = t.courses;

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
      <header className={styles.navbar} role="banner" aria-label="Site header">
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
              fontSize: "clamp(2.75rem,5vw,4.5rem)",
              letterSpacing: "0.06em",
              lineHeight: 1.05,
            }}
          >
            {t.heroTitle} <span className="text-indigo-400">Hedda Olimb</span>
          </h1>

          <h2
            className="text-gray-300 mb-8 font-[VemanemX]"
            style={{
              fontSize: "clamp(1.75rem,3.8vw,3rem)",
              letterSpacing: "0.08em",
            }}
          >
            {language === "no" ? "Frontend-utvikler" : "Frontend Developer"}
          </h2>

          <p className="mb-6">
            <span
              className="font-[American]"
              style={{
                fontWeight: 800,
                letterSpacing: "0.18em",
                color: "#cbd5e1",
                fontSize: "1.25rem",
              }}
            >
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
          className={styles.section}
          aria-labelledby="about-title"
        >
          <h2 id="about-title" className={styles.sectionTitle}>
            {t.aboutTitle}
          </h2>
          <div ref={aboutRef} className={styles.aboutBox}>
            {t.aboutItems.map((text, i) => (
              <div
                key={i}
                className={`${styles.aboutItem} ${
                  showAboutItems ? styles.show : ""
                }`}
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
        </section>

        {/* Education */}
        <section
          id="education"
          className={styles.section}
          aria-labelledby="education-title"
        >
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
                className={styles.educationItem}
                style={{ transitionDelay: `${0.3 + idx * 0.4}s` }}
                aria-label={edu.title}
              >
                {/* ⭐ + Årstall i en egen flex-rad */}
                <div className={styles.educationYear}>{edu.year}</div>

                {/* Selve boksen */}
                <div className={styles.educationBox}>
                  <h3>{edu.title}</h3>

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
        </section>

        {/* Work Experience */}
        <section
          id="work"
          ref={jobsRef}
          className={styles.section}
          aria-labelledby="work-title"
        >
          <h2 id="work-title" className={styles.sectionTitle}>
            {t.workTitle}
          </h2>
          <div
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
              <div className={styles.jobPeriod}>{jobs[selectedJob].period}</div>
              <ul>
                {jobs[selectedJob].description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className={styles.section}
          aria-labelledby="projects-title"
        >
          <h2 id="projects-title" className={styles.sectionTitle}>
            {t.projectsTitle}
          </h2>
          <div
            ref={projectsRef}
            className={`${styles.projectsGrid} ${
              showProjects ? styles.show : ""
            }`}
          >
            {projects.map((proj, idx) => (
              <article key={idx} className={styles.projectCard}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  className={styles.projectImage}
                />
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className={styles.techList}>
                  {proj.tech.map((tag, i) => (
                    <span key={i} className={styles.techTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">
                    {t.projectLink}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Courses */}
        <section
          id="courses"
          className={styles.section}
          aria-labelledby="courses-title"
        >
          <h2 id="courses-title" className={styles.sectionTitle}>
            {t.coursesTitle}
          </h2>

          <div className={styles.courseSlider}>
            <div className={styles.courseNavButtons}>
              <button
                className={styles.navButton}
                onClick={handlePrev}
                aria-label="Previous course"
              >
                &#8592;
              </button>
              <button
                className={styles.navButton}
                onClick={handleNext}
                aria-label="Next course"
              >
                &#8594;
              </button>
            </div>

            <div
              className={styles.courseTrack}
              style={{ transform: `translateX(-${currentCourse * 100}%)` }}
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
                  <h4 className={styles.courseSubtitle}>{t.courseWhy}</h4>
                  <p className={styles.courseText}>{course.why}</p>
                  <h4 className={styles.courseSubtitle}>{t.courseLearned}</h4>
                  <p className={styles.courseText}>{course.learned}</p>
                </div>
              ))}
            </div>

            <div className={styles.courseDots} aria-hidden="true">
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

        {/* Contact */}
        <section
          id="contact"
          className={styles.section}
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title" className={styles.sectionTitle}>
            {t.contactTitle}
          </h2>

          {/* wrapper beholdes selv om CSS-en din ikke styler den spesielt */}
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
              {formStatus && <p className={styles.formStatus}>{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer} role="contentinfo">
        <p>
          &copy; {new Date().getFullYear()} Hedda Olimb. {t.footer}
        </p>
      </footer>
    </>
  );
}
