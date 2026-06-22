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
  const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const sections = links
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute('href')),
    }))
    .filter((item) => item.section);

  if (!links.length || !sections.length) return;

  function setActive(activeId) {
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  }

  function getOffset() {
    const header = document.querySelector('.site-header');
    return (header ? header.offsetHeight : 72) + 72;
  }

  function updateActiveLink() {
    const position = window.scrollY + getOffset();
    let activeId = '';

    sections.forEach(({ section }) => {
      if (section.offsetTop <= position) {
        activeId = section.id;
      }
    });

    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (nearBottom) {
      activeId = sections[sections.length - 1].section.id;
    }

    setActive(activeId);
  }

  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      updateActiveLink();
      ticking = false;
    });
    ticking = true;
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      setActive(link.getAttribute('href').slice(1));
    });
  });

  updateActiveLink();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();
