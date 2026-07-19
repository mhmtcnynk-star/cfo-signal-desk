"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Locale = "en" | "es";
type Severity = "High" | "Medium" | "Low";
type PriorityLevel = "Executive decision" | "Act today" | "Monitor";
type FindingType = "Verified finding" | "Calculated result" | "Hypothesis" | "Missing data";

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
};

type Decision = {
  recommendation: string;
  why: string;
  riskOfInaction: string;
  owner: string;
  kpi: string;
  priority: PriorityLevel;
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
  kpiRows: KpiRow[];
  insights: Insight[];
  decisions: Decision[];
  graphLinks: GraphLink[];
};

const copies: Record<Locale, Copy> = {
  en: {
    localeName: "English",
    shortLocale: "EN",
    otherLocale: "ES",
    heroEyebrow: "AI Management Reporting OS · First module",
    heroText:
      "From Signal to Decision. Turn company reports and KPIs into management decisions. Upload a report or use sample company data; the engine identifies performance drivers, risks, root-cause hypotheses and recommended management actions.",
    executiveDecision: "Executive Decision",
    executiveDecisionTitle: "Run a margin bridge before revising the revenue forecast.",
    executiveDecisionBody:
      "Revenue is below target, but the real issue is lower average order value combined with gross margin erosion. Management needs driver clarity before changing the commercial plan.",
    sampleReady: "Sample report ready",
    reportStaged: (fileName) => `Report staged: ${fileName}`,
    reportAnalyzed: (fileName) => `Analyzed ${fileName} with demo KPI engine`,
    sampleAnalyzed: "Sample management report analyzed",
    scoreBusinessImpact: "Business impact",
    scoreUrgency: "Urgency",
    scoreConfidence: "Confidence",
    inputEyebrow: "Input",
    inputTitle: "Upload business data. Get decision-ready insights.",
    uploadReport: "Upload company report",
    trySample: "Try sample report",
    inputNote:
      "MVP demo uses a sample management report. Uploaded files are staged in the UI to show the intended workflow; live parsing is post-MVP.",
    prioritiesEyebrow: "Company priorities",
    priorities: [
      "Revenue growth",
      "Margin protection",
      "Cash preservation",
      "Cost control",
      "Customer retention",
      "Operational efficiency",
    ],
    engineEyebrow: "KPI / Report Insight Engine",
    engineTitle: "Dashboards show performance. We explain what it means.",
    metrics: {
      kpis: "KPIs",
      findings: "Findings",
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
      observation: "Observation",
      businessImpact: "Business impact",
      likelyDriver: "Likely driver",
      recommendedAction: "Recommended action",
      calculation: "Calculation",
      evidence: "Source evidence",
    },
    actionPanel: {
      executiveSummary: "Executive Summary",
      managementQuestions: "Questions Management Should Ask",
      kpiWatchlist: "KPI Watchlist",
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
    topInsightsEyebrow: "Top Insights",
    topInsightsTitle: "Verified insight, calculation, hypothesis, or missing data",
    decisionsEyebrow: "Recommended Decisions",
    decisionsTitle: "Insight must end in management action",
    decisionLabels: {
      owner: "Owner",
      kpi: "KPI",
      risk: "Risk of inaction",
    },
    aiOsEyebrow: "AI OS Loop",
    aiOsTitle: "Observe -> Interpret -> Decide -> Act -> Learn",
    founderEyebrow: "Founder Advantage",
    founderTitle: "Finance-domain AI systems architect",
    founderBody:
      "The defensible insight is not only the model. It is the finance judgment that decides which variance matters, which data needs verification, what should reach management, and which action changes performance.",
    alignment: [
      "Finance experience",
      "Management reporting",
      "Decision workflow design",
      "Build Week readiness",
    ],
    severity: {
      High: "High",
      Medium: "Medium",
      Low: "Low",
    },
    priority: {
      "Executive decision": "Executive decision",
      "Act today": "Act today",
      Monitor: "Monitor",
    },
    findingType: {
      "Verified finding": "Verified finding",
      "Calculated result": "Calculated result",
      Hypothesis: "Hypothesis",
      "Missing data": "Missing data",
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
        calculation:
          "Revenue variance -8.0%; AOV variance -11.0%; volume variance not material.",
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
      },
    ],
    decisions: [
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
        body: "Calculate changes, identify anomalies, and classify evidence quality.",
      },
      {
        from: "Root-cause hypotheses",
        to: "Decide",
        body: "Generate management options and explain confidence.",
      },
      {
        from: "Owners, dates, follow-up KPIs",
        to: "Act",
        body: "Turn insights into accountable actions.",
      },
      {
        from: "Prior decisions and outcomes",
        to: "Learn",
        body: "Build company performance memory over time.",
      },
    ],
  },
  es: {
    localeName: "Español",
    shortLocale: "ES",
    otherLocale: "EN",
    heroEyebrow: "AI Management Reporting OS · Primer módulo",
    heroText:
      "De la señal a la decisión. Convierte reportes de empresa y KPIs en decisiones de management. Sube un reporte o usa datos de ejemplo; el motor identifica drivers de performance, riesgos, hipótesis de causa raíz y acciones recomendadas.",
    executiveDecision: "Decisión ejecutiva",
    executiveDecisionTitle: "Construir un puente de margen antes de revisar el forecast de ingresos.",
    executiveDecisionBody:
      "Los ingresos están por debajo del objetivo, pero el problema real es la caída del ticket promedio junto con la erosión del margen bruto. Management necesita claridad sobre el driver antes de cambiar el plan comercial.",
    sampleReady: "Reporte de ejemplo listo",
    reportStaged: (fileName) => `Reporte preparado: ${fileName}`,
    reportAnalyzed: (fileName) => `Analizado ${fileName} con el motor KPI demo`,
    sampleAnalyzed: "Reporte de management de ejemplo analizado",
    scoreBusinessImpact: "Impacto de negocio",
    scoreUrgency: "Urgencia",
    scoreConfidence: "Confianza",
    inputEyebrow: "Entrada",
    inputTitle: "Sube datos de negocio. Recibe insights listos para decidir.",
    uploadReport: "Subir reporte de empresa",
    trySample: "Probar reporte de ejemplo",
    inputNote:
      "El MVP usa un reporte de management de ejemplo. Los archivos subidos se preparan en la interfaz para mostrar el flujo previsto; el parsing real queda para post-MVP.",
    prioritiesEyebrow: "Prioridades de la empresa",
    priorities: [
      "Crecimiento de ingresos",
      "Protección de margen",
      "Preservación de caja",
      "Control de costos",
      "Retención de clientes",
      "Eficiencia operativa",
    ],
    engineEyebrow: "Motor de insights KPI / Reporte",
    engineTitle: "Los dashboards muestran performance. Nosotros explicamos qué significa.",
    metrics: {
      kpis: "KPIs",
      findings: "Hallazgos",
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
      observation: "Observación",
      businessImpact: "Impacto de negocio",
      likelyDriver: "Driver probable",
      recommendedAction: "Acción recomendada",
      calculation: "Cálculo",
      evidence: "Evidencia fuente",
    },
    actionPanel: {
      executiveSummary: "Resumen ejecutivo",
      managementQuestions: "Preguntas que management debería hacer",
      kpiWatchlist: "KPIs a monitorear",
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
    topInsightsEyebrow: "Insights principales",
    topInsightsTitle: "Insight verificado, cálculo, hipótesis o dato faltante",
    decisionsEyebrow: "Decisiones recomendadas",
    decisionsTitle: "Todo insight debe terminar en una acción de management",
    decisionLabels: {
      owner: "Responsable",
      kpi: "KPI",
      risk: "Riesgo de no actuar",
    },
    aiOsEyebrow: "Ciclo AI OS",
    aiOsTitle: "Observar -> Interpretar -> Decidir -> Actuar -> Aprender",
    founderEyebrow: "Ventaja del fundador",
    founderTitle: "Arquitecto de sistemas de AI con dominio financiero",
    founderBody:
      "La ventaja defendible no es solo el modelo. Es el criterio financiero que decide qué desvío importa, qué dato necesita verificación, qué debe llegar a management y qué acción cambia la performance.",
    alignment: [
      "Experiencia financiera",
      "Reporting de management",
      "Diseño de flujos de decisión",
      "Preparación Build Week",
    ],
    severity: {
      High: "Alto",
      Medium: "Medio",
      Low: "Bajo",
    },
    priority: {
      "Executive decision": "Decisión ejecutiva",
      "Act today": "Actuar hoy",
      Monitor: "Monitorear",
    },
    findingType: {
      "Verified finding": "Hallazgo verificado",
      "Calculated result": "Resultado calculado",
      Hypothesis: "Hipótesis",
      "Missing data": "Dato faltante",
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
      },
    ],
    decisions: [
      {
        recommendation: "Construir un puente de margen antes de revisar el forecast de ingresos.",
        why: "El gap de ingresos está conectado con ticket promedio y margen bruto, por lo que la empresa necesita claridad sobre drivers antes de una acción comercial amplia.",
        riskOfInaction:
          "Management puede perseguir volumen mientras acepta ingresos de menor calidad y erosión continua de margen.",
        owner: "FP&A + Sales",
        kpi: "Margen bruto",
        priority: "Executive decision",
      },
      {
        recommendation: "Congelar descuentos no estándar hasta revisar rentabilidad por cliente.",
        why: "Los descuentos son un driver plausible tanto de la caída del ticket promedio como de la presión sobre margen.",
        riskOfInaction:
          "La empresa puede normalizar excepciones que convierten recuperación de ingresos en pérdida de EBITDA.",
        owner: "Director Comercial",
        kpi: "Ticket promedio",
        priority: "Act today",
      },
      {
        recommendation: "Actualizar el forecast de caja de 13 semanas con el ciclo de cobranza más largo.",
        why: "El deterioro de cuentas por cobrar puede generar estrés de liquidez aunque el volumen de órdenes parezca estable.",
        riskOfInaction:
          "Las necesidades de financiamiento de corto plazo pueden descubrirse demasiado tarde para una acción disciplinada de tesorería.",
        owner: "Tesorería / Controller",
        kpi: "Ciclo de conversión de caja",
        priority: "Act today",
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
        body: "Calcular cambios, identificar anomalías y clasificar la calidad de evidencia.",
      },
      {
        from: "Hipótesis de causa raíz",
        to: "Decidir",
        body: "Generar opciones de management y explicar confianza.",
      },
      {
        from: "Responsables, fechas, KPIs de seguimiento",
        to: "Actuar",
        body: "Convertir insights en acciones con accountability.",
      },
      {
        from: "Decisiones previas y resultados",
        to: "Aprender",
        body: "Construir memoria de performance de la empresa en el tiempo.",
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

  const activeInsight =
    copy.insights.find((insight) => insight.id === activeInsightId) ?? copy.insights[0];

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

  return (
    <main className="appShell">
      <section className="decisionHero" aria-label="AI management reporting cockpit">
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

      <section className="decisionWorkspace" aria-label="Report insight engine">
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

      <section className="insightLibrary" aria-label="Top management insights">
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

      <section className="graphAndLinkedIn" aria-label="Decisions and AI OS architecture">
        <article className="frameworkPanel">
          <div className="frameworkHeader">
            <div>
              <p className="eyebrow">{copy.decisionsEyebrow}</p>
              <h2>{copy.decisionsTitle}</h2>
            </div>
          </div>
          <div className="decisionList">
            {copy.decisions.map((decision) => (
              <article className="decisionItem" key={decision.recommendation}>
                <div>
                  <strong className={priorityClass(decision.priority)}>
                    {copy.priority[decision.priority]}
                  </strong>
                  <h3>{decision.recommendation}</h3>
                  <p>{decision.why}</p>
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
