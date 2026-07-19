"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Priority =
  | "Revenue growth"
  | "Margin protection"
  | "Cash preservation"
  | "Cost control"
  | "Customer retention"
  | "Operational efficiency";

type FindingType = "Verified finding" | "Calculated result" | "Hypothesis" | "Missing data";
type Severity = "High" | "Medium" | "Low";
type PriorityLevel = "Executive decision" | "Act today" | "Monitor";

type KpiRow = {
  metric: string;
  actual: string;
  budget: string;
  prior: string;
  variance: string;
  status: Severity;
  driver: string;
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
};

type Decision = {
  recommendation: string;
  why: string;
  riskOfInaction: string;
  owner: string;
  kpi: string;
  priority: PriorityLevel;
};

const priorityOptions: Priority[] = [
  "Revenue growth",
  "Margin protection",
  "Cash preservation",
  "Cost control",
  "Customer retention",
  "Operational efficiency",
];

const kpiRows: KpiRow[] = [
  {
    metric: "Revenue",
    actual: "$4.6M",
    budget: "$5.0M",
    prior: "$4.9M",
    variance: "-8.0% vs budget",
    status: "High",
    driver: "Average order value declined while order count stayed stable.",
  },
  {
    metric: "Average order value",
    actual: "$1,780",
    budget: "$2,000",
    prior: "$1,960",
    variance: "-11.0% vs budget",
    status: "High",
    driver: "Two customer segments shifted toward lower-margin products.",
  },
  {
    metric: "Gross margin",
    actual: "31.8%",
    budget: "35.0%",
    prior: "34.6%",
    variance: "-3.2 pts vs budget",
    status: "High",
    driver: "Discounting and product mix pressure concentrated in key accounts.",
  },
  {
    metric: "Operating cost",
    actual: "$1.42M",
    budget: "$1.35M",
    prior: "$1.31M",
    variance: "+5.2% vs budget",
    status: "Medium",
    driver: "Freight and overtime costs exceeded plan.",
  },
  {
    metric: "Cash conversion cycle",
    actual: "58 days",
    budget: "49 days",
    prior: "52 days",
    variance: "+9 days vs budget",
    status: "Medium",
    driver: "Receivables aging worsened in two strategic customers.",
  },
];

const baseInsights: Insight[] = [
  {
    id: "revenue-quality",
    title: "Revenue miss is a price and mix issue, not a volume issue.",
    observation:
      "Revenue is 8.0% below budget, but the order count is broadly stable. The larger signal is an 11.0% decline in average order value.",
    businessImpact:
      "Management should not respond with a generic sales push. The issue points to pricing discipline, product mix, and customer-level margin leakage.",
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
    calculation: "Revenue variance -8.0%; AOV variance -11.0%; volume variance not material.",
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
  },
  {
    id: "data-gap",
    title: "Management should not finalize the root cause without customer-level detail.",
    observation:
      "The sample report identifies segment concentration but does not include invoice-level discount, SKU, and customer profitability detail.",
    businessImpact:
      "A confident recommendation on price, mix, or customer action requires more granular evidence.",
    likelyDriver:
      "Missing customer and SKU-level margin bridge data limits diagnosis precision.",
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
  },
];

const baseDecisions: Decision[] = [
  {
    recommendation: "Run a margin bridge before revising the revenue forecast.",
    why: "The revenue gap is connected to average order value and gross margin, so the company needs driver clarity before broad commercial action.",
    riskOfInaction:
      "Management may chase revenue volume while accepting lower-quality revenue and continued margin erosion.",
    owner: "FP&A + Sales",
    kpi: "Gross margin",
    priority: "Executive decision",
  },
  {
    recommendation: "Freeze non-standard discounts until customer-level profitability is reviewed.",
    why: "Discounting is a plausible driver of both AOV decline and margin pressure.",
    riskOfInaction:
      "The company may normalize exceptions that convert revenue recovery into EBITDA loss.",
    owner: "Commercial Director",
    kpi: "Average order value",
    priority: "Act today",
  },
  {
    recommendation: "Refresh the 13-week cash forecast with the longer collection cycle.",
    why: "Receivables deterioration can create liquidity stress even when order volume looks stable.",
    riskOfInaction:
      "Short-term funding needs may be discovered too late for disciplined treasury action.",
    owner: "Treasury / Controller",
    kpi: "Cash conversion cycle",
    priority: "Act today",
  },
];

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

