/**
 * Logic for the Contact Us page.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (contactForm && modal && closeModalBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation (visual only as browser handles required/type check)
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show modal
                modal.classList.add('active');
                contactForm.reset();
            }
        });

        // Close modal logic
        const closeModal = () => {
            modal.classList.remove('active');
        };

        closeModalBtn.addEventListener('click', closeModal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
