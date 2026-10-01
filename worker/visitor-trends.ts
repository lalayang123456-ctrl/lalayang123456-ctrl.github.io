// Only aggregate hour/country counts are stored, with no per-visitor records.
export const hourlySchema = `CREATE TABLE IF NOT EXISTS visitor_hourly_countries (
  hour_start_sgt TEXT NOT NULL,
  country_code TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (hour_start_sgt, country_code)
)`;

export const incrementHourly = `INSERT INTO visitor_hourly_countries
  (hour_start_sgt, country_code, views) VALUES (?, ?, 1)
  ON CONFLICT(hour_start_sgt, country_code) DO UPDATE SET views = views + 1`;

export const pruneHourly = "DELETE FROM visitor_hourly_countries WHERE hour_start_sgt < ?";

export function singaporeHour(date: Date) {
  return new Date(date.getTime() + 8 * 60 * 60 * 1000)
    .toISOString().slice(0, 13) + ":00:00+08:00";
}

export function retentionCutoff(date: Date) {
  // Twelve calendar months, clamping February 29 to February 28.
  const cutoff = new Date(date);
  cutoff.setUTCDate(1);
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 1);
  const lastDay = new Date(Date.UTC(cutoff.getUTCFullYear(), cutoff.getUTCMonth() + 1, 0)).getUTCDate();
  cutoff.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return singaporeHour(cutoff);
}
