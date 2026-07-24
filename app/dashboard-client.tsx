"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Locale = "en" | "es";
type Severity = "High" | "Medium" | "Low";
type PriorityLevel = "Monitor" | "Act today" | "Executive decision";

const MAX_ACTIVE_PRIORITIES = 3;

type CompanyProfile = {
  name: string;
  industry: string;
  size: string;
  geography: string;
  fxExposure: string;
  priorities: string[];
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
  revenueConversion: { state: ConnectionState; assessment: string };
  ebitdaConversion: { state: ConnectionState; assessment: string };
  cashConversion: { state: ConnectionState; assessment: string };
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

type Brief = {
  executiveSummary: string;
  highestPriorityRisks: Array<{
    description: string;
    businessImpact: string;
    urgency: string;
  }>;
  opportunities: Array<{
    description: string;
    valueCreated: string;
    action: string;
  }>;
  performanceConnections: PerformanceConnections;
  valueConversionAnalysis: ValueConversionAnalysis;
  criticalHazards: CriticalHazards;
  recommendedDecisions: Decision[];
  immediateActions: {
    today: string[];
    thisWeek: string[];
    thisMonth: string[];
  };
  tomorrowWatchlist: string[];
};

type JournalEntry = {
  id: string;
  decision: string;
  status: "Accepted" | "Modified" | "Postponed";
  owner: string;
  createdAt: string;
  reviewDate: string;
};

type Signal = {
  id: string;
  category: string;
  title: string;
  value: string;
  delta: string;
  severity: Severity;
  fact: string;
  inference: string;
  relevance: string;
  source: string;
  updated: string;
};

const profileDefault: CompanyProfile = {
  name: "Northstar Manufacturing",
  industry: "Industrial manufacturing",
  size: "$50–100M revenue",
  geography: "Türkiye · EU suppliers",
  fxExposure: "High USD and EUR purchasing exposure",
  priorities: ["Margin protection", "Cash preservation", "Working capital"],
};

const priorities = [
  "Margin protection",
  "Cash preservation",
  "Working capital",
  "Revenue growth",
  "Cost control",
  "FX exposure",
];

const signals: Signal[] = [
  {
    id: "revenue",
    category: "Commercial",
    title: "Revenue",
    value: "$4.6M",
    delta: "8.0% below budget",
    severity: "Medium",
    fact: "Monthly revenue is $0.4M below the approved budget.",
    inference: "The miss is more likely related to price and mix than order volume.",
    relevance: "Forecast quality · EBITDA",
    source: "/sample-data/management-report.json#revenue",
    updated: "Today · 07:30",
  },
  {
    id: "ebitda",
    category: "Profitability",
    title: "EBITDA",
    value: "$0.31M",
    delta: "43.6% below budget",
    severity: "High",
    fact: "EBITDA margin is 6.7% versus 11.0% in the approved budget.",
    inference: "Price, discount, product mix, or input cost is weakening revenue-to-profit conversion.",
    relevance: "Revenue conversion · EBITDA",
    source: "/sample-data/management-report.json#ebitda",
    updated: "Today · 07:30",
  },
  {
    id: "operating-cash-flow",
    category: "Liquidity",
    title: "Operating cash flow",
    value: "−$0.18M",
    delta: "$0.60M below budget",
    severity: "High",
    fact: "Positive EBITDA did not convert into positive operating cash flow.",
    inference: "Receivables growth and the longer cash cycle are absorbing reported profit.",
    relevance: "EBITDA conversion · Cash",
    source: "/sample-data/management-report.json#operating-cash-flow",
    updated: "Today · 07:30",
  },
];

const demoBrief: Brief = {
  executiveSummary:
    "Revenue is 8.0% below budget, EBITDA is 43.6% below budget, and operating cash flow is negative. The central issue is not activity volume but weak conversion from revenue into profit and from profit into cash. Management should isolate price, mix, cost, and working-capital leakage before revising the revenue forecast or pushing broad sales volume. The objective is profitable, cash-generating growth.",
  highestPriorityRisks: [
    {
      description: "Revenue quality is weakening.",
      businessImpact: "Broad volume action could recover sales while further weakening EBITDA and cash conversion.",
      urgency: "Resolve before forecast revision",
    },
    {
      description: "Gross margin is 3.2 points below plan.",
      businessImpact: "Only 6.7% of revenue is converting into EBITDA versus 11.0% in the plan.",
      urgency: "Margin bridge this week",
    },
    {
      description: "Collections are extending the cash cycle.",
      businessImpact: "Positive EBITDA is converting into negative operating cash flow.",
      urgency: "Refresh cash forecast today",
    },
  ],
  opportunities: [
    {
      description: "Use the AOV decline to locate weak revenue quality.",
      valueCreated: "Protects margin without a blanket commercial response.",
      action: "Review customer, SKU, and discount mix.",
    },
    {
      description: "Tighten collection focus on strategic overdue accounts.",
      valueCreated: "Improves liquidity before funding is required.",
      action: "Assign account-level collection owners.",
    },
  ],
  performanceConnections: {
    visiblePerformance:
      "Revenue activity remains material, but monthly revenue is 8.0% below budget and average order value is declining.",
    economicOutcome:
      "Lower average order value and a 3.2-point margin gap show that commercial activity is not converting into planned EBITDA quality.",
    brokenConnections: [
      "Sales activity is not consistently connected to customer-level margin evidence.",
      "Discount approvals are not visibly connected to realized profitability.",
      "Receivables deterioration is reaching treasury after the commercial decision.",
    ],
    productiveConnections: [
      "A price-volume-mix bridge can connect customer behavior to gross margin.",
      "Account-level collection ownership can connect sales relationships to liquidity.",
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
      "The revenue shortfall is being treated as a commercial volume issue before price and mix are separated.",
    ],
    underestimatedRisks: [
      "Discount exceptions may be concentrated in a small number of customers or products.",
    ],
    missingControls: [
      "There is no visible invoice-level control linking discount approval to realized customer margin.",
    ],
    strategyInvalidators: [
      "A sharp supplier-cost increase or customer concentration loss would invalidate the current margin recovery plan.",
    ],
  },
  recommendedDecisions: [
    {
      recommendation: "Run a margin bridge before revising the revenue forecast.",
      why: "Revenue, average order value, and gross margin moved together.",
      whyNow: "A forecast change made before driver clarity may institutionalize the wrong response.",
      ignoredConsequence: "Management may chase volume while accepting lower-quality revenue.",
      businessConnections: [
        "Sales behavior",
        "Customer and product mix",
        "Gross margin",
        "Forecast",
      ],
      tradeoff:
        "A short diagnostic delay protects decision quality, but waiting too long would slow commercial response.",
      resilienceSafeguard: "Require price, volume, mix, and cost evidence before changing the forecast or sales response.",
      conversionTest:
        "Yes. Driver clarity protects revenue quality before growth action and strengthens the Revenue → EBITDA conversion.",
      kpiAffected: "Gross Margin",
      confidence: 86,
      priorityLevel: "Executive decision",
    },
    {
      recommendation: "Refresh the 13-week cash forecast using the longer collection cycle.",
      why: "Working capital deterioration is already visible in receivables.",
      whyNow: "Liquidity risk can develop between monthly closes.",
      ignoredConsequence: "Short-term funding needs may be discovered too late.",
      businessConnections: [
        "Customer collections",
        "Working capital",
        "Treasury capacity",
        "Liquidity",
      ],
      tradeoff:
        "Tighter collections may create customer friction, but unmanaged delay transfers commercial risk into treasury.",
      resilienceSafeguard: "Add downside collection scenarios and named escalation owners to the 13-week cash forecast.",
      conversionTest:
        "Yes. Collection ownership directly improves the conversion of EBITDA into Operating Cash Flow.",
      kpiAffected: "Cash Conversion Cycle",
      confidence: 76,
      priorityLevel: "Act today",
    },
  ],
  immediateActions: {
    today: [
      "FP&A: build the price-volume-mix margin bridge.",
      "Treasury: refresh the 13-week cash forecast.",
      "Sales: list non-standard discount exceptions.",
    ],
    thisWeek: [
      "Review customer and product mix behind the AOV decline.",
      "Assign collection owners for overdue strategic accounts.",
    ],
    thisMonth: ["Add margin quality and decision outcomes to the management pack."],
  },
  tomorrowWatchlist: [
    "Average order value by customer segment",
    "Gross margin bridge by product and customer",
    "Discount exceptions and approval compliance",
    "Overdue receivables and cash conversion cycle",
  ],
};

const copy = {
  en: {
    morning: "Good morning",
    briefDate: "Daily Executive Brief",
    intro: "Three signals deserve attention. One decision needs executive judgment today.",
    refresh: "Refresh brief",
    refreshing: "Preparing brief…",
    demo: "Demo data",
    live: "Connected analysis",
    profile: "Company profile",
    edit: "Edit profile",
    close: "Close",
    save: "Save context",
    signals: "Signals that matter",
    signalIntro: "Facts and interpretation are separated so you can challenge the judgment.",
    fact: "Fact",
    inference: "Interpretation",
    source: "Open source",
    executiveBrief: "Executive brief",
    recommendation: "Recommended decision",
    whyNow: "Why now",
    inaction: "If ignored",
    businessConnections: "Business connections",
    tradeoff: "Risk and trade-off",
    safeguard: "Resilience safeguard",
    confidence: "Confidence",
    permission: "Permission to act",
    permissionValue: "Proceed with safeguards",
    permissionReason: "The analysis is reversible; validate the bridge before changing the forecast.",
    focus: "Execution focus",
    focusSlots: "active strategic slots",
    focusReason: "Ideas remain open. A fourth initiative must replace an active priority or stay in exploration.",
    risks: "Priority risks",
    opportunities: "Opportunities",
    connections: "Performance connections",
    connectionPrompt: "Quality of conversion matters more than volume of activity.",
    valueConversion: "Value Conversion Analysis",
    revenueConversion: "Revenue Conversion",
    ebitdaConversion: "EBITDA Conversion",
    cashConversion: "Cash Conversion",
    bottlenecks: "Bottlenecks",
    conversionActions: "Recommended actions",
    conversionTest: "Value conversion test",
    visiblePerformance: "Visible performance",
    economicOutcome: "Real economic outcome",
    brokenConnections: "Broken connections",
    productiveConnections: "Outcome-producing connections",
    managementDecision: "Management decision",
    trackedIndicators: "Indicators to monitor",
    possession: "Resource ownership",
    circulation: "Activity flow",
    meaningfulConnection: "Meaningful connection",
    outcomeConversion: "Outcome conversion",
    hazards: "Critical hazards",
    hazardPrompt: "What critical hazard has not yet been identified?",
    hiddenAssumptions: "Hidden assumptions",
    underestimatedRisks: "Underestimated risks",
    missingControls: "Missing controls",
    strategyInvalidators: "Events that could invalidate the strategy",
    actions: "Immediate actions",
    today: "Today",
    week: "This week",
    month: "This month",
    watchlist: "Tomorrow’s watchlist",
    journal: "Decision journal",
    journalIntro: "Record the decision, owner, and review date while the context is fresh.",
    accepted: "Accept",
    modified: "Modify",
    postponed: "Postpone",
    owner: "Owner",
    review: "Review",
    noJournal: "No decisions recorded yet.",
    sources: "Source links",
    sourceIntro: "Every material claim points back to the visible demo report.",
    priorities: "Business priorities",
    priorityGuidance: "Choose up to three active priorities. New ideas can remain in exploration without consuming execution capacity.",
    priorityLimit: "Three active priorities already selected. Replace one before adding another.",
    identity: "Private workspace",
    signOut: "Sign out",
    saved: "Company context saved",
  },
  es: {
    morning: "Buenos días",
    briefDate: "Brief ejecutivo diario",
    intro: "Tres señales requieren atención. Una decisión necesita criterio ejecutivo hoy.",
    refresh: "Actualizar brief",
    refreshing: "Preparando brief…",
    demo: "Datos demo",
    live: "Análisis conectado",
    profile: "Perfil de empresa",
    edit: "Editar perfil",
    close: "Cerrar",
    save: "Guardar contexto",
    signals: "Señales relevantes",
    signalIntro: "Los hechos y la interpretación están separados para poder cuestionar el juicio.",
    fact: "Hecho",
    inference: "Interpretación",
    source: "Abrir fuente",
    executiveBrief: "Brief ejecutivo",
    recommendation: "Decisión recomendada",
    whyNow: "Por qué ahora",
    inaction: "Si se ignora",
    businessConnections: "Conexiones del negocio",
    tradeoff: "Riesgo y trade-off",
    safeguard: "Salvaguarda de resiliencia",
    confidence: "Confianza",
    permission: "Permiso para actuar",
    permissionValue: "Proceder con salvaguardas",
    permissionReason: "El análisis es reversible; valide el puente antes de cambiar el forecast.",
    focus: "Foco de ejecución",
    focusSlots: "espacios estratégicos activos",
    focusReason: "Las ideas siguen abiertas. Una cuarta iniciativa debe reemplazar una prioridad activa o permanecer en exploración.",
    risks: "Riesgos prioritarios",
    opportunities: "Oportunidades",
    connections: "Conexiones de desempeño",
    connectionPrompt: "La calidad de conversión importa más que el volumen de actividad.",
    valueConversion: "Análisis de Conversión de Valor",
    revenueConversion: "Conversión de Revenue",
    ebitdaConversion: "Conversión de EBITDA",
    cashConversion: "Conversión de Cash",
    bottlenecks: "Cuellos de botella",
    conversionActions: "Acciones recomendadas",
    conversionTest: "Prueba de conversión de valor",
    visiblePerformance: "Desempeño visible",
    economicOutcome: "Resultado económico real",
    brokenConnections: "Conexiones rotas",
    productiveConnections: "Conexiones que producen resultados",
    managementDecision: "Decisión de gestión",
    trackedIndicators: "Indicadores a seguir",
    possession: "Disponibilidad de recursos",
    circulation: "Flujo de actividad",
    meaningfulConnection: "Conexión significativa",
    outcomeConversion: "Conversión en resultados",
    hazards: "Peligros críticos",
    hazardPrompt: "¿Qué peligro crítico aún no ha sido identificado?",
    hiddenAssumptions: "Supuestos ocultos",
    underestimatedRisks: "Riesgos subestimados",
    missingControls: "Controles ausentes",
    strategyInvalidators: "Eventos que podrían invalidar la estrategia",
    actions: "Acciones inmediatas",
    today: "Hoy",
    week: "Esta semana",
    month: "Este mes",
    watchlist: "Atención de mañana",
    journal: "Diario de decisiones",
    journalIntro: "Registre la decisión, responsable y fecha de revisión mientras el contexto está fresco.",
    accepted: "Aceptar",
    modified: "Modificar",
    postponed: "Posponer",
    owner: "Responsable",
    review: "Revisión",
    noJournal: "Aún no hay decisiones registradas.",
    sources: "Fuentes",
    sourceIntro: "Cada afirmación material apunta al reporte demo visible.",
    priorities: "Prioridades del negocio",
    priorityGuidance: "Elija hasta tres prioridades activas. Las nuevas ideas pueden permanecer en exploración sin consumir capacidad de ejecución.",
    priorityLimit: "Ya hay tres prioridades activas. Reemplace una antes de agregar otra.",
    identity: "Espacio privado",
    signOut: "Cerrar sesión",
    saved: "Contexto de empresa guardado",
  },
} as const;

function severityClass(severity: Severity) {
  return severity.toLowerCase();
}

function connectionStateLabel(state: ConnectionState, locale: Locale) {
  if (locale === "en") return state;
  return {
    Established: "Establecida",
    Partial: "Parcial",
    Broken: "Rota",
  }[state];
}

function nextReviewDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 10);
}

