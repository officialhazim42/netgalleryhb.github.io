/* ============================================
   MAIN JAVASCRIPT
   ============================================ */

// DOM Elements
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const langSelect = document.getElementById('langSelect');
const bookingForm = document.getElementById('bookingForm');
const chatButton = document.getElementById('floatingChat');
const chatWidget = document.getElementById('chatWidget');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const reviewsNext = document.getElementById('reviewsNext');
const reviewsPrev = document.getElementById('reviewsPrev');

// ============================================
// NAVIGATION
// ============================================

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    navMenu.classList.remove('active');
  });
});

// Scroll to section helper
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ============================================
// THEME SWITCHER
// ============================================

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.style.colorScheme = theme;
  
  if (isDark) {
    document.body.classList.remove('light-mode');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('title', 'Light Mode');
  } else {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('title', 'Dark Mode');
  }
  
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// ============================================
// LANGUAGE SUPPORT
// ============================================

const translations = {
  en: {
    'home.title': 'Your Trusted Digital & Printing Partner',
    'services.csc': 'CSC / eKYC',
    'services.print': 'Printing Services',
    'services.covers': 'Custom Phone Covers',
    'services.frames': 'Photo Frames',
    'services.digital': 'Digital Help',
    'services.id': 'ID Photos',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.booking': 'Booking',
    'nav.contact': 'Contact',
  },
  hi: {
    'home.title': 'आपका विश्वसनीय डिजिटल और प्रिंटिंग पार्टनर',
    'services.csc': 'CSC / eKYC',
    'services.print': 'प्रिंटिंग सेवाएँ',
    'services.covers': 'कस्टम फोन कवर',
    'services.frames': 'फोटो फ्रेम',
    'services.digital': 'डिजिटल मदद',
    'services.id': 'आईडी फोटो',
    'nav.home': 'होम',
    'nav.services': 'सेवाएँ',
    'nav.gallery': 'गैलरी',
    'nav.booking': 'बुकिंग',
    'nav.contact': 'संपर्क',
  },
  ur: {
    'home.title': 'آپ کا قابلِ اعتماد ڈیجیٹل اور پرنٹنگ پارٹنر',
    'services.csc': 'CSC / eKYC',
    'services.print': 'پرنٹنگ سروسز',
    'services.covers': 'کسٹم فون کورز',
    'services.frames': 'فوٹو فریمز',
    'services.digital': 'ڈیجیٹل مدد',
    'services.id': 'آئی ڈی فوٹوز',
    'nav.home': 'ہوم',
    'nav.services': 'سروسز',
    'nav.gallery': 'گیلری',
    'nav.booking': 'بکنگ',
    'nav.contact': 'رابطہ',
  },
  ks: {
    'home.title': 'تہہ آس سندریہ ڈیجیٹل اینڈ پرنٹنگ',
    'services.csc': 'CSC / eKYC',
    'services.print': 'پرنٹنگ سروسِز',
    'services.covers': 'کسٹم فون کورز',
    'services.frames': 'فوٹو فریمز',
    'services.digital': 'ڈیجیٹل مدد',
    'services.id': 'آئی ڈی فوٹوز',
    'nav.home': 'ہوم',
    'nav.services': 'سروسز',
    'nav.gallery': 'گیلری',
    'nav.booking': 'بکنگ',
    'nav.contact': 'رابطہ',
  }
};

function applyLanguage(lang) {
  localStorage.setItem('language', lang);
  // Translate common elements
  Object.keys(translations[lang] || {}).forEach(key => {
    const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
    elements.forEach(el => {
      el.textContent = translations[lang][key];
    });
  });
}

langSelect.addEventListener('change', (e) => {
  applyLanguage(e.target.value);
});

// Initialize language
const savedLang = localStorage.getItem('language') || 'en';
langSelect.value = savedLang;

// ============================================
// BOOKING FORM
// ============================================

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('bname').value.trim();
  const phone = document.getElementById('bphone').value.trim();
  const service = document.getElementById('bservice').value;
  const notes = document.getElementById('bnotes').value.trim();
  
  const bookingResult = document.getElementById('bookingResult');
  
  // Reset messages
  bookingResult.textContent = '';
  bookingResult.className = 'form-message';
  
  // Validation
  if (!name) {
    document.getElementById('nameError').textContent = 'Name is required';
    return;
  }
  
  if (!validatePhone(phone)) {
    document.getElementById('phoneError').textContent = 'Valid 10-digit phone number required';
    return;
  }
  
  if (!service) {
    document.getElementById('serviceError').textContent = 'Please select a service';
    return;
  }
  
  // Clear errors
  document.getElementById('nameError').textContent = '';
  document.getElementById('phoneError').textContent = '';
  document.getElementById('serviceError').textContent = '';
  
  try {
    // Try email first
    const mailtoLink = `mailto:netgalleryhb@example.com?subject=Booking Request from ${name}&body=Name: ${name}%0APhone: ${phone}%0AService: ${service}%0ANotes: ${notes}`;
    window.location.href = mailtoLink;
    
    bookingResult.textContent = 'Email client opened. Your booking request is being processed.';
    bookingResult.className = 'form-message success';
    
    // Reset form
    bookingForm.reset();
    
  } catch (error) {
    console.error('Error:', error);
    bookingResult.textContent = 'There was an error. Please try again or contact us directly.';
    bookingResult.className = 'form-message error';
  }
});

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 30);
}

