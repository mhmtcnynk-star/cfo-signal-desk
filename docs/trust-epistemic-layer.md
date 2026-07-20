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

## Decision Authorization Engine

Confidence and Permission to Act are separated.

Confidence answers: "How confident are we that this assessment is correct?"

Permission to Act answers: "Should the organization execute this decision now?"

A recommendation can be high confidence but low permission to act, or low confidence with enough permission to run a small reversible pilot. The product never communicates: "The system is confident, therefore act."

Allowed Permission to Act states:

- Proceed
- Proceed with Safeguards
- Run a Pilot First
- Gather More Evidence
- Escalate
- Wait
- Do Not Proceed

Displayed dimensions:

- Reversibility
- Financial exposure
- Time pressure
- Governance
- Operational risk
- Confidence influence

Older readiness language has been replaced in the user experience by authorization language:

- Confidence is the epistemic assessment.
- Permission to Act is the executive execution judgment.
- Confidence influences permission, but never determines it alone.

The exposed business explanation is intentionally not a formula. Internally, Permission to Act considers:

- Confidence
- Reversibility
- Cost of error
- Time pressure
- Governance
- Operational risk

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
