import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import worker from "../dist/server/index.js";

const serviceOrigin = "https://gang-yang-visitor-stats.lalayang-123456.chatgpt.site";
const portfolioOrigin = "https://lalayang123456-ctrl.github.io";
const context = { waitUntil() {}, passThroughOnException() {} };

test("the statistics site's homepage permanently redirects to the official portfolio", async () => {
  for (const method of ["GET", "HEAD"]) {
    for (const path of ["/", "/index.html", "/?from=search"]) {
      const response = await worker.fetch(new Request(`${serviceOrigin}${path}`, { method }), {}, context);
      assert.equal(response.status, 301);
      assert.equal(response.headers.get("location"), `${portfolioOrigin}/${new URL(`${serviceOrigin}${path}`).search}`);
      assert.equal(await response.text(), "");
      assert.equal(response.headers.get("x-robots-tag"), null);
    }
  }
});

test("robots permits crawlers to discover the redirect", async () => {
  const response = await worker.fetch(new Request(`${serviceOrigin}/robots.txt`), {}, context);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "User-agent: *\nAllow: /\nDisallow: /api/\n");
});

test("GitHub visitor counting, reads, preflight, and the map still work", async () => {
  const database = new DatabaseSync(":memory:");
  // Exercise the built Worker against real SQL with the D1 API's result shape.
  const env = {
    DB: {
      prepare(sql) {
        const statement = database.prepare(sql);
        let values = [];
        return {
          bind(...parameters) { values = parameters; return this; },
          first() { return statement.get(...values) ?? null; },
          all() { return { results: statement.all(...values) }; },
          run() { return statement.run(...values); },
        };
      },
      batch(statements) { return statements.map((statement) => statement.run()); },
    },
    ASSETS: { fetch() { return new Response("<svg><style></style><g class=\"SG\"><path/></g></svg>"); } },
  };
  const headers = { Origin: portfolioOrigin, "CF-IPCountry": "SG" };
  try {
    const preflight = await worker.fetch(new Request(`${serviceOrigin}/api/visitors`, { method: "OPTIONS", headers }), env, context);
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), portfolioOrigin);

    for (const method of ["POST", "GET"]) {
      const response = await worker.fetch(new Request(`${serviceOrigin}/api/visitors`, { method, headers }), env, context);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("location"), null);
      assert.equal(response.headers.get("access-control-allow-origin"), portfolioOrigin);
      assert.equal(response.headers.get("x-robots-tag"), "noindex");
      assert.deepEqual(await response.json(), { pageViews: 1, countries: 1, countryCodes: ["SG"] });
    }

    const map = await worker.fetch(new Request(`${serviceOrigin}/api/visitor-map.svg`, { headers }), env, context);
    assert.equal(map.status, 200);
    assert.match(map.headers.get("content-type"), /^image\/svg\+xml/);
    assert.equal(map.headers.get("x-robots-tag"), "noindex");
    assert.match(await map.text(), /\.SG path\{fill:/);
  } finally {
    database.close();
  }
});
