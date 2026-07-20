"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Locale = "en" | "es";
type Severity = "High" | "Medium" | "Low";
type PriorityLevel = "Executive decision" | "Act today" | "Monitor";
type FindingType = "Verified finding" | "Calculated result" | "Hypothesis" | "Missing data";
type EpistemicStatus =
  | "Verified fact"
  | "User-provided information"
  | "Model inference"
  | "Working assumption"
  | "Insufficient data"
  | "Potentially stale"
  | "Conflicting evidence";
type ConfidenceLevel = "High" | "Medium" | "Low";
type ReadinessLevel =
  | "Ready to act"
  | "Act with safeguards"
  | "Gather more evidence"
  | "Do not act yet";
type PermissionState =
  | "Proceed"
  | "Proceed with Safeguards"
  | "Run a Pilot First"
  | "Gather More Evidence"
  | "Escalate"
  | "Wait"
  | "Do Not Proceed";
type RevisionStatus = "Unchanged" | "Partially revised" | "Fully reversed";

type KpiRow = {
  metric: string;
  actual: string;
  budget: string;
  prior: string;
  variance: string;
  status: Severity;
};

type Insight = {
  id: string;
  title: string;
  observation: string;
  businessImpact: string;
  likelyDriver: string;
  confidence: number;
  findingType: FindingType;
  severity: Severity;
  recommendedAction: string;
  evidence: string[];
  calculation: string;
  epistemicStatus?: EpistemicStatus;
  source?: string;
  lastUpdated?: string;
  limitations?: string;
  assumptionDependency?: string;
  provenance?: Provenance;
};

type Evidence = {
  label: string;
  status: EpistemicStatus;
  source: string;
};

type Assumption = {
  statement: string;
  dependsOn: string;
};

type Unknown = {
  missing: string;
  whyItMatters: string;
  owner: string;
  speed: string;
  canProceed: string;
};

type Provenance = {
  origin: string;
  priority: string;
  transformation: string;
  freshness: string;
  dependencies: string[];
};

type DecisionReadiness = {
  level: ReadinessLevel;
  confidence: ConfidenceLevel;
  dimensions: {
    financialMateriality: ConfidenceLevel;
    urgency: ConfidenceLevel;
    reversibility: ConfidenceLevel;
    evidenceQuality: ConfidenceLevel;
    downsideExposure: ConfidenceLevel;
  };
};

type ConfidenceAssessment = {
  level: ConfidenceLevel;
  reasons: string[];
};

type PermissionToAct = {
  state: PermissionState;
  explanation: string;
  reasons: string[];
  dimensions: {
    reversibility: ConfidenceLevel;
    financialExposure: ConfidenceLevel;
    timePressure: ConfidenceLevel;
    governance: ConfidenceLevel;
    operationalRisk: ConfidenceLevel;
    confidenceInfluence: ConfidenceLevel;
  };
};

type DecisionAuthorization = {
  confidence: ConfidenceAssessment;
  permission: PermissionToAct;
  distinction: string;
};

type ChallengeCase = {
  argument: string;
  opposingEvidence: string[];
  weakAssumptions: string[];
  costIfWrong: string;
  compromise: string;
};

type AssessmentRevision = {
  status: RevisionStatus;
  newInformation: string;
  impact: string;
  revisedRecommendation: string;
  remainingUncertainty: string;
};

type Decision = {
  id: string;
  recommendation: string;
  why: string;
  riskOfInaction: string;
  owner: string;
  kpi: string;
  priority: PriorityLevel;
  readiness?: DecisionReadiness;
  authorization?: DecisionAuthorization;
  evidence?: Evidence[];
  assumptions?: Assumption[];
  unknowns?: Unknown[];
  changeConditions?: string[];
  challenge?: ChallengeCase;
  revision?: AssessmentRevision;
  expectedOutcome?: string;
  reviewDate?: string;
};

type DecisionJournalEntry = {
  id: string;
  decision: string;
  date: string;
  responsiblePerson: string;
  evidenceAtDecision: string;
  unresolvedAssumptions: string;
  expectedOutcome: string;
  reviewDate: string;
  actualOutcome: string;
};

type GraphLink = {
  from: string;
  to: string;
  body: string;
};

type Copy = {
  localeName: string;
  shortLocale: string;
  otherLocale: string;
  heroEyebrow: string;
  heroText: string;
  executiveDecision: string;
  executiveDecisionTitle: string;
  executiveDecisionBody: string;
  sampleReady: string;
  reportStaged: (fileName: string) => string;
  reportAnalyzed: (fileName: string) => string;
  sampleAnalyzed: string;
  scoreBusinessImpact: string;
  scoreUrgency: string;
  scoreConfidence: string;
  authorizationTitle: string;
  authorizationSubtitle: string;
  readinessTitle: string;
  confidenceLabel: string;
  confidenceReasonLabel: string;
  permissionLabel: string;
  permissionReasonLabel: string;
  permissionDimensionsTitle: string;
  permissionStates: Record<PermissionState, string>;
  readinessLabel: string;
  dimensionsTitle: string;
  epistemicLabel: string;
  sourceLabel: string;
  lastUpdatedLabel: string;
  limitationsLabel: string;
  assumptionLabel: string;
  provenanceButton: string;
  provenanceTitle: string;
  dependenciesLabel: string;
  unknownsEyebrow: string;
  unknownsTitle: string;
  unknownLabels: {
    missing: string;
    why: string;
    owner: string;
    speed: string;
    proceed: string;
  };
  changeTitle: string;
  challengeButton: string;
  challengeTitle: string;
  challengeLabels: {
    opposing: string;
    assumptions: string;
    cost: string;
    compromise: string;
  };
  userChallengeTitle: string;
  challengePlaceholder: string;
  applyChallenge: string;
  revisionTitle: string;
  revisionLabels: {
    newInfo: string;
    impact: string;
    revised: string;
    uncertainty: string;
  };
  journalTitle: string;
  journalButtons: {
    accept: string;
    reject: string;
    modify: string;
    postpone: string;
  };
  journalLabels: {
    evidence: string;
    assumptions: string;
    expected: string;
    review: string;
    actual: string;
  };
  disciplineEyebrow: string;
  disciplineTitle: string;
  disciplineBody: string;
  trustTitle: string;
  trustItems: string[];
  inputEyebrow: string;
  inputTitle: string;
  uploadReport: string;
  trySample: string;
  inputNote: string;
  prioritiesEyebrow: string;
  priorities: string[];
  engineEyebrow: string;
  engineTitle: string;
  metrics: {
    kpis: string;
    findings: string;
    mode: string;
    demo: string;
  };
  table: {
    metric: string;
    actual: string;
    budget: string;
    prior: string;
    variance: string;
  };
  insightLabels: {
    observation: string;
    businessImpact: string;
    likelyDriver: string;
    recommendedAction: string;
    calculation: string;
    evidence: string;
  };
  actionPanel: {
    executiveSummary: string;
    managementQuestions: string;
    kpiWatchlist: string;
  };
  summaries: string[];
  questions: string[];
  watchlist: string[];
  topInsightsEyebrow: string;
  topInsightsTitle: string;
  decisionsEyebrow: string;
  decisionsTitle: string;
  decisionLabels: {
    owner: string;
    kpi: string;
    risk: string;
  };
  aiOsEyebrow: string;
  aiOsTitle: string;
  founderEyebrow: string;
  founderTitle: string;
  founderBody: string;
  alignment: string[];
  severity: Record<Severity, string>;
  priority: Record<PriorityLevel, string>;
  findingType: Record<FindingType, string>;
  epistemicStatus: Record<EpistemicStatus, string>;
  readiness: Record<ReadinessLevel, string>;
  confidenceLevel: Record<ConfidenceLevel, string>;
  revisionStatus: Record<RevisionStatus, string>;
  kpiRows: KpiRow[];
  insights: Insight[];
  unknowns: Unknown[];
  decisions: Decision[];
  journal: DecisionJournalEntry[];
  graphLinks: GraphLink[];
};

