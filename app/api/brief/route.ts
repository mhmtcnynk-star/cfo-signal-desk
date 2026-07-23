import { NextRequest, NextResponse } from "next/server";
import { getChatGPTUser } from "../../chatgpt-auth";

type PriorityLevel = "Monitor" | "Act today" | "Executive decision";

type Signal = {
  category: string;
  title: string;
  value: string;
  delta: string;
  severity: "Low" | "Medium" | "High";
  businessRelevance?: string;
  financialImpact?: string;
  operationalImpact?: string;
  strategicRisk?: string;
  recommendedAction?: string;
  priorityLevel?: PriorityLevel;
  kpi?: string;
  confidence?: number;
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
  businessConnections: string[];
  tradeoff: string;
  resilienceSafeguard: string;
  conversionTest: string;
  kpiAffected: string;
  confidence: number;
  priorityLevel: PriorityLevel;
};

type ConnectionState = "Established" | "Partial" | "Broken";

type ValueConversionAnalysis = {
  revenueConversion: {
    state: ConnectionState;
    assessment: string;
  };
  ebitdaConversion: {
    state: ConnectionState;
    assessment: string;
  };
  cashConversion: {
    state: ConnectionState;
    assessment: string;
  };
  bottlenecks: string[];
  recommendedActions: string[];
};

type PerformanceConnections = {
  visiblePerformance: string;
  economicOutcome: string;
  brokenConnections: string[];
  productiveConnections: string[];
  managementDecision: string;
  indicators: string[];
  diagnosis: {
    possession: ConnectionState;
    circulation: ConnectionState;
    meaningfulConnection: ConnectionState;
    outcomeConversion: ConnectionState;
  };
};

type CriticalHazards = {
  hiddenAssumptions: string[];
  underestimatedRisks: string[];
  missingControls: string[];
  strategyInvalidators: string[];
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
  performanceConnections: PerformanceConnections;
  valueConversionAnalysis: ValueConversionAnalysis;
  criticalHazards: CriticalHazards;
  recommendedDecisions: Decision[];
  immediateActions: ImmediateActions;
  tomorrowWatchlist: string[];
};

