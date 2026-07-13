<?php
$year = date('Y');
?>
<footer style="border-top: 1px solid var(--color-border-dark); background: #000; margin-top: 4rem;">
    <div style="max-width: 80rem; margin: 0 auto; padding: 4rem 1.5rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; margin-bottom: 3rem;">
            <div>
                <div class="logo" style="margin-bottom: 1.5rem;">Jawaclux<span class="logo-gold">.</span></div>
                <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(255, 255, 255, 0.6); margin-bottom: 1.5rem;">Professional photography, printing, branding & media services in Ebonyi State, Nigeria.</p>
                <div style="display: flex; gap: 0.75rem;">
                    <a href="#" style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border-gold); border-radius: 0.375rem; color: var(--color-ink); text-decoration: none;" title="Facebook">f</a>
                    <a href="#" style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border-gold); border-radius: 0.375rem; color: var(--color-ink); text-decoration: none;" title="Instagram">📷</a>
                    <a href="https://wa.me/2348101234567" style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border-gold); border-radius: 0.375rem; color: var(--color-ink); text-decoration: none;" title="WhatsApp">💬</a>
                </div>
            </div>
            
            <div>
                <h4 style="font-size: 1.125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-ink); margin-bottom: 1.5rem;">Quick <span style="color: var(--color-gold);">Links</span></h4>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 0.75rem;"><a href="<?php echo SITE_URL; ?>/index.php" style="color: rgba(255, 255, 255, 0.6); text-decoration: none;">Home</a></li>
                    <li style="margin-bottom: 0.75rem;"><a href="<?php echo SITE_URL; ?>/about.php" style="color: rgba(255, 255, 255, 0.6); text-decoration: none;">About Us</a></li>
                    <li style="margin-bottom: 0.75rem;"><a href="<?php echo SITE_URL; ?>/services.php" style="color: rgba(255, 255, 255, 0.6); text-decoration: none;">Services</a></li>
                    <li style="margin-bottom: 0.75rem;"><a href="<?php echo SITE_URL; ?>/pricing.php" style="color: rgba(255, 255, 255, 0.6); text-decoration: none;">Pricing</a></li>
                    <li style="margin-bottom: 0.75rem;"><a href="<?php echo SITE_URL; ?>/gallery.php" style="color: rgba(255, 255, 255, 0.6); text-decoration: none;">Gallery</a></li>
                    <li style="margin-bottom: 0.75rem;"><a href="<?php echo SITE_URL; ?>/contact.php" style="color: rgba(255, 255, 255, 0.6); text-decoration: none;">Contact</a></li>
                </ul>
            </div>
            
            <div>
                <h4 style="font-size: 1.125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-ink); margin-bottom: 1.5rem;">Hours</h4>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 0.75rem; color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;">Mon – Sat: 8:00 AM – 8:00 PM</li>
                    <li style="margin-bottom: 0.75rem; color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;">Sunday: 12:00 PM – 6:00 PM</li>
                    <li style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border-dark); color: rgba(255, 255, 255, 0.3); font-size: 0.75rem;">Bookings recommended. Walk-ins welcome.</li>
                </ul>
            </div>
            
            <div>
                <h4 style="font-size: 1.125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-ink); margin-bottom: 1.5rem;">Contact</h4>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 1rem; color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;"><?php echo SITE_ADDRESS; ?></li>
                    <li style="margin-bottom: 1rem;"><a href="tel:<?php echo SITE_PHONE; ?>" style="color: rgba(255, 255, 255, 0.6); text-decoration: none; font-size: 0.875rem;"><?php echo SITE_PHONE; ?></a></li>
                    <li><a href="mailto:<?php echo SITE_EMAIL; ?>" style="color: rgba(255, 255, 255, 0.6); text-decoration: none; font-size: 0.875rem;"><?php echo SITE_EMAIL; ?></a></li>
                </ul>
            </div>
        </div>
        
        <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--color-border-dark); display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: space-between; text-xs; color: rgba(255, 255, 255, 0.4);">
            <div>&copy; <?php echo $year; ?> Jawaclux Creations. All rights reserved.</div>
            <div style="display: flex; gap: 1.5rem;">
                <a href="#" style="color: rgba(255, 255, 255, 0.4); text-decoration: none;">Privacy Policy</a>
                <a href="#" style="color: rgba(255, 255, 255, 0.4); text-decoration: none;">Terms</a>
            </div>
        </div>
    </div>
</footer>

</body>
</html>
