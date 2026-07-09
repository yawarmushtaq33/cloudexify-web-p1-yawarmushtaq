// theme.js — Dark/Light theme toggle with localStorage persistence
const STORAGE_KEY = 'ym-portfolio-theme';

export function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = stored || (prefersLight ? 'light' : 'dark');

  applyTheme(initial);

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  function applyTheme(mode) {
    if (mode === 'light') {
      root.setAttribute('data-theme', 'light');
      toggle.setAttribute('aria-pressed', 'true');
      toggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      root.removeAttribute('data-theme');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }
}