const fallbackBrief: Brief = {
  executiveSummary:
    "Revenue is 8.0% below budget, EBITDA is 43.6% below budget, and operating cash flow is negative. The central issue is therefore not activity volume but weak conversion from revenue into profit and from profit into cash. Management should isolate price, mix, cost, and working-capital leakage before revising the revenue forecast or pushing broad sales volume. The objective is profitable, cash-generating growth.",
  highestPriorityRisks: [
    {
      description: "Management may misdiagnose the revenue miss as a volume problem.",
      businessImpact:
        "A generic commercial reaction could recover revenue while further weakening EBITDA and cash conversion.",
      urgency: "Executive decision before forecast revision",
    },
    {
      description: "Gross margin is 3.2 points below budget.",
      businessImpact:
        "Only 6.7% of revenue is converting into EBITDA versus 11.0% in the plan.",
      urgency: "Margin bridge this week",
    },
    {
      description: "Cash conversion cycle is 9 days above budget.",
      businessImpact:
        "Positive EBITDA is converting into negative operating cash flow.",
      urgency: "13-week cash forecast refresh today",
    },
  ],
  opportunities: [
    {
      description: "Use the AOV decline to identify where revenue quality is weakening.",
      valueCreated: "Protects EBITDA by targeting the real commercial driver.",
      action: "Analyze customer, SKU, and discount mix before changing sales targets.",
    },
    {
      description: "Turn gross margin variance into a management-ready bridge.",
      valueCreated: "Separates price, volume, mix, and cost effects for faster decisions.",
      action: "Build a margin bridge by customer segment and product line.",
    },
    {
      description: "Use cash cycle pressure to tighten working capital discipline.",
      valueCreated: "Improves liquidity before short-term funding becomes necessary.",
      action: "Escalate overdue strategic accounts and update the cash forecast.",
    },
  ],
  performanceConnections: {
    visiblePerformance:
      "Revenue activity remains material, but revenue is 8.0% below budget and average order value is declining.",
    economicOutcome:
      "Commercial activity is not converting into planned EBITDA quality because average order value and gross margin are weakening together.",
    brokenConnections: [
      "Sales activity is not consistently connected to customer-level margin evidence.",
      "Discount approvals are not visibly connected to realized profitability.",
      "Receivables deterioration reaches treasury after the commercial decision.",
    ],
    productiveConnections: [
      "A price-volume-mix bridge can connect customer behavior to gross margin.",
      "Account-level collection ownership can connect customer relationships to liquidity.",
    ],
    managementDecision:
      "Do not pursue blanket volume recovery. First connect price, mix, discount, and cash evidence into one commercial response.",
    indicators: [
      "Customer and product margin",
      "Discount approval compliance",
      "Average order value",
      "Overdue receivables",
    ],
    diagnosis: {
      possession: "Established",
      circulation: "Established",
      meaningfulConnection: "Partial",
      outcomeConversion: "Broken",
    },
  },
  valueConversionAnalysis: {
    revenueConversion: {
      state: "Broken",
      assessment:
        "$4.6M of revenue converts into $0.31M of EBITDA, a 6.7% margin versus 11.0% in the plan. Price, mix, discount, and cost leakage are reducing revenue quality.",
    },
    ebitdaConversion: {
      state: "Broken",
      assessment:
        "$0.31M of EBITDA converts into negative $0.18M of operating cash flow. Receivables growth and the longer cash cycle absorb the reported profit.",
    },
    cashConversion: {
      state: "Broken",
      assessment:
        "Operating cash flow is $0.60M below budget. The company is funding activity rather than generating cash from it.",
    },
    bottlenecks: [
      "Revenue-to-EBITDA leakage in price, customer mix, discounts, and input cost.",
      "EBITDA-to-cash leakage in receivables and collection timing.",
    ],
    recommendedActions: [
      "Build one Revenue → EBITDA bridge by price, volume, mix, and cost.",
      "Build one EBITDA → Operating Cash Flow bridge by working-capital driver.",
      "Assign joint Sales, FP&A, Controller, and Treasury ownership to both bridges.",
    ],
  },
  criticalHazards: {
    hiddenAssumptions: [
      "Management is treating the revenue shortfall as a volume issue before price and mix are separated.",
    ],
    underestimatedRisks: [
      "Discount exceptions may be concentrated in a small number of customers or products.",
    ],
    missingControls: [
      "No visible invoice-level control links discount approval to realized customer margin.",
    ],
    strategyInvalidators: [
      "A sharp supplier-cost increase or customer concentration loss would invalidate the current margin recovery plan.",
    ],
  },
  recommendedDecisions: [
    {
      recommendation: "Run a margin bridge before revising the revenue forecast.",
      why: "Revenue, average order value, and gross margin moved together, so management needs driver clarity before broad commercial action.",
      whyNow: "Revenue is 8.0% below budget while AOV is 11.0% below budget and gross margin is 3.2 points below plan.",
      ignoredConsequence:
        "The company may chase volume while accepting lower-quality revenue and continued margin erosion.",
      businessConnections: [
        "Sales behavior",
        "Customer and product mix",
        "Gross margin",
        "Forecast",
      ],
      tradeoff:
        "A short diagnostic delay protects decision quality, but waiting too long would slow commercial response.",
      resilienceSafeguard:
        "Require price, volume, mix, and cost evidence before changing the forecast or sales response.",
      conversionTest:
        "Yes. Driver clarity protects revenue quality before growth action and strengthens the Revenue → EBITDA conversion.",
      kpiAffected: "Gross Margin",
      confidence: 86,
      priorityLevel: "Executive decision",
    },
    {
      recommendation: "Freeze non-standard discounts until customer profitability is reviewed.",
      why: "Discounting is a plausible driver of both AOV decline and gross margin pressure.",
      whyNow:
        "The KPI pattern suggests the revenue miss is linked to price and mix, not only demand.",
      ignoredConsequence:
        "Discount exceptions may become normalized before the company understands their EBITDA impact.",
      businessConnections: [
        "Discount authority",
        "Customer profitability",
        "Gross margin",
        "Commercial incentives",
      ],
      tradeoff:
        "Tighter discount control protects margin but may reduce sales flexibility for strategically justified exceptions.",
      resilienceSafeguard:
        "Require named approval, expiry, and realized-margin review for every non-standard discount.",
      conversionTest:
        "Yes. Discount discipline improves the share of Revenue that converts into EBITDA.",
      kpiAffected: "Average Order Value",
      confidence: 78,
      priorityLevel: "Act today",
    },
    {
      recommendation: "Refresh the 13-week cash forecast with the longer collection cycle.",
      why: "Cash conversion cycle is 9 days above budget and receivables pressure can create liquidity risk.",
      whyNow:
        "Working capital deterioration can move faster than monthly reporting cadence.",
      ignoredConsequence:
        "Short-term funding needs may be discovered too late for disciplined treasury action.",
      businessConnections: [
        "Customer collections",
        "Working capital",
        "Treasury capacity",
        "Liquidity",
      ],
      tradeoff:
        "Tighter collections may create customer friction, but unmanaged delay transfers commercial risk into treasury.",
      resilienceSafeguard:
        "Add downside collection scenarios and named escalation owners to the 13-week cash forecast.",
      conversionTest:
        "Yes. Collection ownership directly improves the conversion of EBITDA into Operating Cash Flow.",
      kpiAffected: "Cash Conversion Cycle",
      confidence: 76,
      priorityLevel: "Act today",
    },
  ],
  immediateActions: {
    today: [
      "FP&A: build a margin bridge by price, volume, mix, and cost.",
      "Sales: list all non-standard discount exceptions by customer.",
      "Treasury: update the 13-week cash forecast using the longer collection cycle.",
    ],
    thisWeek: [
      "Commercial: review customer and product mix behind the AOV decline.",
      "Controller: verify invoice-level margin and discount data.",
      "Collections: escalate overdue strategic customers.",
    ],
    thisMonth: [
      "Create a recurring management pack with evidence, calculation, decision, owner, and KPI watchlist.",
      "Track whether discount discipline improves AOV and margin.",
      "Review prior actions against next-period performance outcomes.",
    ],
  },
  tomorrowWatchlist: [
    "Average order value by customer segment",
    "Gross margin bridge by product and customer",
    "Discount exceptions and approval compliance",
    "Cash conversion cycle and overdue receivables",
    "Invoice-level customer profitability data gaps",
  ],
};

