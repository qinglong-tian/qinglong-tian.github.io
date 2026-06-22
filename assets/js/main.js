(function () {
  const storageKey = 'theme';
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');

  function setTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    localStorage.setItem(storageKey, theme);
    if (toggle) toggle.setAttribute('aria-pressed', String(isDark));
  }

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(root.classList.contains('dark')));
    toggle.addEventListener('click', () => {
      setTheme(root.classList.contains('dark') ? 'light' : 'dark');
    });
  }
})();

(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 8);
    ticking = false;
  }

  updateHeader();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
})();

(function () {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-nav');
  if (!button || !menu) return;

  function setOpen(isOpen) {
    button.classList.toggle('open', isOpen);
    menu.classList.toggle('open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  button.addEventListener('click', () => {
    setOpen(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
})();

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -56px 0px',
  });

  elements.forEach((element) => observer.observe(element));
})();

(function () {
  const links = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, {
    threshold: [0.18, 0.35, 0.55],
    rootMargin: '-96px 0px -48% 0px',
  });

  sections.forEach((section) => observer.observe(section));
})();
