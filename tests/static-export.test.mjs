import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const exportUrl = new URL("../dist/client/index.html", import.meta.url);

test("exports Gang Yang's academic portfolio for GitHub Pages", async () => {
  const html = await readFile(exportUrl, "utf8");

  assert.match(html, /<title>Gang Yang — Embodied AI Researcher<\/title>/i);
  assert.match(html, /Building intelligent/);
  assert.match(html, /class="hero-accent-agents">agents/);
  assert.match(html, /Publications/);
  assert.match(html, /Research Projects/);
  assert.match(html, /Professional Experience/);
  assert.match(html, /assets\/images\/profile-photo\.jpg/);
  assert.match(html, /assets\/images\/signature\.jpg/);
  assert.match(html, /assets\/images\/walkerbench-figure\.png/);
  assert.match(html, /assets\/images\/forest-remix-figure\.png/);
  assert.match(html, /href="https:\/\/github\.com\/lalayang123456-ctrl\/WalkerBench"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=GBDFQY9WLPo"/);
  assert.doesNotMatch(html, /href="[^"]*\.pdf(?:[?#][^"]*)?"/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
