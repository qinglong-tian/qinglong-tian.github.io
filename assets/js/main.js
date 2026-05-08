/* ── Dark Mode ── */
(function () {
  const STORAGE_KEY = 'theme';
  const DARK_CLASS = 'dark';

  function getTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Apply immediately to prevent flash
  setTheme(getTheme());

  // Expose toggle globally
  window.toggleTheme = function () {
    const next = document.documentElement.classList.contains(DARK_CLASS) ? 'light' : 'dark';
    setTheme(next);
  };
})();

/* ── Scroll-triggered reveal animations ── */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ── Nav scroll state ── */
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ── Mobile nav toggle ── */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    hamburger.classList.toggle('open', !isOpen);
    mobileNav.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Active nav link tracking ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -40px 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();
