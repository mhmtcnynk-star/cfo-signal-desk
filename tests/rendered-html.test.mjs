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
  assert.match(html, /Personal Executive Decision Intelligence/);
  assert.match(html, /Daily Decision Brief/);
  assert.match(html, /Best Decision Today/);
  assert.match(html, /Privacy and Control/);
  assert.match(html, /Personal Intelligence Model/);
  assert.match(html, /Decision Graph/);
  assert.match(html, /LinkedIn Intelligence/);
  assert.match(html, /Strategic Alignment Check/);
  assert.match(html, /Three Most Important Actions Today/);
  assert.match(html, /People to Contact/);
  assert.match(html, /Items That Can Wait/);
  assert.match(html, /Approve/);
  assert.match(html, /Incorrect/);
  assert.match(html, /Delete/);
  assert.match(html, /Enabled/);
  assert.match(html, /Confidence/);
  assert.match(html, /Opportunities/);
  assert.match(html, /Today/);
  assert.match(html, /Tomorrow/);
  assert.match(html, /Watchlist/);
  assert.match(html, /Build a credible 30-90 day paid pipeline/);
  assert.match(html, /FX volatility increases relevance/);
  assert.match(html, /Demo intelligence ready/);
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
  assert.match(demoScript, /best decision for me today/);
  assert.match(checklist, /OpenAI Build Week/);
  assert.match(page, /Personal Intelligence Model/);
  assert.match(page, /Regenerate Daily Decision Brief/);
  assert.match(page, /possibleContradiction/);
  assert.match(page, /LinkedIn Intelligence/);
  assert.match(layout, /CFO Signal Desk/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
