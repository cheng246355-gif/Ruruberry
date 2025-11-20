'use strict';

// Debounce function to limit how often a function is called
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * @namespace THeader
 * @description Custom element for the header of the page.
 */
class THeader extends HTMLElement {
    constructor() {
        super();
        this.lastScrollTop = 0;
        this.header = null;
        this.debouncedHandleScroll = this.debouncedHandleScroll.bind(this); // Bind once
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="logo">
                    <a href="index.html">
                    <img class="logo-img" src="./images/Logo/RuruberryLogo_Normal Size-1000x189.png" alt="RuRuBerry Logo">
                    </a>
                </div>
                <nav>
                    <ul class="nav-menu">
                        <li><a href="about-us.html">About Us</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="ru-press.html">Ru-PRESS</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
                <div class="header-controls">
                    <div class="header-icons">
                        <a href="account.html"><span class="material-symbols-outlined" aria-hidden="true">account_circle</span></a>
                        <a href="contact.html#retailers-section"><span class="material-symbols-outlined" aria-hidden="true">location_on</span></a>
                        <a href="#search"><span class="material-symbols-outlined" aria-hidden="true">search</span></a>
                    </div>
                    <button class="hamburger-menu" aria-label="Toggle navigation menu">
                        <i class="ph-bold ph-list" aria-hidden="true"></i>
                    </button>
                </div>
            </header>
        `;
        this.header = this.querySelector('header');
        
        // Add scroll event listener
        window.addEventListener('scroll', this.debouncedHandleScroll);
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.debouncedHandleScroll);
    }

    // Debounced scroll handler
    debouncedHandleScroll = debounce(this.handleScroll.bind(this), 10);

    handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > this.lastScrollTop && currentScrollTop > 100) {
            // Scrolling down and scrolled past 100px
            this.header.classList.add('header-hide');
        } else {
            // Scrolling up or near the top
            this.header.classList.remove('header-hide');
        }
        this.lastScrollTop = currentScrollTop;
    }
}
customElements.define("t-header", THeader);

/**
 * @namespace TFooter
 * @description Custom element for the footer of the page.
 */
class TFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-top">
                <!-- Left Column - Links -->
                <div class="footer-links">
                    <ul>
                        <li><a href="about-us.html">About Us</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="ru-press.html">Ru-PRESS</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                
                <!-- Right Column - Stay Updated -->
                <div class="footer-stay-updated">
                    <h4>Stay Updated</h4>
                    <p>Sign up to receive our promotions and news</p>
                    <form class="footer-form">
                        <div class="form-group">
                            <input type="email" placeholder="Enter your email">
                            <button type="submit" class="btn-subscribe">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="footer-middle">
                <!-- Logo and Brand -->
                <div class="footer-brand">
                    <div class="logo">
                        <img class="logo-img" src="./images/Logo/RuruberryLogo_Normal Size-1000x189.png" alt="RuRuBerry Logo" loading="lazy">
                    </div>
                    <p class="brand-tagline">Rudiment. Progress. Perfection</p>
                </div>
                
                <!-- Right - Social Icons -->
                <div class="social-icons">
                    <a href="https://www.facebook.com/ruruberry.official/" target="_blank"><i class="ph-bold ph-facebook-logo" aria-hidden="true"></i></a>
                    <a href="https://www.instagram.com/ruruberry.official/" target="_blank"><i class="ph-bold ph-instagram-logo" aria-hidden="true"></i></a>
                </div>
            </div>

            <div class="footer-bottom-container">
                <div class="footer-bottom">
                    <!-- Left - Payment Icons -->
                    <div class="payment-icons">
                        <img src="images/cc-visa.svg" alt="Visa">
                        <img src="images/mastercard.svg" alt="Mastercard">
                    </div>
                    <!-- Right - Copyright -->
                    <div class="copyright">© Copyright by Chong You Cheng 2025</div>
                </div>
            </div>
        </div>
    </footer>
     `;
  }
}   
customElements.define("t-footer", TFooter);

/**
 * @namespace TReturnToTop
 * @description Custom element for a return to top button.
 */
