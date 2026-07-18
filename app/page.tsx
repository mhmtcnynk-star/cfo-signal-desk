"use client";

import { FormEvent, useMemo, useState } from "react";

type Severity = "Low" | "Medium" | "High";
type PriorityLevel = "Monitor" | "Act today" | "Executive decision";

type Score = {
  label: string;
  value: number;
};

type CompanyContext = {
  industry: string;
  companySize: string;
  geographicExposure: string;
  fxExposure: string;
  growthStage: string;
};

type Signal = {
  id: string;
  category: "FX" | "Inflation" | "Rates" | "Liquidity" | "Supply Chain";
  title: string;
  value: string;
  delta: string;
  severity: Severity;
  businessRelevance: string;
  financialImpact: string;
  operationalImpact: string;
  strategicRisk: string;
  decisionOptions: string[];
  recommendedAction: string;
  priorityLevel: PriorityLevel;
  kpi: string;
  confidence: number;
  expectedOutcome: string;
  monitorTomorrow: string;
  scores: {
    businessImpact: number;
    urgency: number;
    confidence: number;
    decisionPriority: number;
  };
};

type ExecutiveRisk = {
  description: string;
  businessImpact: string;
  urgency: string;
};

type Opportunity = {
  description: string;
  valueCreated: string;
  action: string;
};

type Decision = {
  recommendation: string;
  why: string;
  whyNow: string;
  ignoredConsequence: string;
  kpiAffected: string;
  confidence: number;
  priorityLevel: PriorityLevel;
};

type ImmediateActions = {
  today: string[];
  thisWeek: string[];
  thisMonth: string[];
};

type Brief = {
  executiveSummary: string;
  highestPriorityRisks: ExecutiveRisk[];
  opportunities: Opportunity[];
  recommendedDecisions: Decision[];
  immediateActions: ImmediateActions;
  tomorrowWatchlist: string[];
};

const priorityOptions = [
  "Cash Flow",
  "Working Capital",
  "Revenue Growth",
  "Cost Optimization",
  "FX Exposure",
  "Treasury",
  "Investments",
  "Procurement",
];

const companyContext: CompanyContext = {
  industry: "Import-exposed mid-market business",
  companySize: "SME / lower mid-market",
  geographicExposure: "Argentina operations with USD-linked inputs",
  fxExposure: "High transactional exposure",
  growthStage: "Margin protection while scaling selectively",
};

