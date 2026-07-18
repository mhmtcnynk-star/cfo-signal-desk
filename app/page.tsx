"use client";

import { useMemo, useState } from "react";

type IntelligenceType =
  | "Goal"
  | "Constraint"
  | "Commitment"
  | "Decision"
  | "Open Decision"
  | "Opportunity"
  | "Risk"
  | "Action"
  | "Relationship"
  | "Hypothesis"
  | "Result"
  | "Lesson"
  | "Preference"
  | "Strategic Priority";

type SourceName =
  | "Daily Notes"
  | "LinkedIn"
  | "Career History"
  | "Job Pipeline"
  | "Calendar"
  | "Email"
  | "Tasks"
  | "Financial Context"
  | "Market Signals";

type Status = "Confirmed" | "Needs approval" | "AI inference" | "Marked incorrect";
type Horizon = "Today" | "This week" | "This month" | "Quarter";
type DecisionPriority = "Executive decision" | "Act today" | "Monitor" | "Can wait";

type IntelligenceObject = {
  id: string;
  type: IntelligenceType;
  title: string;
  description: string;
  category: string;
  source: SourceName;
  createdDate: string;
  lastUpdatedDate: string;
  confidence: number;
  importance: number;
  urgency: number;
  timeHorizon: Horizon;
  status: Status;
  relatedPeople: string[];
  relatedGoals: string[];
  evidence: string[];
  possibleContradiction?: string;
  recommendedNextAction: string;
};

type BriefIssue = {
  id: string;
  whatChanged: string;
  whyItMatters: string;
  relevantObjective: string;
  relevantConstraints: string[];
  decisionOptions: string[];
  recommendedDecision: string;
  rationale: string;
  riskOfInaction: string;
  immediateNextAction: string;
  successMetric: string;
  confidence: number;
  monitorNext: string;
  priority: DecisionPriority;
  sources: SourceName[];
};

type GraphLink = {
  from: string;
  to: string;
  relationship: string;
};

type LinkedInSignal = {
  label: string;
  assessment: string;
  decision: string;
  confidence: number;
};

const sourceOptions: SourceName[] = [
  "Daily Notes",
  "LinkedIn",
  "Career History",
  "Job Pipeline",
  "Calendar",
  "Email",
  "Tasks",
  "Financial Context",
  "Market Signals",
];

