/**
 * @namespace TFooter
 * @description Custom element for the footer of the page.
 */
export class TFooter extends HTMLElement {
    connectedCallback() {
        const rootPath = this.getAttribute('root-path') || './';

        this.innerHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-top">
                <!-- Left Column - Links -->
                <div class="footer-links">
                    <ul>
                        <li><a href="${rootPath}about-us.html">About Us</a></li>
                        <li><a href="${rootPath}shop.html">Shop</a></li>
                        <li><a href="${rootPath}ru-press.html">Ru-PRESS</a></li>
                        <li><a href="${rootPath}contact.html">Contact</a></li>
                        <li><a href="${rootPath}account.html">My Account</a></li>
                    </ul>
                </div>
                
                <!-- Right Column - Stay Updated -->
                <div class="footer-stay-updated">
                    <h4>Stay Updated</h4>
                    <p>Sign up to receive our promotions and news</p>
                    <form class="footer-form">
                        <div class="form-group">
                            <input type="email" placeholder="Enter your email">
                            <button type="submit" class="btn-subscribe">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="footer-middle">
                <!-- Logo and Brand -->
                <div class="footer-brand">
                    <div class="logo">
                        <img class="logo-img" src="${rootPath}images/Logo/RuruberryLogo_Normal Size-1000x189.png" alt="RuRuBerry Logo" loading="lazy">
                    </div>
                    <p class="brand-tagline">Rudiment. Progress. Perfection</p>
                </div>
                
                <!-- Right - Social Icons -->
                <div class="social-icons">
                    <a href="https://www.facebook.com/ruruberry.official/" target="_blank"><i class="ph-bold ph-facebook-logo" aria-hidden="true"></i></a>
                    <a href="https://www.instagram.com/ruruberry.official/" target="_blank"><i class="ph-bold ph-instagram-logo" aria-hidden="true"></i></a>
                </div>
            </div>

            <div class="footer-bottom-container">
                <div class="footer-bottom">
                    <!-- Left - Payment Icons -->
                    <div class="payment-icons">
                        <img src="${rootPath}images/cc-visa.svg" alt="Visa">
                        <img src="${rootPath}images/mastercard.svg" alt="Mastercard">
                    </div>
                    <!-- Right - Copyright -->
                    <div class="copyright">© Copyright by Chong You Cheng 2025</div>
                </div>
            </div>
        </div>
    </footer>
     `;
    }
}
customElements.define("t-footer", TFooter);
