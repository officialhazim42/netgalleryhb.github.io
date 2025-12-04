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

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

if (navLinks && navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (navMenu) navMenu.classList.remove('active');
    });
  });
}

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

// Simple analytics tracker: increments counters in localStorage and attempts sendBeacon
function trackEvent(name, payload = {}) {
  try {
    const key = `analytics.${name}`;
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, String(current + 1));
  } catch (e) {
    // ignore storage errors
  }

  try {
    const body = JSON.stringify({ event: name, payload, ts: Date.now() });
    if (navigator.sendBeacon) {
      // send to a no-op endpoint; site owners can change this to a real endpoint
      navigator.sendBeacon('/analytics', body);
    } else if (window.fetch) {
      fetch('/analytics', { method: 'POST', body, keepalive: true }).catch(()=>{});
    }
  } catch (e) {
    // best-effort
    console.log('trackEvent', name, payload);
  }
}



// Button Get karo
let scrollBtn = document.getElementById("scrollTopBtn");

// Jab user scroll kare → button show karo
window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

// Click → Smooth Scroll to Top
scrollBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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

if (langSelect) {
  langSelect.addEventListener('change', (e)=>{applyLanguage(e.target.value, true);});
  
  // Initialize language on load (no animation)
  const savedLang = localStorage.getItem('language') || 'en';
  langSelect.value = savedLang;
  applyLanguage(savedLang, false);
}

// ============================================
// BOOKING FORM
// ============================================

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

if (bookingForm) {
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
}

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

if (reviewsNext && reviewCards.length > 0) {
  reviewsNext.addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex + 1) % reviewCount;
    showReview(currentReviewIndex);
  });
}

if (reviewsPrev && reviewCards.length > 0) {
  reviewsPrev.addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex - 1 + reviewCount) % reviewCount;
    showReview(currentReviewIndex);
  });
}

// Show first review
if (reviewCards.length > 0) {
  showReview(0);
  
  // Auto-rotate reviews
  setInterval(() => {
    currentReviewIndex = (currentReviewIndex + 1) % reviewCount;
    showReview(currentReviewIndex);
  }, 5000);
}

// ============================================
// CHAT WIDGET
// ============================================

