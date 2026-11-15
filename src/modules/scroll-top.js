export function initScrollTop() {
  const button = document.querySelector("[data-to-top]");
  if (!button) return;

  let frame = 0;

  const update = () => {
    const threshold = window.innerHeight * 0.9;
    button.hidden = window.scrollY < threshold;
    frame = 0;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    },
    { passive: true },
  );

  update();
}
