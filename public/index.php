<?php
/**
 * Homepage - Jawaclux Creations
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/functions.php';

$pageTitle = 'Home';

require_once __DIR__ . '/header.php';

// Fetch featured services
try {
    $featuredServices = $db->fetchAll("SELECT * FROM services WHERE is_active = 1 LIMIT 6", [], '');
} catch (Exception $e) {
    $featuredServices = [];
}

// Fetch gallery images
try {
    $galleryImages = $db->fetchAll("SELECT * FROM gallery WHERE is_active = 1 LIMIT 8", [], '');
} catch (Exception $e) {
    $galleryImages = [];
}
?>

<main>
    <!-- Hero Section -->
    <section style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(20, 20, 20, 0.5) 100%), url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22><rect fill=%22%230B0B0B%22 width=%221200%22 height=%22600%22/></svg>'); background-size: cover; background-position: center; padding: 6rem 1.5rem; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto;">
            <h1 style="font-size: clamp(2rem, 8vw, 4rem); font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.02em;">Capturing Moments That Last <span style="color: var(--color-gold);">Forever</span></h1>
            <p style="font-size: 1.125rem; color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">Professional photography, printing, and media services for every occasion. From passport photos to wedding coverage, we deliver excellence.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="<?php echo SITE_URL; ?>/booking.php" class="btn btn-primary" style="text-decoration: none; display: inline-block;">Book a Service</a>
                <a href="<?php echo SITE_URL; ?>/gallery.php" class="btn btn-secondary" style="text-decoration: none; display: inline-block;">View Gallery</a>
            </div>
        </div>
    </section>

    <!-- Featured Services -->
    <section style="max-width: 80rem; margin: 0 auto; padding: 5rem 1.5rem;">
        <h2 style="font-size: clamp(1.5rem, 5vw, 2.5rem); margin-bottom: 1rem; text-align: center;">Our Services</h2>
        <p style="text-align: center; color: rgba(255, 255, 255, 0.7); margin-bottom: 3rem;">From photography to printing, we offer comprehensive creative solutions</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <?php foreach ($featuredServices as $service): ?>
            <div style="border: 1px solid var(--color-border-gold); border-radius: 0.5rem; padding: 2rem; background: rgba(212, 175, 55, 0.05); transition: all 0.3s;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--color-gold);"><?php echo sanitize($service['title']); ?></h3>
                <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 1.5rem; font-size: 0.95rem;"><?php echo sanitize(substr($service['description'], 0, 150)); ?>...</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-gold);">₦<?php echo number_format($service['price_from']); ?></span>
                    <a href="<?php echo SITE_URL; ?>/booking.php?service=<?php echo urlencode($service['slug']); ?>" style="background: var(--color-gold); color: #0B0B0B; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 700; font-size: 0.8125rem;">Book Now</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- Stats Section -->
    <section style="background: var(--color-surface); padding: 3rem 1.5rem; margin: 3rem 0;">
        <div style="max-width: 80rem; margin: 0 auto;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
                <div>
                    <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-gold); margin-bottom: 0.5rem;">500+</div>
                    <p style="color: rgba(255, 255, 255, 0.7);">Happy Clients</p>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-gold); margin-bottom: 0.5rem;">10+</div>
                    <p style="color: rgba(255, 255, 255, 0.7);">Years Experience</p>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-gold); margin-bottom: 0.5rem;">1000+</div>
                    <p style="color: rgba(255, 255, 255, 0.7);">Projects Completed</p>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-gold); margin-bottom: 0.5rem;">24/7</div>
                    <p style="color: rgba(255, 255, 255, 0.7);">Support Available</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Preview -->
    <section style="max-width: 80rem; margin: 0 auto; padding: 5rem 1.5rem;">
        <h2 style="font-size: clamp(1.5rem, 5vw, 2.5rem); margin-bottom: 1rem; text-align: center;">Gallery</h2>
        <p style="text-align: center; color: rgba(255, 255, 255, 0.7); margin-bottom: 3rem;">See our latest work and get inspiration for your project</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <?php foreach (array_slice($galleryImages, 0, 8) as $image): ?>
            <div style="aspect-ratio: 1; border-radius: 0.5rem; overflow: hidden; background: var(--color-surface);">
                <img src="<?php echo sanitize($image['image_url']); ?>" alt="<?php echo sanitize($image['title']); ?>" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <?php endforeach; ?>
        </div>
        
        <div style="text-align: center;">
            <a href="<?php echo SITE_URL; ?>/gallery.php" class="btn btn-primary" style="text-decoration: none; display: inline-block;">View Full Gallery</a>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section style="background: var(--color-surface); padding: 5rem 1.5rem;">
        <div style="max-width: 80rem; margin: 0 auto;">
            <h2 style="font-size: clamp(1.5rem, 5vw, 2.5rem); margin-bottom: 3rem; text-align: center;">Why Choose Jawaclux?</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📸</div>
                    <h3 style="font-size: 1.125rem; margin-bottom: 0.75rem;">Professional Quality</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.95rem;">State-of-the-art equipment and experienced professionals ensure every shot is perfect.</p>
                </div>
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
                    <h3 style="font-size: 1.125rem; margin-bottom: 0.75rem;">Quick Turnaround</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.95rem;">Fast delivery without compromising on quality. Prints ready in 24-48 hours.</p>
                </div>
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
                    <h3 style="font-size: 1.125rem; margin-bottom: 0.75rem;">Affordable Pricing</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.95rem;">Competitive rates for all budgets. Payment plans available for large projects.</p>
                </div>
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                    <h3 style="font-size: 1.125rem; margin-bottom: 0.75rem;">Tailored Solutions</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.95rem;">Customized packages to meet your unique needs and preferences.</p>
                </div>
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
                    <h3 style="font-size: 1.125rem; margin-bottom: 0.75rem;">Award Winning</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.95rem;">Recognized for excellence in photography and creative services.</p>
                </div>
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
                    <h3 style="font-size: 1.125rem; margin-bottom: 0.75rem;">Dedicated Support</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.95rem;">Friendly team ready to help you 24/7. Your satisfaction is our priority.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section style="max-width: 80rem; margin: 0 auto; padding: 5rem 1.5rem; text-align: center;">
        <h2 style="font-size: clamp(1.5rem, 5vw, 2.5rem); margin-bottom: 1rem;">Ready to Capture Your Moment?</h2>
        <p style="font-size: 1.125rem; color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem;">Get in touch with us today to discuss your project and receive a free quote.</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="<?php echo SITE_URL; ?>/booking.php" class="btn btn-primary" style="text-decoration: none; display: inline-block;">Book Now</a>
            <a href="<?php echo SITE_URL; ?>/contact.php" class="btn btn-secondary" style="text-decoration: none; display: inline-block;">Contact Us</a>
        </div>
    </section>
</main>

<?php require_once __DIR__ . '/footer.php'; ?>
