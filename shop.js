'use strict';

/**
 * @namespace ShopProductGrid
 * @description Logic for dynamically loading product cards in the shop page with infinite scrolling.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
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
                link: 'product.html'
            },
            {
                name: '100% Squalane Oil',
                price: 'RM 68.00',
                imageUrl: 'images/Products/100SqualaneOil_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: '10% Mandelic Acid + PHA',
                price: 'RM 68.00',
                imageUrl: 'images/Products/10Mandelic Acid01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: '18% Ethyl Ascorbic Acid',
                price: 'RM 88.00',
                imageUrl: 'images/Products/18EAA_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: '2% Salicylic Acid + Tea Tree Oil',
                price: 'RM 58.00',
                imageUrl: 'images/Products/2BHA_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: '2% Alpha Arbutin + 3% Tranexamic Acid',
                price: 'RM 68.00',
                imageUrl: 'images/Products/2AA_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: '5% Niacinamide + 2% Alpha Arbutin Toner',
                price: 'RM 68.00',
                imageUrl: 'images/Products/AAToner_03-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: '6% Hyaluronic Acid + 2% Vitamin B5',
                price: 'RM 68.00',
                imageUrl: 'images/Products/6HA_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Ceramic Skin Saviour Moisturizer',
                price: 'RM 88.00',
                imageUrl: 'images/Products/CeramicCream_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Gentle Fresh Cleansing Gel',
                price: 'RM 50.00',
                imageUrl: 'images/Products/CleansingGel_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Niacinamide Hydra Gel Moisturizer',
                price: 'RM 78.00',
                imageUrl: 'images/Products/NiaGelCream_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Niacinamide Polypeptide Amino-arbutin Essence',
                price: 'RM 78.00',
                imageUrl: 'images/Products/NPAA_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Oat Panthenol Probiotic Essence',
                price: 'RM 78.00',
                imageUrl: 'images/Products/OatPanthenol_03-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'PHA Clarifying Liquid Exfoliant',
                price: 'RM 68.00',
                imageUrl: 'images/Products/PHALiquid_03-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Retinal Beginner',
                price: 'RM 78.00',
                imageUrl: 'images/Products/Crystal Beginner_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Retinal Expert',
                price: 'RM 88.00',
                imageUrl: 'images/Products/Crystal Expert_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Retinal Pro',
                price: 'RM 98.00',
                imageUrl: 'images/Products/Crystal Pro_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Multi-peptide Dark Circle + Eye Bag Serum',
                price: 'RM 78.00',
                imageUrl: 'images/Products/DarkCircle_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Turn On The Light! Body Moisturiser',
                price: 'RM 58.00',
                imageUrl: 'images/Products/Turn_01-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Ruruberry Tote Bag',
                price: 'RM 35.00',
                imageUrl: 'images/Products/ToteBag-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Ruruberry Tumbler',
                price: 'RM 45.00',
                imageUrl: 'images/Products/Tumbler-1200x1600.jpg',
                link: 'product.html'
            },
            {
                name: 'Pump for Cleansing Gel',
                price: 'RM 5.00',
                imageUrl: 'images/Products/Pump-1200x1600.jpg',
                link: 'product.html'
            },
        ];

        let currentPage = 1;
        const pageSize = 8;
        let isLoading = false;

        function loadProducts() {
            if (isLoading) return;
            isLoading = true;

            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const productsToLoad = allProducts.slice(startIndex, endIndex);

            productsToLoad.forEach(product => {
                const clone = document.importNode(template.content, true);
                
                const link = clone.querySelector('.product-card-link');
                const image = clone.querySelector('.product-card-image');
                const name = clone.querySelector('.product-name');
                const price = clone.querySelector('.product-price');

                link.href = product.link;
                image.src = product.imageUrl;
                image.alt = product.name;
                name.textContent = product.name;
                price.textContent = product.price;

                productGrid.appendChild(clone);
            });

            currentPage++;
            isLoading = false;
        }

        // Initial load
        loadProducts();

        // Load more on scroll
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                loadProducts();
            }
        });
    });
})();
