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
        this.navMenu = null;
        this.hamburgerBtn = null;
        this.headerIcons = null;
        this.headerControls = null;
        this.searchBtn = null;
        this.searchContainer = null;
        this.searchInput = null;
        this.debouncedHandleScroll = this.debouncedHandleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    connectedCallback() {
        const rootPath = this.getAttribute('root-path') || './';

        this.innerHTML = `
            <header>
                <div class="logo">
                    <a href="${rootPath}index.html">
                    <img class="logo-img" src="${rootPath}images/Logo/RuruberryLogo_Normal Size-1000x189.png" alt="RuRuBerry Logo">
                    </a>
                </div>
                <nav>
                    <ul class="nav-menu" id="main-nav">
                        <li><a href="${rootPath}about-us.html">About Us</a></li>
                        <li><a href="${rootPath}shop.html">Shop</a></li>
                        <li><a href="${rootPath}ru-press.html">Ru-PRESS</a></li>
                        <li><a href="${rootPath}contact.html">Contact</a></li>
                    </ul>
                </nav>
                <div class="header-controls">
                    <div class="header-icons">
                        <a href="${rootPath}account.html"><span class="material-symbols-outlined" aria-hidden="true">account_circle</span></a>
                        <a href="${rootPath}contact.html#retailers-section"><span class="material-symbols-outlined" aria-hidden="true">location_on</span></a>
                        <button class="header-icon-btn search-toggle" aria-label="Toggle search">
                            <span class="material-symbols-outlined" aria-hidden="true">search</span>
                        </button>
                    </div>
                    <div class="header-btn-container">
                        <a href="${rootPath}quiz.html" class="btn-secondary header-quiz-btn">Skin Quiz</a>
                    </div>
                    <button class="hamburger-menu" aria-label="Toggle navigation menu" aria-controls="main-nav" aria-expanded="false">
                        <i class="ph-bold ph-list" aria-hidden="true"></i>
                    </button>
                    
                    <div class="header-search-container" aria-hidden="true">
                        <form class="header-search-form" action="${rootPath}shop.html">
                            <input type="text" name="search" class="header-search-input" placeholder="Search products..." autocomplete="off">
                            <button type="submit" class="header-search-submit" aria-label="Search">
                                <span class="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        `;

        this.header = this.querySelector('header');
        this.navMenu = this.querySelector('.nav-menu');
        this.hamburgerBtn = this.querySelector('.hamburger-menu');
        this.headerIcons = this.querySelector('.header-icons');
        this.headerControls = this.querySelector('.header-controls');
        this.searchBtn = this.querySelector('.search-toggle');
        this.searchContainer = this.querySelector('.header-search-container');
        this.searchInput = this.querySelector('.header-search-input');

        // Add event listeners
        window.addEventListener('scroll', this.debouncedHandleScroll);
        window.addEventListener('resize', this.handleResize);

        if (this.hamburgerBtn) {
            this.hamburgerBtn.addEventListener('click', this.handleHamburgerClick);
        }

        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', this.toggleSearch);
        }

        const searchForm = this.querySelector('.header-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', this.handleSearchSubmit);
        }

        // Close search on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchContainer.classList.contains('active')) {
                this.toggleSearch();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (this.searchContainer.classList.contains('active') &&
                !this.headerControls.contains(e.target)) {
                this.toggleSearch();
            }
        });

        // Initial check for resize logic
        this.handleResize();
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.debouncedHandleScroll);
        window.removeEventListener('resize', this.handleResize);
        if (this.hamburgerBtn) {
            this.hamburgerBtn.removeEventListener('click', this.handleHamburgerClick);
        }
        if (this.searchBtn) {
            this.searchBtn.removeEventListener('click', this.toggleSearch);
        }
    }

    toggleSearch(e) {
        if (e) e.preventDefault();
        const isActive = this.searchContainer.classList.toggle('active');
        this.searchContainer.setAttribute('aria-hidden', !isActive);

        if (isActive) {
            setTimeout(() => this.searchInput.focus(), 100);
            this.searchBtn.classList.add('active');
        } else {
            this.searchBtn.classList.remove('active');
        }
    }

    handleSearchSubmit(e) {
        // Form submission is handled natively by the action attribute, 
        // effectively redirecting to shop.html?search=value
        // We just ensure we don't preventDefault unless validation fails (which we don't have here)
    }

    handleHamburgerClick() {
        if (!this.navMenu || !this.hamburgerBtn) return;

        const isExpanded = this.navMenu.classList.toggle('nav-active');
        this.hamburgerBtn.setAttribute('aria-expanded', isExpanded);

        // Optional: Change icon based on state
        const icon = this.hamburgerBtn.querySelector('i');
        if (icon) {
            if (isExpanded) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        }
    }

    handleResize() {
        if (!this.headerIcons || !this.navMenu || !this.headerControls || !this.hamburgerBtn) return;

        if (window.innerWidth <= 1024) {
            // Move icons to nav menu on mobile
            if (!this.navMenu.contains(this.headerIcons)) {
                this.navMenu.appendChild(this.headerIcons);
            }
        } else {
            // Move icons back to header controls on desktop
            if (!this.headerControls.contains(this.headerIcons)) {
                this.headerControls.insertBefore(this.headerIcons, this.hamburgerBtn);
            }

            // Ensure menu is closed when resizing to desktop
            if (this.navMenu.classList.contains('nav-active')) {
                this.navMenu.classList.remove('nav-active');
                this.hamburgerBtn.setAttribute('aria-expanded', 'false');
                const icon = this.hamburgerBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        }
    }

    // Debounced scroll handler
    debouncedHandleScroll = debounce(this.handleScroll.bind(this), 10);

    handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > this.lastScrollTop && currentScrollTop > 100) {
            // Scrolling down and scrolled past 100px
            this.header.classList.add('header-hide');

            // Close search if open when scrolling down
            if (this.searchContainer && this.searchContainer.classList.contains('active')) {
                this.toggleSearch();
            }
        } else {
            // Scrolling up or near the top
            this.header.classList.remove('header-hide');
        }
        this.lastScrollTop = currentScrollTop;
    }
}
customElements.define("t-header", THeader);
