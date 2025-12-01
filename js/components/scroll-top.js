/**
 * @namespace TReturnToTop
 * @description Custom element for a return to top button.
 */
export class TReturnToTop extends HTMLElement {
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
