const pad = (value) => String(value).padStart(2, "0");

export function initGallery() {
  const dialog = document.querySelector("#lightbox");
  const triggers = [...document.querySelectorAll("[data-lightbox]")];
  if (!dialog || !triggers.length || typeof dialog.showModal !== "function") return;

  const image = dialog.querySelector("[data-lightbox-image]");
  const title = dialog.querySelector("[data-lightbox-title]");
  const counter = dialog.querySelector("[data-lightbox-counter]");
  const closeButton = dialog.querySelector("[data-lightbox-close]");
  const previousButton = dialog.querySelector("[data-lightbox-prev]");
  const nextButton = dialog.querySelector("[data-lightbox-next]");
  if (!image) return;

  let current = 0;

  const show = (index) => {
    current = (index + triggers.length) % triggers.length;
    const trigger = triggers[current];
    const thumbnail = trigger.querySelector("img");

    image.src = trigger.dataset.full;
    image.alt = thumbnail?.alt ?? "";
    if (title) title.textContent = trigger.dataset.caption ?? "";
    if (counter) {
      counter.textContent = `${pad(current + 1)} / ${pad(triggers.length)}`;
    }
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      show(index);
      if (!dialog.open) dialog.showModal();
    });
  });

  closeButton?.addEventListener("click", () => dialog.close());
  previousButton?.addEventListener("click", () => show(current - 1));
  nextButton?.addEventListener("click", () => show(current + 1));

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
