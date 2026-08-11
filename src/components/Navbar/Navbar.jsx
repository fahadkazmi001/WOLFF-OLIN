import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import QuoteModal from "../QuoteModal/QuoteModal";
import "./Navbar.css";

import wolffOlinsLogo from "../../assets/logo/wolff-olins-logo.png";

const links = ["Work", "About", "News", "Contact"];
const ROUTED_LINKS = { Work: "/work", About: "/about", News: "/news", Contact: "/contact" };
const SCROLL_THRESHOLD = 40;

const THEME = {
  light: {
    expanded: {
      "--nav-bg": "rgba(255, 255, 255, 1)",
      "--nav-border": "rgba(16, 16, 18, 0.08)",
      "--nav-ink": "#101012",
      "--nav-shadow": "0 0 0 rgba(0, 0, 0, 0)",
    },
    compact: {
      "--nav-bg": "rgba(255, 255, 255, 0.88)",
      "--nav-border": "rgba(16, 16, 18, 0.13)",
      "--nav-ink": "#101012",
      "--nav-shadow": "0 14px 42px rgba(0, 0, 0, 0.18)",
    },
  },
  dark: {
    expanded: {
      "--nav-bg": "rgba(6, 6, 7, 1)",
      "--nav-border": "rgba(255, 255, 255, 0.1)",
      "--nav-ink": "#f2f2f2",
      "--nav-shadow": "0 0 0 rgba(0, 0, 0, 0)",
    },
    compact: {
      "--nav-bg": "rgba(6, 6, 7, 0.88)",
      "--nav-border": "rgba(255, 255, 255, 0.14)",
      "--nav-ink": "#f2f2f2",
      "--nav-shadow": "0 14px 42px rgba(0, 0, 0, 0.45)",
    },
  },
};

export default function Navbar() {
  const location = useLocation();
  const routeDark = location.pathname === "/work" || location.pathname === "/contact";
  // scrollDark is only ever set true by About.jsx's "app:theme" event while
  // it's mounted, and that page dispatches { dark: false } from its own
  // unmount cleanup — so it's already back in sync by the time any other
  // route renders, with no extra reset needed here.
  const [scrollDark, setScrollDark] = useState(false);
  const isDark = routeDark || scrollDark;
  const isDarkRef = useRef(isDark);
  const navRef = useRef(null);
  const compactRef = useRef(false);
  const frameRef = useRef(0);
  const setNavigationStateRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(nav, {
      "--nav-y": "0px",
      "--nav-scale": 1,
      "--nav-width-scale": 1,
      "--nav-width": "100vw",
      "--nav-height": "86px",
      "--nav-radius": "0px",
      "--nav-blur": "blur(0px)",
      ...THEME[isDarkRef.current ? "dark" : "light"].expanded,
    });

    const setNavigationState = (compact, immediate = false) => {
      if (compact === compactRef.current && !immediate) return;

      compactRef.current = compact;
      setIsCompact(compact);

      const theme = THEME[isDarkRef.current ? "dark" : "light"];

      const values = compact
        ? {
            "--nav-y": "0px",
            "--nav-scale": 1,
            "--nav-width-scale": 1,
            "--nav-width": `${Math.min(window.innerWidth * 0.65, 880)}px`,
            "--nav-height": "54px",
            "--nav-radius": "999px",
            "--nav-blur": "blur(22px)",
            ...theme.compact,
          }
        : {
            "--nav-y": "0px",
            "--nav-scale": 1,
            "--nav-width-scale": 1,
            "--nav-width": "100vw",
            "--nav-height": "86px",
            "--nav-radius": "0px",
            "--nav-blur": "blur(0px)",
            ...theme.expanded,
          };

      gsap.killTweensOf(nav);
      gsap.to(nav, {
        ...values,
        duration: immediate || reducedMotion ? 0 : 0.72,
        ease: "power4.out",
        overwrite: "auto",
      });
    };

    setNavigationStateRef.current = setNavigationState;
    setNavigationState(window.scrollY > SCROLL_THRESHOLD, true);

    const lenis = new Lenis({
      lerp: reducedMotion ? 1 : 0.1,
      smoothWheel: !reducedMotion,
      syncTouch: true,
      touchMultiplier: 1.2,
    });

    let ticking = false;
    const onScroll = ({ scroll }) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setNavigationState(scroll > SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    const raf = (time) => {
      lenis.raf(time);
      frameRef.current = requestAnimationFrame(raf);
    };

    lenis.on("scroll", onScroll);
    const onResize = () => setNavigationState(compactRef.current, true);
    window.addEventListener("resize", onResize);
    frameRef.current = requestAnimationFrame(raf);

    const onLenisPause = () => lenis.stop();
    const onLenisResume = () => lenis.start();
    window.addEventListener("app:lenis-pause", onLenisPause);
    window.addEventListener("app:lenis-resume", onLenisResume);

    return () => {
      cancelAnimationFrame(frameRef.current);
      lenis.off("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("app:lenis-pause", onLenisPause);
      window.removeEventListener("app:lenis-resume", onLenisResume);
      lenis.destroy();
      gsap.killTweensOf(nav);
    };
  }, []);

  useEffect(() => {
    isDarkRef.current = isDark;
    setNavigationStateRef.current?.(compactRef.current, true);
  }, [isDark]);

  useEffect(() => {
    const onThemeChange = (event) => setScrollDark(Boolean(event.detail?.dark));
    window.addEventListener("app:theme", onThemeChange);
    return () => window.removeEventListener("app:theme", onThemeChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className={`agency-navbar ${isCompact ? "is-compact" : ""} ${isDark ? "agency-navbar--dark" : ""}`}
      data-menu-open={menuOpen}
    >
      <nav className="agency-navbar__bar" aria-label="Primary navigation">
        <Link className="agency-navbar__logo" to="/" aria-label="Wolff Olins home">
          <img
            src={wolffOlinsLogo}
            alt="Wolff Olins"
            className="agency-navbar__logo-img"
            style={{ width: "auto", display: "block" }}
          />
        </Link>

        <div className="agency-navbar__links">
          {links.map((link) =>
            ROUTED_LINKS[link] ? (
              <Link key={link} to={ROUTED_LINKS[link]}>
                {link}
              </Link>
            ) : (
              <a key={link} href={`#${link.toLowerCase()}`}>
                {link}
              </a>
            )
          )}
        </div>

        <button
          type="button"
          className="agency-navbar__quote"
          onClick={() => setQuoteOpen(true)}
        >
          Get a Free Quote
        </button>

        <button className="agency-navbar__search" type="button" aria-label="Open search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.75" cy="10.75" r="5.25" />
            <path d="m15 15 4.3 4.3" />
          </svg>
        </button>

        <button
          className={`agency-navbar__toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true"><i /><i /></span>
          <span className="sr-only">Toggle menu</span>
        </button>
      </nav>

      <div id="mobile-navigation" className="agency-navbar__mobile-menu" aria-hidden={!menuOpen}>
        {links.map((link, index) =>
          ROUTED_LINKS[link] ? (
            <Link key={link} to={ROUTED_LINKS[link]} onClick={() => setMenuOpen(false)}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {link}
            </Link>
          ) : (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {link}
            </a>
          )
        )}
        <button
          type="button"
          className="agency-navbar__quote agency-navbar__quote--mobile"
          onClick={() => {
            setMenuOpen(false);
            setQuoteOpen(true);
          }}
        >
          Get a Free Quote
        </button>
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </header>
  );
}
