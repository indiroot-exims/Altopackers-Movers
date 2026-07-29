function loadHTML(selector, file) {
  return fetch(file)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.text();
    })
    .then(data => {
      const el = document.querySelector(selector);
      if (el) {
        el.innerHTML = data;
      }
    })
    .catch(err => {
      console.error(`Failed to load ${file}:`, err);
    });
}

function buildBreadcrumb() {
  const ol = document.getElementById("breadcrumb");
  if (!ol) return;
  const breadcrumbNav = ol.closest('nav[aria-label="breadcrumb"]');

  // Normalise path, ensure root stays as "/"
  let path = window.location.pathname || "/";
  path = path === "/" ? "/" : path.replace(/\/+$/, "");
  const segments = path.split("/").filter(Boolean);
  const fileName = segments.length > 0 ? segments[segments.length - 1] : "";
  const fileNameLower = fileName.toLowerCase();

 

  // Fallback
  if (segments.length > 0) {
    const last = fileName.replace(".html", "");
    const lastLabel = last.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    addItem({ label: lastLabel, active: true });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.querySelector("#header");
  const footerEl = document.querySelector("#footer");

  // Header/footer are now inlined into every page at build time (see build.js),
  // so #header and #footer should already be populated when this script runs.
  // The fetch() calls below only fire as a fallback — e.g. if you open a page
  // directly without running the build step during local development.
  const needsHeader = headerEl && headerEl.innerHTML.trim() === "";
  const needsFooter = footerEl && footerEl.innerHTML.trim() === "";

  const tasks = [];
  if (needsHeader) tasks.push(loadHTML("#header", "/Header.html"));
  if (needsFooter) tasks.push(loadHTML("#footer", "/Footer.html"));

  Promise.all(tasks).then(() => {
    buildBreadcrumb();
  });
});
