<?php
/**
 * Jawaclux Creations - Configuration File
 * Database connection and application constants
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'jawaclux_creations');

// Site Configuration
define('SITE_NAME', 'Jawaclux Creations');
define('SITE_URL', 'http://localhost'); // Change to your domain in production
define('SITE_EMAIL', 'jawacluxcreations@gmail.com');
define('SITE_PHONE', '+234 810 123 4567');
define('SITE_ADDRESS', 'Edda, Ebonyi State, Nigeria');

// Security
define('CSRF_TOKEN_LENGTH', 32);
define('SESSION_TIMEOUT', 3600); // 1 hour
define('PASSWORD_HASH_ALGO', 'bcrypt');

// Business Settings
define('REFERRAL_COMMISSION_PERCENT', 10);
define('MAX_RECEIPTS_PER_ORDER', 2);
define('CURRENCY', 'NGN');
define('CURRENCY_SYMBOL', '₦');

// File Upload
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('MAX_UPLOAD_SIZE', 5242880); // 5MB
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', 0); // Disable in production
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');

// Timezone
date_default_timezone_set('Africa/Lagos');

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// CORS headers
header('Access-Control-Allow-Origin: ' . SITE_URL);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Create logs directory if it doesn't exist
if (!is_dir(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
}

// Create uploads directory if it doesn't exist
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}
