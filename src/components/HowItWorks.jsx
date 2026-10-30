import AppTicket from './AppTicket.jsx'
import ConductorTablet from './ConductorTablet.jsx'
import Reveal from './Reveal.jsx'
import SeatSensor from './SeatSensor.jsx'
import StoreBadges from './StoreBadges.jsx'

const STEPS = [
  {
    id: 'dla-pasazera',
    number: '1',
    title: 'Dla pasażera',
    body: 'Podróżujesz bez papieru i bez kolejki. Wszystko w jednej aplikacji — bilet, rezerwacja i historia przejazdów.',
    visual: 'app',
  },
  {
    id: 'dla-przewoznika',
    number: '2',
    title: 'Dla przewoźnika (B2B)',
    body: 'System integruje się z systemem sprzedaży biletów, a także z dowolnymi systemami obecności (np. BLE pod siedzeniami) oraz systemem detekcji.',
    visual: 'sensor',
  },
  {
    id: 'dla-konduktora',
    number: '3',
    title: 'Panel dla konduktora',
    body: 'Konduktor ma na tablecie podgląd wagonu w czasie rzeczywistym. Legalni pasażerowie są oznaczeni na zielono, a przy wykrytym braku biletu nad wyznaczonym miejscem pojawia się komunikat z przyciskiem zgłoszenia — konduktor podchodzi prosto do gapowicza.',
    visual: 'panel',
  },
]

function AppVisual() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:gap-5">
      <AppTicket variant="compact" />
      <StoreBadges layout="column" className="max-w-[9rem]" />
    </div>
  )
}

const VISUALS = { app: AppVisual, sensor: SeatSensor, panel: ConductorTablet }

export default function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="max-w-4xl">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-flame-600 uppercase">
            Jak to działa
          </span>
          <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-[2rem]">
            Proste dla pasażera. Inteligentne dla przewoźnika.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-14 lg:grid-cols-3 lg:gap-10">
          {STEPS.map((step, index) => {
            const Visual = VISUALS[step.visual]

            return (
              <Reveal as="li" key={step.id} id={step.id} delay={index * 110} className="flex flex-col">
                <div className="flex items-center gap-3.5">
                  <span className="tnum flex size-9 shrink-0 items-center justify-center rounded-full bg-flame text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <h3 className="text-xl leading-snug font-bold text-balance text-ink">{step.title}</h3>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink/60">{step.body}</p>

                <div className="mt-9 flex flex-1 items-end">
                  <Visual />
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
