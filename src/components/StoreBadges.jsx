import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../links.js'

const BADGES = [
  { id: 'app-store', caption: 'Pobierz w', name: 'App Store', href: APP_STORE_URL, icon: 'apple' },
  { id: 'google-play', caption: 'Pobierz z', name: 'Google Play', href: GOOGLE_PLAY_URL, icon: 'play' },
]

const LAYOUTS = {
  row: 'flex-wrap items-center justify-center',
  column: 'flex-col items-stretch',
}

function BadgeIcon({ name }) {
  if (name === 'apple') {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 256 283" className="h-4 w-auto" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M119.553141,134.916362 L1.0599006,259.060547 C3.75619448,268.616998 10.7182836,276.3906 19.9208658,280.119977 C29.1234481,283.849353 39.5331235,283.115716 48.121672,278.132484 L181.448642,202.197919 L119.553141,134.916362 Z"
      />
      <path
        fill="#FBBC04"
        d="M239.370822,113.813616 L181.71353,80.7909097 L116.815965,137.741834 L181.978418,202.021326 L239.19423,169.351804 C249.525723,163.942452 256,153.24465 256,141.58271 C256,129.92077 249.525723,119.222968 239.19423,113.813616 L239.370822,113.813616 Z"
      />
      <path
        fill="#4285F4"
        d="M1.0599006,23.4868015 C0.343633396,26.134699 -0.0127538816,28.8670014 -9.94374397e-15,31.6100341 L-9.94374397e-15,250.937314 C0.00751268399,253.679042 0.363556675,256.408712 1.0599006,259.060547 L123.614758,138.095018 L1.0599006,23.4868015 Z"
      />
      <path
        fill="#34A853"
        d="M120.436101,141.273674 L181.71353,80.7909097 L48.5631521,4.50316009 C43.5539929,1.56944036 37.8568091,0.0156629668 32.0517989,0 C17.6444261,-0.0284873284 4.97836875,9.53420553 1.0599006,23.3985055 L120.436101,141.273674 Z"
      />
    </svg>
  )
}

/**
 * Odznaki sklepów. Zastępcze (inline SVG) — podmień na oficjalne grafiki, jeśli będą wymagane.
 * `layout="column"` — odznaki jedna pod drugą (układ w sekcji „Jak to działa”).
 */
export default function StoreBadges({ className = '', layout = 'row' }) {
  return (
    <div className={`flex gap-2.5 ${LAYOUTS[layout] ?? LAYOUTS.row} ${className}`}>
      {BADGES.map((badge) => (
        <a
          key={badge.id}
          href={badge.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 rounded-xl bg-ink px-3.5 py-2 text-white ring-1 ring-white/10 transition-colors hover:bg-ink-800"
        >
          <span className="flex w-4 shrink-0 items-center justify-center">
            <BadgeIcon name={badge.icon} />
          </span>
          <span className="text-left leading-none">
            <span className="block font-mono text-[9px] tracking-[0.14em] text-white/55 uppercase">
              {badge.caption}
            </span>
            <span className="mt-1 block text-xs font-semibold">{badge.name}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
