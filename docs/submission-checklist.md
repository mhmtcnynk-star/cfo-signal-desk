# OpenAI Build Week Submission Checklist

- Product name: CFO Signal Desk
- Category: Executive finance workflow / decision support
- Target users: CFOs, Finance Directors, FP&A Managers, Controllers, Finance Managers, management reporting teams
- Core question: What changed, why did it change, and what should management do next?
- Working report insight cockpit: complete
- Upload company report UI: complete as MVP workflow demonstration
- Reliable sample management report: complete
- KPI variance table: complete
- Interpretation classification: complete
- Epistemic status for every material signal: complete
- Decision Authorization Engine: complete
- Confidence and Permission to Act separation: complete
- What We Still Don't Know section: complete
- Assessment-changing evidence section: complete
- Challenge Assessment flow: complete
- User challenge and visible assessment revision: complete
- Source and provenance drawer: complete
- Trust and limitations panel: complete
- Lightweight decision journal: complete
- Decision discipline coaching: complete
- Source evidence and calculation display: complete
- Confidence scoring: complete
- Root-cause hypotheses: complete
- Recommended management decisions: complete
- Action owners and risk of inaction: complete
- Management questions: complete
- Tomorrow's attention list: complete
- Meaning loop: complete
- Demo mode: complete and always available
- README: complete
- Architecture overview: complete
- Demo script: complete
- Screenshot folder: included
- Social preview image: included
- Local lint command: `npm run lint`
- Local build command: `npm run build`
- Test command: `npm test`
- Vercel deployment instructions: included in README

## Judge-Facing Pitch

CFO Signal Desk turns company reports, KPIs, and business context into perspective, judgment, direction, and accountable actions.

Reports show performance. CFO Signal Desk helps leaders interpret what it means, what deserves attention, and what should happen next.

## Problem

Finance teams already have reports, spreadsheets, and presentations. The bottleneck is converting them into management judgment quickly and consistently.

## Product

A calm executive companion for CFOs and finance teams. Users upload a report or use sample data; the product identifies critical variances, KPI relationships, root-cause hypotheses, risks, opportunities, recommended moves, action owners, management questions, and tomorrow's attention list.

## Why This Is Different

- Company context and priorities shape the analysis.
- The system calculates and explains variances instead of only summarizing.
- Every interpretation shows evidence, calculation, confidence, epistemic status, and limitations.
- Recommendations show confidence, Permission to Act, reversibility, financial exposure, governance, operational risk, and assessment-changing conditions.
- The product rewards correction through Challenge Assessment and visible assessment revision.
- Outputs are standardized for management reporting.
- The long-term product can learn from prior decisions and outcomes.

## Use of OpenAI

OpenAI is used for structured executive reasoning over KPI and report context. The model is instructed to avoid generic summaries and produce management-ready interpretation: finding type, evidence, calculation, impact, likely driver, direction, action owner, risk of inaction, and tomorrow's attention list.

The demo remains reliable without an API key through deterministic sample data.

## Founder Advantage

The founder brings 14 years of finance, accounting, reporting, budgeting, controlling, operational finance, multi-country experience, business partnering, risk, control, and management decision workflow experience.

The domain advantage is knowing which KPI matters, which variance deserves escalation, which data must be verified, and which output actually changes management action.

## Future Vision

The bigger vision is a daily meaning practice for management:

Observe -> Interpret -> Judge -> Act -> Learn

Future modules:

- Finance Signal Desk
- Sales Signal Desk
- Operations Signal Desk
- CEO Brief
- Management Action Tracker
- Company Knowledge Layer

## Before Submission

- Capture fresh screenshots after final deployment.
- Record a short demo video using `docs/demo-script.md`.
- Add the deployed URL to the submission form.
- Confirm whether the deployed environment uses live OpenAI generation or demo mode.