function jsonBrief(priorities: string[]): Brief {
  const activePriorities = priorities.slice(0, 3);
  const selected =
    activePriorities.length > 0
      ? activePriorities.join(", ")
      : "Margin protection, Cash preservation, Cost control";

  return {
    ...fallbackBrief,
    executiveSummary: `${fallbackBrief.executiveSummary} Because the selected priorities are ${selected}, the decision set is weighted toward the performance drivers most likely to change management action.`,
    recommendedDecisions: fallbackBrief.recommendedDecisions.slice(0, 3),
    immediateActions: {
      ...fallbackBrief.immediateActions,
      today: [
        ...fallbackBrief.immediateActions.today,
        `CFO: align FP&A, Sales, Controller, and Treasury around ${selected}.`,
      ],
    },
    tomorrowWatchlist: [
      ...fallbackBrief.tomorrowWatchlist,
      `Priority-based variance review: ${selected}`,
    ],
  };
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateDecision(value: unknown): value is Decision {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.recommendation === "string" &&
    typeof candidate.why === "string" &&
    typeof candidate.whyNow === "string" &&
    typeof candidate.ignoredConsequence === "string" &&
    isStringArray(candidate.businessConnections) &&
    typeof candidate.tradeoff === "string" &&
    typeof candidate.resilienceSafeguard === "string" &&
    typeof candidate.conversionTest === "string" &&
    typeof candidate.kpiAffected === "string" &&
    typeof candidate.confidence === "number" &&
    ["Monitor", "Act today", "Executive decision"].includes(
      String(candidate.priorityLevel),
    )
  );
}

