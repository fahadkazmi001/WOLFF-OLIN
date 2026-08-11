import SEO from "../components/SEO/SEO";
import JsonLd from "../components/SEO/JsonLd";
import "./Contact.css";

const offices = [
  {
    city: "London",
    address: "24 Chiswell Street\nLondon, EC1Y 4TY, UK",
    phone: "+44 20 7946 0958",
    phoneHref: "+442079460958",
    coords: "51.5055° N, 0.0985° W",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=51.50554,-0.09852",
  },
  {
    city: "New York",
    address: "148 Lafayette Street, Fl. 4\nNew York, NY 10013, USA",
    phone: "+1 (212) 946-0851",
    phoneHref: "+12129460851",
    coords: "40.7500° N, 73.9759° W",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=40.75,-73.9759",
  },
  {
    city: "Los Angeles",
    address: "8500 Melrose Avenue, Suite 200\nLos Angeles, CA 90069, USA",
    phone: "+1 (310) 828-4471",
    phoneHref: "+13108284471",
    coords: "33.9829° N, 118.4150° W",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=33.98291,-118.415",
  },
  {
    city: "San Francisco",
    address: "580 Howard Street, Fl. 3\nSan Francisco, CA 94105, USA",
    phone: "+1 (415) 655-3920",
    phoneHref: "+14156553920",
    coords: "37.7749° N, 122.4194° W",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=37.7749,-122.4194",
  },
];

const localBusinessSchema = offices.map((office) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `Wolff Olins ${office.city}`,
  areaServed: office.city,
  telephone: office.phone,
  address: office.address.replace("\n", ", "),
}));

function Contact() {
  return (
    <div className="contact-page">
      <SEO
        path="/contact"
        title="Contact Us — Branding Agency in London, New York, LA & San Francisco"
        description="Get in touch with our branding agency studios in London, New York, Los Angeles and San Francisco. Reach out for brand strategy, brand identity and rebranding enquiries."
        keywords="branding agency near me, branding agency London, branding agency USA, branding agency New York, branding agency Los Angeles, branding agency San Francisco, brand consultancy London"
      />
      <JsonLd id="ld-local-business" data={localBusinessSchema} />

      <section className="contact-intro">
        <h1 className="sr-only">Contact Our Branding Agency Studios</h1>
        <p>
          We&rsquo;re from all over, but there are a few places we call home.
          Come say hi.
        </p>
      </section>

      <section className="contact-offices">
        {offices.map((office) => (
          <div className="contact-office" key={office.city}>
            <h2 className="contact-office-city">{office.city}</h2>

            <div className="contact-office-details">
              <div className="contact-office-col">
                <h2>Find us</h2>
                <p>
                  {office.address.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <p>
                  <a href={`tel:${office.phoneHref}`}>{office.phone}</a>
                </p>
              </div>
            </div>

            <a
              className="contact-office-coords"
              href={office.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {office.coords}
            </a>
          </div>
        ))}
      </section>

      <section className="contact-closing">
        <p>
          We&rsquo;re always looking for ambitious, curious, creative minds
          to join the team.
        </p>
      </section>
    </div>
  );
}

export default Contact;
