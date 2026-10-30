/**
 * Ikony dolnej nawigacji aplikacji pasażera — wspólne dla mockupów telefonu:
 * `AppTicket.jsx` (sekcja „Jak to działa”) i `HeroPhone.jsx`.
 */
export default function NavIcon({ name, className }) {
  if (name === 'start') {
    return (
      <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3 9.5 10 3l7 6.5V17H3V9.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'bilety') {
    return (
      <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path
          d="M3 6.6A1.6 1.6 0 0 1 4.6 5h10.8A1.6 1.6 0 0 1 17 6.6v1.7a1.7 1.7 0 0 0 0 3.4v1.7A1.6 1.6 0 0 1 15.4 15H4.6A1.6 1.6 0 0 1 3 13.4v-1.7a1.7 1.7 0 0 0 0-3.4V6.6Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="10" cy="7" r="3" />
      <path d="M4.6 16.2c.9-2.6 3-4 5.4-4s4.5 1.4 5.4 4" strokeLinecap="round" />
    </svg>
  )
}
