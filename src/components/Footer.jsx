import Logo from './Logo.jsx'

const LINKS = [
  { href: '#jak-to-dziala', label: 'Jak to działa' },
  { href: '#pasazerowie', label: 'Pasażerowie' },
  { href: '#przewoznicy', label: 'Przewoźnicy' },
  { href: '#specyfikacja', label: 'Specyfikacja' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-6 w-auto" />
          <span aria-hidden="true" className="h-5 w-px bg-line" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-ink/45 uppercase">
            rail.gohopon.pl
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Nawigacja w stopce">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/60 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="tnum font-mono text-[11px] text-ink/40">© 2026 gohopon</p>
      </div>
    </footer>
  )
}
