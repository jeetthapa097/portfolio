import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';
import './App.css';
import './index.tailwind.css';
import emailjs from '@emailjs/browser';
import { emailConfig } from './config/emailConfig';


const SECTION_IDS = ['home', 'resume', 'certifications', 'experiences', 'projects', 'about', 'contact'];

const HERO_SLIDES = [
  {
    title: 'Technical Skill Stack',
    body: 'SolidWorks for CAD and assemblies, ANSYS for FEA and modal/vibration insight, Simufact for manufacturing simulation, plus hands-on prototyping and performance validation.',
  },
  {
    title: 'Mechanical Engineering',
    body: 'Graduate-level mechanical engineer focused on turning concepts into real hardware—combining CAD, analysis, and test-driven validation with clean engineering documentation',
  },
  {
    title: 'Target Roles & Industries',
    body: 'Seeking roles in Product/Mechanical Design, Test & Validation, and Manufacturing Engineering—especially in automotive, aerospace, consumer hardware, and energy systems.',
  },
];

const PROJECTS = [
  {
    title: 'Compressed Air Engine (Retrofit)',
    tag: 'Capstone Project',
    image: `${process.env.PUBLIC_URL}/compressed_air_engine_A.png`,

    description:
      'Retrofitted a two-stroke engine to operate as a compressed-air engine by removing the spark plug and integrating a high-pressure air reservoir → regulator → air-line injection adapter at the spark-plug port (carburetor unchanged). Developed the air-injection layout, component integration, and performance validation; documented output metrics (0.89 HP @ 1884 rpm, 3.1% efficiency) with thermodynamic/simulation support..',
  },
  {
    title: 'Finite Element Analysis of a Wing Structure (NACA 63012A)',
    tag: 'Student Teams',
    image:
      `${process.env.PUBLIC_URL}/agard_4456_wing_fea.png`,
    description:
      'Performed a complete SolidWorks → ANSYS workflow to model an airfoil-based wing and run modal/vibration analysis for structural dynamics insight. Built clean geometry, defined realistic material properties, generated a high-quality multizone mesh, and applied fixed-support boundary conditions to simulate a representative cantilevered wing setup. Extracted multiple mode shapes and natural frequencies to identify resonance risk, interpret bending/torsion behavior, and evaluate closely spaced modes that can amplify vibration response—documenting assumptions, solver setup, and results in a structured engineering report.',
 },
  {
    title: 'Metal Forming Simulation (Simufact)',
    tag: 'Student Teams',
    image:
      `${process.env.PUBLIC_URL}/metal_forming_simulation.png`,
    description:
      'Built a Simufact metal forming model to study how height-to-diameter ratio and interface friction affect material flow during deformation. Defined tooling, contact, and boundary conditions and ran parametric cases to capture barreling, strain localization, and load response. Analyzed force-displacement and stress-strain trends to explain how geometry and friction change forming force, final shape, and process stability, and used the results to recommend optimized forming parameters.',
  },
  
  
  
];

