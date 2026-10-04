import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="section-container fade-up-section">
      <h2 className="section-title">Get in Touch</h2>
      <div className="frosted-card contact-sh">
        <p className="contact-sub">
          Currently open to full-time MERN Stack & Full-Stack Web Developer opportunities.
        </p>
        <div className="contact-grid">
          <a className="btn-pill-white" href={profile.emailHref}>
            ✉ {profile.email}
          </a>
          <a className="btn-pill-frosted" href={profile.phoneHref}>
            📞 {profile.phone}
          </a>
          <a
            className="btn-pill-frosted"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            className="btn-pill-frosted"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className="btn-pill-frosted"
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume (PDF) ↓
          </a>
        </div>
      </div>
    </section>
  );
}
