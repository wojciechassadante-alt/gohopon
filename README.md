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
    Hero.jsx               # hero na cały ekran (100svh), treść wyśrodkowana na zdjęciu
    HeroBackground.jsx     # tło hero: zdjęcie z `src/assets` (object-cover, kadr na okno wagonu)
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

Hero jest wyśrodkowane na zdjęciu w tle (układ z projektu referencyjnego): plakietka → nagłówek →
podtytuł → pigułka z zapisami → link „Zobacz, jak to działa”.

- `Header.jsx` jest `fixed` (`h-16`, od `lg` `h-20`). Nad hero jest w pełni przezroczysty — nie rysuje
  „paska” na kadrze zdjęcia — a czytelność linków zapewnia gradient pod paskiem. Po zjechaniu z hero
  (na podstawie `#top`) zmienia się w biały pasek z cieniem.
- Nawigacja siedzi w wyśrodkowanej pigułce (`absolute left-1/2 -translate-x-1/2`), więc nie przesuwa
  się, gdy zmienia się szerokość logo albo CTA. Pełną listę pokazuje od `xl` (na `lg` pigułka nie
  zmieściłaby się między logo a CTA bez nachodzenia na nie), a poniżej zastępuje ją menu pod
  przyciskiem hamburgera.
- `Hero.jsx` ma `min-h-[100svh]` i padding mieszczący treść pod paskiem, więc zdjęcie zajmuje cały ekran,
  a sekcja rośnie, jeśli treść się nie mieści (np. na telefonie).
- Tłem jest zdjęcie z okna wagonu (`HeroBackground.jsx`): jasne okno w środku, ciemna rama u góry i u dołu.
  Dlatego treść hero jest ciemna (`ink`), a nie biała — i bez mgiełki oraz bez poświaty pod literami, które
  rozmywały napisy. Zmierzony kontrast na tym kadrze: nagłówek ~8:1, podtytuł ~10:1, plakietka ~7:1
  (WCAG AA/AAA). Zostaje tylko gradient `from-ink-950/25 … to-ink-950/30` — góra pod nawigację, dół jako
  przejście w białą sekcję.
- Zdjęcie nie dostaje zoomu (`object-cover` bez `scale-*`): materiał ma 1560 px szerokości, więc dodatkowe
  skalowanie tylko pogarsza ostrość i ucina ramę wagonu. Ten sam kadr trzyma treść w jasnym oknie na
  telefonie (boczne okna są wtedy obcinane).
- CTA „Pobierz aplikację” jest w nagłówku (jak „Get Started” w projekcie referencyjnym), a główną
  akcją hero jest formularz zapisów — jedno CTA w jednym miejscu.
- `HeroPhone.jsx` (mockup telefonu w HTML/CSS, stała szerokość `w-64` = 256 px) nie jest już używany
  w hero — zostaje w repo na wypadek powrotu do układu dwukolumnowego. Ten sam ekran aplikacji
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
| `src/assets/hero-alps-panorama.jpg` | tło hero (1560×1008, ~220 kB) — zoptymalizowana wersja materiału „Panorama Alp widziana z pociągu.png”; bez zoomu w hero, bo każdy `scale-*` ucina ramę wagonu i rozmywa kadr |
| `src/assets/Panorama Alp widziana z pociągu.png` | materiał źródłowy tła hero (1560×1008, 2,5 MB) — nieużywany w kodzie, trzymany do regeneracji JPEG-a |
| `src/assets/hero-train-window.mp4` | film z tego samego ujęcia (736×414, 9 s) — obecnie nieużywany, hero ma statyczne tło |
| `public/seat-sensor.png` | fotel pasażera z czujnikiem obecności — z materiałów brandowych (`materiały/siedzenie.png`) |
| `src/components/AppTicket.jsx` | mockup ekranu aplikacji pasażera — sekcja „Jak to działa” |
| `src/components/HeroPhone.jsx` | większy mockup tego samego ekranu (HTML/CSS, stała szerokość 256 px) — obecnie nieużywany w hero |
| `src/components/StoreBadges.jsx` | odznaki sklepów — zastępcze (inline SVG); podmień na oficjalne grafiki App Store / Google Play |

Zielony stan „bilet ok” (w aplikacji i w panelu konduktora) korzysta z palety `emerald` z Tailwinda.

Zdjęcie tła hero leży w `src/assets` jako JPEG (1560×1008, ~220 kB), bo oryginalny PNG waży 2,5 MB i nie
nadaje się na tło strony. Podmieniając zdjęcie: wrzuć oryginał do `src/assets`, wygeneruj z niego JPEG w tej
samej rozdzielczości (np. `ffmpeg -i "oryginał.png" -q:v 3 src/assets/hero-alps-panorama.jpg`) i zostaw oba
pliki — JPEG jedzie na stronę, PNG zostaje jako materiał źródłowy. Na ekranie szerszym niż 1560 px zdjęcie
jest skalowane w górę, więc jeśli masz wersję 2560 px, użyj jej.

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
