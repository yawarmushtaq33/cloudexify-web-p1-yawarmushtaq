// contactForm.js — Client-side validation for the contact form.
// No backend exists yet, so a valid submission just shows a success
// message and resets the form (per the project brief).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  // Mark fields as "touched" only after a first blur, so invalid styling
  // doesn't appear before the user has had a chance to type anything.
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => field.setAttribute('data-touched', 'true'));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailIsValid = EMAIL_PATTERN.test(email);

    if (!name || !emailIsValid || !message) {
      form.querySelectorAll('input, textarea').forEach((field) => field.setAttribute('data-touched', 'true'));
      showStatus('Please fill all fields with a valid email.', 'error');
      return;
    }

    // No backend yet — acknowledge the message locally instead.
    showStatus('Thanks! Your message has been noted. I\u2019ll get back to you soon.', 'success');
    form.reset();
    form.querySelectorAll('input, textarea').forEach((field) => field.removeAttribute('data-touched'));
  });

  function showStatus(message, type) {
    status.textContent = message;
    status.classList.remove('is-error', 'is-success');
    status.classList.add(type === 'error' ? 'is-error' : 'is-success');
  }
}
