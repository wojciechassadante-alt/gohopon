import { useState } from 'react'
import { CONTACT_EMAIL, WAITLIST_ENDPOINT } from '../links.js'

const MAIL_SUBJECT = 'HOPON Rail — zapisy na pilotaż'

const MESSAGES = {
  idle: 'Zapisy na pilotaż — odezwiemy się raz, gdy ruszy pierwszy skład.',
  sending: 'Zapisujemy…',
  sent: 'Dzięki! Jesteś na liście — napiszemy, gdy ruszy pilotaż.',
  mailto: 'Otworzyliśmy Twój program pocztowy — wyślij gotową wiadomość.',
  error: `Nie udało się zapisać. Napisz na ${CONTACT_EMAIL}.`,
}

/**
 * Formularz zapisów w hero („dołącz do listy”) w formie pigułki: pole e-mail + przycisk.
 *
 * Dopóki `WAITLIST_ENDPOINT` w `src/links.js` jest pusty, wysłanie otwiera program pocztowy
 * z gotową wiadomością na `CONTACT_EMAIL` (strona jest statyczna, nie ma backendu). Po
 * ustawieniu endpointu formularz wysyła POST JSON `{ email, source }` i pokazuje stan
 * „wysłano” bez opuszczania strony.
 */
export default function WaitlistForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()

    const email = new FormData(event.currentTarget).get('email')
    if (!email) return

    if (!WAITLIST_ENDPOINT) {
      const body = ['Adres e-mail: ' + email, '', 'Zapisz mnie na listę startową HOPON Rail.'].join('\n')
      const query = `subject=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(body)}`
      window.location.href = `mailto:${CONTACT_EMAIL}?${query}`
      setStatus('mailto')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'hero' }),
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-full border border-white/70 bg-white/65 p-1.5 pl-5 shadow-[0_20px_45px_-28px_rgba(0,11,106,0.6)] backdrop-blur-md"
      >
        <label htmlFor="hero-email" className="sr-only">
          Adres e-mail
        </label>
        <input
          id="hero-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Twój adres e-mail"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-ink placeholder:text-ink/55"
        />
        <button
          type="submit"
          disabled={sending}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-flame-600 disabled:opacity-70"
        >
          {sending ? 'Zapisujemy…' : 'Zapisz się'}
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>

      <p aria-live="polite" className="mt-4 text-sm text-ink/70">
        {MESSAGES[status]}
      </p>
    </div>
  )
}
