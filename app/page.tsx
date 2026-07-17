"use client";

import { FormEvent, useMemo, useState } from "react";

type Severity = "Low" | "Medium" | "High";

type Signal = {
  id: string;
  category: "FX" | "Inflation" | "Rates" | "Liquidity" | "Supply Chain";
  title: string;
  value: string;
  delta: string;
  severity: Severity;
  summary: string;
  impact: string;
  action: string;
};

type Brief = {
  executiveSummary: string;
  keySignals: string[];
  financialImpact: string[];
  operationalImpact: string[];
  recommendedDecisions: string[];
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

const demoSignals: Signal[] = [
  {
    id: "usdars",
    category: "FX",
    title: "USDARS parallel rate pressure",
    value: "+3.1%",
    delta: "24h move",
    severity: "High",
    summary:
      "The parallel peso rate widened while import payment demand stayed firm.",
    impact:
      "Imported inputs, dollar-linked supplier contracts, and near-term treasury hedges become more expensive.",
    action:
      "Review import purchase timing, refresh supplier payment calendars, and reprice USD-linked exposure before tomorrow noon.",
  },
  {
    id: "inflation",
    category: "Inflation",
    title: "Food and logistics inflation pulse",
    value: "+1.4%",
    delta: "weekly basket",
    severity: "Medium",
    summary:
      "High-frequency price checks suggest renewed pressure in freight, packaging, and food inputs.",
    impact:
      "Gross margin assumptions may be stale for SKUs with low pricing power.",
    action:
      "Ask commercial and procurement teams for a 48-hour margin bridge on top-volume products.",
  },
  {
    id: "rates",
    category: "Rates",
    title: "Short-term funding rates elevated",
    value: "42.0%",
    delta: "annualized",
    severity: "Medium",
    summary:
      "Local liquidity remains tight, keeping overdraft and short-term working capital costs high.",
    impact:
      "Receivables delays now carry a larger financing penalty.",
    action:
      "Prioritize collections on overdue strategic accounts and delay non-critical discretionary spend.",
  },
  {
    id: "supply",
    category: "Supply Chain",
    title: "Commodity input volatility",
    value: "+2.2%",
    delta: "Brent / metals basket",
    severity: "Low",
    summary:
      "Energy and selected industrial inputs moved higher but remain within recent trading ranges.",
    impact:
      "Cost pressure is manageable today, but a second session would affect procurement budgets.",
    action:
      "Keep purchase orders flexible and prepare alternate supplier quotes for critical materials.",
  },
];

const baseWatchlist = [
  "Central bank communication on FX intervention",
  "CPI expectation survey and food price prints",
  "Sovereign bond yields and country risk",
  "Import approval queues and supplier payment terms",
  "Commodity basket: Brent, copper, soy complex",
];

const companyPriorities = [
  {
    label: "Cash Flow",
    status: "High focus",
    owner: "Treasury",
    next: "Confirm 13-week cash forecast sensitivities.",
  },
  {
    label: "Working Capital",
    status: "Watch",
    owner: "FP&A",
    next: "Segment receivables by collection risk and currency exposure.",
  },
  {
    label: "FX Exposure",
    status: "High focus",
    owner: "Controller",
    next: "Reconcile open USD purchase orders against hedge coverage.",
  },
  {
    label: "Procurement",
    status: "Monitor",
    owner: "Operations",
    next: "Identify inputs exposed to weekly price resets.",
  },
];

const fallbackBrief: Brief = {
  executiveSummary:
    "Today is a defensive finance day: FX pressure, elevated short-term funding costs, and early inflation signals should move the CFO agenda toward cash protection, import timing, and margin discipline.",
  keySignals: [
    "USDARS parallel pressure increased 3.1%, raising the cost of unhedged import-linked liabilities.",
    "Weekly food and logistics indicators point to renewed input cost pressure.",
    "Short-term funding remains expensive, making receivables delays more costly.",
  ],
  financialImpact: [
    "Near-term cash conversion becomes more important than reported revenue growth.",
    "Gross margin forecasts should be refreshed for imported and logistics-heavy SKUs.",
    "Open USD supplier commitments need an updated hedge and payment plan.",
  ],
  operationalImpact: [
    "Procurement should validate whether tomorrow's supplier quotes will reset in USD.",
    "Commercial teams need a fast view of price pass-through capacity by customer segment.",
    "Treasury should align payment timing with expected FX liquidity windows.",
  ],
  recommendedDecisions: [
    "Accelerate collection calls on strategic overdue accounts before adding new short-term debt.",
    "Review import purchasing schedules and consider accelerating supplier payments where FX risk exceeds financing cost.",
    "Hold non-critical discretionary spend until tomorrow's FX and CPI signals are clearer.",
  ],
  tomorrowWatchlist: baseWatchlist,
};

function severityClass(severity: Severity) {
  return {
    Low: "severityLow",
    Medium: "severityMedium",
    High: "severityHigh",
  }[severity];
}

function buildLocalBrief(priorities: string[]): Brief {
  const priorityText = priorities.length
    ? priorities.join(", ")
    : "Cash Flow, Working Capital, FX Exposure";

  return {
    ...fallbackBrief,
    executiveSummary: `${fallbackBrief.executiveSummary} The selected priorities are ${priorityText}, so tomorrow's operating focus should be liquidity control, exposure visibility, and fast decision loops.`,
    recommendedDecisions: [
      ...fallbackBrief.recommendedDecisions,
      `Run a 20-minute CFO standup around ${priorityText} with Treasury, FP&A, Procurement, and Commercial owners.`,
    ],
    tomorrowWatchlist: [
      ...baseWatchlist,
      `Priority trigger review: ${priorityText}`,
    ],
  };
}

export default function Home() {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "Cash Flow",
    "Working Capital",
    "FX Exposure",
    "Procurement",
  ]);
  const [brief, setBrief] = useState<Brief>(() =>
    buildLocalBrief(["Cash Flow", "Working Capital", "FX Exposure", "Procurement"]),
  );
  const [status, setStatus] = useState("Demo mode ready");
  const [isGenerating, setIsGenerating] = useState(false);

  const highRisks = useMemo(
    () => demoSignals.filter((signal) => signal.severity === "High").length,
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
    setStatus("Generating board-ready brief");

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priorities: selectedPriorities,
          signals: demoSignals,
          companyContext:
            "Mid-market company operating in Argentina with import exposure, local working capital needs, and USD-linked procurement.",
        }),
      });

      if (!response.ok) {
        throw new Error("AI route unavailable");
      }

      const data = (await response.json()) as { brief?: Brief; mode?: string };
      if (!data.brief) {
        throw new Error("Brief missing");
      }

      setBrief(data.brief);
      setStatus(
        data.mode === "openai"
          ? "AI brief generated with OpenAI"
          : "Demo brief generated locally",
      );
    } catch {
      setBrief(buildLocalBrief(selectedPriorities));
      setStatus("Demo brief generated locally");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="appShell">
      <section className="heroPanel" aria-label="CFO Signal Desk overview">
        <div className="heroCopy">
          <p className="eyebrow">OpenAI Build Week MVP</p>
          <h1>CFO Signal Desk</h1>
          <p className="heroText">
            An AI-powered executive cockpit that turns macro, FX, market, and
            company signals into a five-minute CFO briefing: what happened, why
            it matters, and what to do tomorrow.
          </p>
        </div>
        <div className="heroMetrics" aria-label="Today metrics">
          <div>
            <span>Brief time</span>
            <strong>5 min</strong>
          </div>
          <div>
            <span>High risks</span>
            <strong>{highRisks}</strong>
          </div>
          <div>
            <span>Signals</span>
            <strong>{demoSignals.length}</strong>
          </div>
        </div>
      </section>

      <section className="dashboardGrid" aria-label="Executive dashboard">
        <article className="briefPanel">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Today's Brief</p>
              <h2>Executive Summary</h2>
            </div>
            <span className="statusPill">{status}</span>
          </div>
          <p className="summaryText">{brief.executiveSummary}</p>

          <form className="generatorPanel" onSubmit={generateBrief}>
            <div>
              <h3>Company Priorities</h3>
              <p>
                These choices steer the AI brief toward the company's finance
                agenda.
              </p>
            </div>
            <div className="priorityGrid" role="group" aria-label="Company priorities">
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
              {isGenerating ? "Generating..." : "Generate AI Brief"}
            </button>
          </form>

          <div className="briefColumns">
            <BriefList title="Key Signals" items={brief.keySignals} />
            <BriefList title="Financial Impact" items={brief.financialImpact} />
            <BriefList title="Operational Impact" items={brief.operationalImpact} />
            <BriefList
              title="Recommended Decisions"
              items={brief.recommendedDecisions}
            />
          </div>
        </article>

        <aside className="sidePanel" aria-label="Tomorrow watchlist">
          <div className="sectionHeader compact">
            <div>
              <p className="eyebrow">Tomorrow</p>
              <h2>Watchlist</h2>
            </div>
          </div>
          <ol className="watchlist">
            {brief.tomorrowWatchlist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <div className="opportunityBox">
            <p className="eyebrow">Opportunity</p>
            <h3>Use volatility as a decision window</h3>
            <p>
              If suppliers have not repriced yet, accelerate approved purchases
              with clear margin coverage and documented FX exposure.
            </p>
          </div>
        </aside>
      </section>

      <section className="signalGrid" aria-label="Risks and market signals">
        {demoSignals.map((signal) => (
          <article className="signalCard" key={signal.id}>
            <div className="cardTopline">
              <span>{signal.category}</span>
              <strong className={severityClass(signal.severity)}>
                {signal.severity}
              </strong>
            </div>
            <div className="signalValue">
              <strong>{signal.value}</strong>
              <span>{signal.delta}</span>
            </div>
            <h3>{signal.title}</h3>
            <p>{signal.summary}</p>
            <div className="impactBlock">
              <span>Potential impact</span>
              <p>{signal.impact}</p>
            </div>
            <div className="impactBlock action">
              <span>Recommended action</span>
              <p>{signal.action}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="priorityTable" aria-label="Company priorities">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Company Priorities</p>
            <h2>Finance Operating Plan</h2>
          </div>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {companyPriorities.map((priority) => (
                <tr key={priority.label}>
                  <td>{priority.label}</td>
                  <td>{priority.status}</td>
                  <td>{priority.owner}</td>
                  <td>{priority.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function BriefList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="briefList">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
