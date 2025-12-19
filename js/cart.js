/**
 * @module Cart
 * @description Utility functions for managing the shopping cart in LocalStorage.
 */

const CART_KEY = 'ruruberry_cart';

/**
 * Retrieves the cart from LocalStorage.
 * @returns {Array} The array of cart items.
 */
export function getCart() {
    const cartJson = localStorage.getItem(CART_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
}

/**
 * Adds an item to the cart.
 * @param {Object} item - The item to add { id, name, price, image, quantity }.
 */
export function addToCart(item) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(i => i.name === item.name); // Using name as ID for now since we don't have unique IDs

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
        cart.push({ ...item, quantity: item.quantity || 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Removes an item from the cart.
 * @param {string} name - The name of the item to remove.
 */
export function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Clears the cart.
 */
export function clearCart() {
    localStorage.removeItem(CART_KEY);
}
