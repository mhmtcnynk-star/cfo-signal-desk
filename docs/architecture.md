# Architecture Overview

## Product Layer

CFO Signal Desk is a single-page executive cockpit optimized for a five-minute finance readout. The dashboard combines:

- Today's Brief
- Risk detection
- Opportunity callouts
- FX, inflation, interest-rate, liquidity, and supply-chain signals
- Company priorities
- Action items
- Tomorrow's watchlist

## Application Layer

- `app/page.tsx` renders the cockpit, stores selected company priorities, and calls the brief-generation endpoint.
- `app/globals.css` defines the responsive Bloomberg-meets-Linear visual system.
- `app/api/brief/route.ts` owns brief generation and keeps the demo resilient.

## AI Layer

The route uses the OpenAI Responses API when `OPENAI_API_KEY` is available. It requests strict JSON with:

- `executiveSummary`
- `keySignals`
- `financialImpact`
- `operationalImpact`
- `recommendedDecisions`
- `tomorrowWatchlist`

If the OpenAI request fails or no key is configured, the route returns a deterministic local brief. This keeps demos reliable for Build Week judging.

## Data Layer

The MVP uses realistic sample macro, FX, inflation, rates, liquidity, and supply-chain signals. No external market-data API is required.

Future production data sources:

- FX and rates market data
- CPI and central-bank calendars
- Commodity feeds
- ERP/AP/AR exports
- Treasury and procurement systems

## Deployment Layer

The app is a TypeScript Next.js project and can be deployed to Vercel. The included Vinext setup also supports the local Sites build flow.
