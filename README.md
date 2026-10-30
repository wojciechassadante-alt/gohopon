# rail.gohopon.pl

Landing page systemu automatycznych biletów kolejowych. React 19 + Vite 7 + Tailwind CSS 4.

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # podgląd builda, http://localhost:4173
npm run lint
```

## Struktura

```
index.html
vite.config.js
eslint.config.js
public/
  favicon.svg
  hoponlogo.svg
  seat-sensor.png          # fotel z czujnikiem obecności (materiały: siedzenie.png)
src/
  main.jsx                 # entry
  App.jsx                  # składanie sekcji
  index.css                # design system: @theme (kolory, fonty, keyframes)
  links.js                 # adresy CTA (aplikacja, sklepy)
  assets/
    hero-alps-panorama.jpg  # tło hero — zdjęcie z okna wagonu (1560×1008, ~220 kB)
    Panorama Alp widziana z pociągu.png   # materiał źródłowy tła (1560×1008, 2,5 MB, nieużywany w kodzie)
    hero-train-window.mp4   # film z tego samego ujęcia — nieużywany (hero ma statyczne tło)
  hooks/
    useReveal.js           # IntersectionObserver -> fade-in przy przewijaniu
    usePrefersReducedMotion.js     # wykrywanie prefers-reduced-motion (obecnie nieużywany)
  components/
    Reveal.jsx             # wrapper animacji (as / delay / className)
    Logo.jsx               # logo gohopon (inline SVG, warianty dark | light)
    Header.jsx             # fixed nav w pigułce + menu mobilne (przezroczysty nad hero, biały po zjechaniu)
    Hero.jsx               # hero na cały ekran (100svh): tekst po lewej, ilustracja po prawej, krawędź schodkami
    HeroBackground.jsx     # tło hero: ilustracja z `src/assets` (object-cover, od `lg` object-right)
    WaitlistForm.jsx       # formularz zapisów w hero (pigułka: e-mail + przycisk)
    HeroPhone.jsx          # mockup telefonu z aplikacją (nieużywany w obecnym układzie hero)
    AppTicket.jsx          # mniejszy mockup aplikacji pasażera (sekcja „Jak to działa”)
    appTicketData.js       # dane ekranu aplikacji (przejazd, dolna nawigacja) — wspólne dla mockupów
    NavIcon.jsx            # ikony dolnej nawigacji aplikacji (wspólne dla mockupów telefonu)
    StoreBadges.jsx        # odznaki App Store / Google Play (row | column)
    HowItWorks.jsx         # 3 kolumny: pasażer / przewoźnik / panel konduktora
    SeatSensor.jsx         # zdjęcie fotela z czujnikiem (materiały)
    ConductorTablet.jsx    # podgląd panelu konduktora na tablecie (mock)
    ConductorPanel.jsx     # pełnowymiarowy wariant panelu (nieużywany w obecnym układzie)
    SplitView.jsx          # Dla Pasażerów / Dla Przewoźników
    Spec.jsx               # zakres wdrożenia
    CtaBand.jsx            # kontakt (id="kontakt")
    Footer.jsx
```

## Paleta i tokeny

Zdefiniowane w `src/index.css` w bloku `@theme`:

| Token | Wartość | Użycie |
| --- | --- | --- |
| `ink` (50–950) | `#000b6a` | tekst, struktura, przyciski wtórne |
| `flame` (50–700) | `#ff7a30` | akcent: CTA, aktywne elementy, wyjątki |
| `line` | `#e6e8f0` | hairline, obramowania |

Dodatkowe klasy pomocnicze: `.reveal`, `.bg-grid`, `.bg-grid-dark`, `.mask-fade-y`, `.mask-fade-edges`, `.tnum`.
Fonty: Inter (tekst) + JetBrains Mono (etykiety techniczne), z fallbackiem na fonty systemowe.

## Animacje

- `useReveal` + `.reveal[data-visible]` — wejścia fade-in przy przewijaniu, opóźnienia przez `--reveal-delay`.
- `animate-sweep` — linia skanowania w panelu konduktora.
- `animate-seat` — kaskadowe pojawienie się miejsc.
- `animate-blink` — kropka "live".
- Wszystko wyłączone przy `prefers-reduced-motion: reduce`.

