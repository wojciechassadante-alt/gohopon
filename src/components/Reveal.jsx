import { useReveal } from '../hooks/useReveal.js'

/**
 * Wrapper fade-in. `delay` opóźnia wejście (kolejne elementy wchodzą jeden po drugim).
 * Element można zmienić przez `as` (np. as="section", as="li").
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={['reveal', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