const baseIntelligence: IntelligenceObject[] = [
  {
    id: "goal-income",
    type: "Goal",
    title: "Build a credible 30-90 day paid pipeline",
    description:
      "Prioritize opportunities that can create income, consulting pipeline, or executive employment momentum without sacrificing long-term optionality.",
    category: "Career strategy",
    source: "Career History",
    createdDate: "2026-07-13",
    lastUpdatedDate: "2026-07-18",
    confidence: 92,
    importance: 95,
    urgency: 88,
    timeHorizon: "This month",
    status: "Confirmed",
    relatedPeople: ["Mahmut Can Yanik", "Bilge", "Ela"],
    relatedGoals: ["Financial runway", "Executive positioning"],
    evidence: [
      "User repeatedly prioritized income generation and family stability.",
      "Career OS references 30-90 day paid pipeline as the operating filter.",
    ],
    recommendedNextAction:
      "Rank all product, content, and networking actions by credible near-term revenue path.",
  },
  {
    id: "constraint-family",
    type: "Constraint",
    title: "Do not optimize salary alone",
    description:
      "Evaluate work choices against income, family stability, flexibility, stress, and 3-10 year optionality.",
    category: "Life design",
    source: "Daily Notes",
    createdDate: "2026-07-13",
    lastUpdatedDate: "2026-07-18",
    confidence: 89,
    importance: 91,
    urgency: 72,
    timeHorizon: "Quarter",
    status: "Confirmed",
    relatedPeople: ["Bilge", "Ela"],
    relatedGoals: ["Sustainable workload", "Long-term optionality"],
    evidence: [
      "Opportunity filter includes family stability and sustainable workload.",
      "User asked not to optimize only for next title or salary.",
    ],
    recommendedNextAction:
      "Apply the family-aware opportunity filter before accepting any high-stress role or unpaid product sprint.",
  },
  {
    id: "priority-cfo-product",
    type: "Strategic Priority",
    title: "Position CFO Signal Desk as executive decision intelligence",
    description:
      "The product should prove decision quality, not the volume of market information.",
    category: "Product",
    source: "Daily Notes",
    createdDate: "2026-07-17",
    lastUpdatedDate: "2026-07-18",
    confidence: 94,
    importance: 90,
    urgency: 76,
    timeHorizon: "This week",
    status: "Confirmed",
    relatedPeople: ["Build Week judges", "Potential CFO users"],
    relatedGoals: ["Product credibility", "Paid advisory path"],
    evidence: [
      "Product Constitution: Turn Market Noise into Executive Clarity.",
      "User rejected generic dashboard framing.",
    ],
    recommendedNextAction:
      "Use the MVP as a proof asset for CFO advisory conversations and Build Week judging.",
  },
  {
    id: "open-decision-linkedin",
    type: "Open Decision",
    title: "Which professional narrative should be strengthened this week?",
    description:
      "The user's LinkedIn positioning needs to connect FP&A leadership, CFO decision systems, and practical finance transformation.",
    category: "LinkedIn positioning",
    source: "LinkedIn",
    createdDate: "2026-07-18",
    lastUpdatedDate: "2026-07-18",
    confidence: 78,
    importance: 82,
    urgency: 68,
    timeHorizon: "This week",
    status: "AI inference",
    relatedPeople: ["Recruiters", "Finance executives", "Professional network"],
    relatedGoals: ["Executive credibility", "Opportunity pipeline"],
    evidence: [
      "Recent skills repositioning favors FP&A, controlling, and strategic finance.",
      "CFO Signal Desk creates a product proof point for executive finance judgment.",
    ],
    possibleContradiction:
      "Product building can strengthen positioning, but it can also distract from direct applications if not tied to outreach.",
    recommendedNextAction:
      "Publish or prepare one concise post linking CFO Signal Desk to practical FP&A decision quality.",
  },
  {
    id: "risk-product-time",
    type: "Risk",
    title: "Product work may crowd out near-term income actions",
    description:
      "A polished MVP has strategic value only if it creates judging momentum, advisory conversations, or career leverage.",
    category: "Execution risk",
    source: "Tasks",
    createdDate: "2026-07-18",
    lastUpdatedDate: "2026-07-18",
    confidence: 81,
    importance: 86,
    urgency: 79,
    timeHorizon: "Today",
    status: "Needs approval",
    relatedPeople: ["Mahmut Can Yanik"],
    relatedGoals: ["Financial runway", "Build Week submission"],
    evidence: [
      "Current work is product-heavy.",
      "Income filter requires credible 30-90 day revenue path.",
    ],
    recommendedNextAction:
      "Convert today's product progress into one outward-facing proof asset or outreach-ready demo narrative.",
  },
  {
    id: "signal-fx",
    type: "Risk",
    title: "FX volatility increases relevance of CFO Signal Desk demo",
    description:
      "Argentina FX pressure creates a practical example for cash, procurement, pricing, and working capital decisions.",
    category: "Market signal",
    source: "Market Signals",
    createdDate: "2026-07-18",
    lastUpdatedDate: "2026-07-18",
    confidence: 82,
    importance: 80,
    urgency: 73,
    timeHorizon: "Today",
    status: "AI inference",
    relatedPeople: ["CFO users", "SME CEOs"],
    relatedGoals: ["Product credibility"],
    evidence: [
      "Demo market inputs include USDARS pressure, inflation, funding rates, and supplier risk.",
      "These signals map directly to CFO KPIs.",
    ],
    recommendedNextAction:
      "Use the FX signal as the first demo case because it clearly links external noise to management action.",
  },
  {
    id: "relationship-recruiters",
    type: "Relationship",
    title: "Recruiter conversations need tighter follow-up discipline",
    description:
      "Professional network interactions should be converted into explicit next actions, waiting-for items, or closed loops.",
    category: "Network",
    source: "Email",
    createdDate: "2026-07-18",
    lastUpdatedDate: "2026-07-18",
    confidence: 74,
    importance: 77,
    urgency: 65,
    timeHorizon: "This week",
    status: "Needs approval",
    relatedPeople: ["Recruiters", "Hiring managers"],
    relatedGoals: ["Opportunity pipeline"],
    evidence: [
      "Job applications and recruiter conversations are listed as intended data sources.",
      "The user wants decisions about who to contact and what role to prioritize.",
    ],
    recommendedNextAction:
      "Create a daily contact queue from recruiter, LinkedIn, and application signals.",
  },
];

