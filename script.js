const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll('.nav-link');

navLink.forEach((n) => n.addEventListener('click', closeMenu));

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Save user preference on load

const currentTheme = localStorage.getItem('theme')
  ? localStorage.getItem('theme')
  : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

//Adding date
let myDate = document.querySelector('#datee');
const yes = new Date().getFullYear();
myDate.innerHTML = yes;

// EmailJS Configuration
(function () {
  // Initialize EmailJS with your public key
  emailjs.init('8raAa4cB6MQ639iu7'); // Replace with your actual public key
})();

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show message function
function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';

  // Auto hide after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// Show loading state
function showLoading() {
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
}

// Hide loading state
function hideLoading() {
  submitBtn.disabled = false;
  btnText.style.display = 'inline';
  btnLoading.style.display = 'none';
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    showLoading();

    // Send email using EmailJS
    emailjs
      .sendForm(
        'service_d70hemp', // Replace with your service ID (keep the quotes)
        'template_45h1mkd', // Replace with your template ID (keep the quotes)
        contactForm
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
          showMessage(
            "✅ Message sent successfully! I'll get back to you soon.",
            'success'
          );
          contactForm.reset();
        },
        function (error) {
          console.log('FAILED...', error);
          showMessage(
            '❌ Failed to send message. Please try again or contact me directly.',
            'error'
          );
        }
      )
      .finally(function () {
        hideLoading();
      });
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
