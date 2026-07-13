<?php
/**
 * Helper Functions
 * Common utility functions
 */

/**
 * Generate UUID v4
 */
function generateUUID() {
    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

/**
 * Generate random string
 */
function generateRandomString($length = 32) {
    return bin2hex(random_bytes($length / 2));
}

/**
 * Hash password
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

/**
 * Verify password
 */
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

/**
 * Generate referral code
 */
function generateReferralCode() {
    return strtoupper(substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 10));
}

/**
 * Sanitize input
 */
function sanitize($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate phone number (Nigerian format)
 */
function isValidPhone($phone) {
    $phone = preg_replace('/[^0-9+]/', '', $phone);
    return preg_match('/^(\+234|0)[0-9]{10}$/', $phone);
}

/**
 * Format currency
 */
function formatCurrency($amount) {
    return CURRENCY_SYMBOL . number_format((float)$amount, 2);
}

/**
 * Format date
 */
function formatDate($date, $format = 'M d, Y') {
    if (empty($date)) return '—';
    return date($format, strtotime($date));
}

/**
 * Get CSRF token
 */
function getCsrfToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verifyCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Redirect user
 */
function redirect($path) {
    header('Location: ' . SITE_URL . $path);
    exit;
}

/**
 * Log activity
 */
function logActivity($userId, $action, $details = []) {
    global $db;
    
    try {
        $db->insert('activity_logs', [
            'user_id' => $userId,
            'action' => $action,
            'details' => json_encode($details),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
        ]);
    } catch (Exception $e) {
        error_log("Activity log error: " . $e->getMessage());
    }
}

/**
 * Send notification
 */
function sendNotification($userId, $title, $message, $type = 'system', $relatedId = null) {
    global $db;
    
    try {
        $db->insert('notifications', [
            'id' => generateUUID(),
            'user_id' => $userId,
            'title' => $title,
            'message' => $message,
            'type' => $type,
            'related_id' => $relatedId
        ]);
    } catch (Exception $e) {
        error_log("Notification error: " . $e->getMessage());
    }
}

/**
 * Generate receipt number
 */
function generateReceiptNumber() {
    return 'RCP-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));
}

/**
 * Generate order number
 */
function generateOrderNumber() {
    return 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));
}

/**
 * Get user by ID
 */
function getUserById($userId) {
    global $db;
    return $db->fetchOne("SELECT * FROM users WHERE id = ?", [$userId], 's');
}

/**
 * Get current user
 */
function getCurrentUser() {
    if (empty($_SESSION['user_id'])) {
        return null;
    }
    return getUserById($_SESSION['user_id']);
}

/**
 * Check if user is admin
 */
function isAdmin($userId = null) {
    global $db;
    
    if ($userId === null) {
        $userId = $_SESSION['user_id'] ?? null;
    }
    
    if (empty($userId)) {
        return false;
    }
    
    $user = getUserById($userId);
    return $user && $user['is_admin'] == 1;
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return !empty($_SESSION['user_id']);
}

/**
 * Require authentication
 */
function requireAuth() {
    if (!isAuthenticated()) {
        redirect('/login.php');
    }
}

/**
 * Require admin
 */
function requireAdmin() {
    if (!isAdmin()) {
        http_response_code(403);
        die('Access denied');
    }
}

/**
 * Get setting value
 */
function getSetting($key, $default = null) {
    global $db;
    
    try {
        $result = $db->fetchOne("SELECT setting_value FROM settings WHERE setting_key = ?", [$key], 's');
        return $result ? $result['setting_value'] : $default;
    } catch (Exception $e) {
        return $default;
    }
}

/**
 * Update setting value
 */
function updateSetting($key, $value) {
    global $db;
    
    try {
        $existing = $db->fetchOne("SELECT id FROM settings WHERE setting_key = ?", [$key], 's');
        
        if ($existing) {
            return $db->update('settings', ['setting_value' => $value], ['setting_key' => $key]);
        } else {
            return $db->insert('settings', ['setting_key' => $key, 'setting_value' => $value]);
        }
    } catch (Exception $e) {
        error_log("Setting update error: " . $e->getMessage());
        return false;
    }
}

/**
 * Calculate receipt count for order
 */
function getReceiptCountForOrder($orderId) {
    global $db;
    return $db->count('receipts', ['order_id' => $orderId]);
}

/**
 * Check if order can generate more receipts
 */
function canGenerateReceipt($orderId) {
    return getReceiptCountForOrder($orderId) < MAX_RECEIPTS_PER_ORDER;
}

/**
 * Get referral link
 */
function getReferralLink($referralCode) {
    return SITE_URL . '?ref=' . urlencode($referralCode);
}

/**
 * Sanitize filename
 */
function sanitizeFilename($filename) {
    $filename = preg_replace('/[^a-zA-Z0-9._-]/', '', $filename);
    return preg_replace('/\.+/', '.', $filename);
}
