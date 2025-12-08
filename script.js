// Import Custom Elements (Components)
import './js/components/header.js';
import './js/components/footer.js';
import './js/components/testimonials.js';
import './js/components/scroll-top.js';

// Import Logic Modules
import { initHeroSlider, initBestsellersSlider } from './js/sliders.js';
import { initProductImageGallery } from './js/components/product-gallery.js';
import { initLoadingOverlay } from './js/components/loading-overlay.js';
import { initAccountNav } from './js/components/account-nav.js';
import { initScrollAnimations } from './js/components/scroll-animations.js';
import { initNewsletterForm } from './js/components/newsletter.js';

// Initialize Logic on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initBestsellersSlider();
    initProductImageGallery();
    initLoadingOverlay();
    initAccountNav();
    initScrollAnimations();
    initNewsletterForm();
});