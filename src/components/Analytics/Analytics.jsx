import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sends a Google Analytics page_view on every route change. gtag's own
 * automatic page_view is disabled in index.html (send_page_view: false)
 * because this is a client-side-routed SPA — without this, only the very
 * first page load would ever get tracked.
 */
function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}

export default Analytics;
