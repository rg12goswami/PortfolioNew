import React from "react";
import CharacterCanvas from "./CharacterCanvas";
import { profile } from "../data/portfolio";

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const displayName = profile.name || "Lohitha";

  return (
    <section className="hero-container" id="hero">
      {/* Performance-tuned 60 FPS Canvas Renderer */}
      <CharacterCanvas />

      {/* Floating Frosted Glass Header Navigation Pill (Max 8px blur) */}
      <header className="hero-header">
        <nav className="nav-pill">
          <button onClick={() => scrollToSection("projects")} className="nav-item">
            WORK
          </button>
          <button onClick={() => scrollToSection("about")} className="nav-item">
            ABOUT
          </button>
          <button onClick={() => scrollToSection("contact")} className="nav-item">
            CONTACT
          </button>
        </nav>
      </header>

      {/* Hero Content (Bottom-Left) */}
      <div className="hero-content">
        <div className="hero-badge">Hi, I'm</div>
        <h1 className="hero-name">{displayName}</h1>
        <p className="hero-bio">
          Full Stack Developer building fast, scalable web apps — from polished React interfaces to secure Node.js APIs.
        </p>

        <div className="hero-actions">
          <a
            href={profile.resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-resume"
          >
            Resume
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-talk"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
}
