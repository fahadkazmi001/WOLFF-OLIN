import { useState } from "react";
import newsData from "../data/newsData";
import Media from "../components/Media/Media";
import SEO from "../components/SEO/SEO";
import "./News.css";

const categories = ["All", "Clients", "Events", "Inside", "Thinking"];

function News() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? newsData
      : newsData.filter((item) => item.category === activeCategory);

  return (
    <div className="news-page">
      <SEO
        path="/news"
        title="News & Insights — Brand Strategy & Branding Industry Thinking"
        description="The latest thinking on brand strategy, rebranding, brand experience and creative branding from our global branding agency team."
        keywords="brand strategy, rebranding strategy, brand transformation, brand storytelling, branding industry news, brand experience"
      />
      <section className="news-intro">
        <h1 className="sr-only">Branding Agency News &amp; Brand Strategy Insights</h1>
        <p>The latest from our world and beyond.</p>
        <p>Read, watch and go deeper on what&rsquo;s happening with us and our work.</p>
      </section>

      <section className="news-listing">
        <div className="news-listing-meta">
          <span>{filtered.length} Results</span>
          <span>{activeCategory}</span>
        </div>

        <div className="news-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`news-filter ${activeCategory === category ? "is-active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="news-grid">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card"
            >
              <div className={`news-card-media news-card-media--${item.shape}`}>
                <Media base={item.media} alt={item.title} className="news-card-media-file" />
                <div className="news-card-overlay">
                  <div className="news-card-marquee">
                    <span>Read More</span>
                    <span>Read More</span>
                    <span>Read More</span>
                  </div>
                </div>
              </div>

              <span className="news-card-category">{item.category}</span>
              <h2 className="news-card-title">{item.title}</h2>
              <p className="news-card-excerpt">{item.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default News;
