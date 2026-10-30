const ROWS = [1, 2, 3, 4, 5, 6, 7, 8]
const COLS = ['A', 'B', 'C', 'D']

// Miejsca z wyjątkiem: brak ważnego biletu albo bilet na inny termin/przejazd.
const EXCEPTIONS = {
  '4C': 'brak biletu',
  '6A': 'bilet na inny termin',
  '7D': 'brak biletu',
}

const FREE = new Set(['2D', '5B', '8A'])

const TOTAL = ROWS.length * COLS.length
const FREE_COUNT = FREE.size
const EXCEPTION_COUNT = Object.keys(EXCEPTIONS).length
const OK_COUNT = TOTAL - FREE_COUNT - EXCEPTION_COUNT

function Seat({ seat, delay }) {
  const isException = Boolean(EXCEPTIONS[seat])
  const isFree = FREE.has(seat)

  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-seat tnum relative flex h-9 items-center justify-center rounded-md font-mono text-[11px] font-semibold ${
        isException
          ? 'bg-flame text-white shadow-[0_0_0_1px_var(--color-flame-600)]'
          : isFree
            ? 'border border-dashed border-ink/20 bg-white text-ink/30'
            : 'bg-ink-100 text-ink/70'
      }`}
      title={isException ? `Miejsce ${seat} — ${EXCEPTIONS[seat]}` : `Miejsce ${seat}`}
    >
      {seat}
    </div>
  )
}

/**
 * Podglad panelu konduktora. Pokazuje wyłącznie wyjątki — reszta miejsc jest tłem.
 */
export default function ConductorPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_70px_-30px_rgba(0,11,106,0.35)]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 animate-blink rounded-full bg-flame" />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-ink/50 uppercase">
            Panel konduktora
          </span>
        </div>
        <span className="tnum rounded-md bg-ink-50 px-2 py-1 font-mono text-[11px] font-medium text-ink/60">
          wagon 4 · miejsca 1–32
        </span>
      </div>

      <div className="relative px-5 py-5">
        {/* Subtelna linia skanowania — panel jest "żywy" */}
        <div
          aria-hidden="true"
          className="animate-sweep pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-flame/12 to-transparent"
        />

        <div className="relative space-y-2">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="tnum w-5 shrink-0 font-mono text-[10px] text-ink/30">{row}</span>
              <div className="grid flex-1 grid-cols-4 gap-2">
                {COLS.map((col, index) => (
                  <div key={col} className={index === 2 ? 'pl-3' : undefined}>
                    <Seat seat={`${row}${col}`} delay={row * 40 + index * 18} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-[10px] tracking-wide text-ink/45 uppercase">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-[3px] bg-ink-100" /> bilet ok
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-[3px] bg-flame" /> wyjątek
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-[3px] border border-dashed border-ink/25" /> wolne
          </span>
        </div>
      </div>

      <div className="border-t border-line bg-ink-50/60 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-ink/50 uppercase">
            Wyjątki · {EXCEPTION_COUNT}
          </span>
          <span className="tnum font-mono text-[11px] text-ink/40">aktualizacja 0,4 s temu</span>
        </div>

        <ul className="mt-3 space-y-2">
          {Object.entries(EXCEPTIONS).map(([seat, reason]) => (
            <li key={seat} className="flex items-center justify-between gap-4 rounded-lg border border-line bg-white px-3 py-2">
              <span className="tnum font-mono text-xs font-bold text-ink">miejsce {seat}</span>
              <span className="text-xs text-ink/55">{reason}</span>
            </li>
          ))}
        </ul>

        <p className="tnum mt-3 font-mono text-[11px] text-ink/40">
          {OK_COUNT} z biletem · {FREE_COUNT} wolne · {EXCEPTION_COUNT} do sprawdzenia
        </p>
      </div>
    </div>
  )
}