const EXPERIENCES = [
  {
    company: 'WRIGHT STATE UNIVERSITY',
    location: 'Dayton, OH, USA',
    role: 'Graduate Research Assistant -(Additive Manufacturing, Mechanical & Material Characterization)',
    dates: 'May 2025 – Present',
    summary: 'SLS printed PA12 and PA12-GF across multiple build orientations; performed ASTM D638 tensile, ASTM D695 compression, and ISO 179-1 Charpy impact testing and quantified orientation effects on modulus, yield, and stress–strain response. Verified dimensional accuracy and surface/topography using Mitutoyo Vision System and Keyence VR-6000, and supported simulation correlation in ANSYS/Simufact. Conducted XRD phase identification on PA12 and PA12-GF powder and printed parts to compare crystalline phase changes before vs after printing. Performed SEM fractography on PA12-GF after cryogenic fracture of ASTM D695 cylindrical specimens to evaluate fracture morphology and characterize glass bead morphology/distribution and interfacial features.',
    image: `${process.env.PUBLIC_URL}/experience1.jpg`,
  },
  {
    company: 'WRIGHT STATE UNIVERSITY',
    location: 'Dayton, OH, USA',
    role: 'Graduate Teaching Assistant — Mechanical Vibrations Lab',
    dates: 'Aug 2025 – Dec 2025',
    summary: 'Facilitated SDOF vibration labs using cantilever and forced-response setups; guided students in extracting natural frequency, damping ratio, transmissibility, and frequency response functions (FRF) from experimental data. Conducted and supervised measurements with accelerometers, impact (impulse) hammers, and rotating unbalance excitation, emphasizing proper sensor mounting, signal quality, and repeatability. Connected experimental results to vibration theory through structured analysis, clean data acquisition, and technical reporting.',
    image: `${process.env.PUBLIC_URL}/experience2.jpg`,
  },
  {
    company: 'WRIGHT STATE UNIVERSITY',
    location: 'Dayton, OH, USA',
    role: 'Graduate Teaching Assistant — Material Testing Lab',
    dates: 'Aug 2025 – Dec 2025',
    summary: 'Facilitated SDOF vibration labs using cantilever and forced-response setups; guided students in extracting natural frequency, damping ratio, transmissibility, and frequency response functions (FRF) from experimental data. Conducted and supervised measurements with accelerometers, impact (impulse) hammers, and rotating unbalance excitation, emphasizing proper sensor mounting, signal quality, and repeatability. Connected experimental results to vibration theory through structured analysis, clean data acquisition, and technical reporting.',
    image: `${process.env.PUBLIC_URL}/experience3.jpg`,
  },
  {
    company: 'Sipradi',
    location: 'Kathmandu, Nepal',
    role: 'Service Advisor- (Automotive Diagnostics & Service Operations)',
    dates: 'July 2016 - Oct 2018',
    summary: 'Responsible for end-to-end service operations from customer intake to final quality verification, with strong emphasis on fault isolation, root-cause analysis (RCA), and corrective/preventive actions (CAPA). Performed advanced diagnostics using TATA Diagnostics Software by interpreting DTCs, live sensor data, actuator tests, and wiring/circuit checks, improving troubleshooting speed and increasing service turnover by ~20%. Coordinated repair planning, job card documentation, parts ordering, and quality control to improve first-time-fix performance and reduce rework. Implemented Hunter Hawkeye Elite 3D wheel alignment to improve measurement accuracy and steering/handling correction, validating results through road-test verification and structured customer handover.',
    image: `${process.env.PUBLIC_URL}/experience4.jpg`,
  },
  {
    company: 'B & K ENTERPRISES',
    location: 'Nepal',
    role: 'Technical Advisor / Sr. Service Engineer- (SOPs, Failure Analysis, Reporting & Compliance)',
    dates: 'Dec 2018 – Nov 2023',
    summary: 'Implemented advanced service SOPs across multiple vehicle classes, improving workflow efficiency and saving 225+ labor hours/year. Led failure analysis / RCA on hydraulics, clutch, and brake systems, driving preventive actions that reduced repeat failures by ~15%. Managed technical coordination and documentation—warranty/inventory reporting using Microsoft Office and Microsoft Dynamics Navision—and performed emissions compliance inspections using exhaust gas analyzers (petrol) and opacity meters (diesel) to support regulatory readiness.',
    image: `${process.env.PUBLIC_URL}/experience5.jpg`,
  },
  {
    company: 'CG FOODS NEPAL',
    location: 'Nepal',
    role: 'Mechanical Engineering Internship- (Industrial Operation, Maintenance & QA Support)',
    dates: 'Oct 2014 – Nov 2014',
    summary: 'Directly involved in operating and supporting maintenance of production equipment (extruders, boilers, conveyors), including preventive maintenance, welding, lathe machining, and alignment to improve reliability and reduce downtime. Supported quality assurance through equipment calibration checks and verification of material/process consistency to meet plant standards.',
    image: `${process.env.PUBLIC_URL}/experience6.jpg`,
  },
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      id="hero-carousel"
      className="relative w-full max-w-xl ml-auto h-full"
      data-carousel="slide"
    >
      <div className="relative h-full overflow-hidden rounded-2xl">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex h-full flex-col justify-center bg-slate-800/90 px-8 py-6 md:py-8">
              <h2 className="mb-3 text-xl md:text-2xl font-semibold text-white">
                {slide.title}
              </h2>
              <p className="text-sm md:text-[0.95rem] text-slate-200/90 leading-relaxed">
                {slide.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 space-x-2 bottom-3 left-1/2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={String(i)}
            type="button"
            className="h-2.5 w-2.5 rounded-full border border-white/60 bg-white/40 hover:bg-white"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState('idle'); // idle | sending | success | error
  const [expandedCards, setExpandedCards] = useState({});
  const projectHoverTimeoutRef = useRef(null);
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => scrollToSection(location.state.scrollTo), 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
        const element = document.getElementById(SECTION_IDS[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      setContactStatus('error');
      return;
    }

    setContactStatus('sending');

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          to_email: 'jeet.thapa096@gmail.com',
          from_name: contactName,
          phone: contactPhone,
          message: contactMessage,
        },
        emailConfig.publicKey,
      );

      setContactStatus('success');
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to send contact email', error);
      setContactStatus('error');
    }
  };

  return (
    <div className="App">
      <Header />

      <main>
        <section
          id="home"
          className="section hero-section bg-zinc-500 text-slate-50 rounded-b-[2.5rem] md:rounded-b-[3rem]"
        >
          <div className="hero-content space-y-4">
            <p className="hero-kicker">Mechanical Engineering Portfolio</p>
            <h1 className="hero-title text-white">Jeet thapa</h1>
            <p className="hero-subtitle text-slate-200/95">
              Mechanical Engineer experienced in engineering softwares (SolidWorks, ANSYS & MATLAB), automotive (almost 7 years), 3D-printing along with mechanical & material characterization, and experimental workflows, bringing an R&D-minded approach to design, analysis, and performance verification.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`${process.env.PUBLIC_URL || ''}/Resume_Jeet.pdf?v=${Date.now()}`}
                download="Jeet_Resume.pdf"
                className="btn-primary inline-flex items-center gap-2 text-sm md:text-[0.95rem]"
              >
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
          <HeroCarousel />
        </section>

        <section id="experience" className="section experience-section">
          <div className="section-container">
          <h2 className="section-title">Experience</h2>
          <div className="experience-grid">
            {EXPERIENCES.map((exp, index) => {
              const isExpanded = expandedCards[index];
              const displayText = isExpanded ? exp.summary : exp.summary.slice(0, 100) + '...';
              return (
                <article key={index} className="experience-card">
                  {exp.image && (
                    <div className="experience-image-wrapper">
                      <img
                        src={exp.image}
                        alt={exp.company}
                        className="experience-image"
                      />
                    </div>
                  )}
                  <div className="experience-content">
                    <p className="experience-summary">{displayText}</p>
                    <button
                      type="button"
                      className="btn-primary text-sm mt-2"
                      onClick={() => setExpandedCards(prev => ({ ...prev, [index]: !prev[index] }))}
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                  <div className="experience-details">
                    <div className="experience-meta">
                      <span className="experience-company">{exp.company}</span>
                      <span className="experience-location">{exp.location}</span>
                    </div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <p className="experience-dates">{exp.dates}</p>
                  </div>
                </article>
              );
            })}
          </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <article
                key={project.title}
                className="project-card"
                onMouseEnter={() => {
                  if (projectHoverTimeoutRef.current) {
                    clearTimeout(projectHoverTimeoutRef.current);
                  }
                  projectHoverTimeoutRef.current = setTimeout(() => {
                    setActiveProject(project);
                  }, 1000);
                }}
                onMouseLeave={() => {
                  if (projectHoverTimeoutRef.current) {
                    clearTimeout(projectHoverTimeoutRef.current);
                    projectHoverTimeoutRef.current = null;
                  }
                }}
                onClick={() => {
                  if (projectHoverTimeoutRef.current) {
                    clearTimeout(projectHoverTimeoutRef.current);
                    projectHoverTimeoutRef.current = null;
                  }
                  setActiveProject(project);
                }}
              >
                {project.image && (
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tag">{project.tag}</p>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-container">
          <h2 className="section-title">About</h2>
          <div className="about-grid grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img
                  src={process.env.PUBLIC_URL + '/pi.jpeg'}
                  alt="Profile"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="md:col-span-6 flex justify-center">
              <div className="w-full h-full rounded-lg overflow-hidden p-6">
                <h3 className="about-subtitle">Background</h3>
                <ul className="about-list">
                  <li>I am a graduate-level Mechanical Engineer who works at the intersection of mechanical design, simulation, testing, and materials characterization, turning concepts into validated engineering outcomes. Strengths include building clean CAD models in SolidWorks, supporting decisions with ANSYS FEA (structural and modal/vibration insight), and using Simufact to study forming behavior, friction effects, and process-driven deformation trends.</li>
                  <li>Graduate research experience at Wright State University includes mechanical characterization of SLS-printed PA12 and PA12-GF using standards-based testing such as ASTM D638 and ASTM D695, and translating stress–strain response into meaningful performance conclusions. Materials characterization experience includes XRD phase identification to compare crystalline phase changes in PA12 powder versus printed parts, and SEM fractography of PA12-GF after cryogenic fracture of ASTM D695 cylindrical specimens to evaluate fracture morphology and glass-bead microstructure.</li>
                  <li>Prior automotive service engineering experience added a reliability-focused mindset through diagnostics, root-cause analysis (RCA), SOP implementation, technical reporting, and compliance inspection, strengthening the ability to troubleshoot complex systems and communicate clearly across teams. Interests span product development, test and validation, manufacturing and process engineering, structural and vibration analysis, and R&D-driven problem solving, where decisions are backed by analysis and real data.</li>
                </ul>
              </div>
            </div>

          </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-container">
          <h2 className="section-title">Contact</h2>
          <p className="contact-text">
            For opportunities, collaborations, or questions, feel free to reach out.
          </p>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-form-row">
              <div className="contact-form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor="contact-phone">Phone number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(event) => setContactPhone(event.target.value)}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>
            <div className="contact-form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                value={contactMessage}
                onChange={(event) => setContactMessage(event.target.value)}
                placeholder="Tell me a bit about what you’d like to discuss..."
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary contact-submit-button"
              disabled={contactStatus === 'sending'}
            >
              {contactStatus === 'sending' ? 'Sending...' : 'Send message'}
            </button>
            {contactStatus === 'success' && (
              <p className="contact-status contact-status-success">
                Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {contactStatus === 'error' && (
              <p className="contact-status contact-status-error">
                Something went wrong. Please check the form and try again.
              </p>
            )}
          </form>
          </div>
        </section>
      </main>

      {activeProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setActiveProject(null)}
          role="presentation"
        >
          <div
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>
            {activeProject.image && (
              <div className="project-modal-image-wrapper">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="project-modal-image"
                />
              </div>
            )}
            <p className="project-tag project-tag-modal">{activeProject.tag}</p>
            <h3 className="project-title project-title-modal">{activeProject.title}</h3>
            <p className="project-description-modal">{activeProject.description}</p>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-content">
          <a
            href="https://www.linkedin.com/in/jeet-thapa-82567118b/"
            className="footer-social-link"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <svg
              className="footer-social-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <p>Copyright © 2026 Jeet Thapa</p>
          <a
            href="mailto:jeet.thapa097@gmail.com"
            className="footer-email-link"
            aria-label="Email address"
            title="jeet.thapa097@gmail.com"
          >
            jeet.thapa097@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
