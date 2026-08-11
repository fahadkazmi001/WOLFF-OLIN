import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import heroData from "../../data/heroData";
import "./Hero.css";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);
  const intervalRef = useRef(null);
  const dragStartRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const directionRef = useRef("next");

  const nextSlide = () => setCurrentSlide((previous) =>
    previous === heroData.length - 1 ? 0 : previous + 1
  );

  const prevSlide = () => setCurrentSlide((previous) =>
    previous === 0 ? heroData.length - 1 : previous - 1
  );

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 7000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 7000);
    return () => clearInterval(intervalRef.current);
  }, [currentSlide]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleParallax = (event) => {
      gsap.to(mediaRef.current, {
        x: (event.clientX / window.innerWidth - 0.5) * 30,
        y: (event.clientY / window.innerHeight - 0.5) * 30,
        duration: 1.5,
        ease: "power3.out",
      });
    };
    hero.addEventListener("mousemove", handleParallax);
    return () => hero.removeEventListener("mousemove", handleParallax);
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline();
    const mediaElement = mediaRef.current?.querySelector(
      ".hero-image, .hero-video"
    );

    timeline.fromTo(
      mediaElement,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power4.out" }
    );
    timeline.fromTo(".hero-category", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.8");
    timeline.fromTo(".hero-title", { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5");
    gsap.fromTo(progressRef.current, { width: "0%" }, { width: "100%", duration: 7, ease: "none" });
  }, [currentSlide]);

  const updateCursor = (event) => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;
    if (!hero || !cursor) return;
    const bounds = hero.getBoundingClientRect();
    const isNext = event.clientX > bounds.left + bounds.width / 2;
    directionRef.current = isNext ? "next" : "prev";
    cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursor.classList.toggle("is-next", isNext);
    cursor.classList.toggle("is-prev", !isNext);
  };

  const isNavigationButton = (target) => target.closest(".hero-arrow");

  const handlePointerEnter = (event) => {
    if (event.pointerType === "touch") return;
    updateCursor(event);
    cursorRef.current?.classList.add("is-visible");
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "touch") updateCursor(event);
    if (isDraggingRef.current) lastPointerXRef.current = event.clientX;
  };

  const handlePointerDown = (event) => {
    if (isNavigationButton(event.target)) return;
    isDraggingRef.current = true;
    dragStartRef.current = event.clientX;
    lastPointerXRef.current = event.clientX;
    heroRef.current?.setPointerCapture(event.pointerId);
    cursorRef.current?.classList.add("is-dragging");
  };

  const handlePointerUp = (event) => {
    if (!isDraggingRef.current) return;
    const movement = lastPointerXRef.current - dragStartRef.current;
    isDraggingRef.current = false;
    cursorRef.current?.classList.remove("is-dragging");
    if (movement <= -45) nextSlide();
    else if (movement >= 45) prevSlide();
    else if (directionRef.current === "next") nextSlide();
    else prevSlide();
    if (heroRef.current?.hasPointerCapture(event.pointerId)) heroRef.current.releasePointerCapture(event.pointerId);
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    cursorRef.current?.classList.remove("is-dragging");
  };

  const slide = heroData[currentSlide];

  return (
    <section
      className="hero"
      ref={heroRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => !isDraggingRef.current && cursorRef.current?.classList.remove("is-visible")}
      onPointerCancel={handlePointerCancel}
    >
      <div className="hero-media" ref={mediaRef}>
        {slide.type === "video" ? (
          <video key={slide.id} src={slide.media} autoPlay muted loop playsInline preload="auto" className="hero-video" />
        ) : (
          <img key={slide.id} src={slide.media} alt={slide.title} className="hero-image" loading="eager" />
        )}
      </div>
      <div className="hero-overlay" />
      <div className="hero-gradient" />

      <div className="hero-content">
        <span className="hero-category">{slide.category}</span>
        <h1 className="hero-title">{slide.title}</h1>
      </div>

      <div className="hero-navigation">
        <button className="hero-arrow hero-arrow--prev" onClick={prevSlide} aria-label="Previous Slide"><HiOutlineArrowLongLeft /></button>
        <button className="hero-arrow hero-arrow--next" onClick={nextSlide} aria-label="Next Slide"><HiOutlineArrowLongRight /></button>
      </div>

      <div className="hero-progress-wrapper"><div className="hero-progress" ref={progressRef} /></div>
      <div className="hero-counter">
        <span>{String(currentSlide + 1).padStart(2, "0")}</span>
        <span className="divider">/</span>
        <span>{String(heroData.length).padStart(2, "0")}</span>
      </div>
      <div className="scroll-indicator"><span>Scroll</span><div className="scroll-line" /></div>

      <div className="hero-cursor is-next" ref={cursorRef} aria-hidden="true">
        <HiOutlineArrowLongLeft className="hero-cursor__left" />
        <HiOutlineArrowLongRight className="hero-cursor__right" />
      </div>
    </section>
  );
}
