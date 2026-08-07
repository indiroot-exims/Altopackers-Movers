/* ═══════════════════════════════════════════════════════════════
   ALTO PACKERS & MOVERS — JAVASCRIPT
   Premium animations, interactions, and form handling
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// WAIT FOR HEADER/FOOTER INJECTION (Inject.js) BEFORE WIRING NAV
// ═══════════════════════════════════════════════════════════════
// Header.html / Footer.html are injected into #header / #footer by
// Inject.js. If that injection happens asynchronously (fetch/include),
// code that queries hamburger/nav elements immediately would find
// nothing. This small helper waits until the header actually has
// content (or a short timeout elapses) before wiring up nav behavior,
// so the mobile menu and sticky header always work regardless of how
// Inject.js loads the markup.

const video = document.querySelector('.hero__video');
if (video) {
  video.muted = true;
} 
function whenHeaderReady(callback) {
  const headerEl = document.getElementById('header');
  if (!headerEl) return callback();

  if (headerEl.children.length > 0) {
    callback();
    return;
  }

  const observer = new MutationObserver(() => {
    if (headerEl.children.length > 0) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(headerEl, { childList: true });

  // Safety net: run anyway after 2s even if injection never fires,
  // so the rest of the site (forms, modals, FAQ) still works.
  setTimeout(() => {
    observer.disconnect();
    callback();
  }, 2000);
}

whenHeaderReady(initHeaderNav);

function initHeaderNav() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  if (!header) return;

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
  if (hamburger && nav) {
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
  updateActiveNav();

  // Wire up "Get Quote" trigger(s) that may live inside the injected
  // header/mobile nav (e.g. <button data-quote-trigger> in Header.html).
  bindQuoteTriggers(header);
}

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

// ═══════════════════════════════════════════════════════════════
// SCROLL REVEAL ANIMATIONS
// ═══════════════════════════════════════════════════════════════

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section, .service-card, .value-card, .testimonial-card, .city-card').forEach(el => {
  revealObserver.observe(el);
});

// ═══════════════════════════════════════════════════════════════
// COUNT UP ANIMATION
// ═══════════════════════════════════════════════════════════════

function countUp(element, target) {
  const duration = 2000;
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

document.querySelectorAll('.stat__value[data-target]').forEach(stat => {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        countUp(entry.target, target);
        statObserver.unobserve(entry.target);
      }
    });
  });

  statObserver.observe(stat);
});

// ═══════════════════════════════════════════════════════════════
// VIDEO MODAL
// ═══════════════════════════════════════════════════════════════

const videoBtn = document.getElementById('videoBtn');
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeModal');

if (videoBtn && videoModal) {
  videoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeVideoModal) {
    closeVideoModal.addEventListener('click', () => {
      videoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// ═══════════════════════════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const faqItem = trigger.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      faqItem.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// SHARED FORM VALIDATION HELPERS
// ═══════════════════════════════════════════════════════════════

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

function validateFormFields(form) {
  const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;

  fields.forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'This field is required');
      isValid = false;
    } else if (field.type === 'email' && !validateEmail(field.value)) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    } else if (field.type === 'tel' && !validatePhone(field.value)) {
      showFieldError(field, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearFieldError(field);
    }
  });

  return isValid;
}

// ═══════════════════════════════════════════════════════════════
// TRACKING & ANALYTICS PLACEHOLDER
// ═══════════════════════════════════════════════════════════════

function trackEvent(eventName, eventData) {
  // TODO: Connect to Google Ads conversion tracking / GA4 / Mixpanel, etc.
  // For Google Ads conversion tracking, fire gtag('event', 'conversion', {...}) here.
  console.log('Event tracked:', eventName, eventData);
}

/* ═══════════════════════════════════════════════════════════════
   EMAILJS INTEGRATION
   ═══════════════════════════════════════════════════════════════
   Setup steps:
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (e.g. Gmail/Outlook) -> copy the SERVICE ID
   3. Create ONE template with these variables (used by all 3 forms
      on this site: hero quote form, popup quote modal, contact form):
         {{source}}        - which form the lead came from
         {{page}}          - page path the lead was submitted from
         {{name}}          - lead's name
         {{phone}}         - lead's phone number
         {{email}}         - lead's email (may be "Not provided")
         {{service}}       - service they're interested in
         {{from_location}} - moving from
         {{to_location}}   - moving to
         {{message}}       - extra message (may be a default string)
      Set the template's "To Email" to altopacker@yahoo.com (or your
      preferred inbox), and "Reply To" to {{email}} so you can reply
      directly to leads who provided an email address.
   4. Copy your Public Key from Account > General
   5. Paste your Public Key, Service ID, and Template ID into the three
      placeholders directly below.
   ═══════════════════════════════════════════════════════════════ */

const EMAILJS_PUBLIC_KEY = "nssKz660z05BLT38V";
const EMAILJS_SERVICE_ID = "service_g4oulsg";
const EMAILJS_TEMPLATE_ID = "template_nj4olag";

(function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else {
    console.warn('[Alto Packers] EmailJS SDK not found — make sure the CDN <script> tag is included in <head>.');
  }
})();

