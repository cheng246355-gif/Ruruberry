/**
 * @namespace HeroSlider
 * @description Logic for the hero slider component.
 */
export function initHeroSlider() {
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
}

/**
 * @namespace TestimonialsSlider
 * @description Logic for the testimonials slider component.
 */
export function initTestimonialsSlider() {
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
}

/**
 * @namespace BestsellersSlider
 * @description Logic for the bestsellers product card slider.
 */
export function initBestsellersSlider() {
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
}
