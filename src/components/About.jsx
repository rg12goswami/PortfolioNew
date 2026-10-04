import { profile } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="section-container fade-up-section">
      <h2 className="section-title">About Me</h2>
      <div className="frosted-card about-card">
        <p className="about-summary">{profile.summary}</p>
        <div className="facts-row">
          <div className="fact-item">
            <span className="fact-label">📍 Location</span>
            <span className="fact-value">{profile.location}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">✉ Email</span>
            <a className="fact-link" href={profile.emailHref}>
              {profile.email}
            </a>
          </div>
          <div className="fact-item">
            <span className="fact-label">📞 Phone</span>
            <a className="fact-link" href={profile.phoneHref}>
              {profile.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
