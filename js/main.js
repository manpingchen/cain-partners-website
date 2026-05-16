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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer.classList.contains('is-open')) closeDrawer();
      if (candidateDrawer.classList.contains('is-open')) closeCandidateDrawer();
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

  /* GSAP loads deferred — initialise after window load */
  window.addEventListener('load', initGSAP);
});
