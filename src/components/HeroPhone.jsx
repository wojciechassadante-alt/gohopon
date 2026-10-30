import Logo from './Logo.jsx'
import NavIcon from './NavIcon.jsx'
import { TABS, TRIP } from './appTicketData.js'

/**
 * Telefon z aplikacją pasażera w hero — mockup zbudowany w HTML/CSS.
 *
 * Wcześniej hero pokazywało zdjęcie `public/hero-phone.png`: miało jasne artefakty tła,
 * obcinało się o krawędź sekcji i pokazywało inny (ciemny) ekran niż mockup w sekcji
 * „Jak to działa”. Teraz hero renderuje ten sam, jasny ekran aplikacji co `AppTicket.jsx`,
 * ostry na każdej rozdzielczości, a telefon zawsze mieści się w sekcji hero.
 *
 * Uwaga przy edycji: mockup ma stałą szerokość (`w-64` = 256 px) i wszystkie wymiary
 * wewnątrz są dobrane do tej szerokości — zmieniając szerokość, przeskaluj też wnętrze.
 */

const ROUTE = {
  from: 'Warszawa Centralna',
  to: 'Kraków Główny',
  departure: '10:45',
  arrival: '14:22',
}

const TICKET_CODE = 'HOP-7F3K-9Q2B'

// Wagon i miejsce pokazujemy też na osobnej karcie — bierzemy je z danych przejazdu,
// żeby hero i sekcja „Jak to działa” nie rozjechały się po zmianie `TRIP`.
const TRIP_VALUES = Object.fromEntries(TRIP.map((row) => [row.label, row.value]))
const SEAT = `Wagon ${TRIP_VALUES.Wagon} · Miejsce ${TRIP_VALUES.Miejsce}`

const QR_SIZE = 21
const QR_FINDERS = [
  [0, 0],
  [QR_SIZE - 7, 0],
  [0, QR_SIZE - 7],
]

/**
 * Wzór przypominający kod QR (wizualizacja — nie do skanowania).
 * Trzy znaczniki pozycji plus pseudolosowe moduły z ustalonym ziarnem, więc układ jest zawsze ten sam.
 */
function buildQrModules() {
  const modules = []
  let seed = 0x2f6d1b

  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }

  const inFinder = (x, y) => (x < 8 && y < 8) || (x > QR_SIZE - 9 && y < 8) || (x < 8 && y > QR_SIZE - 9)

  for (let y = 0; y < QR_SIZE; y += 1) {
    for (let x = 0; x < QR_SIZE; x += 1) {
      if (inFinder(x, y)) continue
      if (random() > 0.52) modules.push([x, y])
    }
  }

  return modules
}

const QR_MODULES = buildQrModules()

