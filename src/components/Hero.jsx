import HeroBackground from './HeroBackground.jsx'
import Reveal from './Reveal.jsx'
import WaitlistForm from './WaitlistForm.jsx'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink-100 pt-24 pb-20 sm:pt-28"
    >
      {/* Tło przycięte do sekcji. Nagłówek jest `fixed`, więc hero zajmuje cały ekran — ilustrację
          widać też pod paskiem nawigacji. `pt-*` chroni treść przed nachodzeniem na nagłówek.

          Kadr ilustracji (`background.svg`) to jasne niebo u góry, ciemne góry, las i pociąg
          w środku oraz biały pas pod szynami. Treść hero leży na środku — czyli na ciemnym
          fragmencie — dlatego siedzi na białej, rozmytej płycie (patrz niżej), a nie wprost na
          tle. Gradient zostaje tylko u góry: pod pasek nawigacji, którego jasne logo i linki na
          jasnym niebie nie miałyby kontrastu. Dołu nie przyciemniamy — biały pas pod szynami
          sam przechodzi w białą sekcję „Jak to działa”. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/5 to-transparent" />
      </div>

      {/* Treść wyśrodkowana w kadrze — jeden blok: plakietka, nagłówek, podtytuł, zapisy.
          CTA „Pobierz aplikację” siedzi w nagłówku (`Header.jsx`), żeby nie konkurowało
          z formularzem zapisów, który jest główną akcją hero.

          Blok leży na białej, rozmytej płycie (`bg-white/60` + `backdrop-blur-md`), bo pod nim
          są ciemne góry, las i pociąg z ilustracji — bez płyty ciemny `ink` miałby na tym kadrze
          ~2:1 kontrastu. Na płycie minimum to ~7:1 dla nagłówka i podtytułu. Płyta jest
          przezroczysta, więc ilustracja zostaje widoczna wokół niej, a litery są ostre (bez
          poświaty pod tekstem). */}
      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <div className="rounded-[2rem] border border-white/60 bg-white/60 px-5 py-9 backdrop-blur-md sm:px-9 sm:py-11">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-white/80 bg-white/75 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-[0.24em] text-ink uppercase backdrop-blur-sm">
              HOPON RAIL
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-[3.75rem]">
              Wsiadasz i jedziesz. Bilet jest już w systemie.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-ink-700 sm:text-lg">
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
              className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-ink backdrop-blur-sm transition-colors hover:bg-white/90"
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
    </section>
  )
}