const chatResponses = {
  // Greetings
  hello: 'Hello! 👋 Welcome to Net Gallery HB! How can I assist you today?',
  hi: 'Hi there! 👋 Thanks for reaching out. What can I help you with?',
  hey: 'Hey! 😊 Great to see you! What do you need help with?',
  greetings: 'Welcome to Net Gallery HB! 🎉 We\'re here to help. Ask me about our services, prices, hours, or anything else!',
  
  // Services
  services: '🎯 Our Services:\n✨ CSC/eKYC Services\n🖨️ Professional Printing (Color & B&W)\n📱 Custom Phone Covers\n🖼️ Photo Frames & Wall Art\n💻 Digital Help & Online Forms\n📷 Passport & ID Photos\n\nWhich service interests you?',
  printing: '🖨️ Printing Services:\n• A4/A3 Color Printing - ₹5-10/page\n• Black & White - ₹2-5/page\n• Document Binding\n• Lamination Available\n• Fast Turnaround Time\n\nWant to book now?',
  covers: '📱 Custom Phone Covers:\n• All Mobile Models Supported\n• Premium Quality Material\n• Vibrant HD Printing\n• Price: ₹299/cover\n• Quick Delivery\n\nLet\'s create yours!',
  frames: '🖼️ Photo Frames:\n• Small Frames - ₹199\n• Large Frames - ₹399\n• Fully Customizable Design\n• Premium Material\n• Perfect Gift Option\n\nInterested?',
  csc: '🏛️ Government Services:\n• PM-SYM Scheme Registration\n• Bank Account Opening (eKYC)\n• Aadhaar Services\n• Voter ID & Driving License\n• PAN & ABHA Cards\n• All Documentation Handled\n\nNeed help with any of these?',
  
  // Pricing
  price: '💰 Our Pricing:\n📱 Custom Phone Cover - ₹299\n🖼️ Photo Frame (S) - ₹199 | (L) - ₹399\n🖨️ Document Print - ₹10/page (A4)\n📷 Passport Photos (4 pcs) - ₹149\n📞 CSC Services - Variable\n\nBulk orders get special discounts!',
  cost: '💰 Cost Details:\n• Printing starts from ₹2/page\n• Custom covers at ₹299\n• Frames from ₹199\n• Competitive rates guaranteed\n\nAsk for bulk pricing!',
  discount: '🎁 Special Offers:\n• Bulk Printing - 20% off\n• Combo Packages Available\n• Referral Rewards Program\n• First-time Customer Discount\n\nContact us for current deals!',
  
  // Booking & Hours
  booking: '📅 Booking Process:\n1. Fill the form on our website\n2. Or contact us via WhatsApp\n3. Confirm your service & timeline\n4. We deliver within promised time\n\nReady to book?',
  appointment: '📆 To Schedule:\n• Use our online booking form\n• Message us on WhatsApp: +91 80824 22129\n• We respond within 30 minutes\n• Confirmation within 1-2 hours\n\nLet\'s set it up!',
  hours: '⏰ Operating Hours:\n📅 Monday - Saturday: 10:00 AM - 7:00 PM\n📅 Sunday: CLOSED\n\n⚠️ We\'re open now! Drop by or message us!',
  timing: '⏱️ Our Timings:\n• Monday-Saturday: 10 AM - 7 PM\n• Sunday: Holiday (Closed)\n• Quick turnaround on most jobs\n• Express service available\n\nWhat do you need?',
  
  // Location & Contact
  location: '📍 Our Location:\n🏪 Net Gallery HB\n📮 Sahipora, Ganderbal\n🗺️ Jammu & Kashmir, 191201\n\nView on map or get directions!',
  address: '📍 Find Us:\nNet Gallery HB\nSahipora\nGanderbal District\nJ&K 191201\n\nUse our map link for directions!',
  contact: '📞 Contact Us:\n☎️ Phone: +91 80824 22129\n💬 WhatsApp: +91 80824 22129\n📧 Channel: Join our WhatsApp channel\n💰 UPI: erhashim@yespop\n\nWhich channel would you prefer?',
  phone: '☎️ Call us at: +91 80824 22129\n(Monday-Saturday, 10 AM - 7 PM)',
  whatsapp: '💬 Chat on WhatsApp:\n+91 80824 22129\n(Instant replies available!)\n\nOr join our WhatsApp Channel for updates!',
  
  // Payment
  payment: '💳 Payment Methods:\n✅ UPI (erhashim@yespop)\n✅ WhatsApp Pay\n✅ Google Pay\n✅ PhonePe\n✅ Cash Payment\n\nWhich method works for you?',
  upi: '💳 UPI Payment:\n📱 UPI ID: erhashim@yespop\n✨ Instant & Secure\n📲 Works with all UPI apps\n\nClick "Pay via UPI" button!',
  
  // Special Requests
  custom: '🎨 Custom Orders:\n• Custom Designs Accepted\n• Special Sizes Available\n• Bulk Orders Welcome\n• Corporate Packages\n\nTell us your requirements!',
  bulk: '📦 Bulk Orders:\n• 20-50 items: 15% off\n• 50-100 items: 20% off\n• 100+ items: 25% off\n• Free delivery on bulk\n\nHow many items?',
  quality: '⭐ Our Quality:\n✨ Premium Materials Used\n✨ HD Printing Technology\n✨ Professional Team\n✨ 100% Satisfaction Guaranteed\n✨ 5-Star Google Rated\n\nYour satisfaction is our priority!',
  
  // About
  about: '🏢 About Net Gallery HB:\n👨‍💼 Trusted Service Provider\n📍 Located in Sahipora, Ganderbal\n🎯 Serving community since years\n💼 Professional & Reliable\n⭐ Highly Rated by Customers\n\nWe\'re here to help!',
  company: '🏪 Net Gallery HB:\n✅ Licensed CSC Operator\n✅ Professional Services\n✅ Quick Turnaround\n✅ Best Prices Guaranteed\n✅ Customer Satisfaction First\n\nYour trust is our priority!',
  
  // Help & Support
  help: '🆘 How Can I Help?\n📱 Services - Our offerings\n💰 Price - Pricing details\n⏰ Hours - Operating hours\n📍 Location - Where to find us\n📞 Contact - How to reach us\n📅 Booking - How to book\n💳 Payment - Payment methods\n🎨 Custom - Custom orders\n\nAsk anything!',
  options: '📋 Available Commands:\nTry: "services", "pricing", "hours", "location", "contact", "booking", "payment", "custom", "help"\n\nOr just ask naturally - I understand!',
  
  // Feedback
  feedback: '⭐ We\'d love your feedback!\nShare your experience with us.\nYour reviews help us improve!\n\n📍 Visit us on Google Maps\n📱 Follow us on Instagram\n📺 Subscribe on YouTube\n\nThank you! 😊',
  review: '⭐ Customer Reviews:\n✨ 5-Star Google Ratings\n💬 See what others say about us\n📸 Follow our work on Instagram\n\nWant to share your experience?',
  
  // Fun & Casual
  thanks: 'Thank you for choosing us! 🙏 We appreciate your trust and support!',
  thankyou: 'You\'re welcome! 😊 Happy to help! Feel free to reach out anytime!',
  welcome: '🎉 Welcome to Net Gallery HB! We\'re excited to serve you!',
  awesome: '😎 That\'s awesome! We\'re here to make it even better!',
  
  // Default
  default: '👋 Hi! I\'m here to help!\n\nTry asking about:\n📱 Services | 💰 Pricing | ⏰ Hours | 📍 Location | 📞 Contact | 📅 Booking | 💳 Payment\n\nOr just chat naturally!'
};