## Układ hero i nagłówka

Hero dzieli ekran na dwie strony: po lewej, na bieli, treść — plakietka → nagłówek → podtytuł →
pigułka z zapisami → link „Zobacz, jak to działa”; po prawej ilustracja (`background.svg`).

- Krawędź między nimi to **schodki w prostych liniach**: pięć pasów o wysokości `20%`, w których
  ilustracja jest przycięta białym prostokątem. Kolejne wcięcia różni stały krok (`66%` → `54%`
  szerokości sekcji), więc obraz raz wchodzi na białą stronę, raz się cofa — bez ani jednego skosu.
  Wartości siedzą w tablicy `STEPS` w `Hero.jsx`.
- Białe prostokąty leżą na ilustracji (`bg-white`), więc krawędź wypada dokładnie tam, gdzie kończy
  się obraz; przezroczysty margines ilustracji (~7% z każdej strony) i tak pokazuje biel sekcji.
- Kolumna z tekstem jest wąska (`max-w-[26rem] sm:max-w-[30rem] xl:max-w-[36rem]`), bo najwęższy
  stopień wypada na `54%` szerokości sekcji — tekst ma do niego zapas także na 1024 px (`lg`).
  Nagłówek ma `text-4xl sm:text-[2.5rem] xl:text-[3rem]`, żeby „Wsiadasz i jedziesz.” zostało
  w jednej linii.
- Od `lg` ilustracja jest tłem całej sekcji i dostaje `object-right`, żeby w kadrze został przód
  pociągu, peron i miasto (lewą połowę i tak zasłaniają schodki). Poniżej `lg` dwie kolumny się nie
  mieszczą, więc ilustracja zjeżdża pod treść jako pas `h-[34svh]` przycięty schodkami od góry —
  te same wartości, tylko obrócone (`height` zamiast `width`).
- `Header.jsx` jest `fixed` (`h-16`, od `lg` `h-20`) i na samej górze strony jest w pełni
  przezroczysty — nie rysuje „paska” na kadrze ilustracji. Jego treść jest ciemna (`ink`), bo lewa
  strona hero jest biała; jasne logo i gradient pod paskiem były potrzebne nad ciemnym zdjęciem
  i zniknęły razem z nim. Po pierwszym przewinięciu (i przy otwartym menu mobilnym) nagłówek
  przechodzi w biały pasek z cieniem, żeby treść hero nie wjeżdżała pod logo.
- Nawigacja siedzi w wyśrodkowanej pigułce (`absolute left-1/2 -translate-x-1/2`), więc nie przesuwa
  się, gdy zmienia się szerokość logo albo CTA. Pełną listę pokazuje od `xl` (na `lg` pigułka nie
  zmieściłaby się między logo a CTA bez nachodzenia na nie), a poniżej zastępuje ją menu pod
  przyciskiem hamburgera.
- `Hero.jsx` ma `min-h-[100svh]`; sekcja rośnie, jeśli treść się nie mieści — na telefonie tekst
  i pas ilustracji nie mieszczą się w jednym ekranie, więc dół hero odsłania się przy przewijaniu.
- Formularz zapisów (`WaitlistForm.jsx`) to biała pigułka z hairline'em (`border-line`) i miękkim
  cieniem — na białym hero nie potrzebuje już rozmytej płyty pod spodem.
- CTA „Pobierz aplikację” jest w nagłówku (jak „Get Started” w projekcie referencyjnym), a główną
  akcją hero jest formularz zapisów — jedno CTA w jednym miejscu.
- `HeroPhone.jsx` (mockup telefonu w HTML/CSS, stała szerokość `w-64` = 256 px) nie jest już używany
  w hero — zostaje w repo na wypadek powrotu do układu z mockupem telefonu. Ten sam ekran aplikacji
  pokazuje `AppTicket.jsx` w sekcji „Jak to działa”.
- Zakotwiczenia (`#jak-to-dziala` itd.) trafiają pod pasek dzięki `scroll-padding-top` w `index.css`.

## Treść