const copies: Record<Locale, Copy> = {
  en: {
    localeName: "English",
    shortLocale: "EN",
    otherLocale: "ES",
    heroEyebrow: "Meaning between information and action",
    heroText:
      "CFO Signal Desk helps finance leaders turn reports, KPIs, and business context into perspective, judgment, and direction. It does not try to impress; it helps you decide what deserves attention, what can wait, and what should happen next.",
    executiveDecision: "Executive Judgment",
    executiveDecisionTitle: "Run a margin bridge before revising the revenue forecast.",
    executiveDecisionBody:
      "Revenue is below target, but the real issue is lower average order value combined with gross margin erosion. Management needs driver clarity before changing the commercial plan.",
    sampleReady: "Sample report ready",
    reportStaged: (fileName) => `Report staged: ${fileName}`,
    reportAnalyzed: (fileName) => `Interpreted ${fileName} with the demo report context`,
    sampleAnalyzed: "Sample management report interpreted",
    scoreBusinessImpact: "Business impact",
    scoreUrgency: "Urgency",
    scoreConfidence: "Confidence",
    authorizationTitle: "Decision Authorization Engine",
    authorizationSubtitle:
      "Confidence estimates whether the assessment is correct. Permission to Act evaluates whether execution is justified now.",
    readinessTitle: "Confidence vs Permission to Act",
    confidenceLabel: "Confidence",
    confidenceReasonLabel: "Why this confidence",
    permissionLabel: "Permission to Act",
    permissionReasonLabel: "Why this permission",
    permissionDimensionsTitle: "Permission dimensions",
    permissionStates: {
      Proceed: "Proceed",
      "Proceed with Safeguards": "Proceed with Safeguards",
      "Run a Pilot First": "Run a Pilot First",
      "Gather More Evidence": "Gather More Evidence",
      Escalate: "Escalate",
      Wait: "Wait",
      "Do Not Proceed": "Do Not Proceed",
    },
    readinessLabel: "Decision readiness",
    dimensionsTitle: "Decision dimensions",
    epistemicLabel: "Epistemic status",
    sourceLabel: "Source",
    lastUpdatedLabel: "Last updated",
    limitationsLabel: "Known limitations",
    assumptionLabel: "Depends on assumption",
    provenanceButton: "Why am I seeing this?",
    provenanceTitle: "Source and provenance",
    dependenciesLabel: "Dependencies",
    unknownsEyebrow: "What We Still Don't Know",
    unknownsTitle: "Insufficient data is a useful result",
    unknownLabels: {
      missing: "Missing information",
      why: "Why it matters",
      owner: "Who can provide it",
      speed: "How quickly",
      proceed: "Can proceed?",
    },
    changeTitle: "What Would Change This Assessment?",
    challengeButton: "Challenge assessment",
    challengeTitle: "Challenge case",
    challengeLabels: {
      opposing: "Opposing evidence",
      assumptions: "Assumptions that may be wrong",
      cost: "Cost if wrong",
      compromise: "Controlled experiment",
    },
    userChallengeTitle: "Add new information",
    challengePlaceholder:
      "Example: This ignores seasonality, the customer is strategically important, or we already signed the supplier agreement.",
    applyChallenge: "Revise assessment",
    revisionTitle: "Assessment revision",
    revisionLabels: {
      newInfo: "New information received",
      impact: "Impact on assessment",
      revised: "Revised recommendation",
      uncertainty: "Remaining uncertainty",
    },
    journalTitle: "Decision Journal",
    journalButtons: {
      accept: "Accept",
      reject: "Reject",
      modify: "Modify",
      postpone: "Postpone",
    },
    journalLabels: {
      evidence: "Evidence available then",
      assumptions: "Unresolved assumptions",
      expected: "Expected outcome",
      review: "Review date",
      actual: "Actual outcome",
    },
    disciplineEyebrow: "Decision Discipline",
    disciplineTitle: "Separate confidence from permission to act",
    disciplineBody:
      "High confidence does not automatically justify action. Low confidence does not automatically justify inaction. The right move depends on reversibility, downside, governance, and timing.",
    trustTitle: "Trust & Limitations",
    trustItems: [
      "This brief uses the visible demonstration dataset and selected company priorities.",
      "It does not include live ERP cash balances, customer-level profitability, contracts, or real-time market feeds unless those inputs are entered or connected.",
      "Recommendations are decision support, not automatic authorization. Material decisions should be validated against company records.",
    ],
    inputEyebrow: "Input",
    inputTitle: "Bring business data into context.",
    uploadReport: "Upload company report",
    trySample: "Try sample report",
    inputNote:
      "MVP demo uses a sample management report. Uploaded files are staged to show the intended workflow; live parsing is post-MVP.",
    prioritiesEyebrow: "Company priorities",
    priorities: [
      "Revenue growth",
      "Margin protection",
      "Cash preservation",
      "Cost control",
      "Customer retention",
      "Operational efficiency",
    ],
    engineEyebrow: "Report Interpretation",
    engineTitle: "Performance is visible. Meaning still has to be created.",
    metrics: {
      kpis: "KPIs",
      findings: "Meanings",
      mode: "Mode",
      demo: "Demo",
    },
    table: {
      metric: "Metric",
      actual: "Actual",
      budget: "Budget",
      prior: "Prior",
      variance: "Variance",
    },
    insightLabels: {
      observation: "What changed",
      businessImpact: "What it changes",
      likelyDriver: "Likely driver",
      recommendedAction: "Suggested direction",
      calculation: "Calculation",
      evidence: "Source evidence",
    },
    actionPanel: {
      executiveSummary: "Executive Summary",
      managementQuestions: "Questions Management Should Ask",
      kpiWatchlist: "Tomorrow's Attention",
    },
    summaries: [
      "Revenue is 8.0% below budget, but the stronger signal is an 11.0% decline in average order value.",
      "Gross margin is 3.2 points below budget, indicating lower-quality revenue.",
      "Cash conversion cycle is 9 days above budget, creating emerging liquidity pressure.",
    ],
    questions: [
      "Which customers received discount exceptions this period?",
      "Which products or segments drove the AOV decline?",
      "Are overdue strategic customers also low-margin customers?",
    ],
    watchlist: [
      "Average order value by customer segment",
      "Gross margin bridge by product and customer",
      "Discount exceptions and approval compliance",
      "Cash conversion cycle and overdue receivables",
    ],
    topInsightsEyebrow: "Key Meaning",
    topInsightsTitle: "What deserves judgment, not just attention",
    decisionsEyebrow: "Direction",
    decisionsTitle: "Every interpretation should clarify the next management move",
    decisionLabels: {
      owner: "Owner",
      kpi: "KPI",
      risk: "Risk of inaction",
    },
    aiOsEyebrow: "Meaning Loop",
    aiOsTitle: "Observe -> Interpret -> Judge -> Act -> Learn",
    founderEyebrow: "Human Advantage",
    founderTitle: "Finance judgment shaped by operating experience",
    founderBody:
      "The durable value is judgment: knowing which variance matters, which data needs verification, what deserves management attention, and which action would create lasting performance.",
    alignment: [
      "Finance experience",
      "Management reporting",
      "Judgment workflow design",
      "Build Week readiness",
    ],
    severity: {
      High: "High",
      Medium: "Medium",
      Low: "Low",
    },
    priority: {
      "Executive decision": "Executive judgment",
      "Act today": "Act today",
      Monitor: "Monitor",
    },
    findingType: {
      "Verified finding": "Verified finding",
      "Calculated result": "Calculated result",
      Hypothesis: "Hypothesis",
      "Missing data": "Missing data",
    },
    epistemicStatus: {
      "Verified fact": "Verified fact",
      "User-provided information": "User-provided information",
      "Model inference": "Model inference",
      "Working assumption": "Working assumption",
      "Insufficient data": "Insufficient data",
      "Potentially stale": "Potentially stale",
      "Conflicting evidence": "Conflicting evidence",
    },
    readiness: {
      "Ready to act": "Ready to act",
      "Act with safeguards": "Act with safeguards",
      "Gather more evidence": "Gather more evidence",
      "Do not act yet": "Do not act yet",
    },
    confidenceLevel: {
      High: "High",
      Medium: "Medium",
      Low: "Low",
    },
    revisionStatus: {
      Unchanged: "Unchanged",
      "Partially revised": "Partially revised",
      "Fully reversed": "Fully reversed",
    },
    kpiRows: [
      {
        metric: "Revenue",
        actual: "$4.6M",
        budget: "$5.0M",
        prior: "$4.9M",
        variance: "-8.0% vs budget",
        status: "High",
      },
      {
        metric: "Average order value",
        actual: "$1,780",
        budget: "$2,000",
        prior: "$1,960",
        variance: "-11.0% vs budget",
        status: "High",
      },
      {
        metric: "Gross margin",
        actual: "31.8%",
        budget: "35.0%",
        prior: "34.6%",
        variance: "-3.2 pts vs budget",
        status: "High",
      },
      {
        metric: "Operating cost",
        actual: "$1.42M",
        budget: "$1.35M",
        prior: "$1.31M",
        variance: "+5.2% vs budget",
        status: "Medium",
      },
      {
        metric: "Cash conversion cycle",
        actual: "58 days",
        budget: "49 days",
        prior: "52 days",
        variance: "+9 days vs budget",
        status: "Medium",
      },
    ],
    insights: [
      {
        id: "revenue-quality",
        title: "Revenue miss is a price and mix issue, not a volume issue.",
        observation:
          "Revenue is 8.0% below budget, but the order count is broadly stable. The larger signal is an 11.0% decline in average order value.",
        businessImpact:
          "Management should not respond with a generic commercial reaction. The issue points to pricing discipline, product mix, and customer-level margin leakage.",
        likelyDriver:
          "Lower-value orders increased in two customer segments while higher-margin product lines underperformed.",
        confidence: 86,
        findingType: "Calculated result",
        severity: "High",
        recommendedAction:
          "Ask Sales and FP&A to review discount exceptions, customer mix, and low-margin product substitution before changing the revenue forecast.",
        evidence: [
          "Revenue actual $4.6M versus $5.0M budget.",
          "Average order value $1,780 versus $2,000 budget.",
          "Order count stable in the sample report.",
        ],
        calculation:
          "Revenue variance -8.0%; AOV variance -11.0%; volume variance not material.",
        epistemicStatus: "Model inference",
        source: "Demonstration dataset",
        lastUpdated: "Today 08:40",
        limitations: "Order count is available only at summary level; customer-level profitability is not included.",
        assumptionDependency: "Assumes the stable order count in the sample report reflects current period demand.",
        provenance: {
          origin: "Demonstration dataset",
          priority: "Margin protection",
          transformation: "Compared revenue, average order value, and order volume variance.",
          freshness: "Current demo period",
          dependencies: ["Revenue", "Average order value", "Order count"],
        },
      },
      {
        id: "margin-bridge",
        title: "Gross margin erosion requires a margin bridge before price action.",
        observation:
          "Gross margin is 31.8%, which is 3.2 points below budget and 2.8 points below prior period.",
        businessImpact:
          "If this continues, EBITDA will deteriorate even if revenue recovers, because the company is selling lower-quality revenue.",
        likelyDriver:
          "The combined effect of discounting, customer mix, and product mix is more likely than a single cost shock.",
        confidence: 82,
        findingType: "Hypothesis",
        severity: "High",
        recommendedAction:
          "Build a customer and product margin bridge, then freeze discretionary discount exceptions until the driver is confirmed.",
        evidence: [
          "Gross margin actual 31.8% versus 35.0% budget.",
          "Average order value declined in the same period.",
          "Operating cost pressure alone does not explain gross margin loss.",
        ],
        calculation: "Gross margin gap 35.0% - 31.8% = 3.2 percentage points.",
        epistemicStatus: "Working assumption",
        source: "Model interpretation based on the listed inputs",
        lastUpdated: "Today 08:40",
        limitations: "The margin bridge is not yet available at customer, SKU, or discount exception level.",
        assumptionDependency: "Assumes discounting and mix are more material than a single cost shock.",
        provenance: {
          origin: "Demonstration dataset",
          priority: "Margin protection",
          transformation: "Compared gross margin against budget and prior period, then linked it to AOV movement.",
          freshness: "Current demo period",
          dependencies: ["Gross margin", "Average order value", "Operating cost"],
        },
      },
      {
        id: "cash-cycle",
        title: "Cash preservation risk is emerging from receivables, not only profit.",
        observation:
          "Cash conversion cycle is 58 days, 9 days above budget and 6 days worse than the prior period.",
        businessImpact:
          "The finance team may need additional short-term liquidity even if sales activity looks stable.",
        likelyDriver:
          "Receivables aging in strategic accounts is extending cash collection and reducing operating flexibility.",
        confidence: 78,
        findingType: "Verified finding",
        severity: "Medium",
        recommendedAction:
          "Escalate the two overdue strategic customers and refresh the 13-week cash forecast using the longer collection cycle.",
        evidence: [
          "Cash conversion cycle actual 58 days versus 49 day budget.",
          "Prior period cash conversion cycle was 52 days.",
          "Sample report flags two strategic overdue customers.",
        ],
        calculation: "CCC variance +9 days versus budget; +6 days versus prior period.",
        epistemicStatus: "Verified fact",
        source: "Demonstration dataset",
        lastUpdated: "Today 08:40",
        limitations: "The visible report does not include the ERP cash balance or customer payment promises.",
        assumptionDependency: "Does not require a causal assumption; the CCC variance is directly visible.",
        provenance: {
          origin: "Demonstration dataset",
          priority: "Cash preservation",
          transformation: "Compared cash conversion cycle against budget and prior period.",
          freshness: "Current demo period",
          dependencies: ["Cash conversion cycle", "Receivables flag"],
        },
      },
      {
        id: "data-gap",
        title: "Management should not finalize the root cause without customer-level detail.",
        observation:
          "The sample report identifies segment concentration but does not include invoice-level discount, SKU, and customer profitability detail.",
        businessImpact:
          "A confident recommendation on price, mix, or customer action requires more granular evidence.",
        likelyDriver: "Missing customer and SKU-level margin bridge data limits diagnosis precision.",
        confidence: 69,
        findingType: "Missing data",
        severity: "Low",
        recommendedAction:
          "Request customer, SKU, discount, and contribution margin detail before approving broad price changes.",
        evidence: [
          "Segment issue is visible.",
          "Invoice-level profitability is not included.",
          "Discount exception data is missing.",
        ],
        calculation: "Data completeness gap: segment insight available; invoice-level proof unavailable.",
        epistemicStatus: "Insufficient data",
        source: "Demonstration dataset",
        lastUpdated: "Today 08:40",
        limitations: "The current assessment cannot validate price, mix, or customer profitability at transaction level.",
        assumptionDependency: "Any customer-level recommendation depends on details not yet visible.",
        provenance: {
          origin: "Demonstration dataset",
          priority: "Margin protection",
          transformation: "Compared available segment data with the evidence required for final root-cause attribution.",
          freshness: "Current demo period",
          dependencies: ["Customer profitability", "SKU margin", "Discount exceptions"],
        },
      },
    ],
    unknowns: [
      {
        missing: "Customer and SKU-level contribution margin",
        whyItMatters:
          "Without it, management may treat a mix problem as a volume problem and protect the wrong revenue.",
        owner: "FP&A + Commercial Operations",
        speed: "1-2 business days",
        canProceed:
          "A reversible margin bridge can start now; broad price or forecast changes should wait.",
      },
      {
        missing: "Strategic customer churn risk",
        whyItMatters:
          "A low-margin customer may still deserve protection if it anchors a future enterprise relationship.",
        owner: "Sales Director",
        speed: "Same day through account review",
        canProceed:
          "Proceed with targeted review, not a blanket customer action.",
      },
      {
        missing: "Supplier and contract commitments already signed",
        whyItMatters:
          "If commitments are irreversible, the recommendation should shift from delay to mitigation.",
        owner: "Procurement + Controller",
        speed: "Within 24 hours",
        canProceed:
          "Do not approve irreversible spending until commitments are verified.",
      },
    ],
    decisions: [
      {
        id: "margin-bridge",
        recommendation: "Run a margin bridge before revising the revenue forecast.",
        why: "The revenue gap is connected to average order value and gross margin, so the company needs driver clarity before broad commercial action.",
        riskOfInaction:
          "Management may chase revenue volume while accepting lower-quality revenue and continued margin erosion.",
        owner: "FP&A + Sales",
        kpi: "Gross margin",
        priority: "Executive decision",
        readiness: {
          level: "Ready to act",
          confidence: "High",
          dimensions: {
            financialMateriality: "High",
            urgency: "Medium",
            reversibility: "High",
            evidenceQuality: "Medium",
            downsideExposure: "Medium",
          },
        },
        authorization: {
          confidence: {
            level: "High",
            reasons: [
              "Evidence is recent and internally consistent.",
              "Revenue, AOV, and gross margin all point to a quality-of-revenue issue.",
              "No conflicting information invalidates the margin bridge step.",
            ],
          },
          permission: {
            state: "Proceed",
            explanation:
              "The margin bridge is reversible, evidence-generating, and does not require board approval.",
            reasons: [
              "The action clarifies the real decision before execution.",
              "Financial exposure is low because this is analysis, not capital commitment.",
              "Waiting slows forecast clarity and management alignment.",
            ],
            dimensions: {
              reversibility: "High",
              financialExposure: "Low",
              timePressure: "Medium",
              governance: "Low",
              operationalRisk: "Low",
              confidenceInfluence: "High",
            },
          },
          distinction:
            "Confidence supports the assessment; permission is granted because the next step is reversible and clarifies the real decision.",
        },
        evidence: [
          {
            label: "Revenue is 8.0% below budget.",
            status: "Verified fact",
            source: "Demonstration dataset",
          },
          {
            label: "AOV decline is likely connected to margin erosion.",
            status: "Model inference",
            source: "Model interpretation based on the listed inputs",
          },
        ],
        assumptions: [
          {
            statement: "The order count stability is directionally reliable.",
            dependsOn: "Summary-level order count in the sample report",
          },
          {
            statement: "Mix and discounting matter more than a single cost shock.",
            dependsOn: "Customer and SKU margin bridge still missing",
          },
        ],
        unknowns: [
          {
            missing: "Invoice-level discount and profitability detail",
            whyItMatters: "It determines whether action belongs with pricing, product mix, or account management.",
            owner: "FP&A",
            speed: "1-2 business days",
            canProceed: "Yes. The bridge itself is reversible and evidence-generating.",
          },
        ],
        changeConditions: [
          "Customer-level margin shows the gap is concentrated in one temporary contract.",
          "Pipeline conversion confirms higher-margin orders will recover next period.",
          "Supplier costs explain more than 70% of the gross margin gap.",
        ],
        challenge: {
          argument:
            "The current recommendation may over-focus on margin and underweight seasonality or strategic customer behavior.",
          opposingEvidence: [
            "Revenue softness could be seasonal if the same month historically shows lower AOV.",
            "A strategic customer may accept lower margin now but protect future enterprise volume.",
          ],
          weakAssumptions: [
            "Order count stability may hide segment-level demand changes.",
            "The sample report does not prove discounting caused the gross margin gap.",
          ],
          costIfWrong:
            "Management could slow commercial action while the real issue is a normal seasonal mix shift.",
          compromise:
            "Run the margin bridge in 48 hours while allowing reversible account-level actions for strategic customers.",
        },
        revision: {
          status: "Partially revised",
          newInformation: "The user adds that the customer is strategically important despite lower margin.",
          impact:
            "The recommendation shifts from blanket discount freeze to customer-segment review.",
          revisedRecommendation:
            "Run the margin bridge, but preserve strategic-customer exceptions until account-level value is reviewed.",
          remainingUncertainty:
            "Long-term customer value and churn risk still need account-owner validation.",
        },
        expectedOutcome:
          "Management separates price, volume, mix, and cost effects before changing the forecast.",
        reviewDate: "2026-07-24",
      },
      {
        id: "discount-freeze",
        recommendation: "Freeze non-standard discounts until customer-level profitability is reviewed.",
        why: "Discounting is a plausible driver of both AOV decline and margin pressure.",
        riskOfInaction:
          "The company may normalize exceptions that convert revenue recovery into EBITDA loss.",
        owner: "Commercial Director",
        kpi: "Average order value",
        priority: "Act today",
        readiness: {
          level: "Act with safeguards",
          confidence: "Medium",
          dimensions: {
            financialMateriality: "High",
            urgency: "High",
            reversibility: "Medium",
            evidenceQuality: "Medium",
            downsideExposure: "High",
          },
        },
        authorization: {
          confidence: {
            level: "Medium",
            reasons: [
              "AOV and margin both deteriorated, but discount exception data is incomplete.",
              "Strategic customer context may change the recommended treatment.",
            ],
          },
          permission: {
            state: "Proceed with Safeguards",
            explanation:
              "Proceed only for new discretionary exceptions; do not apply a blanket freeze to strategic or contractual accounts.",
            reasons: [
              "The action can protect margin quickly.",
              "Execution risk exists if strategic customers are included without review.",
              "Safeguards keep the move reversible and relationship-aware.",
            ],
            dimensions: {
              reversibility: "Medium",
              financialExposure: "Medium",
              timePressure: "High",
              governance: "Medium",
              operationalRisk: "Medium",
              confidenceInfluence: "Medium",
            },
          },
          distinction:
            "Confidence is not high enough for a blanket policy, but permission exists for a narrower reversible control.",
        },
        changeConditions: [
          "Strategic account review shows exceptions protect long-term customer value.",
          "Signed commercial commitments make a blanket freeze impractical.",
          "Discount exception data shows approvals are already compliant.",
        ],
        challenge: {
          argument:
            "A discount freeze may protect margin but damage strategic relationships if applied without account context.",
          opposingEvidence: [
            "Two low-margin customers may be strategically important.",
            "Some discounts may be contractual rather than discretionary.",
          ],
          weakAssumptions: [
            "The visible report does not separate contractual discounts from discretionary exceptions.",
          ],
          costIfWrong:
            "The company could create avoidable customer friction while solving the wrong part of the margin issue.",
          compromise:
            "Freeze only new discretionary exceptions and review strategic accounts separately.",
        },
        expectedOutcome:
          "Margin leakage slows while the team distinguishes strategic from discretionary discounts.",
        reviewDate: "2026-07-23",
      },
      {
        id: "cash-forecast",
        recommendation: "Refresh the 13-week cash forecast with the longer collection cycle.",
        why: "Receivables deterioration can create liquidity stress even when order volume looks stable.",
        riskOfInaction:
          "Short-term funding needs may be discovered too late for disciplined treasury action.",
        owner: "Treasury / Controller",
        kpi: "Cash conversion cycle",
        priority: "Act today",
        readiness: {
          level: "Ready to act",
          confidence: "High",
          dimensions: {
            financialMateriality: "High",
            urgency: "High",
            reversibility: "High",
            evidenceQuality: "High",
            downsideExposure: "Medium",
          },
        },
        authorization: {
          confidence: {
            level: "High",
            reasons: [
              "Cash conversion cycle variance is directly visible in the demo report.",
              "The data is recent and consistent with receivables pressure.",
            ],
          },
          permission: {
            state: "Proceed",
            explanation:
              "Refreshing the cash forecast is reversible and improves decision quality without committing capital.",
            reasons: [
              "Waiting may hide liquidity pressure until the next reporting cycle.",
              "No board approval is required to update the forecast.",
              "Operational risk is low because the action is analytical.",
            ],
            dimensions: {
              reversibility: "High",
              financialExposure: "Low",
              timePressure: "High",
              governance: "Low",
              operationalRisk: "Low",
              confidenceInfluence: "High",
            },
          },
          distinction:
            "High confidence and permission align here because the action is low-risk and time-sensitive.",
        },
        changeConditions: [
          "ERP cash balance confirms liquidity headroom above policy threshold.",
          "Overdue strategic customers confirm payment dates inside the forecast window.",
          "Collections exceed forecast by 10% for two consecutive weeks.",
        ],
        challenge: {
          argument:
            "The cash forecast update may overstate risk if overdue balances are already covered by confirmed payment commitments.",
          opposingEvidence: [
            "The visible report does not include customer payment promises.",
            "ERP cash balance is not connected in the MVP demo.",
          ],
          weakAssumptions: [
            "The current receivables delay will persist across the forecast window.",
          ],
          costIfWrong:
            "Treasury may create unnecessary caution and slow useful spending.",
          compromise:
            "Refresh the forecast now, but mark payment promises as a separate sensitivity rather than confirmed cash.",
        },
        expectedOutcome:
          "Treasury sees liquidity exposure early enough to respond without overreacting.",
        reviewDate: "2026-07-22",
      },
      {
        id: "forecast-reset",
        recommendation: "Wait on a full revenue forecast reset until customer profitability is validated.",
        why: "The evidence strongly suggests a revenue-quality issue, but a full forecast reset is harder to reverse and affects management expectations.",
        riskOfInaction:
          "Waiting may delay planning, but acting now could lock management into a forecast narrative before the cause is proven.",
        owner: "CFO + FP&A Lead",
        kpi: "Revenue forecast accuracy",
        priority: "Executive decision",
        readiness: {
          level: "Do not act yet",
          confidence: "High",
          dimensions: {
            financialMateriality: "High",
            urgency: "Medium",
            reversibility: "Low",
            evidenceQuality: "Medium",
            downsideExposure: "High",
          },
        },
        authorization: {
          confidence: {
            level: "High",
            reasons: [
              "The KPI pattern reliably shows revenue quality pressure.",
              "AOV and margin deterioration are consistent with the assessment.",
            ],
          },
          permission: {
            state: "Wait",
            explanation:
              "The broader forecast reset is difficult to reverse, financially material, and should wait for margin bridge evidence.",
            reasons: [
              "The decision affects management expectations and may require CFO/CEO alignment.",
              "Customer profitability data remains unavailable.",
              "The cost of error is higher than the cost of waiting a few days.",
            ],
            dimensions: {
              reversibility: "Low",
              financialExposure: "High",
              timePressure: "Medium",
              governance: "High",
              operationalRisk: "Medium",
              confidenceInfluence: "High",
            },
          },
          distinction:
            "The assessment is high confidence, but permission is low because the action is material and difficult to reverse.",
        },
        changeConditions: [
          "Customer profitability confirms persistent margin leakage across major segments.",
          "CEO and commercial leadership approve the revised forecast narrative.",
          "The margin bridge shows the shortfall is not temporary or seasonal.",
        ],
        challenge: {
          argument:
            "Waiting may create planning drift if commercial teams need a revised target immediately.",
          opposingEvidence: [
            "AOV and margin deterioration are already visible.",
            "Forecast discipline may suffer if management delays acknowledging the miss.",
          ],
          weakAssumptions: [
            "The team can complete the margin bridge quickly enough to avoid planning delay.",
          ],
          costIfWrong:
            "If the forecast reset is truly needed now, waiting could reduce credibility with management.",
          compromise:
            "Prepare a provisional forecast scenario, but do not approve the official reset until the margin bridge is complete.",
        },
        expectedOutcome:
          "Management avoids locking in a forecast decision before validating the underlying driver.",
        reviewDate: "2026-07-24",
      },
    ],
    journal: [
      {
        id: "journal-001",
        decision: "Postponed full revenue forecast revision until margin bridge is complete.",
        date: "2026-07-20",
        responsiblePerson: "FP&A Lead",
        evidenceAtDecision: "Revenue -8.0% vs budget; AOV -11.0%; gross margin -3.2 pts.",
        unresolvedAssumptions: "Customer-level profitability and discount exception detail unavailable.",
        expectedOutcome: "Forecast revision reflects price, mix, and margin quality rather than only volume.",
        reviewDate: "2026-07-24",
        actualOutcome: "Pending",
      },
    ],
    graphLinks: [
      {
        from: "Report / KPI data",
        to: "Observe",
        body: "Ingest financial, sales, operation and management reporting data.",
      },
      {
        from: "Variance and KPI relationships",
        to: "Interpret",
        body: "Calculate changes, notice tension, and classify evidence quality.",
      },
      {
        from: "Root-cause hypotheses",
        to: "Judge",
        body: "Separate what matters from what is merely noisy, then explain confidence.",
      },
      {
        from: "Owners, dates, follow-up KPIs",
        to: "Act",
        body: "Turn interpretation into accountable actions.",
      },
      {
        from: "Prior decisions and outcomes",
        to: "Learn",
        body: "Build company memory over time.",
      },
    ],
  },
  es: {
    localeName: "Español",
    shortLocale: "ES",
    otherLocale: "EN",
    heroEyebrow: "Sentido entre información y acción",
    heroText:
      "CFO Signal Desk ayuda a líderes financieros a convertir reportes, KPIs y contexto de negocio en perspectiva, juicio y dirección. No intenta impresionar; ayuda a decidir qué merece atención, qué puede esperar y qué debería pasar después.",
    executiveDecision: "Juicio ejecutivo",
    executiveDecisionTitle: "Construir un puente de margen antes de revisar el forecast de ingresos.",
    executiveDecisionBody:
      "Los ingresos están por debajo del objetivo, pero el problema real es la caída del ticket promedio junto con la erosión del margen bruto. Management necesita claridad sobre el driver antes de cambiar el plan comercial.",
    sampleReady: "Reporte de ejemplo listo",
    reportStaged: (fileName) => `Reporte preparado: ${fileName}`,
    reportAnalyzed: (fileName) => `Interpretado ${fileName} con el contexto demo`,
    sampleAnalyzed: "Reporte de management de ejemplo interpretado",
    scoreBusinessImpact: "Impacto de negocio",
    scoreUrgency: "Urgencia",
    scoreConfidence: "Confianza",
    authorizationTitle: "Motor de autorización de decisión",
    authorizationSubtitle:
      "La confianza estima si la evaluación es correcta. El permiso para actuar evalúa si ejecutar ahora está justificado.",
    readinessTitle: "Confianza vs permiso para actuar",
    confidenceLabel: "Confianza",
    confidenceReasonLabel: "Por qué esta confianza",
    permissionLabel: "Permiso para actuar",
    permissionReasonLabel: "Por qué este permiso",
    permissionDimensionsTitle: "Dimensiones de permiso",
    permissionStates: {
      Proceed: "Proceder",
      "Proceed with Safeguards": "Proceder con resguardos",
      "Run a Pilot First": "Ejecutar piloto primero",
      "Gather More Evidence": "Reunir más evidencia",
      Escalate: "Escalar",
      Wait: "Esperar",
      "Do Not Proceed": "No proceder",
    },
    readinessLabel: "Preparación de decisión",
    dimensionsTitle: "Dimensiones de decisión",
    epistemicLabel: "Estado epistémico",
    sourceLabel: "Fuente",
    lastUpdatedLabel: "Última actualización",
    limitationsLabel: "Limitaciones conocidas",
    assumptionLabel: "Depende de supuesto",
    provenanceButton: "¿Por qué veo esto?",
    provenanceTitle: "Fuente y procedencia",
    dependenciesLabel: "Dependencias",
    unknownsEyebrow: "Lo que aún no sabemos",
    unknownsTitle: "Dato insuficiente también es un resultado útil",
    unknownLabels: {
      missing: "Información faltante",
      why: "Por qué importa",
      owner: "Quién puede aportarlo",
      speed: "Qué tan rápido",
      proceed: "¿Se puede avanzar?",
    },
    changeTitle: "¿Qué cambiaría esta evaluación?",
    challengeButton: "Cuestionar evaluación",
    challengeTitle: "Caso contrario",
    challengeLabels: {
      opposing: "Evidencia opuesta",
      assumptions: "Supuestos que pueden estar equivocados",
      cost: "Costo si está mal",
      compromise: "Experimento controlado",
    },
    userChallengeTitle: "Agregar información nueva",
    challengePlaceholder:
      "Ejemplo: ignora la estacionalidad, el cliente es estratégico o ya firmamos el acuerdo con proveedor.",
    applyChallenge: "Revisar evaluación",
    revisionTitle: "Revisión de evaluación",
    revisionLabels: {
      newInfo: "Nueva información recibida",
      impact: "Impacto en la evaluación",
      revised: "Recomendación revisada",
      uncertainty: "Incertidumbre restante",
    },
    journalTitle: "Registro de decisiones",
    journalButtons: {
      accept: "Aceptar",
      reject: "Rechazar",
      modify: "Modificar",
      postpone: "Postergar",
    },
    journalLabels: {
      evidence: "Evidencia disponible entonces",
      assumptions: "Supuestos abiertos",
      expected: "Resultado esperado",
      review: "Fecha de revisión",
      actual: "Resultado real",
    },
    disciplineEyebrow: "Disciplina de decisión",
    disciplineTitle: "Separar confianza de permiso para actuar",
    disciplineBody:
      "Alta confianza no justifica acción automáticamente. Baja confianza no justifica inacción automáticamente. La decisión correcta depende de reversibilidad, downside, gobernanza y timing.",
    trustTitle: "Confianza y limitaciones",
    trustItems: [
      "Este brief usa el dataset de demostración visible y las prioridades seleccionadas.",
      "No incluye saldos ERP en vivo, rentabilidad por cliente, contratos ni feeds de mercado en tiempo real salvo que esos inputs se ingresen o conecten.",
      "Las recomendaciones son apoyo a la decisión, no autorización automática. Las decisiones materiales deben validarse contra registros de la empresa.",
    ],
    inputEyebrow: "Entrada",
    inputTitle: "Trae los datos de negocio a contexto.",
    uploadReport: "Subir reporte de empresa",
    trySample: "Probar reporte de ejemplo",
    inputNote:
      "El MVP usa un reporte de management de ejemplo. Los archivos subidos se preparan para mostrar el flujo previsto; el parsing real queda para post-MVP.",
    prioritiesEyebrow: "Prioridades de la empresa",
    priorities: [
      "Crecimiento de ingresos",
      "Protección de margen",
      "Preservación de caja",
      "Control de costos",
      "Retención de clientes",
      "Eficiencia operativa",
    ],
    engineEyebrow: "Interpretación del reporte",
    engineTitle: "La performance es visible. El sentido todavía debe crearse.",
    metrics: {
      kpis: "KPIs",
      findings: "Sentidos",
      mode: "Modo",
      demo: "Demo",
    },
    table: {
      metric: "Métrica",
      actual: "Real",
      budget: "Budget",
      prior: "Periodo anterior",
      variance: "Desvío",
    },
    insightLabels: {
      observation: "Qué cambió",
      businessImpact: "Qué cambia",
      likelyDriver: "Driver probable",
      recommendedAction: "Dirección sugerida",
      calculation: "Cálculo",
      evidence: "Evidencia fuente",
    },
    actionPanel: {
      executiveSummary: "Resumen ejecutivo",
      managementQuestions: "Preguntas que management debería hacer",
      kpiWatchlist: "Atención de mañana",
    },
    summaries: [
      "Los ingresos están 8,0% por debajo del budget, pero la señal más fuerte es una caída de 11,0% en el ticket promedio.",
      "El margen bruto está 3,2 puntos por debajo del budget, lo que indica ingresos de menor calidad.",
      "El ciclo de conversión de caja está 9 días por encima del budget, generando presión emergente de liquidez.",
    ],
    questions: [
      "¿Qué clientes recibieron excepciones de descuento este periodo?",
      "¿Qué productos o segmentos explican la caída del ticket promedio?",
      "¿Los clientes estratégicos vencidos también son clientes de bajo margen?",
    ],
    watchlist: [
      "Ticket promedio por segmento de cliente",
      "Puente de margen bruto por producto y cliente",
      "Excepciones de descuento y cumplimiento de aprobaciones",
      "Ciclo de conversión de caja y cuentas vencidas",
    ],
    topInsightsEyebrow: "Sentido clave",
    topInsightsTitle: "Lo que merece juicio, no solo atención",
    decisionsEyebrow: "Dirección",
    decisionsTitle: "Cada interpretación debe aclarar el próximo movimiento de management",
    decisionLabels: {
      owner: "Responsable",
      kpi: "KPI",
      risk: "Riesgo de no actuar",
    },
    aiOsEyebrow: "Ciclo de sentido",
    aiOsTitle: "Observar -> Interpretar -> Juzgar -> Actuar -> Aprender",
    founderEyebrow: "Ventaja humana",
    founderTitle: "Criterio financiero formado por experiencia operativa",
    founderBody:
      "El valor duradero es el criterio: saber qué desvío importa, qué dato necesita verificación, qué merece atención de management y qué acción puede crear performance sostenible.",
    alignment: [
      "Experiencia financiera",
      "Reporting de management",
      "Diseño de flujos de juicio",
      "Preparación Build Week",
    ],
    severity: {
      High: "Alto",
      Medium: "Medio",
      Low: "Bajo",
    },
    priority: {
      "Executive decision": "Juicio ejecutivo",
      "Act today": "Actuar hoy",
      Monitor: "Monitorear",
    },
    findingType: {
      "Verified finding": "Hallazgo verificado",
      "Calculated result": "Resultado calculado",
      Hypothesis: "Hipótesis",
      "Missing data": "Dato faltante",
    },
    epistemicStatus: {
      "Verified fact": "Hecho verificado",
      "User-provided information": "Información del usuario",
      "Model inference": "Inferencia del modelo",
      "Working assumption": "Supuesto de trabajo",
      "Insufficient data": "Dato insuficiente",
      "Potentially stale": "Potencialmente desactualizado",
      "Conflicting evidence": "Evidencia conflictiva",
    },
    readiness: {
      "Ready to act": "Listo para actuar",
      "Act with safeguards": "Actuar con resguardos",
      "Gather more evidence": "Reunir más evidencia",
      "Do not act yet": "No actuar todavía",
    },
    confidenceLevel: {
      High: "Alta",
      Medium: "Media",
      Low: "Baja",
    },
    revisionStatus: {
      Unchanged: "Sin cambios",
      "Partially revised": "Revisión parcial",
      "Fully reversed": "Reversión completa",
    },
    kpiRows: [
      {
        metric: "Ingresos",
        actual: "$4,6M",
        budget: "$5,0M",
        prior: "$4,9M",
        variance: "-8,0% vs budget",
        status: "High",
      },
      {
        metric: "Ticket promedio",
        actual: "$1.780",
        budget: "$2.000",
        prior: "$1.960",
        variance: "-11,0% vs budget",
        status: "High",
      },
      {
        metric: "Margen bruto",
        actual: "31,8%",
        budget: "35,0%",
        prior: "34,6%",
        variance: "-3,2 pts vs budget",
        status: "High",
      },
      {
        metric: "Costo operativo",
        actual: "$1,42M",
        budget: "$1,35M",
        prior: "$1,31M",
        variance: "+5,2% vs budget",
        status: "Medium",
      },
      {
        metric: "Ciclo de conversión de caja",
        actual: "58 días",
        budget: "49 días",
        prior: "52 días",
        variance: "+9 días vs budget",
        status: "Medium",
      },
    ],
    insights: [
      {
        id: "revenue-quality",
        title: "El desvío de ingresos es un problema de precio y mix, no de volumen.",
        observation:
          "Los ingresos están 8,0% por debajo del budget, pero la cantidad de órdenes se mantiene relativamente estable. La señal más relevante es una caída de 11,0% en el ticket promedio.",
        businessImpact:
          "Management no debería responder con una presión comercial genérica. El problema apunta a disciplina de precios, mix de productos y pérdida de margen por cliente.",
        likelyDriver:
          "Aumentaron órdenes de menor valor en dos segmentos de clientes mientras las líneas de mayor margen tuvieron menor performance.",
        confidence: 86,
        findingType: "Calculated result",
        severity: "High",
        recommendedAction:
          "Pedir a Sales y FP&A que revisen excepciones de descuento, mix de clientes y sustitución hacia productos de bajo margen antes de cambiar el forecast de ingresos.",
        evidence: [
          "Ingresos reales $4,6M versus budget $5,0M.",
          "Ticket promedio $1.780 versus budget $2.000.",
          "Cantidad de órdenes estable en el reporte de ejemplo.",
        ],
        calculation:
          "Desvío de ingresos -8,0%; desvío de ticket promedio -11,0%; desvío de volumen no material.",
        epistemicStatus: "Model inference",
        source: "Dataset de demostración",
        lastUpdated: "Hoy 08:40",
        limitations: "La cantidad de órdenes está solo a nivel resumen; no incluye rentabilidad por cliente.",
        assumptionDependency: "Asume que la estabilidad de órdenes refleja demanda del periodo actual.",
        provenance: {
          origin: "Dataset de demostración",
          priority: "Protección de margen",
          transformation: "Comparación entre ingresos, ticket promedio y volumen de órdenes.",
          freshness: "Periodo demo actual",
          dependencies: ["Ingresos", "Ticket promedio", "Cantidad de órdenes"],
        },
      },
      {
        id: "margin-bridge",
        title: "La erosión del margen bruto requiere un puente de margen antes de actuar sobre precios.",
        observation:
          "El margen bruto es 31,8%, 3,2 puntos por debajo del budget y 2,8 puntos por debajo del periodo anterior.",
        businessImpact:
          "Si continúa, el EBITDA se deteriorará incluso si los ingresos se recuperan, porque la empresa está vendiendo ingresos de menor calidad.",
        likelyDriver:
          "El efecto combinado de descuentos, mix de clientes y mix de productos es más probable que un único shock de costo.",
        confidence: 82,
        findingType: "Hypothesis",
        severity: "High",
        recommendedAction:
          "Construir un puente de margen por cliente y producto, y congelar excepciones discrecionales de descuento hasta confirmar el driver.",
        evidence: [
          "Margen bruto real 31,8% versus budget 35,0%.",
          "El ticket promedio cayó en el mismo periodo.",
          "La presión de costo operativo por sí sola no explica la pérdida de margen bruto.",
        ],
        calculation: "Gap de margen bruto 35,0% - 31,8% = 3,2 puntos porcentuales.",
        epistemicStatus: "Working assumption",
        source: "Interpretación del modelo basada en inputs listados",
        lastUpdated: "Hoy 08:40",
        limitations: "No existe aún puente de margen por cliente, SKU o excepción de descuento.",
        assumptionDependency: "Asume que descuentos y mix pesan más que un shock único de costo.",
        provenance: {
          origin: "Dataset de demostración",
          priority: "Protección de margen",
          transformation: "Comparación de margen bruto contra budget y periodo anterior, vinculada al ticket promedio.",
          freshness: "Periodo demo actual",
          dependencies: ["Margen bruto", "Ticket promedio", "Costo operativo"],
        },
      },
      {
        id: "cash-cycle",
        title: "El riesgo de preservación de caja surge de cobranzas, no solo de rentabilidad.",
        observation:
          "El ciclo de conversión de caja es 58 días, 9 días por encima del budget y 6 días peor que el periodo anterior.",
        businessImpact:
          "El equipo financiero puede necesitar liquidez de corto plazo adicional aunque la actividad comercial parezca estable.",
        likelyDriver:
          "El envejecimiento de cuentas por cobrar en clientes estratégicos está extendiendo la cobranza y reduciendo flexibilidad operativa.",
        confidence: 78,
        findingType: "Verified finding",
        severity: "Medium",
        recommendedAction:
          "Escalar los dos clientes estratégicos vencidos y actualizar el forecast de caja de 13 semanas con el ciclo de cobranza más largo.",
        evidence: [
          "Ciclo de conversión de caja real 58 días versus budget 49 días.",
          "El ciclo del periodo anterior fue 52 días.",
          "El reporte de ejemplo marca dos clientes estratégicos vencidos.",
        ],
        calculation: "Desvío CCC +9 días versus budget; +6 días versus periodo anterior.",
        epistemicStatus: "Verified fact",
        source: "Dataset de demostración",
        lastUpdated: "Hoy 08:40",
        limitations: "El reporte visible no incluye saldo de caja ERP ni promesas de pago de clientes.",
        assumptionDependency: "No requiere supuesto causal; el desvío CCC es visible directamente.",
        provenance: {
          origin: "Dataset de demostración",
          priority: "Preservación de caja",
          transformation: "Comparación de ciclo de conversión de caja contra budget y periodo anterior.",
          freshness: "Periodo demo actual",
          dependencies: ["Ciclo de conversión de caja", "Flag de cuentas por cobrar"],
        },
      },
      {
        id: "data-gap",
        title: "Management no debería cerrar la causa raíz sin detalle por cliente.",
        observation:
          "El reporte de ejemplo identifica concentración por segmento pero no incluye detalle de descuentos, SKU y rentabilidad por cliente a nivel factura.",
        businessImpact:
          "Una recomendación confiable sobre precio, mix o cliente requiere evidencia más granular.",
        likelyDriver:
          "La falta de un puente de margen por cliente y SKU limita la precisión del diagnóstico.",
        confidence: 69,
        findingType: "Missing data",
        severity: "Low",
        recommendedAction:
          "Solicitar detalle de cliente, SKU, descuento y margen de contribución antes de aprobar cambios amplios de precios.",
        evidence: [
          "El problema por segmento es visible.",
          "No se incluye rentabilidad a nivel factura.",
          "Faltan datos de excepciones de descuento.",
        ],
        calculation: "Gap de completitud: insight por segmento disponible; prueba a nivel factura no disponible.",
        epistemicStatus: "Insufficient data",
        source: "Dataset de demostración",
        lastUpdated: "Hoy 08:40",
        limitations: "No puede validar precio, mix o rentabilidad de cliente a nivel transacción.",
        assumptionDependency: "Toda recomendación por cliente depende de detalles todavía no visibles.",
        provenance: {
          origin: "Dataset de demostración",
          priority: "Protección de margen",
          transformation: "Comparación entre datos disponibles y evidencia necesaria para cerrar causa raíz.",
          freshness: "Periodo demo actual",
          dependencies: ["Rentabilidad por cliente", "Margen SKU", "Excepciones de descuento"],
        },
      },
    ],
    unknowns: [
      {
        missing: "Margen de contribución por cliente y SKU",
        whyItMatters:
          "Sin eso, management puede tratar un problema de mix como un problema de volumen.",
        owner: "FP&A + Operaciones Comerciales",
        speed: "1-2 días hábiles",
        canProceed:
          "El puente de margen puede empezar ahora; cambios amplios de precio o forecast deben esperar.",
      },
      {
        missing: "Riesgo de churn en clientes estratégicos",
        whyItMatters:
          "Un cliente de bajo margen puede merecer protección si sostiene una relación enterprise futura.",
        owner: "Director Comercial",
        speed: "Mismo día con revisión de cuentas",
        canProceed:
          "Avanzar con revisión dirigida, no con acción amplia por cliente.",
      },
      {
        missing: "Compromisos de proveedor y contratos ya firmados",
        whyItMatters:
          "Si los compromisos son irreversibles, la recomendación cambia de espera a mitigación.",
        owner: "Procurement + Controller",
        speed: "Dentro de 24 horas",
        canProceed:
          "No aprobar gasto irreversible hasta verificar compromisos.",
      },
    ],
    decisions: [
      {
        id: "margin-bridge",
        recommendation: "Construir un puente de margen antes de revisar el forecast de ingresos.",
        why: "El gap de ingresos está conectado con ticket promedio y margen bruto, por lo que la empresa necesita claridad sobre drivers antes de una acción comercial amplia.",
        riskOfInaction:
          "Management puede perseguir volumen mientras acepta ingresos de menor calidad y erosión continua de margen.",
        owner: "FP&A + Sales",
        kpi: "Margen bruto",
        priority: "Executive decision",
        readiness: {
          level: "Ready to act",
          confidence: "High",
          dimensions: {
            financialMateriality: "High",
            urgency: "Medium",
            reversibility: "High",
            evidenceQuality: "Medium",
            downsideExposure: "Medium",
          },
        },
        evidence: [
          {
            label: "Ingresos 8,0% por debajo del budget.",
            status: "Verified fact",
            source: "Dataset de demostración",
          },
          {
            label: "La caída del ticket probablemente está conectada con erosión de margen.",
            status: "Model inference",
            source: "Interpretación del modelo basada en inputs listados",
          },
        ],
        assumptions: [
          {
            statement: "La estabilidad de órdenes es direccionalmente confiable.",
            dependsOn: "Cantidad de órdenes a nivel resumen",
          },
        ],
        unknowns: [
          {
            missing: "Detalle de descuento y rentabilidad a nivel factura",
            whyItMatters: "Determina si la acción pertenece a pricing, mix o account management.",
            owner: "FP&A",
            speed: "1-2 días hábiles",
            canProceed: "Sí. El puente es reversible y genera evidencia.",
          },
        ],
        changeConditions: [
          "El margen por cliente muestra que el gap se concentra en un contrato temporal.",
          "La conversión de pipeline confirma recuperación de órdenes de mayor margen.",
          "Costos de proveedor explican más del 70% del gap de margen bruto.",
        ],
        challenge: {
          argument:
            "La recomendación puede enfocarse demasiado en margen e ignorar estacionalidad o valor estratégico de clientes.",
          opposingEvidence: [
            "La baja de ingresos podría ser estacional.",
            "Un cliente estratégico puede justificar menor margen ahora.",
          ],
          weakAssumptions: [
            "La estabilidad de órdenes puede ocultar cambios por segmento.",
          ],
          costIfWrong:
            "Management podría demorar acción comercial cuando el problema real es estacional.",
          compromise:
            "Construir el puente en 48 horas y permitir acciones reversibles por cuenta estratégica.",
        },
        revision: {
          status: "Partially revised",
          newInformation: "El usuario agrega que el cliente es estratégico pese al bajo margen.",
          impact:
            "La recomendación cambia de congelamiento amplio a revisión por segmento y cuenta.",
          revisedRecommendation:
            "Construir el puente de margen preservando excepciones de clientes estratégicos hasta revisar valor de cuenta.",
          remainingUncertainty:
            "Valor largo plazo y riesgo de churn aún requieren validación del account owner.",
        },
        expectedOutcome:
          "Management separa precio, volumen, mix y costo antes de cambiar el forecast.",
        reviewDate: "2026-07-24",
      },
      {
        id: "discount-freeze",
        recommendation: "Congelar descuentos no estándar hasta revisar rentabilidad por cliente.",
        why: "Los descuentos son un driver plausible tanto de la caída del ticket promedio como de la presión sobre margen.",
        riskOfInaction:
          "La empresa puede normalizar excepciones que convierten recuperación de ingresos en pérdida de EBITDA.",
        owner: "Director Comercial",
        kpi: "Ticket promedio",
        priority: "Act today",
        readiness: {
          level: "Act with safeguards",
          confidence: "Medium",
          dimensions: {
            financialMateriality: "High",
            urgency: "High",
            reversibility: "Medium",
            evidenceQuality: "Medium",
            downsideExposure: "High",
          },
        },
        changeConditions: [
          "La revisión de cuentas muestra que las excepciones protegen valor estratégico.",
          "Compromisos firmados hacen impracticable un congelamiento amplio.",
          "Los datos muestran que las aprobaciones ya cumplen política.",
        ],
        challenge: {
          argument:
            "Congelar descuentos puede proteger margen pero dañar relaciones estratégicas si se aplica sin contexto.",
          opposingEvidence: [
            "Dos clientes de bajo margen pueden ser estratégicos.",
            "Algunos descuentos pueden ser contractuales.",
          ],
          weakAssumptions: [
            "El reporte no separa descuentos contractuales de discrecionales.",
          ],
          costIfWrong:
            "La empresa podría crear fricción evitable con clientes.",
          compromise:
            "Congelar solo nuevas excepciones discrecionales y revisar cuentas estratégicas por separado.",
        },
        expectedOutcome:
          "Se reduce fuga de margen mientras se distingue descuento estratégico de discrecional.",
        reviewDate: "2026-07-23",
      },
      {
        id: "cash-forecast",
        recommendation: "Actualizar el forecast de caja de 13 semanas con el ciclo de cobranza más largo.",
        why: "El deterioro de cuentas por cobrar puede generar estrés de liquidez aunque el volumen de órdenes parezca estable.",
        riskOfInaction:
          "Las necesidades de financiamiento de corto plazo pueden descubrirse demasiado tarde para una acción disciplinada de tesorería.",
        owner: "Tesorería / Controller",
        kpi: "Ciclo de conversión de caja",
        priority: "Act today",
        readiness: {
          level: "Ready to act",
          confidence: "High",
          dimensions: {
            financialMateriality: "High",
            urgency: "High",
            reversibility: "High",
            evidenceQuality: "High",
            downsideExposure: "Medium",
          },
        },
        changeConditions: [
          "Saldo ERP confirma liquidez por encima del umbral de política.",
          "Clientes vencidos confirman fechas de pago dentro del forecast.",
          "Cobranzas superan forecast 10% por dos semanas consecutivas.",
        ],
        challenge: {
          argument:
            "El forecast puede sobreestimar riesgo si las cuentas vencidas ya tienen promesas de pago confirmadas.",
          opposingEvidence: [
            "El reporte visible no incluye promesas de pago.",
            "El saldo ERP no está conectado en el demo.",
          ],
          weakAssumptions: [
            "El retraso de cobranzas persistirá durante la ventana de forecast.",
          ],
          costIfWrong:
            "Tesorería podría crear cautela innecesaria y frenar gasto útil.",
          compromise:
            "Actualizar forecast ahora, separando promesas de pago como sensibilidad no confirmada.",
        },
        expectedOutcome:
          "Tesorería ve exposición de liquidez temprano sin sobrerreaccionar.",
        reviewDate: "2026-07-22",
      },
    ],
    journal: [
      {
        id: "journal-001",
        decision: "Postergar revisión completa del forecast hasta terminar puente de margen.",
        date: "2026-07-20",
        responsiblePerson: "FP&A Lead",
        evidenceAtDecision: "Ingresos -8,0%; ticket -11,0%; margen bruto -3,2 pts.",
        unresolvedAssumptions: "Falta rentabilidad por cliente y detalle de descuentos.",
        expectedOutcome: "Forecast refleja precio, mix y calidad de margen, no solo volumen.",
        reviewDate: "2026-07-24",
        actualOutcome: "Pendiente",
      },
    ],
    graphLinks: [
      {
        from: "Reporte / datos KPI",
        to: "Observar",
        body: "Ingerir datos financieros, comerciales, operativos y de reporting de management.",
      },
      {
        from: "Desvíos y relaciones KPI",
        to: "Interpretar",
        body: "Calcular cambios, notar tensiones y clasificar la calidad de evidencia.",
      },
      {
        from: "Hipótesis de causa raíz",
        to: "Juzgar",
        body: "Separar lo importante del ruido y explicar el nivel de confianza.",
      },
      {
        from: "Responsables, fechas, KPIs de seguimiento",
        to: "Actuar",
        body: "Convertir interpretación en acciones con accountability.",
      },
      {
        from: "Decisiones previas y resultados",
        to: "Aprender",
        body: "Construir memoria de la empresa en el tiempo.",
      },
    ],
  },
};

