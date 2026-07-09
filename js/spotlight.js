// spotlight.js — Signature interaction: background glow blobs subtly
// shift position/opacity based on scroll depth and section, so the
// lighting feels reactive to content rather than purely decorative.
export function initSpotlight() {
  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let ticking = false;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0; // 0 -> 1

    // Each blob drifts at a different rate/direction to feel alive
    blobs[0].style.transform = `translate(${progress * 6}vw, ${progress * -10}vh)`;
    if (blobs[1]) blobs[1].style.transform = `translate(${progress * -8}vw, ${progress * 12}vh)`;
    if (blobs[2]) blobs[2].style.transform = `translate(${progress * 5}vw, ${progress * -8}vh)`;

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
}
