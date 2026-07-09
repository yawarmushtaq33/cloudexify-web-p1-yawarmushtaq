// scrollProgress.js — Fills a top bar based on how far the page has been scrolled
export function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!bar) return;

  let ticking = false;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    bar.style.width = `${percent}%`;
    bar.setAttribute('aria-valuenow', Math.round(percent));

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('is-visible', scrollTop > 500);
    }
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
