/* ============================================================
   Cain Cranwell Partners — Main JS
   GSAP + ScrollTrigger for parallax & reveal animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Header: add .is-scrolled class on scroll
     ---------------------------------------------------------- */
  const header = document.getElementById('site-header');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ----------------------------------------------------------
     Parallax — wait for GSAP to load (it's deferred)
     ---------------------------------------------------------- */
  const initGSAP = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return; // GSAP not yet loaded — graceful degradation
    }

    gsap.registerPlugin(ScrollTrigger);

    /* Hero image parallax */
    gsap.to('.hero-image', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    /* Parallax break (pool image) */
    gsap.to('.parallax-break__bg', {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-break',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    /* Recruitment images — background-style parallax
       scale: 1.15 gives 7.5% buffer on each side to prevent edge clipping
       fromTo centres the movement so neither edge ever shows              */
    gsap.fromTo('.recruitment-img--wide img',
      { yPercent: -12, scale: 1.15 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.recruitment-img--wide',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );


    /* Contact section BG */
    gsap.to('.contact__bg', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  };

  /* ----------------------------------------------------------
     Scroll-triggered fade-up for .js-fade elements
     Uses IntersectionObserver — no GSAP dependency
     ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.js-fade');

  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     Hamburger → overlay nav toggle
     ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.getElementById('nav-overlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      overlay.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      overlay.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on any overlay link click
    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        overlay.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     Contact Drawer
     ---------------------------------------------------------- */
  const drawer   = document.getElementById('contact-drawer');
  const backdrop = document.getElementById('contact-backdrop');

  const openDrawer = (e) => {
    e.preventDefault();
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    drawer.querySelector('.contact-drawer__close').focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-contact').forEach((el) => {
    el.addEventListener('click', openDrawer);
  });

  document.querySelector('.js-close-contact')?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  /* Candidate drawer */
  const candidateDrawer   = document.getElementById('candidate-drawer');
  const candidateBackdrop = document.getElementById('candidate-backdrop');

  const openCandidateDrawer = (e) => {
    e.preventDefault();
    candidateDrawer.classList.add('is-open');
    candidateBackdrop.classList.add('is-open');
    candidateDrawer.setAttribute('aria-hidden', 'false');
    candidateBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    candidateDrawer.querySelector('.js-close-candidate').focus();
  };

  const closeCandidateDrawer = () => {
    candidateDrawer.classList.remove('is-open');
    candidateBackdrop.classList.remove('is-open');
    candidateDrawer.setAttribute('aria-hidden', 'true');
    candidateBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-candidate').forEach((el) => {
    el.addEventListener('click', openCandidateDrawer);
  });

  document.querySelector('.js-close-candidate')?.addEventListener('click', closeCandidateDrawer);
  candidateBackdrop.addEventListener('click', closeCandidateDrawer);

  /* Mandates drawer */
  const mandatesDrawer   = document.getElementById('mandates-drawer');
  const mandatesBackdrop = document.getElementById('mandates-backdrop');

  const openMandatesDrawer = (e) => {
    e.preventDefault();
    mandatesDrawer.classList.add('is-open');
    mandatesBackdrop.classList.add('is-open');
    mandatesDrawer.setAttribute('aria-hidden', 'false');
    mandatesBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    mandatesDrawer.querySelector('.js-close-mandates').focus();
  };

  const closeMandatesDrawer = () => {
    mandatesDrawer.classList.remove('is-open');
    mandatesBackdrop.classList.remove('is-open');
    mandatesDrawer.setAttribute('aria-hidden', 'true');
    mandatesBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-mandates').forEach((el) => {
    el.addEventListener('click', openMandatesDrawer);
  });
  document.querySelector('.js-close-mandates')?.addEventListener('click', closeMandatesDrawer);
  mandatesBackdrop.addEventListener('click', closeMandatesDrawer);

  /* Mandates accordion */
  document.querySelectorAll('.mandates-group__header').forEach((header) => {
    header.addEventListener('click', () => {
      const group = header.closest('.mandates-group');
      const isOpen = group.classList.toggle('is-open');
      header.setAttribute('aria-expanded', isOpen);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer.classList.contains('is-open')) closeDrawer();
      if (candidateDrawer.classList.contains('is-open')) closeCandidateDrawer();
      if (mandatesDrawer.classList.contains('is-open')) closeMandatesDrawer();
    }
  });

  /* ----------------------------------------------------------
     Smooth anchor scroll for same-page links
     (html { scroll-behavior: smooth } handles most cases,
      this gives extra control over offset for fixed header)
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     Carousels — generic left/right arrow controller
     ---------------------------------------------------------- */
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track   = carousel.querySelector('.carousel__track');
    const btnPrev = carousel.querySelector('.carousel__btn--prev');
    const btnNext = carousel.querySelector('.carousel__btn--next');
    if (!track || !btnPrev || !btnNext) return;

    const scrollBy = (dir) => {
      const first = track.querySelector(':scope > *');
      if (!first) return;
      const itemW = first.getBoundingClientRect().width;
      const gap   = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: dir * (itemW + gap), behavior: 'smooth' });
    };

    const syncBtns = () => {
      btnPrev.disabled = track.scrollLeft <= 1;
      btnNext.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    };

    const checkOverflow = () => {
      const overflows = track.scrollWidth > track.clientWidth + 1;
      carousel.classList.toggle('carousel--scrollable', overflows);
      syncBtns();
    };

    btnPrev.addEventListener('click', () => scrollBy(-1));
    btnNext.addEventListener('click', () => scrollBy(1));
    track.addEventListener('scroll', syncBtns, { passive: true });

    checkOverflow();
    window.addEventListener('resize', checkOverflow, { passive: true });
  });

  /* Logo row fade — assign per-row delay so each grid row animates in sequence */
  requestAnimationFrame(() => {
    const logoItems = document.querySelectorAll('.logos-grid .logo-item.js-fade');
    if (logoItems.length) {
      const rowMap = new Map();
      logoItems.forEach((item) => {
        const top = Math.round(item.getBoundingClientRect().top);
        if (!rowMap.has(top)) rowMap.set(top, []);
        rowMap.get(top).push(item);
      });
      [...rowMap.keys()].sort((a, b) => a - b).forEach((top, rowIndex) => {
        rowMap.get(top).forEach((item) => {
          item.style.setProperty('--fade-delay', `${rowIndex * 120}ms`);
        });
      });
    }
  });

  /* GSAP loads deferred — initialise after window load */
  window.addEventListener('load', initGSAP);
});
