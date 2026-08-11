import { useEffect } from "react";

/**
 * Injects a <script type="application/ld+json"> block for structured data
 * (schema.org). Removes it on unmount so pages don't stack duplicate blocks.
 */
function JsonLd({ id, data }) {
  useEffect(() => {
    if (!data) return undefined;

    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      script?.remove();
    };
  }, [id, data]);

  return null;
}

export default JsonLd;