function limitProfilePriorities(profile: CompanyProfile): CompanyProfile {
  return {
    ...profile,
    priorities: Array.isArray(profile.priorities)
      ? profile.priorities.slice(0, MAX_ACTIVE_PRIORITIES)
      : [],
  };
}

export default function Dashboard({
  user,
  signOutPath,
}: {
  user: { displayName: string; email: string };
  signOutPath: string;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  const [profile, setProfile] = useState(profileDefault);
  const [draftProfile, setDraftProfile] = useState(profileDefault);
  const [profileOpen, setProfileOpen] = useState(false);
  const [brief, setBrief] = useState(demoBrief);
  const [mode, setMode] = useState<"demo" | "openai">("demo");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [dateLabel, setDateLabel] = useState("");
  const t = copy[locale];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedProfile = window.localStorage.getItem("cfo-signal-profile");
        const savedJournal = window.localStorage.getItem("cfo-signal-journal");
        if (savedProfile) {
          const parsed = limitProfilePriorities(JSON.parse(savedProfile) as CompanyProfile);
          setProfile(parsed);
          setDraftProfile(parsed);
        }
        if (savedJournal) {
          setJournal(JSON.parse(savedJournal) as JournalEntry[]);
        }
      } catch {
        window.localStorage.removeItem("cfo-signal-profile");
        window.localStorage.removeItem("cfo-signal-journal");
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDateLabel(
        new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-ES", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }).format(new Date()),
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, [locale]);

  const firstName = useMemo(
    () => user.displayName.split(/[\s@]/)[0] || "CFO",
    [user.displayName],
  );
  async function refreshBrief() {
    setLoading(true);
    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priorities: profile.priorities,
          companyContext: profile,
          signals,
        }),
      });
      if (!response.ok) throw new Error("Brief request failed");
      const result = (await response.json()) as { brief: Brief; mode: "demo" | "openai" };
      setBrief(result.brief);
      setMode(result.mode);
    } catch {
      setBrief(demoBrief);
      setMode("demo");
    } finally {
      setLoading(false);
    }
  }

  function togglePriority(priority: string) {
    if (!draftProfile.priorities.includes(priority) && draftProfile.priorities.length >= MAX_ACTIVE_PRIORITIES) {
      setNotice(t.priorityLimit);
      window.setTimeout(() => setNotice(""), 2400);
      return;
    }

    setDraftProfile({
      ...draftProfile,
      priorities: draftProfile.priorities.includes(priority)
        ? draftProfile.priorities.filter((item) => item !== priority)
        : [...draftProfile.priorities, priority],
    });
  }

  function saveProfile(event: FormEvent) {
    event.preventDefault();
    setProfile(draftProfile);
    window.localStorage.setItem("cfo-signal-profile", JSON.stringify(draftProfile));
    setProfileOpen(false);
    setNotice(t.saved);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function recordDecision(decision: Decision, status: JournalEntry["status"]) {
    const entry: JournalEntry = {
      id: `${Date.now()}-${status}`,
      decision: decision.recommendation,
      status,
      owner: status === "Postponed" ? "CFO" : "FP&A Director",
      createdAt: new Date().toISOString().slice(0, 10),
      reviewDate: nextReviewDate(),
    };
    const next = [entry, ...journal].slice(0, 8);
    setJournal(next);
    window.localStorage.setItem("cfo-signal-journal", JSON.stringify(next));
  }

  const primaryDecision = brief.recommendedDecisions[0] ?? demoBrief.recommendedDecisions[0];
  const activeDecisionCount = Math.min(
    brief.recommendedDecisions.length,
    MAX_ACTIVE_PRIORITIES,
  );

  return (
    <main className="appShell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="CFO Signal Desk home">
          <span className="brandMark small">CFO</span>
          <span>Signal Desk</span>
        </a>
        <div className="topbarActions">
          <div className="languageSwitch" aria-label="Language">
            <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>EN</button>
            <button className={locale === "es" ? "active" : ""} onClick={() => setLocale("es")}>ES</button>
          </div>
          <button className="quietButton" onClick={() => setProfileOpen(true)}>{t.profile}</button>
          <details className="accountMenu">
            <summary aria-label="Account menu"><span>{firstName.slice(0, 1).toUpperCase()}</span></summary>
            <div>
              <strong>{user.displayName}</strong>
              <small>{user.email}</small>
              <span className="identityLabel">{t.identity}</span>
              <a href={signOutPath}>{t.signOut}</a>
            </div>
          </details>
        </div>
      </header>

      <section className="morningHeader" id="top">
        <div>
          <p className="eyebrow">{t.briefDate}{dateLabel ? ` · ${dateLabel}` : ""}</p>
          <h1>{t.morning}, {firstName}.</h1>
          <p>{t.intro}</p>
        </div>
        <div className="briefControls">
          <span className={`modeBadge ${mode}`}>{mode === "demo" ? t.demo : t.live}</span>
          <button className="primaryButton" onClick={refreshBrief} disabled={loading}>
            {loading ? t.refreshing : t.refresh}
          </button>
        </div>
      </section>

      <section className="companyContext" aria-label={t.profile}>
        <div>
          <span>{profile.name}</span>
          <strong>{profile.industry}</strong>
        </div>
        <div><span>Scale</span><strong>{profile.size}</strong></div>
        <div><span>Exposure</span><strong>{profile.geography}</strong></div>
        <div className="prioritySummary"><span>{t.priorities}</span><strong>{profile.priorities.join(" · ")}</strong></div>
        <button className="iconButton" onClick={() => setProfileOpen(true)} aria-label={t.edit} title={t.edit}>Edit</button>
      </section>

      <section className="decisionFocus" aria-labelledby="decision-title">
        <div className="decisionMain">
          <div className="sectionTopline">
            <p className="eyebrow">{t.recommendation}</p>
            <span className="priorityBadge">{primaryDecision.priorityLevel}</span>
          </div>
          <h2 id="decision-title">{primaryDecision.recommendation}</h2>
          <p className="decisionWhy">{primaryDecision.why}</p>
          <div className="decisionRationale">
            <div><span>{t.whyNow}</span><p>{primaryDecision.whyNow}</p></div>
            <div><span>{t.inaction}</span><p>{primaryDecision.ignoredConsequence}</p></div>
            <div><span>{t.businessConnections}</span><p>{primaryDecision.businessConnections.join(" → ")}</p></div>
            <div><span>{t.tradeoff}</span><p>{primaryDecision.tradeoff}</p></div>
            <div className="resilienceSafeguard"><span>{t.safeguard}</span><p>{primaryDecision.resilienceSafeguard}</p></div>
            <div className="conversionTest"><span>{t.conversionTest}</span><p>{primaryDecision.conversionTest}</p></div>
          </div>
        </div>
        <aside className="authorizationPanel" aria-label="Decision authorization">
          <div className="authorizationMetric">
            <span>{t.confidence}</span>
            <strong>{primaryDecision.confidence}%</strong>
            <div className="confidenceTrack"><i style={{ width: `${primaryDecision.confidence}%` }} /></div>
            <p>Three consistent KPI movements; discount detail is still incomplete.</p>
          </div>
          <div className="authorizationMetric permission">
            <span>{t.permission}</span>
            <strong>{t.permissionValue}</strong>
            <p>{t.permissionReason}</p>
          </div>
          <div className="authorizationMetric focus">
            <span>{t.focus}</span>
            <strong>{activeDecisionCount} / {MAX_ACTIVE_PRIORITIES} {t.focusSlots}</strong>
            <p>{t.focusReason}</p>
          </div>
          <div className="decisionButtons">
            <button onClick={() => recordDecision(primaryDecision, "Accepted")}>{t.accepted}</button>
            <button onClick={() => recordDecision(primaryDecision, "Modified")}>{t.modified}</button>
            <button onClick={() => recordDecision(primaryDecision, "Postponed")}>{t.postponed}</button>
          </div>
        </aside>
      </section>

      <section className="contentSection" aria-labelledby="signals-title">
        <div className="sectionHeader">
          <div><p className="eyebrow">01 · {t.signals}</p><h2 id="signals-title">{t.signals}</h2></div>
          <p>{t.signalIntro}</p>
        </div>
        <div className="signalGrid">
          {signals.map((signal) => (
            <article className="signalCard" key={signal.id}>
              <div className="cardTopline"><span>{signal.category}</span><i className={`severityDot ${severityClass(signal.severity)}`} title={`${signal.severity} severity`} /></div>
              <h3>{signal.title}</h3>
              <div className="signalValue"><strong>{signal.value}</strong><span>{signal.delta}</span></div>
              <dl>
                <div><dt>{t.fact}</dt><dd>{signal.fact}</dd></div>
                <div className="inference"><dt>{t.inference}</dt><dd>{signal.inference}</dd></div>
              </dl>
              <footer><span>{signal.updated}</span><a href={signal.source} target="_blank" rel="noreferrer">{t.source}</a></footer>
            </article>
          ))}
        </div>
      </section>

      <section className="contentSection connectionSection" aria-labelledby="connections-title">
        <div className="sectionHeader">
          <div><p className="eyebrow">02 · {t.connections}</p><h2 id="connections-title">{t.connections}</h2></div>
          <p className="connectionPrompt">{t.connectionPrompt}</p>
        </div>
        <div className="connectionDiagnosis">
          {([
            [t.possession, brief.performanceConnections.diagnosis.possession],
            [t.circulation, brief.performanceConnections.diagnosis.circulation],
            [t.meaningfulConnection, brief.performanceConnections.diagnosis.meaningfulConnection],
            [t.outcomeConversion, brief.performanceConnections.diagnosis.outcomeConversion],
          ] as const).map(([label, state]) => (
            <div key={label}>
              <span>{label}</span>
              <strong className={state.toLowerCase()}>{connectionStateLabel(state, locale)}</strong>
            </div>
          ))}
        </div>
        <div className="valueConversionHeader">
          <p className="eyebrow">{t.valueConversion}</p>
          <strong>Revenue <span>→</span> EBITDA <span>→</span> Operating Cash Flow</strong>
        </div>
        <div className="valueConversionChain">
          {([
            [t.revenueConversion, brief.valueConversionAnalysis.revenueConversion],
            [t.ebitdaConversion, brief.valueConversionAnalysis.ebitdaConversion],
            [t.cashConversion, brief.valueConversionAnalysis.cashConversion],
          ] as const).map(([label, stage]) => (
            <article key={label}>
              <div><h3>{label}</h3><strong className={stage.state.toLowerCase()}>{connectionStateLabel(stage.state, locale)}</strong></div>
              <p>{stage.assessment}</p>
            </article>
          ))}
        </div>
        <div className="conversionDetailGrid">
          <article>
            <h3>{t.bottlenecks}</h3>
            <ul>{brief.valueConversionAnalysis.bottlenecks.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <h3>{t.conversionActions}</h3>
            <ul>{brief.valueConversionAnalysis.recommendedActions.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
        <div className="connectionGrid">
          <article><h3>{t.visiblePerformance}</h3><p>{brief.performanceConnections.visiblePerformance}</p></article>
          <article><h3>{t.economicOutcome}</h3><p>{brief.performanceConnections.economicOutcome}</p></article>
          <article><h3>{t.managementDecision}</h3><p>{brief.performanceConnections.managementDecision}</p></article>
          <article><h3>{t.brokenConnections}</h3><ul>{brief.performanceConnections.brokenConnections.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><h3>{t.productiveConnections}</h3><ul>{brief.performanceConnections.productiveConnections.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><h3>{t.trackedIndicators}</h3><ul>{brief.performanceConnections.indicators.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
      </section>

      <section className="contentSection briefSection" aria-labelledby="brief-title">
        <div className="sectionHeader compact"><div><p className="eyebrow">03 · {t.executiveBrief}</p><h2 id="brief-title">{t.executiveBrief}</h2></div></div>
        <div className="summaryBlock"><p>{brief.executiveSummary}</p></div>
        <div className="briefColumns">
          <article>
            <h3>{t.risks}</h3>
            <ol>{brief.highestPriorityRisks.map((risk, index) => <li key={risk.description}><span>0{index + 1}</span><div><strong>{risk.description}</strong><p>{risk.businessImpact}</p><small>{risk.urgency}</small></div></li>)}</ol>
          </article>
          <article>
            <h3>{t.opportunities}</h3>
            <ol>{brief.opportunities.map((item, index) => <li key={item.description}><span>0{index + 1}</span><div><strong>{item.description}</strong><p>{item.valueCreated}</p><small>{item.action}</small></div></li>)}</ol>
          </article>
        </div>
      </section>

      <section className="contentSection hazardSection" aria-labelledby="hazards-title">
        <div className="sectionHeader">
          <div><p className="eyebrow">04 · {t.hazards}</p><h2 id="hazards-title">{t.hazards}</h2></div>
          <p className="hazardPrompt">{t.hazardPrompt}</p>
        </div>
        <div className="hazardGrid">
          {([
            [t.hiddenAssumptions, brief.criticalHazards.hiddenAssumptions],
            [t.underestimatedRisks, brief.criticalHazards.underestimatedRisks],
            [t.missingControls, brief.criticalHazards.missingControls],
            [t.strategyInvalidators, brief.criticalHazards.strategyInvalidators],
          ] as const).map(([label, items]) => (
            <article key={label}>
              <h3>{label}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="contentSection actionSection" aria-labelledby="actions-title">
        <div className="sectionHeader compact"><div><p className="eyebrow">05 · {t.actions}</p><h2 id="actions-title">{t.actions}</h2></div></div>
        <div className="actionGrid">
          {([[t.today, brief.immediateActions.today], [t.week, brief.immediateActions.thisWeek], [t.month, brief.immediateActions.thisMonth]] as const).map(([label, items]) => (
            <article key={label}><h3>{label}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>
          ))}
        </div>
      </section>

      <section className="lowerGrid">
        <article className="watchlistPanel">
          <p className="eyebrow">06 · {t.watchlist}</p><h2>{t.watchlist}</h2>
          <ul>{brief.tomorrowWatchlist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
        </article>
        <article className="journalPanel" id="journal">
          <p className="eyebrow">07 · {t.journal}</p><h2>{t.journal}</h2><p>{t.journalIntro}</p>
          <div className="journalList">
            {journal.length === 0 ? <div className="emptyState">{t.noJournal}</div> : journal.map((entry) => (
              <div className="journalEntry" key={entry.id}><div><span className={`journalStatus ${entry.status.toLowerCase()}`}>{entry.status}</span><strong>{entry.decision}</strong></div><dl><div><dt>{t.owner}</dt><dd>{entry.owner}</dd></div><div><dt>{t.review}</dt><dd>{entry.reviewDate}</dd></div></dl></div>
            ))}
          </div>
        </article>
      </section>

      <section className="sourceSection" id="sources">
        <div><p className="eyebrow">08 · {t.sources}</p><h2>{t.sources}</h2><p>{t.sourceIntro}</p></div>
        <div className="sourceLinks">
          <a href="/sample-data/management-report.json" target="_blank" rel="noreferrer"><strong>Monthly management report</strong><span>Actual · Budget · Prior period</span></a>
          <a href="/sample-data/management-report.json#methodology" target="_blank" rel="noreferrer"><strong>Interpretation methodology</strong><span>Facts · calculations · assumptions</span></a>
        </div>
      </section>

      <footer className="siteFooter"><span>CFO Signal Desk</span><span>From signal to judgment.</span></footer>

      {profileOpen && (
        <div className="modalBackdrop" role="presentation" onMouseDown={() => setProfileOpen(false)}>
          <section className="profileModal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modalHeader"><div><p className="eyebrow">Business context</p><h2 id="profile-title">{t.profile}</h2></div><button className="iconButton" onClick={() => setProfileOpen(false)} aria-label={t.close}>×</button></div>
            <form onSubmit={saveProfile}>
              <label>Company name<input value={draftProfile.name} onChange={(event) => setDraftProfile({ ...draftProfile, name: event.target.value })} required /></label>
              <div className="formRow"><label>Industry<input value={draftProfile.industry} onChange={(event) => setDraftProfile({ ...draftProfile, industry: event.target.value })} required /></label><label>Company size<input value={draftProfile.size} onChange={(event) => setDraftProfile({ ...draftProfile, size: event.target.value })} required /></label></div>
              <label>Geographic exposure<input value={draftProfile.geography} onChange={(event) => setDraftProfile({ ...draftProfile, geography: event.target.value })} /></label>
              <label>FX exposure<textarea value={draftProfile.fxExposure} onChange={(event) => setDraftProfile({ ...draftProfile, fxExposure: event.target.value })} rows={2} /></label>
              <fieldset aria-describedby="priority-guidance">
                <legend>{t.priorities}</legend>
                <p className="fieldHint" id="priority-guidance">{t.priorityGuidance}</p>
                <div className="priorityPicker">
                  {priorities.map((priority) => {
                    const selected = draftProfile.priorities.includes(priority);
                    const disabled = !selected && draftProfile.priorities.length >= MAX_ACTIVE_PRIORITIES;
                    return (
                      <label key={priority} className={`${selected ? "selected" : ""} ${disabled ? "disabled" : ""}`.trim()}>
                        <input type="checkbox" checked={selected} disabled={disabled} onChange={() => togglePriority(priority)} />
                        {priority}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <button className="primaryButton" type="submit">{t.save}</button>
            </form>
          </section>
        </div>
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
