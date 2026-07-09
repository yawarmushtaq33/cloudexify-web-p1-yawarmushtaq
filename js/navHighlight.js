// navHighlight.js — Highlights the active nav link based on scroll position,
// and handles the mobile menu open/close state.
export function initNavHighlight() {
  const links = document.querySelectorAll('[data-nav]');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          links.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  // Mobile menu toggle
  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  function closeMobileMenu() {
    navMenu?.classList.remove('is-open');
    navToggle?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open menu');
  }

  // Close on Escape (keyboard users shouldn't get stuck in an open menu)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu?.classList.contains('is-open')) {
      closeMobileMenu();
      navToggle?.focus();
    }
  });

  // Close when clicking outside the menu
  document.addEventListener('click', (event) => {
    if (!navMenu?.classList.contains('is-open')) return;
    if (navMenu.contains(event.target) || navToggle?.contains(event.target)) return;
    closeMobileMenu();
  });

  // Close mobile menu after selecting a link
  links.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}