// Normalizes data from any of the 3 forms (hero form, popup modal,
// contact form) into one consistent set of template variables, then
// sends it through EmailJS using a single shared template.
function sendLeadEmail(data) {
  if (typeof emailjs === 'undefined') {
    console.error('[Alto Packers] EmailJS SDK not loaded, cannot send email.');
    return Promise.reject(new Error('EmailJS SDK not loaded'));
  }

  // reply_email must ALWAYS be a valid address — some mail servers (Yahoo
  // included) will reject the entire message if Reply-To is malformed
  // (e.g. the literal string "Not provided"). Falls back to our own
  // business address when the customer didn't supply an email.
  const customerEmail = data.email && data.email.trim();
  const isValidEmail = customerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail);

  const templateParams = {
    source: data.source || 'Website',
    page: data.page || window.location.pathname,
    name: data.name || 'Not provided',
    phone: data.phone || data.phoneNumber || 'Not provided',
    email: isValidEmail ? customerEmail : 'Not provided',
    reply_email: isValidEmail ? customerEmail : 'altopacker@yahoo.com',
    service: data.service || data.moveType || 'Not specified',
    from_location: data.from || data.moveFrom || 'Not specified',
    to_location: data.to || data.moveTo || 'Not specified',
    message: data.message || 'No additional message provided.'
  };

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}

// ═══════════════════════════════════════════════════════════════
// HERO INSTANT QUOTE FORM (index.html)
// ═══════════════════════════════════════════════════════════════

const heroQuoteForm = document.getElementById('heroQuoteForm');

if (heroQuoteForm) {
  heroQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateFormFields(heroQuoteForm)) return;

    const formData = new FormData(heroQuoteForm);
    const data = {
      source: 'Hero Instant Quote Form',
      name: formData.get('name'),
      moveFrom: formData.get('moveFrom'),
      moveTo: formData.get('moveTo'),
      moveType: formData.get('moveType'),
      phoneNumber: formData.get('phoneNumber')
    };

    const submitBtn = heroQuoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    sendLeadEmail(data).then(() => {
      trackEvent('hero_quote_submit', data);
      submitBtn.textContent = '✓ Request Received!';
      heroQuoteForm.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 3000);
    }).catch(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('Something went wrong sending your request. Please call us directly at +91 9974900165.');
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// QUOTE REQUEST MODAL (Request Quote popup — all pages)
// ═══════════════════════════════════════════════════════════════

const quoteModal = document.getElementById('quoteModal');
const quoteModalForm = document.getElementById('quoteModalForm');
const quoteModalMessage = document.getElementById('quoteModalMessage');

function openQuoteModal() {
  if (!quoteModal) return;
  quoteModal.classList.add('active');
  quoteModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('quote-modal-open');

  // Reset to form view every time it's opened fresh
  if (quoteModalForm) {
    quoteModalForm.style.display = 'grid';
  }
  if (quoteModalMessage) {
    quoteModalMessage.classList.add('form-message--hidden');
    quoteModalMessage.classList.remove('show');
  }

  trackEvent('quote_modal_open', { page: window.location.pathname });

  // Focus first field for accessibility / faster typing
  const firstField = quoteModal.querySelector('input, select');
  if (firstField) setTimeout(() => firstField.focus(), 100);
}

function closeQuoteModalFn() {
  if (!quoteModal) return;
  quoteModal.classList.remove('active');
  quoteModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('quote-modal-open');
}

// Bind any element with [data-quote-trigger] to open the modal.
// This is exported so header/footer nav (injected later) can also use it.
function bindQuoteTriggers(scope) {
  const root = scope || document;
  root.querySelectorAll('[data-quote-trigger]').forEach(el => {
    if (el.dataset.quoteBound === 'true') return;
    el.dataset.quoteBound = 'true';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  });
}

// Bind triggers already present in the main document body on load
document.addEventListener('DOMContentLoaded', () => {
  bindQuoteTriggers(document);
});
// Also bind immediately in case DOMContentLoaded already fired
// (script.js is loaded with `defer`, so this is a safety net only).
bindQuoteTriggers(document);

if (quoteModal) {
  quoteModal.querySelectorAll('[data-quote-close]').forEach(el => {
    el.addEventListener('click', closeQuoteModalFn);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal.classList.contains('active')) {
      closeQuoteModalFn();
    }
  });
}

if (quoteModalForm) {
  quoteModalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateFormFields(quoteModalForm)) return;

    const formData = new FormData(quoteModalForm);
    const data = {
      source: 'Quote Request Popup',
      page: window.location.pathname,
      name: formData.get('name'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      from: formData.get('from'),
      to: formData.get('to')
    };

    const submitBtn = quoteModalForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    sendLeadEmail(data).then(() => {
      trackEvent('quote_modal_submit', data);

      quoteModalForm.style.display = 'none';
      if (quoteModalMessage) {
        quoteModalMessage.classList.remove('form-message--hidden');
        quoteModalMessage.classList.add('show');
      }

      setTimeout(() => {
        quoteModalForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send My Request';
        closeQuoteModalFn();
      }, 3000);
    }).catch(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send My Request';
      alert('Something went wrong sending your request. Please call us directly at +91 9974900165.');
    });
  });
}
// ═══════════════════════════════════════════════════════════════
// HERO INSTANT QUOTE FORM (index.html)
// ═══════════════════════════════════════════════════════════════

