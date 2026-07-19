import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the CFO Signal Desk MVP", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CFO Signal Desk<\/title>/i);
  assert.match(html, /AI Management Reporting OS/);
  assert.match(html, /From Signal to Decision/);
  assert.match(html, /Turn company reports and KPIs into management decisions/);
  assert.match(html, /EN/);
  assert.match(html, /ES/);
  assert.match(html, /Upload company report/);
  assert.match(html, /Try sample report/);
  assert.match(html, /Company priorities/);
  assert.match(html, /KPI \/ Report Insight Engine/);
  assert.match(html, /Dashboards show performance/);
  assert.match(html, /Revenue/);
  assert.match(html, /Average order value/);
  assert.match(html, /Gross margin/);
  assert.match(html, /Observation/);
  assert.match(html, /Business impact/);
  assert.match(html, /Likely driver/);
  assert.match(html, /Recommended action/);
  assert.match(html, /Source evidence/);
  assert.match(html, /Calculation/);
  assert.match(html, /Verified finding/);
  assert.match(html, /Calculated result/);
  assert.match(html, /Hypothesis/);
  assert.match(html, /Missing data/);
  assert.match(html, /Confidence/);
  assert.match(html, /Recommended Decisions/);
  assert.match(html, /Questions Management Should Ask/);
  assert.match(html, /KPI Watchlist/);
  assert.match(html, /Observe/);
  assert.match(html, /Interpret/);
  assert.match(html, /Decide/);
  assert.match(html, /Act/);
  assert.match(html, /Learn/);
  assert.match(html, /Founder Advantage/);
  assert.match(html, /Sample report ready/);
  assert.match(html, /Executive decision/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("keeps Build Week submission assets documented", async () => {
  const [
    readme,
    constitution,
    personalization,
    demoScript,
    checklist,
    page,
    layout,
    packageJson,
  ] =
    await Promise.all([
      readFile(new URL("README.md", templateRoot), "utf8"),
      readFile(new URL("docs/product-constitution.md", templateRoot), "utf8"),
      readFile(
        new URL("docs/executive-data-input-personalization.md", templateRoot),
        "utf8",
      ),
      readFile(new URL("docs/demo-script.md", templateRoot), "utf8"),
      readFile(new URL("docs/submission-checklist.md", templateRoot), "utf8"),
      readFile(new URL("app/page.tsx", templateRoot), "utf8"),
      readFile(new URL("app/layout.tsx", templateRoot), "utf8"),
      readFile(new URL("package.json", templateRoot), "utf8"),
    ]);

  assert.match(readme, /Architecture Overview/);
  assert.match(readme, /OPENAI_API_KEY/);
  assert.match(readme, /Does this reduce executive uncertainty/);
  assert.match(readme, /English \/ Spanish language switch/);
  assert.match(readme, /executive-data-input-personalization/);
  assert.match(constitution, /Turn Market Noise into Executive Clarity/);
  assert.match(constitution, /From Signal to Decision/);
  assert.match(personalization, /Executive Onboarding/);
  assert.match(personalization, /Company Context/);
  assert.match(personalization, /Document Center/);
  assert.match(personalization, /Executive Memory/);
  assert.match(personalization, /Goals Engine/);
  assert.match(personalization, /Decision History/);
  assert.match(personalization, /Calendar Intelligence/);
  assert.match(personalization, /Relationship Intelligence/);
  assert.match(personalization, /Executive Memory Graph/);
  assert.match(personalization, /Recommendation Engine Architecture/);
  assert.match(demoScript, /company reports and KPIs/);
  assert.match(checklist, /OpenAI Build Week/);
  assert.match(page, /Upload company report/);
  assert.match(page, /Subir reporte de empresa/);
  assert.match(page, /Decisión ejecutiva/);
  assert.match(page, /Resumen ejecutivo/);
  assert.match(page, /Preguntas que management debería hacer/);
  assert.match(page, /Ciclo AI OS/);
  assert.match(page, /KPI \/ Report Insight Engine/);
  assert.match(page, /sourceTypeClass/);
  assert.match(page, /average order value/i);
  assert.match(layout, /CFO Signal Desk/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
