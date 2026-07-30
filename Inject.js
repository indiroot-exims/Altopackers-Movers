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

function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav__link");
  if (!navLinks.length) return;

  // Get current page filename, default to index.html for root "/"
  let path = window.location.pathname;
  let currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    link.classList.remove("nav__link--active");
    if (linkPage === currentPage) {
      link.classList.add("nav__link--active");
    }
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
  if (needsHeader) tasks.push(loadHTML("#header", "Header.html"));
  if (needsFooter) tasks.push(loadHTML("#footer", "Footer.html"));

  Promise.all(tasks).then(() => {
    // Always run this, whether the header was already inlined at build time
    // or just fetched via the fallback above — otherwise the "active" class
    // baked into Header.html (e.g. on Home) never gets corrected.
    setActiveNavLink();
    buildBreadcrumb();
  });
});
