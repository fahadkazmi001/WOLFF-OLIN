import { useEffect, useState } from "react";

const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "m4v"];
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "avif"];
const CANDIDATE_EXTENSIONS = [...VIDEO_EXTENSIONS, ...IMAGE_EXTENSIONS];

/**
 * Renders whatever file actually exists at `${base}.<ext>`, trying each
 * candidate extension in turn — the caller doesn't need to know or hardcode
 * the real file type up front.
 */
function Media({ base, alt = "", className }) {
  const [resolved, setResolved] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const ext of CANDIDATE_EXTENSIONS) {
        const src = `${base}.${ext}`;
        const isVideoExt = VIDEO_EXTENSIONS.includes(ext);
        try {
          const response = await fetch(src, { method: "HEAD" });
          // Vite's dev server (and some static hosts) respond 200 with the
          // SPA's index.html for unmatched paths instead of a real 404, so
          // `response.ok` alone can't tell a real asset from a missing one —
          // check the content type actually matches what we asked for.
          const contentType = response.headers.get("content-type") || "";
          const matchesType = isVideoExt
            ? contentType.startsWith("video/")
            : contentType.startsWith("image/");

          if (response.ok && matchesType) {
            if (!cancelled) {
              setResolved({ src, type: isVideoExt ? "video" : "image" });
            }
            return;
          }
        } catch {
          // try the next extension
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [base]);

  if (!resolved) return <div className={className} aria-hidden="true" />;

  if (resolved.type === "video") {
    return (
      <video src={resolved.src} className={className} autoPlay muted loop playsInline />
    );
  }

  return <img src={resolved.src} alt={alt} className={className} loading="lazy" />;
}

export default Media;
