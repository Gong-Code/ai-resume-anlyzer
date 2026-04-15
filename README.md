# Resumate - AI Resume Analyzer

Resumate is a web application that gives job seekers instant, AI-powered feedback on their resumes. Upload a PDF, optionally enter the job you're targeting, and receive a detailed breakdown covering ATS compatibility, tone, content quality, structure, and skills - all scored and explained with actionable tips.

**Live demo:** Hosted on [Puter](https://puter.com) - no backend server required.

---

## What It Does

1. **Upload** your resume as a PDF along with an optional company name, job title, and job description.
2. **AI Analysis** - The resume is sent to Claude (Anthropic's LLM) through the Puter.js SDK. The model acts as a senior recruiter and ATS specialist, returning structured JSON feedback.
3. **Visual Report** - You get an overall score, category breakdowns (ATS, Tone & Style, Content, Structure, Skills), and specific tips labelled as strengths or areas to improve.
4. **Dashboard** - All past analyses are saved to your account and displayed on the home page so you can track progress over time.

---

## Tech Stack

### Core Framework

| Technology         | Why                                                                                                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19**       | Latest version with improved rendering performance. React's component model keeps the UI modular - each feedback section (ATS panel, score gauge, accordion details) is its own isolated component.                              |
| **React Router 7** | Full-stack React framework with file-based routing, server-side rendering, and built-in data loading. Chose this over Next.js for its lighter footprint and native support for deploying as a simple Node server or static site. |
| **TypeScript**     | Every component, store, and utility is typed. TypeScript catches bugs at build time rather than in production - especially important when parsing structured AI responses into typed interfaces like `Feedback` and `Resume`.    |

### Styling

| Technology         | Why                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tailwind CSS 4** | Utility-first CSS that keeps styles co-located with markup. No separate stylesheet files to maintain. The latest v4 uses a Vite plugin for near-instant builds and supports the new `@theme` configuration. |
| **tailwind-merge** | Safely merges conditional Tailwind classes without conflicts. Used in the `cn()` utility to build dynamic class strings for score-based color theming (green/amber/red).                                    |
| **tw-animate-css** | Adds CSS animation utilities like `animate-in` and `fade-in` for smooth transitions when feedback sections load.                                                                                            |

### State Management

| Technology  | Why                                                                                                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Zustand** | Lightweight state manager (< 1 KB) that replaces React Context for global state. The entire Puter.js integration (auth, file system, AI, key-value storage) lives in a single Zustand store. Chose Zustand over Redux for its minimal boilerplate - no action creators, reducers, or providers needed. |

### AI & Backend Services

| Technology                | Why                                                                                                                                                                                                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Puter.js**              | Cloud platform SDK that provides authentication, file storage, key-value database, and AI model access - all from the client side. This eliminates the need for a traditional backend server, database, or separate AI API key management. Users sign in through Puter and all data persists in their cloud account. |
| **Claude (via Puter AI)** | Anthropic's Claude Sonnet model analyzes resumes using a detailed prompt that evaluates ATS compatibility, keyword matching, section-by-section review, and impact metrics. The AI returns structured JSON that maps directly to the app's TypeScript interfaces.                                                    |

### PDF Processing

| Technology         | Why                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **pdf.js**         | Mozilla's PDF rendering library, used entirely in the browser. Converts the first page of an uploaded PDF into a high-resolution PNG image (4x scale) for visual preview. No server-side processing needed - everything runs on the client. |
| **react-dropzone** | Accessible drag-and-drop file upload component. Handles file validation (PDF only, 20 MB max) and provides a clean UX for file selection.                                                                                                   |

### Build & Development

| Technology | Why                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vite 8** | Blazing-fast dev server with hot module replacement. Vite's native ES module approach means instant startup regardless of project size, and the production build uses Rolldown for optimized output. |
| **Docker** | Multi-stage Dockerfile produces a minimal Alpine-based production image. Separates dependency installation, build, and runtime stages to keep the final image small and secure.                      |

### Testing & Quality

| Technology                 | Why                                                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Jest + Testing Library** | Component tests verify that UI elements render correctly with mock data. Testing Library encourages testing from the user's perspective (querying by role, text, and labels) rather than implementation details.  |
| **Lighthouse CI**          | Automated performance, accessibility, best practices, and SEO audits run against the production build. Enforces minimum score thresholds (80%+ accessibility, 90%+ best practices) to maintain quality standards. |

---

## Project Structure

```
app/
  components/       UI components (Accordion, ATS, FileUploader, ScoreGauge, etc.)
  lib/
    puter.ts        Zustand store wrapping the entire Puter.js SDK
    pdf2img.ts      Client-side PDF to image conversion
  routes/
    home.tsx        Dashboard showing all past resume analyses
    auth.tsx        Authentication page using Puter sign-in
    upload.tsx      Resume upload form with job details
    resume.tsx      Detailed feedback view for a single resume
  utils/            Helper functions (cn, formatSize, generateUUID)
constants/          AI prompt templates and response format definitions
types/              Global TypeScript interfaces (Resume, Feedback, etc.)
__tests__/          Component tests
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Run Tests

```bash
npm test
```

### Production Build

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

## How the AI Analysis Works

When a user submits a resume, the app:

1. Uploads the PDF to Puter cloud storage.
2. Converts the first page to a PNG preview using pdf.js.
3. Sends the file to Claude with a structured prompt that instructs the model to act as a senior recruiter and ATS specialist.
4. The prompt requests scores (0-100) and tips across five categories: ATS compatibility, tone & style, content quality, structure, and skills.
5. Claude returns a JSON object matching the app's `Feedback` TypeScript interface.
6. The response is parsed and saved to Puter's key-value store, then rendered as an interactive report with animated score gauges, color-coded progress bars, and expandable tip sections.

---

## Architecture Decisions

**No traditional backend** - By using Puter.js, the entire app runs client-side. Authentication, file storage, database, and AI inference are all handled through Puter's SDK. This means zero server costs and no API keys to manage.

**Structured AI output** - The prompt includes the exact TypeScript interface the response must conform to. This makes parsing reliable and keeps the feedback format consistent across analyses.

**Client-side PDF rendering** - Instead of relying on a server to generate thumbnails, pdf.js renders the resume directly in the browser at 4x resolution. This keeps the architecture simple and avoids file processing bottlenecks.

**Zustand over Context** - A single Zustand store manages all Puter interactions. This avoids the re-render issues that come with deeply nested React Context and keeps the API surface clean.

---

## What I Would Improve

This project was built as a portfolio piece within a limited timeframe. If I were to continue developing it, these are the areas I would focus on next.

### Error Handling & Resilience

The upload flow has a happy-path focus. If the AI response comes back malformed or the network drops mid-analysis, the user sees a generic status message but has no way to retry or understand what went wrong. I would add proper error boundaries, retry logic for failed API calls, and user-friendly error states with clear next steps instead of dead-end messages.

### Test Coverage

Only three components have unit tests (Navbar, ScoreCircle, ResumeCard). The core upload flow, AI response parsing, and the Puter store have no test coverage. I would add integration tests for the full upload-to-feedback pipeline, test the JSON parsing of AI responses with edge cases (truncated responses, unexpected fields), and add tests for the authentication flow.

### Multi-Page Resume Support

The PDF-to-image conversion only renders the first page. For resumes longer than one page, the preview misses content and the AI still analyzes the full document but the visual doesn't match. I would render all pages into a scrollable preview and potentially stitch them into a single image for a complete visual representation.

### Loading & Skeleton States

When resumes load on the home page or when the feedback view fetches data, the UI either shows nothing or a GIF animation. Proper skeleton loaders would give users a sense of the layout before content arrives and feel more polished than a generic loading animation.

### Delete & Re-analyze

There is no way to delete a past resume analysis or re-run the analysis with updated job details. Users are stuck with whatever they submitted. Adding delete functionality and a "re-analyze" button would make the dashboard actually useful for iterating on a resume over time.

### Accessibility

While Lighthouse CI enforces an 80% accessibility score, there are gaps. The file upload area lacks proper ARIA labels for screen readers, the score gauge SVG has no accessible text alternative, and keyboard navigation through the accordion sections could be smoother. A thorough accessibility audit with a screen reader would surface more issues.

### Responsive Polish

The layout works on mobile but some elements (the auth button at 600px fixed width, the resume card grid) could adapt more gracefully to mid-size screens. The feedback view's side-by-side layout jumps abruptly from two columns to stacked at the `lg` breakpoint with no intermediate state.

### Rate Limiting & Cost Awareness

The AI feedback function currently uses mock data because Puter AI credits ran out during development. In a production version, I would add rate limiting (e.g., max 5 analyses per day per user), show users their remaining credits, and gracefully degrade when the AI service is unavailable rather than silently returning mock data.

### Form Validation

The upload form has no client-side validation beyond the file type check in the dropzone. Company name, job title, and job description fields accept any input with no length limits or sanitization. Adding proper validation with inline error messages would prevent wasted API calls and improve the user experience.

---
