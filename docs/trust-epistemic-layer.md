# Trust & Epistemic Decision Layer

Trust is not created by sounding confident. Trust is created by showing the boundaries of confidence.

This layer extends CFO Signal Desk from a briefing product into a disciplined executive thinking system. The goal is to help a finance leader distinguish:

- What is known
- What is inferred
- What is assumed
- What remains unknown
- What evidence would materially change the recommendation

## Typed Models

The UI now models:

- `EpistemicStatus`
- `Evidence`
- `Assumption`
- `Unknown`
- `DecisionReadiness`
- `ChallengeCase`
- `AssessmentRevision`
- `DecisionJournalEntry`

## Epistemic Status

Every material signal can be shown as:

- Verified fact
- User-provided information
- Model inference
- Working assumption
- Insufficient data
- Potentially stale
- Conflicting evidence

The UI never asks the user to trust a conclusion blindly. It shows source, freshness, limitations, dependencies, and assumption dependency through the provenance drawer.

## Decision Readiness

Confidence and decision readiness are separated.

A recommendation can be high confidence but low urgency, low confidence but high urgency, sufficient for a reversible action, or insufficient for an irreversible commitment.

Displayed dimensions:

- Financial materiality
- Urgency
- Reversibility
- Evidence quality
- Downside exposure

## Challenge And Revision

Every major recommendation can be challenged. The challenge flow shows:

- Strongest opposing argument
- Opposing evidence
- Assumptions that may be wrong
- Cost if the recommendation is wrong
- Controlled experiment or compromise

When the user adds new information, the product returns a visible assessment revision:

- New information received
- Impact on assessment
- Revised recommendation
- Remaining uncertainty

The interface distinguishes unchanged, partially revised, and fully reversed recommendations.

## Decision Journal

The journal records accept, reject, modify, or postpone actions with:

- Decision
- Date
- Responsible person
- Evidence available at the time
- Unresolved assumptions
- Expected outcome
- Review date
- Actual outcome when available

The purpose is not only auditability. It helps the executive compare what was believed then with what actually happened later.

## Demo Boundaries

The demo uses a visible demonstration dataset. It does not claim access to ERP cash balances, customer-level profitability, contracts, or real-time feeds unless those inputs are entered or connected.
