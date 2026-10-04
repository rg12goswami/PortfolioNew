import { useEffect } from "react";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { profile } from "./data/portfolio";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // One-shot trigger: unobserve after section enters view
          }
        });
      },
      { threshold: 0.12 }
    );

    const sections = document.querySelectorAll(".fade-up-section, main > section");
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-app">
      <CustomCursor />
      <Hero />

      <main className="main-content">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />

        <footer className="portfolio-footer">
          © {new Date().getFullYear()} {profile.name} · Built with React + Vite
        </footer>
      </main>
    </div>
  );
}
