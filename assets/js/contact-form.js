/**
 * GRACA BUILDSYS LLP - EmailJS Contact Form
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    // Initialize EmailJS
    emailjs.init({
      publicKey: "z8xVpOHhgUhFs2X4B"
    });

    initContactForms();
  });

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

    alert.className =
      'form-alert mt-3 alert ' +
      (isSuccess ? 'alert-success' : 'alert-danger');

    alert.textContent = message;
    alert.style.display = 'block';

    setTimeout(() => {
      alert.style.display = 'none';
    }, 5000);
  }

  function initContactForms() {

    document.querySelectorAll('.contact-form, .inquiry-form').forEach((form) => {

      form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const name = form.querySelector('[name="name"]');
        const company = form.querySelector('[name="company"]');
        const location = form.querySelector('[name="location"]');
        const mobile = form.querySelector('[name="mobile"]');
        const email = form.querySelector('[name="email"]');
        const service = form.querySelector('[name="service"]');
        const message = form.querySelector('[name="message"]');

        let valid = true;

        form.classList.add('was-validated');

        if (!name?.value.trim()) valid = false;
        if (!email?.value.trim() || !validateEmail(email.value)) valid = false;
        if (!mobile?.value.trim() || !validatePhone(mobile.value)) valid = false;
        if (!message?.value.trim()) valid = false;

        if (!valid) {
          showMessage(
            form,
            'Please fill in all required fields correctly.',
            false
          );
          return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        const originalHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        const templateParams = {
          name: name?.value.trim() || "",
          company: company?.value.trim() || "",
          location: location?.value.trim() || "",
          mobile: mobile?.value.trim() || "",
          email: email?.value.trim() || "",
          service: service?.value || "",
          message: message?.value.trim() || "",
          time: new Date().toLocaleString("en-IN")
        };

        console.log("Sending EmailJS:", templateParams);

        try {

          const response = await emailjs.send(
            "service_3zqvk3p",
            "template_yyjuuxm",
            templateParams
          );

          console.log("EmailJS Success:", response);

          showMessage(
            form,
            'Thank you! Your inquiry has been submitted successfully. Our team will contact you shortly.',
            true
          );

          form.reset();
          form.classList.remove('was-validated');

        } catch (error) {

          console.error("EmailJS Full Error:", error);

          showMessage(
            form,
            `Email sending failed: ${error?.text || error?.message || 'Unknown error'}`,
            false
          );

        } finally {

          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;

        }

      });

    });

  }

})();