const briefIssues: BriefIssue[] = [
  {
    id: "pipeline-focus",
    whatChanged:
      "The product has moved from CFO market brief to personal decision intelligence, increasing strategic value but also execution scope.",
    whyItMatters:
      "The user needs the product to support income, reputation, and long-term optionality, not become an isolated build project.",
    relevantObjective: "Build a credible 30-90 day paid pipeline.",
    relevantConstraints: [
      "Family stability matters.",
      "Product work must connect to opportunity creation.",
      "No generic assistant or broad integrations in the MVP.",
    ],
    decisionOptions: [
      "Keep polishing the product only.",
      "Pause product work and focus only on applications.",
      "Use the MVP as a proof asset for targeted finance conversations.",
    ],
    recommendedDecision:
      "Turn today's MVP into a focused proof asset for CFO advisory and executive finance positioning.",
    rationale:
      "This keeps the product constitution intact while converting technical progress into career and revenue leverage.",
    riskOfInaction:
      "The MVP may impress as software but fail to create external momentum or financial runway options.",
    immediateNextAction:
      "Prepare one 90-second demo narrative and one outreach-ready LinkedIn angle around decision quality.",
    successMetric:
      "At least three high-quality conversations or applications can reference the product within seven days.",
    confidence: 84,
    monitorNext:
      "New recruiter signals, Build Week judging feedback, product demo reactions, and consulting lead quality.",
    priority: "Executive decision",
    sources: ["Daily Notes", "Tasks", "LinkedIn"],
  },
  {
    id: "linkedin-positioning",
    whatChanged:
      "CFO Signal Desk now provides a concrete example of the user's FP&A and finance transformation judgment.",
    whyItMatters:
      "A tangible product makes executive credibility easier to demonstrate than profile keywords alone.",
    relevantObjective: "Strengthen executive finance positioning.",
    relevantConstraints: [
      "Claims must remain truthful and interview-defensible.",
      "LinkedIn activity should create credibility, not vanity engagement.",
    ],
    decisionOptions: [
      "Publish a technical Build Week update.",
      "Publish a finance-leadership insight using CFO Signal Desk as proof.",
      "Avoid public posting and use the demo only in private outreach.",
    ],
    recommendedDecision:
      "Prioritize a finance-leadership narrative: market noise matters only when it changes a CFO decision.",
    rationale:
      "This connects FP&A, controlling, executive judgment, and product building in one recruiter-safe story.",
    riskOfInaction:
      "The product may look like a side project instead of evidence of executive finance capability.",
    immediateNextAction:
      "Draft one post and one recruiter message, but require explicit approval before publishing or sending.",
    successMetric:
      "Profile conversations reference CFO decision quality, FP&A leadership, or finance transformation.",
    confidence: 79,
    monitorNext:
      "Inbound recruiter quality, profile views from finance leaders, and response rate to targeted messages.",
    priority: "Act today",
    sources: ["LinkedIn", "Career History"],
  },
  {
    id: "focus-risk",
    whatChanged:
      "Multiple active priorities exist: job search, professional network, personal product, and financial runway.",
    whyItMatters:
      "Without a clear daily priority stack, action can drift away from the user's stated strategy.",
    relevantObjective: "Protect focus and runway.",
    relevantConstraints: [
      "Do not optimize the next salary only.",
      "Avoid work that creates no asset, relationship, or income path.",
    ],
    decisionOptions: [
      "Treat everything as urgent.",
      "Prioritize the task with the fastest dopamine loop.",
      "Use a daily decision filter based on income path, optionality, and family impact.",
    ],
    recommendedDecision:
      "Use the daily filter: revenue path first, then strategic asset, then maintenance.",
    rationale:
      "This keeps effort aligned with the user's explicit operating doctrine.",
    riskOfInaction:
      "High-effort product and content work may displace job pipeline actions that affect runway sooner.",
    immediateNextAction:
      "Select three actions for today: one pipeline action, one product proof action, one relationship action.",
    successMetric:
      "Each day closes with a visible pipeline, asset, or relationship advancement.",
    confidence: 86,
    monitorNext:
      "Unresolved applications, overdue replies, time spent on unpaid work, and stress level.",
    priority: "Executive decision",
    sources: ["Financial Context", "Tasks", "Daily Notes"],
  },
];

