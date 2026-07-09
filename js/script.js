// script.js — Entry point. Wires up every interactive module.
import { initTheme } from './theme.js';
import { initTypewriter } from './typewriter.js';
import { initScrollReveal } from './scrollReveal.js';
import { initSkillBars } from './skillBars.js';
import { initProjectFilter } from './projectFilter.js';
import { initScrollProgress } from './scrollProgress.js';
import { initNavHighlight } from './navHighlight.js';
import { initSpotlight } from './spotlight.js';
import { initContactForm } from './contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initScrollReveal();
  initSkillBars();
  initProjectFilter();
  initScrollProgress();
  initNavHighlight();
  initSpotlight();
  initContactForm();

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Preloader: hide once the page has settled
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('is-hidden'), 400);
  });
});
