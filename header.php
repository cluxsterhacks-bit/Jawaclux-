<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/session.php';
require_once __DIR__ . '/functions.php';

$currentPage = basename($_SERVER['PHP_SELF']);
$isAuthenticated = Session::isLoggedIn();
$currentUser = $isAuthenticated ? Session::getUser() : null;
$isAdmin = $isAuthenticated && isAdmin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' — Jawaclux Creations' : 'Jawaclux Creations'; ?></title>
    <meta name="description" content="Professional photography, printing and media services in Ebonyi State, Nigeria">
    <meta property="og:title" content="<?php echo isset($pageTitle) ? $pageTitle : 'Jawaclux Creations'; ?>">
    <meta property="og:description" content="Capturing moments that last forever">
    
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/style.css">
    
    <style>
        :root {
            --color-bg: #0B0B0B;
            --color-surface: #141414;
            --color-surface-2: #1c1c1c;
            --color-ink: #ffffff;
            --color-muted: #a1a1aa;
            --color-gold: #D4AF37;
            --color-gold-soft: #E8C766;
            --color-gold-dim: rgba(212, 175, 55, 0.15);
            --color-cream: #F6F3EC;
            --color-cream-ink: #1a1a1a;
            --color-border-dark: rgba(255, 255, 255, 0.08);
            --color-border-gold: rgba(212, 175, 55, 0.25);
            --font-display: "Barlow Condensed", "Impact", sans-serif;
            --font-sans: "Inter", system-ui, sans-serif;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--color-bg); color: var(--color-ink); font-family: var(--font-sans); line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { font-family: var(--font-display); letter-spacing: -0.01em; line-height: 1; }
        
        header { position: sticky; top: 0; z-index: 50; background: rgba(11, 11, 11, 0.95); backdrop-filter: blur(10px); }
        .header-top { display: none; border-bottom: 1px solid var(--color-border-dark); background: #000; padding: 0.625rem 1.5rem; font-size: 0.75rem; color: rgba(255, 255, 255, 0.7); }
        @media (min-width: 768px) { .header-top { display: block; } }
        
        .header-container { max-width: 80rem; margin: 0 auto; padding: 0 1rem; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .header-main { border-bottom: 1px solid var(--color-border-dark); display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; }
        .logo { font-size: 1.5rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-ink); text-decoration: none; }
        .logo-gold { color: var(--color-gold); }
        
        nav { display: none; gap: 2rem; align-items: center; }
        @media (min-width: 1024px) { nav { display: flex; } }
        nav a { font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-ink); text-decoration: none; transition: color 0.2s; position: relative; }
        nav a:hover, nav a.active { color: var(--color-gold); }
        nav a.active::after { content: ''; position: absolute; bottom: -0.5rem; left: 0; right: 0; margin: 0 auto; width: 1.5rem; height: 0.1875rem; border-radius: 0.125rem; background: var(--color-gold); }
        
        .header-actions { display: flex; align-items: center; gap: 0.5rem; }
        .btn { padding: 0.75rem 1.5rem; border-radius: 0.375rem; font-weight: 700; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.05em; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .btn-primary { background: var(--color-gold); color: #0B0B0B; }
        .btn-primary:hover { background: var(--color-gold-soft); box-shadow: 0 8px 30px -8px rgba(212, 175, 55, 0.55); }
        .btn-secondary { background: transparent; color: var(--color-ink); border: 1px solid var(--color-border-gold); }
        .btn-secondary:hover { border-color: var(--color-gold); background: rgba(212, 175, 55, 0.08); }
        
        .menu-toggle { display: flex; align-items: center; justify-content: center; width: 2.75rem; height: 2.75rem; border: 1px solid var(--color-border-gold); background: transparent; color: var(--color-ink); border-radius: 0.375rem; cursor: pointer; }
        @media (min-width: 1024px) { .menu-toggle { display: none; } }
        
        .mobile-menu { display: none; border-top: 1px solid var(--color-border-dark); background: var(--color-bg); }
        .mobile-menu.active { display: block; }
        .mobile-menu nav { display: flex; flex-direction: column; padding: 1rem; gap: 0.25rem; }
        .mobile-menu nav a { padding: 0.75rem; border-radius: 0.375rem; transition: all 0.2s; }
        .mobile-menu nav a:hover, .mobile-menu nav a.active { background: var(--color-surface); color: var(--color-gold); }
    </style>
</head>
<body>
<header>
    <div class="header-main">
        <div class="header-container">
            <a href="<?php echo SITE_URL; ?>/index.php" class="logo">Jawaclux<span class="logo-gold">.</span></a>
            
            <nav>
                <a href="<?php echo SITE_URL; ?>/index.php" class="<?php echo $currentPage === 'index.php' ? 'active' : ''; ?>">Home</a>
                <a href="<?php echo SITE_URL; ?>/about.php" class="<?php echo $currentPage === 'about.php' ? 'active' : ''; ?>">About</a>
                <a href="<?php echo SITE_URL; ?>/services.php" class="<?php echo $currentPage === 'services.php' ? 'active' : ''; ?>">Services</a>
                <a href="<?php echo SITE_URL; ?>/pricing.php" class="<?php echo $currentPage === 'pricing.php' ? 'active' : ''; ?>">Pricing</a>
                <a href="<?php echo SITE_URL; ?>/gallery.php" class="<?php echo $currentPage === 'gallery.php' ? 'active' : ''; ?>">Gallery</a>
                <a href="<?php echo SITE_URL; ?>/contact.php" class="<?php echo $currentPage === 'contact.php' ? 'active' : ''; ?>">Contact</a>
            </nav>
            
            <div class="header-actions">
                <?php if ($isAuthenticated): ?>
                    <?php if ($isAdmin): ?>
                        <a href="<?php echo SITE_URL; ?>/admin/" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Admin</a>
                    <?php endif; ?>
                    <a href="<?php echo SITE_URL; ?>/dashboard/" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Dashboard</a>
                    <a href="<?php echo SITE_URL; ?>/logout.php" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Logout</a>
                <?php else: ?>
                    <a href="<?php echo SITE_URL; ?>/login.php" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Login</a>
                    <a href="<?php echo SITE_URL; ?>/register.php" class="btn btn-primary" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Register</a>
                <?php endif; ?>
                
                <button class="menu-toggle" onclick="document.querySelector('.mobile-menu').classList.toggle('active')">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
            </div>
        </div>
    </div>
    
    <div class="mobile-menu">
        <nav>
            <a href="<?php echo SITE_URL; ?>/index.php" class="<?php echo $currentPage === 'index.php' ? 'active' : ''; ?>">Home</a>
            <a href="<?php echo SITE_URL; ?>/about.php" class="<?php echo $currentPage === 'about.php' ? 'active' : ''; ?>">About</a>
            <a href="<?php echo SITE_URL; ?>/services.php" class="<?php echo $currentPage === 'services.php' ? 'active' : ''; ?>">Services</a>
            <a href="<?php echo SITE_URL; ?>/pricing.php" class="<?php echo $currentPage === 'pricing.php' ? 'active' : ''; ?>">Pricing</a>
            <a href="<?php echo SITE_URL; ?>/gallery.php" class="<?php echo $currentPage === 'gallery.php' ? 'active' : ''; ?>">Gallery</a>
            <a href="<?php echo SITE_URL; ?>/contact.php" class="<?php echo $currentPage === 'contact.php' ? 'active' : ''; ?>">Contact</a>
            <?php if ($isAuthenticated): ?>
                <?php if ($isAdmin): ?>
                    <a href="<?php echo SITE_URL; ?>/admin/">Admin</a>
                <?php endif; ?>
                <a href="<?php echo SITE_URL; ?>/dashboard/">Dashboard</a>
                <a href="<?php echo SITE_URL; ?>/logout.php">Logout</a>
            <?php else: ?>
                <a href="<?php echo SITE_URL; ?>/login.php">Login</a>
                <a href="<?php echo SITE_URL; ?>/register.php">Register</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
