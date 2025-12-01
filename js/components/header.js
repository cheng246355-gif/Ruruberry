import { debounce } from '../utils.js';

/**
 * @namespace THeader
 * @description Custom element for the header of the page.
 */
export class THeader extends HTMLElement {
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
