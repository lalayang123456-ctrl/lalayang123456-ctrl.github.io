import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { hourlySchema, incrementHourly, pruneHourly, singaporeHour, retentionCutoff } from "../worker/visitor-trends.ts";

test("Singapore hour buckets handle midnight and year boundaries", () => {
  assert.equal(singaporeHour(new Date("2026-12-31T16:59:59Z")), "2027-01-01T00:00:00+08:00");
  assert.equal(singaporeHour(new Date("2026-10-01T15:59:59Z")), "2026-10-01T23:00:00+08:00");
  assert.equal(retentionCutoff(new Date("2024-02-29T10:00:00Z")), "2023-02-28T18:00:00+08:00");
});

test("counts group by hour and country, and retention preserves recent rows", () => {
  const db = new DatabaseSync(":memory:");
  try {
    db.exec(hourlySchema);
    const insert = db.prepare(incrementHourly);
    insert.run("2026-10-01T14:00:00+08:00", "SG");
    insert.run("2026-10-01T14:00:00+08:00", "SG");
    insert.run("2026-10-01T14:00:00+08:00", "US");
    insert.run("2026-10-01T15:00:00+08:00", "SG");
    insert.run("2024-10-01T14:00:00+08:00", "SG");
    db.prepare(pruneHourly).run("2025-10-01T14:00:00+08:00");
    const rows = db.prepare("SELECT * FROM visitor_hourly_countries ORDER BY hour_start_sgt, country_code").all();
    assert.equal(rows.length, 3);
    assert.equal(rows[0].views, 2);
    assert.equal(rows[1].country_code, "US");
    assert.equal(rows[2].views, 1);
    assert.deepEqual(Object.keys(rows[0]), ["hour_start_sgt", "country_code", "views"]);
  } finally { db.close(); }
});
