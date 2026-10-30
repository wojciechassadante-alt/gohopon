import HeroBackground from './HeroBackground.jsx'
import Reveal from './Reveal.jsx'
import WaitlistForm from './WaitlistForm.jsx'

/**
 * Schodki tła: pięć pasów, w których ilustracja jest przycięta białym prostokątem.
 *
 * `width` — wcięcie liczone w pionie (od `lg`): biel od lewej krawędzi sekcji do krawędzi
 * ilustracji. `height` — to samo w poziomie (poniżej `lg`): biel od góry pasa z ilustracją.
 * Kolejne wartości różni stały krok, więc krawędź między obrazem a bielą jest łamana w prostych
 * liniach — bez ani jednego skosu — a ilustracja raz wchodzi na białą stronę, raz się cofa.
 */
const STEPS = [
  { width: '66%', height: '22%' },
  { width: '63%', height: '26%' },
  { width: '60%', height: '30%' },
  { width: '57%', height: '34%' },
  { width: '54%', height: '38%' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white pt-24 pb-0 sm:pt-28 lg:justify-center lg:pb-20"
    >
      {/* Treść: lewa kolumna na bieli — plakietka, nagłówek, podtytuł, zapisy, link.
          CTA „Pobierz aplikację” siedzi w nagłówku (`Header.jsx`), żeby nie konkurowało
          z formularzem zapisów, który jest główną akcją hero.

          Kolumna jest wąska (`max-w-*`), bo od `lg` obok niej biegnie krawędź ilustracji —
          najwęższy stopień schodków wypada na `54%` szerokości sekcji, więc tekst ma do niego
          zapas także na 1024 px. */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-[26rem] sm:max-w-[30rem] xl:max-w-[36rem]">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-line bg-ink-50/70 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-[0.24em] text-ink uppercase">
              HOPON RAIL
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-4xl leading-[1.06] font-extrabold tracking-tight text-balance text-ink sm:text-[2.5rem] xl:text-[3rem]">
              Wsiadasz i jedziesz. Bilet jest już w systemie.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-base leading-relaxed text-pretty text-ink-700 sm:text-lg">
              Kupujesz bilet w aplikacji, a konduktor widzi Twoje miejsce w czasie rzeczywistym.
              Bez papieru, bez skanowania, bez kolejek.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9">
            <WaitlistForm />
          </Reveal>

          <Reveal delay={320} className="mt-7">
            <a
              href="#jak-to-dziala"
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink-50"
            >
              <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full border border-ink/30">
                <svg viewBox="0 0 12 12" className="size-2.5 translate-x-px" fill="currentColor">
                  <path d="M2 1.5 10 6 2 10.5V1.5Z" />
                </svg>
              </span>
              Zobacz, jak to działa
            </a>
          </Reveal>
        </div>
      </div>

      {/* Tło: ilustracja po prawej stronie sekcji, przycięta białymi „schodkami”.
          Białe prostokąty leżą na ilustracji, więc krawędź wypada dokładnie tam, gdzie kończy
          się obraz — w prostych liniach, bez ani jednego skosu.

          Od `lg` ilustracja zajmuje całe tło, a biel zasłania jej lewą stronę (tekst zostaje na
          bieli). `object-right` trzyma w kadrze prawą część sceny — przód pociągu, peron
          i miasto — bo lewa połowa i tak jest zasłonięta.

          Poniżej `lg` na dwie kolumny nie ma miejsca, więc ilustracja zjeżdża pod treść jako pas
          przycięty schodkami od góry (te same wartości, tylko obrócone: `height` zamiast
          `width`). */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-10 h-[34svh] min-h-[12rem] w-full lg:absolute lg:inset-0 lg:mt-0 lg:-z-10 lg:h-auto lg:min-h-0"
      >
        <HeroBackground className="object-center lg:object-right" />

        {/* Pionowe schodki (od `lg`): biel po lewej, ilustracja po prawej. */}
        <div className="absolute inset-0 hidden flex-col lg:flex">
          {STEPS.map((step) => (
            <div key={step.width} className="flex-1 bg-white" style={{ width: step.width }} />
          ))}
        </div>

        {/* Poziome schodki (poniżej `lg`): biel nad ilustracją, obraz pod treścią. */}
        <div className="absolute inset-0 flex lg:hidden">
          {STEPS.map((step) => (
            <div key={step.height} className="flex-1 bg-white" style={{ height: step.height }} />
          ))}
        </div>
      </div>
    </section>
  )
}
