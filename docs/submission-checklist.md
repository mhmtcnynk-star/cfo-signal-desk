# OpenAI Build Week Submission Checklist

- Product name: CFO Signal Desk
- Category: AI Management Reporting OS / finance AI
- Target users: CFOs, Finance Directors, FP&A Managers, Controllers, Finance Managers, management reporting teams
- Core question: What changed, why did it change, and what should management do next?
- Working report insight cockpit: complete
- Upload company report UI: complete as MVP workflow demonstration
- Reliable sample management report: complete
- KPI variance table: complete
- Insight classification: complete
- Source evidence and calculation display: complete
- Confidence scoring: complete
- Root-cause hypotheses: complete
- Recommended management decisions: complete
- Action owners and risk of inaction: complete
- Management questions: complete
- KPI watchlist: complete
- AI OS loop: complete
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

CFO Signal Desk turns company reports, KPIs, and business context into verified insights, management decisions, and accountable actions.

Dashboards show performance. CFO Signal Desk explains what it means and what to do next.

## Problem

Finance teams already have reports, spreadsheets, dashboards, and presentations. The bottleneck is converting them into management decisions quickly and consistently.

## Product

An AI performance analyst for CFOs and finance teams. Users upload a report or use sample data; the system identifies critical variances, KPI relationships, root-cause hypotheses, risks, opportunities, recommended decisions, action owners, management questions, and KPI watchlists.

## Why This Is Different

- Company context and priorities shape the analysis.
- The system calculates and explains variances instead of only summarizing.
- Every insight shows evidence, calculation, confidence, and classification.
- Outputs are standardized for management reporting.
- The long-term product can learn from prior decisions and outcomes.

## Use of OpenAI

OpenAI is used for structured executive reasoning over KPI and report context. The model is instructed to avoid generic summaries and produce management-ready insight: finding type, evidence, calculation, impact, likely driver, decision, action owner, risk of inaction, and KPI watchlist.

The demo remains reliable without an API key through deterministic sample data.

## Founder Advantage

The founder brings 14 years of finance, accounting, reporting, budgeting, controlling, operational finance, multi-country experience, business partnering, risk, control, and management decision workflow experience.

The domain advantage is knowing which KPI matters, which variance deserves escalation, which data must be verified, and which output actually changes management action.

## Future Vision

The bigger vision is an AI Operating System for Management:

Observe -> Interpret -> Decide -> Act -> Learn

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
