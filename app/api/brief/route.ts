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
      action: "Approve only purchases with margin cover and hedge visibility.",
    },
    {
      description: "Turn inflation pressure into a targeted pricing review.",
      valueCreated: "Defends weak-margin SKUs without broad repricing.",
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
      whyNow:
        "Short-term funding is expensive and overdue receivables carry a larger penalty.",
      ignoredConsequence:
        "Cash planning may understate financing needs and timing risk.",
      kpiAffected: "Cash Flow",
      confidence: 79,
      priorityLevel: "Act today",
    },
    {
      recommendation: "Start a targeted pricing review for exposed SKUs.",
      why: "Input inflation is concentrated enough to require margin defense, not broad repricing.",
      whyNow:
        "Weekly logistics and food pressure is visible before the next purchase cycle.",
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

function jsonBrief(priorities: string[]): Brief {
  const selected =
    priorities.length > 0
      ? priorities.join(", ")
      : "Cash Flow, Working Capital, FX Exposure";

  return {
    ...fallbackBrief,
    executiveSummary: `${fallbackBrief.executiveSummary} Because the selected priorities are ${selected}, the decision set is weighted toward the KPIs most likely to change management action.`,
    recommendedDecisions: [
      ...fallbackBrief.recommendedDecisions,
      {
        recommendation: `Run a CFO decision standup focused on ${selected}.`,
        why: "Selected company priorities should change the operating agenda, not just the wording of the brief.",
        whyNow:
          "The current signal set affects supplier timing, liquidity, and margin decisions within the next operating day.",
        ignoredConsequence:
          "Treasury, FP&A, Procurement, and Commercial may respond with conflicting priorities.",
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
              "You are CFO Signal Desk, an Executive Decision Intelligence engine. Never produce generic summaries. For every signal, reason through business relevance, financial impact, operational impact, strategic risk, available decision options, recommended executive action, priority level, and tomorrow monitoring. Return only valid JSON.",
          },
          {
            role: "user",
            content: JSON.stringify({
              task: "Generate a CFO executive decision brief.",
              companyContext: payload.companyContext,
              priorities,
              signals: payload.signals,
              constraints: {
                executiveSummary: "Maximum four concise CFO-to-CEO sentences.",
                highestPriorityRisks: "Maximum three.",
                opportunities: "Maximum three, focused on value creation.",
                recommendedDecisions:
                  "Concrete management decisions, not observations.",
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
