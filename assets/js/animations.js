/**
 * GRACA BUILDSYS LLP - Additional Animations
 */

(function () {
  'use strict';

  function initHoverCards() {
    document.querySelectorAll('.hover-lift').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
    });
  }

  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });
      images.forEach((img) => observer.observe(img));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHoverCards();
    initLazyLoad();
  });
})();
