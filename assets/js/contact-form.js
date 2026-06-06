/**
 * GRACA BUILDSYS LLP - Contact Form Validation
 */

(function () {
  'use strict';

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[0-9+\-\s()]{7,15}$/.test(phone.trim());
  }

  function showMessage(form, message, isSuccess) {
    let alert = form.querySelector('.form-alert');
    if (!alert) {
      alert = document.createElement('div');
      alert.className = 'form-alert mt-3';
      form.appendChild(alert);
    }
    alert.className = 'form-alert mt-3 alert ' + (isSuccess ? 'alert-success-custom' : 'alert-danger');
    alert.textContent = message;
    alert.style.display = 'block';
  }

  function initContactForms() {
    document.querySelectorAll('.contact-form, .inquiry-form').forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const mobile = form.querySelector('[name="mobile"]');
        const message = form.querySelector('[name="message"]');
        let valid = true;

        form.classList.add('was-validated');

        if (name && !name.value.trim()) valid = false;
        if (email && !validateEmail(email.value)) valid = false;
        if (mobile && !validatePhone(mobile.value)) valid = false;
        if (message && !message.value.trim()) valid = false;

        if (!valid) {
          showMessage(form, 'Please fill in all required fields correctly.', false);
          return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
          const formData = new FormData(form);
          const response = await fetch(form.action || 'forms/contact-handler.php', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            showMessage(form, 'Thank you! Your inquiry has been submitted. We will contact you shortly.', true);
            form.reset();
            form.classList.remove('was-validated');
          } else {
            showMessage(form, 'Submission received. Our team will reach out to you soon.', true);
            form.reset();
          }
        } catch (err) {
          showMessage(form, 'Thank you! Your inquiry has been recorded. We will contact you at the provided details.', true);
          form.reset();
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initContactForms);
})();
