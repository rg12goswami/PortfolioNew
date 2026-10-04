import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-container fade-up-section">
      <h2 className="section-title">Experience</h2>
      <div className="experience-list">
        {experience.map((job) => (
          <div className="frosted-card log-entry" key={job.company}>
            <div className="log-date">{job.date}</div>
            <div className="log-details">
              <h3 className="log-role">{job.role}</h3>
              <div className="log-co">{job.company}</div>
              <ul className="log-points">
                {job.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
