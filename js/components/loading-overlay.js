/**
 * @namespace LoadingOverlay
 * @description Logic for the loading overlay animation.
 */
export function initLoadingOverlay() {
    const loadingOverlay = document.querySelector('.loading-overlay');

    if (loadingOverlay) {
        // Hide the overlay once all page content is fully loaded
        window.addEventListener('load', () => {
            loadingOverlay.classList.add('hidden');
        });

        // As a failsafe, hide the overlay after a timeout in case the load event is excessively delayed
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 8000); // 8-second failsafe
    }
}
