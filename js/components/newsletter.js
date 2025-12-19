import { waitForElement } from '../utils.js';

/**
 * @namespace NewsletterForm
 * @description Logic for the newsletter form validation.
 */
export async function initNewsletterForm() {
    // Wait for footer form as it's dynamically loaded
    await waitForElement('.footer-form');

    const forms = document.querySelectorAll('.newsletter-form, .footer-form');

    forms.forEach(form => setupNewsletterForm(form));
}

function setupNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            emailInput.classList.add('error');
            // Shake animation or visual cue could be added here
        } else {
            emailInput.classList.remove('error');

            // Show success message
            const successMsg = document.createElement('p');
            successMsg.className = 'newsletter-success';
            successMsg.textContent = 'Thank you for subscribing!';

            // Hide form and append message
            form.style.display = 'none';
            form.parentNode.insertBefore(successMsg, form.nextSibling);

            emailInput.value = '';
        }
    });
}
