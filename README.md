# Gang Yang — Academic Portfolio

A one-page academic portfolio for Gang Yang, with a restrained Bauhaus-inspired visual system.

## Local preview

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate a production build

```bash
npm run build
npm test
```

The main page is in `app/page.tsx`, the visual system is in `app/globals.css`, and all public photos, papers, and CV files are in `public/`.

## Content included

- About Me
- News
- Selected Publications
- Education
- Research Projects
- Professional Experience

The layout is responsive and includes reduced-motion and keyboard-focus support.

## Private visitor trends

The statistics backend stores `visitor_hourly_countries`: `hour_start_sgt`
(hour start in Asia/Singapore, UTC+08:00), `country_code`, and `views`.
Each accepted page-view POST increments a country/hour bucket atomically with
the existing lifetime counters. Unresolved countries use `UNKNOWN`.
Hourly records older than twelve months are pruned on the next counted visit.
Lifetime counters are retained. Historical hourly data cannot be reconstructed.

These rows are available only through the authenticated Sites database viewer
or database connector; no public trends endpoint is added. Ask for a date range
and country to retrieve and summarize the records. Public API responses and the
portfolio display continue to expose only lifetime totals and country codes.
No visitor identifier, analytics cookie, localStorage, IP address, precise
per-visit timestamp, or browser fingerprint is stored by this feature.
Hosting providers may independently process connection logs.

Run backend aggregation tests with `node --test tests/visitor-trends.test.mjs`.