// Observe for viewport
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.dataset.target) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(el => {
  observer.observe(el);
});

// ============================================
// REVIEWS CAROUSEL
// ============================================

let currentReviewIndex = 0;
const reviewCards = document.querySelectorAll('.review-card');
const reviewCount = reviewCards.length;

function showReview(index) {
  reviewCards.forEach((card, i) => {
    card.style.display = i === index ? 'flex' : 'none';
  });
}

reviewsNext.addEventListener('click', () => {
  currentReviewIndex = (currentReviewIndex + 1) % reviewCount;
  showReview(currentReviewIndex);
});

reviewsPrev.addEventListener('click', () => {
  currentReviewIndex = (currentReviewIndex - 1 + reviewCount) % reviewCount;
  showReview(currentReviewIndex);
});

// Show first review
showReview(0);

// Auto-rotate reviews
setInterval(() => {
  currentReviewIndex = (currentReviewIndex + 1) % reviewCount;
  showReview(currentReviewIndex);
}, 5000);

// ============================================
// CHAT WIDGET
// ============================================

const chatResponses = {
  price: 'Our prices: Custom Cover ₹299 | Photo Frame ₹199 | Document Print ₹10/page | Passport Photos ₹149. Contact us for bulk orders!',
  hours: 'We are open Monday - Saturday, 10:00 AM to 7:00 PM. Closed on Sundays.',
  payment: 'We accept UPI, WhatsApp Pay, Google Pay, and cash. UPI ID: erhashim@yespop',
  booking: 'Use the booking form on this site or contact us on WhatsApp. We confirm bookings within 1-2 hours.',
  location: 'We are located in Sahipora, Ganderbal, Jammu & Kashmir. See the map on the contact page.',
  services: 'We offer: CSC/eKYC, Printing, Custom Phone Covers, Photo Frames, Digital Help, and ID Photos.',
  default: 'Hi! I can help with prices, hours, payment, booking, location, and services. What would you like to know?'
};

function getBotResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('price') || msg.includes('cost')) return chatResponses.price;
  if (msg.includes('hour') || msg.includes('time')) return chatResponses.hours;
  if (msg.includes('pay') || msg.includes('upi')) return chatResponses.payment;
  if (msg.includes('book')) return chatResponses.booking;
  if (msg.includes('location') || msg.includes('where')) return chatResponses.location;
  if (msg.includes('service')) return chatResponses.services;
  
  return chatResponses.default;
}

function addChatMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChat() {
  const message = chatInput.value.trim();
  if (!message) return;
  
  addChatMessage(message, 'user');
  chatInput.value = '';
  
  setTimeout(() => {
    const response = getBotResponse(message);
    addChatMessage(response, 'bot');
  }, 600);
}

chatButton.addEventListener('click', () => {
  chatWidget.classList.toggle('hidden');
  if (!chatWidget.classList.contains('hidden')) {
    chatInput.focus();
  }
});

closeChat.addEventListener('click', () => {
  chatWidget.classList.add('hidden');
});

chatSend.addEventListener('click', sendChat);

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendChat();
  }
});

// ============================================
// INTERSECTION OBSERVER for animations
// ============================================

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.service-card, .price-card, .gallery-grid img').forEach(el => {
  animationObserver.observe(el);
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// PUSH NOTIFICATIONS
// ============================================

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        setTimeout(() => {
          new Notification('Welcome to Net Gallery Hb! 🎉', {
            body: 'Professional digital & printing services in Sahipora, Ganderbal',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g"><stop offset="0%25" style="stop-color:%230ea5e9"/><stop offset="100%25" style="stop-color:%237c3aed"/></linearGradient></defs><circle cx="50" cy="50" r="45" fill="url(%23g)" opacity="0.2"/><circle cx="50" cy="50" r="35" fill="none" stroke="url(%23g)" stroke-width="2"/><text x="50" y="55" font-size="28" font-weight="800" text-anchor="middle" fill="%230ea5e9">NG</text></svg>',
            tag: 'net-gallery-welcome',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%230ea5e9"/></svg>'
          });
        }, 3000);
      }
    });
  }
}

// Request permission after page load
window.addEventListener('load', () => {
  requestNotificationPermission();
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  // Log console message
  console.log('%c🎨 Net Gallery Hb', 'color: #0ea5e9; font-size: 24px; font-weight: bold;');
  console.log('%cProfessional Digital & Printing Services', 'color: #7c3aed; font-size: 14px;');
  console.log('📍 Sahipora, Ganderbal | 📞 +91 80824 22129');
});

// ============================================
// PERFORMANCE: Register Service Worker (optional)
// ============================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('Service Worker registration failed:', err);
    });
  });
}

// Disable console in production (optional)
// if (window.location.hostname !== 'localhost') {
//   console.log = console.warn = console.error = () => {};
// }
