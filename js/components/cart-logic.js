import { addToCart } from '../cart.js';

/**
 * Initializes the 'Buy It Now' button functionality on product pages.
 */
export function initCartLogic() {
    const buyBtn = document.querySelector('.btn-buy-it-now');

    if (!buyBtn) return;

    buyBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Scrape Product Details
        const nameElement = document.querySelector('.product-purchase-details h1');
        const priceElement = document.querySelector('.product-purchase-details .price');
        const imageElement = document.querySelector('#main-product-image');

        if (!nameElement || !priceElement) {
            console.error('Product details not found');
            return;
        }

        const name = nameElement.textContent.trim();
        const priceString = priceElement.textContent.trim(); // e.g., "RM 62.00"

        // Clean price string to get number
        const price = parseFloat(priceString.replace(/[^0-9.]/g, ''));

        const image = imageElement ? imageElement.src : '';

        const item = {
            name: name,
            price: price, // Store as number
            displayPrice: priceString,
            image: image,
            quantity: 1
        };

        // 2. Add to Cart
        addToCart(item);

        // 3. Redirect to Account Page Cart Section
        // Determine path based on current location (root vs products subdirectory)
        const currentPath = window.location.pathname;
        const isProductSubdir = currentPath.includes('/products/');
        const accountPath = isProductSubdir ? '../account.html#cart' : 'account.html#cart';

        window.location.href = accountPath;
    });
}
