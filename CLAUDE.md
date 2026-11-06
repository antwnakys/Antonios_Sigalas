# CLAUDE.md — project memory

Context for Claude sessions working on this repo. Keep it current: when a
decision is made or the site changes shape, update this file in the same commit.

## What this is
Personal portfolio for **Antonis Sigalas** (GitHub `antwnakys`) — computer
science student in Athens, Greece, building with Python and the Claude API,
interested in cybersecurity and AI.

- Live: https://antoniossigalas.com (custom domain via `CNAME`; GitHub Pages
  also serves https://antwnakys.github.io/Antonios_Sigalas/)
- Every file committed to `main` is publicly downloadable from the site — never
  commit backups, zips, CVs, or anything private.

## Stack & files
Plain static site, no build step, no dependencies, no framework.
- `index.html` — all content, one page
- `styles.css` — design tokens on `:root` (`--bg #0a0a0f`, `--accent #6d7cff`,
  `--grad` indigo→cyan), breakpoints at 900px and 560px, `prefers-reduced-motion`
- `main.js` — vanilla IIFE, progressive enhancement only: footer year,
  `.reveal` scroll-in via IntersectionObserver, nav scrollspy, `.nav.scrolled`
  border, top scroll-progress bar (rAF-throttled)
- Fonts: Inter (body), Space Grotesk (display), JetBrains Mono (mono)
- Preview: `python3 -m http.server 8000`

## Page structure (section ids)
`#hero` → `#about` (01) → `#skills` (02) → `#work` → `#certs` → `#contact`.
If you add/rename a section, also update the `sections` array in `main.js`
and the `data-nav` links in the header.

- **Skills:** Python (main), JS/TS, HTML/CSS; Claude API, prompt design, tool
  integration; GitHub Actions, Vercel, Supabase, pytest; security fundamentals
  (networking, hashing, web security, OWASP headers, JWT/auth, TOTP).
- **Work:** featured **Grip OBD** (iOS, App Store id6801558613), then repo
  cards: security-toolkit, reconforge, phish-analyzer, log-sentinel,
  credential-checker, jwt-inspector, totp-authenticator, tech-news-agent,
  paper-trader, carro, ctf-writeups, plus "See all 29 repositories".
- **Credentials:** Anthropic — AI Fluency: Framework & Foundations, Claude 101,
  Claude Code 101, Claude Platform 101, Introduction to Claude Cowork, Claude
  Code in Action. English — ESB Level 2 ESOL International, Michigan ECCE.
- **Contact:** antonsig08@gmail.com, GitHub, LinkedIn
  (`/in/antonis-sigalas-836109335/`).

## Decisions & preferences (don't undo)
- Display name is **"Antonis"** (repo name says Antonios — leave the repo name).
- Framing: honest **CS student** who learns by building and shipping — not a
  senior/professional security expert. Professional, understated tone; no hype.
- Content comes from his real CV and real public repos. Don't invent projects,
  metrics, employers, or certifications. Update the "29 repositories" count only
  from the real GitHub profile.
- Look: premium dark, editorial-tech. **Performance first** — animated blobs,
  cursor glow, and `backdrop-filter` blur were removed because they lagged on
  low-end GPUs. Keep the static glow; don't reintroduce heavy GPU effects,
  large animated backgrounds, or JS animation loops.
- Respect `prefers-reduced-motion`; keep it accessible and fast on mobile.

## Known to-dos
- `README.md` section list is out of date (missing Skills; lists the
  github.io URL rather than antoniossigalas.com).

## History
1. Initial portfolio → 2. dark editorial-tech redesign → 3. name "Antonis",
   professional copy → 4. custom domain → 5. CV-based content overhaul
   (Skills, Grip OBD, real repos, English certs) → 6. perf pass (removed GPU
   effects) → 7. removed an accidentally uploaded repo-backup zip (Nov 2026).
