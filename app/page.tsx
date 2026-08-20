import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import HoverVideoPreview from "./HoverVideoPreview";
import VisitorMap from "./VisitorMap";

const news = [
  {
    date: "AUG 2026",
    text: "Joined the National University of Singapore to study for an MSc in Robotics.",
  },
  {
    date: "JUN 2026",
    text: "WalkerBench was accepted to ECCV 2026.",
  },
  {
    date: "FEB 2026",
    text: "Forest Remix was accepted to the International XR Metaverse Conference.",
  },
];

const publications = [
  {
    venue: "ECCV 2026",
    title:
      "Stand Up and Move: Benchmarking Interactive Spatial Intelligence in WalkerBench",
    authors:
      "Zhiqi Ge*, Gang Yang*, Ziyang Pan, Jingzhe Zhu, Yuancheng Gu, Juncheng Li, Qizhou Wang, Rui Tang, Siliang Tang, Jun Xiao, Yueting Zhuang",
    note: "* Equal contribution",
    href: "https://drive.google.com/file/d/112mWVeacZQwwdJXDcHQVNusAFwlCSFxy/view?usp=drive_link",
    showPaper: true,
    image: "/assets/images/walkerbench-figure.png",
    imageAlt: "WalkerBench comparison between static perception and interactive spatial intelligence",
    additionalResources: [
      { label: "CODE", href: "https://github.com/lalayang123456-ctrl/WalkerBench" },
    ],
  },
  {
    venue: "UNDER REVIEW",
    title: "CityLoop: Sandbox for Tool-Grounded Urban Navigation",
    authors: "Gang Yang, et al.",
    note: null,
    href: "https://drive.google.com/file/d/1Dygww9mM7rm8daEqCgXXLXIrhRxDZFSh/view",
    showPaper: true,
    image: "/assets/images/cityloop-detail.webp",
    imageAlt: "CityLoop sandbox and RouteGround closed-loop system overview",
    additionalResources: [],
  },
  {
    venue: "XRM 2026",
    title: "Forest Remix: A Musical Forest with Custom Embodied Tangible\u00A0Hardware",
    authors:
      "Ambrose Kersley*, Gang Yang*, Yida Zhao*, Yihao Tao, Alhassane Jalloh, Sechan Yi",
    note: "* Equal contribution, listed alphabetically",
    href: null,
    showPaper: false,
    image: "/assets/images/forest-remix-figure.png",
    imageAlt: "Forest Remix tangible controller design",
    additionalResources: [
      { label: "DEMO", href: "https://www.youtube.com/watch?v=GBDFQY9WLPo" },
    ],
  },
];