const heroQuoteForm = document.getElementById('heroQuoteForm');
const heroQuoteMessage = document.getElementById('heroQuoteMessage');

if (heroQuoteForm) {
  heroQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (typeof validateFormFields === 'function' && !validateFormFields(heroQuoteForm)) return;

    const formData = new FormData(heroQuoteForm);
    const data = {
      source: 'Hero Instant Quote Form',
      page: window.location.pathname,
      name: formData.get('name'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      from: formData.get('from'),
      to: formData.get('to')
    };

    const submitBtn = heroQuoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    sendLeadEmail(data).then(() => {
      if (typeof trackEvent === 'function') {
        trackEvent('hero_quote_submit', data);
      }

      // Hide form and display success message matching modal behavior
      heroQuoteForm.style.display = 'none';
      if (heroQuoteMessage) {
        heroQuoteMessage.classList.remove('form-message--hidden');
      }

      // Reset form view after 5 seconds
      setTimeout(() => {
        heroQuoteForm.reset();
        heroQuoteForm.style.display = 'block';
        if (heroQuoteMessage) {
          heroQuoteMessage.classList.add('form-message--hidden');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 5000);
    }).catch((err) => {
      console.error('[Alto Packers] EmailJS Error:', err);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('Something went wrong sending your request. Please call us directly at +91 9974900165.');
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// CONTACT PAGE — FULL FORM
// ═══════════════════════════════════════════════════════════════

const contactForm = document.getElementById('contactForm');

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

    if (!validateFormFields(contactForm)) return;

    const formData = new FormData(contactForm);
    const data = {
      source: 'Contact Page Form',
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      service: formData.get('service'),
      from: formData.get('from'),
      to: formData.get('to'),
      message: formData.get('message')
    };

    // Resilient button lookup: try the expected class first, then fall
    // back to any submit button inside the form, so a class rename on
    // the live page can never silently crash the handler before
    // EmailJS is even called.
    const submitBtn = contactForm.querySelector('.form-submit') ||
                       contactForm.querySelector('button[type="submit"]');

    if (!submitBtn) {
      console.error('[Alto Packers] Could not find the contact form submit button. Check that the <button> element still exists inside #contactForm.');
      alert('There is a page issue preventing submission. Please call us directly at +91 9974900165.');
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    sendLeadEmail(data).then(() => {
      trackEvent('contact_form_submit', data);

      const formMessage = document.getElementById('formMessage');
      contactForm.style.display = 'none';
      if (formMessage) {
        formMessage.innerHTML = `
          <div style="text-align: center; width: 100%;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem; color: #0B1120;">Thank You!</h3>
            <p style="color: #6B7280;">We'll be in touch within 24 hours.</p>
          </div>
        `;
        formMessage.classList.add('show');
        formMessage.classList.remove('form-message--hidden');
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      setTimeout(() => {
        contactForm.style.display = 'grid';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        if (formMessage) formMessage.classList.remove('show');
      }, 6000);
    }).catch((err) => {
      // Log the REAL reason to the console so future failures are
      // immediately diagnosable instead of a generic alert.
      console.error('[Alto Packers] Contact form send failed:', err);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      const reason = (err && (err.text || err.message)) ? `\n\nDetails: ${err.text || err.message}` : '';
      alert('Something went wrong sending your message. Please call us directly at +91 9974900165.' + reason);
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL FOR ANCHOR LINKS
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    if (href === '#') return;

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
  initPageFeatures();
});

function initPageFeatures() {
  const currentPath = window.location.pathname;

  if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '') {
    initHomePage();
  }

  if (currentPath.includes('contact.html')) {
    initContactPage();
  }
}

function initHomePage() {
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

function initContactPage() {
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
// CITY MODAL HANDLER (Service Areas Page — optional, only runs if
// the corresponding markup exists on the page)
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
  document.querySelectorAll('.city-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const cityName = card.querySelector('.city-card__name')?.textContent || 'City';
      if (cityModalTitle) cityModalTitle.textContent = cityName;
      if (cityModalDescription) cityModalDescription.textContent = cityDescriptions[cityName] || 'Explore our relocation services in this city.';
      cityModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeCityModal = () => {
    cityModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (cityModalClose) cityModalClose.addEventListener('click', closeCityModal);
  if (cityModalOverlay) cityModalOverlay.addEventListener('click', closeCityModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cityModal.classList.contains('active')) {
      closeCityModal();
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

// Track CTA clicks that still point to contact.html directly
// (e.g. contact page's own "Request a Quote Now" anchor to its form)
document.querySelectorAll('a[href="contact.html"], a[href="#contactForm"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('cta_click', {
      source: link.closest('section')?.className || 'unknown'
    });
  });
});

console.log('[Alto Packers] All scripts loaded successfully');