function severityClass(severity: Severity) {
  return {
    High: "severityHigh",
    Medium: "severityMedium",
    Low: "severityLow",
  }[severity];
}

function priorityClass(priority: PriorityLevel) {
  return {
    "Executive decision": "priorityExecutive",
    "Act today": "priorityAct",
    Monitor: "priorityMonitor",
  }[priority];
}

function sourceTypeClass(type: FindingType) {
  return {
    "Verified finding": "statusConfirmed",
    "Calculated result": "statusInference",
    Hypothesis: "statusApproval",
    "Missing data": "statusIncorrect",
  }[type];
}

function epistemicForInsight(insight: Insight): EpistemicStatus {
  if (insight.epistemicStatus) {
    return insight.epistemicStatus;
  }
  return {
    "Verified finding": "Verified fact",
    "Calculated result": "Model inference",
    Hypothesis: "Working assumption",
    "Missing data": "Insufficient data",
  }[insight.findingType] as EpistemicStatus;
}

function statusClass(
  status: EpistemicStatus | ReadinessLevel | ConfidenceLevel | PermissionState | RevisionStatus,
) {
  if (
    status === "Verified fact" ||
    status === "User-provided information" ||
    status === "Ready to act" ||
    status === "Proceed" ||
    status === "High" ||
    status === "Unchanged"
  ) {
    return "scoreHigh";
  }
  if (
    status === "Model inference" ||
    status === "Working assumption" ||
    status === "Act with safeguards" ||
    status === "Gather more evidence" ||
    status === "Proceed with Safeguards" ||
    status === "Run a Pilot First" ||
    status === "Gather More Evidence" ||
    status === "Escalate" ||
    status === "Medium" ||
    status === "Partially revised"
  ) {
    return "scoreMedium";
  }
  return "scoreLow";
}

