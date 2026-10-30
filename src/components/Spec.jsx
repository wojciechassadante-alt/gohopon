import Reveal from './Reveal.jsx'

const ITEMS = [
  { label: 'Czujniki', value: 'BLE + UWB, montaż pod siedziskiem.' },
  { label: 'Detekcja', value: 'Obecność na miejscu, 1:1 z numerem miejsca.' },
  { label: 'Backend', value: 'API i kolejka zdarzeń. Audyt każdej weryfikacji.' },
  { label: 'Panel konduktora', value: 'Web, jeden ekran, działa offline.' },
  { label: 'Integracje', value: 'Sprzedaż biletów, flota, rozkład jazdy.' },
  { label: 'Raporty', value: 'Frekwencja, wyjątki, przychód z przejazdu.' },
]

export default function Spec() {
  return (
    <section id="specyfikacja" className="border-y border-line bg-ink-50/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-flame-600 uppercase">
            Specyfikacja
          </span>
          <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl">
            Co wchodzi w skład.
          </h2>
        </Reveal>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 70} className="bg-white p-7">
              <dt className="font-mono text-[11px] font-medium tracking-[0.18em] text-ink/40 uppercase">
                {item.label}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink/70">{item.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
