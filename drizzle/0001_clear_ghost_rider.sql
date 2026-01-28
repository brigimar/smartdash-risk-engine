CREATE TABLE `alert_interactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`alertId` int NOT NULL,
	`mlAccountId` int NOT NULL,
	`action` enum('viewed','acknowledged','ignored','resolved') NOT NULL,
	`timeTaken` int,
	`outcome` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alert_interactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mlAccountId` int NOT NULL,
	`type` enum('cancellation_spike','claim_increase','stock_critical','response_delay','quality_issue','reputation_drop','suspension_risk','fiscal_warning') NOT NULL,
	`severity` enum('low','medium','high','critical') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`aiSuggestion` text,
	`actionRequired` text,
	`status` enum('active','acknowledged','resolved','ignored') NOT NULL DEFAULT 'active',
	`priority` int NOT NULL DEFAULT 0,
	`notifiedViaEmail` boolean NOT NULL DEFAULT false,
	`notifiedViaWhatsapp` boolean NOT NULL DEFAULT false,
	`acknowledgedAt` timestamp,
	`resolvedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` enum('claim_exclusion','suspension_types','best_practices','case_studies','ml_rules') NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`tags` json,
	`viewCount` int NOT NULL DEFAULT 0,
	`helpful` int NOT NULL DEFAULT 0,
	`notHelpful` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `knowledge_articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `knowledge_articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mlAccountId` int NOT NULL,
	`date` timestamp NOT NULL,
	`totalOrders` int NOT NULL DEFAULT 0,
	`cancelledOrders` int NOT NULL DEFAULT 0,
	`cancellationRate` decimal(5,2) NOT NULL DEFAULT '0.00',
	`totalClaims` int NOT NULL DEFAULT 0,
	`validClaims` int NOT NULL DEFAULT 0,
	`excludedClaims` int NOT NULL DEFAULT 0,
	`claimRate` decimal(5,2) NOT NULL DEFAULT '0.00',
	`avgResponseTime` int NOT NULL DEFAULT 0,
	`lateResponses` int NOT NULL DEFAULT 0,
	`totalListings` int NOT NULL DEFAULT 0,
	`outOfStock` int NOT NULL DEFAULT 0,
	`pausedListings` int NOT NULL DEFAULT 0,
	`listingsWithIssues` int NOT NULL DEFAULT 0,
	`reputationScore` decimal(5,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ml_accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mlUserId` varchar(64) NOT NULL,
	`nickname` varchar(255),
	`email` varchar(320),
	`accessToken` text NOT NULL,
	`refreshToken` text NOT NULL,
	`tokenExpiresAt` timestamp NOT NULL,
	`siteId` varchar(10) NOT NULL,
	`accountStatus` enum('active','suspended','restricted','blocked') NOT NULL DEFAULT 'active',
	`riskScore` decimal(5,2) NOT NULL DEFAULT '0.00',
	`riskLevel` enum('low','medium','high','critical') NOT NULL DEFAULT 'low',
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ml_accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `ml_accounts_mlUserId_unique` UNIQUE(`mlUserId`)
);
--> statement-breakpoint
CREATE TABLE `notification_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailEnabled` boolean NOT NULL DEFAULT true,
	`whatsappEnabled` boolean NOT NULL DEFAULT false,
	`whatsappNumber` varchar(20),
	`weeklyReportEnabled` boolean NOT NULL DEFAULT true,
	`monthlyReportEnabled` boolean NOT NULL DEFAULT true,
	`alertThreshold` enum('all','medium','high','critical') NOT NULL DEFAULT 'medium',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notification_preferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `notification_preferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mlAccountId` int,
	`type` enum('weekly','monthly') NOT NULL,
	`period` varchar(50) NOT NULL,
	`risksAvoided` int NOT NULL DEFAULT 0,
	`alertsGenerated` int NOT NULL DEFAULT 0,
	`alertsResolved` int NOT NULL DEFAULT 0,
	`avgRiskScore` decimal(5,2),
	`recommendations` json,
	`trends` json,
	`sentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `risk_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mlAccountId` int NOT NULL,
	`riskScore` decimal(5,2) NOT NULL,
	`riskLevel` enum('low','medium','high','critical') NOT NULL,
	`factors` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `risk_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionPlan` enum('free','starter','professional','enterprise') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` enum('active','cancelled','expired') DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionExpiresAt` timestamp;