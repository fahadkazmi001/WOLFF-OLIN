import "./FeaturedNews.css";

import n1 from "../../assets/featurednews/n1.png";
import n2 from "../../assets/featurednews/n2.png";
import n3 from "../../assets/featurednews/n3.png";
import n4 from "../../assets/featurednews/n4.png";
import n5 from "../../assets/featurednews/n5.png";
import n6 from "../../assets/featurednews/n6.png";
import n7 from "../../assets/featurednews/n7.png";
import n8 from "../../assets/featurednews/n8.png";

const newsItems = [
  {
    id: "n1",
    image: n1,
    tag: "Events",
    title: "Cannes Lions announces 2026 Shortlisting Jury line-up",
    text: "Global Executive Creative Director Emma Barratt takes her place on the...",
  },
  {
    id: "n2",
    image: n2,
    tag: "Thinking",
    title: "Meet Apple's New Brand Mascot, 'Lil Finder Guy'",
    text: "Global Principal Amanda Munilla explores the buzz behind Apple's ne...",
  },
  {
    id: "n3",
    image: n3,
    tag: "Inside",
    title: "Unafraid to flip the script",
    text: "Born in the Sixties – a decade that questioned everything – we've alway...",
  },
  {
    id: "n4",
    image: n4,
    tag: "Thinking",
    title: "Why brands are re-embracing the power of the tagline",
    text: "Verbal Director William Rauscher explains in Design Week why the...",
  },
  {
    id: "n5",
    image: n5,
    tag: "Thinking",
    title: "Why Japan and Korea are outsmarting Western brands with mascots",
    text: "Creative Director Matthew Haysom explores how Western brands can...",
  },
  {
    id: "n6",
    image: n6,
    tag: "Thinking",
    title: "By leaning into change, luxury is learning to thrive",
    text: "Global CEO Sairah Ashman writes for Fast Company on how leading brand...",
  },
  {
    id: "n7",
    image: n7,
    tag: "Clients",
    title: "The people behind the pivot: Engagement within brand transformation",
    text: "Senior Engagement Director Melissa Priestman delves into the people...",
  },
  {
    id: "n8",
    image: n8,
    tag: "Inside",
    title: "Dear 1965, thanks for the blueprint.",
    text: "As we celebrate our 60th anniversary, we're revisiting the blueprint that's...",
  },
];

function FeaturedNews() {
  return (
    <section className="featured-news">
      <div className="featured-news-header">
        <h2 className="featured-news-title">Featured News</h2>
      </div>

      <div className="featured-news-grid">
        {newsItems.map((item) => (
          <a href="#" key={item.id} className="featured-news-card">
            <div className="featured-news-image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="featured-news-image"
                loading="lazy"
              />
              <span className="featured-news-tag">{item.tag}</span>
            </div>

            <h3 className="featured-news-card-title">{item.title}</h3>
            <p className="featured-news-card-text">{item.text}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default FeaturedNews;
