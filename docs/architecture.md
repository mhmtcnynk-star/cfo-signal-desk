# Architecture Overview

## Product Layer

CFO Signal Desk is a single-page Personal Executive Decision Intelligence system optimized for a 60-second daily executive decision readout. The cockpit combines external CFO market signals with the user's personal and professional context:

- Best decision today
- Daily Decision Brief
- Personal Intelligence objects
- Source and evidence controls
- Decision Graph
- LinkedIn Intelligence
- Strategic Alignment Check
- Three most important actions today
- People to contact
- Items that can wait
- Tomorrow watchlist

The product constitution in `docs/product-constitution.md` is the governing product filter. No workflow should stop before reaching an executive recommendation.

Core transformation:

```text
External Signals + Personal Context
  -> Structured Intelligence Objects
  -> Decision Graph
  -> Relevant Objective and Constraints
  -> Decision Options
  -> Recommended Decision
  -> Immediate Action
  -> Success Metric and Monitoring
```

## Application Layer

- `app/page.tsx` renders the Daily Decision Brief, stores mock intelligence objects, models source controls, and presents the decision graph and LinkedIn Intelligence panel.
- `app/globals.css` defines the responsive Bloomberg-meets-Linear visual system.
- `app/api/brief/route.ts` owns brief generation and keeps the demo resilient.

## AI Layer

The route uses the OpenAI Responses API when `OPENAI_API_KEY` is available. It requests strict JSON with:

- `executiveSummary`
- `highestPriorityRisks`
- `opportunities`
- `recommendedDecisions`
- `immediateActions`
- `tomorrowWatchlist`

If the OpenAI request fails or no key is configured, the route returns a deterministic local brief. This keeps demos reliable for Build Week judging.

The prompt instructs the model to avoid generic personal-assistant behavior. It must combine market intelligence with confirmed user goals, constraints, commitments, relationships, and professional context while distinguishing facts from AI inference.

## Data Layer

The MVP uses a mocked ingestion layer. No external integration is required.

Supported intelligence object types:

- Goal
- Constraint
- Commitment
- Decision
- Open Decision
- Opportunity
- Risk
- Action
- Relationship
- Hypothesis
- Result
- Lesson
- Preference
- Strategic Priority

Prepared source categories:

- Chat conversations and daily notes
- LinkedIn profile and professional activity
- Career history, job pipeline, recruiter conversations
- Email, calendar, and tasks
- Financial context
- External market, economic, industry, and company signals

Future production data sources:

- FX and rates market data
- CPI and central-bank calendars
- Commodity feeds
- ERP/AP/AR exports
- Treasury and procurement systems
- LinkedIn and recruiter conversation history
- Calendar, email, tasks, and user-approved memory storage

## Deployment Layer

The app is a TypeScript Next.js project and can be deployed to Vercel. The included Vinext setup also supports the local Sites build flow.