export default function Home() {
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([
    "Margin protection",
    "Cash preservation",
    "Cost control",
  ]);
  const [uploadedFile, setUploadedFile] = useState("");
  const [status, setStatus] = useState("Sample report ready");
  const [activeInsightId, setActiveInsightId] = useState(baseInsights[0].id);

  const activeInsight =
    baseInsights.find((insight) => insight.id === activeInsightId) ?? baseInsights[0];

  const prioritizedInsights = useMemo(() => {
    const marginWeight = selectedPriorities.includes("Margin protection") ? 12 : 0;
    const cashWeight = selectedPriorities.includes("Cash preservation") ? 8 : 0;

    return [...baseInsights].sort((a, b) => {
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
  }, [selectedPriorities]);

  function togglePriority(priority: Priority) {
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
    setStatus(`Report staged: ${fileName}`);
  }

  function runAnalysis() {
    setStatus(
      uploadedFile
        ? `Analyzed ${uploadedFile} with demo KPI engine`
        : "Sample management report analyzed",
    );
    setActiveInsightId(prioritizedInsights[0].id);
  }

  return (
    <main className="appShell">
      <section className="decisionHero" aria-label="AI management reporting cockpit">
        <div className="heroCopy">
          <p className="eyebrow">AI Management Reporting OS · First module</p>
          <h1>CFO Signal Desk</h1>
          <p className="heroText">
            From Signal to Decision. Turn company reports and KPIs into
            management decisions. Upload a report or use sample company data;
            the engine identifies performance drivers, risks, root-cause
            hypotheses and recommended management actions.
          </p>
        </div>
        <aside className="nextDecision" aria-label="Executive decision from report">
          <span className="statusPill">{status}</span>
          <p className="eyebrow">Executive Decision</p>
          <h2>Run a margin bridge before revising the revenue forecast.</h2>
          <p>
            Revenue is below target, but the real issue is lower average order
            value combined with gross margin erosion. Management needs driver
            clarity before changing the commercial plan.
          </p>
          <div className="scoreRail">
            <ScoreBar label="Business impact" value={91} />
            <ScoreBar label="Urgency" value={86} />
            <ScoreBar label="Confidence" value={activeInsight.confidence} />
          </div>
        </aside>
      </section>

      <section className="reportFlow" aria-label="Report input and context">
        <div className="uploadPanel">
          <p className="eyebrow">Input</p>
          <h2>Upload business data. Get decision-ready insights.</h2>
          <div className="uploadActions">
            <label className="uploadButton">
              Upload company report
              <input
                accept=".csv,.xlsx,.xls,.pdf"
                onChange={handleUpload}
                type="file"
              />
            </label>
            <button className="secondaryButton" onClick={runAnalysis} type="button">
              Try sample report
            </button>
          </div>
          <p className="inputNote">
            MVP demo uses a sample management report. Uploaded files are staged
            in the UI to show the intended workflow; live parsing is post-MVP.
          </p>
        </div>

        <div className="priorityPanel">
          <p className="eyebrow">Company priorities</p>
          <div className="priorityGrid" role="group" aria-label="Company priorities">
            {priorityOptions.map((priority) => (
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

      <section className="decisionWorkspace" aria-label="Report insight engine">
        <article className="briefPanel">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">KPI / Report Insight Engine</p>
              <h2>Dashboards show performance. We explain what it means.</h2>
            </div>
            <div className="metricCluster" aria-label="Analysis metrics">
              <MiniMetric label="KPIs" value={kpiRows.length.toString()} />
              <MiniMetric label="Findings" value={baseInsights.length.toString()} />
              <MiniMetric label="Mode" value="Demo" />
            </div>
          </div>

          <div className="kpiTable" role="table" aria-label="Sample KPI variance table">
            <div className="kpiHeader" role="row">
              <span>Metric</span>
              <span>Actual</span>
              <span>Budget</span>
              <span>Prior</span>
              <span>Variance</span>
            </div>
            {kpiRows.map((row) => (
              <button
                className="kpiRow"
                key={row.metric}
                onClick={() => {
                  const match = baseInsights.find((insight) =>
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
                {activeInsight.severity}
              </strong>
              <strong className={sourceTypeClass(activeInsight.findingType)}>
                {activeInsight.findingType}
              </strong>
            </div>
            <h2>{activeInsight.title}</h2>
            <div className="insightGrid">
              <InsightStep title="Observation" body={activeInsight.observation} />
              <InsightStep title="Business impact" body={activeInsight.businessImpact} />
              <InsightStep title="Likely driver" body={activeInsight.likelyDriver} />
              <InsightStep title="Recommended action" body={activeInsight.recommendedAction} />
            </div>
            <div className="evidenceStrip">
              <div>
                <p className="eyebrow">Calculation</p>
                <p>{activeInsight.calculation}</p>
              </div>
              <div>
                <p className="eyebrow">Source evidence</p>
                <ul>
                  {activeInsight.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <ScoreBar label="Confidence" value={activeInsight.confidence} />
            </div>
          </section>
        </article>

        <aside className="actionPanel" aria-label="Management actions and watchlist">
          <ActionGroup
            title="Executive Summary"
            items={[
              "Revenue is 8.0% below budget, but the stronger signal is an 11.0% decline in average order value.",
              "Gross margin is 3.2 points below budget, indicating lower-quality revenue.",
              "Cash conversion cycle is 9 days above budget, creating emerging liquidity pressure.",
            ]}
          />
          <ActionGroup
            title="Questions Management Should Ask"
            items={[
              "Which customers received discount exceptions this period?",
              "Which products or segments drove the AOV decline?",
              "Are overdue strategic customers also low-margin customers?",
            ]}
          />
          <div className="watchBox">
            <p className="eyebrow">KPI Watchlist</p>
            <ol>
              <li>Average order value by customer segment</li>
              <li>Gross margin bridge by product and customer</li>
              <li>Discount exceptions and approval compliance</li>
              <li>Cash conversion cycle and overdue receivables</li>
            </ol>
          </div>
        </aside>
      </section>

      <section className="insightLibrary" aria-label="Top management insights">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Top Insights</p>
            <h2>Verified insight, calculation, hypothesis, or missing data</h2>
          </div>
        </div>
        <div className="objectGrid">
          {prioritizedInsights.map((insight) => (
            <button
              className={
                insight.id === activeInsight.id ? "objectCard active" : "objectCard"
              }
              key={insight.id}
              onClick={() => setActiveInsightId(insight.id)}
              type="button"
            >
              <div className="cardTopline">
                <span>{insight.findingType}</span>
                <strong className={severityClass(insight.severity)}>
                  {insight.severity}
                </strong>
              </div>
              <h3>{insight.title}</h3>
              <p>{insight.observation}</p>
              <p className="nextAction">{insight.recommendedAction}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="graphAndLinkedIn" aria-label="Decisions and AI OS architecture">
        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">Recommended Decisions</p>
              <h2>Insight must end in management action</h2>
            </div>
          </div>
          <div className="decisionList">
            {baseDecisions.map((decision) => (
              <article className="decisionItem" key={decision.recommendation}>
                <div>
                  <strong className={priorityClass(decision.priority)}>
                    {decision.priority}
                  </strong>
                  <h3>{decision.recommendation}</h3>
                  <p>{decision.why}</p>
                </div>
                <dl>
                  <div>
                    <dt>Owner</dt>
                    <dd>{decision.owner}</dd>
                  </div>
                  <div>
                    <dt>KPI</dt>
                    <dd>{decision.kpi}</dd>
                  </div>
                  <div>
                    <dt>Risk of inaction</dt>
                    <dd>{decision.riskOfInaction}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </article>

        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">AI OS Loop</p>
              <h2>Observe → Interpret → Decide → Act → Learn</h2>
            </div>
          </div>
          <div className="graphList">
            <GraphLink from="Report / KPI data" to="Observe" body="Ingest financial, sales, operation and management reporting data." />
            <GraphLink from="Variance and KPI relationships" to="Interpret" body="Calculate changes, identify anomalies, and classify evidence quality." />
            <GraphLink from="Root-cause hypotheses" to="Decide" body="Generate management options and explain confidence." />
            <GraphLink from="Owners, dates, follow-up KPIs" to="Act" body="Turn insights into accountable actions." />
            <GraphLink from="Prior decisions and outcomes" to="Learn" body="Build company performance memory over time." />
          </div>
        </article>
      </section>

      <section className="alignmentPanel" aria-label="Founder advantage and product thesis">
        <div>
          <p className="eyebrow">Founder Advantage</p>
          <h2>Finance-domain AI systems architect</h2>
        </div>
        <div className="alignmentGrid">
          <AlignmentItem label="Finance experience" score={94} />
          <AlignmentItem label="Management reporting" score={92} />
          <AlignmentItem label="Decision workflow design" score={90} />
          <AlignmentItem label="Build Week readiness" score={86} />
        </div>
        <p>
          The defensible insight is not only the model. It is the finance
          judgment that decides which variance matters, which data needs
          verification, what should reach management, and which action changes
          performance.
        </p>
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

function InsightStep({ title, body }: { title: string; body: string }) {
  return (
    <section className="frameworkStep">
      <span>{title}</span>
      <p>{body}</p>
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

function GraphLink({
  from,
  to,
  body,
}: {
  from: string;
  to: string;
  body: string;
}) {
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
