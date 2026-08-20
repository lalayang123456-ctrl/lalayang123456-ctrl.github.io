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
  assert.match(html, /Humanoid Robot Navigation in Open Environments/);
  assert.match(html, /improving navigation decision accuracy under medium noise from 24\.9% to 59\.0%/);
  assert.match(html, /Completed long-distance zero-shot navigation in real urban environments/);
  assert.match(html, /Neural-Network-Enhanced Model Predictive Control/);
  assert.match(html, /current RMSE of approximately 0\.30 A/);
  assert.match(html, /settling time of approximately 0\.41 s/);
  assert.match(html, /Global visitors/);
  assert.doesNotMatch(html, /Ready for launch/);
  assert.match(html, /assets\/images\/profile-photo\.jpg/);
  assert.match(html, /assets\/images\/signature\.jpg/);
  assert.match(html, /assets\/images\/walkerbench-figure\.png/);
  assert.match(html, /assets\/images\/forest-remix-figure\.png/);
  assert.match(html, /CityLoop: Sandbox for Tool-Grounded Urban Navigation/);
  assert.match(html, /UNDER REVIEW/);
  assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/1ZlrYBtrM1tLMUCA3aRpkSiSynUUzF3f8\/view"/);
  assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/1Dygww9mM7rm8daEqCgXXLXIrhRxDZFSh\/view"/);
  assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/112mWVeacZQwwdJXDcHQVNusAFwlCSFxy\/view\?usp=drive_link"/);
  assert.match(html, /href="https:\/\/github\.com\/lalayang123456-ctrl\/WalkerBench"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=GBDFQY9WLPo"/);
  assert.doesNotMatch(html, />POSTER</);
  assert.doesNotMatch(html, /href="[^"]*\.pdf(?:[?#][^"]*)?"/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);

  const publicationsStart = html.indexOf('<section class="content-section" id="publications">');
  const educationStart = html.indexOf('<section class="content-section" id="education">');
  const publicationsHtml = html.slice(publicationsStart, educationStart);
  assert.ok(publicationsHtml.indexOf("CityLoop: Sandbox") < publicationsHtml.indexOf("Forest Remix:"));
});