const demoSignals: Signal[] = [
  {
    id: "usdars",
    category: "FX",
    title: "USDARS parallel rate pressure",
    value: "+3.1%",
    delta: "24h move",
    severity: "High",
    businessRelevance:
      "The company buys imported or USD-linked inputs, so a parallel FX move can become tomorrow's supplier price reset.",
    financialImpact:
      "Cash Flow, FX Exposure, and Gross Margin are at risk if open purchase orders remain unpriced or unhedged.",
    operationalImpact:
      "Procurement and Treasury need a same-day view of supplier quotes, payment windows, and open USD commitments.",
    strategicRisk:
      "Waiting could turn an avoidable margin hit into a pricing or liquidity issue.",
    decisionOptions: [
      "Accelerate approved import purchases",
      "Delay non-critical USD spend",
      "Reprice exposed SKUs",
      "Evaluate a short-term hedge",
    ],
    recommendedAction:
      "Review procurement timing and hedge coverage before approving new USD-linked spend.",
    priorityLevel: "Executive decision",
    kpi: "FX Exposure",
    confidence: 82,
    expectedOutcome:
      "Reduce unpriced USD exposure and protect gross margin before suppliers reset terms.",
    monitorTomorrow: "CCL, blue rate, supplier quote resets, BCRA intervention signals",
    scores: {
      businessImpact: 92,
      urgency: 88,
      confidence: 82,
      decisionPriority: 91,
    },
  },
  {
    id: "inflation",
    category: "Inflation",
    title: "Food and logistics inflation pulse",
    value: "+1.4%",
    delta: "weekly basket",
    severity: "Medium",
    businessRelevance:
      "Input inflation is moving through categories that typically pressure landed cost and freight-heavy SKUs.",
    financialImpact:
      "Gross Margin and Operating Cost forecasts may understate the next purchasing cycle.",
    operationalImpact:
      "Commercial and procurement teams need a price-pass-through view by customer segment.",
    strategicRisk:
      "Slow pricing decisions can transfer supplier inflation directly into EBITDA pressure.",
    decisionOptions: [
      "Run a SKU margin bridge",
      "Start targeted price review",
      "Renegotiate freight terms",
      "Hold promotional discounts",
    ],
    recommendedAction:
      "Launch a focused pricing review for top-volume SKUs with low margin buffer.",
    priorityLevel: "Act today",
    kpi: "Gross Margin",
    confidence: 74,
    expectedOutcome:
      "Identify which customers or products need price action before margin erosion compounds.",
    monitorTomorrow: "Food price prints, freight quotes, supplier list-price changes",
    scores: {
      businessImpact: 78,
      urgency: 72,
      confidence: 74,
      decisionPriority: 76,
    },
  },
  {
    id: "rates",
    category: "Rates",
    title: "Short-term funding rates elevated",
    value: "42.0%",
    delta: "annualized",
    severity: "Medium",
    businessRelevance:
      "Receivables delays now carry a larger financing penalty for a business managing local working capital.",
    financialImpact:
      "Liquidity and Working Capital deteriorate faster when overdue accounts require short-term funding.",
    operationalImpact:
      "Collections, Sales, and FP&A need a shared list of strategic overdue customers.",
    strategicRisk:
      "Financing operating delays at high rates can quietly dilute EBITDA improvement.",
    decisionOptions: [
      "Prioritize overdue strategic accounts",
      "Tighten credit exceptions",
      "Delay discretionary spend",
      "Refresh the 13-week cash forecast",
    ],
    recommendedAction:
      "Update the 13-week cash forecast and escalate the top overdue accounts today.",
    priorityLevel: "Act today",
    kpi: "Working Capital",
    confidence: 79,
    expectedOutcome:
      "Reduce avoidable financing cost and protect liquidity without broad spending freezes.",
    monitorTomorrow: "Overdue AR movement, overdraft rates, short-term funding availability",
    scores: {
      businessImpact: 81,
      urgency: 77,
      confidence: 79,
      decisionPriority: 80,
    },
  },
  {
    id: "supply",
    category: "Supply Chain",
    title: "Commodity input volatility",
    value: "+2.2%",
    delta: "Brent / metals basket",
    severity: "Low",
    businessRelevance:
      "Energy and industrial inputs are still within recent ranges, but a second move would pressure procurement budgets.",
    financialImpact:
      "Operating Cost risk is visible but not yet high enough to force a broad purchasing change.",
    operationalImpact:
      "Procurement should keep alternate quotes ready for critical materials.",
    strategicRisk:
      "Ignoring a second move could leave the company with fewer supplier options.",
    decisionOptions: [
      "Monitor one more session",
      "Request alternate supplier quotes",
      "Avoid long fixed-price commitments",
      "Review inventory cover",
    ],
    recommendedAction:
      "Monitor one more session while preparing alternate supplier quotes.",
    priorityLevel: "Monitor",
    kpi: "Operating Cost",
    confidence: 68,
    expectedOutcome:
      "Preserve flexibility without overreacting to a still-manageable cost signal.",
    monitorTomorrow: "Brent, freight, metals basket, inventory cover",
    scores: {
      businessImpact: 48,
      urgency: 42,
      confidence: 68,
      decisionPriority: 46,
    },
  },
];

