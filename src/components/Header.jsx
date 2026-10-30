import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { APP_DOWNLOAD_URL } from '../links.js'

const NAV = [
  { href: '#pasazerowie', label: 'Dla pasażera' },
  { href: '#przewoznicy', label: 'Dla przewoźnika' },
  { href: '#jak-to-dziala', label: 'Jak to działa' },
  { href: '#specyfikacja', label: 'Technologia' },
  { href: '#kontakt', label: 'Kontakt' },
]

const CTA = { href: APP_DOWNLOAD_URL, label: 'Pobierz aplikację' }

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Nagłówek jest `fixed`, więc na starcie leży na filmie w hero: logo po lewej, nawigacja
 * w wyśrodkowanej pigułce, CTA po prawej. Nad hero jest w pełni przezroczysty — nie rysuje
 * „paska” na kadrze filmu — a czytelność linków zapewnia tylko miękki gradient pod paskiem.
 * Po zjechaniu z hero przechodzi w biały pasek z cieniem (pigułka nawigacji dostaje wtedy
 * jasne tło).
 */
export default function Header() {
  const headerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('top')
      const height = headerRef.current?.offsetHeight ?? 64
      setOverHero(hero ? hero.getBoundingClientRect().bottom > height : false)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Menu mobilne zamykamy także klawiszem Esc.
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const dark = overHero

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        dark
          ? 'border-b border-transparent'
          : 'border-b border-line bg-white/90 shadow-[0_18px_40px_-32px_rgba(0,11,106,0.55)] backdrop-blur-md'
      }`}
    >
      {/* Miękki gradient pod paskiem: linki są czytelne na filmie, a krawędź paska nie rzuca się w oczy */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950/85 via-ink-950/40 to-transparent transition-opacity duration-300 ${
          dark ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20">
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="gohopon rail — początek strony"
        >
          <Logo variant={dark ? 'light' : 'dark'} className="h-6 w-auto sm:h-7" />
          <span aria-hidden="true" className={`hidden h-5 w-px sm:block ${dark ? 'bg-white/25' : 'bg-line'}`} />
          <span
            className={`hidden font-mono text-[11px] font-medium tracking-[0.2em] uppercase sm:block ${
              dark ? 'text-white/60' : 'text-ink/45'
            }`}
          >
            rail
          </span>
        </a>

        {/* Nawigacja w pigułce, wyśrodkowana w pasku (niezależnie od szerokości logo i CTA) —
            układ z projektu referencyjnego: logo po lewej, pigułka na środku, CTA po prawej. */}
        <nav
          aria-label="Nawigacja główna"
          className={`absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md transition-colors xl:flex ${
            dark ? 'border-white/20 bg-white/10' : 'border-line bg-ink-50/70'
          }`}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                dark ? 'text-white/80 hover:bg-white/15 hover:text-white' : 'text-ink/65 hover:bg-white hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a
            href={CTA.href}
            className="hidden items-center gap-2 rounded-full bg-flame px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-flame-600 sm:inline-flex"
          >
            {CTA.label}
            <ArrowIcon />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            className={`inline-flex size-10 items-center justify-center rounded-lg border transition-colors xl:hidden ${
              dark ? 'border-white/25 text-white hover:border-white/50' : 'border-line text-ink hover:border-ink/30'
            }`}
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`relative border-t xl:hidden ${
          dark ? 'border-white/10 bg-ink-950/95 backdrop-blur-md' : 'border-line bg-white'
        } ${open ? 'block' : 'hidden'}`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-5 pt-2 pb-4 sm:px-8" aria-label="Nawigacja mobilna">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`border-b py-3.5 text-sm font-medium last:border-0 ${
                dark ? 'border-white/10 text-white/75 hover:text-white' : 'border-line/70 text-ink/70 hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={CTA.href}
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-flame px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-flame-600 sm:hidden"
          >
            {CTA.label}
            <ArrowIcon />
          </a>
        </nav>
      </div>
    </header>
  )
}
