/**
 * @namespace HamburgerMenu
 * @description Logic for the hamburger menu component.
 */
export function initHamburgerMenu() {
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
}
