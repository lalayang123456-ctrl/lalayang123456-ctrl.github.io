import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const visitorTotals = sqliteTable("visitor_totals", {
  id: integer("id").primaryKey(),
  pageViews: integer("page_views").notNull().default(0),
});

export const visitorCountries = sqliteTable("visitor_countries", {
  countryCode: text("country_code").primaryKey(),
  views: integer("views").notNull().default(0),
});

export const visitorHourlyCountries = sqliteTable("visitor_hourly_countries", {
  hourStartSgt: text("hour_start_sgt").notNull(),
  countryCode: text("country_code").notNull(),
  views: integer("views").notNull().default(0),
}, (table) => [primaryKey({ columns: [table.hourStartSgt, table.countryCode] })]);
