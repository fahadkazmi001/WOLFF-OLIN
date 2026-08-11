import { useState, useRef, useEffect } from "react";
import showreelVideo from "../../assets/videos/showreel.mp4";

// SVG string banate hain aur encodeURIComponent se safely encode karte hain
const makeCursorSvg = (label, width) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="50" viewBox="0 0 ${width} 50">
    <text x="0" y="35" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="600" fill="#FACC15">${label}</text>
  </svg>
`;

const playCursor = `url('data:image/svg+xml;utf8,${encodeURIComponent(makeCursorSvg("Play", 100))}') 20 20, pointer`;
const pauseCursor = `url('data:image/svg+xml;utf8,${encodeURIComponent(makeCursorSvg("Pause", 130))}') 20 20, pointer`;

function Showreel({ leftLabel = "Wolff Olins", rightLabel = "Showreel" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.muted = false;
    setIsMuted(false);
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full flex items-center justify-center">
      <div
        className="relative w-[85%] h-[85vh] overflow-hidden"
        style={{ cursor: isPlaying ? pauseCursor : playCursor }}
      >
        <video
          ref={videoRef}
          src={showreelVideo}
          className="absolute inset-0 w-full h-full object-cover"
          muted={isMuted}
          playsInline
          loop
          onClick={isPlaying ? handlePause : handlePlay}
        />

        {!isPlaying && (
          <div
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-between px-10 bg-black/10"
          >
            <span className="text-white text-lg font-medium">{leftLabel}</span>
            <span className="text-white text-lg font-medium">{rightLabel}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Showreel;