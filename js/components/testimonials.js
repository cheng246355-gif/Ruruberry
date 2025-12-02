/**
 * @namespace TTestimonials
 * @description Custom element for the testimonials section.
 */
class TTestimonials extends HTMLElement {
    constructor() {
        super();
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.scrollNext = this.scrollNext.bind(this);
        this.scrollPrev = this.scrollPrev.bind(this);
    }

    connectedCallback() {
        this.innerHTML = `
            <section class="testimonials">
                <h2>What Our Customers Say</h2>
                <p class="testimonials-subtitle">Real reviews from Google Maps</p>
                <div class="testimonials-container">
                    <button class="testimonial-arrow prev" aria-label="Previous testimonial"><i class="ph-bold ph-caret-left"
                            aria-hidden="true"></i></button>
                    <div class="testimonials-slider">
                        <div class="testimonial-card">
                            <div class="stars" role="img" aria-label="5 out of 5 stars">
                                <span aria-hidden="true">★★★★★</span>
                            </div>
                            <p class="testimonial-text">"I really enjoyed using this serum. I've been using this product for a while now and I have been really happy with the results. First it applies very easily and is light weight, absorbs into my skin well, and works well in the morning or …"</p>
                            <cite class="testimonial-author">Candice Lim</cite>
                        </div>
                        <div class="testimonial-card">
                            <div class="stars" role="img" aria-label="5 out of 5 stars">
                                <span aria-hidden="true">★★★★★</span>
                            </div>
                            <p class="testimonial-text">"Bought this as my second bottle. Masa first time pakai dulu rasa sticky kemudian i tukar my skincare routine to suit this one. Match with watery toner then my skin love it! One tip i nak share for fast absorbing try gosok in circle motion, jangan dab dab. Semoga ia membantu. Lets get healthy skin with Ruruberry 💛 …"</p>
                            <cite class="testimonial-author">Athirah Medan</cite>
                        </div>
                        <div class="testimonial-card">
                            <div class="stars" role="img" aria-label="5 out of 5 stars">
                                <span aria-hidden="true">★★★★★</span>
                            </div>
                            <p class="testimonial-text">"I like this serum. It has no smell and helps to moisturize my skin. It is lightweight and not sticky at all. Thank you kechee for assistance me."</p>
                            <cite class="testimonial-author">Bai_2112</cite>
                        </div>
                        <div class="testimonial-card">
                            <div class="stars" role="img" aria-label="5 out of 5 stars">
                                <span aria-hidden="true">★★★★★</span>
                            </div>
                            <p class="testimonial-text">"Recently bought their Niacinamide 10% + HA. For oily skin peeps, a drop or two during the day & three drops during the night is moisturizing enough. Leave no weird-chemical-ly smell. Dries down semi-matte.  Fungal acne safe, (checked the …"</p>
                            <cite class="testimonial-author">Nabilah Superto</cite>
                        </div>
                        <div class="testimonial-card">
                            <div class="stars" role="img" aria-label="5 out of 5 stars">
                                <span aria-hidden="true">★★★★★</span>
                            </div>
                            <p class="testimonial-text">"First time trying niacinamide serum, and I have been using for 3 days. I feel some irritation in one small area (maybe because of new to this serum) in the first time only, and I only use one drop of it combine with my moisturizer.  Can't wait to see the effect after finishing this bottle."</p>
                            <cite class="testimonial-author">StacyLeong</cite>
                        </div>
                    </div>
                    <button class="testimonial-arrow next" aria-label="Next testimonial"><i class="ph-bold ph-caret-right"
                            aria-hidden="true"></i></button>
                </div>
            </section>
        `;

        this.slider = this.querySelector('.testimonials-slider');
        this.prevButton = this.querySelector('.testimonial-arrow.prev');
        this.nextButton = this.querySelector('.testimonial-arrow.next');

        if (this.nextButton) {
            this.nextButton.addEventListener('click', this.scrollNext);
        }
        if (this.prevButton) {
            this.prevButton.addEventListener('click', this.scrollPrev);
        }

        if (this.slider) {
            this.slider.addEventListener('touchstart', this.handleTouchStart);
            this.slider.addEventListener('touchmove', this.handleTouchMove);
            this.slider.addEventListener('touchend', this.handleTouchEnd);
        }
    }

    disconnectedCallback() {
        if (this.nextButton) {
            this.nextButton.removeEventListener('click', this.scrollNext);
        }
        if (this.prevButton) {
            this.prevButton.removeEventListener('click', this.scrollPrev);
        }
        if (this.slider) {
            this.slider.removeEventListener('touchstart', this.handleTouchStart);
            this.slider.removeEventListener('touchmove', this.handleTouchMove);
            this.slider.removeEventListener('touchend', this.handleTouchEnd);
        }
    }

    scrollAmount() {
        const firstCard = this.slider.querySelector('.testimonial-card');
        return firstCard ? firstCard.offsetWidth + 30 : 300;
    }

    scrollNext() {
        this.slider.scrollBy({ left: this.scrollAmount(), behavior: 'smooth' });
    }

    scrollPrev() {
        this.slider.scrollBy({ left: -this.scrollAmount(), behavior: 'smooth' });
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        this.touchEndX = e.touches[0].clientX;
    }

    handleTouchEnd() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (swipeDistance > swipeThreshold) {
            this.scrollPrev();
        } else if (swipeDistance < -swipeThreshold) {
            this.scrollNext();
        }
        this.touchStartX = 0;
        this.touchEndX = 0;
    }
}
customElements.define("t-testimonials", TTestimonials);