const graphLinks: GraphLink[] = [
  {
    from: "FX and market volatility",
    to: "CFO Signal Desk demo credibility",
    relationship: "External signal creates a stronger proof case.",
  },
  {
    from: "CFO Signal Desk demo credibility",
    to: "Executive finance positioning",
    relationship: "Product proof supports the professional narrative.",
  },
  {
    from: "Executive finance positioning",
    to: "Recruiter and advisory conversations",
    relationship: "Clearer positioning should improve conversation quality.",
  },
  {
    from: "Financial runway",
    to: "Daily priority filter",
    relationship: "Runway pressure raises urgency for income-linked actions.",
  },
  {
    from: "Family stability",
    to: "Opportunity decision filter",
    relationship: "Constraints shape acceptable career options.",
  },
  {
    from: "Unpaid product work",
    to: "Focus risk",
    relationship: "A strategic asset can become a distraction if not commercialized.",
  },
];

const linkedinSignals: LinkedInSignal[] = [
  {
    label: "Professional positioning",
    assessment:
      "Strongest when framed as FP&A leadership, decision quality, controlling discipline, and finance transformation.",
    decision:
      "Strengthen the narrative around executive finance judgment, not AI building for its own sake.",
    confidence: 83,
  },
  {
    label: "Target role alignment",
    assessment:
      "Best aligned with FP&A, Finance Business Partner, Controller, strategic finance, and fractional CFO conversations.",
    decision:
      "Prioritize roles where CFO Signal Desk is relevant proof of business partnering and decision systems.",
    confidence: 80,
  },
  {
    label: "Content themes",
    assessment:
      "The highest-value theme is converting market noise into practical CFO decisions.",
    decision:
      "Draft content around 'what changed, why it matters, and what decision follows.'",
    confidence: 78,
  },
  {
    label: "Network opportunities",
    assessment:
      "Recruiters, CFOs of SMEs, founders, and FP&A leaders are the most relevant audience for early conversations.",
    decision:
      "Contact a narrow list with a product-backed finance leadership angle.",
    confidence: 74,
  },
];

function scoreClass(value: number) {
  if (value >= 85) {
    return "scoreHigh";
  }
  if (value >= 70) {
    return "scoreMedium";
  }
  return "scoreLow";
}

function priorityClass(priority: DecisionPriority) {
  return {
    "Executive decision": "priorityExecutive",
    "Act today": "priorityAct",
    Monitor: "priorityMonitor",
    "Can wait": "priorityWait",
  }[priority];
}

function statusClass(status: Status) {
  return {
    Confirmed: "statusConfirmed",
    "Needs approval": "statusApproval",
    "AI inference": "statusInference",
    "Marked incorrect": "statusIncorrect",
  }[status];
}

