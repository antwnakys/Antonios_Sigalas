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
- Monitored: an hourly uptime check (GitHub Action in his private openinbox
  repo) loads this homepage and the mail server; if either fails 3 times in a
  row, GitHub emails him (since Nov 12, 2026).
- DNS for antoniossigalas.com is on **Cloudflare** (free plan). It also carries
  the mail records for OpenInbox (MX, SPF, DKIM, DMARC, Resend records) — don't
  remove DNS records without checking OpenInbox → Admin → Domains. DMARC was
  tightened on Nov 11, 2026 to `v=DMARC1; p=quarantine; adkim=r; aspf=r`
  (OpenInbox's Repair doesn't overwrite an existing DMARC record).
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
- `README.md`: written with the readme-writer skill. It's at grade 7 on Flesch-Kincaid, with 51% of
  words in the top 1,000; keep it at grade 9 or below and in plain English. Its screenshots are in
  `docs/` (`screenshot-desktop.jpg` 1440px, `screenshot-phone.jpg` iPhone 15 Pro). Retake them when
  the hero changes. Don't mention the hidden mail shortcut or the mail subdomain in it.
- **No horizontal overflow on phones:** `.hero > * { min-width: 0 }` (the terminal's `white-space:
  pre` lines used to widen the page to about 411px on a 320px phone), `minmax(min(Npx, 100%), 1fr)`
  in the skills, certs and work grids, `.contact .btn` may wrap, and the hero buttons stay on one
  line. Check new content at 320px (`documentElement.scrollWidth` must equal the viewport).

## Page structure (section ids)
`#hero` → `#about` (01) → `#skills` (02) → `#work` → `#certs` → `#contact`.
If you add/rename a section, also update the `sections` array in `main.js`
and the `data-nav` links in the header.

- **Skills:** Python (main), JS/TS, HTML/CSS; Claude API, prompt design, tool
  integration; GitHub Actions, Vercel, Supabase, pytest; security fundamentals
  (networking, hashing, web security, OWASP headers, JWT/auth, TOTP).
- **Work:** featured **Grip OBD** (iOS, App Store id6801558613), then a
  non-link card **openinbox** (his self-hosted mail + Antonis Mail app; private
  repos, `.work-card--static` with a "Private repo" note; never link the mail
  site from it, the shortcut stays hidden), then repo cards: security-toolkit, reconforge, phish-analyzer, log-sentinel,
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
  limit made it show "Inbox zero"), inbox colours, a tidier sidebar, and a
  **weekly backup** (GitHub Action, Sundays 03:17 UTC) of the D1 database to R2
  `openinbox-mail/backups/` (repo secret `CLOUDFLARE_BACKUP_TOKEN`; first run
  succeeded Nov 11, 2026; restore steps in its `BACKUP.md`). The unused push
  code was removed. Its `FORFUTURE/` folder holds a ready plan and setup script
  for a second, separate OpenInbox on a future domain (start there when he says
  "read FORFUTURE"). Details: that repo's CLAUDE.md. Pushing to its `main` redeploys
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
  choice), Intercom included (shown in the app since Nov 12, 2026). TestFlight only (never the public
  App Store), built with EAS on his Mac with his Apple Developer account. The
  OpenInbox has a full phone layout (swipe actions, floating Compose,
  full-screen reading/writing, instant start; Nov 11, 2026), which the app
  shows without a rebuild. Build 1.0.0 (6) (haptics) is installed (Nov 12);
  build 7 (Face ID lock) is committed and waiting to be built on his Mac. A
  scheduled reminder fires Feb 3, 2027 to rebuild before TestFlight expiry.
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
   dev@antoniossigalas.com, README brought up to date (Nov 11, 2026)
   → 12. OpenInbox weekly backups live, DMARC set to quarantine, app build
   1.0.0 (5) submitted to TestFlight, FORFUTURE plan written (Nov 11, 2026)
   → 13. iPhone redesign of OpenInbox's phone layout + app haptics (Nov 11, 2026)
   → 14. build 6 installed; Intercom shown in the iPhone app (Nov 12, 2026)
   → 15. OpenInbox synced with upstream (security fixes, sender logos), phone
   swipe settings, Face ID lock committed for app build 7, expiry reminder
   scheduled for Feb 3, 2027, openinbox card on the portfolio (Nov 12, 2026)
   → 16. first live end-to-end test of OpenInbox from a Claude session (all
   green; procedure in that repo's CLAUDE.md, "Testing the live site") and an
   hourly uptime check of the site and the mail server (Nov 12, 2026)
   → 17. README rewritten with the readme-writer skill (badges, screenshots,
   grade 7), and the phone overflow bug fixed (page was wider than the
   screen; Nov 12, 2026).
