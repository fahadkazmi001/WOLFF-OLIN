import { useEffect } from "react";

const SITE_NAME = "Wolff Olins";
const SITE_URL = "https://wolffolin.com";
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo/wolff-olins-logo.png`;

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets per-page title, meta description/keywords, canonical link, and
 * Open Graph / Twitter card tags. No extra dependency — just direct
 * document.head writes on route change.
 */
function SEO({ title, description, keywords, path = "/", image = DEFAULT_IMAGE }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setLink("canonical", url);

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
  }, [title, description, keywords, path, image]);

  return null;
}

export default SEO;
