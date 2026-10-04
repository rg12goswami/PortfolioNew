import { education, certifications, achievements } from "../data/portfolio";

export default function Education() {
  const hasAchievements = achievements && achievements.length > 0;

  return (
    <section id="education" className="section-container fade-up-section">
      <h2 className="section-title">Education & Credentials</h2>
      <div className={hasAchievements ? "edu-grid-3" : "edu-grid-2"}>
        <div className="frosted-card edu-card">
          <h3 className="block-title">EDUCATION</h3>
          {education.map((edu) => (
            <div className="edu-item" key={edu.degree}>
              <div className="deg">{edu.degree}</div>
              <div className="school">{edu.school}</div>
              <div className="meta">{edu.meta}</div>
            </div>
          ))}
        </div>

        <div className="frosted-card edu-card">
          <h3 className="block-title">CERTIFICATIONS</h3>
          <ul className="list-plain">
            {certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>

        {hasAchievements && (
          <div className="frosted-card edu-card">
            <h3 className="block-title">ACHIEVEMENTS</h3>
            <ul className="list-plain">
              {achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