const projects = [
  {
    year: "MAY 2026 — PRESENT",
    title: "CityLoop",
    subtitle: "Tool-Grounded Urban Navigation with Vision-Language Models",
    text: "A request-to-arrival urban navigation sandbox connecting online navigation, 2D Gaussian Splatting simulation, and real-world robot deployment through a shared policy interface.",
    detailImage: "/assets/images/cityloop-detail.webp",
    detailImageAlt: "CityLoop sandbox and RouteGround closed-loop system overview",
    details: [
      "Built CityLoop, a request-to-arrival urban navigation sandbox that unifies online navigation, 2DGS simulation, and real-world robot deployment through a shared move/stop policy interface.",
      "Constructed an evaluation corpus spanning 43 cities and 22 countries/regions, with 1,000 routes, 500 POI requests, 5,000+ Street View panorama walking-route samples, and controlled position/heading perturbations.",
      "Developed RouteGround by fine-tuning Qwen3-VL-4B with counterfactual tool-vision conflict training and a four-stage curriculum, improving medium-noise keypoint decision accuracy from 24.9% to 59.0%, reaching 58.0% 2DGS closed-loop success and 6/20 zero-shot robot successes.",
    ],
    tag: "Unitree Robotics",
    accent: "red",
  },
  {
    year: "DEC 2025 — FEB 2026",
    title: "WalkerBench",
    subtitle: "Interactive Spatial Intelligence Benchmark",
    text: "A global-scale benchmark spanning 161 cities across six continents, with 1,000 tasks covering active perception and spatial navigation.",
    detailImage: "/assets/images/walkerbench-detail.webp",
    detailImageAlt: "WalkerBench comparison between static perception and interactive spatial intelligence",
    details: [
      "Built WalkerBench, a global-scale interactive benchmark for embodied spatial intelligence spanning 161 cities across 6 continents, with 1,000 tasks covering Active Perception and Spatial Navigation.",
      "Implemented Spatial-IDE, a training-free framework that combines Explicit Topological Memory (ETM) with cognitive decoupling to address long-horizon spatial forgetting in VLM-based agents.",
      "Achieved average benchmark gains of +18.49 points to 36.66% (+104.97% relative) across 9 VLMs and demonstrated zero-shot transfer to real-world urban navigation on a Unitree G1 robot.",
    ],
    tag: "ECCV 2026",
    accent: "blue",
  },
  {
    year: "SEP 2025 — JAN 2026",
    title: "Forest Remix",
    subtitle: "Embodied XR Music System",
    text: "An open-world musical forest that connects a custom 3D-printed physical controller with procedural visual and spatial audio feedback in Unreal Engine 5.",
    detailVideo: {
      provider: "youtube" as const,
      videoId: "GBDFQY9WLPo",
      href: "https://www.youtube.com/watch?v=GBDFQY9WLPo",
      label: "forest-remix-demo",
    },
    details: [
      "Directed a 6-person cross-functional team in developing a UE5-based Mixed Reality experience; owned system architecture, Git workflow, and task allocation for an open-world musical forest system.",
      "Developed a custom 3D-printed physical controller using Raspberry Pi Pico 2 W and MicroPython; implemented low-latency input mapping through UE5 Enhanced Input.",
      "Used UE5 Blueprints and MetaSound to translate physical actions into procedural feedback, dynamically driving visual environmental shifts and spatial audio modulation.",
    ],
    tag: "XRM 2026",
    accent: "green",
  },
  {
    year: "JUN 2025 — SEP 2025",
    title: "ANN-enhanced MPC",
    subtitle: "Intelligent Control for Power Converters",
    text: "Neural-network-assisted model predictive control for renewable-energy power converters, validated through system simulation and hardware-in-the-loop testing.",
    detailImage: "/assets/images/ai-mpc-detail.webp",
    detailImageAlt: "AI-enhanced model predictive control and power converter architecture",
    details: [
      "Designed and optimized AI-enhanced Model Predictive Control algorithms for power converters in renewable energy systems, improving real-time performance and efficiency.",
      "Developed and trained a neural network achieving 93% prediction accuracy, enabling rapid inference and reliable real-time decision-making in embedded control environments.",
      "Conducted system-level modelling and simulation in Matlab/Simulink, validating results through Hardware-in-the-Loop (HiL) testing on FPGA/DSP hardware platforms.",
    ],
    tag: "PEMC Group RA",
    accent: "yellow",
  },
  {
    year: "SEP 2024 — JUN 2025",
    title: "VR Rehabilitation Game",
    subtitle: "Immersive Lower-Limb Rehabilitation Platform",
    text: "A VR rehabilitation platform integrating gamified lower-limb training with treadmill hardware, adaptive navigation, and intelligent NPC interaction.",
    detailVideo: {
      provider: "bilibili" as const,
      videoId: "BV1zmEBzzES2",
      href: "https://www.bilibili.com/video/BV1zmEBzzES2/",
      label: "low-limb-rehab-demo",
    },
    details: [
      "Designed and implemented a VR-based rehabilitation platform using Unreal Engine, integrating gamified training with treadmill hardware for lower-limb recovery.",
      "Built advanced VR-human interaction systems, including a dynamic visualization dashboard and adaptive smart minimap to enhance usability and immersion.",
      "Developed an intelligent NPC behavior system with Behaviour Trees, enabling dynamic pathfinding and adaptive difficulty in rehabilitation exercises.",
    ],
    tag: "Motus VR & UoN",
    accent: "red",
  },
];

