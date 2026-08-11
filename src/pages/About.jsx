import { useEffect, useState } from "react";
import Showreel from "../components/Showreel/Showreel";
import Media from "../components/Media/Media";
import SEO from "../components/SEO/SEO";
import "./About.css";

const pillars = [
  {
    id: "brand",
    color: "#fef74a",
    media: "/assets/about/np1",
    title: "Brand",
    description:
      "In a world that demands new and better, no one can afford to stand still. Your brand can be a catalyst for change, helping you supercharge your transformation efforts and drive business performance. Wolff Olins fuses maths and magic to turn your vision for tomorrow into something people can feel today.",
    items: [
      {
        title: "Insights and measurement",
        text: "Identify your unique equities and opportunities using qual and quant research designed to give you clarity on what's important and where to go next.",
      },
      {
        title: "Purpose and brand strategy",
        text: "Define your aspirational north star including why you exist, what makes you special, and how your brand comes to life in a compelling and actionable way.",
      },
      {
        title: "Brand architecture and portfolio strategy",
        text: "Organise your brands and products for the future and design systems to help people understand and navigate your offer.",
      },
      {
        title: "Verbal identity",
        text: "Use the power of language to distinguish your brand with the right name, tone of voice, and messaging for your audiences.",
      },
      {
        title: "Visual identity",
        text: "Create a cut-through expression of your strategy across logo, colour palette, bespoke typography, imagery, motion, sound, haptics, and more.",
      },
      {
        title: "Activation and governance",
        text: "Plan and design your launch/rollout to build momentum internally and externally and help you manage your brand into the future.",
      },
    ],
  },
  {
    id: "culture",
    color: "#fd5f2e",
    media: "/assets/about/np2",
    title: "Culture",
    description:
      "When it comes to realising your business and brand ambition, a 'good' organisational culture is not good enough. You need the right culture for the journey ahead. We use creativity and inspiration to help you shape your internal culture, energise your employees, and retain top talent.",
    items: [
      {
        title: "Employee value proposition",
        text: "Define a compelling ethos for talent that conveys why their work matters and what they can expect in return.",
      },
      {
        title: "Culture strategy and leadership narrative",
        text: "Articulate the values, beliefs, behaviors, and foundational principles that support your organisation's ambition.",
      },
      {
        title: "Employer brand expression",
        text: "Bring the brand to life for current and prospective talent via design, messaging, communications, and campaigns.",
      },
      {
        title: "Change and learning programs",
        text: "Create behavior-led tools, training, and rituals to build and reinforce the culture strategy and employee value proposition.",
      },
      {
        title: "Workplace branding and experiences",
        text: "Design the signature moments, events, and environments that evoke a feeling and disproportionately impact your employee experience.",
      },
    ],
  },
  {
    id: "experience",
    color: "#ff89ac",
    media: "/assets/about/np3",
    title: "Experience",
    description:
      "Brand Experience has become bland experience, fixated on the functional. Optimisation won't ensure success as people's expectations soar and their attention depletes. Your brand must realise its unique power to unlock new value for people and your business. We design transformative brand experiences that move people and organisations where they need to go.",
    items: [
      {
        title: "Experience strategy",
        text: "Define a holistic future state vision, strategy and roadmap for your brand across all touchpoints to drive growth and relevancy.",
      },
      {
        title: "Experience innovation",
        text: "Unlock growth and delight customers through experience enhancements and bold, new-to-world experiences that redefine your category and business.",
      },
      {
        title: "Experience ecosystem design",
        text: "Craft and prototype captivating experiences that bring the brand to life across the ecosystem, breaking through the category and fostering meaningful emotional connections.",
      },
      {
        title: "Experience implementation",
        text: "Cross functional collaboration to bring new experiences to market, gather feedback, and evaluate their success via key metrics.",
      },
    ],
  },
];

const teamCategories = [
  "All",
  "Design",
  "Engagement",
  "Management",
  "Marketing & New Business",
  "Operations",
  "Strategy",
];

const teamMembers = [
  { name: "Jordan Blake", role: "Associate Engagement Director", color: "#c9b0ea" },
  { name: "Amara Reyes", role: "Senior Designer", color: "#baebc5" },
  { name: "Priya Malhotra", role: "Global Principal", color: "#c9b0ea" },
  { name: "Owen Sinclair", role: "Finance Director", color: "#576eff" },
  { name: "Noor Haddad", role: "Strategy Director", color: "#fef74a" },
  { name: "Leo Fontaine", role: "Senior Engagement Manager", color: "#fd5f2e" },
  { name: "Mika Tanaka", role: "Design Director", color: "#ff89ac" },
  { name: "Ella Sorensen", role: "Operations Manager", color: "#baebc5" },
  { name: "Theo Marchetti", role: "Senior Strategist", color: "#c9b0ea" },
  { name: "Ravi Shankar", role: "Motion Designer", color: "#576eff" },
  { name: "Ingrid Voss", role: "New Business Lead", color: "#fef74a" },
  { name: "Caleb Odom", role: "Verbal Identity Lead", color: "#fd5f2e" },
];

function About() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const dark = progress >= 0.5;
      setIsDark(dark);
      window.dispatchEvent(new CustomEvent("app:theme", { detail: { dark } }));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.dispatchEvent(new CustomEvent("app:theme", { detail: { dark: false } }));
    };
  }, []);

  return (
    <div className={`about-page ${isDark ? "about-page--dark" : ""}`}>
      <SEO
        path="/about"
        title="About Us — Brand Strategy, Culture & Experience Consultancy"
        description="We're a strategic brand consultancy uniting brand, culture and experience. Our services include brand purpose, brand architecture, verbal identity, employer branding and experience design."
        keywords="brand strategy consultancy, brand purpose, brand architecture agency, employer branding agency, culture strategy, experience design agency, verbal identity agency, brand consultant"
      />
      <section className="about-intro">
        <h1 className="sr-only">About Wolff Olins — Brand Strategy Consultancy</h1>
        <p className="about-intro-lede">
          Wolff Olins is a global brand consultancy that&rsquo;s ambitious for
          the work and optimistic for the world. We&rsquo;re here to help our
          clients defy convention, redefine expectations and ignite positive
          change.
        </p>
      </section>

      <Showreel rightLabel="How To Break The Rules" />

      <section className="about-approach">
        <h2 className="about-approach-label">Our Approach</h2>
        <p className="about-approach-text">
          We unite brand, culture and experience to drive impact inside and
          outside an organisation.
        </p>
      </section>

      <section className="about-pillars">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="about-pillar" style={{ "--pillar-color": pillar.color }}>
            <div className="about-pillar-head">
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
            </div>

            <div className="about-pillar-media">
              <Media base={pillar.media} alt={pillar.title} className="about-pillar-media-file" />
            </div>

            <div className="about-pillar-grid">
              {pillar.items.map((item) => (
                <div className="about-pillar-item" key={item.title}>
                  <span className="about-pillar-dot" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="about-team">
        <h2 className="about-team-heading">Team</h2>
        <p className="about-team-lede">
          We&rsquo;re a bunch of sharp thinkers and creative makers on a
          mission to do the best work of our lives—and always enjoy the ride.
        </p>

        <div className="about-team-filters">
          {teamCategories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`about-team-filter ${index === 0 ? "is-active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="about-team-names">
          {teamMembers.map((member) => (
            <span className="about-team-member" key={member.name}>
              <span className="about-team-dot" style={{ "--dot-color": member.color }} />
              {member.name}, {member.role}
              {"; "}
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}

export default About;
