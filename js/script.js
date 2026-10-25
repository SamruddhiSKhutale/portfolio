/* ========================================
   Samruddhi Khutale - Portfolio Scripts
   Typing animation | Navbar | Scroll | Form
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Typing Animation ----------
  const typedTextEl = document.querySelector('.typed-text');
  const phrases = [
    'Software Developer',
    'AWS & Cloud Enthusiast',
    'Backend Developer',
    'DevOps Learner'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedTextEl) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ---------- Sticky Navbar on Scroll ----------
  const navbar = document.getElementById('mainNavbar');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // initial check

  // ---------- Back to Top ----------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Active Navigation Indicator ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ---------- Smooth close mobile menu on link click ----------
  const navCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll(
    '.skill-card, .project-card, .aws-card, .devops-card, .highlight-card, .strength-card, .learning-card, .education-card, .timeline-content, .contact-form-wrapper'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // initial

  // ---------- Contact Form Validation (Frontend only) ----------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Bootstrap-style validation
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      // Collect form data (frontend only – no actual send)
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
      };

      // Simple success feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Ready';
      submitBtn.disabled = true;
      submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

      // Reset after a short delay
      setTimeout(() => {
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        alert('Thank you! This is a frontend-only form. Please contact via email or LinkedIn for actual communication.');
      }, 1500);
    });
  }

  // ---------- Prevent empty placeholder links from jumping ----------
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only prevent if it's a pure placeholder (not a section)
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });
});