function defaultReadiness(decision: Decision): DecisionReadiness {
  return (
    decision.readiness ?? {
      level: decision.priority === "Monitor" ? "Gather more evidence" : "Act with safeguards",
      confidence: "Medium",
      dimensions: {
        financialMateriality: "Medium",
        urgency: decision.priority === "Act today" ? "High" : "Medium",
        reversibility: "Medium",
        evidenceQuality: "Medium",
        downsideExposure: decision.priority === "Executive decision" ? "High" : "Medium",
      },
    }
  );
}

function defaultAuthorization(decision: Decision): DecisionAuthorization {
  if (decision.authorization) {
    return decision.authorization;
  }
  const readiness = defaultReadiness(decision);
  const permissionState: PermissionState =
    readiness.level === "Ready to act"
      ? "Proceed"
      : readiness.level === "Act with safeguards"
        ? "Proceed with Safeguards"
        : readiness.level === "Gather more evidence"
          ? "Gather More Evidence"
          : "Wait";

  return {
    confidence: {
      level: readiness.confidence,
      reasons: [
        "Evidence quality, freshness, missing information, and conflicting signals are evaluated separately from execution risk.",
      ],
    },
    permission: {
      state: permissionState,
      explanation:
        "Permission is based on reversibility, financial exposure, time pressure, governance, operational risk, and confidence influence.",
      reasons: [
        "Confidence informs permission, but it does not determine permission by itself.",
        "The organization should act only when the business context justifies execution now.",
      ],
      dimensions: {
        reversibility: readiness.dimensions.reversibility,
        financialExposure: readiness.dimensions.downsideExposure,
        timePressure: readiness.dimensions.urgency,
        governance: readiness.dimensions.financialMateriality,
        operationalRisk: readiness.dimensions.downsideExposure,
        confidenceInfluence: readiness.confidence,
      },
    },
    distinction:
      "Confidence estimates how likely the assessment is to be correct. Permission to Act evaluates whether acting now is justified despite uncertainty.",
  };
}