function validatePerformanceConnections(value: unknown): value is PerformanceConnections {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  const diagnosis = candidate.diagnosis as Record<string, unknown> | undefined;
  const states = ["Established", "Partial", "Broken"];

  return (
    typeof candidate.visiblePerformance === "string" &&
    typeof candidate.economicOutcome === "string" &&
    isStringArray(candidate.brokenConnections) &&
    isStringArray(candidate.productiveConnections) &&
    typeof candidate.managementDecision === "string" &&
    isStringArray(candidate.indicators) &&
    !!diagnosis &&
    states.includes(String(diagnosis.possession)) &&
    states.includes(String(diagnosis.circulation)) &&
    states.includes(String(diagnosis.meaningfulConnection)) &&
    states.includes(String(diagnosis.outcomeConversion))
  );
}

function validateValueConversionAnalysis(
  value: unknown,
): value is ValueConversionAnalysis {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  const states = ["Established", "Partial", "Broken"];
  const validStage = (stage: unknown) => {
    if (!stage || typeof stage !== "object") return false;
    const item = stage as Record<string, unknown>;
    return (
      states.includes(String(item.state)) &&
      typeof item.assessment === "string"
    );
  };

  return (
    validStage(candidate.revenueConversion) &&
    validStage(candidate.ebitdaConversion) &&
    validStage(candidate.cashConversion) &&
    isStringArray(candidate.bottlenecks) &&
    isStringArray(candidate.recommendedActions)
  );
}

function validateBrief(value: unknown): Brief | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const actions = candidate.immediateActions as
    | Record<string, unknown>
    | undefined;

  if (
    typeof candidate.executiveSummary !== "string" ||
    !Array.isArray(candidate.highestPriorityRisks) ||
    !Array.isArray(candidate.opportunities) ||
    !validatePerformanceConnections(candidate.performanceConnections) ||
    !validateValueConversionAnalysis(candidate.valueConversionAnalysis) ||
    !candidate.criticalHazards ||
    typeof candidate.criticalHazards !== "object" ||
    !Array.isArray(candidate.recommendedDecisions) ||
    candidate.recommendedDecisions.length === 0 ||
    candidate.recommendedDecisions.length > 3 ||
    !candidate.recommendedDecisions.every(validateDecision) ||
    !isStringArray((candidate.criticalHazards as Record<string, unknown>).hiddenAssumptions) ||
    !isStringArray((candidate.criticalHazards as Record<string, unknown>).underestimatedRisks) ||
    !isStringArray((candidate.criticalHazards as Record<string, unknown>).missingControls) ||
    !isStringArray((candidate.criticalHazards as Record<string, unknown>).strategyInvalidators) ||
    !actions ||
    !isStringArray(actions.today) ||
    !isStringArray(actions.thisWeek) ||
    !isStringArray(actions.thisMonth) ||
    !isStringArray(candidate.tomorrowWatchlist)
  ) {
    return null;
  }

  return candidate as Brief;
}

