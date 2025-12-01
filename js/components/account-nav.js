/**
 * @namespace AccountPage
 * @description Logic for the account page navigation.
 */
export function initAccountNav() {
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
            link.addEventListener('click', function (e) {
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
}
