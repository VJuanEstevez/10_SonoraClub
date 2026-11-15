import { initNav } from "./modules/nav.js";
import { initCountdown } from "./modules/countdown.js";
import { initConcerts } from "./modules/concerts.js";
import { initTicketSelector } from "./modules/ticket-selector.js";
import { initGallery } from "./modules/gallery.js";
import { initNewsletter } from "./modules/newsletter.js";
import { initScrollTop } from "./modules/scroll-top.js";
import { initReveal } from "./modules/reveal.js";

const modules = [
  initNav,
  initCountdown,
  initConcerts,
  initTicketSelector,
  initGallery,
  initNewsletter,
  initScrollTop,
  initReveal,
];

for (const init of modules) {
  init();
}
