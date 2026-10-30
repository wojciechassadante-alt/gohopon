import Reveal from './Reveal.jsx'

const SIDES = [
  {
    id: 'pasazerowie',
    eyebrow: 'Dla Pasażerów',
    title: 'Kup, wsiadaj, zapomnij o bilecie.',
    points: [
      'Bilet kupujesz w aplikacji albo na stronie.',
      'Wsiadasz i siadasz na swoim miejscu. Nic nie skanujesz.',
      'Kontrola nie przerywa podróży.',
      'Nie szukasz biletu w kieszeni ani w mailu.',
    ],
    cta: { label: 'Kup bilet', href: '#kontakt', variant: 'flame' },
    delay: 0,
  },
  {
    id: 'przewoznicy',
    eyebrow: 'Dla Przewoźników',
    title: 'Eliminacja gapowiczów, zero papieru, integracja z flotą.',
    points: [
      'Konduktor widzi tylko wyjątki: wagon, rząd, numer miejsca.',
      'Zero druku i zero dystrybucji biletów papierowych.',
      'Integracja z systemem sprzedaży i flotą przewoźnika.',
      'Raport z każdego przejazdu: frekwencja, wyjątki, przychód.',
    ],
    cta: { label: 'Wdrożenie u przewoźnika', href: '#kontakt', variant: 'ink' },
    delay: 120,
  },
]

const CTA_CLASS = {
  flame: 'bg-flame text-white hover:bg-flame-600',
  ink: 'bg-ink text-white hover:bg-ink-800',
}

export default function SplitView() {
  return (
    <section id="split" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-flame-600 uppercase">
            Dwie strony, jeden system
          </span>
          <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl">
            Ten sam przejazd, dwa różne widoki.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {SIDES.map((side) => (
            <Reveal
              key={side.id}
              id={side.id}
              delay={side.delay}
              className="flex flex-col rounded-2xl border border-line bg-white p-7 transition-colors hover:border-ink/20 sm:p-9"
            >
              <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-ink/40 uppercase">
                {side.eyebrow}
              </span>
              <h3 className="mt-4 text-2xl leading-snug font-extrabold tracking-tight text-balance text-ink sm:text-[1.75rem]">
                {side.title}
              </h3>

              <ul className="mt-7 space-y-3.5">
                {side.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink/65">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] size-1.5 shrink-0 rounded-[2px] bg-flame"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href={side.cta.href}
                className={`mt-9 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${CTA_CLASS[side.cta.variant]}`}
              >
                {side.cta.label}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
