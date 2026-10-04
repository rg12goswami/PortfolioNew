// ─────────────────────────────────────────────────────────────
// PROJECTS — edit this file any time. No component code needs to change.
//
// TO ADD A PROJECT: copy the template below, paste it at the TOP of the
// array (newest first), and fill it in.
//
// TO ADD / CHANGE A LIVE LINK: edit the `links` array of that project.
//   { label: "Live ↗", href: "https://your-site.com" }
//   { label: "Code ↗", href: "https://github.com/you/repo" }
//   Remove a link object if it doesn't apply. Empty `links: []` is fine.
//
// TEMPLATE (copy this):
//   {
//     name: "Project Name",
//     date: "Mon YYYY – Mon YYYY",     // or "Client Project", or ""
//     desc: "One-line description.",
//     points: ["What you built / achieved", "Another point"],   // or []
//     tags: ["React.js", "Node.js"],
//     links: [
//       { label: "Live ↗", href: "https://..." },
//       { label: "Code ↗", href: "https://github.com/..." },
//     ],
//   },
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    name: "GTE Council Website",
    date: "Client Project",
    desc: "Fully responsive professional website for the Global Trade and Educational Council.",
    points: [
      "Built custom UI components, smooth navigation, and cross-device compatibility.",
    ],
    tags: ["React.js", "WordPress", "HTML", "CSS"],
    links: [{ label: "Live ↗", href: "https://gtecouncil.org" }],
  },
  {
    name: "Brain Cruise Website",
    date: "Client Project",
    desc: "Full website for Brain Cruise — clean design, fast load times, mobile responsive.",
    points: ["Developed and deployed the site with SEO optimization."],
    tags: ["React.js", "WordPress", "HTML", "CSS"],
    links: [{ label: "Live ↗", href: "https://braincruise.in" }],
  },
  {
    name: "AI Interview Simulator",
    date: "Jan 2025 – Jun 2025",
    desc: "Full-stack AI interview platform with JWT authentication and an analytics dashboard.",
    points: [
      "AI-powered feedback generation and performance analytics dashboard.",
      "Deployed end-to-end using Vercel (frontend), Render (backend), and MongoDB Atlas (database) with Git version control throughout.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    links: [
      { label: "Live ↗", href: "https://ai-interview-simulator-chi-nine.vercel.app/" },
      { label: "Code ↗", href: "https://github.com/rg12goswami/ai-interview-simulator" },
    ],
  },
  {
    name: "ATS Resume Analyzer",
    date: "Jul 2025 – Dec 2025",
    desc: "AI-powered ATS resume screening system with PDF parsing and automated scoring.",
    points: [
      "Keyword extraction and scoring against job descriptions.",
      "Secure user authentication; deployed end-to-end with modular, reusable components.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "AI APIs"],
    links: [{ label: "Code ↗", href: "https://github.com/rg12goswami/ats-resume-analyzer" }],
  },
  // Not on the resume, but live on GitHub — delete these two if you don't want them shown.
  {
    name: "Fabric Hub",
    date: "",
    desc: "Next.js fabric marketplace for suppliers and buyers to trade textiles.",
    points: [],
    tags: ["Next.js", "MongoDB"],
    links: [
      { label: "Live ↗", href: "https://fabric-hub-virid.vercel.app/" },
      { label: "Code ↗", href: "https://github.com/rg12goswami/fabric-hub" },
    ],
  },
  {
    name: "Task Flow",
    date: "",
    desc: "Task board built with React.js, Node.js and SQLite — add, edit, and delete tasks.",
    points: [],
    tags: ["React.js", "Node.js", "Express.js", "SQLite"],
    links: [{ label: "Code ↗", href: "https://github.com/rg12goswami/taskflow" }],
  },
];