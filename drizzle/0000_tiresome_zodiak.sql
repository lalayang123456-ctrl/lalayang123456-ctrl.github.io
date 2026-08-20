CREATE TABLE `visitor_countries` (
	`country_code` text PRIMARY KEY NOT NULL,
	`views` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `visitor_totals` (
	`id` integer PRIMARY KEY NOT NULL,
	`page_views` integer DEFAULT 0 NOT NULL
);
