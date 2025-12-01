/**
 * @namespace ProductImageGallery
 * @description Logic for the product image gallery on the product page.
 */
export function initProductImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));

                // Add active class to the clicked thumbnail
                this.classList.add('active');

                // Change the main image src from data attribute
                if (this.dataset.largeSrc) {
                    mainImage.src = this.dataset.largeSrc;
                }
            });
        });
    }
}
