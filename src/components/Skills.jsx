import { skillGroups } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="section-container fade-up-section">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div className="frosted-card skill-group-card" key={group.key}>
            <h3 className="skill-group-header">{group.key}</h3>
            <div className="tags">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className={`tag${group.highlight?.includes(tag) ? " hl" : ""}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
