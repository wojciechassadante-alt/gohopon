import Logo from './Logo.jsx'
import Reveal from './Reveal.jsx'
import { CONTACT_EMAIL } from '../links.js'

export default function CtaBand() {
  return (
    <section id="kontakt" className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-flame/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <Logo variant="light" className="h-7 w-auto" />
            <h2 className="mt-8 text-3xl leading-tight font-extrabold tracking-tight text-balance text-white sm:text-4xl">
              Wdrożenie u przewoźnika.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">
              Pilotaż na jednym składzie. Potem cała flota. Bez wymiany kasowników i bez nowej karty
              dla pasażera.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:justify-self-end">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-lg bg-flame px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
              odpowiedź w ciągu 24 h · demo na Twoim składzie
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
