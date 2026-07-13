-- Jawaclux Creations Database Schema
-- MySQL 8.0+

-- Drop existing tables if they exist
DROP TABLE IF EXISTS `receipts`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `referral_earnings`;
DROP TABLE IF EXISTS `referrals`;
DROP TABLE IF EXISTS `investment_tracking`;
DROP TABLE IF EXISTS `investment_plans`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `gallery`;
DROP TABLE IF EXISTS `pricing`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `activity_logs`;
DROP TABLE IF EXISTS `admin_roles`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `settings`;

-- Settings table
CREATE TABLE `settings` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `setting_key` VARCHAR(100) UNIQUE NOT NULL,
  `setting_value` LONGTEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users table
CREATE TABLE `users` (
  `id` CHAR(36) PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255),
  `phone` VARCHAR(20),
  `address` TEXT,
  `profile_picture` VARCHAR(500),
  `referral_code` VARCHAR(20) UNIQUE NOT NULL,
  `referred_by` CHAR(36),
  `is_admin` BOOLEAN DEFAULT FALSE,
  `status` ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_referral_code` (`referral_code`),
  INDEX `idx_referred_by` (`referred_by`),
  FOREIGN KEY (`referred_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin roles table
CREATE TABLE `admin_roles` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` CHAR(36) NOT NULL UNIQUE,
  `role` ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Services table
CREATE TABLE `services` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `description` TEXT,
  `category` VARCHAR(100),
  `price_from` DECIMAL(10,2),
  `image_url` VARCHAR(500),
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery table
CREATE TABLE `gallery` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100),
  `image_url` VARCHAR(500) NOT NULL,
  `description` TEXT,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pricing table
CREATE TABLE `pricing` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2),
  `unit` VARCHAR(100),
  `description` TEXT,
  `features` JSON,
  `is_popular` BOOLEAN DEFAULT FALSE,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bookings table
CREATE TABLE `bookings` (
  `id` CHAR(36) PRIMARY KEY,
  `user_id` CHAR(36),
  `service_id` INT,
  `service_title` VARCHAR(255),
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255),
  `phone` VARCHAR(20) NOT NULL,
  `event_date` DATE,
  `event_time` TIME,
  `location` VARCHAR(500),
  `notes` TEXT,
  `status` ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  `price` DECIMAL(10,2),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE `orders` (
  `id` CHAR(36) PRIMARY KEY,
  `order_number` VARCHAR(50) UNIQUE NOT NULL,
  `user_id` CHAR(36),
  `customer_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `email` VARCHAR(255),
  `address` TEXT,
  `service_type` VARCHAR(100),
  `product_ordered` VARCHAR(255),
  `quantity` INT DEFAULT 1,
  `unit_price` DECIMAL(10,2),
  `total_amount` DECIMAL(10,2),
  `deposit_amount` DECIMAL(10,2),
  `balance` DECIMAL(10,2),
  `payment_status` ENUM('pending', 'deposit_paid', 'fully_paid') DEFAULT 'pending',
  `order_status` ENUM('pending', 'processing', 'ready', 'delivered', 'completed', 'cancelled') DEFAULT 'pending',
  `delivery_date` DATE,
  `staff_name` VARCHAR(255),
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_order_number` (`order_number`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_payment_status` (`payment_status`),
  INDEX `idx_order_status` (`order_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Receipts table (Max 2 per order)
CREATE TABLE `receipts` (
  `id` CHAR(36) PRIMARY KEY,
  `receipt_number` VARCHAR(50) UNIQUE NOT NULL,
  `order_id` CHAR(36) NOT NULL,
  `referenced_receipt_id` CHAR(36),
  `receipt_type` ENUM('deposit', 'full_payment') NOT NULL,
  `customer_name` VARCHAR(255),
  `customer_phone` VARCHAR(20),
  `customer_email` VARCHAR(255),
  `service_details` TEXT,
  `quantity` INT,
  `unit_price` DECIMAL(10,2),
  `total_amount` DECIMAL(10,2),
  `deposit_paid` DECIMAL(10,2),
  `final_payment` DECIMAL(10,2),
  `remaining_balance` DECIMAL(10,2),
  `total_received` DECIMAL(10,2),
  `payment_method` VARCHAR(100),
  `staff_name` VARCHAR(255),
  `staff_signature` VARCHAR(500),
  `receipt_date` DATE,
  `receipt_time` TIME,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`referenced_receipt_id`) REFERENCES `receipts`(`id`) ON DELETE SET NULL,
  INDEX `idx_receipt_number` (`receipt_number`),
  INDEX `idx_order_id` (`order_id`),
  INDEX `idx_receipt_type` (`receipt_type`),
  UNIQUE KEY `unique_receipt_per_order` (`order_id`, `receipt_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Referrals table
CREATE TABLE `referrals` (
  `id` CHAR(36) PRIMARY KEY,
  `referrer_id` CHAR(36) NOT NULL,
  `referred_user_id` CHAR(36) NOT NULL,
  `referral_code` VARCHAR(20),
  `status` ENUM('pending', 'active', 'inactive') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`referrer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`referred_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_referrer_id` (`referrer_id`),
  INDEX `idx_referred_user_id` (`referred_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Referral earnings table
CREATE TABLE `referral_earnings` (
  `id` CHAR(36) PRIMARY KEY,
  `referrer_id` CHAR(36) NOT NULL,
  `order_id` CHAR(36),
  `referral_id` CHAR(36),
  `amount` DECIMAL(10,2),
  `status` ENUM('pending', 'approved', 'paid', 'rejected') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`referrer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`referral_id`) REFERENCES `referrals`(`id`) ON DELETE SET NULL,
  INDEX `idx_referrer_id` (`referrer_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Investment plans table
CREATE TABLE `investment_plans` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `plan_name` VARCHAR(255) NOT NULL,
  `minimum_amount` DECIMAL(10,2),
  `maximum_amount` DECIMAL(10,2),
  `duration_days` INT,
  `daily_return_percent` DECIMAL(5,2),
  `monthly_return_percent` DECIMAL(5,2),
  `total_return_percent` DECIMAL(5,2),
  `description` TEXT,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Investment tracking table
CREATE TABLE `investment_tracking` (
  `id` CHAR(36) PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `plan_id` INT NOT NULL,
  `amount_invested` DECIMAL(10,2),
  `daily_earnings` DECIMAL(10,2),
  `total_earned` DECIMAL(10,2),
  `profit` DECIMAL(10,2),
  `status` ENUM('pending', 'active', 'completed', 'withdrawn') DEFAULT 'pending',
  `start_date` DATE,
  `end_date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`plan_id`) REFERENCES `investment_plans`(`id`) ON DELETE RESTRICT,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications table
CREATE TABLE `notifications` (
  `id` CHAR(36) PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `title` VARCHAR(255),
  `message` TEXT,
  `type` ENUM('order', 'booking', 'referral', 'investment', 'system') DEFAULT 'system',
  `related_id` CHAR(36),
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_is_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity logs table
CREATE TABLE `activity_logs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` CHAR(36),
  `action` VARCHAR(255),
  `details` JSON,
  `ip_address` VARCHAR(45),
  `user_agent` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default settings
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('site_name', 'Jawaclux Creations'),
('site_email', 'jawacluxcreations@gmail.com'),
('site_phone', '+234 810 123 4567'),
('site_address', 'Edda, Ebonyi State, Nigeria'),
('referral_commission_percent', '10'),
('deposit_receipt_enabled', '1'),
('max_receipts_per_order', '2'),
('currency', 'NGN');
