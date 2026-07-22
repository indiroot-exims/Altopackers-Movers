/* ═══════════════════════════════════════════════════════════════
   ALTO PACKERS & MOVERS — JAVASCRIPT
   Premium animations, interactions, and form handling
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// HEADER & NAVIGATION
// ═══════════════════════════════════════════════════════════════

const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

// Determine if we're on the home page
const isHomePage = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname === '/' || 
                   window.location.pathname === '';

// Set header state for inner pages
if (!isHomePage) {
  header.classList.add('inner-page');
}

// Sticky header on scroll with parallax effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Parallax effect on hero video (home page only)
  if (isHomePage && hero) {
    const video = hero.querySelector('.hero__video');
    if (video) {
      const scrollPercent = window.scrollY / window.innerHeight;
      video.style.transform = `scale(${1 + scrollPercent * 0.1})`;
    }
  }
});

// Hamburger menu toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
}

// Update active nav link based on current page
function updateActiveNav() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    } else {
      link.classList.remove('nav__link--active');
    }
  });
}

updateActiveNav();

// ═══════════════════════════════════════════════════════════════
// SCROLL REVEAL ANIMATIONS
// ═══════════════════════════════════════════════════════════════

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for reveal
document.querySelectorAll('section, .service-card, .value-card, .testimonial-card, .city-card').forEach(el => {
  observer.observe(el);
});

// ═══════════════════════════════════════════════════════════════
// COUNT UP ANIMATION
// ═══════════════════════════════════════════════════════════════

function countUp(element, target) {
  const duration = 2000; // 2 seconds
  const start = 0;
  const startTime = Date.now();

  const updateCount = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target.toLocaleString();
    }
  };

  updateCount();
}

// Trigger count-up when stats become visible
document.querySelectorAll('.stat__value[data-target]').forEach(stat => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        countUp(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(stat);
});

// ═══════════════════════════════════════════════════════════════
// VIDEO MODAL
// ═══════════════════════════════════════════════════════════════

const videoBtn = document.getElementById('videoBtn');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');

if (videoBtn && videoModal) {
  videoBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// ═══════════════════════════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════════════════════════

const faqItems = document.querySelectorAll('.faq-item__trigger');

faqItems.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const faqItem = trigger.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
    });

    // Toggle current item
    if (!isActive) {
      faqItem.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM HANDLING & VALIDATION
// ═══════════════════════════════════════════════════════════════

const contactForm = document.getElementById('contactForm');

// Form validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone.replace(/\s/g, ''));
}

function showFieldError(field, message) {
  let errorEl = field.nextElementSibling;
  if (!errorEl || !errorEl.classList.contains('field-error')) {
    errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    field.parentNode.insertBefore(errorEl, field.nextSibling);
  }
  errorEl.textContent = message;
  field.classList.add('error');
}

function clearFieldError(field) {
  const errorEl = field.nextElementSibling;
  if (errorEl && errorEl.classList.contains('field-error')) {
    errorEl.textContent = '';
  }
  field.classList.remove('error');
}

// Add real-time validation
if (contactForm) {
  const emailField = contactForm.querySelector('input[name="email"]');
  const phoneField = contactForm.querySelector('input[name="phone"]');

  if (emailField) {
    emailField.addEventListener('blur', () => {
      if (emailField.value && !validateEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
      } else {
        clearFieldError(emailField);
      }
    });
  }

  if (phoneField) {
    phoneField.addEventListener('blur', () => {
      if (phoneField.value && !validatePhone(phoneField.value)) {
        showFieldError(phoneField, 'Please enter a valid phone number (at least 10 digits)');
      } else {
        clearFieldError(phoneField);
      }
    });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const fields = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!field.value.trim()) {
        showFieldError(field, 'This field is required');
        isValid = false;
      } else if (field.name === 'email' && !validateEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
        isValid = false;
      } else if (field.name === 'phone' && !validatePhone(field.value)) {
        showFieldError(field, 'Please enter a valid phone number');
        isValid = false;
      } else {
        clearFieldError(field);
      }
    });

    if (!isValid) return;

    // Collect form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      service: formData.get('service'),
      from: formData.get('from'),
      to: formData.get('to'),
      message: formData.get('message')
    };

    // TODO: Send to backend service like Formspree, Getform, or EmailJS
    console.log('Form submitted:', data);

    // Show success message
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
      contactForm.style.display = 'none';
      formMessage.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem; color: #0B1120;">Thank You!</h3>
          <p style="color: #6B7280;">We&apos;ll be in touch within 24 hours.</p>
        </div>
      `;
      formMessage.classList.add('show');
      formMessage.classList.remove('form-message--hidden');

      // Scroll to message
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset after 5 seconds
      setTimeout(() => {
        contactForm.style.display = 'grid';
        contactForm.reset();
        formMessage.classList.remove('show');
        fields.forEach(field => clearFieldError(field));
      }, 5000);
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL FOR ANCHOR LINKS
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#"
    if (href === '#') {
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// UTILITY: LAZY LOAD IMAGES
// ═══════════════════════════════════════════════════════════════

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ═══════════════════════════════════════════════════════════════
// PAGE-SPECIFIC INITIALIZATIONS
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Initialize page-specific features
  initPageFeatures();
});

function initPageFeatures() {
  const currentPath = window.location.pathname;
  
  // HomePage specific
  if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '') {
    initHomePage();
  }
  
  // Contact page specific
  if (currentPath.includes('contact.html')) {
    initContactPage();
  }
}

function initHomePage() {
  // Add fade-in delays to service cards
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

function initContactPage() {
  // Focus on form fields for better UX
  const phoneInput = document.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('focus', () => {
      if (phoneInput.value === '') {
        phoneInput.value = '+91 ';
      }
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// CITY MODAL HANDLER (Service Areas Page)
// ═══════════════════════════════════════════════════════════════

const cityModal = document.getElementById('cityModal');
const cityModalTitle = document.getElementById('cityModalTitle');
const cityModalDescription = document.getElementById('cityModalDescription');
const cityModalClose = document.getElementById('cityModalClose');
const cityModalOverlay = document.getElementById('cityModalOverlay');

const cityDescriptions = {
  'Ahmedabad': 'A well-connected industrial hub and Gujarat\'s largest city, Ahmedabad is a major commercial center. Our relocation services here include office moves, industrial plant relocations, and residential transfers with specialized handling.',
  'Surat': 'A vibrant coastal port city known for its textile and diamond industries, Surat demands specialized logistics expertise. We handle import/export relocations and manage complex business moves efficiently.',
  'Rajkot': 'Known as the "Instrument City" of India, Rajkot has a thriving manufacturing sector. We provide dedicated support for industrial equipment relocation and corporate office moves.',
  'Vadodara': 'Our headquarters and primary base of operations, where we deliver same-day local moves and comprehensive relocation solutions across the city and surrounding areas.',
  'Gandhinagar': 'The state capital of Gujarat, Gandhinagar is home to government offices and administrative centers. We specialize in government relocation services and large-scale office transfers.',
  'Anand': 'Known for the Amul cooperative and agricultural prominence, Anand has growing business sectors. We provide tailored relocation services for businesses and households.',
  'Bhavnagar': 'A historic coastal city with maritime trade significance, Bhavnagar requires experienced movers for port-related and commercial relocations.',
  'Jamnagar': 'A major petroleum refining center with significant industrial activity, Jamnagar needs specialized handling for industrial equipment and corporate relocations.',
  'Junagadh': 'A heritage city with historical significance, Junagadh presents unique relocation challenges that our experienced team handles with care and expertise.',
  'Mehsana': 'An emerging commercial center in North Gujarat, Mehsana is growing as a business hub, requiring modern relocation solutions we proudly provide.'
};

if (cityModal) {
  // Open modal when city card is clicked
  document.querySelectorAll('.city-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const cityName = card.querySelector('.city-card__name')?.textContent || 'City';
      cityModalTitle.textContent = cityName;
      cityModalDescription.textContent = cityDescriptions[cityName] || 'Explore our relocation services in this city.';
      cityModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const closeModal = () => {
    cityModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (cityModalClose) {
    cityModalClose.addEventListener('click', closeModal);
  }

  if (cityModalOverlay) {
    cityModalOverlay.addEventListener('click', closeModal);
  }

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cityModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// PRINT STYLES
// ═══════════════════════════════════════════════════════════════

window.addEventListener('beforeprint', () => {
  document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('printing');
});

// ═══════════════════════════════════════════════════════════════
// UTILITY: TRACKING & ANALYTICS PLACEHOLDER
// ═══════════════════════════════════════════════════════════════

// Placeholder for analytics (replace with actual service like Google Analytics)
function trackEvent(eventName, eventData) {
  // TODO: Connect to analytics service (Google Analytics, Mixpanel, etc.)
  console.log('Event tracked:', eventName, eventData);
}

// Track form submissions
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    trackEvent('form_submission', {
      form: 'contact_form',
      timestamp: new Date().toISOString()
    });
  });
}

// Track CTA clicks
document.querySelectorAll('a[href="contact.html"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('cta_click', {
      source: link.closest('section')?.className || 'unknown'
    });
  });
});

console.log('[Alto Packers] All scripts loaded successfully');
