[🇬🇧 English](README.md) | 🇸🇪 Svenska

# Resumate - AI-driven CV-analys

Ladda upp ditt CV som PDF, ange valfritt vilket jobb du soker, och fa omedelbar AI-feedback pa ATS-kompatibilitet, ton, innehall, struktur och kompetenser - poangsatt och forklarat med konkreta tips.

**Testa live:** [resumate-ai-analyzer.vercel.app](https://resumate-ai-analyzer.vercel.app/auth?next=/)

---

## Hur det fungerar

1. **Ladda upp** en PDF med valfritt foretagsnamn, jobbtitel och jobbeskrivning.
2. **AI-analys** - Claude (Anthropic) utvarderar CV:t som en senior rekryterare och ATS-specialist och returnerar strukturerad feedback.
3. **Visuell rapport** - Overgripande poang, kategoriuppdelning och specifika tips markerade som styrkor eller forbattringsomraden.
4. **Dashboard** - Tidigare analyser sparas pa ditt konto sa att du kan folja din utveckling over tid.

---

## Teknikstack

| Omrade | Tekniker |
|--------|----------|
| **Frontend** | React 19, React Router 7 (SSR, filbaserad routing), TypeScript |
| **Styling** | Tailwind CSS 4, tailwind-merge, tw-animate-css |
| **State** | Zustand |
| **AI** | Claude via Puter.js SDK |
| **PDF** | pdf.js (rendering i webblasaren), react-dropzone |
| **Bygg** | Vite 8, Docker (multi-stage Alpine-image) |
| **Test** | Jest + Testing Library, Lighthouse CI |
| **Deploy** | Vercel |

---

## Projektstruktur

```
app/
  components/       UI-komponenter (Accordion, ATS, FileUploader, ScoreGauge m.fl.)
  lib/
    puter.ts        Zustand-store som wrappar Puter.js SDK
    pdf2img.ts      PDF-till-bild-konvertering pa klientsidan
  routes/
    home.tsx        Dashboard - alla tidigare analyser
    auth.tsx        Autentiseringssida
    upload.tsx      Uppladdningsformular
    resume.tsx      Detaljerad feedbackvy
  utils/            Hjalpfunktioner (cn, formatSize, generateUUID)
constants/          AI-promptmallar och svarsformatdefinitioner
types/              TypeScript-interfaces (Resume, Feedback m.fl.)
__tests__/          Komponenttester
```

---

## Kom igang

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm test           # kor tester
npm run build      # produktionsbygg
npm run start
```

```bash
docker build -t resumate .
docker run -p 3000:3000 resumate
```

---

## Arkitekturbeslut

- **Ingen traditionell backend** - Puter.js hanterar autentisering, lagring, databas och AI fran klientsidan. Inga serverkostnader, inga API-nycklar.
- **Strukturerad AI-output** - Prompten innehaller det exakta TypeScript-interfacet som svaret maste folja, vilket gor parsningen palitlig.
- **PDF-rendering i webblasaren** - pdf.js renderar CV:t direkt i webblasaren med 4x upplosning, ingen serverbearbetning behövs.
- **Zustand istallet for Context** - En enda store for alla Puter-interaktioner, undviker omrenderingsproblem fran djupt nastlade Context.

---

## Vad jag skulle forbattra

- **Felhantering** - Error boundaries, retry-logik och anvandarvanliga felmeddelanden vid misslyckade analyser.
- **Testtackning** - Integrationstester for hela uppladdning-till-feedback-kedjan och kantfall i AI-svar.
- **Flersidiga PDF:er** - Rendera alla sidor i forhandsvisningen, inte bara forsta.
- **Skelettvyer** - Ersatt generiska laddningsanimationer med layoutmedvetna platshallare.
- **Radera & analysera igen** - Lat anvandare ta bort gamla analyser och kora om med uppdaterade jobbdetaljer.
- **Tillganglighet** - Forbattra ARIA-etiketter, SVG-alternativ och tangentbordsnavigering.
- **Frekvensbegransning** - Begransat antal analyser per dag per anvandare med visning av aterstaende krediter.
- **Formularvalidering** - Langdbegransningar och inline-felmeddelanden pa inmatningsfalt.
