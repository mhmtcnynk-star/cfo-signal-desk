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
  assert.match(html, /Meaning between information and action/);
  assert.match(html, /perspective, judgment, and direction/);
  assert.match(html, /EN/);
  assert.match(html, /ES/);
  assert.match(html, /Upload company report/);
  assert.match(html, /Try sample report/);
  assert.match(html, /Company priorities/);
  assert.match(html, /Report Interpretation/);
  assert.match(html, /Meaning still has to be created/);
  assert.match(html, /Revenue/);
  assert.match(html, /Average order value/);
  assert.match(html, /Gross margin/);
  assert.match(html, /What changed/);
  assert.match(html, /What it changes/);
  assert.match(html, /Likely driver/);
  assert.match(html, /Suggested direction/);
  assert.match(html, /Source evidence/);
  assert.match(html, /Calculation/);
  assert.match(html, /Verified finding/);
  assert.match(html, /Calculated result/);
  assert.match(html, /Hypothesis/);
  assert.match(html, /Missing data/);
  assert.match(html, /Confidence/);
  assert.match(html, /Direction/);
  assert.match(html, /Questions Management Should Ask/);
  assert.match(html, /Tomorrow&#x27;s Attention/);
  assert.match(html, /Observe/);
  assert.match(html, /Interpret/);
  assert.match(html, /Judge/);
  assert.match(html, /Act/);
  assert.match(html, /Learn/);
  assert.match(html, /Human Advantage/);
  assert.match(html, /Sample report ready/);
  assert.match(html, /Executive judgment/);
  assert.match(html, /Epistemic status/);
  assert.match(html, /Verified fact/);
  assert.match(html, /Model inference/);
  assert.match(html, /Insufficient data/);
  assert.match(html, /Why am I seeing this/);
  assert.match(html, /What We Still Don&#x27;t Know/);
  assert.match(html, /Confidence is not readiness/);
  assert.match(html, /Decision readiness/);
  assert.match(html, /What Would Change This Assessment/);
  assert.match(html, /Challenge assessment/);
  assert.match(html, /Decision Journal/);
  assert.match(html, /Trust &amp; Limitations/);
  assert.match(html, /Separate confidence from permission to act/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(html, /Definitely|Without a doubt|I strongly believe/);
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
  assert.match(readme, /Does this help leaders create better meaning before acting/);
  assert.match(readme, /English \/ Spanish language switch/);
  assert.match(readme, /executive-data-input-personalization/);
  assert.match(constitution, /Human Systems Constitution v2.0/);
  assert.match(constitution, /From Signal to Meaning/);
  assert.match(constitution, /Peak Moments Matter/);
  assert.match(constitution, /Beauty Is a Strategic Asset/);
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
  assert.match(demoScript, /perspective, judgment, and direction/);
  assert.match(checklist, /OpenAI Build Week/);
  assert.match(page, /Upload company report/);
  assert.match(page, /Subir reporte de empresa/);
  assert.match(page, /Juicio ejecutivo/);
  assert.match(page, /Resumen ejecutivo/);
  assert.match(page, /Preguntas que management debería hacer/);
  assert.match(page, /Ciclo de sentido/);
  assert.match(page, /Report Interpretation/);
  assert.match(page, /type EpistemicStatus/);
  assert.match(page, /type DecisionReadiness/);
  assert.match(page, /type ChallengeCase/);
  assert.match(page, /type AssessmentRevision/);
  assert.match(page, /type DecisionJournalEntry/);
  assert.match(page, /createRevision/);
  assert.match(page, /Trust & Limitations/);
  assert.match(page, /sourceTypeClass/);
  assert.match(page, /average order value/i);
  assert.match(layout, /CFO Signal Desk/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
