// Content source of truth: Riddam_Goswami_Resume_MERN.pdf
// Edit this file to update the site — no component code needs to change.

export const profile = {
  name: "Riddam Goswami",
  heroName: "Riddam",
  role: "MERN Stack Developer | Full-Stack Web Developer",
  tagline: "MERN Stack Developer",
  heroBio:
    "MERN Stack developer building fast, scalable web apps — from polished React interfaces to secure Node.js APIs.",
  location: "Meerut, UP",
  phone: "+91 9917564833",
  phoneHref: "tel:+919917564833",
  email: "goswamiriddam@gmail.com",
  emailHref: "mailto:goswamiriddam@gmail.com",
  github: "https://github.com/rg12goswami",
  linkedin: "https://linkedin.com/in/riddam-goswami-a7b57025a",
  resumeUrl: "/Riddam_Goswami_Resume_MERN.pdf",
  summary:
    "MERN Stack and Full-Stack Web Developer with hands-on experience building and deploying production-ready web applications using React.js, Node.js, Express.js, and MongoDB. Strong foundation in OOPs, Data Structures & Algorithms, REST APIs, JWT authentication, and cloud deployment. Hands-on experience delivering real client websites (gtecouncil.org, braincruise.in) and AI-powered full-stack projects. MCA (2024–2026).",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const skillGroups = [
  { key: "Languages", tags: ["Java (Core)", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"] },
  {
    key: "Core Java",
    tags: ["OOPs", "Collections Framework", "Exception Handling", "Multithreading", "JDBC", "File Handling"],
  },
  {
    key: "Frontend",
    tags: ["React.js", "Next.js", "Tailwind CSS", "Responsive UI Design", "WordPress"],
    highlight: ["React.js", "Next.js"],
  },
  {
    key: "Backend",
    tags: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    highlight: ["Node.js", "Express.js"],
  },
  { key: "Databases", tags: ["MongoDB", "MongoDB Atlas", "PostgreSQL", "MySQL"], highlight: ["MongoDB", "PostgreSQL"] },
  {
    key: "DSA",
    tags: ["Arrays", "Strings", "Linked Lists", "Stacks", "Queues", "Hashing", "Recursion", "Binary Search", "Graphs", "Trees", "DP"],
  },
  { key: "Cloud & DevOps", tags: ["AWS", "Docker", "Vercel", "Render"], highlight: ["AWS", "Docker"] },
  { key: "Tools", tags: ["Git", "GitHub", "Postman", "VS Code"] },
  {
    key: "Soft Skills",
    tags: ["Communication", "Team Collaboration", "Problem-Solving", "Time Management", "Adaptability"],
  },
];

export const experience = [
  {
    date: "May 2025 — Present",
    role: "Full Stack Developer",
    company: "Digi Champ Ltd., Meerut",
    points: [
      "Developed and maintained 10+ responsive client websites using HTML, CSS, JavaScript, React.js, and WordPress.",
      "Built and integrated backend REST APIs using Node.js and Express.js, ensuring smooth data flow between frontend and server.",
      "Delivered gtecouncil.org and braincruise.in with cross-device compatibility, SEO optimization, and production deployment.",
    ],
  },
];

// Projects live in their own file so they are easy to edit: src/data/projects.js
export { projects } from "./projects";

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Dewan VS Institute of Engineering and Technology",
    meta: "Sep 2024 – Jun 2026 · CGPA 8.57 (81.41%)",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Neelkanth Group of Institutions",
    meta: "2021 – 2024 · Aggregate 80%",
  },
];

export const certifications = [
  "Node.js (Intermediate) — HackerRank, 2026",
  "Frontend Developer (React) — HackerRank, 2026",
];

// Not on the current resume. Leave empty; the Education section should hide this column when empty.
export const achievements = [];