Wszystkie teksty siedzą w tablicach na górze plików komponentów (`NAV`, `STEPS`, `SIDES`, `ITEMS`),
a dane wspólne dla obu mockupów telefonu — w `src/components/appTicketData.js` (`TRIP`, `TABS`).
Dane w `ConductorTablet.jsx` są przykładowe — podmień `EXCEPTIONS` / `FREE`, żeby zmienić podgląd wagonu.

Linki do podpięcia przy wdrożeniu (w jednym miejscu, `src/links.js`):

- `APP_DOWNLOAD_URL` → obecnie `#dla-pasazera` (sekcja z odznakami sklepów). Podmień na link do aplikacji.
- `APP_STORE_URL` / `GOOGLE_PLAY_URL` → adresy w sklepach, używane w `StoreBadges.jsx`.
- `#kontakt` → docelowo formularz kontaktowy (obecnie `mailto:` na `CONTACT_EMAIL`).
- `CONTACT_EMAIL` → adres w sekcji „kontakt” (`CtaBand.jsx`) i w formularzu zapisów w hero.
- `WAITLIST_ENDPOINT` → endpoint zapisów z hero (POST JSON `{ email, source }`). Pusty string = brak
  backendu: `WaitlistForm.jsx` otwiera program pocztowy z gotową wiadomością na `CONTACT_EMAIL`.
- `SplitView.jsx` → CTA „Kup bilet” i „Wdrożenie u przewoźnika” prowadzą do `#kontakt`.

## Assety

| Plik | Co to jest |
| --- | --- |
| `src/assets/background.svg` | tło hero (3435,72 × 2245,47, ~520 kB) — ilustracja dworca w mieście, z przezroczystym marginesem ~7%; od `lg` kadrowana `object-right` i przycinana białymi schodkami |
| `src/assets/hero-alps-panorama.jpg` | poprzednie tło hero (1560×1008, ~220 kB) — nieużywane w kodzie, zostaje na wypadek powrotu do wersji fotograficznej |
| `src/assets/Panorama Alp widziana z pociągu.png` | materiał źródłowy poprzedniego tła (1560×1008, 2,5 MB) — nieużywany w kodzie, trzymany do regeneracji JPEG-a |
| `src/assets/hero-train-window.mp4` | film z tego samego ujęcia (736×414, 9 s) — obecnie nieużywany, hero ma statyczne tło |
| `public/seat-sensor.png` | fotel pasażera z czujnikiem obecności — z materiałów brandowych (`materiały/siedzenie.png`) |
| `src/components/AppTicket.jsx` | mockup ekranu aplikacji pasażera — sekcja „Jak to działa” |
| `src/components/HeroPhone.jsx` | większy mockup tego samego ekranu (HTML/CSS, stała szerokość 256 px) — obecnie nieużywany w hero |
| `src/components/StoreBadges.jsx` | odznaki sklepów — zastępcze (inline SVG); podmień na oficjalne grafiki App Store / Google Play |

Zielony stan „bilet ok” (w aplikacji i w panelu konduktora) korzysta z palety `emerald` z Tailwinda.

Tłem hero jest SVG (`background.svg`), bo skaluje się bez utraty ostrości — także wtedy, gdy schodki
przycinają jego lewą stronę. Wracając do wersji fotograficznej: wrzuć oryginał do `src/assets`,
wygeneruj z niego JPEG w tej samej rozdzielczości (np. `ffmpeg -i "oryginał.png" -q:v 3
src/assets/hero-alps-panorama.jpg`) i zmień import w `HeroBackground.jsx` — kadr ustawia
`object-cover` z `object-position` (`object-center`, od `lg` `object-right`).

## Uwaga środowiskowa (Windows)

Na tej maszynie polityka kontroli aplikacji (WDAC / Smart App Control) blokuje natywną binarkę Rollupa
(`@rollup/rollup-win32-x64-msvc`), przez co `vite` nie startuje. Dlatego w `package.json` jest override:

```json
"overrides": {
  "rollup": "npm:@rollup/wasm-node@^4"
}
```

Build działa wtedy na wersji WASM (wolniejszy start, identyczny wynik). Na maszynie bez tej blokady
możesz override usunąć i wrócić do natywnego Rollupa.
