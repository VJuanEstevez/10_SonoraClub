export function initReveal() {
  const elements = [...document.querySelectorAll("[data-reveal]")];
  if (!elements.length || !("IntersectionObserver" in window)) return;

  const root = document.documentElement;
  root.classList.add("reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );

  for (const element of elements) observer.observe(element);
}