const fallbackBrief: Brief = {
  executiveSummary:
    "Today requires a defensive CFO posture: FX pressure is the only signal that needs executive-level action, while inflation and funding costs require same-day operating follow-up. The next decision is whether to accelerate approved USD-linked procurement before supplier prices reset. Liquidity should be protected through collections discipline, not a broad spending freeze. Tomorrow's watchlist should focus only on FX intervention, supplier quote resets, and price pressure that changes cash or margin decisions.",
  highestPriorityRisks: [
    {
      description: "USD-linked supplier exposure may reprice before procurement reacts.",
      businessImpact:
        "Imported inputs and open purchase orders can hit gross margin and cash planning.",
      urgency: "Executive decision today",
    },
    {
      description: "Input inflation is moving through logistics-heavy categories.",
      businessImpact:
        "Margin forecasts may be stale for high-volume SKUs with weak pass-through.",
      urgency: "Finance and commercial review within 48 hours",
    },
    {
      description: "High short-term funding rates raise the cost of overdue receivables.",
      businessImpact:
        "Working capital delays can convert into avoidable financing cost.",
      urgency: "Collections escalation today",
    },
  ],
  opportunities: [
    {
      description: "Use the FX move as a decision window before suppliers reset terms.",
      valueCreated: "Protects gross margin and reduces unpriced USD exposure.",
      action: "Approve only the purchases with clear margin cover and hedge visibility.",
    },
    {
      description: "Turn inflation pressure into a targeted pricing review.",
      valueCreated: "Prevents broad price changes while defending weak-margin SKUs.",
      action: "Focus on top-volume SKUs and customers with pass-through capacity.",
    },
    {
      description: "Use high rates to sharpen collection discipline.",
      valueCreated: "Improves liquidity without cutting strategic spend.",
      action: "Escalate overdue accounts before adding short-term debt.",
    },
  ],
  recommendedDecisions: [
    {
      recommendation: "Review procurement timing for USD-linked inputs.",
      why: "FX pressure can convert open supplier exposure into a margin hit.",
      whyNow: "The rate moved 3.1% in 24 hours and supplier terms may reset tomorrow.",
      ignoredConsequence:
        "The company may pay more for the same inputs while losing pricing time.",
      kpiAffected: "FX Exposure",
      confidence: 82,
      priorityLevel: "Executive decision",
    },
    {
      recommendation: "Update the 13-week cash forecast with current FX and funding rates.",
      why: "Liquidity decisions need the latest cost of cash and supplier exposure.",
      whyNow: "Short-term funding is expensive and overdue receivables carry a larger penalty.",
      ignoredConsequence:
        "Cash planning may understate financing needs and timing risk.",
      kpiAffected: "Cash Flow",
      confidence: 79,
      priorityLevel: "Act today",
    },
    {
      recommendation: "Start a targeted pricing review for exposed SKUs.",
      why: "Input inflation is concentrated enough to require margin defense, not broad repricing.",
      whyNow: "Weekly logistics and food pressure is already visible before the next purchase cycle.",
      ignoredConsequence:
        "Supplier cost increases may flow into EBITDA before pricing catches up.",
      kpiAffected: "Gross Margin",
      confidence: 74,
      priorityLevel: "Act today",
    },
  ],
  immediateActions: {
    today: [
      "Treasury: reconcile open USD supplier commitments against hedge coverage.",
      "Procurement: identify purchase orders that will reset if FX moves again.",
      "FP&A: refresh 13-week cash forecast with updated FX and funding assumptions.",
    ],
    thisWeek: [
      "Commercial: run a margin bridge for top-volume SKUs.",
      "Collections: escalate strategic overdue accounts with financing-cost impact.",
      "Operations: prepare alternate supplier quotes for critical inputs.",
    ],
    thisMonth: [
      "Define FX exposure thresholds that trigger CFO approval.",
      "Build a recurring price-pass-through review by product and customer segment.",
      "Review working capital policy for high-rate environments.",
    ],
  },
  tomorrowWatchlist: [
    "CCL and blue dollar gap versus supplier quote resets",
    "Central bank FX intervention signals",
    "Food, freight, and packaging price indicators",
    "Overdue AR movement on strategic accounts",
    "Short-term funding rate availability",
  ],
};

function severityClass(severity: Severity) {
  return {
    Low: "severityLow",
    Medium: "severityMedium",
    High: "severityHigh",
  }[severity];
}

function priorityClass(priorityLevel: PriorityLevel) {
  return {
    Monitor: "priorityMonitor",
    "Act today": "priorityAct",
    "Executive decision": "priorityExecutive",
  }[priorityLevel];
}

function buildLocalBrief(priorities: string[]): Brief {
  const selected =
    priorities.length > 0
      ? priorities.join(", ")
      : "Cash Flow, Working Capital, FX Exposure";

  return {
    ...fallbackBrief,
    executiveSummary: `${fallbackBrief.executiveSummary} Because the selected priorities are ${selected}, the recommendation set is weighted toward cash protection, exposure control, and near-term operating discipline.`,
    recommendedDecisions: [
      ...fallbackBrief.recommendedDecisions,
      {
        recommendation: `Run a CFO decision standup focused on ${selected}.`,
        why: "Selected company priorities should change the decision agenda, not only the wording of the brief.",
        whyNow:
          "The current signal set affects cash, supplier timing, and margin decisions within the next operating day.",
        ignoredConsequence:
          "Teams may react to the same market signals with conflicting priorities.",
        kpiAffected: selected.includes("Revenue Growth")
          ? "Revenue"
          : selected.includes("Cost Optimization")
            ? "Operating Cost"
            : "Cash Flow",
        confidence: 76,
        priorityLevel: "Act today",
      },
    ],
    immediateActions: {
      ...fallbackBrief.immediateActions,
      today: [
        ...fallbackBrief.immediateActions.today,
        `CFO: align Treasury, FP&A, Procurement, and Commercial around ${selected}.`,
      ],
    },
    tomorrowWatchlist: [
      ...fallbackBrief.tomorrowWatchlist,
      `Priority trigger review: ${selected}`,
    ],
  };
}

