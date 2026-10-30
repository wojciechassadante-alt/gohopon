import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Czy użytkownik wyłączył animacje w systemie (`prefers-reduced-motion: reduce`).
 * Reaguje też na zmianę ustawienia w trakcie działania strony.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia?.(QUERY).matches ?? false)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const query = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