const experience = [
  {
    period: "DEC 2025 — PRESENT",
    role: "Research Intern, Embodied AI",
    place: "Unitree Robotics · Hangzhou, China",
    detailHeading: "Humanoid Robot Navigation in Open Environments",
    overview: null,
    details: [
      "Led the development of a closed-loop humanoid robot navigation system for natural-language-driven, long-horizon navigation in open environments, integrating maps and external tools, first-person visual perception, and vision-language model decision-making across online environments, 2D Gaussian Splatting (2DGS) simulation, and deployment on a Unitree G1 robot.",
      "To address spatial-state forgetting during long-horizon operation and inconsistent decisions under noisy observations, developed explicit spatial memory and active perception mechanisms together with tool–vision conflict training, improving navigation decision accuracy under medium noise from 24.9% to 59.0%.",
      "Built a data-generation and closed-loop evaluation pipeline that continuously produces navigation tasks, trajectories, and perturbed scenarios, enabling rapid iteration of navigation policies across online maps and 2DGS simulation while reducing the cost of real-robot validation.",
      "Completed long-distance zero-shot navigation in real urban environments on the Unitree G1; parts of this work contributed to WalkerBench (ECCV 2026) and CityLoop (under review).",
    ],
    accent: "red",
  },
  {
    period: "JUN 2025 — SEP 2025",
    role: "Research Assistant",
    place: "PEMC Group, University of Nottingham · Nottingham, UK",
    detailHeading: null,
    overview:
      "Conducted cross-disciplinary research at the intersection of intelligent control and power electronics, contributing to the design and validation of neural-network-enhanced model predictive control. The work covered dataset construction, model training, and closed-loop evaluation.",
    details: [
      "Intelligent Control & Model Research: Investigated data-driven learning and replacement of model predictive control decision stages for motor-drive applications, completing model training, optimization, and comparative evaluation.",
      "Simulation Evaluation & Research Collaboration: Developed closed-loop models, performance evaluations, and experimental analyses in MATLAB/Simulink, delivering iterative solutions under interdisciplinary supervision.",
    ],
    accent: "blue",
  },
  {
    period: "JUN 2024 — SEP 2024",
    role: "Data Mining Intern",
    place: "Ping An Insurance · Ningbo, China",
    detailHeading: null,
    overview: null,
    details: [
      "Engineered a multi-point user tracking pipeline for the Haochezhu app, enabling granular monitoring of user interactions within the insurance purchase flow.",
      "Utilized SQL-based ETL processes for large-scale data cleaning and feature extraction, eliminating anomalous records and ensuring robust downstream analytics.",
      "Conducted A/B experiments on UI/UX elements, leading to a 21% increase in click-through rate (CTR) and 6% growth in conversion rate for cross-sell products.",
    ],
    accent: "yellow",
  },
];

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-heading">
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Gang Yang — home">
          <img src="/assets/images/signature.jpg" alt="Gang Yang's Chinese signature" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#news">News</a>
          <a href="#publications">Publications</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="profile-column">
          <div className="profile-visual">
            <div className="portrait-frame">
              <img src="/assets/images/profile-photo.jpg" alt="Gang Yang by the sea with mountains in the background" />
            </div>
          </div>
          <div className="profile-copy">
            <h1>Gang<br />Yang</h1>
            <p className="position">MSc Robotics<br />National University of Singapore</p>
            <div className="profile-icons" aria-label="Academic profiles and contact">
              <a href="mailto:gangyang@u.nus.edu" aria-label="Email" title="Email">
                <FaEnvelope aria-hidden="true" />
              </a>
              <span className="profile-icon-disabled" aria-label="Google Scholar" title="Google Scholar">
                <SiGooglescholar aria-hidden="true" />
              </span>
              <a href="https://github.com/lalayang123456-ctrl" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <FaGithub aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/gang-yang-368a37338" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a className="cv-icon-wrapper" href="https://drive.google.com/file/d/1ZlrYBtrM1tLMUCA3aRpkSiSynUUzF3f8/view" target="_blank" rel="noreferrer" aria-label="Curriculum Vitae" title="Curriculum Vitae">
                <span className="cv-icon-text" aria-hidden="true">CV</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-statement">
          <div className="hero-shapes" aria-hidden="true">
            <span className="shape-circle" />
            <span className="shape-square" />
          </div>
          <p className="hero-kicker">EMBODIED AI / VLN / SPATIAL INTELLIGENCE</p>
          <p className="hero-title">
            <span className="hero-title-line">Building intelligent <span className="hero-accent-agents">agents</span> that</span>
            <span className="hero-title-line">
              can <em>perceive</em>, reason, move, and
            </span>
            <span className="hero-title-line">interact with the <span className="hero-accent-physical">physical</span> world.</span>
          </p>
          <div className="hero-intro">
            <p>
              I am an MSc Robotics student at the National University of Singapore. My research sits at the intersection of embodied AI, multimodal vision-language models, spatial intelligence, and robot learning.
            </p>
            <p>
              I build benchmarks, learning systems, and interactive experiences that connect visual reasoning with physical action — from global-scale urban navigation to tangible mixed-reality systems.
            </p>
            <p>
              I enjoy travelling, hiking, fitness training, and guitar. These pursuits bring balance, energy, and new perspectives to my life, while keeping me open-minded, resilient, and curious.
            </p>
          </div>
          <div className="interest-list">
            <span>Embodied AI</span>
            <span>Vision-Language Navigation</span>
            <span>Multimodal LLMs</span>
            <span>Robot Learning</span>
          </div>
          <a className="scroll-cue" href="#news">SCROLL TO EXPLORE <span>↓</span></a>
        </div>
      </section>

      <section className="content-section" id="news">
        <SectionHeading number="01" title="News" />
        <div className="news-list">
          {news.map((item) => (
            <article className="news-item" key={`${item.date}-${item.text}`}>
              <time>{item.date}</time>
              <p>{item.text}</p>
              <span aria-hidden="true">●</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="publications">
        <SectionHeading number="02" title="Publications" />
        <div className="publication-list">
          {publications.map((publication, index) => (
            <article className="publication" key={publication.title}>
              <div className="publication-index">0{index + 1}</div>
              <div className="publication-image">
                <img src={publication.image} alt={publication.imageAlt} />
              </div>
              <div className="publication-copy">
                <p className="publication-venue">{publication.venue}</p>
                <h3>{publication.title}</h3>
                <p className="authors">
                  {publication.authors.split(", ").map((author, authorIndex, authorList) => (
                    <span className="author-name" key={author}>
                      {author}{authorIndex < authorList.length - 1 ? "," : ""}
                    </span>
                  ))}
                </p>
                {publication.note ? <p className="publication-note">{publication.note}</p> : null}
              </div>
              <div className="publication-links">
                {publication.href ? (
                  <a className="resource-link" href={publication.href} target="_blank" rel="noreferrer">
                    PAPER <span>↗</span>
                  </a>
                ) : publication.showPaper !== false ? (
                  <span className="resource-label">PAPER</span>
                ) : null}
                {publication.additionalResources.map((resource) => (
                  resource.href ? (
                    <a className="resource-link" href={resource.href} target="_blank" rel="noreferrer" key={resource.label}>
                      {resource.label} <span>↗</span>
                    </a>
                  ) : (
                    <span className="resource-label" key={resource.label}>{resource.label}</span>
                  )
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="education">
        <SectionHeading number="03" title="Education" />
        <div className="education-grid">
          <article>
            <time>AUG 2026 — PRESENT</time>
            <h3>National University of Singapore</h3>
            <p>MSc in Robotics</p>
          </article>
          <article>
            <time>SEP 2022 — JUN 2026</time>
            <h3>University of Nottingham</h3>
            <p>BSc (Hons) in Computer Science · First-class</p>
          </article>
        </div>
      </section>

      <section className="content-section" id="projects">
        <SectionHeading number="04" title="Research Projects" />
        <div className="project-grid">
          {projects.map((project) => (
            <details className={`project-card ${project.accent}`} key={project.title}>
              <summary>
                <div className="project-meta">
                  <time>{project.year}</time>
                  <span>{project.tag}</span>
                </div>
                <div className="project-title-group">
                  <h3>{project.title}</h3>
                  <h4>{project.subtitle}</h4>
                </div>
                <p>{project.text}</p>
                <span className="project-toggle" aria-hidden="true">+</span>
              </summary>
              <div className={`project-details${project.detailImage || project.detailVideo ? " has-image" : ""}`}>
                {project.detailVideo ? (
                  <HoverVideoPreview
                    provider={project.detailVideo.provider}
                    videoId={project.detailVideo.videoId}
                    href={project.detailVideo.href}
                    label={project.detailVideo.label}
                  />
                ) : project.detailImage && project.detailImageAlt ? (
                  <div className="project-detail-image">
                    <img src={project.detailImage} alt={project.detailImageAlt} />
                  </div>
                ) : null}
                <ul>
                  {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="content-section" id="experience">
        <SectionHeading number="05" title="Professional Experience" />
        <div className="experience-list">
          {experience.map((item) => (
            <details className={item.accent} key={item.role + item.period}>
              <summary>
                <time>{item.period}</time>
                <div className="experience-role">
                  <h3>{item.role}</h3>
                </div>
                <p>{item.place}</p>
                <span className="experience-toggle" aria-hidden="true">+</span>
              </summary>
              <div className="experience-details">
                {item.detailHeading ? <h4 className="experience-detail-heading">{item.detailHeading}</h4> : null}
                {item.overview ? <p className="experience-overview">{item.overview}</p> : null}
                <ul>
                  {item.details.map((detail) => {
                    const separatorIndex = detail.indexOf(": ");

                    return (
                      <li key={detail}>
                        {separatorIndex > 0 ? (
                          <>
                            <strong>{detail.slice(0, separatorIndex)}:</strong>{" "}
                            {detail.slice(separatorIndex + 2)}
                          </>
                        ) : detail}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-mark">
            <span className="footer-circle" aria-hidden="true" />
            <p>Keep looking. Keep becoming. Always more to see.</p>
          </div>
          <VisitorMap />
        </div>
        <div className="footer-bottom">
          <img src="/assets/images/signature.jpg" alt="" />
          <span>© 2026 GANG YANG</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
