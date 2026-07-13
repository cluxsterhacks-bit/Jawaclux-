<?php
/**
 * Application Configuration
 * Jawaclux Photography Platform
 */

// Environment
define('APP_ENV', getenv('APP_ENV') ?: 'production');
define('APP_DEBUG', getenv('APP_DEBUG') === 'true');
define('APP_URL', getenv('APP_URL') ?: 'http://localhost');

// Application
define('APP_NAME', 'Jawaclux Photography');
define('APP_DESCRIPTION', 'Professional Photography & Videography Services');

// Security
define('CSRF_TOKEN_NAME', '_csrf_token');
define('CSRF_TOKEN_LIFETIME', 3600); // 1 hour
define('SESSION_LIFETIME', 86400); // 24 hours
define('PASSWORD_MIN_LENGTH', 8);

// Upload paths
define('UPLOAD_PATH', __DIR__ . '/../public/uploads/');
define('TEMP_PATH', __DIR__ . '/../temp/');
define('MAX_UPLOAD_SIZE', 50 * 1024 * 1024); // 50MB

// Pagination
define('ITEMS_PER_PAGE', 20);

// Business Settings
define('COMPANY_NAME', 'Jawaclux Photography');
define('COMPANY_EMAIL', getenv('COMPANY_EMAIL') ?: 'info@jawaclux.com');
define('COMPANY_PHONE', getenv('COMPANY_PHONE') ?: '+1234567890');
define('COMPANY_ADDRESS', getenv('COMPANY_ADDRESS') ?: '123 Photography Lane');

// Payment Settings
define('DEPOSIT_PERCENTAGE', 50); // 50% deposit required
define('REFERRAL_BONUS', 5); // 5% referral commission

// API Settings
define('API_RATE_LIMIT', 100); // requests per hour
define('API_TOKEN_LIFETIME', 604800); // 7 days

// Timezone
date_default_timezone_set('UTC');
