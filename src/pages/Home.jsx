import Hero from "../components/Hero/Hero";
import Ambition from "../components/Ambition/Ambition";
import Showreel from "../components/Showreel/Showreel";
import SelectedWork from "../components/SelectedWork/SelectedWork";
import FeaturedNews from "../components/FeaturedNews/FeaturedNews";
import SEO from "../components/SEO/SEO";
import JsonLd from "../components/SEO/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wolff Olins",
  url: "https://wolffolin.com",
  logo: "https://wolffolin.com/assets/logo/wolff-olins-logo.png",
  description:
    "Wolff Olins is a global branding agency and brand consultancy specializing in brand strategy, visual identity, brand transformation and rebranding for ambitious companies.",
  sameAs: [],
};

function Home() {
  return (
    <>
      <SEO
        path="/"
        title="Global Branding Agency & Brand Strategy Consultancy"
        description="Wolff Olins is a global branding agency and brand consultancy. We partner with ambitious leaders on brand strategy, visual identity, brand transformation and rebranding across London, New York, Los Angeles and San Francisco."
        keywords="branding agency, global branding agency, brand consultancy, creative branding agency, brand strategy agency, brand identity agency, corporate branding agency"
      />
      <JsonLd id="ld-organization" data={organizationSchema} />
      <Hero />
      <Ambition />
      <Showreel />
      <SelectedWork />
      <FeaturedNews />
    </>
  );
}

export default Home;
