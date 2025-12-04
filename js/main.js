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
// LANGUAGE SUPPORT (full-site)
// ============================================

const translations = {
  en: {
    'nav.home':'Home','nav.services':'Services','nav.gallery':'Gallery','nav.booking':'Booking','nav.contact':'Contact',
    'home.title':'Your Trusted Digital & Printing Partner','home.desc':'Professional CSC services, custom phone covers, photo frames, and comprehensive digital solutions in Ganderbal.',
    'cta.book':'Book Now','cta.learn':'Learn More',
    'about.title':'About Net Gallery Hb','about.desc':'We are a trusted service center providing comprehensive digital and printing solutions in Sahipora, Ganderbal.',
    'counters.customers':'Happy Customers','counters.orders':'Orders Completed','counters.services':'Services Delivered',
    'services.title':'Our Services','services.subtitle':'Complete digital and printing solutions tailored to your needs',
    'services.csc':'CSC / eKYC','services.csc.desc':'Government documentation, Aadhaar updates, certificates, and online form submissions.',
    'services.print':'Printing Services','services.print.desc':'High-quality color and B&W printing, photocopying, lamination, and scanning.',
    'services.covers':'Custom Phone Covers','services.covers.desc':'Personalized premium-quality phone covers for all models with vibrant printing.',
    'services.frames':'Photo Frames','services.frames.desc':'Customizable photo frames, gift frames, and decorative wall art.',
    'services.digital':'Digital Help','services.digital.desc':'Online registrations, form filling, tech support, and digital assistance.',
    'services.id':'ID Photos','services.id.desc':'Instant passport-size photos with professional editing and printing.',
    'pricing.title':'Pricing','pricing.subtitle':'Transparent and competitive pricing','pricing.cover':'Custom Phone Cover','pricing.frame':'Photo Frame (Small)','pricing.print':'Document Printing (A4)','pricing.passport':'Passport Photos (4 pcs)',
    'booking.title':'Book Our Services','booking.subtitle':'Request a booking and we\'ll contact you shortly','booking.name.label':'Full Name *','booking.name.placeholder':'Your full name','booking.phone.label':'Phone Number *','booking.phone.placeholder':'Your phone number','booking.service.label':'Service Required *','booking.service.select':'Select a service','booking.notes.label':'Additional Notes','booking.notes.placeholder':'Tell us more about your requirements','booking.submit':'Submit Booking Request',
    'reviews.title':'Customer Reviews','reviews.subtitle':'What our customers say about us',
    'review.1.text':'"Great service and fast printing. Highly recommended. Will definitely come back."','review.1.author':'Ali Ahmed','review.1.tag':'Verified Customer',
    'review.2.text':'"Helpful staff and excellent photo quality. The custom phone cover is amazing!"','review.2.author':'Fatima Khan','review.2.tag':'Verified Customer',
    'review.3.text':'"Good prices and friendly service. Best printing shop in Ganderbal. Will come again."','review.3.author':'Rohit Sharma','review.3.tag':'Verified Customer',
    'contact.title':'Get In Touch','contact.subtitle':'Multiple ways to reach us','contact.phone.title':'📞 Phone','contact.phone.value':'+91 80824 22129','contact.whatsapp.title':'💬 WhatsApp','contact.whatsapp.link':'Chat with us','contact.channel.title':'📧 Channel','contact.channel.link':'Join Channel','contact.online.title':'🌐 Online',
    'social.instagram':'Instagram','social.youtube':'YouTube','social.facebook':'Facebook',
    'cta.copy':'Copy','upi.title':'Pay via UPI','upi.desc':'Pay securely using UPI. Scan the QR or copy the UPI ID.','upi.note':'Tip: After payment, send a screenshot to our WhatsApp for confirmation.'
  },
  hi: {
    'nav.home':'होम','nav.services':'सेवाएँ','nav.gallery':'गैलरी','nav.booking':'बुकिंग','nav.contact':'संपर्क',
    'home.title':'आपका विश्वसनीय डिजिटल और प्रिंटिंग पार्टनर','home.desc':'हम सीएससी सेवाएँ, कस्टम फोन कवर, फोटो फ्रेम और संपूर्ण डिजिटल समाधान प्रदान करते हैं।',
    'cta.book':'बुक करें','cta.learn':'और जानें',
    'about.title':'Net Gallery Hb के बारे में','about.desc':'हम साहिपोरा, गंडरबल में व्यापक डिजिटल और प्रिंटिंग समाधान प्रदान करते हैं।',
    'counters.customers':'संतुष्ट ग्राहक','counters.orders':'पूरा किए गए ऑर्डर','counters.services':'प्रदान की गई सेवाएँ',
    'services.title':'हमारी सेवाएँ','services.subtitle':'आपकी आवश्यकताओं के अनुरूप डिजिटल और प्रिंटिंग समाधान',
    'services.csc':'CSC / eKYC','services.csc.desc':'सरकारी दस्तावेज़ीकरण, आधार अपडेट, प्रमाणपत्र और ऑनलाइन फॉर्म सब्मिशन।',
    'services.print':'प्रिंटिंग सेवाएँ','services.print.desc':'उच्च गुणवत्ता रंग व ब्लैक/व्हाइट प्रिंटिंग, फ़ोटो कॉपी, लैमिनेशन और स्कैनिंग।',
    'services.covers':'कस्टम फोन कवर','services.covers.desc':'सभी मॉडलों के लिए व्यक्तिगत प्रीमियम फोन कवर।',
    'services.frames':'फोटो फ्रेम','services.frames.desc':'कस्टमाइज़ेबल फोटो फ्रेम और उपहार।',
    'services.digital':'डिजिटल मदद','services.digital.desc':'ऑनलाइन पंजीकरण, फ़ॉर्म भरना और तकनीकी सहायता।',
    'services.id':'आईडी फ़ोटो','services.id.desc':'प्रोफेशनल एडिटिंग के साथ त्वरित पासपोर्ट साइज फ़ोटो।',
    'pricing.title':'मूल्य','pricing.subtitle':'पारदर्शी और प्रतिस्पर्धी मूल्य',
    'pricing.cover':'कस्टम कवर','pricing.frame':'फोटो फ़्रेम (छोटा)','pricing.print':'दस्तावेज़ प्रिंट (A4)','pricing.passport':'पासपोर्ट फ़ोटो (4 पीस)',
    'booking.title':'ऑनलाइन बुकिंग','booking.subtitle':'बुकिंग का अनुरोध करें, हम आपसे संपर्क करेंगे','booking.name.label':'पूरा नाम *','booking.name.placeholder':'अपना पूरा नाम','booking.phone.label':'फोन नंबर *','booking.phone.placeholder':'आपका फोन नंबर','booking.service.label':'सेवा आवश्यक *','booking.service.select':'सेवा चुनें','booking.notes.label':'अतिरिक्त नोट्स','booking.notes.placeholder':'अपनी आवश्यकताओं के बारे में बताएं','booking.submit':'बुकिंग भेजें',
    'reviews.title':'ग्राहक समीक्षाएँ','reviews.subtitle':'हमारे ग्राहक क्या कहते हैं',
    'review.1.text':'"बेहतरीन सेवा और तेज़ प्रिंटिंग। अत्यधिक अनुशंसित।"','review.1.author':'अली अहमद','review.1.tag':'सत्यापित ग्राहक',
    'review.2.text':'"सहायक स्टाफ और उत्कृष्ट फोटो गुणवत्ता।"','review.2.author':'फातिमा खान','review.2.tag':'सत्यापित ग्राहक',
    'review.3.text':'"अच्छी कीमतें और दोस्ताना सेवा।"','review.3.author':'रोहित शर्मा','review.3.tag':'सत्यापित ग्राहक',
    'contact.title':'संपर्क करें','contact.subtitle':'हमसे संपर्क करने के कई तरीके','contact.phone.title':'📞 फोन','contact.phone.value':'+91 80824 22129','contact.whatsapp.title':'💬 व्हाट्सएप','contact.whatsapp.link':'हमसे चैट करें','contact.channel.title':'📧 चैनल','contact.channel.link':'चैनल में जुड़ें','contact.online.title':'🌐 ऑनलाइन',
    'social.instagram':'इंस्टाग्राम','social.youtube':'यूट्यूब','social.facebook':'फेसबुक',
    'cta.copy':'कॉपी','upi.title':'UPI द्वारा भुगतान','upi.desc':'UPI का उपयोग करके सुरक्षित रूप से भुगतान करें। QR स्कैन करें या UPI ID कॉपी करें।','upi.note':'भुगतान के बाद पुष्टिकरण के लिए स्क्रीनशॉट व्हाट्सएप पर भेजें।'
  },
  ur: {
    'nav.home':'ہوم','nav.services':'خدمات','nav.gallery':'گیلری','nav.booking':'بکنگ','nav.contact':'رابطہ',
    'home.title':'آپ کا معتبر ڈیجیٹل اور پرنٹنگ پارٹنر','home.desc':'پیشہ ورانہ CSC خدمات، کسٹم فون کورز، فوٹو فریمز اور مکمل ڈیجیٹل حل۔',
    'cta.book':'اب بُک کریں','cta.learn':'مزید جانیں',
    'about.title':'Net Gallery Hb کے بارے میں','about.desc':'ہم سہپورا، گنڈر بل میں جامع ڈیجیٹل اور پرنٹنگ سروسز فراہم کرتے ہیں۔',
    'counters.customers':'خوش گاہک','counters.orders':'مکمل آرڈرز','counters.services':'فراہم کردہ خدمات',
    'services.title':'ہماری خدمات','services.subtitle':'آپ کی ضروریات کے مطابق مکمل ڈیجیٹل اور پرنٹنگ حل',
    'services.csc':'CSC / eKYC','services.csc.desc':'سرکاری دستاویزات، آدھار اپڈیٹس، اور آن لائن فارم۔',
    'services.print':'پرنٹنگ سروسز','services.print.desc':'اعلی معیار رنگ و بلیک/وائٹ پرنٹنگ، فوٹو کاپی، لیمنیشن اور اسکیننگ۔',
    'services.covers':'کسٹم فون کورز','services.covers.desc':'تمام ماڈلز کیلئے ذاتی نوعیت کے پریمیم فون کورز۔',
    'services.frames':'فوٹو فریم','services.frames.desc':'کستومائز ایبل فوٹو فریم اور تحائف۔',
    'services.digital':'ڈیجیٹل مدد','services.digital.desc':'آن لائن رجسٹریشن، فارم بھرنا اور تکنیکی مدد۔',
    'services.id':'آئی ڈی فوٹوز','services.id.desc':'پاسپورٹ سائز فوٹوز فوری پرنٹ کے ساتھ۔',
    'pricing.title':'قیمت','pricing.subtitle':'شفاف اور مسابقتی قیمتیں','pricing.cover':'کسٹم کور','pricing.frame':'فوٹو فریم (چھوٹا)','pricing.print':'دستاویز پرنٹ (A4)','pricing.passport':'پاسپورٹ فوٹوز (4 پیس)',
    'booking.title':'آن لائن بکنگ','booking.subtitle':'بکنگ کی درخواست کریں، ہم آپ سے رابطہ کریں گے','booking.name.label':'پورا نام *','booking.name.placeholder':'اپنا پورا نام','booking.phone.label':'فون نمبر *','booking.phone.placeholder':'آپ کا فون نمبر','booking.service.label':'درکار سروس *','booking.service.select':'سروس منتخب کریں','booking.notes.label':'اضافی نوٹس','booking.notes.placeholder':'اپنی ضروریات بتائیں','booking.submit':'بکنگ درخواست بھیجیں',
    'reviews.title':'کسٹمر جائزے','reviews.subtitle':'ہمارے کسٹمرز کیا کہتے ہیں',
    'review.1.text':'"بہترین سروس اور تیز پرنٹنگ۔"','review.1.author':'علی احمد','review.1.tag':'تصدیق شدہ کسٹمر',
    'review.2.text':'"مددگار عملہ اور بہترین تصویر معیار۔"','review.2.author':'فاطمہ خان','review.2.tag':'تصدیق شدہ کسٹمر',
    'review.3.text':'"اچھی قیمتیں اور دوستانہ سروس۔"','review.3.author':'روہت شرما','review.3.tag':'تصدیق شدہ کسٹمر',
    'contact.title':'رابطہ کریں','contact.subtitle':'ہم سے رابطہ کرنے کے کئی طریقے','contact.phone.title':'📞 فون','contact.phone.value':'+91 80824 22129','contact.whatsapp.title':'💬 واٹس ایپ','contact.whatsapp.link':'ہم سے چیٹ کریں','contact.channel.title':'📧 چینل','contact.channel.link':'چینل میں شامل ہوں','contact.online.title':'🌐 آن لائن',
    'social.instagram':'انسٹاگرام','social.youtube':'یوٹیوب','social.facebook':'فیس بُک',
    'cta.copy':'کاپی','upi.title':'UPI کے ذریعے ادائیگی','upi.desc':'UPI کے ذریعے محفوظ طریقے سے ادائیگی کریں۔ QR اسکین کریں یا UPI ID کاپی کریں۔','upi.note':'ادائیگی کے بعد تصدیق کیلئے سکرین شاٹ واٹس ایپ پر بھیجیں۔'
  },
  ks: {
    'nav.home':'ہوم','nav.services':'سروسز','nav.gallery':'گیلری','nav.booking':'بکنگ','nav.contact':'رابطہ',
    'home.title':'تُہندَ پروفیشنل ڈیجیٹل اَند پرنٹنگ پارٹنر','home.desc':'ہم سی ایس سی سروسز، کسٹم فون کور، فوٹو فریمز اور ڈیجیٹل مدد فراہم کرتے ہہُز۔',
    'cta.book':'بک کرو','cta.learn':'مزید جانیں',
    'about.title':'Net Gallery Hb بابت','about.desc':'آس منز قابلِ اعتبار سروس سینٹر، سہپورا، گنڈر بل۔',
    'counters.customers':'خوش کسٹمر','counters.orders':'مکمل آرڈرز','counters.services':'فراہم شدہ سروسز',
    'services.title':'ہماری سروسز','services.subtitle':'آپ کے لئے مکمل ڈیجیٹل و پرنٹنگ حل',
    'services.csc':'CSC / eKYC','services.csc.desc':'دستاویزی مدد، آدھار اپڈیٹ اور آن لائن فارم۔',
    'services.print':'پرنٹنگ','services.print.desc':'ہائی کوالٹی پرنٹنگ، فوٹو کاپی، لیمنیشن اور اسکیننگ۔',
    'services.covers':'کسٹم کور','services.covers.desc':'ہر ماڈل کیلئے پریمیم فون کورز۔',
    'services.frames':'فوٹو فریم','services.frames.desc':'کَسٹَم فریم اور گفٹس۔',
    'services.digital':'ڈیجیٹل مدد','services.digital.desc':'فارم بھرنا، رجسٹریشن اور آن لائن مدد۔',
    'services.id':'آئ ڈی فوٹوز','services.id.desc':'فوری پاسپورٹ فوٹوز۔',
    'pricing.title':'قیمت','pricing.subtitle':'واضح اور مسابقتی قیمتیں','pricing.cover':'کسٹم کور','pricing.frame':'فوٹو فریم','pricing.print':'دستاویز پرنٹ (A4)','pricing.passport':'پاسپورٹ فوٹوز (4 پیس)',
    'booking.title':'آن لائن بکنگ','booking.subtitle':'بکنگ کے لئے درخواست کریں','booking.name.label':'پورا نام *','booking.name.placeholder':'اپنا نام','booking.phone.label':'فون نمبر *','booking.phone.placeholder':'آپ کا نمبر','booking.service.label':'سروس منتخب کریں *','booking.service.select':'سروس منتخب کریں','booking.notes.label':'مزید نوٹس','booking.notes.placeholder':'اپنی تفصیل لکھیں','booking.submit':'ارسال کریں',
    'reviews.title':'کسٹمر ریویوز','reviews.subtitle':'کسٹمرز کے تاثرات',
    'review.1.text':'"عمدہ سروس اور تیز پرنٹنگ۔"','review.1.author':'علی','review.1.tag':'تصدیق شدہ',
    'review.2.text':'"مددگار عملہ اور بہترین فوٹو۔"','review.2.author':'فاطمہ','review.2.tag':'تصدیق شدہ',
    'review.3.text':'"قیمتیں مناسب اور سروس دوستانہ۔"','review.3.author':'روہت','review.3.tag':'تصدیق شدہ',
    'contact.title':'رابطہ','contact.subtitle':'ہم سے رابطہ کریں','contact.phone.title':'📞 فون','contact.phone.value':'+91 80824 22129','contact.whatsapp.title':'💬 واٹس ایپ','contact.whatsapp.link':'چیٹ کریں','contact.channel.title':'📧 چینل','contact.channel.link':'جوائن کریں','contact.online.title':'🌐 آن لائن',
    'social.instagram':'انسٹاگرام','social.youtube':'یوٹیوب','social.facebook':'فیس بُک',
    'cta.copy':'کاپی','upi.title':'UPI پے کریں','upi.desc':'UPI کے ذریعے ادائیگی کریں۔','upi.note':'ادائیگی بعد سکرین شاٹ بھیجیں۔'
  }
};

