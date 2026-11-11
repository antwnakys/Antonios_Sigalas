# CLAUDE.md — project memory

Context for Claude sessions working on this repo. Keep it current: when a
decision is made or the site changes shape, update this file in the same commit.

## What this is
Personal portfolio for **Antonis Sigalas** (GitHub `antwnakys`) — computer
science student in Athens, Greece, building with Python and the Claude API,
interested in cybersecurity and AI.

- Live: https://antoniossigalas.com, served by **GitHub Pages** (custom domain
  via `CNAME`; `www.` 301-redirects to the apex). Merging to `main` redeploys
  in ~1–2 min ("pages build and deployment" run). Pages sends
  `cache-control: max-age=600`, so browsers may show old JS for up to 10 min.
- DNS for antoniossigalas.com is on **Cloudflare** (free plan). It also carries
  the mail records for OpenInbox (MX, SPF, DKIM, DMARC, Resend records) — don't
  remove DNS records without checking OpenInbox → Admin → Domains.
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
- **Contact:** dev@antoniossigalas.com (his OpenInbox; was his Gmail until Nov 2026), GitHub, LinkedIn
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
- `main.js` has a hidden keyboard shortcut (a typed code word) that opens his
  self-hosted OpenInbox mail app at `mail.antoniossigalas.com` (a Cloudflare
  Worker in his own account). Keep it invisible — no UI element. It is not a
  security control; the app relies on its own login + 2FA.

## OpenInbox (self-hosted email, set up Nov 2026)
Separate from this repo; lives in his Cloudflare account. Facts only — never
store tokens, keys or passwords here (this file is public).
- Source: his private copy `antwnakys/openinbox`, an import of `sums001/OpenInbox`
  ("source repo import" commit; it has **no** `.github` Sync upstream workflow).
  It carries his own features on top of upstream (merged by hand and re-tested
  when updating): **Intercom** (WinguSuite-style internal mail between inboxes,
  with a per-inbox Intercom folder, Intercom also in the Inbox, and a small
  walkie-talkie icon), user **nicknames** (sign in with them; type them in
  Intercom), a fix so "All inboxes" works with more than 5 inboxes (a D1 query
  limit made it show "Inbox zero"), and push-notification code that is unused
  now. Details: that repo's CLAUDE.md. Pushing to its `main` redeploys
  the Worker. Never click the Deploy to Cloudflare button again (it creates a
  second instance).
- Cloudflare: Worker `openinbox` + D1 database `openinbox`, R2 bucket
  `openinbox-mail` for attachments (card on file; free tier 10 GB, $1 budget
  alert). Preview builds off.
- URLs: `https://mail.antoniossigalas.com` (custom domain) and
  `openinbox.antonsig08.workers.dev`. Owner/sign-in: `admin@antoniossigalas.com`,
  2FA on. Sending via Resend free tier (100/day, 3,000/month limits set).
- Stay on free tiers: don't enable Cloudflare Email Sending (Workers Paid).
- Secrets (Cloudflare token, recovery key, Resend key, R2 keys) are entered only
  into OpenInbox/Cloudflare UIs — remind him never to paste them into chat.
- iPhone app **Antonis Mail** (`antwnakys/openinbox-app`, private): Expo SDK 58
  WebView shell around mail.antoniossigalas.com, **no push notifications** (his
  choice), Intercom hidden in it (web-only). TestFlight only (never the public
  App Store), built with EAS on his Mac with his Apple Developer account. Build 2
  is installed; build 3 ("feel like an app" fixes) is waiting to be built.
  TestFlight builds expire after 90 days. Details: that repo's CLAUDE.md/TODO.md.
- Claude cloud environment `Antonios_Sigalas` allows antoniossigalas.com, www,
  mail. and antwnakys.github.io, so sessions can test the live site.

## Known to-dos
- None right now.

## History
1. Initial portfolio → 2. dark editorial-tech redesign → 3. name "Antonis",
   professional copy → 4. custom domain → 5. CV-based content overhaul
   (Skills, Grip OBD, real repos, English certs) → 6. perf pass (removed GPU
   effects) → 7. removed an accidentally uploaded repo-backup zip (Nov 2026)
   → 8. set up OpenInbox at mail.antoniossigalas.com and added the hidden
   keyboard shortcut in `main.js` (Nov 2026; verified on the live site)
   → 9. started the Antonis Mail iPhone app + push notifications in his
   OpenInbox copy (Nov 2026) → 10. app on his iPhone via TestFlight, push
   dropped; OpenInbox gained Intercom, nicknames, per-inbox Intercom folders,
   Intercom in the Inbox and a walkie-talkie icon, and "All inboxes" was fixed
   for 6+ inboxes (Nov 6–11, 2026) → 11. contact email switched to
   dev@antoniossigalas.com, README brought up to date (Nov 11, 2026).
