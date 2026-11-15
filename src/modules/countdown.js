const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const pad = (value) => String(value).padStart(2, "0");

export function initCountdown() {
  const root = document.querySelector("[data-countdown-target]");
  if (!root) return;

  const target = new Date(root.dataset.countdownTarget);
  if (Number.isNaN(target.getTime())) return;

  const fields = {
    days: root.querySelector('[data-countdown="days"]'),
    hours: root.querySelector('[data-countdown="hours"]'),
    minutes: root.querySelector('[data-countdown="minutes"]'),
    seconds: root.querySelector('[data-countdown="seconds"]'),
  };
  const label = root.querySelector(".countdown__label");
  const list = root.querySelector(".countdown__list");
  const message = root.querySelector("[data-countdown-message]");
  let timerId;

  const render = () => {
    const remaining = target.getTime() - Date.now();

    if (remaining <= 0) {
      window.clearInterval(timerId);
      label?.setAttribute("hidden", "");
      list?.setAttribute("hidden", "");
      if (message) {
        message.hidden = false;
        message.textContent =
          "El concierto ya ha empezado. Consulta la próxima fecha en cartelera.";
      }
      return;
    }

    const days = Math.floor(remaining / DAY);
    const hours = Math.floor((remaining % DAY) / HOUR);
    const minutes = Math.floor((remaining % HOUR) / MINUTE);
    const seconds = Math.floor((remaining % MINUTE) / SECOND);

    if (fields.days) fields.days.textContent = pad(days);
    if (fields.hours) fields.hours.textContent = pad(hours);
    if (fields.minutes) fields.minutes.textContent = pad(minutes);
    if (fields.seconds) fields.seconds.textContent = pad(seconds);
  };

  render();
  timerId = window.setInterval(render, SECOND);
}
