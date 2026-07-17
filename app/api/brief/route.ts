import { NextRequest, NextResponse } from "next/server";

type Severity = "Low" | "Medium" | "High";

type Signal = {
  category: string;
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

const fallbackBrief: Brief = {
  executiveSummary:
    "Today is a defensive finance day. FX pressure, elevated funding costs, and early inflation signals should move the agenda toward cash protection, supplier timing, and margin discipline.",
  keySignals: [
    "FX volatility is the highest-severity signal because it affects import timing and supplier liabilities.",
    "Inflation pressure is building in logistics and food inputs.",
    "Short-term rates make working capital delays more expensive.",
  ],
  financialImpact: [
    "Treasury should update USD exposure and payment timing before the next supplier cycle.",
    "FP&A should refresh gross margin assumptions for imported and logistics-heavy products.",
    "Collections discipline has a direct financing-cost impact while rates remain elevated.",
  ],
  operationalImpact: [
    "Procurement may need faster quote validation and alternate suppliers.",
    "Commercial teams should check price pass-through capacity by customer segment.",
    "Controllers should reconcile open purchase orders against hedge coverage.",
  ],
  recommendedDecisions: [
    "Review import purchasing schedules and consider accelerating supplier payments where FX risk exceeds financing cost.",
    "Run a 13-week cash forecast sensitivity using the current FX and rate assumptions.",
    "Hold non-critical discretionary spend until tomorrow's FX and CPI signals are clearer.",
  ],
  tomorrowWatchlist: [
    "CPI release or expectation survey",
    "Central bank communication and FX intervention signals",
    "Commodity prices and freight indicators",
    "Sovereign yields and country risk",
    "Supplier quote resets and import approval queues",
  ],
};

function jsonBrief(priorities: string[]): Brief {
  const selected =
    priorities.length > 0
      ? priorities.join(", ")
      : "Cash Flow, Working Capital, FX Exposure";

  return {
    ...fallbackBrief,
    executiveSummary: `${fallbackBrief.executiveSummary} Current company priorities are ${selected}.`,
    recommendedDecisions: [
      ...fallbackBrief.recommendedDecisions,
      `Hold a CFO decision standup focused on ${selected} and assign one owner per risk before tomorrow noon.`,
    ],
    tomorrowWatchlist: [
      ...fallbackBrief.tomorrowWatchlist,
      `Priority dashboard review: ${selected}`,
    ],
  };
}

function validateBrief(value: unknown): Brief | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const keys: (keyof Brief)[] = [
    "executiveSummary",
    "keySignals",
    "financialImpact",
    "operationalImpact",
    "recommendedDecisions",
    "tomorrowWatchlist",
  ];

  for (const key of keys) {
    if (key === "executiveSummary") {
      if (typeof candidate[key] !== "string") {
        return null;
      }
    } else if (
      !Array.isArray(candidate[key]) ||
      !(candidate[key] as unknown[]).every((item) => typeof item === "string")
    ) {
      return null;
    }
  }

  return candidate as Brief;
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as {
    priorities?: string[];
    signals?: Signal[];
    companyContext?: string;
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
              "You are CFO Signal Desk. Produce concise, executive, professional, board-ready CFO briefings. Return only valid JSON matching the requested schema.",
          },
          {
            role: "user",
            content: JSON.stringify({
              task: "Generate a five-minute CFO executive briefing.",
              companyContext: payload.companyContext,
              priorities,
              signals: payload.signals,
              schema: {
                executiveSummary: "string",
                keySignals: ["string"],
                financialImpact: ["string"],
                operationalImpact: ["string"],
                recommendedDecisions: ["string"],
                tomorrowWatchlist: ["string"],
              },
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "cfo_signal_brief",
            schema: {
              type: "object",
              additionalProperties: false,
              required: [
                "executiveSummary",
                "keySignals",
                "financialImpact",
                "operationalImpact",
                "recommendedDecisions",
                "tomorrowWatchlist",
              ],
              properties: {
                executiveSummary: { type: "string" },
                keySignals: { type: "array", items: { type: "string" } },
                financialImpact: { type: "array", items: { type: "string" } },
                operationalImpact: { type: "array", items: { type: "string" } },
                recommendedDecisions: {
                  type: "array",
                  items: { type: "string" },
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
