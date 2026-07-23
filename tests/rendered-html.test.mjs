import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(authenticated = true) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const headers = new Headers({ accept: "text/html" });
  if (authenticated) {
    headers.set("oai-authenticated-user-email", "cfo@example.com");
    headers.set("oai-authenticated-user-full-name", "Alex Morgan");
    headers.set(
      "oai-authenticated-user-full-name-encoding",
      "percent-encoded-utf-8",
    );
  }

  return worker.fetch(
    new Request("http://localhost/", { headers }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the authenticated CFO morning workflow", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>CFO Signal Desk<\/title>/i);
  assert.match(html, /Good morning/);
  assert.match(html, /Daily Executive Brief/);
  assert.match(html, /Company profile/);
  assert.match(html, /Signals that matter/);
  assert.match(html, /Fact/);
  assert.match(html, /Interpretation/);
  assert.match(html, /Recommended decision/);
  assert.match(html, /Confidence/);
  assert.match(html, /Permission to act/);
  assert.match(html, /Execution focus/);
  assert.match(html, /active strategic slots/);
  assert.match(html, /Performance connections/);
  assert.match(html, /Value Conversion Analysis/);
  assert.match(html, /Revenue Conversion/);
  assert.match(html, /EBITDA Conversion/);
  assert.match(html, /Cash Conversion/);
  assert.match(html, /Value conversion test/);
  assert.match(html, /Real economic outcome/);
  assert.match(html, /Outcome-producing connections/);
  assert.match(html, /Risk and trade-off/);
  assert.match(html, /Critical hazards/);
  assert.match(html, /What critical hazard has not yet been identified/);
  assert.match(html, /Resilience safeguard/);
  assert.match(html, /Decision journal/);
  assert.match(html, /Source links/);
  assert.match(html, /Demo data/);
  assert.match(html, /EN/);
  assert.match(html, /ES/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("shows a private sign-in surface to anonymous visitors", async () => {
  const response = await render(false);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sign in with ChatGPT/);
  assert.match(html, /visible only after sign-in/);
  assert.doesNotMatch(html, /Northstar Manufacturing/);
});

test("returns structured critical hazards in deterministic demo mode", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `api-${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/brief", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "oai-authenticated-user-email": "cfo@example.com",
        "oai-authenticated-user-full-name": "Alex Morgan",
      },
      body: JSON.stringify({ priorities: ["Margin protection"] }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.mode, "demo");
  assert.ok(payload.brief.criticalHazards.hiddenAssumptions.length > 0);
  assert.ok(payload.brief.criticalHazards.underestimatedRisks.length > 0);
  assert.ok(payload.brief.criticalHazards.missingControls.length > 0);
  assert.ok(payload.brief.criticalHazards.strategyInvalidators.length > 0);
  assert.equal(payload.brief.performanceConnections.diagnosis.outcomeConversion, "Broken");
  assert.ok(payload.brief.performanceConnections.brokenConnections.length > 0);
  assert.equal(payload.brief.valueConversionAnalysis.revenueConversion.state, "Broken");
  assert.equal(payload.brief.valueConversionAnalysis.ebitdaConversion.state, "Broken");
  assert.equal(payload.brief.valueConversionAnalysis.cashConversion.state, "Broken");
  assert.ok(payload.brief.valueConversionAnalysis.bottlenecks.length > 0);
  assert.ok(
    payload.brief.recommendedDecisions.every(
      (decision) =>
        typeof decision.resilienceSafeguard === "string" &&
        typeof decision.conversionTest === "string" &&
        typeof decision.tradeoff === "string" &&
        decision.businessConnections.length > 0,
    ),
  );
});

test("keeps the production and demo contracts explicit", async () => {
  const [readme, page, dashboard, auth, route, sample, layout] = await Promise.all([
    readFile(new URL("README.md", templateRoot), "utf8"),
    readFile(new URL("app/page.tsx", templateRoot), "utf8"),
    readFile(new URL("app/dashboard-client.tsx", templateRoot), "utf8"),
    readFile(new URL("app/chatgpt-auth.ts", templateRoot), "utf8"),
    readFile(new URL("app/api/brief/route.ts", templateRoot), "utf8"),
    readFile(new URL("public/sample-data/management-report.json", templateRoot), "utf8"),
    readFile(new URL("app/layout.tsx", templateRoot), "utf8"),
  ]);

  assert.match(readme, /Architecture Overview/);
  assert.match(readme, /OPENAI_API_KEY/);
  assert.match(page, /getChatGPTUser/);
  assert.match(page, /chatGPTSignInPath/);
  assert.match(auth, /oai-authenticated-user-email/);
  assert.match(route, /Authentication required/);
  assert.match(route, /mode: "demo"/);
  assert.match(dashboard, /cfo-signal-profile/);
  assert.match(dashboard, /cfo-signal-journal/);
  assert.match(dashboard, /Proceed with safeguards/);
  assert.match(dashboard, /MAX_ACTIVE_PRIORITIES = 3/);
  assert.match(route, /maxItems: 3/);
  assert.match(route, /fourth initiative must identify which active priority it replaces/i);
  assert.match(route, /What critical hazard has not yet been identified/);
  assert.match(route, /resilienceSafeguard/);
  assert.match(route, /performanceConnections/);
  assert.match(route, /valueConversionAnalysis/);
  assert.match(route, /Revenue → EBITDA → Operating Cash Flow/);
  assert.match(route, /Quality of Conversion/);
  assert.match(route, /connection-to-outcome system/);
  assert.match(dashboard, /Peligros críticos/);
  assert.match(dashboard, /Conexiones de desempeño/);
  assert.match(dashboard, /Análisis de Conversión de Valor/);
  assert.match(dashboard, /Buenos días/);
  assert.match(sample, /gross_margin/);
  assert.match(sample, /operating_cash_flow/);
  assert.match(layout, /private morning finance brief/);
});
