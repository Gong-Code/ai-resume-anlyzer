[🇬🇧 English](README.md) | 🇸🇪 Svenska

# Resumate - AI-driven CV-analys

Resumate är en webbapplikation som ger jobbsökare omedelbar, AI-driven feedback på sina CV:n. Ladda upp en PDF, ange valfritt vilket jobb du söker, och få en detaljerad genomgång som täcker ATS-kompatibilitet, ton, innehållskvalitet, struktur och kompetenser - allt poängsatt och förklarat med konkreta förbättringstips.

**Live-demo:** Hostad på [Puter](https://puter.com) - ingen traditionell backend-server behövs.

---

## Vad applikationen gör

1. **Ladda upp** ditt CV som en PDF tillsammans med valfritt företagsnamn, jobbtitel och jobbeskrivning.
2. **AI-analys** - CV:t skickas till Claude (Anthropics språkmodell) via Puter.js SDK. Modellen agerar som en senior rekryterare och ATS-specialist och returnerar strukturerad JSON-feedback.
3. **Visuell rapport** - Du får en övergripande poäng, kategoriuppdelning (ATS, Ton & Stil, Innehåll, Struktur, Kompetenser) samt specifika tips markerade som styrkor eller förbättringsområden.
4. **Dashboard** - Alla tidigare analyser sparas på ditt konto och visas på startsidan så att du kan följa din utveckling över tid.

---

## Teknikstack

### Ramverk

| Teknik             | Varför                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19**       | Senaste versionen med förbättrad renderingsprestanda. Reacts komponentmodell håller UI:t modulärt - varje feedback-sektion (ATS-panel, poängmätare, dragspelsdetaljer) är en egen isolerad komponent.                                              |
| **React Router 7** | Fullstack React-ramverk med filbaserad routing, server-side rendering och inbyggd dataladdning. Valdes framför Next.js för sitt lättare fotavtryck och inbyggt stöd för deploy som en enkel Node-server eller statisk sajt.                       |
| **TypeScript**     | Varje komponent, store och hjälpfunktion är typad. TypeScript fångar buggar vid byggtid istället för i produktion - särskilt viktigt vid parsning av strukturerade AI-svar till typade interfaces som `Feedback` och `Resume`.                     |

### Styling

| Teknik             | Varför                                                                                                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tailwind CSS 4** | Utility-first CSS som håller stilar samlokaliserade med markup. Inga separata stilmallar att underhålla. Senaste v4 använder ett Vite-plugin för näst intill omedelbar byggtid och stöder den nya `@theme`-konfigurationen.  |
| **tailwind-merge** | Sammanfogar villkorliga Tailwind-klasser utan konflikter. Används i `cn()`-hjälpfunktionen för att bygga dynamiska klassträngar för poängbaserad färgtematik (grön/gul/röd).                                                |
| **tw-animate-css** | Lägger till CSS-animeringsverktyg som `animate-in` och `fade-in` för mjuka övergångar när feedback-sektioner laddas.                                                                                                        |

### State-hantering

| Teknik      | Varför                                                                                                                                                                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Zustand** | Lättviktig state-hanterare (< 1 KB) som ersätter React Context för globalt state. Hela Puter.js-integrationen (autentisering, filsystem, AI, key-value-lagring) lever i en enda Zustand-store. Valdes framför Redux för sin minimala boilerplate - inga action creators, reducers eller providers behövs.           |

### AI & Backend-tjänster

| Teknik                    | Varför                                                                                                                                                                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Puter.js**              | Molnplattforms-SDK som tillhandahåller autentisering, fillagring, key-value-databas och tillgång till AI-modeller - allt från klientsidan. Detta eliminerar behovet av en traditionell backend-server, databas eller separat hantering av API-nycklar. Användare loggar in via Puter och all data sparas i deras molnkonto.            |
| **Claude (via Puter AI)** | Anthropics Claude Sonnet-modell analyserar CV:n med en detaljerad prompt som utvärderar ATS-kompatibilitet, nyckelordsmatchning, sektion-för-sektion-granskning och effektmätning. AI:n returnerar strukturerad JSON som mappar direkt till appens TypeScript-interfaces.                                                             |

### PDF-bearbetning

| Teknik             | Varför                                                                                                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **pdf.js**         | Mozillas PDF-renderingsbibliotek, används helt i webbläsaren. Konverterar första sidan i en uppladdad PDF till en högupplöst PNG-bild (4x skala) för visuell förhandsvisning. Ingen bearbetning på serversidan behövs - allt körs på klienten.     |
| **react-dropzone** | Tillgänglighetsanpassad drag-and-drop-komponent för filuppladdning. Hanterar filvalidering (enbart PDF, max 20 MB) och ger ett rent användargränssnitt för filval.                                                                                 |

### Bygg & Utveckling

| Teknik     | Varför                                                                                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vite 8** | Extremt snabb utvecklingsserver med hot module replacement. Vites ES-modulbaserade angreppssätt ger omedelbar uppstart oavsett projektstorlek, och produktionsbygget använder Rolldown för optimerad output.      |
| **Docker** | Multi-stage Dockerfile som producerar en minimal Alpine-baserad produktionsimage. Separerar beroendeinstallation, bygg och körning för att hålla slutliga imagen liten och säker.                                 |

### Testning & Kvalitet

| Teknik                     | Varför                                                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Jest + Testing Library** | Komponenttester verifierar att UI-element renderas korrekt med mockdata. Testing Library uppmuntrar till testning ur användarens perspektiv (sökning på roll, text och etiketter) snarare än implementationsdetaljer.                 |
| **Lighthouse CI**          | Automatiserade granskningar av prestanda, tillgänglighet, bästa praxis och SEO körs mot produktionsbygget. Tillser minimala poänggränser (80%+ tillgänglighet, 90%+ bästa praxis) för att upprätthålla kvalitetsstandarden.           |

---

## Projektstruktur

```
app/
  components/       UI-komponenter (Accordion, ATS, FileUploader, ScoreGauge m.fl.)
  lib/
    puter.ts        Zustand-store som wrappar hela Puter.js SDK
    pdf2img.ts      PDF-till-bild-konvertering på klientsidan
  routes/
    home.tsx        Dashboard som visar alla tidigare CV-analyser
    auth.tsx        Autentiseringssida med Puter-inloggning
    upload.tsx      Uppladdningsformulär med jobbdetaljer
    resume.tsx      Detaljerad feedbackvy för ett enskilt CV
  utils/            Hjälpfunktioner (cn, formatSize, generateUUID)
constants/          AI-promptmallar och definitioner för svarsformat
types/              Globala TypeScript-interfaces (Resume, Feedback m.fl.)
__tests__/          Komponenttester
```

---

## Kom igång

### Förutsättningar

- Node.js 20+
- npm

### Installera & kör

```bash
# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
```

Appen finns tillgänglig på `http://localhost:5173`.

### Kör tester

```bash
npm test
```

### Produktionsbygg

```bash
npm run build
npm run start
```

### Docker

```bash
docker build -t resumate .
docker run -p 3000:3000 resumate
```

---

## Hur AI-analysen fungerar

När en användare skickar in ett CV gör appen följande:

1. Laddar upp PDF:en till Puters molnlagring.
2. Konverterar första sidan till en PNG-förhandsvisning med pdf.js.
3. Skickar filen till Claude med en strukturerad prompt som instruerar modellen att agera som en senior rekryterare och ATS-specialist.
4. Prompten begär poäng (0-100) och tips inom fem kategorier: ATS-kompatibilitet, ton & stil, innehållskvalitet, struktur och kompetenser.
5. Claude returnerar ett JSON-objekt som matchar appens `Feedback` TypeScript-interface.
6. Svaret parsas och sparas i Puters key-value-store, och renderas sedan som en interaktiv rapport med animerade poängmätare, färgkodade framstegsindikatorer och expanderbara tips-sektioner.

---

## Arkitekturbeslut

**Ingen traditionell backend** - Genom att använda Puter.js körs hela appen på klientsidan. Autentisering, fillagring, databas och AI-inferens hanteras allt genom Puters SDK. Det innebär noll serverkostnader och inga API-nycklar att hantera.

**Strukturerad AI-output** - Prompten innehåller det exakta TypeScript-interfacet som svaret måste följa. Det gör parsningen pålitlig och håller feedbackformatet konsekvent över alla analyser.

**PDF-rendering på klientsidan** - Istället för att förlita sig på en server för att generera miniatyrbilder renderar pdf.js CV:t direkt i webbläsaren med 4x upplösning. Det håller arkitekturen enkel och undviker flaskhalsar vid filbearbetning.

**Zustand istället för Context** - En enda Zustand-store hanterar alla Puter-interaktioner. Det undviker problem med omrendering som uppstår med djupt nästlade React Context och håller API-ytan ren.

---

## Vad jag skulle förbättra

Det här projektet byggdes som ett portfolioprojekt inom en begränsad tidsram. Om jag skulle fortsätta utveckla det är det här de områden jag skulle fokusera på.

### Felhantering & Robusthet

Uppladdningsflödet är fokuserat på lyckade scenarion. Om AI-svaret kommer tillbaka felformaterat eller nätverket tappar anslutningen mitt i analysen ser användaren ett generiskt statusmeddelande men har inget sätt att försöka igen eller förstå vad som gick fel. Jag skulle lägga till error boundaries, logik för att försöka igen vid misslyckade API-anrop och användarvänliga felmeddelanden med tydliga nästa steg.

### Testtäckning

Bara tre komponenter har enhetstester (Navbar, ScoreCircle, ResumeCard). Uppladdningsflödet, parsningen av AI-svar och Puter-storen saknar testtäckning. Jag skulle lägga till integrationstester för hela uppladdning-till-feedback-kedjan, testa JSON-parsningen av AI-svar med kantfall (trunkerade svar, oväntat format) och lägga till tester för autentiseringsflödet.

### Stöd för flersidiga CV:n

PDF-till-bild-konverteringen renderar bara första sidan. För CV:n längre än en sida saknas innehåll i förhandsvisningen medan AI:n fortfarande analyserar hela dokumentet - den visuella representationen matchar inte. Jag skulle rendera alla sidor till en scrollbar förhandsvisning och eventuellt sy ihop dem till en sammansatt bild.

### Laddnings- & Skelettvyer

När CV:n laddas på startsidan eller när feedbackvyn hämtar data visar gränssnittet antingen ingenting eller en GIF-animering. Skelettvyer skulle ge användarna en känsla för layouten innan innehållet anländer och kännas mer polerat än en generisk laddningsanimering.

### Radera & Analysera igen

Det finns inget sätt att radera en tidigare CV-analys eller köra om analysen med uppdaterade jobbdetaljer. Användarna är låsta vid det de skickade in. Att lägga till raderingsfunktionalitet och en "analysera igen"-knapp skulle göra dashboarden faktiskt användbar för att iterera på ett CV över tid.

### Tillgänglighet

Även om Lighthouse CI tillser en tillgänglighetspoäng på 80% finns det brister. Filuppladdningsytan saknar korrekta ARIA-etiketter för skärmläsare, poängmätarens SVG har inget tillgängligt textalternativ och tangentbordsnavigering genom dragspelssektionerna kunde vara smidigare. En grundlig tillgänglighetsrevision med en skärmläsare skulle upptäcka fler problem.

### Responsiv Finslipning

Layouten fungerar på mobilen men vissa element (inloggningsknappen med 600px fast bredd, CV-kortgalleriet) kunde anpassa sig smidigare till mellanstora skärmar. Feedbackvyns sida-vid-sida-layout hoppar abrupt från två kolumner till staplade vid `lg`-brytpunkten utan något mellansteg.

### Frekvensbegränsning & Kostnadsmedvetenhet

AI-feedbackfunktionen använder för närvarande mockdata eftersom Puter AI-krediterna tog slut under utvecklingen. I en produktionsversion skulle jag lägga till frekvensbegränsning (t.ex. max 5 analyser per dag per användare), visa användarna deras återstående krediter och hantera otillgänglighet hos AI-tjänsten på ett gracefullt sätt istället för att tyst returnera mockdata.

### Formulärvalidering

Uppladdningsformuläret har ingen validering på klientsidan utöver filtypskontrollen i dropzone-komponenten. Företagsnamn, jobbtitel och jobbeskrivning accepterar vilken indata som helst utan längdbegränsningar eller sanering. Att lägga till korrekt validering med inline-felmeddelanden skulle förebygga onödiga API-anrop och förbättra användarupplevelsen.

---

Byggt av Gong Moonphruk
