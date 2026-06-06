/**
 * GRACA BUILDSYS LLP - Main JavaScript
 */

(function () {
  'use strict';

  const BASE_PATH = getBasePath();

  function getBasePath() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    if (path.endsWith('/') || !path.includes('.')) return '';
    const segments = path.split('/').filter(Boolean);
    segments.pop();
    return segments.length ? '../'.repeat(segments.length) : '';
  }

  /* Load HTML Includes */
  async function loadIncludes() {
    const includes = document.querySelectorAll('[data-include]');
    const promises = Array.from(includes).map(async (el) => {
      const file = el.getAttribute('data-include');
      try {
        const response = await fetch(BASE_PATH + file);
        if (!response.ok) throw new Error('Failed to load ' + file);
        let html = await response.text();
        html = html.replace(/\{\{BASE\}\}/g, BASE_PATH);
        el.innerHTML = html;
      } catch (err) {
        console.warn('Include load error:', err);
      }
    });
    await Promise.all(promises);
    initAfterIncludes();
  }

  function initAfterIncludes() {
    setActiveNavLink();
    initStickyHeader();
    initMegaMenu();
    initFAQ();
    initNewsletter();
    initSmoothScroll();
  }

  /* Sticky Header */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Active Nav Link */
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* Mega Menu - mobile close on click */
  function initMegaMenu() {
    document.querySelectorAll('.mega-menu-item').forEach((item) => {
      item.addEventListener('click', () => {
        const collapse = document.querySelector('.navbar-collapse.show');
        if (collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(collapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  /* FAQ Accordion */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.classList.contains('active');

        document.querySelectorAll('.faq-question').forEach((q) => {
          q.classList.remove('active');
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.classList.remove('show');
        });

        if (!isOpen) {
          btn.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          answer.classList.add('show');
        }
      });
    });
  }

  /* Scroll Progress */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* Back to Top */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Smooth Scroll */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* Newsletter */
  function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        alert('Thank you for subscribing to GRACA BUILDSYS updates!');
        input.value = '';
      }
    });
  }

  /* Initialize AOS */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: 'mobile'
      });
    }
  }

  /* Initialize Swipers */
  function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    const clientSwiper = document.querySelector('.client-swiper');
    if (clientSwiper) {
      new Swiper('.client-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true },
        speed: 800,
        breakpoints: {
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 6 }
        }
      });
    }

    const testimonialSwiper = document.querySelector('.testimonials-swiper');
    if (testimonialSwiper) {
      new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }
      });
    }
  }

  /* DOM Ready */
  document.addEventListener('DOMContentLoaded', () => {
    loadIncludes();
    initScrollProgress();
    initBackToTop();
    initAOS();
    initSwipers();
  });
})();
