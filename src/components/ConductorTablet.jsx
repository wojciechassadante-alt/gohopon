const ROWS = [1, 2, 3, 4, 5]
const COLS = ['A', 'B', 'C', 'D']

// Miejsce z wyjątkiem: brak ważnego biletu. Reszta miejsc obsadzona legalnie.
const EXCEPTIONS = { '3C': 'brak ważnego biletu' }

const FREE = new Set(['1A', '5D'])

const EXCEPTION_SEAT = Object.keys(EXCEPTIONS)[0]

function Seat({ seat, delay }) {
  const isException = Boolean(EXCEPTIONS[seat])
  const isFree = FREE.has(seat)

  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-seat tnum relative flex h-5 items-center justify-center rounded-[4px] font-mono text-[8px] font-semibold ${
        isException
          ? 'bg-flame text-white shadow-[0_0_0_1px_var(--color-flame-600)]'
          : isFree
            ? 'border border-dashed border-ink/20 bg-white text-ink/30'
            : 'bg-emerald-500 text-white'
      }`}
      title={isException ? `Miejsce ${seat} — ${EXCEPTIONS[seat]}` : `Miejsce ${seat}`}
    >
      {seat}
    </div>
  )
}

/**
 * Podgląd panelu konduktora na tablecie (pionowo). Pokazuje wagon w czasie rzeczywistym —
 * legalni pasażerowie na zielono, a obok mapa wyjątek: osoba bez biletu z przyciskiem zgłoszenia.
 */
export default function ConductorTablet({ className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[15rem] ${className}`}>
      <div className="rounded-[1.6rem] border border-ink/10 bg-ink-950 p-2.5 shadow-[0_26px_70px_-32px_rgba(0,11,106,0.55)]">
        <div className="overflow-hidden rounded-[1.15rem] bg-white">
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
            <span className="flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-1.5 animate-blink rounded-full bg-flame" />
              </span>
              <span className="font-mono text-[9px] font-medium tracking-[0.14em] text-ink/50 uppercase">
                Wagon 5
              </span>
            </span>
            <span className="tnum font-mono text-[8px] text-ink/40">0,4 s</span>
          </div>

          <div className="grid grid-cols-[1fr_5.5rem] gap-2 p-2.5">
            <div className="relative">
              {/* Subtelna linia skanowania — panel jest „żywy” */}
              <div
                aria-hidden="true"
                className="animate-sweep pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-flame/10 to-transparent"
              />

              <div className="relative space-y-1">
                {ROWS.map((row) => (
                  <div key={row} className="flex items-center gap-1">
                    <span className="tnum w-2.5 shrink-0 font-mono text-[7px] text-ink/30">{row}</span>
                    <div className="grid flex-1 grid-cols-4 gap-1">
                      {COLS.map((col, index) => (
                        <div key={col} className={index === 2 ? 'pl-1' : undefined}>
                          <Seat seat={`${row}${col}`} delay={row * 35 + index * 16} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-1.5 font-mono text-[6.5px] tracking-wide text-ink/40 uppercase">
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-[2px] bg-emerald-500" /> bilet ok
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-[2px] bg-flame" /> wyjątek
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-[2px] border border-dashed border-ink/25" /> wolne
                </span>
              </div>
            </div>

            <div className="h-fit rounded-xl border border-flame/35 bg-flame-50/70 p-2">
              <p className="text-[8px] leading-tight font-bold text-flame-700">Osoba bez biletu</p>
              <p className="tnum mt-1 font-mono text-[7.5px] text-ink/55">Miejsce {EXCEPTION_SEAT}</p>
              <span className="mt-2 block select-none rounded-md bg-flame px-2 py-1.5 text-center text-[8px] font-semibold text-white">
                Przyjmij
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