const topDecision = fallbackBrief.recommendedDecisions[0];

export default function Home() {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "Cash Flow",
    "Working Capital",
    "FX Exposure",
    "Procurement",
  ]);
  const [brief, setBrief] = useState<Brief>(() =>
    buildLocalBrief([
      "Cash Flow",
      "Working Capital",
      "FX Exposure",
      "Procurement",
    ]),
  );
  const [status, setStatus] = useState("Demo decision engine ready");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSignalId, setActiveSignalId] = useState(demoSignals[0].id);

  const activeSignal =
    demoSignals.find((signal) => signal.id === activeSignalId) ?? demoSignals[0];

  const executiveSignals = useMemo(
    () =>
      demoSignals.filter(
        (signal) => signal.priorityLevel === "Executive decision",
      ).length,
    [],
  );

  function togglePriority(priority: string) {
    setSelectedPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority],
    );
  }

  async function generateBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);
    setStatus("Running decision framework");

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priorities: selectedPriorities,
          signals: demoSignals,
          companyContext,
        }),
      });

      if (!response.ok) {
        throw new Error("Decision route unavailable");
      }

      const data = (await response.json()) as { brief?: Brief; mode?: string };
      if (!data.brief) {
        throw new Error("Brief missing");
      }

      setBrief(data.brief);
      setStatus(
        data.mode === "openai"
          ? "Decision brief generated with OpenAI"
          : "Demo decision brief generated locally",
      );
    } catch {
      setBrief(buildLocalBrief(selectedPriorities));
      setStatus("Demo decision brief generated locally");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="appShell">
      <section className="decisionHero" aria-label="Executive decision cockpit">
        <div className="heroCopy">
          <p className="eyebrow">Executive Decision Intelligence</p>
          <h1>CFO Signal Desk</h1>
          <p className="heroText">
            From Signal to Decision. A decision-support cockpit for CFOs:
            what matters today, why it matters, what to do, and what can wait.
          </p>
        </div>
        <aside className="nextDecision" aria-label="Next recommended decision">
          <span className="statusPill">{status}</span>
          <p className="eyebrow">Next Decision</p>
          <h2>{brief.recommendedDecisions[0]?.recommendation ?? topDecision.recommendation}</h2>
          <p>
            {brief.recommendedDecisions[0]?.whyNow ?? topDecision.whyNow}
          </p>
          <div className="scoreRail">
            <ScoreBar label="Business Impact" value={activeSignal.scores.businessImpact} />
            <ScoreBar label="Urgency" value={activeSignal.scores.urgency} />
            <ScoreBar label="Confidence" value={activeSignal.scores.confidence} />
          </div>
        </aside>
      </section>

      <section className="contextStrip" aria-label="Company context">
        {Object.entries(companyContext).map(([key, value]) => (
          <div key={key}>
            <span>{key.replace(/([A-Z])/g, " $1")}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="decisionWorkspace" aria-label="Executive brief">
        <article className="briefPanel">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Executive Brief</p>
              <h2>CEO-ready decision summary</h2>
            </div>
            <div className="metricCluster" aria-label="Decision metrics">
              <MiniMetric label="Signals" value={demoSignals.length.toString()} />
              <MiniMetric label="Executive" value={executiveSignals.toString()} />
              <MiniMetric label="Window" value="24h" />
            </div>
          </div>
          <p className="summaryText">{brief.executiveSummary}</p>

          <form className="generatorPanel" onSubmit={generateBrief}>
            <div>
              <h3>Business Priorities</h3>
              <p>
                Recommendations adapt to company priorities instead of producing
                identical summaries.
              </p>
            </div>
            <div
              className="priorityGrid"
              role="group"
              aria-label="Company priorities"
            >
              {priorityOptions.map((priority) => (
                <button
                  className={
                    selectedPriorities.includes(priority)
                      ? "priorityButton active"
                      : "priorityButton"
                  }
                  key={priority}
                  onClick={() => togglePriority(priority)}
                  type="button"
                  aria-pressed={selectedPriorities.includes(priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
            <button className="primaryButton" disabled={isGenerating} type="submit">
              {isGenerating ? "Reasoning..." : "Generate Executive Brief"}
            </button>
          </form>

          <div className="decisionGrid">
            <BriefBlock
              title="Highest Priority Risks"
              items={brief.highestPriorityRisks.map(
                (risk) => `${risk.description} ${risk.businessImpact} Urgency: ${risk.urgency}.`,
              )}
            />
            <BriefBlock
              title="Opportunities"
              items={brief.opportunities.map(
                (opportunity) =>
                  `${opportunity.description} ${opportunity.valueCreated} Action: ${opportunity.action}.`,
              )}
            />
          </div>

          <section className="decisionList" aria-label="Recommended decisions">
            <div className="sectionHeader compact">
              <div>
                <p className="eyebrow">Recommended Decisions</p>
                <h2>Management decisions, not observations</h2>
              </div>
            </div>
            {brief.recommendedDecisions.map((decision) => (
              <article className="decisionItem" key={decision.recommendation}>
                <div>
                  <strong className={priorityClass(decision.priorityLevel)}>
                    {decision.priorityLevel}
                  </strong>
                  <h3>{decision.recommendation}</h3>
                  <p>{decision.why}</p>
                </div>
                <dl>
                  <div>
                    <dt>Why now</dt>
                    <dd>{decision.whyNow}</dd>
                  </div>
                  <div>
                    <dt>If ignored</dt>
                    <dd>{decision.ignoredConsequence}</dd>
                  </div>
                  <div>
                    <dt>KPI</dt>
                    <dd>{decision.kpiAffected}</dd>
                  </div>
                  <div>
                    <dt>Confidence</dt>
                    <dd>{decision.confidence}%</dd>
                  </div>
                </dl>
              </article>
            ))}
          </section>
        </article>

        <aside className="actionPanel" aria-label="Immediate actions and watchlist">
          <ActionGroup title="Today" items={brief.immediateActions.today} />
          <ActionGroup title="This Week" items={brief.immediateActions.thisWeek} />
          <ActionGroup title="This Month" items={brief.immediateActions.thisMonth} />
          <div className="watchBox">
            <p className="eyebrow">Tomorrow Watchlist</p>
            <ol>
              {brief.tomorrowWatchlist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </aside>
      </section>

      <section className="signalDecisionArea" aria-label="Signal decision framework">
        <div className="signalTabs" role="tablist" aria-label="Market signals">
          {demoSignals.map((signal) => (
            <button
              className={
                signal.id === activeSignalId ? "signalTab active" : "signalTab"
              }
              key={signal.id}
              onClick={() => setActiveSignalId(signal.id)}
              role="tab"
              type="button"
              aria-selected={signal.id === activeSignalId}
            >
              <span>{signal.category}</span>
              <strong>{signal.value}</strong>
              <em className={severityClass(signal.severity)}>{signal.severity}</em>
            </button>
          ))}
        </div>

        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">Decision Framework</p>
              <h2>{activeSignal.title}</h2>
            </div>
            <strong className={priorityClass(activeSignal.priorityLevel)}>
              {activeSignal.priorityLevel}
            </strong>
          </div>
          <div className="frameworkGrid">
            <FrameworkStep title="Signal" body={`${activeSignal.value} ${activeSignal.delta}`} />
            <FrameworkStep title="Business relevance" body={activeSignal.businessRelevance} />
            <FrameworkStep title="Financial consequence" body={activeSignal.financialImpact} />
            <FrameworkStep title="Operational impact" body={activeSignal.operationalImpact} />
            <FrameworkStep title="Strategic risk" body={activeSignal.strategicRisk} />
            <FrameworkStep title="Recommendation" body={activeSignal.recommendedAction} />
          </div>
          <div className="optionStrip">
            <div>
              <p className="eyebrow">Available Options</p>
              <ul>
                {activeSignal.decisionOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Expected Outcome</p>
              <p>{activeSignal.expectedOutcome}</p>
              <p className="monitorLine">
                Monitor tomorrow: {activeSignal.monitorTomorrow}
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

function ScoreBar({ label, value }: Score) {
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

function BriefBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="briefBlock">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
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

function FrameworkStep({ title, body }: { title: string; body: string }) {
  return (
    <section className="frameworkStep">
      <span>{title}</span>
      <p>{body}</p>
    </section>
  );
}
