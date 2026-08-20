import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const visitorTotals = sqliteTable("visitor_totals", {
  id: integer("id").primaryKey(),
  pageViews: integer("page_views").notNull().default(0),
});

export const visitorCountries = sqliteTable("visitor_countries", {
  countryCode: text("country_code").primaryKey(),
  views: integer("views").notNull().default(0),
});
