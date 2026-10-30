import { useEffect, useRef, useState } from 'react'

/**
 * Ujawnia element, gdy wjedzie w viewport.
 * Zwraca [ref, visible] — `visible` steruje atrybutem data-visible w klasie .reveal.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null)
  // Brak IntersectionObserver (stara przeglądarka) => pokazujemy treść od razu.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, visible]
}