function defaultChallenge(decision: Decision): ChallengeCase {
  return (
    decision.challenge ?? {
      argument:
        "The current direction may be correct, but the visible evidence may not fully represent customer, contract, or cash context.",
      opposingEvidence: [
        "The demo does not include ERP cash balances or signed commitments.",
        "Customer-level profitability is not yet visible.",
      ],
      weakAssumptions: ["The visible KPI pattern reflects current operating reality."],
      costIfWrong:
        "Management could act on a plausible interpretation before validating the missing business context.",
      compromise:
        "Use a reversible next step while collecting the evidence needed for any irreversible commitment.",
    }
  );
}

function createRevision(input: string, decision: Decision): AssessmentRevision {
  const normalized = input.toLowerCase();
  if (normalized.includes("signed") || normalized.includes("supplier") || normalized.includes("firmamos")) {
    return {
      status: "Fully reversed",
      newInformation: input,
      impact:
        "The new information changes reversibility. If a commitment is already signed, the responsible move shifts from delay to mitigation.",
      revisedRecommendation:
        "Do not treat this as an avoidable decision. Confirm the contract terms, update the cash forecast, and negotiate mitigation levers.",
      remainingUncertainty:
        "The desk still needs contract value, cancellation terms, payment dates, and operational obligations.",
    };
  }
  if (
    normalized.includes("season") ||
    normalized.includes("strategic") ||
    normalized.includes("estratég") ||
    normalized.includes("liquidity") ||
    normalized.includes("liquidez")
  ) {
    return {
      status: "Partially revised",
      newInformation: input,
      impact:
        "The new context weakens the broad version of the recommendation and increases the need for segmented treatment.",
      revisedRecommendation:
        decision.revision?.revisedRecommendation ??
        "Keep the direction, but limit it to reversible actions until the new context is validated.",
      remainingUncertainty:
        "The desk still needs evidence showing whether this context applies broadly or only to one segment.",
    };
  }
  return {
    status: "Unchanged",
    newInformation: input,
    impact:
      "The new information is relevant, but it does not yet change the visible evidence behind the current assessment.",
    revisedRecommendation: decision.recommendation,
    remainingUncertainty:
      "The assessment would change if the user adds quantified evidence or confirmed contractual constraints.",
  };
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const copy = copies[locale];
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    copy.priorities[1],
    copy.priorities[2],
    copy.priorities[3],
  ]);
  const [uploadedFile, setUploadedFile] = useState("");
  const [status, setStatus] = useState(copy.sampleReady);
  const [activeInsightId, setActiveInsightId] = useState(copy.insights[0].id);
  const [activeDecisionId, setActiveDecisionId] = useState(copy.decisions[0].id);
  const [openProvenanceId, setOpenProvenanceId] = useState(copy.insights[0].id);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [challengeInput, setChallengeInput] = useState("");
  const [revision, setRevision] = useState<AssessmentRevision | null>(null);
  const [journalEntries, setJournalEntries] = useState<DecisionJournalEntry[]>(copy.journal);

  const activeInsight =
    copy.insights.find((insight) => insight.id === activeInsightId) ?? copy.insights[0];
  const activeDecision =
    copy.decisions.find((decision) => decision.id === activeDecisionId) ?? copy.decisions[0];
  const activeAuthorization = defaultAuthorization(activeDecision);
  const activeChallenge = defaultChallenge(activeDecision);
  const activeProvenance = activeInsight.provenance ?? {
    origin: activeInsight.source ?? "Demonstration dataset",
    priority: selectedPriorities[0] ?? copy.priorities[0],
    transformation: activeInsight.calculation,
    freshness: activeInsight.lastUpdated ?? "Current demo period",
    dependencies: activeInsight.evidence,
  };

  const prioritizedInsights = useMemo(() => {
    const marginWeight = selectedPriorities.includes(copy.priorities[1]) ? 12 : 0;
    const cashWeight = selectedPriorities.includes(copy.priorities[2]) ? 8 : 0;

    return [...copy.insights].sort((a, b) => {
      const scoreA =
        a.confidence +
        (a.id.includes("margin") || a.id.includes("revenue") ? marginWeight : 0) +
        (a.id.includes("cash") ? cashWeight : 0);
      const scoreB =
        b.confidence +
        (b.id.includes("margin") || b.id.includes("revenue") ? marginWeight : 0) +
        (b.id.includes("cash") ? cashWeight : 0);
      return scoreB - scoreA;
    });
  }, [copy, selectedPriorities]);

  function switchLocale(nextLocale: Locale) {
    const nextCopy = copies[nextLocale];
    setLocale(nextLocale);
    setSelectedPriorities([
      nextCopy.priorities[1],
      nextCopy.priorities[2],
      nextCopy.priorities[3],
    ]);
    setStatus(uploadedFile ? nextCopy.reportStaged(uploadedFile) : nextCopy.sampleReady);
    setActiveInsightId(nextCopy.insights[0].id);
    setActiveDecisionId(nextCopy.decisions[0].id);
    setOpenProvenanceId(nextCopy.insights[0].id);
    setChallengeOpen(false);
    setChallengeInput("");
    setRevision(null);
    setJournalEntries(nextCopy.journal);
  }

  function togglePriority(priority: string) {
    setSelectedPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority],
    );
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const fileName = event.target.files?.[0]?.name;
    if (!fileName) {
      return;
    }
    setUploadedFile(fileName);
    setStatus(copy.reportStaged(fileName));
  }

  function runAnalysis() {
    setStatus(uploadedFile ? copy.reportAnalyzed(uploadedFile) : copy.sampleAnalyzed);
    setActiveInsightId(prioritizedInsights[0].id);
  }

  function reviseAssessment() {
    const trimmed = challengeInput.trim();
    if (!trimmed) {
      return;
    }
    setRevision(createRevision(trimmed, activeDecision));
  }

  function recordDecision(action: keyof Copy["journalButtons"]) {
    const now = new Date().toISOString().slice(0, 10);
    const entry: DecisionJournalEntry = {
      id: `${activeDecision.id}-${action}-${journalEntries.length}`,
      decision: `${copy.journalButtons[action]}: ${activeDecision.recommendation}`,
      date: now,
      responsiblePerson: activeDecision.owner,
      evidenceAtDecision:
        activeDecision.evidence?.map((item) => item.label).join(" ") ??
        activeInsight.evidence.join(" "),
      unresolvedAssumptions:
        activeDecision.assumptions?.map((item) => item.statement).join(" ") ??
        activeDecision.riskOfInaction,
      expectedOutcome:
        activeDecision.expectedOutcome ?? "Outcome to be reviewed against the selected KPI.",
      reviewDate: activeDecision.reviewDate ?? "Next management review",
      actualOutcome: revision ? copy.revisionStatus[revision.status] : "Pending",
    };
    setJournalEntries((current) => [entry, ...current].slice(0, 4));
  }

  return (
    <main className="appShell">
      <section className="decisionHero" aria-label="Executive interpretation workspace">
        <div className="heroCopy">
          <div className="heroTopline">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <div className="languageSwitch" aria-label="Language selector">
              {(["en", "es"] as Locale[]).map((item) => (
                <button
                  aria-pressed={locale === item}
                  className={locale === item ? "active" : ""}
                  key={item}
                  onClick={() => switchLocale(item)}
                  type="button"
                >
                  {copies[item].shortLocale}
                </button>
              ))}
            </div>
          </div>
          <h1>CFO Signal Desk</h1>
          <p className="heroText">{copy.heroText}</p>
        </div>
        <aside className="nextDecision" aria-label="Executive decision from report">
          <span className="statusPill">{status}</span>
          <p className="eyebrow">{copy.executiveDecision}</p>
          <h2>{copy.executiveDecisionTitle}</h2>
          <p>{copy.executiveDecisionBody}</p>
          <div className="scoreRail">
            <ScoreBar label={copy.scoreBusinessImpact} value={91} />
            <ScoreBar label={copy.scoreUrgency} value={86} />
            <ScoreBar label={copy.scoreConfidence} value={activeInsight.confidence} />
          </div>
        </aside>
      </section>

      <section className="reportFlow" aria-label="Report input and context">
        <div className="uploadPanel">
          <p className="eyebrow">{copy.inputEyebrow}</p>
          <h2>{copy.inputTitle}</h2>
          <div className="uploadActions">
            <label className="uploadButton">
              {copy.uploadReport}
              <input accept=".csv,.xlsx,.xls,.pdf" onChange={handleUpload} type="file" />
            </label>
            <button className="secondaryButton" onClick={runAnalysis} type="button">
              {copy.trySample}
            </button>
          </div>
          <p className="inputNote">{copy.inputNote}</p>
        </div>

        <div className="priorityPanel">
          <p className="eyebrow">{copy.prioritiesEyebrow}</p>
          <div className="priorityGrid" role="group" aria-label={copy.prioritiesEyebrow}>
            {copy.priorities.map((priority) => (
              <button
                aria-pressed={selectedPriorities.includes(priority)}
                className={
                  selectedPriorities.includes(priority)
                    ? "priorityButton active"
                    : "priorityButton"
                }
                key={priority}
                onClick={() => togglePriority(priority)}
                type="button"
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="decisionWorkspace" aria-label="Report interpretation">
        <article className="briefPanel">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">{copy.engineEyebrow}</p>
              <h2>{copy.engineTitle}</h2>
            </div>
            <div className="metricCluster" aria-label="Analysis metrics">
              <MiniMetric label={copy.metrics.kpis} value={copy.kpiRows.length.toString()} />
              <MiniMetric label={copy.metrics.findings} value={copy.insights.length.toString()} />
              <MiniMetric label={copy.metrics.mode} value={copy.metrics.demo} />
            </div>
          </div>

          <div className="kpiTable" role="table" aria-label="Sample KPI variance table">
            <div className="kpiHeader" role="row">
              <span>{copy.table.metric}</span>
              <span>{copy.table.actual}</span>
              <span>{copy.table.budget}</span>
              <span>{copy.table.prior}</span>
              <span>{copy.table.variance}</span>
            </div>
            {copy.kpiRows.map((row) => (
              <button
                className="kpiRow"
                key={row.metric}
                onClick={() => {
                  const match = copy.insights.find((insight) =>
                    insight.evidence.some((item) => item.includes(row.metric)),
                  );
                  if (match) {
                    setActiveInsightId(match.id);
                  }
                }}
                role="row"
                type="button"
              >
                <strong>{row.metric}</strong>
                <span>{row.actual}</span>
                <span>{row.budget}</span>
                <span>{row.prior}</span>
                <em className={severityClass(row.status)}>{row.variance}</em>
              </button>
            ))}
          </div>

          <section className="insightDetail" aria-label="Active management insight">
            <div className="cardTopline">
              <strong className={severityClass(activeInsight.severity)}>
                {copy.severity[activeInsight.severity]}
              </strong>
              <strong className={sourceTypeClass(activeInsight.findingType)}>
                {copy.findingType[activeInsight.findingType]}
              </strong>
            </div>
            <h2>{activeInsight.title}</h2>
            <div className="epistemicGrid">
              <MetaPill
                label={copy.epistemicLabel}
                value={copy.epistemicStatus[epistemicForInsight(activeInsight)]}
                tone={statusClass(epistemicForInsight(activeInsight))}
              />
              <MetaPill
                label={copy.sourceLabel}
                value={activeInsight.source ?? "Demonstration dataset"}
                tone="statusInference"
              />
              <MetaPill
                label={copy.lastUpdatedLabel}
                value={activeInsight.lastUpdated ?? "Current demo period"}
                tone="statusConfirmed"
              />
            </div>
            <div className="insightGrid">
              <InsightStep title={copy.insightLabels.observation} body={activeInsight.observation} />
              <InsightStep
                title={copy.insightLabels.businessImpact}
                body={activeInsight.businessImpact}
              />
              <InsightStep title={copy.insightLabels.likelyDriver} body={activeInsight.likelyDriver} />
              <InsightStep
                title={copy.insightLabels.recommendedAction}
                body={activeInsight.recommendedAction}
              />
            </div>
            <div className="evidenceStrip">
              <div>
                <p className="eyebrow">{copy.insightLabels.calculation}</p>
                <p>{activeInsight.calculation}</p>
              </div>
              <div>
                <p className="eyebrow">{copy.insightLabels.evidence}</p>
                <ul>
                  {activeInsight.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <ScoreBar label={copy.scoreConfidence} value={activeInsight.confidence} />
            </div>
            <button
              className="provenanceButton"
              onClick={() =>
                setOpenProvenanceId((current) =>
                  current === activeInsight.id ? "" : activeInsight.id,
                )
              }
              type="button"
            >
              {copy.provenanceButton}
            </button>
            {openProvenanceId === activeInsight.id ? (
              <section className="provenanceDrawer" aria-label={copy.provenanceTitle}>
                <div>
                  <p className="eyebrow">{copy.provenanceTitle}</p>
                  <dl>
                    <div>
                      <dt>{copy.sourceLabel}</dt>
                      <dd>{activeProvenance.origin}</dd>
                    </div>
                    <div>
                      <dt>{copy.prioritiesEyebrow}</dt>
                      <dd>{activeProvenance.priority}</dd>
                    </div>
                    <div>
                      <dt>{copy.lastUpdatedLabel}</dt>
                      <dd>{activeProvenance.freshness}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <p className="eyebrow">{copy.insightLabels.calculation}</p>
                  <p>{activeProvenance.transformation}</p>
                  <p className="eyebrow">{copy.dependenciesLabel}</p>
                  <ul>
                    {activeProvenance.dependencies.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow">{copy.limitationsLabel}</p>
                  <p>{activeInsight.limitations ?? activeInsight.businessImpact}</p>
                  <p className="eyebrow">{copy.assumptionLabel}</p>
                  <p>{activeInsight.assumptionDependency ?? activeInsight.likelyDriver}</p>
                </div>
              </section>
            ) : null}
          </section>
        </article>

        <aside className="actionPanel" aria-label="Management actions and watchlist">
          <ActionGroup title={copy.actionPanel.executiveSummary} items={copy.summaries} />
          <ActionGroup title={copy.actionPanel.managementQuestions} items={copy.questions} />
          <div className="watchBox">
            <p className="eyebrow">{copy.actionPanel.kpiWatchlist}</p>
            <ol>
              {copy.watchlist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </aside>
      </section>

      <section className="unknownsPanel" aria-label={copy.unknownsEyebrow}>
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">{copy.unknownsEyebrow}</p>
            <h2>{copy.unknownsTitle}</h2>
          </div>
        </div>
        <div className="unknownGrid">
          {copy.unknowns.map((unknown) => (
            <article className="unknownCard" key={unknown.missing}>
              <h3>{unknown.missing}</h3>
              <dl>
                <div>
                  <dt>{copy.unknownLabels.why}</dt>
                  <dd>{unknown.whyItMatters}</dd>
                </div>
                <div>
                  <dt>{copy.unknownLabels.owner}</dt>
                  <dd>{unknown.owner}</dd>
                </div>
                <div>
                  <dt>{copy.unknownLabels.speed}</dt>
                  <dd>{unknown.speed}</dd>
                </div>
                <div>
                  <dt>{copy.unknownLabels.proceed}</dt>
                  <dd>{unknown.canProceed}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="insightLibrary" aria-label="Key management interpretations">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">{copy.topInsightsEyebrow}</p>
            <h2>{copy.topInsightsTitle}</h2>
          </div>
        </div>
        <div className="objectGrid">
          {prioritizedInsights.map((insight) => (
            <button
              className={insight.id === activeInsight.id ? "objectCard active" : "objectCard"}
              key={insight.id}
              onClick={() => setActiveInsightId(insight.id)}
              type="button"
            >
              <div className="cardTopline">
                <span>{copy.findingType[insight.findingType]}</span>
                <strong className={severityClass(insight.severity)}>
                  {copy.severity[insight.severity]}
                </strong>
              </div>
              <h3>{insight.title}</h3>
              <p>{insight.observation}</p>
              <p className="nextAction">{insight.recommendedAction}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="graphAndLinkedIn" aria-label="Direction and meaning loop">
        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">{copy.decisionsEyebrow}</p>
              <h2>{copy.decisionsTitle}</h2>
            </div>
          </div>
          <div className="decisionList">
            {copy.decisions.map((decision) => (
              <article
                className={
                  decision.id === activeDecision.id ? "decisionItem active" : "decisionItem"
                }
                key={decision.recommendation}
              >
                <div>
                  <strong className={priorityClass(decision.priority)}>
                    {copy.priority[decision.priority]}
                  </strong>
                  <h3>{decision.recommendation}</h3>
                  <p>{decision.why}</p>
                  <button
                    className="textButton"
                    onClick={() => {
                      setActiveDecisionId(decision.id);
                      setChallengeOpen(false);
                      setRevision(null);
                    }}
                    type="button"
                  >
                    {copy.readinessTitle}
                  </button>
                </div>
                <dl>
                  <div>
                    <dt>{copy.decisionLabels.owner}</dt>
                    <dd>{decision.owner}</dd>
                  </div>
                  <div>
                    <dt>{copy.decisionLabels.kpi}</dt>
                    <dd>{decision.kpi}</dd>
                  </div>
                  <div>
                    <dt>{copy.decisionLabels.risk}</dt>
                    <dd>{decision.riskOfInaction}</dd>
                  </div>
                  <div>
                    <dt>{copy.permissionLabel}</dt>
                    <dd>
                      {copy.permissionStates[defaultAuthorization(decision).permission.state]}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </article>

        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">{copy.aiOsEyebrow}</p>
              <h2>{copy.aiOsTitle}</h2>
            </div>
          </div>
          <div className="graphList">
            {copy.graphLinks.map((link) => (
              <GraphLink body={link.body} from={link.from} key={link.from} to={link.to} />
            ))}
          </div>
        </article>
      </section>

      <section className="trustWorkspace" aria-label="Decision authorization and challenge mode">
        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">{copy.authorizationTitle}</p>
              <h2>{activeDecision.recommendation}</h2>
              <p className="inputNote">{copy.authorizationSubtitle}</p>
            </div>
          </div>
          <div className="authorizationCards">
            <article className="authorizationCard">
              <div className="cardTopline">
                <p className="eyebrow">{copy.confidenceLabel}</p>
                <strong className={statusClass(activeAuthorization.confidence.level)}>
                  {copy.confidenceLevel[activeAuthorization.confidence.level]}
                </strong>
              </div>
              <p>{copy.confidenceReasonLabel}</p>
              <ul>
                {activeAuthorization.confidence.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </article>
            <article className="authorizationCard permissionCard">
              <div className="cardTopline">
                <p className="eyebrow">{copy.permissionLabel}</p>
                <strong className={statusClass(activeAuthorization.permission.state)}>
                  {copy.permissionStates[activeAuthorization.permission.state]}
                </strong>
              </div>
              <p>{activeAuthorization.permission.explanation}</p>
              <ul>
                {activeAuthorization.permission.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="distinctionLine">
            <strong>{copy.readinessTitle}</strong>
            <span>{activeAuthorization.distinction}</span>
          </div>
          <p className="eyebrow">{copy.permissionDimensionsTitle}</p>
          <div className="dimensionGrid">
            {Object.entries(activeAuthorization.permission.dimensions).map(([key, value]) => (
              <MetaPill
                key={key}
                label={dimensionLabel(key)}
                value={copy.confidenceLevel[value]}
                tone={statusClass(value)}
              />
            ))}
          </div>
          <div className="splitGrid">
            <EvidenceList
              assumptions={activeDecision.assumptions ?? []}
              copy={copy}
              evidence={activeDecision.evidence ?? []}
            />
            <ChangeConditions copy={copy} items={activeDecision.changeConditions ?? []} />
          </div>
        </article>

        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">{copy.challengeTitle}</p>
              <h2>{copy.challengeButton}</h2>
            </div>
            <button
              className="secondaryButton"
              onClick={() => setChallengeOpen((current) => !current)}
              type="button"
            >
              {copy.challengeButton}
            </button>
          </div>
          {challengeOpen ? (
            <div className="challengeCase">
              <p>{activeChallenge.argument}</p>
              <ActionGroup
                title={copy.challengeLabels.opposing}
                items={activeChallenge.opposingEvidence}
              />
              <ActionGroup
                title={copy.challengeLabels.assumptions}
                items={activeChallenge.weakAssumptions}
              />
              <InsightStep title={copy.challengeLabels.cost} body={activeChallenge.costIfWrong} />
              <InsightStep title={copy.challengeLabels.compromise} body={activeChallenge.compromise} />
            </div>
          ) : null}
          <div className="challengeInput">
            <p className="eyebrow">{copy.userChallengeTitle}</p>
            <textarea
              onChange={(event) => setChallengeInput(event.target.value)}
              placeholder={copy.challengePlaceholder}
              value={challengeInput}
            />
            <button className="primaryButton" onClick={reviseAssessment} type="button">
              {copy.applyChallenge}
            </button>
          </div>
          {revision ? <RevisionPanel copy={copy} revision={revision} /> : null}
        </article>
      </section>

      <section className="journalAndTrust" aria-label="Decision journal and limitations">
        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">{copy.journalTitle}</p>
              <h2>{copy.journalTitle}</h2>
            </div>
            <div className="journalActions">
              {(["accept", "reject", "modify", "postpone"] as Array<
                keyof Copy["journalButtons"]
              >).map((action) => (
                <button key={action} onClick={() => recordDecision(action)} type="button">
                  {copy.journalButtons[action]}
                </button>
              ))}
            </div>
          </div>
          <div className="journalList">
            {journalEntries.length ? (
              journalEntries.map((entry) => (
                <article className="journalEntry" key={entry.id}>
                  <h3>{entry.decision}</h3>
                  <dl>
                    <div>
                      <dt>{copy.journalLabels.evidence}</dt>
                      <dd>{entry.evidenceAtDecision}</dd>
                    </div>
                    <div>
                      <dt>{copy.journalLabels.assumptions}</dt>
                      <dd>{entry.unresolvedAssumptions}</dd>
                    </div>
                    <div>
                      <dt>{copy.journalLabels.expected}</dt>
                      <dd>{entry.expectedOutcome}</dd>
                    </div>
                    <div>
                      <dt>{copy.journalLabels.review}</dt>
                      <dd>{entry.reviewDate}</dd>
                    </div>
                    <div>
                      <dt>{copy.journalLabels.actual}</dt>
                      <dd>{entry.actualOutcome}</dd>
                    </div>
                  </dl>
                </article>
              ))
            ) : (
              <p className="inputNote">No decision has been recorded yet.</p>
            )}
          </div>
        </article>

        <aside className="trustPanel">
          <div>
            <p className="eyebrow">{copy.disciplineEyebrow}</p>
            <h2>{copy.disciplineTitle}</h2>
            <p>{copy.disciplineBody}</p>
          </div>
          <div>
            <p className="eyebrow">{copy.trustTitle}</p>
            <ul>
              {copy.trustItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="alignmentPanel" aria-label="Founder advantage and product thesis">
        <div>
          <p className="eyebrow">{copy.founderEyebrow}</p>
          <h2>{copy.founderTitle}</h2>
        </div>
        <div className="alignmentGrid">
          {copy.alignment.map((label, index) => (
            <AlignmentItem
              key={label}
              label={label}
              score={[94, 92, 90, 86][index] ?? 86}
            />
          ))}
        </div>
        <p>{copy.founderBody}</p>
      </section>
    </main>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="scoreBar">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="barTrack" aria-hidden="true">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="miniMetric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MetaPill({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="metaPill">
      <span>{label}</span>
      <strong className={tone}>{value}</strong>
    </div>
  );
}

function dimensionLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function InsightStep({ title, body }: { title: string; body: string }) {
  return (
    <section className="frameworkStep">
      <span>{title}</span>
      <p>{body}</p>
    </section>
  );
}

function EvidenceList({
  assumptions,
  copy,
  evidence,
}: {
  assumptions: Assumption[];
  copy: Copy;
  evidence: Evidence[];
}) {
  return (
    <section className="evidenceDecisionBlock">
      <p className="eyebrow">{copy.insightLabels.evidence}</p>
      {evidence.length ? (
        <ul>
          {evidence.map((item) => (
            <li key={item.label}>
              <strong className={statusClass(item.status)}>{copy.epistemicStatus[item.status]}</strong>
              <span>{item.label}</span>
              <em>{item.source}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p className="inputNote">No additional evidence has been attached to this recommendation.</p>
      )}
      <p className="eyebrow">{copy.assumptionLabel}</p>
      {assumptions.length ? (
        <ul>
          {assumptions.map((item) => (
            <li key={item.statement}>
              <span>{item.statement}</span>
              <em>{item.dependsOn}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p className="inputNote">No unresolved assumption has been recorded.</p>
      )}
    </section>
  );
}

function ChangeConditions({ copy, items }: { copy: Copy; items: string[] }) {
  return (
    <section className="changeConditions">
      <p className="eyebrow">{copy.changeTitle}</p>
      {items.length ? (
        <ol>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <p className="inputNote">No assessment-changing evidence has been attached yet.</p>
      )}
    </section>
  );
}

function RevisionPanel({ copy, revision }: { copy: Copy; revision: AssessmentRevision }) {
  return (
    <section className="revisionPanel">
      <div className="cardTopline">
        <p className="eyebrow">{copy.revisionTitle}</p>
        <strong className={statusClass(revision.status)}>
          {copy.revisionStatus[revision.status]}
        </strong>
      </div>
      <dl>
        <div>
          <dt>{copy.revisionLabels.newInfo}</dt>
          <dd>{revision.newInformation}</dd>
        </div>
        <div>
          <dt>{copy.revisionLabels.impact}</dt>
          <dd>{revision.impact}</dd>
        </div>
        <div>
          <dt>{copy.revisionLabels.revised}</dt>
          <dd>{revision.revisedRecommendation}</dd>
        </div>
        <div>
          <dt>{copy.revisionLabels.uncertainty}</dt>
          <dd>{revision.remainingUncertainty}</dd>
        </div>
      </dl>
    </section>
  );
}

function ActionGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="actionGroup">
      <p className="eyebrow">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function GraphLink({ from, to, body }: GraphLink) {
  return (
    <div className="graphLink">
      <strong>{from}</strong>
      <span>{body}</span>
      <strong>{to}</strong>
    </div>
  );
}

function AlignmentItem({ label, score }: { label: string; score: number }) {
  return (
    <div className="alignmentItem">
      <div>
        <span>{label}</span>
        <strong>{score}</strong>
      </div>
      <div className="barTrack" aria-hidden="true">
        <span style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