function getBotResponse(message) {
  const msg = message.toLowerCase().trim();
  
  // Greetings
  if (msg === 'hi' || msg === 'hello' || msg === 'hey' || msg.match(/^(hi|hello|hey)[\s!.?]*$/)) return chatResponses.hello;
  if (msg.includes('greet') || msg === 'wassup') return chatResponses.greetings;
  
  // Services
  if (msg.includes('service')) return chatResponses.services;
  if (msg.includes('print')) return chatResponses.printing;
  if (msg.includes('cover') || msg.includes('phone cover')) return chatResponses.covers;
  if (msg.includes('frame') || msg.includes('photo frame')) return chatResponses.frames;
  if (msg.includes('csc') || msg.includes('govt') || msg.includes('government') || msg.includes('ekyc')) return chatResponses.csc;
  
  // Pricing
  if (msg.includes('price') || msg.includes('cost') || msg.includes('₹')) return chatResponses.price;
  if (msg.includes('discount') || msg.includes('offer') || msg.includes('deal')) return chatResponses.discount;
  
  // Booking & Hours
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('reserve')) return chatResponses.booking;
  if (msg.includes('hour') || msg.includes('time') || msg.includes('open') || msg.includes('close')) return chatResponses.hours;
  if (msg.includes('timing')) return chatResponses.timing;
  
  // Location & Contact
  if (msg.includes('location') || msg.includes('where') || msg.includes('address')) return chatResponses.location;
  if (msg.includes('contact') || msg.includes('reach') || msg.includes('call') || msg.includes('phone')) return chatResponses.contact;
  if (msg.includes('whatsapp') || msg.includes('wa')) return chatResponses.whatsapp;
  
  // Payment
  if (msg.includes('pay') || msg.includes('payment') || msg.includes('upi')) return chatResponses.payment;
  
  // Special
  if (msg.includes('custom') || msg.includes('personalize')) return chatResponses.custom;
  if (msg.includes('bulk') || msg.includes('wholesale')) return chatResponses.bulk;
  if (msg.includes('quality') || msg.includes('guarantee')) return chatResponses.quality;
  
  // About
  if (msg.includes('about') || msg.includes('who are you')) return chatResponses.about;
  if (msg.includes('company') || msg.includes('business')) return chatResponses.company;
  
  // Help
  if (msg.includes('help') || msg.includes('support') || msg === '?' || msg.includes('options') || msg.includes('commands')) return chatResponses.help;
  
  // Feedback
  if (msg.includes('feedback') || msg.includes('review') || msg.includes('rating')) return chatResponses.feedback;
  
  // Fun
  if (msg.includes('thank') || msg === 'thanks') return chatResponses.thanks;
  if (msg.includes('welcome')) return chatResponses.welcome;
  if (msg.includes('awesome') || msg.includes('great') || msg.includes('cool')) return chatResponses.awesome;
  
  return chatResponses.default;
}

