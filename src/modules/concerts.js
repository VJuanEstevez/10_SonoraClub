const arrowIcon = `
  <svg class="icon" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 13 13 3M6 3h7v7" />
  </svg>
`;

const concerts = [
  {
    date: "2026-12-12",
    day: "12",
    month: "DIC",
    year: "2026",
    artist: "Vértigo",
    show: "Ruido blanco",
    genre: "Rock alternativo",
    time: "21:00",
    doors: "20:00",
    price: 38,
    status: "last",
  },
  {
    date: "2027-01-23",
    day: "23",
    month: "ENE",
    year: "2027",
    artist: "Selva Eléctrica",
    show: "Neón",
    genre: "Electrónica",
    time: "22:00",
    doors: "21:00",
    price: 26,
    status: "open",
  },
  {
    date: "2027-02-13",
    day: "13",
    month: "FEB",
    year: "2027",
    artist: "Amapola Negra",
    show: "Flor de humo",
    genre: "Indie pop",
    time: "21:00",
    doors: "20:00",
    price: 32,
    status: "open",
  },
  {
    date: "2027-03-06",
    day: "06",
    month: "MAR",
    year: "2027",
    artist: "Los Cuerpos",
    show: "Anatomía del ruido",
    genre: "Post-punk",
    time: "21:30",
    doors: "20:30",
    price: 30,
    status: "open",
  },
  {
    date: "2027-03-27",
    day: "27",
    month: "MAR",
    year: "2027",
    artist: "DJ Nébula",
    show: "Sesión continua",
    genre: "Club",
    time: "23:00",
    doors: "22:00",
    price: 22,
    status: "sold",
  },
  {
    date: "2027-04-17",
    day: "17",
    month: "ABR",
    year: "2027",
    artist: "Coro Salvaje",
    show: "Voces de barrio",
    genre: "Soul",
    time: "20:30",
    doors: "19:30",
    price: 34,
    status: "open",
  },
];

const statuses = {
  open: { modifier: "pill--open", label: "Disponible" },
  last: { modifier: "pill--last", label: "Últimas" },
  sold: { modifier: "pill--sold", label: "Agotado" },
};

const buildRow = (concert) => {
  const status = statuses[concert.status] ?? statuses.open;
  const action =
    concert.status === "sold"
      ? `<a class="link-arrow" href="#newsletter">Lista de espera ${arrowIcon}</a>`
      : `<a class="link-arrow" href="#entradas" data-show="${concert.artist} · ${concert.day} ${concert.month.toLowerCase()}">Entradas ${arrowIcon}</a>`;

  return `
    <tr>
      <td class="cell-date">
        <time class="concert-date" datetime="${concert.date}">
          ${concert.day} ${concert.month}
          <span>${concert.year}</span>
        </time>
      </td>
      <td class="cell-artist">
        <span class="concert-artist">${concert.artist}</span>
        <span class="concert-title">${concert.show}</span>
      </td>
      <td class="cell-genre"><span class="concert-genre">${concert.genre}</span></td>
      <td class="cell-time">
        <span class="concert-time">
          ${concert.time}
          <span>Puertas ${concert.doors}</span>
        </span>
      </td>
      <td class="cell-price"><span class="concert-price">${concert.price} €</span></td>
      <td class="cell-status">
        <span class="pill ${status.modifier}">${status.label}</span>
      </td>
      <td class="cell-action">${action}</td>
    </tr>
  `;
};

export function initConcerts() {
  const list = document.querySelector("[data-concert-list]");
  if (!list) return;

  list.innerHTML = concerts.map(buildRow).join("");
}
