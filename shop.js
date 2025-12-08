'use strict';

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

        const allProducts = [
            {
                name: '10% Niacinamide + HA',
                price: 'RM 62.00',
                imageUrl: 'images/Products/10HA_04-1200x1600.jpg',
                hoverImageUrl: 'images/Products/10HA_02-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: '100% Squalane Oil',
                price: 'RM 68.00',
                imageUrl: 'images/Products/100SqualaneOil_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/100SqualaneOil_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: '10% Mandelic Acid + PHA',
                price: 'RM 68.00',
                imageUrl: 'images/Products/10Mandelic Acid01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/10Mandelic Acid02-1200x1600.jpg',
                link: 'product.html',
                category: 'essence-toner'
            },
            {
                name: '18% Ethyl Ascorbic Acid',
                price: 'RM 88.00',
                imageUrl: 'images/Products/18EAA_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/18EAA_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: '2% Salicylic Acid + Tea Tree Oil',
                price: 'RM 58.00',
                imageUrl: 'images/Products/2BHA_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/2BHA_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: '2% Alpha Arbutin + 3% Tranexamic Acid',
                price: 'RM 68.00',
                imageUrl: 'images/Products/2AA_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/2AA_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: '5% Niacinamide + 2% Alpha Arbutin Toner',
                price: 'RM 68.00',
                imageUrl: 'images/Products/AAToner_03-1200x1600.jpg',
                hoverImageUrl: 'images/Products/AAToner_05-1200x1600.jpg',
                link: 'product.html',
                category: 'essence-toner'
            },
            {
                name: '6% Hyaluronic Acid + 2% Vitamin B5',
                price: 'RM 68.00',
                imageUrl: 'images/Products/6HA_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/6HA_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: 'Ceramic Skin Saviour Moisturizer',
                price: 'RM 88.00',
                imageUrl: 'images/Products/CeramicCream_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/CeramicCream_03-1200x1600.jpg',
                link: 'product.html',
                category: 'moisturizer'
            },
            {
                name: 'Gentle Fresh Cleansing Gel',
                price: 'RM 50.00',
                imageUrl: 'images/Products/CleansingGel_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/CleansingGel_03-1200x1600.jpg',
                link: 'product.html',
                category: 'cleanser'
            },
            {
                name: 'Niacinamide Hydra Gel Moisturizer',
                price: 'RM 78.00',
                imageUrl: 'images/Products/NiaGelCream_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/NiaGelCream_03-1200x1600.jpg',
                link: 'product.html',
                category: 'moisturizer'
            },
            {
                name: 'Niacinamide Polypeptide Amino-arbutin Essence',
                price: 'RM 78.00',
                imageUrl: 'images/Products/NPAA_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/NPAA_03-1200x1600.jpg',
                link: 'product.html',
                category: 'essence-toner'
            },
            {
                name: 'Oat Panthenol Probiotic Essence',
                price: 'RM 78.00',
                imageUrl: 'images/Products/OatPanthenol_03-1200x1600.jpg',
                hoverImageUrl: 'images/Products/OatPanthenol_05-1200x1600.jpg',
                link: 'product.html',
                category: 'essence-toner'
            },
            {
                name: 'PHA Clarifying Liquid Exfoliant',
                price: 'RM 68.00',
                imageUrl: 'images/Products/PHALiquid_03-1200x1600.jpg',
                hoverImageUrl: 'images/Products/PHALiquid_05-1200x1600.jpg',
                link: 'product.html',
                category: 'essence-toner'
            },
            {
                name: 'Retinal Beginner',
                price: 'RM 78.00',
                imageUrl: 'images/Products/Crystal Beginner_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/Crystal Beginner_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: 'Retinal Expert',
                price: 'RM 88.00',
                imageUrl: 'images/Products/Crystal Expert_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/Crystal Expert_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: 'Retinal Pro',
                price: 'RM 98.00',
                imageUrl: 'images/Products/Crystal Pro_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/Crystal Pro_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: 'Multi-peptide Dark Circle + Eye Bag Serum',
                price: 'RM 78.00',
                imageUrl: 'images/Products/DarkCircle_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/DarkCircle_03-1200x1600.jpg',
                link: 'product.html',
                category: 'booster-drop'
            },
            {
                name: 'Turn On The Light! Body Moisturiser',
                price: 'RM 58.00',
                imageUrl: 'images/Products/Turn_01-1200x1600.jpg',
                hoverImageUrl: 'images/Products/Turn_03-1200x1600.jpg',
                link: 'product.html',
                category: 'moisturizer'
            },
            {
                name: 'Ruruberry Tote Bag',
                price: 'RM 35.00',
                imageUrl: 'images/Products/ToteBag-1200x1600.jpg',
                hoverImageUrl: 'images/Products/ToteBag-1200x1600.jpg',
                link: 'product.html',
                category: 'lifestyle-collection'
            },
            {
                name: 'Ruruberry Tumbler',
                price: 'RM 45.00',
                imageUrl: 'images/Products/Tumbler-1200x1600.jpg',
                hoverImageUrl: 'images/Products/Tumbler-1200x1600.jpg',
                link: 'product.html',
                category: 'lifestyle-collection'
            },
            {
                name: 'Pump for Cleansing Gel',
                price: 'RM 5.00',
                imageUrl: 'images/Products/Pump-1200x1600.jpg',
                hoverImageUrl: 'images/Products/Pump6-1200x1600.jpg',
                link: 'product.html',
                category: 'lifestyle-collection'
            },
        ];

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
