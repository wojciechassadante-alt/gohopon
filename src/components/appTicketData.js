/**
 * Teksty i dane mockupów aplikacji pasażera.
 *
 * Trzymane osobno od komponentów, bo korzystają z nich dwa mockupy telefonu: ekran w sekcji
 * „Jak to działa” (`AppTicket.jsx`) i większy `HeroPhone.jsx` (nieużywany w obecnym hero).
 * Zmiana w tym pliku aktualizuje oba.
 */

/** Dane przejazdu pokazywane na bilecie. */
export const TRIP = [
  { label: 'Pociąg', value: 'IC 8310' },
  { label: 'Wagon', value: '7' },
  { label: 'Miejsce', value: '42' },
]

/** Dolna nawigacja aplikacji — `active` podświetla bieżącą zakładkę. */
export const TABS = [
  { id: 'start', label: 'Start', active: false },
  { id: 'bilety', label: 'Bilety', active: true },
  { id: 'profil', label: 'Profil', active: false },
]
