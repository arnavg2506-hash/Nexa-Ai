# NEXA AI

NEXA AI is an India-wide real estate decision-intelligence product for land, homes, corridors and investment workflows. It is a Next.js application with an AI copilot, interactive national corridor map, comparison engine, investor dashboard, district reports and a Resend-powered private briefing workflow.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

```text
OPENAI_API_KEY=                 # Optional; deterministic fallback works without it
OPENAI_MODEL=gpt-5.6-terra     # Balanced copilot route
NEXT_PUBLIC_MAPBOX_TOKEN=      # Optional; the SVG intelligence map remains available
NEXT_PUBLIC_SITE_URL=https://your-domain.com
DATABASE_URL=postgresql://...

RESEND_API_KEY=re_...
RESEND_FROM=NEXA AI <intelligence@your-verified-domain.com>
NEXA_EMAIL_TO=founder@your-domain.com
```

For Resend delivery, verify your sending domain, create an API key and configure the three Resend variables. Without them, local development validates the briefing form in preview mode; production returns a clear unavailable response instead of pretending an email was sent.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run build:next
npm audit
```

## Data and risk boundary

The bundled district scores, rates, forecasts and corridor intelligence are illustrative product-demo data. A production launch needs licensed or authoritative sources, timestamps, source lineage, parcel-level legal verification and professional financial/valuation review. NEXA must never present demo estimates as live records or guaranteed outcomes.

## Repository layout

- `app/`, `components/`, `lib/`, `prisma/`, `public/`: NEXA AI
- `rasa-eclat/`: a separate Vite storefront preserved from an accidental root-level configuration collision

## Deployment checklist

- Set all production environment variables in the hosting provider.
- Verify the Resend sender domain and use an inbox that can receive replies.
- Connect PostgreSQL and apply the Prisma schema.
- Replace sample intelligence with source-attributed live data.
- Add durable distributed rate limiting at the edge or API gateway.
- Run the full quality checks and smoke-test `/`, `/map`, `/compare`, `/dashboard`, `/api/copilot` and `/api/access`.
