import backgroundSvg from '../assets/background.svg'

/**
 * Tło hero: ilustracja wektorowa z `src/assets` (pociąg w górach) rozciągnięta na całą sekcję.
 * `object-cover` + `object-center` kadrują ją tak, żeby środek kadru — pociąg na tle gór — był
 * widoczny także na telefonie (wtedy drzewa i skały po bokach są obcinane).
 *
 * SVG (3929,97 × 2245,47; proporcja 1,75:1, ~90 kB) skaluje się bez utraty jakości, więc jest
 * lżejszy i ostrzejszy niż zdjęcie, które zastąpił. Poprzednie tło (`hero-alps-panorama.jpg`)
 * zostaje w `src/assets` na wypadek powrotu do wersji fotograficznej — wtedy wystarczy zmienić
 * import na pierwszej linii.
 *
 * Uwaga o kadrze: górna część ilustracji to jasne niebo, środek i dół to ciemne góry, las oraz
 * pociąg, a pod szynami jest biały pas. Treść hero leży na środku (ciemne góry i pociąg),
 * dlatego w `Hero.jsx` siedzi na białej, rozmytej płycie — inaczej ciemny `ink` nie miałby
 * kontrastu na tym kadrze.
 */
export default function HeroBackground({ className = '' }) {
  return (
    <img
      src={backgroundSvg}
      alt=""
      className={`absolute inset-0 size-full object-cover object-center ${className}`}
    />
  )
}
