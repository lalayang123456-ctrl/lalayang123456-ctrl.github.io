import assert from "node:assert/strict";
import test from "node:test";

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

test("server-renders Gang Yang's academic portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Gang Yang — Embodied AI Researcher<\/title>/i);
  assert.match(html, /Building intelligent/);
  assert.match(html, /class="hero-accent-agents">agents/);
  assert.match(html, /Publications/);
  assert.match(html, /Research Projects/);
  assert.match(html, /Professional Experience/);
  assert.match(html, /Humanoid Robot Navigation in Open Environments/);
  assert.match(html, /24\.9% to 59\.0%/);
  assert.match(html, /assets\/images\/profile-photo\.jpg/);
  assert.match(html, /assets\/images\/signature\.jpg/);
  assert.match(html, /assets\/images\/walkerbench-figure\.png/);
  assert.match(html, /assets\/images\/forest-remix-figure\.png/);
  assert.match(html, /CityLoop: Sandbox for Tool-Grounded Urban Navigation/);
  assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/1ZlrYBtrM1tLMUCA3aRpkSiSynUUzF3f8\/view"/);
  assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/1Dygww9mM7rm8daEqCgXXLXIrhRxDZFSh\/view"/);
  assert.match(html, /href="https:\/\/github\.com\/lalayang123456-ctrl\/WalkerBench"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=GBDFQY9WLPo"/);
  assert.doesNotMatch(html, />POSTER</);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
