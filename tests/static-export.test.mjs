import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const exportUrl = new URL("../dist/client/index.html", import.meta.url);

test("exports Gang Yang's academic portfolio for GitHub Pages", async () => {
  const html = await readFile(exportUrl, "utf8");

  assert.match(html, /<title>Gang Yang — Embodied AI Researcher<\/title>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/lalayang123456-ctrl\.github\.io\/"/);
  assert.match(html, /Building intelligent/);
  assert.match(html, /class="hero-accent-agents">agents/);
  const introHtml = html.match(/<div class="hero-intro"><p>(.*?)<\/p>/)?.[1];
  assert.match(introHtml, /href="https:\/\/arc\.nus\.edu\.sg\/"[^>]*>Advanced Robotics Centre<\/a>/);
  const intro = introHtml.replace(/<[^>]*>/g, "");
  assert.match(intro, /I work at MagicLab under the supervision of Prof\. Jiafei Duan and at the Advanced Robotics Centre under the supervision of Prof\. Teo Chee Leong and collaborate with Dr\. Shuo Sun\.$/);
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
  assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/1-VkwN83FM33FkVEFDZYl_CUZkbqBcApU\/view\?usp=sharing"/);
  assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/1Dygww9mM7rm8daEqCgXXLXIrhRxDZFSh\/view"/);
  assert.match(html, /href="https:\/\/media\.eventhosts\.cc\/Conferences\/ECCV2026\/pdfs\/11135\.pdf"/);
  assert.match(html, /href="https:\/\/github\.com\/lalayang123456-ctrl\/WalkerBench"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=GBDFQY9WLPo"/);
  assert.doesNotMatch(html, />POSTER</);
  assert.doesNotMatch(html, /href="(?!https?:\/\/)[^"]*\.pdf(?:[?#][^"]*)?"/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);

  const publicationsStart = html.indexOf('<section class="content-section" id="publications">');
  const educationStart = html.indexOf('<section class="content-section" id="education">');
  const publicationsHtml = html.slice(publicationsStart, educationStart);
  assert.ok(publicationsHtml.indexOf("CityLoop: Sandbox") < publicationsHtml.indexOf("Forest Remix:"));

  const thirdPublication = publicationsHtml.split('<article class="publication">')[3];
  assert.match(thirdPublication, /How Much Has Embodied AI Progressed\?/);
  assert.match(thirdPublication, /src="\/assets\/images\/embodied-ai-progress-fig1\.webp"/);
  assert.match(thirdPublication, /<span class="resource-label">PAPER<\/span>/);
  assert.match(thirdPublication, /href="https:\/\/lalayang123456-ctrl\.github\.io\/roboelo-web\/"[^>]*>WEBSITE\b/);
  assert.match(thirdPublication, /First Author/);

  const projectsStart = html.indexOf('<section class="content-section" id="projects">');
  const firstProject = html.slice(projectsStart).split('class="project-card ')[1];
  assert.match(firstProject, /Measuring Progress in Embodied AI/);
  assert.match(firstProject, /Advanced Robotics Centre, NUS/);
  assert.match(firstProject, /First Author/);
  assert.doesNotMatch((thirdPublication + firstProject).replace(/<[^>]*>/g, ""), /roboelo/i);

  const paper = await readFile(new URL("../dist/client/embodied-ai-progress-preprint.pdf", import.meta.url));
  const figure = await readFile(new URL("../dist/client/assets/images/embodied-ai-progress-fig1.webp", import.meta.url));
  assert.equal(paper.subarray(0, 5).toString(), "%PDF-");
  assert.equal(figure.subarray(8, 12).toString(), "WEBP");
});
