import workData from "../data/workData";
import SEO from "../components/SEO/SEO";
import "./Work.css";

function Work() {
  return (
    <div className="work-page">
      <SEO
        path="/work"
        title="Our Work — Brand Identity & Brand Strategy Case Studies"
        description="Explore brand identity, brand strategy and visual identity work for global clients. A creative branding agency portfolio spanning brand design, brand architecture and rebranding."
        keywords="brand identity agency, brand design agency, visual identity agency, logo design agency, corporate identity design, brand strategy agency, rebranding agency"
      />
      <section className="work-page-intro">
        <h1 className="work-page-title">Work</h1>
        <p className="work-page-lede">
          From global icons to trailblazing start-ups, we partner with
          ambitious leaders at pivotal inflection points.
        </p>
      </section>

      <section className="work-page-grid">
        {workData.map((item, index) => (
          <a
            href="#"
            key={item.id}
            className={`work-page-card ${
              index % 4 === 0 ? "work-page-card--full" : "work-page-card--half"
            }`}
          >
            <div className="work-page-card-media">
              {item.type === "video" ? (
                <video
                  src={item.media}
                  className="work-page-card-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img src={item.media} alt={item.title} loading="lazy" />
              )}
              <span className="work-page-card-overlay" />
            </div>

            <div className="work-page-card-info">
              <h3 className="work-page-card-title">{item.title}</h3>
              <p className="work-page-card-subtitle">{item.subtitle}</p>

              <ul className="work-page-card-tags">
                {item.tags.map((tag) => (
                  <li key={tag} className="work-page-card-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

export default Work;
