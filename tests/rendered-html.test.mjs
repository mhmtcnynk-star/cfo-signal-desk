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
  assert.match(html, /Executive Decision Intelligence/);
  assert.match(html, /From Signal to Decision/);
  assert.match(html, /Next Decision/);
  assert.match(html, /CEO-ready decision summary/);
  assert.match(html, /Business Priorities/);
  assert.match(html, /Business Impact/);
  assert.match(html, /Confidence/);
  assert.match(html, /Highest Priority Risks/);
  assert.match(html, /Opportunities/);
  assert.match(html, /Recommended Decisions/);
  assert.match(html, /Management decisions, not observations/);
  assert.match(html, /Today/);
  assert.match(html, /This Week/);
  assert.match(html, /This Month/);
  assert.match(html, /Tomorrow/);
  assert.match(html, /Watchlist/);
  assert.match(html, /USDARS parallel rate pressure/);
  assert.match(html, /Decision Framework/);
  assert.match(html, /Financial consequence/);
  assert.match(html, /Demo decision engine ready/);
  assert.match(html, /Executive decision/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("keeps Build Week submission assets documented", async () => {
  const [readme, constitution, demoScript, checklist, page, layout, packageJson] =
    await Promise.all([
      readFile(new URL("README.md", templateRoot), "utf8"),
      readFile(new URL("docs/product-constitution.md", templateRoot), "utf8"),
      readFile(new URL("docs/demo-script.md", templateRoot), "utf8"),
      readFile(new URL("docs/submission-checklist.md", templateRoot), "utf8"),
      readFile(new URL("app/page.tsx", templateRoot), "utf8"),
      readFile(new URL("app/layout.tsx", templateRoot), "utf8"),
      readFile(new URL("package.json", templateRoot), "utf8"),
    ]);

  assert.match(readme, /Architecture Overview/);
  assert.match(readme, /OPENAI_API_KEY/);
  assert.match(readme, /Does this reduce executive uncertainty/);
  assert.match(constitution, /Turn Market Noise into Executive Clarity/);
  assert.match(constitution, /From Signal to Decision/);
  assert.match(demoScript, /What should I do next, and why/);
  assert.match(checklist, /OpenAI Build Week/);
  assert.match(page, /Generate Executive Brief/);
  assert.match(page, /businessRelevance/);
  assert.match(page, /recommendedDecisions/);
  assert.match(layout, /CFO Signal Desk/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
