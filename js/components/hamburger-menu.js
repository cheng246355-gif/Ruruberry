import { waitForElement } from '../utils.js';

/**
 * @namespace HamburgerMenu
 * @description Logic for the hamburger menu component.
 */
export async function initHamburgerMenu() {
    const hamburgerMenu = await waitForElement('.hamburger-menu');
    const navMenu = await waitForElement('.nav-menu');
    const headerControls = await waitForElement('.header-controls');
    const headerIcons = await waitForElement('.header-icons');

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
