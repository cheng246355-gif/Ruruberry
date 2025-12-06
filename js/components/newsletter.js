import { waitForElement } from '../utils.js';

/**
 * @namespace NewsletterForm
 * @description Logic for the newsletter form validation.
 */
export async function initNewsletterForm() {
    const newsletterForm = await waitForElement('.footer-form');
    if (!newsletterForm) return;

    const emailInput = newsletterForm.querySelector('input[type="email"]');

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            emailInput.classList.add('error');
            // You might want to show an error message to the user as well
            console.error('Invalid email address');
        } else {
            emailInput.classList.remove('error');
            // Here you would typically send the email to your server
            console.log(`Email submitted: ${email}`);
            // Clear the input after successful submission
            emailInput.value = '';
        }
    });
}
