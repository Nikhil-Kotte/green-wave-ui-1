CREATE TABLE `donations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`ngo_id` text,
	`item_type` text NOT NULL,
	`item_name` text NOT NULL,
	`condition` text NOT NULL,
	`quantity` integer NOT NULL,
	`description` text NOT NULL,
	`pickup_address` text NOT NULL,
	`contact_number` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ngo_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pickups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`waste_type` text NOT NULL,
	`pickup_date` text NOT NULL,
	`pickup_time` text NOT NULL,
	`address` text NOT NULL,
	`estimated_weight` real NOT NULL,
	`actual_weight` real,
	`notes` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`collector_id` text,
	`created_at` text NOT NULL,
	`completed_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `route_stops` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`route_id` integer NOT NULL,
	`pickup_id` integer NOT NULL,
	`stop_order` integer NOT NULL,
	`address` text NOT NULL,
	`waste_type` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`arrival_time` text,
	`departure_time` text,
	FOREIGN KEY (`route_id`) REFERENCES `routes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pickup_id`) REFERENCES `pickups`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `routes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`collector_id` text NOT NULL,
	`status` text DEFAULT 'planned' NOT NULL,
	`total_distance` real NOT NULL,
	`total_pickups` integer NOT NULL,
	`start_time` text,
	`end_time` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tracking_locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`collector_id` text NOT NULL,
	`route_id` integer,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`timestamp` text NOT NULL,
	`speed` real,
	FOREIGN KEY (`collector_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`route_id`) REFERENCES `routes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`name` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);