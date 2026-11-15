export function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = header?.querySelector(".nav-toggle");
  const nav = header?.querySelector("#site-nav");
  if (!header || !toggle || !nav) return;

  const mobile = window.matchMedia("(max-width: 56rem)");
  const isOpen = () => nav.classList.contains("is-open");

  const setOpen = (open) => {
    const next = Boolean(open) && mobile.matches;
    nav.classList.toggle("is-open", next);
    toggle.setAttribute("aria-expanded", String(next));
  };

  toggle.addEventListener("click", () => {
    setOpen(!isOpen());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (isOpen() && !header.contains(event.target)) {
      setOpen(false);
    }
  });

  mobile.addEventListener("change", () => setOpen(false));

  header.addEventListener("click", (event) => {
    if (isOpen() && event.target.closest("a")) setOpen(false);
  });

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const current = `#${entry.target.id}`;

        for (const link of links) {
          if (link.getAttribute("href") === current) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );

  for (const section of sections) spy.observe(section);
}
