import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Footer.css";
import wolffOlinsLogo from "../../assets/logo/wolff-olins-logo.png";

const footerLinks = ["Contact Us", "Cookie Policy", "Privacy Notice"];
const socialLinks = ["LinkedIn", "X", "Instagram", "YouTube", "Archive"];

function Footer() {
  const wordmarkRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const wordmark = wordmarkRef.current;
    if (!wordmark) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(wordmark, {
      x: "-0.5%",
      y: reducedMotion ? 0 : 90,
      opacity: reducedMotion ? 1 : 0,
      scale: reducedMotion ? 1 : 0.94,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(wordmark, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: reducedMotion ? 0 : 1.3,
          ease: "power4.out",
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(wordmark);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col footer-col--year">
          <span>2026 Wolff Olins</span>
        </div>

        <div className="footer-col footer-col--cta">
          <p className="footer-cta-heading">Talk to us or ask us anything.</p>
          <ul className="footer-link-list">
            {footerLinks.map((link) => (
              <li key={link}>
                <a href="#">
                  <span className="footer-arrow">&rarr;</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col--social">
          <ul className="footer-link-list">
            {socialLinks.map((link) => (
              <li key={link}>
                <a href="#">
                  <span className="footer-arrow">&rarr;</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col--back">
          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span className="footer-back-arrow">&uarr;</span>
            <span>Back to top</span>
          </button>
        </div>
      </div>

      <div className="footer-wordmark" ref={wordmarkRef} aria-hidden="true">
        <img src={wolffOlinsLogo} alt="" className="footer-wordmark-logo" />
      </div>
    </footer>
  );
}

export default Footer;
