import { NextRequest, NextResponse } from "next/server";

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

const fallbackBrief: Brief = {
  executiveSummary:
    "The sample management report shows revenue 8.0% below budget, but the stronger management signal is an 11.0% decline in average order value combined with a 3.2 point gross margin gap. This points to pricing, discounting, customer mix, or product mix rather than a simple volume problem. Management should run a margin bridge before revising the revenue forecast or pushing broad sales volume. The next watchlist should focus on AOV by segment, discount exceptions, gross margin bridge, and cash conversion cycle.",
  highestPriorityRisks: [
    {
      description: "Management may misdiagnose the revenue miss as a volume problem.",
      businessImpact:
        "A generic commercial reaction could recover revenue while lowering gross margin and EBITDA quality.",
      urgency: "Executive decision before forecast revision",
    },
    {
      description: "Gross margin is 3.2 points below budget.",
      businessImpact:
        "The company is selling lower-quality revenue unless price, mix, and discount drivers are controlled.",
      urgency: "Margin bridge this week",
    },
    {
      description: "Cash conversion cycle is 9 days above budget.",
      businessImpact:
        "Receivables pressure may create liquidity risk even if sales activity appears stable.",
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
  recommendedDecisions: [
    {
      recommendation: "Run a margin bridge before revising the revenue forecast.",
      why: "Revenue, average order value, and gross margin moved together, so management needs driver clarity before broad commercial action.",
      whyNow: "Revenue is 8.0% below budget while AOV is 11.0% below budget and gross margin is 3.2 points below plan.",
      ignoredConsequence:
        "The company may chase volume while accepting lower-quality revenue and continued margin erosion.",
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
  const selected =
    priorities.length > 0
      ? priorities.join(", ")
      : "Margin protection, Cash preservation, Cost control";

  return {
    ...fallbackBrief,
    executiveSummary: `${fallbackBrief.executiveSummary} Because the selected priorities are ${selected}, the decision set is weighted toward the performance drivers most likely to change management action.`,
    recommendedDecisions: [
      ...fallbackBrief.recommendedDecisions,
      {
        recommendation: `Run a management reporting review focused on ${selected}.`,
        why: "Selected company priorities should change which variances are escalated and which actions are assigned.",
        whyNow:
          "The current KPI pattern affects forecast quality, margin protection, and working capital decisions.",
        ignoredConsequence:
          "Management may review the same report but leave without a clear owner, action, or KPI follow-up.",
        kpiAffected: selected.includes("Revenue growth")
          ? "Revenue"
          : selected.includes("Cost control")
            ? "Operating Cost"
            : "Gross Margin",
        confidence: 76,
        priorityLevel: "Act today",
      },
    ],
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
    typeof candidate.kpiAffected === "string" &&
    typeof candidate.confidence === "number" &&
    ["Monitor", "Act today", "Executive decision"].includes(
      String(candidate.priorityLevel),
    )
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
    !Array.isArray(candidate.recommendedDecisions) ||
    !candidate.recommendedDecisions.every(validateDecision) ||
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
  const payload = (await request.json()) as {
    priorities?: string[];
    signals?: Signal[];
    companyContext?: Record<string, string>;
  };
  const priorities = payload.priorities ?? [];

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
              "You are CFO Signal Desk, a calm executive finance companion for CFOs and finance teams. Mission: turn company reports, KPIs, and business context into perspective, judgment, direction, and accountable actions. Trust is created by showing the boundaries of confidence. Never produce generic summaries or hidden reasoning. Distinguish verified facts, user-provided information, model inference, working assumptions, insufficient data, stale signals, and conflicting evidence. Separate Confidence from Permission to Act. Confidence estimates whether the assessment is correct; Permission to Act evaluates whether execution is justified now based on reversibility, financial exposure, time pressure, governance, operational risk, and confidence influence. Never imply that high confidence automatically means act or low confidence automatically means wait. Explain source evidence, calculation, business impact, likely driver, suggested management direction, action owner, risk of inaction, what remains unknown, and what evidence would change the assessment. Reports show performance; you explain what it means, what deserves attention, what can wait, and what should happen next. Return only valid JSON.",
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
                recommendedDecisions:
                  "Concrete management decisions with confidence boundaries, not observations.",
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
                recommendedDecisions: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: [
                      "recommendation",
                      "why",
                      "whyNow",
                      "ignoredConsequence",
                      "kpiAffected",
                      "confidence",
                      "priorityLevel",
                    ],
                    properties: {
                      recommendation: { type: "string" },
                      why: { type: "string" },
                      whyNow: { type: "string" },
                      ignoredConsequence: { type: "string" },
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
