/**
 * Adresy do podmiany przy wdrożeniu.
 *
 * Dopóki aplikacja nie jest w sklepach, CTA „Pobierz aplikację” prowadzi do sekcji
 * z odznakami sklepów („Jak to działa” → kolumna „Dla pasażera”, id="dla-pasazera").
 */
export const APP_DOWNLOAD_URL = '#dla-pasazera'

export const APP_STORE_URL = 'https://www.apple.com/app-store/'
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps'

// Kontakt — używany w sekcji „kontakt” (`CtaBand.jsx`) i w formularzu zapisów w hero.
export const CONTACT_EMAIL = 'rail@gohopon.pl'

/**
 * Endpoint zapisów z hero (POST JSON: { email, source }).
 *
 * Pusty string = brak backendu: formularz (`WaitlistForm.jsx`) otwiera program pocztowy
 * z gotową wiadomością na `CONTACT_EMAIL`. Po wdrożeniu podmień na własny adres
 * (np. Formspree albo własne API) — formularz sam przełączy się na `fetch`.
 */
export const WAITLIST_ENDPOINT = ''
