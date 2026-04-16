🇬🇧 English | [🇸🇪 Svenska](README.sv.md)

# Resumate - AI Resume Analyzer

Upload your resume as a PDF, optionally add the job you're targeting, and get instant AI-powered feedback on ATS compatibility, tone, content, structure, and skills - scored and explained with actionable tips.

**Try it live:** [resumate-ai-analyzer.vercel.app](https://resumate-ai-analyzer.vercel.app/auth?next=/)

---

## How It Works

1. **Upload** a PDF resume with optional company name, job title, and job description.
2. **AI Analysis** - Claude (Anthropic) evaluates the resume as a senior recruiter and ATS specialist, returning structured feedback.
3. **Visual Report** - Overall score, category breakdowns, and specific tips labeled as strengths or improvements.
4. **Dashboard** - Past analyses saved to your account so you can track progress over time.

---

## Tech Stack

| Area | Technologies |
|------|-------------|
| **Frontend** | React 19, React Router 7 (SSR, file-based routing), TypeScript |
| **Styling** | Tailwind CSS 4, tailwind-merge, tw-animate-css |
| **State** | Zustand |
| **AI** | Claude via Puter.js SDK |
| **PDF** | pdf.js (client-side rendering), react-dropzone |
| **Build** | Vite 8, Docker (multi-stage Alpine image) |
| **Testing** | Jest + Testing Library, Lighthouse CI |
| **Deploy** | Vercel |

---

## Project Structure

```
app/
  components/       UI components (Accordion, ATS, FileUploader, ScoreGauge, etc.)
  lib/
    puter.ts        Zustand store wrapping the Puter.js SDK
    pdf2img.ts      Client-side PDF-to-image conversion
  routes/
    home.tsx        Dashboard - all past analyses
    auth.tsx        Authentication page
    upload.tsx      Resume upload form
    resume.tsx      Detailed feedback view
  utils/            Helpers (cn, formatSize, generateUUID)
constants/          AI prompt templates and response format definitions
types/              TypeScript interfaces (Resume, Feedback, etc.)
__tests__/          Component tests
```

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm test           # run tests
npm run build      # production build
npm run start
```

```bash
docker build -t resumate .
docker run -p 3000:3000 resumate
```

---

## Key Architecture Decisions

- **No traditional backend** - Puter.js handles auth, storage, database, and AI from the client. Zero server costs, no API keys to manage.
- **Structured AI output** - The prompt includes the exact TypeScript interface the response must match, making parsing reliable.
- **Client-side PDF rendering** - pdf.js renders resumes in the browser at 4x resolution, no server processing needed.
- **Zustand over Context** - Single store for all Puter interactions, avoiding re-render issues from deeply nested Context.

---

## What I Would Improve

- **Error handling** - Add error boundaries, retry logic, and user-friendly error states for failed analyses.
- **Test coverage** - Integration tests for the full upload-to-feedback pipeline and AI response edge cases.
- **Multi-page PDFs** - Render all pages in preview, not just the first.
- **Skeleton loaders** - Replace generic loading animations with layout-aware placeholders.
- **Delete & re-analyze** - Let users remove old analyses and re-run with updated job details.
- **Accessibility** - Improve ARIA labels, SVG alternatives, and keyboard navigation.
- **Rate limiting** - Cap daily analyses per user and show remaining credits.
- **Form validation** - Add length limits and inline error messages to input fields.
