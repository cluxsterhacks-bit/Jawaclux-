<?php
/**
 * Session Management
 * Handles user authentication and sessions
 */

class Session {
    /**
     * Login user
     */
    public static function login($userId, $email, $fullName, $rememberMe = false) {
        $_SESSION['user_id'] = $userId;
        $_SESSION['email'] = $email;
        $_SESSION['full_name'] = $fullName;
        $_SESSION['login_time'] = time();
        
        if ($rememberMe) {
            setcookie('user_token', bin2hex(random_bytes(32)), time() + (86400 * 30), '/', '', false, true);
        }
        
        return true;
    }
    
    /**
     * Logout user
     */
    public static function logout() {
        session_destroy();
        setcookie('user_token', '', time() - 3600, '/');
        redirect('/');
    }
    
    /**
     * Check if user is logged in
     */
    public static function isLoggedIn() {
        return !empty($_SESSION['user_id']);
    }
    
    /**
     * Get current user ID
     */
    public static function getUserId() {
        return $_SESSION['user_id'] ?? null;
    }
    
    /**
     * Get current user data
     */
    public static function getUser() {
        if (!self::isLoggedIn()) {
            return null;
        }
        
        global $db;
        return $db->fetchOne("SELECT * FROM users WHERE id = ?", [$_SESSION['user_id']], 's');
    }
    
    /**
     * Check session timeout
     */
    public static function checkTimeout() {
        if (!self::isLoggedIn()) {
            return true;
        }
        
        if (time() - ($_SESSION['login_time'] ?? time()) > SESSION_TIMEOUT) {
            self::logout();
            return false;
        }
        
        return true;
    }
}

// Check session timeout on every page load
if (Session::isLoggedIn() && !Session::checkTimeout()) {
    header('Location: ' . SITE_URL . '/login.php?expired=1');
    exit;
}
