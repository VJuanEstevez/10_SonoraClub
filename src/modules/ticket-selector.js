export function initTicketSelector() {
  const form = document.querySelector("[data-ticket-form]");
  if (!form) return;

  const zoneInputs = [...form.querySelectorAll('input[name="zone"]')];
  const quantity = form.querySelector("[data-quantity]");
  const decrease = form.querySelector("[data-quantity-decrease]");
  const increase = form.querySelector("[data-quantity-increase]");
  const summaryZone = form.querySelector("[data-summary-zone]");
  const summaryQuantity = form.querySelector("[data-summary-quantity]");
  const totalOutput = form.querySelector("[data-total]");
  const status = form.querySelector("[data-ticket-status]");
  const mapZones = [...document.querySelectorAll(".venue-map__group")];
  const showTitle = document.querySelector("[data-ticket-show]");

  if (!zoneInputs.length || !quantity || !summaryZone || !totalOutput) return;

  const min = Number(quantity.min) || 1;
  const max = Number(quantity.max) || 6;
  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  const selectedZone = () =>
    zoneInputs.find((input) => input.checked) ?? zoneInputs[0];

  const hideStatus = () => {
    if (status) status.hidden = true;
  };

  const paint = (value) => {
    const zone = selectedZone();
    const price = Number(zone.dataset.zonePrice) || 0;
    const name = zone.dataset.zoneName || "";

    summaryZone.textContent = name;
    if (summaryQuantity) summaryQuantity.textContent = String(value);
    totalOutput.textContent = currency.format(price * value);

    if (decrease) decrease.disabled = value <= min;
    if (increase) increase.disabled = value >= max;

    for (const group of mapZones) {
      group.classList.toggle("is-active", group.dataset.zone === zone.value);
    }
  };

  const clamp = () => {
    const parsed = Number.parseInt(quantity.value, 10);
    const value = Math.min(max, Math.max(min, Number.isNaN(parsed) ? min : parsed));
    quantity.value = String(value);
    return value;
  };

  const update = () => paint(clamp());

  quantity.addEventListener("input", () => {
    const value = Number(quantity.value);
    if (Number.isFinite(value) && value >= min && value <= max) {
      paint(Math.trunc(value));
      hideStatus();
    }
  });
  quantity.addEventListener("change", update);
  quantity.addEventListener("blur", update);

  decrease?.addEventListener("click", () => {
    quantity.value = String(Math.max(min, Number(quantity.value) - 1));
    update();
    hideStatus();
  });

  increase?.addEventListener("click", () => {
    quantity.value = String(Math.min(max, Number(quantity.value) + 1));
    update();
    hideStatus();
  });

  for (const input of zoneInputs) {
    input.addEventListener("change", () => {
      update();
      hideStatus();
    });
  }

  for (const link of document.querySelectorAll("[data-show]")) {
    link.addEventListener("click", () => {
      if (showTitle) showTitle.textContent = link.dataset.show;
      hideStatus();
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = clamp();
    const zone = selectedZone();
    const total = (Number(zone.dataset.zonePrice) || 0) * value;
    const reference = `SC-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const tickets = value === 1 ? "entrada" : "entradas";

    update();
    if (!status) return;
    status.textContent = `Reserva simulada ${reference}: ${value} ${tickets} en ${zone.dataset.zoneName} · ${currency.format(total)}. Te llevaría al pago seguro.`;
    status.hidden = false;
  });

  update();
}
