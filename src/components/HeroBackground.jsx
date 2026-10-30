import backgroundSvg from '../assets/background.svg'

/**
 * Tło hero: ilustracja wektorowa z `src/assets` (pociąg na stacji w mieście) rozciągnięta na
 * sekcję. `object-cover` kadruje ją bez zniekształceń — domyślnie `object-center`, żeby środek
 * kadru z pociągiem został widoczny także na wąskim ekranie; `Hero.jsx` przełącza od `lg` na
 * `object-right`, bo lewą połowę ilustracji zasłaniają wtedy białe schodki.
 *
 * SVG (3435,72 × 2245,47; proporcja 1,53:1, ~520 kB) skaluje się bez utraty jakości, więc jest
 * ostrzejszy niż zdjęcie, które zastąpił. Poprzednie materiały (`hero-alps-panorama.jpg`,
 * „Panorama Alp widziana z pociągu.png”) zostają w `src/assets` na wypadek powrotu do wersji
 * fotograficznej — wtedy wystarczy zmienić import na pierwszej linii.
 *
 * Uwaga o kadrze: ilustracja ma przezroczysty margines (~7% z każdej strony), więc jej treść
 * nie dochodzi do krawędzi sekcji. Schodkom w `Hero.jsx` to nie przeszkadza — białe prostokąty
 * leżą na obrazie, a przezroczysty margines i tak pokazuje biel sekcji.
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
