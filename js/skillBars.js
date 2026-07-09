// skillBars.js — Animates skill bar fills only once, when scrolled into view
export function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level || '0';
          const fill = bar.querySelector('.skill-bar__fill');
          fill.style.setProperty('--fill', `${level}%`);
          bar.classList.add('is-visible');
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}
