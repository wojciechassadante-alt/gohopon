import Logo from './Logo.jsx'
import NavIcon from './NavIcon.jsx'
import { TABS, TRIP } from './appTicketData.js'

/**
 * Podgląd aplikacji pasażera (mockup telefonu) — używany w sekcji „Jak to działa”
 * obok odznak sklepów. Bogatszy mockup (`HeroPhone.jsx`) nie jest obecnie renderowany
 * — hero jest wyśrodkowane na filmie.
 * Dane ekranu (przejazd, dolna nawigacja) są wspólne — patrz `appTicketData.js`.
 */
const SIZES = {
  // Telefon w sekcji „Jak to działa” — obok odznak sklepów.
  compact: {
    frame: 'w-[10rem] rounded-[1.6rem] p-1.5',
    screen: 'rounded-[1.25rem]',
    notch: 'mb-1.5 h-0.5 w-8',
    bar: 'px-2 py-1.5',
    logo: 'h-2 w-auto',
    status: 'px-2 pt-2 pb-2',
    check: 'size-7',
    checkGap: 'mt-2',
    title: 'text-[9px]',
    sub: 'text-[7px]',
    card: 'mx-2 p-2',
    route: 'text-[7.5px]',
    cardHead: 'mt-2 pt-2',
    rows: 'space-y-1',
    meta: 'text-[7px]',
    button: 'mx-2 mb-1.5 py-1.5 text-[8px]',
    nav: 'px-1 pt-1.5 pb-1.5 text-[6px]',
    icon: 'size-2.5',
  },
}

export default function AppTicket({ variant = 'compact', className = '' }) {
  const s = SIZES[variant] ?? SIZES.compact

  return (
    <div
      className={`relative bg-[#0b1024] ring-1 ring-white/10 shadow-[0_34px_90px_-40px_rgba(0,0,0,0.85)] ${s.frame} ${className}`}
    >
      <span aria-hidden="true" className={`mx-auto block rounded-full bg-white/15 ${s.notch}`} />

      <div className={`overflow-hidden bg-white ${s.screen}`}>
        <div className={`flex items-center justify-between border-b border-line ${s.bar}`}>
          <Logo className={s.logo} />
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="size-1 rounded-full bg-ink/25" />
            <span className="size-1 rounded-full bg-ink/25" />
            <span className="size-1 rounded-full bg-ink/25" />
          </span>
        </div>

        <div className={`text-center ${s.status}`}>
          <span className={`mx-auto flex items-center justify-center rounded-full bg-emerald-500 text-white ${s.check}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-1/2" fill="none" stroke="currentColor" strokeWidth="2.8">
              <path d="M5.5 12.5 9.7 16.7 18.5 7.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className={`${s.checkGap} font-bold text-ink ${s.title}`}>Bilet aktywny</p>
          <p className={`mt-1 text-ink/50 ${s.sub}`}>Twój bilet jest gotowy do podróży.</p>
        </div>

        <div className={`rounded-xl border border-line bg-ink-50/70 ${s.card}`}>
          <p className={`font-semibold text-ink ${s.route}`}>
            Warszawa Centralna <span className="text-ink/35">→</span> Kraków Główny
          </p>
          <dl className={`${s.cardHead} ${s.rows} border-t border-dashed border-ink/15`}>
            {TRIP.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
                <dt className={`text-ink/45 ${s.meta}`}>{row.label}</dt>
                <dd className={`tnum font-mono font-semibold text-ink ${s.meta}`}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <span className={`block select-none rounded-lg bg-flame text-center font-semibold text-white ${s.button}`}>
          Pokaż bilet
        </span>

        <div className={`flex items-center justify-around border-t border-line ${s.nav}`}>
          {TABS.map((item) => (
            <span
              key={item.id}
              className={`flex flex-col items-center gap-1 font-medium ${item.active ? 'text-flame' : 'text-ink/35'}`}
            >
              <NavIcon name={item.id} className={s.icon} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