function applyLanguage(lang, animate = true){
  const t = translations[lang] || translations['en'];
  localStorage.setItem('language', lang);
  const root = document.documentElement;
  const duration = 220; // match CSS transition

  const doUpdate = () => {
    // set elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(t[key]) el.textContent = t[key];
    });
    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      if(t[key]) el.setAttribute('placeholder', t[key]);
    });
    // titles (for icons/links)
    document.querySelectorAll('[data-i18n-title]').forEach(el=>{
      const key = el.getAttribute('data-i18n-title');
      if(t[key]) el.setAttribute('title', t[key]);
    });
    // alt text for images
    document.querySelectorAll('[data-i18n-alt]').forEach(el=>{
      const key = el.getAttribute('data-i18n-alt');
      if(t[key]) el.setAttribute('alt', t[key]);
    });
    // specific value/text overrides
    document.querySelectorAll('[data-i18n-value]').forEach(el=>{
      const key = el.getAttribute('data-i18n-value');
      if(t[key]) el.textContent = t[key];
    });
  };

  if(animate){
    root.classList.add('lang-fade-transition','lang-fade-out');
    // small timeout to allow CSS to apply
    setTimeout(()=>{
      doUpdate();
      // remove fade-out to fade back in
      root.classList.remove('lang-fade-out');
      // cleanup transition class after it finishes
      setTimeout(()=>root.classList.remove('lang-fade-transition'), duration);
    }, 120);
  } else {
    doUpdate();
  }
}

