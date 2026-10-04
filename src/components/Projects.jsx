import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section-container fade-up-section">
      <h2 className="section-title">Projects</h2>
      <div className="proj-grid">
        {projects.map((project) => (
          <div className="frosted-card proj-card" key={project.name}>
            <div className="proj-top">
              <h3 className="proj-name">{project.name}</h3>
              {project.date && project.date.trim() !== "" && (
                <span className="proj-date">{project.date}</span>
              )}
            </div>

            <p className="proj-desc">{project.desc}</p>

            {project.points && project.points.length > 0 && (
              <ul className="proj-points">
                {project.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="proj-tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className="proj-links">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link-btn"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
