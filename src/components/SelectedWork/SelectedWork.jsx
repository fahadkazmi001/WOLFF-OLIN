import "./SelectedWork.css";

import w1 from "../../assets/work/w1.mp4";
import w2 from "../../assets/work/w2.mp4";
import w3 from "../../assets/work/w3.jpg";
import w4 from "../../assets/work/w4.png";
import w5 from "../../assets/work/w5.jpg";

const workItems = [
  {
    id: "w1",
    media: w1,
    type: "video",
    title: "Sandals & Beaches Resorts",
    subtitle: "Rooted In Caribbean Soul",
    tags: [
      "Travel and hospitality",
      "Physical Environments",
      "Visual Identity",
      "Verbal Identity",
    ],
    size: "half",
  },
  {
    id: "w2",
    media: w2,
    type: "video",
    title: "Lloyds",
    subtitle: "A next step forward",
    tags: [
      "Financial Services",
      "Brand Strategy",
      "Visual Identity",
      "Brand Architecture",
    ],
    size: "half",
  },
  {
    id: "w3",
    media: w3,
    type: "image",
    title: "Decathlon",
    subtitle: "Rewriting sport's playbook for billions of athletes",
    tags: ["Sports", "Brand Strategy", "Brand Architecture", "Visual Identity"],
    size: "full",
  },
  {
    id: "w4",
    media: w4,
    type: "image",
    title: "Benefit",
    subtitle: "Blazing new trails in beauty",
    tags: ["Consumer goods", "Visual Identity", "Verbal Identity", "Brand Strategy"],
    size: "half",
  },
  {
    id: "w5",
    media: w5,
    type: "image",
    title: "Blank Street",
    subtitle: "Adding a spark to the coffee run",
    tags: ["Food and drink", "Brand Strategy", "Verbal Identity", "Visual Identity"],
    size: "half",
  },
];

function SelectedWork() {
  return (
    <section className="work">
      <div className="work-header">
        <span className="work-label">Selected Work</span>
        <a href="#" className="work-view-all">
          View all work
        </a>
      </div>

      <div className="work-grid">
        {workItems.map((item) => (
          <a
            href="#"
            key={item.id}
            className={"work-card work-card--" + item.size}
          >
            <div className="work-card-media">
              {item.type === "video" ? (
                <video
                  src={item.media}
                  className="work-card-image"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={item.media}
                  alt={item.title}
                  className="work-card-image"
                  loading="lazy"
                />
              )}
              <span className="work-card-overlay" />
            </div>

            <div className="work-card-info">
              <h3 className="work-card-title">{item.title}</h3>
              <p className="work-card-subtitle">{item.subtitle}</p>

              <ul className="work-card-tags">
                {item.tags.map((tag) => (
                  <li key={tag} className="work-card-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default SelectedWork;
