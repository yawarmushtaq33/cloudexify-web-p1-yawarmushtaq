// scrollReveal.js — Fades/slides elements in as they enter the viewport
export function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((item, i) => {
    // Slight stagger for elements revealed in the same batch
    item.style.transitionDelay = `${(i % 4) * 60}ms`;
    observer.observe(item);
  });
}