function QrCode() {
  return (
    <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className="size-[4.25rem] rounded-[3px]">
      <rect width={QR_SIZE} height={QR_SIZE} className="fill-white" />
      {QR_MODULES.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className="fill-ink" />
      ))}
      {QR_FINDERS.map(([x, y]) => (
        <g key={`finder-${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" className="fill-ink" />
          <rect x={x + 1} y={y + 1} width="5" height="5" className="fill-white" />
          <rect x={x + 2} y={y + 2} width="3" height="3" className="fill-ink" />
        </g>
      ))}
    </svg>
  )
}

function StatusIcons() {
  return (
    <span className="flex items-center gap-1">
      <svg viewBox="0 0 18 12" className="h-2.5 w-4 fill-ink">
        <path d="M1 11h2.4V7.5H1V11Zm4.2 0h2.4V5.2H5.2V11Zm4.2 0h2.4V3H9.4v8Zm4.2 0H16V1h-2.4v10Z" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-ink">
        <path d="M8 11.5 5.8 9.3a3.1 3.1 0 0 1 4.4 0L8 11.5Zm-3.9-4L2.4 5.8a8 8 0 0 1 11.2 0L11.9 7.5a5.8 5.8 0 0 0-7.8 0Z" />
      </svg>
      <svg viewBox="0 0 26 12" className="h-2.5 w-6">
        <rect x="0.5" y="0.5" width="22" height="11" rx="3" className="fill-none stroke-ink/30" />
        <rect x="2" y="2" width="16" height="8" rx="2" className="fill-ink" />
        <path d="M24.4 4.2v3.6a2 2 0 0 0 0-3.6Z" className="fill-ink/30" />
      </svg>
    </span>
  )
}

export default function HeroPhone({ className = '' }) {
  return (
    <div
      role="img"
      aria-label={`Aplikacja HOPON — bilet aktywny ${ROUTE.from} – ${ROUTE.to}, ${SEAT}`}
      className={`relative w-64 ${className}`}
    >
      {/* Poświata od ekranu i cień „podłogi” — telefon nie wisi w powietrzu */}
      <div aria-hidden="true" className="absolute -inset-x-6 -top-8 bottom-6 rounded-[4rem] bg-flame/20 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-x-4 -bottom-5 h-12 rounded-full bg-ink-950/70 blur-2xl" />

      {/* Obudowa */}
      <div className="relative rounded-[2.6rem] bg-[#070c1e] p-2.5 shadow-[0_46px_90px_-34px_rgba(0,0,0,0.95)] ring-1 ring-white/15">
        {/* Przyciski boczne */}
        <span aria-hidden="true" className="absolute top-24 -left-[3px] h-7 w-[3px] rounded-l-full bg-white/25" />
        <span aria-hidden="true" className="absolute top-34 -left-[3px] h-12 w-[3px] rounded-l-full bg-white/25" />
        <span aria-hidden="true" className="absolute top-32 -right-[3px] h-14 w-[3px] rounded-r-full bg-white/25" />

        {/* Ekran */}
        <div className="relative overflow-hidden rounded-[2.1rem] bg-white">
          <div className="flex items-center justify-between px-4 pt-2.5 pb-0.5">
            <span className="tnum text-[10px] font-semibold text-ink">9:41</span>
            <StatusIcons />
          </div>

          <div className="flex items-center justify-between px-3 pt-0.5 pb-1.5">
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 fill-none stroke-ink stroke-[1.8]">
              <path d="M11.5 5 6.5 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[12px] font-semibold text-ink">Bilet aktywny</span>
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 fill-ink/55">
              <circle cx="4.5" cy="10" r="1.5" />
              <circle cx="10" cy="10" r="1.5" />
              <circle cx="15.5" cy="10" r="1.5" />
            </svg>
          </div>

          <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
            <span className="flex items-center gap-1.5">
              <Logo className="h-3 w-auto" />
              <span aria-hidden="true" className="h-2.5 w-px bg-line" />
              <span className="font-mono text-[7px] font-medium tracking-[0.2em] text-ink/45 uppercase">rail</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 ring-1 ring-emerald-500/25">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-semibold text-emerald-700">Aktywny</span>
            </span>
          </div>

          <div className="mx-3 mt-2.5 rounded-2xl border border-line bg-ink-50/70 p-2.5">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[9.5px] leading-snug font-semibold text-ink">{ROUTE.from}</span>
              <span className="text-right text-[9.5px] leading-snug font-semibold text-ink">{ROUTE.to}</span>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <span className="tnum text-[17px] leading-none font-bold text-ink">{ROUTE.departure}</span>
              <svg viewBox="0 0 20 12" aria-hidden="true" className="h-2.5 w-4 fill-none stroke-flame stroke-[1.8]">
                <path d="M1.5 6h15m-3.5-3.5L16.5 6 13 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="tnum text-[17px] leading-none font-bold text-ink">{ROUTE.arrival}</span>
            </div>

            <dl className="mt-2.5 space-y-1.5 border-t border-dashed border-ink/15 pt-2.5">
              {TRIP.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <dt className="text-[9px] text-ink/45">{row.label}</dt>
                  <dd className="tnum font-mono text-[9px] font-semibold text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-2.5 flex flex-col items-center border-t border-dashed border-ink/15 pt-2.5">
              <QrCode />
              <span className="mt-1.5 font-mono text-[8px] tracking-[0.18em] text-ink/45">{TICKET_CODE}</span>
            </div>
          </div>

          <div className="mx-3 mt-2 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-2.5 py-1.5 ring-1 ring-emerald-500/20">
            <span
              aria-hidden="true"
              className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5.5 12.5 9.7 16.7 18.5 7.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-[9.5px] font-semibold text-ink">Bilet zapisany w aplikacji</span>
              <span className="mt-0.5 block text-[8px] text-ink/55">Nie musisz nic pokazywać konduktorowi.</span>
            </span>
          </div>

          <div className="mx-3 mt-2 rounded-xl border border-line p-2">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink"
              >
                <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 3.5v6a2 2 0 0 0 2 2h3.5" strokeLinecap="round" />
                  <path d="M12.5 3.5v8" strokeLinecap="round" />
                  <path d="M4.5 16.5h11" strokeLinecap="round" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block text-[8px] text-ink/45">Twoje miejsce</span>
                <span className="block text-[10px] font-semibold text-ink">{SEAT}</span>
              </span>
            </div>
            <span className="mt-1.5 block rounded-lg border border-line py-1.5 text-center text-[8.5px] font-semibold text-ink">
              Zmień miejsce
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-around border-t border-line px-2 pt-1.5 pb-1">
            {TABS.map((tab) => (
              <span
                key={tab.id}
                className={`flex flex-col items-center gap-1 text-[8px] font-medium ${
                  tab.active ? 'text-flame' : 'text-ink/35'
                }`}
              >
                <NavIcon name={tab.id} className="size-3.5" />
                {tab.label}
              </span>
            ))}
          </div>
          <span aria-hidden="true" className="mx-auto mb-1.5 block h-1 w-16 rounded-full bg-ink/20" />
        </div>
      </div>
    </div>
  )
}
