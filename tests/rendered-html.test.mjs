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
  assert.match(dashboard, /Buenos días/);
  assert.match(sample, /gross_margin/);
  assert.match(layout, /private morning finance brief/);
});
