export function initNewsletter() {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) return;

  const email = form.querySelector("#newsletter-email");
  const consent = form.querySelector("#newsletter-consent");
  const emailError = form.querySelector('[data-error-for="email"]');
  const consentError = form.querySelector('[data-error-for="consent"]');
  const status = form.querySelector("[data-newsletter-status]");
  if (!email || !consent || !emailError || !consentError) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const setError = (field, element, message) => {
    element.textContent = message;
    element.hidden = !message;
    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  };

  const validateEmail = () => {
    const value = email.value.trim();
    if (!value) return "Escribe tu correo electrónico.";
    if (!emailPattern.test(value)) {
      return "Ese correo no parece válido. Revisa el dominio.";
    }
    return "";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailMessage = validateEmail();
    const consentMessage = consent.checked
      ? ""
      : "Necesitamos tu consentimiento para enviarte novedades.";

    setError(email, emailError, emailMessage);
    setError(consent, consentError, consentMessage);
    if (status) status.hidden = true;

    if (emailMessage) {
      email.focus();
      return;
    }

    if (consentMessage) {
      consent.focus();
      return;
    }

    if (status) {
      status.textContent = `Hecho. Te avisaremos en ${email.value.trim()} antes de que salgan las próximas entradas.`;
      status.hidden = false;
    }

    form.reset();
    setError(email, emailError, "");
    setError(consent, consentError, "");
  });

  email.addEventListener("input", () => {
    if (!emailError.hidden) setError(email, emailError, "");
  });

  consent.addEventListener("change", () => {
    if (!consentError.hidden) setError(consent, consentError, "");
  });
}