langSelect.addEventListener('change', (e)=>{applyLanguage(e.target.value, true);});

// Initialize language on load (no animation)
const savedLang = localStorage.getItem('language') || 'en';
langSelect.value = savedLang;
applyLanguage(savedLang, false);

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
// UPI PAYMENT (Modal + QR)
// ============================================

const UPI_ID = 'erhashim@yespop';
const floatingPayBtn = document.getElementById('floatingPayBtn');
const upiModal = document.getElementById('upiModal');
const closeUpi = document.getElementById('closeUpi');
const upiQR = document.getElementById('upiQR');
const copyUpi = document.getElementById('copyUpi');
const upiDeepLink = document.getElementById('upiDeepLink');

function generateUpiQR(amount = 0){
  const url = `upi://pay?pa=${UPI_ID}&pn=NetGalleryHb&am=${amount}&cu=INR`;
  return `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(url)}`;
}

function openUpiModal(){
  if(!upiModal) return;
  upiModal.classList.remove('hidden');
  if(upiQR){
    // Prefer user-provided UPI QR image if present, otherwise generate a QR
    const localUpiPath = 'assets/upi_qr.png';
    upiQR.onerror = () => { upiQR.src = generateUpiQR(0); };
    upiQR.src = localUpiPath;
  }
  if(upiDeepLink) upiDeepLink.href = `upi://pay?pa=${UPI_ID}&pn=NetGalleryHb&cu=INR`;
}

function closeUpiModal(){
  if(!upiModal) return;
  upiModal.classList.add('hidden');
}

if(floatingPayBtn) floatingPayBtn.addEventListener('click', openUpiModal);
if(closeUpi) closeUpi.addEventListener('click', closeUpiModal);
if(copyUpi) copyUpi.addEventListener('click', async () => {
  try{
    await navigator.clipboard.writeText(UPI_ID);
    copyUpi.textContent = 'Copied';
    setTimeout(()=> copyUpi.textContent = 'Copy', 1800);
  }catch(e){
    console.warn('clipboard failed', e);
  }
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