export async function POST(request: NextRequest) {
  const user = await getChatGPTUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const payload = (await request.json()) as {
    priorities?: string[];
    signals?: Signal[];
    companyContext?: Record<string, string>;
  };
  const priorities = (payload.priorities ?? []).slice(0, 3);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ brief: jsonBrief(priorities), mode: "demo" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-5.6",
        input: [
          {
            role: "system",
            content:
              "You are CFO Signal Desk, a calm executive finance companion for CFOs and finance teams. Mission: turn company reports, KPIs, and business context into perspective, judgment, direction, and accountable actions. Trust is created by showing the boundaries of confidence. Never produce generic summaries or hidden reasoning. Distinguish verified facts, user-provided information, model inference, working assumptions, insufficient data, stale signals, and conflicting evidence. Analyze business performance through the value-conversion chain Revenue → EBITDA → Operating Cash Flow. Revenue alone is not success and EBITDA alone is not success; the objective is profitable, cash-generating growth. Ask why Revenue does or does not convert into EBITDA, why EBITDA does or does not convert into Operating Cash Flow, where value leaks from the chain, and which management connection would improve conversion quality. Treat Quality of Conversion as more important than Volume of Activity. Use the broader connection-to-outcome system to explain commercial behavior, pricing, cost, operations, working capital, customer behavior, and management decisions behind each conversion. Separate visible activity from value creation, margin percentage from total contribution, budget compliance from economic correctness, departmental success from company success, and data ownership from decision production. Identify where information stalls, functions optimize locally, decisions arrive late, or activity circulates without producing outcomes. Every decision must state its cross-functional business connections, material trade-off, and whether it improves Revenue → EBITDA → Operating Cash Flow conversion quality. Separate Confidence from Permission to Act. Confidence estimates whether the assessment is correct; Permission to Act evaluates whether execution is justified now based on reversibility, financial exposure, time pressure, governance, operational risk, and confidence influence. Never imply that high confidence automatically means act or low confidence automatically means wait. Before recommending any decision, ask: What critical hazard has not yet been identified? Evaluate critical hazards, hidden operational risks, control weaknesses, concentration and dependency risks, tail exposure, and single points of failure. Think like an aviation safety investigator: avoid blame and identify system weaknesses, missing controls, risk concentration, and process failures. Every recommendation must include a concrete resilience safeguard. Explore options broadly, but recommend no more than three simultaneous strategic initiatives. A fourth initiative must identify which active priority it replaces or remain in exploration. Reports show performance; you explain what it means, what deserves attention, what can wait, and what should happen next. Return only valid JSON.",
          },
          {
            role: "user",
            content: JSON.stringify({
              task: "Generate a management reporting decision brief from KPI and report context.",
              companyContext: payload.companyContext,
              priorities,
              signals: payload.signals,
              constraints: {
                executiveSummary: "Maximum four concise CFO-to-CEO sentences.",
                highestPriorityRisks: "Maximum three.",
                opportunities: "Maximum three, focused on value creation.",
                performanceConnections:
                  "State visible performance, real economic outcome, broken and productive cross-functional connections, the management decision, indicators, and a four-part possession-to-outcome diagnosis.",
                valueConversionAnalysis:
                  "Always analyze Revenue Conversion, EBITDA Conversion, Cash Conversion, bottlenecks, and recommended actions. Explain the Revenue → EBITDA → Operating Cash Flow chain and where value is lost.",
                criticalHazards:
                  "Identify hidden assumptions, underestimated risks, missing controls, and events that could invalidate the strategy. Focus on systems, not blame.",
                recommendedDecisions:
                  "Two or three concrete management decisions with confidence boundaries, not observations. End every decision with a conversion test stating whether and how it improves Revenue → EBITDA → Operating Cash Flow quality. Never exceed three active initiatives; a fourth must replace one or remain exploratory.",
                tomorrowWatchlist:
                  "Only signals that deserve executive attention tomorrow.",
              },
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "cfo_decision_brief",
            schema: {
              type: "object",
              additionalProperties: false,
              required: [
                "executiveSummary",
                "highestPriorityRisks",
                "opportunities",
                "performanceConnections",
                "valueConversionAnalysis",
                "criticalHazards",
                "recommendedDecisions",
                "immediateActions",
                "tomorrowWatchlist",
              ],
              properties: {
                executiveSummary: { type: "string" },
                highestPriorityRisks: {
                  type: "array",
                  maxItems: 3,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["description", "businessImpact", "urgency"],
                    properties: {
                      description: { type: "string" },
                      businessImpact: { type: "string" },
                      urgency: { type: "string" },
                    },
                  },
                },
                opportunities: {
                  type: "array",
                  maxItems: 3,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["description", "valueCreated", "action"],
                    properties: {
                      description: { type: "string" },
                      valueCreated: { type: "string" },
                      action: { type: "string" },
                    },
                  },
                },
                performanceConnections: {
                  type: "object",
                  additionalProperties: false,
                  required: [
                    "visiblePerformance",
                    "economicOutcome",
                    "brokenConnections",
                    "productiveConnections",
                    "managementDecision",
                    "indicators",
                    "diagnosis",
                  ],
                  properties: {
                    visiblePerformance: { type: "string" },
                    economicOutcome: { type: "string" },
                    brokenConnections: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
                    productiveConnections: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
                    managementDecision: { type: "string" },
                    indicators: { type: "array", minItems: 1, maxItems: 6, items: { type: "string" } },
                    diagnosis: {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "possession",
                        "circulation",
                        "meaningfulConnection",
                        "outcomeConversion",
                      ],
                      properties: {
                        possession: { type: "string", enum: ["Established", "Partial", "Broken"] },
                        circulation: { type: "string", enum: ["Established", "Partial", "Broken"] },
                        meaningfulConnection: { type: "string", enum: ["Established", "Partial", "Broken"] },
                        outcomeConversion: { type: "string", enum: ["Established", "Partial", "Broken"] },
                      },
                    },
                  },
                },
                valueConversionAnalysis: {
                  type: "object",
                  additionalProperties: false,
                  required: [
                    "revenueConversion",
                    "ebitdaConversion",
                    "cashConversion",
                    "bottlenecks",
                    "recommendedActions",
                  ],
                  properties: {
                    revenueConversion: {
                      type: "object",
                      additionalProperties: false,
                      required: ["state", "assessment"],
                      properties: {
                        state: { type: "string", enum: ["Established", "Partial", "Broken"] },
                        assessment: { type: "string" },
                      },
                    },
                    ebitdaConversion: {
                      type: "object",
                      additionalProperties: false,
                      required: ["state", "assessment"],
                      properties: {
                        state: { type: "string", enum: ["Established", "Partial", "Broken"] },
                        assessment: { type: "string" },
                      },
                    },
                    cashConversion: {
                      type: "object",
                      additionalProperties: false,
                      required: ["state", "assessment"],
                      properties: {
                        state: { type: "string", enum: ["Established", "Partial", "Broken"] },
                        assessment: { type: "string" },
                      },
                    },
                    bottlenecks: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
                    recommendedActions: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
                  },
                },
                criticalHazards: {
                  type: "object",
                  additionalProperties: false,
                  required: [
                    "hiddenAssumptions",
                    "underestimatedRisks",
                    "missingControls",
                    "strategyInvalidators",
                  ],
                  properties: {
                    hiddenAssumptions: { type: "array", minItems: 1, maxItems: 3, items: { type: "string" } },
                    underestimatedRisks: { type: "array", minItems: 1, maxItems: 3, items: { type: "string" } },
                    missingControls: { type: "array", minItems: 1, maxItems: 3, items: { type: "string" } },
                    strategyInvalidators: { type: "array", minItems: 1, maxItems: 3, items: { type: "string" } },
                  },
                },
                recommendedDecisions: {
                  type: "array",
                  minItems: 1,
                  maxItems: 3,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: [
                      "recommendation",
                      "why",
                      "whyNow",
                      "ignoredConsequence",
                      "businessConnections",
                      "tradeoff",
                      "resilienceSafeguard",
                      "conversionTest",
                      "kpiAffected",
                      "confidence",
                      "priorityLevel",
                    ],
                    properties: {
                      recommendation: { type: "string" },
                      why: { type: "string" },
                      whyNow: { type: "string" },
                      ignoredConsequence: { type: "string" },
                      businessConnections: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
                      tradeoff: { type: "string" },
                      resilienceSafeguard: { type: "string" },
                      conversionTest: { type: "string" },
                      kpiAffected: { type: "string" },
                      confidence: { type: "number", minimum: 0, maximum: 100 },
                      priorityLevel: {
                        type: "string",
                        enum: ["Monitor", "Act today", "Executive decision"],
                      },
                    },
                  },
                },
                immediateActions: {
                  type: "object",
                  additionalProperties: false,
                  required: ["today", "thisWeek", "thisMonth"],
                  properties: {
                    today: { type: "array", items: { type: "string" } },
                    thisWeek: { type: "array", items: { type: "string" } },
                    thisMonth: { type: "array", items: { type: "string" } },
                  },
                },
                tomorrowWatchlist: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed: ${response.status}`);
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ text?: string }> }>;
    };
    const text =
      data.output_text ??
      data.output?.flatMap((item) => item.content ?? []).find((item) => item.text)
        ?.text;

    if (!text) {
      throw new Error("OpenAI response did not include text");
    }

    const parsed = validateBrief(JSON.parse(text));
    if (!parsed) {
      throw new Error("OpenAI response did not match the brief schema");
    }

    return NextResponse.json({ brief: parsed, mode: "openai" });
  } catch {
    return NextResponse.json({ brief: jsonBrief(priorities), mode: "demo" });
  }
}