function addChatMessage(text, sender) {
  if (!chatMessages) return;
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  // Message content
  const p = document.createElement('p');
  p.textContent = text;
  messageDiv.appendChild(p);

  // If bot mentions payment/UPI, add action buttons + inline QR support
  try {
    const lowered = String(text).toLowerCase();
    const mentionsPayment = /\b(upi|pay|payment|upi id|google pay|phonepe)\b/.test(lowered);
    if (!chatMessages) return;

    if (sender === 'bot' && mentionsPayment) {
      const actions = document.createElement('div');
      actions.className = 'chat-actions';

      // Pay via UPI button - toggles inline QR and also opens modal/deeplink if desired
      const payBtn = document.createElement('button');
      payBtn.className = 'btn chat-pay-btn';
      payBtn.type = 'button';
      payBtn.textContent = 'Pay via UPI';
      payBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Analytics
        try { trackEvent('chat_pay_click', { source: 'chat' }); } catch(e){}

        // Toggle inline QR
        let qrWrap = messageDiv.querySelector('.chat-qr-wrapper');
        if (qrWrap) {
          // toggle
          qrWrap.style.display = qrWrap.style.display === 'none' ? 'flex' : 'none';
          return;
        }

        // Create QR wrapper
        qrWrap = document.createElement('div');
        qrWrap.className = 'chat-qr-wrapper';

        const qrImg = document.createElement('img');
        qrImg.className = 'chat-qr';
        // Prefer user-provided QR image
        const localUpiPath = 'assets/upi_qr.png';
        qrImg.onerror = () => { qrImg.src = generateUpiQR(0); };
        qrImg.src = localUpiPath;

        const meta = document.createElement('div');
        meta.className = 'chat-qr-meta';
        meta.innerHTML = `<div><strong>UPI ID:</strong> erhashim@yespop</div>`;

        const openLink = document.createElement('a');
        openLink.href = typeof upiDeepLink !== 'undefined' && upiDeepLink && upiDeepLink.href ? upiDeepLink.href : `upi://pay?pa=${encodeURIComponent('erhashim@yespop')}&pn=NetGalleryHb&cu=INR`;
        openLink.target = '_blank';
        openLink.className = 'map-link-btn';
        openLink.textContent = 'Open in UPI app';

        meta.appendChild(openLink);
        qrWrap.appendChild(qrImg);
        qrWrap.appendChild(meta);
        messageDiv.appendChild(qrWrap);
      });

      // Copy UPI button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn chat-copy-btn';
      copyBtn.type = 'button';
      copyBtn.textContent = 'Copy UPI ID';
      copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText('erhashim@yespop');
            try { trackEvent('chat_copy_upi', {}); } catch(e){}
            copyBtn.textContent = 'Copied!';
            setTimeout(()=> copyBtn.textContent = 'Copy UPI ID', 1500);
          } else {
            const tmp = document.createElement('input');
            document.body.appendChild(tmp);
            tmp.value = 'erhashim@yespop';
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            try { trackEvent('chat_copy_upi', {}); } catch(e){}
            copyBtn.textContent = 'Copied!';
            setTimeout(()=> copyBtn.textContent = 'Copy UPI ID', 1500);
          }
        } catch (err) {
          console.warn('Copy failed', err);
        }
      });

      actions.appendChild(payBtn);
      actions.appendChild(copyBtn);
      messageDiv.appendChild(actions);
    }
  } catch (err) {
    console.warn('chat action render error', err);
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChat() {
  if (!chatInput) return;
  const message = chatInput.value.trim();
  if (!message) return;
  
  addChatMessage(message, 'user');
  chatInput.value = '';
  
  setTimeout(() => {
    const response = getBotResponse(message);
    addChatMessage(response, 'bot');
  }, 600);
}

if (chatButton && chatWidget) {
  chatButton.addEventListener('click', () => {
    chatWidget.classList.toggle('hidden');
    if (!chatWidget.classList.contains('hidden') && chatInput) {
      chatInput.focus();
    }
  });
}

if (closeChat && chatWidget) {
  closeChat.addEventListener('click', () => {
    chatWidget.classList.add('hidden');
  });
}

if (chatSend) {
  chatSend.addEventListener('click', sendChat);
}

if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChat();
    }
  });
}

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
