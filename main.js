// ── THEME TOGGLE ──
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const h = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + h) {
        link.style.color = 'var(--acc)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObserver.observe(el));

// ── ACHIEVEMENT TABS ──
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById(target);
    if (pane) pane.classList.add('active');
  });
});

// ── GALLERY FILTER ──
const filterBtns = document.querySelectorAll('.gf-btn');
const galItems = document.querySelectorAll('.gal-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.f;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    galItems.forEach(item => {
      if (f === 'all' || item.dataset.cat === f) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ── LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let activeItems = [];
let currentIdx = 0;

function openLightbox(items, idx) {
  activeItems = items;
  currentIdx = idx;
  showLbImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLbImage() {
  const item = activeItems[currentIdx];
  const img = item.querySelector('img');
  const cap = item.querySelector('.gal-cap');
  lbImg.src = img ? img.src : '';
  lbImg.alt = img ? img.alt : '';
  lbCap.textContent = cap ? cap.textContent : '';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

galItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    const visible = Array.from(galItems).filter(i => !i.classList.contains('hidden'));
    const visIdx = visible.indexOf(item);
    openLightbox(visible, visIdx);
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lbPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIdx = (currentIdx - 1 + activeItems.length) % activeItems.length;
  showLbImage();
});

lbNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIdx = (currentIdx + 1) % activeItems.length;
  showLbImage();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIdx = (currentIdx - 1 + activeItems.length) % activeItems.length; showLbImage(); }
  if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % activeItems.length; showLbImage(); }
});

// ── CONTACT FORM ──
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formOk').classList.add('show');
    btn.textContent = 'Send Message';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => document.getElementById('formOk').classList.remove('show'), 4000);
  }, 1200);
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