class TReturnToTop extends HTMLElement {
    constructor() {
        super();
        this.button = null;
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    connectedCallback() {
        this.innerHTML = `
            <button id="return-to-top" class="return-to-top-btn" aria-label="Return to top">
                <i class="ph-bold ph-arrow-up" aria-hidden="true"></i>
            </button>
        `;
        this.button = this.querySelector('#return-to-top');
        this.button.addEventListener('click', this.scrollToTop);
        window.addEventListener('scroll', this.toggleVisibility);
        this.toggleVisibility(); // Set initial visibility
    }

    disconnectedCallback() {
        this.button.removeEventListener('click', this.scrollToTop);
        window.removeEventListener('scroll', this.toggleVisibility);
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }
}
customElements.define("t-return-to-top", TReturnToTop);

/**
 * @namespace HeroSlider
 * @description Logic for the hero slider component.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const heroSliderContainer = document.querySelector('.hero-slider'); // Use a container for touch events
        if (!heroSliderContainer) return;

        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        let slideInterval;
        let touchStartX = 0;
        let touchEndX = 0;

        if (slides.length > 0) {
            // Apply width to the direct parent of slides for translateX to work
            heroSliderContainer.style.width = `${slides.length * 100}%`;
            slides.forEach(slide => {
                slide.style.width = `${100 / slides.length}%`;
            });
        }

        const updateSlider = () => {
            const currentTranslate = currentSlide * -(100 / slides.length);
            heroSliderContainer.style.transform = `translateX(${currentTranslate}%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        };

        const startSlideTimer = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetSlideTimer = () => {
            clearInterval(slideInterval);
            startSlideTimer();
        };

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                currentSlide = parseInt(indicator.dataset.slide);
                updateSlider();
                resetSlideTimer();
            });
        });

        // Touch/Swipe event listeners
        heroSliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            clearInterval(slideInterval); // Pause auto-slide on touch
        });

        heroSliderContainer.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        heroSliderContainer.addEventListener('touchend', () => {
            const swipeThreshold = 50; // Minimum distance for a swipe
            const swipeDistance = touchEndX - touchStartX;

            if (swipeDistance > swipeThreshold) {
                // Swiped right (previous slide)
                prevSlide();
                resetSlideTimer();
            } else if (swipeDistance < -swipeThreshold) {
                // Swiped left (next slide)
                nextSlide();
                resetSlideTimer();
            }
            touchStartX = 0;
            touchEndX = 0;
            startSlideTimer(); // Resume auto-slide after touch
        });

        updateSlider();
        startSlideTimer();
    });
})();

/**
 * @namespace TestimonialsSlider
 * @description Logic for the testimonials slider component.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;

        const prevButton = document.querySelector('.testimonial-arrow.prev');
        const nextButton = document.querySelector('.testimonial-arrow.next');

        let touchStartX = 0;
        let touchEndX = 0;

        const scrollAmount = () => {
            const firstCard = slider.querySelector('.testimonial-card');
            return firstCard ? firstCard.offsetWidth + 30 : 300;
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            });
        }

        // Touch/Swipe event listeners
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', () => {
            const swipeThreshold = 50; // Minimum distance for a swipe
            const swipeDistance = touchEndX - touchStartX;

            if (swipeDistance > swipeThreshold) {
                // Swiped right (previous slide)
                slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            } else if (swipeDistance < -swipeThreshold) {
                // Swiped left (next slide)
                slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            }
            touchStartX = 0;
            touchEndX = 0;
        });
    });
})();

/**
 * @namespace HamburgerMenu
 * @description Logic for the hamburger menu component.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');
        const headerControls = document.querySelector('.header-controls');
        const headerIcons = document.querySelector('.header-icons');

        if (hamburgerMenu && navMenu && headerControls && headerIcons) {
            hamburgerMenu.addEventListener('click', () => {
                const isExpanded = navMenu.classList.toggle('nav-active');
                hamburgerMenu.setAttribute('aria-expanded', isExpanded);
            });

            // Set initial ARIA attributes
            navMenu.id = 'main-nav'; // Ensure the navMenu has an ID for aria-controls
            hamburgerMenu.setAttribute('aria-controls', 'main-nav');
            hamburgerMenu.setAttribute('aria-expanded', 'false');

            const handleResize = () => {
                if (window.innerWidth <= 1024) {
                    if (!navMenu.contains(headerIcons)) {
                        navMenu.appendChild(headerIcons);
                    }
                } else {
                    if (!headerControls.contains(headerIcons)) {
                        headerControls.insertBefore(headerIcons, hamburgerMenu);
                    }
                }
            };

            window.addEventListener('resize', handleResize);
            handleResize(); // Initial check
        }
    });
})();

/**
 * @namespace BestsellersSlider
 * @description Logic for the bestsellers product card slider.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const productsGrid = document.querySelector('.bestsellers .products-grid');
        if (!productsGrid) return;

        const prevButton = document.querySelector('.bestsellers .nav-arrows .arrow-btn:first-child');
        const nextButton = document.querySelector('.bestsellers .nav-arrows .arrow-btn:last-child');

        let touchStartX = 0;
        let touchEndX = 0;

        const scrollAmount = () => {
            const firstCard = productsGrid.querySelector('.product-card');
            // Assuming a gap of 30px as defined in home.css
            return firstCard ? firstCard.offsetWidth + 30 : 390; // 360px card width + 30px gap
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                productsGrid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                productsGrid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            });
        }

        // Touch/Swipe event listeners
        productsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        productsGrid.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        productsGrid.addEventListener('touchend', () => {
            const swipeThreshold = 50; // Minimum distance for a swipe
            const swipeDistance = touchEndX - touchStartX;

            if (swipeDistance > swipeThreshold) {
                // Swiped right (previous slide)
                productsGrid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            } else if (swipeDistance < -swipeThreshold) {
                // Swiped left (next slide)
                productsGrid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            }
            touchStartX = 0;
            touchEndX = 0;
        });
    });
})();

/**
 * @namespace ProductImageGallery
 * @description Logic for the product image gallery on the product page.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');

        if (thumbnails.length > 0 && mainImage) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    // Remove active class from all thumbnails
                    thumbnails.forEach(thumb => thumb.classList.remove('active'));

                    // Add active class to the clicked thumbnail
                    this.classList.add('active');

                    // Change the main image src from data attribute
                    if (this.dataset.largeSrc) {
                        mainImage.src = this.dataset.largeSrc;
                    }
                });
            });
        }
    });
})();

/**
 * @namespace LoadingOverlay
 * @description Logic for the loading overlay animation.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const loadingOverlay = document.querySelector('.loading-overlay');

        if (loadingOverlay) {
            // Hide the overlay once all page content is fully loaded
            window.addEventListener('load', () => {
                loadingOverlay.classList.add('hidden');
            });

            // As a failsafe, hide the overlay after a timeout in case the load event is excessively delayed
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 8000); // 8-second failsafe
        }
    });
})();

/**
 * @namespace AccountPage
 * @description Logic for the account page navigation.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.account-nav a');
        const sections = document.querySelectorAll('.account-section');
        const defaultHash = navLinks.length > 0 ? navLinks[0].getAttribute('href') : '';

        if (navLinks.length > 0 && sections.length > 0) {
            const updateActiveState = (hash) => {
                const targetId = hash.substring(1);

                // Deactivate all links and sections
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                // Activate the target link and section
                const activeLink = document.querySelector(`.account-nav a[href="${hash}"]`);
                const targetSection = document.getElementById(targetId);

                if (activeLink && targetSection) {
                    activeLink.classList.add('active');
                    targetSection.classList.add('active');
                } else if (defaultHash) {
                    // If hash is invalid, default to the first item
                    const defaultLink = document.querySelector(`.account-nav a[href="${defaultHash}"]`);
                    const defaultSection = document.getElementById(defaultHash.substring(1));
                    if (defaultLink && defaultSection) {
                        defaultLink.classList.add('active');
                        defaultSection.classList.add('active');
                         // Update hash to reflect the default state
                        history.replaceState(null, '', defaultHash);
                    }
                }
            };

            // Add click event listeners
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetHash = this.getAttribute('href');

                    if (targetHash === '#logout') {
                        console.log('User logged out');
                        // window.location.href = 'index.html';
                        return;
                    }
                    
                    if (window.location.hash !== targetHash) {
                        history.pushState(null, '', targetHash);
                        updateActiveState(targetHash);
                    }
                });
            });

            // Handle back/forward navigation
            window.addEventListener('popstate', () => {
                const currentHash = window.location.hash || defaultHash;
                updateActiveState(currentHash);
            });

            // Set initial state on page load
            const initialHash = window.location.hash || defaultHash;
            updateActiveState(initialHash);
        }
    });
})();

/**
 * @namespace ScrollAnimations
 * @description Logic for triggering animations on scroll.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the element is visible
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }
    });
})();

/**
 * @namespace NewsletterForm
 * @description Logic for the newsletter form validation.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const newsletterForm = document.querySelector('.footer-form');
        if (!newsletterForm) return;

        const emailInput = newsletterForm.querySelector('input[type="email"]');

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                emailInput.classList.add('error');
                // You might want to show an error message to the user as well
                console.error('Invalid email address');
            } else {
                emailInput.classList.remove('error');
                // Here you would typically send the email to your server
                console.log(`Email submitted: ${email}`);
                // Clear the input after successful submission
                emailInput.value = '';
            }
        });
    });
})();