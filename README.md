# CFO Signal Desk

CFO Signal Desk is a Build Week MVP for turning company reports, KPIs, and business context into perspective, judgment, and direction.

The product answers: **What deserves attention, what does it mean, what can wait, and what should we do next?**

Motto: **From Signal to Meaning.**

## Product Overview

CFO Signal Desk is built for CFOs, Finance Directors, FP&A Managers, Controllers, and finance teams who need context and judgment rather than another reporting surface.

Simple promise: **Bring business data into context. Leave with clearer direction.**

The product constitution is documented in `docs/product-constitution.md`. Every future feature should pass this filter: **Does this help leaders create better meaning before acting?**

The executive data input and personalization architecture is documented in `docs/executive-data-input-personalization.md`. It defines Executive Onboarding, Company Context, Document Center, Executive Memory, Goals Engine, Decision History, Calendar Intelligence, Relationship Intelligence, Daily Check-in, and the feedback learning loop.

The MVP includes:

- Report and KPI input flow with **Upload company report** and **Try sample report** options.
- English / Spanish language switch for the complete demo workflow.
- Sample management report dataset with revenue, average order value, gross margin, operating cost, and cash conversion cycle.
- KPI variance interpretation against budget and prior period.
- Report interpretation that classifies every output as verified finding, calculated result, hypothesis, or missing data.
- Epistemic status badges that separate verified facts, model inference, working assumptions, stale signals, conflicting evidence, and insufficient data.
- Decision Authorization Engine that separates Confidence from Permission to Act.
- Permission to Act states: Proceed, Proceed with Safeguards, Run a Pilot First, Gather More Evidence, Escalate, Wait, and Do Not Proceed.
- What We Still Don't Know section with owner, speed, impact, and whether the current decision can proceed.
- Challenge Assessment flow that shows the strongest opposing case, weak assumptions, cost if wrong, and a controlled experiment.
- Natural-language challenge input that visibly revises, partially revises, or reverses the current assessment.
- Source and provenance drawer for visible claims, clearly labeling demo data and model interpretation.
- Lightweight decision journal for accept, reject, modify, or postpone actions.
- Interpretation cards with what changed, what it changes, likely driver, confidence, suggested direction, source evidence, and calculation.
- Executive summary, management questions, tomorrow's attention, recommended moves, owners, and risk of inaction.
- Company priority selection for Revenue Growth, Margin Protection, Cash Preservation, Cost Control, Customer Retention, and Operational Efficiency.
- Meaning loop: Observe -> Interpret -> Judge -> Act -> Learn.
- Demo mode with realistic sample data so judging and demos work without external APIs.

## Architecture Overview

```mermaid
flowchart LR
  UI["Next.js CFO Signal Desk"] --> Input["Upload report or sample KPI dataset"]
  Input --> Context["Company priorities and management context"]
  Context --> Engine["Report Interpretation"]
  Engine --> Evidence["Calculations, source evidence, confidence"]
  Evidence --> Decisions["Direction, owners, actions, tomorrow's attention"]
  Context --> Route["/api/brief"]
  Route --> OpenAI["OpenAI Responses API"]
  Route --> Demo["Local demo fallback"]
  OpenAI --> Decisions
  Demo --> Decisions
```

Key design choices:

- `app/page.tsx` contains the bilingual report input flow, sample KPI dataset, report interpretation UI, executive judgment cards, and meaning loop.
- `app/api/brief/route.ts` calls the OpenAI Responses API when `OPENAI_API_KEY` is present.
- The API route falls back to local demo generation whenever credentials or upstream calls are unavailable.
- The UI is responsive, finance-oriented, and optimized for a 90-second Build Week demo.
- File upload parsing is intentionally post-MVP; the current upload control demonstrates the workflow while the sample report powers the reliable demo.

## Tech Stack

- Next.js
- TypeScript
- React
- TailwindCSS v4
- OpenAI Responses API
- Vinext / Cloudflare-compatible build output
- Vercel-ready application structure

## Installation

```bash
npm install
npm run dev
```

Open the local URL printed by the dev server.

## Environment Variables

Create `.env.local` when using the OpenAI integration:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5.6
```

`OPENAI_MODEL` is configurable. The app defaults to `gpt-5.6` because that was specified in the Build Week prompt. If that model is not available in your account, set this variable to an available GPT model.

Demo mode works without any environment variables.

## Project Structure

```text
app/
  api/brief/route.ts      AI brief generation endpoint with demo fallback
  globals.css             Product styling and responsive layout
  layout.tsx              Metadata and app shell
  page.tsx                CFO Signal Desk report interpretation experience
docs/
  architecture.md         Technical and product architecture notes
  demo-script.md          Suggested demo video script
  executive-data-input-personalization.md
                          Data acquisition, memory, and personalization design
  first-principles-role.md
                          Human role and first-principles product philosophy
  product-constitution.md Product principles and decision filter
  trust-epistemic-layer.md
                          Trust, provenance, challenge, authorization, and journal model
  submission-checklist.md Build Week submission checklist
screenshots/
  README.md               Screenshot capture guide
public/
  og.png                  Social preview image
tests/
  rendered-html.test.mjs  Build/render smoke tests
```

## Local Validation

```bash
npm run lint
npm run build
npm test
```

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add `OPENAI_API_KEY` and `OPENAI_MODEL` in Vercel Project Settings if using live AI generation.
4. Deploy.

The app remains usable without the OpenAI key because demo mode is built in.

### Sites / Cloudflare-Compatible Build

The included `vinext` setup can also produce the Sites-compatible build:

```bash
npm run build
```

## Demo Flow

1. Open CFO Signal Desk and state the problem: reports show KPI performance, but executives still need context, meaning, and direction.
2. Show the headline: **CFO Signal Desk helps leaders turn reports into perspective, judgment, and direction.**
3. Use **Try sample report** or stage a report through **Upload company report**.
4. Select company priorities such as Margin Protection, Cash Preservation, and Cost Control.
5. Review KPI variances: Revenue, Average Order Value, Gross Margin, Operating Cost, and Cash Conversion Cycle.
6. Open the top insight: revenue is 8% below budget, but the real issue is AOV decline and gross margin erosion.
7. Show epistemic status, evidence, calculation, confidence, finding type, likely driver, and suggested direction.
8. Open **Why am I seeing this?** to show source, freshness, transformation, dependencies, and limitations.
9. Review **What We Still Don't Know**, Confidence vs Permission to Act, assessment-changing evidence, challenge case, decision journal, and tomorrow's attention.
10. Close with the vision: this is a calm companion for executive judgment, not another reporting surface.

## Submission Assets

- Product description: this README.
- Demo script: `docs/demo-script.md`.
- Architecture overview: `docs/architecture.md`.
- Feature list: this README and checklist.
- Screenshots folder: `screenshots/`.
- Social preview image: `public/og.png`.

## Founder Advantage

The founder advantage is finance-domain judgment: 14 years across finance, accounting, reporting, budgeting, control, operational finance, multi-country work, business partnering, risk, control, and management decision processes.

That experience helps define which KPI matters, which variance deserves management attention, which data must be verified before interpretation, and which output changes a real decision.

## Remaining Improvements

- Parse uploaded Excel, CSV, and PDF files.
- Add budget, prior-period, and forecast import templates.
- Add persistent company memory and prior decision tracking.
- Add live ERP, reporting, and BI connectors.
- Add PDF and board-pack export.
- Add management action tracker with owners, dates, and follow-up KPIs.
- Extend later into Finance Signal Desk, Sales Signal Desk, Operations Signal Desk, and CEO Brief.
