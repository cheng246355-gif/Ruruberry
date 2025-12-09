'use strict';
import { allProducts } from './js/products.js';

/**
 * @namespace ShopProductGrid
 * @description Logic for dynamically loading product cards in the shop page with infinite scrolling.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const productGrid = document.getElementById('product-grid');
        const template = document.getElementById('product-card-template');

        if (!productGrid || !template) {
            return;
        }



        let currentPage = 1;
        const pageSize = 8;
        let isLoading = false;
        let currentCategory = 'all';
        let currentSearchQuery = '';

        function getFilteredProducts() {
            return allProducts.filter(product => {
                const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
                const matchesSearch = product.name.toLowerCase().includes(currentSearchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });
        }

        function loadProducts() {
            if (isLoading) return;
            isLoading = true;

            // Filter products first
            const filteredProducts = getFilteredProducts();

            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const productsToLoad = filteredProducts.slice(startIndex, endIndex);

            productsToLoad.forEach(product => {
                const clone = document.importNode(template.content, true);

                const link = clone.querySelector('.product-card-link');
                const mainImage = clone.querySelector('.main-image');
                const hoverImage = clone.querySelector('.hover-image');
                const name = clone.querySelector('.product-name');
                const price = clone.querySelector('.product-price');

                link.href = product.link;
                mainImage.src = product.imageUrl;
                mainImage.alt = product.name;

                if (product.hoverImageUrl) {
                    hoverImage.src = product.hoverImageUrl;
                } else {
                    hoverImage.src = product.imageUrl;
                }
                hoverImage.alt = product.name;

                name.textContent = product.name;
                price.textContent = product.price;

                productGrid.appendChild(clone);
            });

            currentPage++;
            isLoading = false;
        }

        function filterProducts(category) {
            currentCategory = category;
            currentPage = 1;
            productGrid.innerHTML = ''; // Clear existing products
            loadProducts();
        }

        // Initialize filter listeners
        const filterLinks = document.querySelectorAll('.category-filters a');
        filterLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Update active state
                filterLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                const category = this.getAttribute('data-category');
                filterProducts(category);
            });
        });

        // Filter Toggle Logic
        const filterToggleBtn = document.getElementById('filter-toggle');
        const filterMenu = document.getElementById('filter-menu');

        if (filterToggleBtn && filterMenu) {
            filterToggleBtn.addEventListener('click', function () {
                filterMenu.classList.toggle('active');
                this.classList.toggle('active'); // Optional: style button when active
            });
        }

        // Search Logic
        const searchInput = document.querySelector('.filter-search input');
        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                currentSearchQuery = e.target.value.trim();
                currentPage = 1;
                productGrid.innerHTML = '';
                loadProducts();
            });
        }

        // Clear Filters Logic
        const clearBtn = document.querySelector('.btn-clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                // Reset category
                currentCategory = 'all';
                filterLinks.forEach(l => l.classList.remove('active'));
                const allLink = document.querySelector('.category-filters a[data-category="all"]');
                if (allLink) allLink.classList.add('active');

                // Reset search
                currentSearchQuery = '';
                if (searchInput) searchInput.value = '';

                // Reload
                currentPage = 1;
                productGrid.innerHTML = '';
                loadProducts();
            });
        }

        // Check for search query in URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');

        if (searchParam) {
            currentSearchQuery = searchParam.trim();
            if (searchInput) {
                searchInput.value = searchParam;
            }
            // Automatically open filter menu on mobile if searching? Maybe not, can be annoying.
            // But we should show that filters are active.
        }

        // Initial load
        loadProducts();

        // Load more on scroll
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                // Check if there are more products to load for the current category
                const filteredProducts = getFilteredProducts();

                if ((currentPage - 1) * pageSize < filteredProducts.length) {
                    loadProducts();
                }
            }
        });
    });
})();
