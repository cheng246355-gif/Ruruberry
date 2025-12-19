import { getCart, removeFromCart, clearCart } from '../cart.js';

export function initAccountCart() {
    const cartContainer = document.getElementById('cart');
    if (!cartContainer) return;

    const renderCart = () => {
        const cart = getCart();
        cartContainer.innerHTML = '<h2>My Cart</h2>'; // Reset header

        if (cart.length === 0) {
            cartContainer.innerHTML += `
                <p>Your cart is currently empty.</p>
                <a href="shop.html" class="btn-primary">Start Shopping</a>
            `;
            return;
        }

        const cartList = document.createElement('div');
        cartList.className = 'cart-list';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.displayPrice}</p>
                    <button class="btn-remove" data-name="${item.name}">Remove</button>
                </div>
            `;
            cartList.appendChild(cartItem);
        });

        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `
            <h3>Total: RM ${total.toFixed(2)}</h3>
        `;

        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'btn-primary btn-checkout';
        checkoutBtn.textContent = 'Complete Purchase';
        checkoutBtn.style.marginTop = '20px';

        cartContainer.appendChild(cartList);
        cartContainer.appendChild(totalElement);
        cartContainer.appendChild(checkoutBtn);

        // Event Listeners
        // Remove Buttons
        cartContainer.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                removeFromCart(name);
                renderCart(); // Re-render logic
            });
        });

        // Checkout Button
        cartContainer.querySelector('.btn-checkout').addEventListener('click', () => {
            showThankYouModal();
            clearCart();
            renderCart();
        });
    };

    renderCart();
}

function showThankYouModal() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.classList.add('active');

        // Setup close logic
        const closeBtn = modal.querySelector('.btn-close-modal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.classList.remove('active');
            };
        }

        // Close on background click
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        }
    }
}
