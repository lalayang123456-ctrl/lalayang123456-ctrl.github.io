CREATE TABLE `visitor_hourly_countries` (
	`hour_start_sgt` text NOT NULL,
	`country_code` text NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`hour_start_sgt`, `country_code`)
);