function sourceClass(enabled: boolean) {
  return enabled ? "sourceToggle active" : "sourceToggle";
}

export default function Home() {
  const [objects, setObjects] = useState<IntelligenceObject[]>(baseIntelligence);
  const [selectedIssueId, setSelectedIssueId] = useState(briefIssues[0].id);
  const [disabledSources, setDisabledSources] = useState<SourceName[]>([]);
  const [briefStatus, setBriefStatus] = useState("Demo intelligence ready");

  const visibleObjects = useMemo(
    () => objects.filter((item) => !disabledSources.includes(item.source)),
    [disabledSources, objects],
  );

  const activeIssue =
    briefIssues.find((issue) => issue.id === selectedIssueId) ?? briefIssues[0];

  const filteredIssues = briefIssues.filter((issue) =>
    issue.sources.some((source) => !disabledSources.includes(source)),
  );

  const mostImportantActions = useMemo(
    () =>
      visibleObjects
        .filter((item) => item.type === "Action" || item.urgency >= 72)
        .sort((a, b) => b.importance + b.urgency - (a.importance + a.urgency))
        .slice(0, 3)
        .map((item) => item.recommendedNextAction),
    [visibleObjects],
  );

  const needsApprovalCount = visibleObjects.filter(
    (item) => item.status === "Needs approval" || item.status === "AI inference",
  ).length;

  function toggleSource(source: SourceName) {
    setDisabledSources((current) =>
      current.includes(source)
        ? current.filter((item) => item !== source)
        : [...current, source],
    );
  }

  function updateStatus(id: string, status: Status) {
    setObjects((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              lastUpdatedDate: "2026-07-18",
              confidence: status === "Confirmed" ? Math.max(item.confidence, 86) : item.confidence,
            }
          : item,
      ),
    );
  }

  function deleteObject(id: string) {
    setObjects((current) => current.filter((item) => item.id !== id));
  }

  function editInference(id: string) {
    setObjects((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              title: `${item.title} (edited)`,
              status: "Needs approval",
              lastUpdatedDate: "2026-07-18",
              recommendedNextAction:
                "Review this inference manually before it influences future decisions.",
            }
          : item,
      ),
    );
  }

  function regenerateDemoBrief() {
    const nextIssue =
      filteredIssues.find((issue) => issue.id !== selectedIssueId) ??
      briefIssues[0];
    setSelectedIssueId(nextIssue.id);
    setBriefStatus(
      disabledSources.length > 0
        ? "Brief regenerated with disabled sources excluded"
        : "Daily decision brief regenerated from demo context",
    );
  }

  return (
    <main className="appShell">
      <section className="decisionHero" aria-label="Personal executive decision intelligence">
        <div className="heroCopy">
          <p className="eyebrow">Personal Executive Decision Intelligence</p>
          <h1>CFO Signal Desk</h1>
          <p className="heroText">
            From Signal to Decision. Daily Decision Brief connects external market signals
            with your goals, constraints, relationships, and runway so the product answers:
            what changed, what matters, what to do today, and what can wait.
          </p>
        </div>
        <aside className="nextDecision" aria-label="Best decision today">
          <span className="statusPill">{briefStatus}</span>
          <p className="eyebrow">Best Decision Today</p>
          <h2>{activeIssue.recommendedDecision}</h2>
          <p>{activeIssue.rationale}</p>
          <div className="scoreRail">
            <ScoreBar label="Importance" value={88} />
            <ScoreBar label="Urgency" value={84} />
            <ScoreBar label="Confidence" value={activeIssue.confidence} />
          </div>
        </aside>
      </section>

      <section className="sourceControl" aria-label="Data source controls">
        <div>
          <p className="eyebrow">Privacy and Control</p>
          <h2>Sources are explicit and removable</h2>
        </div>
        <div className="sourceGrid">
          {sourceOptions.map((source) => {
            const enabled = !disabledSources.includes(source);
            return (
              <button
                className={sourceClass(enabled)}
                key={source}
                onClick={() => toggleSource(source)}
                type="button"
                aria-pressed={enabled}
              >
                <span>{enabled ? "Enabled" : "Disabled"}</span>
                <strong>{source}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <section className="decisionWorkspace" aria-label="Daily Decision Brief">
        <article className="briefPanel">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Daily Decision Brief</p>
              <h2>What changed, what matters, what to do</h2>
            </div>
            <div className="metricCluster" aria-label="Decision metrics">
              <MiniMetric label="Objects" value={visibleObjects.length.toString()} />
              <MiniMetric label="Approvals" value={needsApprovalCount.toString()} />
              <MiniMetric label="Window" value="24h" />
            </div>
          </div>

          <div className="changeGrid">
            <BriefCard title="What changed" body={activeIssue.whatChanged} />
            <BriefCard title="Why it matters" body={activeIssue.whyItMatters} />
            <BriefCard title="Relevant objective" body={activeIssue.relevantObjective} />
            <BriefCard
              title="Risk of inaction"
              body={activeIssue.riskOfInaction}
            />
          </div>

          <div className="briefColumns">
            <BriefList
              title="Top Personal and Professional Risks"
              items={[
                "Product work creates no near-term pipeline unless it becomes a proof asset.",
                "LinkedIn positioning can become too technical if the finance decision story is not explicit.",
                "Multiple active priorities can dilute focus without a daily revenue and optionality filter.",
              ]}
            />
            <BriefList
              title="Top Opportunities"
              items={[
                "Use CFO Signal Desk to demonstrate practical FP&A and CFO judgment.",
                "Turn the Build Week demo into a recruiter-safe executive finance narrative.",
                "Contact a narrow network with a clear decision-quality angle.",
              ]}
            />
          </div>

          <section className="decisionDetail" aria-label="Decision reasoning">
            <div>
              <strong className={priorityClass(activeIssue.priority)}>
                {activeIssue.priority}
              </strong>
              <h3>{activeIssue.recommendedDecision}</h3>
              <p>{activeIssue.rationale}</p>
            </div>
            <dl>
              <div>
                <dt>Immediate next action</dt>
                <dd>{activeIssue.immediateNextAction}</dd>
              </div>
              <div>
                <dt>Success metric</dt>
                <dd>{activeIssue.successMetric}</dd>
              </div>
              <div>
                <dt>Monitor next</dt>
                <dd>{activeIssue.monitorNext}</dd>
              </div>
              <div>
                <dt>Sources</dt>
                <dd>{activeIssue.sources.join(", ")}</dd>
              </div>
            </dl>
          </section>

          <div className="issueTabs" role="tablist" aria-label="Decisions requiring attention">
            {briefIssues.map((issue) => (
              <button
                className={issue.id === activeIssue.id ? "issueTab active" : "issueTab"}
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                role="tab"
                type="button"
                aria-selected={issue.id === activeIssue.id}
              >
                <span>{issue.priority}</span>
                <strong>{issue.recommendedDecision}</strong>
              </button>
            ))}
          </div>

          <button className="primaryButton" onClick={regenerateDemoBrief} type="button">
            Regenerate Daily Decision Brief
          </button>
        </article>

        <aside className="actionPanel" aria-label="Priorities and watchlist">
          <ActionGroup title="Three Most Important Actions Today" items={mostImportantActions} />
          <ActionGroup
            title="People to Contact"
            items={[
              "Recruiters or hiring managers already connected to finance leadership roles.",
              "Two CFO or SME founder contacts who would understand the Signal Desk use case.",
              "One trusted reviewer for the Build Week demo narrative.",
            ]}
          />
          <ActionGroup
            title="Items That Can Wait"
            items={[
              "Enterprise integrations before the decision model is trusted.",
              "Authentication, user management, or persistent database work.",
              "Broad content experiments without a clear executive finance narrative.",
            ]}
          />
          <div className="watchBox">
            <p className="eyebrow">Tomorrow Watchlist</p>
            <ol>
              <li>New recruiter or advisory conversations that change the pipeline.</li>
              <li>Build Week feedback that changes the product proof story.</li>
              <li>Runway, workload, or family constraints that shift decision urgency.</li>
              <li>FX, inflation, or funding signals useful for the CFO demo case.</li>
            </ol>
          </div>
        </aside>
      </section>

      <section className="intelligenceArea" aria-label="Personal intelligence model">
        <article className="briefPanel">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Personal Intelligence Model</p>
              <h2>Facts, inferences, confidence, and evidence</h2>
            </div>
          </div>
          <div className="objectGrid">
            {visibleObjects.map((item) => (
              <article className="objectCard" key={item.id}>
                <div className="cardTopline">
                  <span>{item.type}</span>
                  <strong className={statusClass(item.status)}>{item.status}</strong>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.possibleContradiction ? (
                  <p className="contradiction">Possible contradiction: {item.possibleContradiction}</p>
                ) : null}
                <dl>
                  <div>
                    <dt>Source</dt>
                    <dd>{item.source}</dd>
                  </div>
                  <div>
                    <dt>Horizon</dt>
                    <dd>{item.timeHorizon}</dd>
                  </div>
                  <div>
                    <dt>Importance</dt>
                    <dd>{item.importance}</dd>
                  </div>
                  <div>
                    <dt>Urgency</dt>
                    <dd>{item.urgency}</dd>
                  </div>
                </dl>
                <div className="evidenceBox">
                  <span>Evidence</span>
                  <ul>
                    {item.evidence.map((evidence) => (
                      <li key={evidence}>{evidence}</li>
                    ))}
                  </ul>
                </div>
                <p className="nextAction">{item.recommendedNextAction}</p>
                <div className="controlRow" aria-label={`Controls for ${item.title}`}>
                  <button type="button" onClick={() => updateStatus(item.id, "Confirmed")}>
                    Approve
                  </button>
                  <button type="button" onClick={() => editInference(item.id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => updateStatus(item.id, "Marked incorrect")}>
                    Incorrect
                  </button>
                  <button type="button" onClick={() => deleteObject(item.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="graphAndLinkedIn" aria-label="Decision graph and LinkedIn intelligence">
        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">Decision Graph</p>
              <h2>How signals connect to goals, people, actions, and results</h2>
            </div>
          </div>
          <div className="graphList">
            {graphLinks.map((link) => (
              <div className="graphLink" key={`${link.from}-${link.to}`}>
                <strong>{link.from}</strong>
                <span>{link.relationship}</span>
                <strong>{link.to}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">LinkedIn Intelligence</p>
              <h2>Positioning decisions for the professional pipeline</h2>
            </div>
          </div>
          <div className="linkedinGrid">
            {linkedinSignals.map((signal) => (
              <section className="linkedinCard" key={signal.label}>
                <div className="cardTopline">
                  <span>{signal.label}</span>
                  <strong className={scoreClass(signal.confidence)}>{signal.confidence}%</strong>
                </div>
                <p>{signal.assessment}</p>
                <h3>{signal.decision}</h3>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="alignmentPanel" aria-label="Strategic alignment check">
        <div>
          <p className="eyebrow">Strategic Alignment Check</p>
          <h2>Do today actions match the user strategy?</h2>
        </div>
        <div className="alignmentGrid">
          <AlignmentItem label="Revenue path first" score={86} />
          <AlignmentItem label="Executive credibility" score={90} />
          <AlignmentItem label="Family stability" score={78} />
          <AlignmentItem label="Long-term optionality" score={84} />
        </div>
        <p>
          Current read: product work is strategically aligned only if it becomes a proof
          asset for paid pipeline, stronger recruiter conversations, or targeted CFO
          advisory outreach.
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

function BriefCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="briefCard">
      <span>{title}</span>
      <p>{body}</p>
    </section>
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
