// ═══════════════════════════════════════════════════
//  JAPAN TRAVEL — Main JavaScript
// ═══════════════════════════════════════════════════

const API_BASE = '/api';

// ── State ──
const state = {
  user: null,
  token: null,
  destinations: [],
  favorites: [],
  activeFilter: 'all'
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadAuth();
  initNavbar();
  initParallax();
  initMobileMenu();
  initAOS();
  loadDestinations();
  initFilterTabs();
  initContactForm();
  initGallery();
  updateNavForAuth();
});

// ═══════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════

function loadAuth() {
  const token = localStorage.getItem('jt_token');
  const user = localStorage.getItem('jt_user');
  if (token && user) {
    state.token = token;
    state.user = JSON.parse(user);
  }
}

function saveAuth(token, user) {
  state.token = token;
  state.user = user;
  localStorage.setItem('jt_token', token);
  localStorage.setItem('jt_user', JSON.stringify(user));
}

function clearAuth() {
  state.token = null;
  state.user = null;
  localStorage.removeItem('jt_token');
  localStorage.removeItem('jt_user');
}

function updateNavForAuth() {
  const navActions = document.getElementById('nav-actions');
  if (!navActions) return;

  if (state.user) {
    const avatar = state.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=c0392b&color=fff&size=80`;
    navActions.innerHTML = `
      <a href="/pages/profile.html" title="Profile">
        <img src="${avatar}" alt="${state.user.name}" class="user-avatar-nav">
      </a>
      ${state.user.role === 'admin' ? '<a href="/pages/admin.html" class="btn btn-dark" style="color:inherit">Admin</a>' : ''}
      <button onclick="logout()" class="btn btn-outline" style="border-color:rgba(0,0,0,0.2);color:var(--stone)">Sign Out</button>
    `;
  } else {
    navActions.innerHTML = `
      <button onclick="openModal('login-modal')" class="btn btn-outline">Sign In</button>
      <button onclick="openModal('register-modal')" class="btn btn-primary">Join Free</button>
    `;
  }
}

function logout() {
  clearAuth();
  state.favorites = [];
  updateNavForAuth();
  renderFavoritesInCards();
  showToast('Signed out successfully', 'info');
}

// ═══════════════════════════════════════════════════
//  API HELPERS
// ═══════════════════════════════════════════════════

async function apiCall(endpoint, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options
  };
  if (state.token) {
    config.headers['Authorization'] = `Bearer ${state.token}`;
  }
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  } catch (err) {
    throw err;
  }
}

// ═══════════════════════════════════════════════════
//  NAVBAR
// ═══════════════════════════════════════════════════

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (hamburger) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }

  // Close on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
}

// ═══════════════════════════════════════════════════
//  PARALLAX
// ═══════════════════════════════════════════════════

function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const speed = 0.4;
    heroBg.style.transform = `scale(1.1) translateY(${scrollY * speed}px)`;
  }, { passive: true });
}

// ═══════════════════════════════════════════════════
//  AOS
// ═══════════════════════════════════════════════════

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }
}

// ═══════════════════════════════════════════════════
//  DESTINATIONS
// ═══════════════════════════════════════════════════

async function loadDestinations(filter = 'all') {
  const grid = document.getElementById('destinations-grid');
  if (!grid) return;

  grid.innerHTML = '<div class="loader"><div class="loader-dots"><span></span><span></span><span></span></div></div>';

  try {
    let url = '/destinations?limit=12';
    if (filter !== 'all') url += `&category=${filter}`;

    const data = await apiCall(url);
    state.destinations = data.destinations;

    // Load favorites if logged in
    if (state.token) {
      try {
        const favData = await apiCall('/favorites');
        state.favorites = favData.favorites.map(f => f.id);
      } catch (e) {}
    }

    renderDestinations(data.destinations);
  } catch (err) {
    grid.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--stone)">
      <div style="font-size:3rem;margin-bottom:1rem">🗾</div>
      <p>Using demo data — connect your backend to see live content</p>
    </div>`;
    renderDemoDestinations(grid);
  }
}

function renderDestinations(destinations) {
  const grid = document.getElementById('destinations-grid');
  if (!grid) return;

  if (!destinations.length) {
    grid.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--stone);grid-column:1/-1">No destinations found</div>';
    return;
  }

  grid.innerHTML = destinations.map((dest, i) => createDestCard(dest, i)).join('');
  initFavButtons();
}

function renderDemoDestinations(grid) {
  const demos = [
    { id: 1, name: 'Mount Fuji', location: 'Shizuoka', category: 'nature', rating: 4.9, description: 'Japan\'s iconic sacred mountain, standing at 3,776m.', image_url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600' },
    { id: 2, name: 'Fushimi Inari', location: 'Kyoto', category: 'temple', rating: 4.8, description: 'Thousands of vermilion torii gates winding through forested hillside.', image_url: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600' },
    { id: 3, name: 'Shibuya Crossing', location: 'Tokyo', category: 'city', rating: 4.7, description: 'The world\'s busiest pedestrian crossing.', image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600' },
    { id: 4, name: 'Arashiyama', location: 'Kyoto', category: 'nature', rating: 4.8, description: 'A serene path through towering bamboo stalks.', image_url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600' },
    { id: 5, name: 'Osaka Castle', location: 'Osaka', category: 'history', rating: 4.6, description: 'Magnificent 16th-century castle surrounded by cherry trees.', image_url: 'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=600' },
    { id: 6, name: 'Nara Deer Park', location: 'Nara', category: 'nature', rating: 4.7, description: 'Roam freely with over 1,200 sacred deer.', image_url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600' },
  ];
  grid.innerHTML = demos.map((dest, i) => createDestCard(dest, i)).join('');
  initFavButtons();
}

function createDestCard(dest, index) {
  const isFav = state.favorites.includes(dest.id);
  const stars = '⭐'.repeat(Math.round(dest.rating || 4));

  return `
    <div class="dest-card" data-aos="fade-up" data-aos-delay="${index * 80}" data-id="${dest.id}">
      <div class="dest-img-wrap">
        <img src="${dest.image_url || 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600'}" 
             alt="${dest.name}" loading="lazy">
        <span class="dest-category">${dest.category || 'destination'}</span>
        <button class="dest-fav-btn ${isFav ? 'active' : ''}" 
                data-id="${dest.id}" 
                onclick="toggleFavorite(event, ${dest.id})"
                aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="dest-info">
        <p class="dest-location">📍 ${dest.location || 'Japan'}</p>
        <h3 class="dest-name">${dest.name}</h3>
        <p class="dest-desc">${dest.description || ''}</p>
        <div class="dest-footer">
          <span class="dest-rating">⭐ ${dest.rating || '4.8'}</span>
          <a class="dest-link" href="/pages/destination.html?id=${dest.id}">
            Explore →
          </a>
        </div>
      </div>
    </div>
  `;
}

function initFavButtons() {
  // Re-init AOS for new elements
  if (typeof AOS !== 'undefined') AOS.refresh();
}

async function toggleFavorite(event, destId) {
  event.stopPropagation();

  if (!state.token) {
    showToast('Please sign in to save favorites', 'error');
    openModal('login-modal');
    return;
  }

  try {
    const data = await apiCall('/favorites', {
      method: 'POST',
      body: { destination_id: destId }
    });

    if (data.action === 'added') {
      state.favorites.push(destId);
      showToast('Added to favorites ❤️', 'success');
    } else {
      state.favorites = state.favorites.filter(id => id !== destId);
      showToast('Removed from favorites', 'info');
    }

    renderFavoritesInCards();

    // Record in history
    await apiCall('/history', {
      method: 'POST',
      body: { destination_id: destId }
    });
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderFavoritesInCards() {
  document.querySelectorAll('.dest-fav-btn').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const isFav = state.favorites.includes(id);
    btn.classList.toggle('active', isFav);
    btn.innerHTML = isFav ? '❤️' : '🤍';
  });
}

// ── Destination Detail Modal ──
async function openDestModal(destId) {
  const dest = state.destinations.find(d => d.id === destId);
  if (!dest) return;

  // Record in history
  if (state.token) {
    try {
      await apiCall('/history', { method: 'POST', body: { destination_id: destId } });
    } catch (e) {}
  }

  const modal = document.getElementById('dest-modal');
  if (!modal) return;

  modal.querySelector('.dest-detail-img').src = dest.image_url || '';
  modal.querySelector('.dest-detail-name').textContent = dest.name;
  modal.querySelector('.dest-detail-location').textContent = `📍 ${dest.location || 'Japan'}`;
  modal.querySelector('.dest-detail-desc').textContent = dest.description || '';
  modal.querySelector('.dest-detail-rating').textContent = `⭐ ${dest.rating}`;
  modal.querySelector('.dest-detail-category').textContent = dest.category;

  openModal('dest-modal');
}

// ═══════════════════════════════════════════════════
//  FILTER TABS
// ═══════════════════════════════════════════════════

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      state.activeFilter = filter;
      loadDestinations(filter);
    });
  });
}

// ═══════════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════════

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const formData = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      subject: form.querySelector('[name="subject"]')?.value,
      message: form.querySelector('[name="message"]').value
    };

    // Pre-fill if logged in
    if (state.user) {
      formData.name = formData.name || state.user.name;
      formData.email = formData.email || state.user.email;
    }

    try {
      await apiCall('/messages', { method: 'POST', body: formData });
      showToast('Message sent! We\'ll be in touch soon 🌸', 'success');
      form.reset();
    } catch (err) {
      showToast(err.message || 'Failed to send message', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}

// ═══════════════════════════════════════════════════
//  AUTH FORMS
// ═══════════════════════════════════════════════════

async function handleRegister(e) {
  e.preventDefault();
  const form = document.getElementById('register-form');
  const btn = form.querySelector('button[type="submit"]');

  const name = form.querySelector('[name="name"]').value;
  const email = form.querySelector('[name="email"]').value;
  const password = form.querySelector('[name="password"]').value;
  const confirm = form.querySelector('[name="confirm"]').value;

  if (password !== confirm) {
    showToast('Passwords do not match', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Creating account...';

  try {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });

    saveAuth(data.token, data.user);
    updateNavForAuth();
    closeModal('register-modal');
    showToast(`Welcome, ${data.user.name}! 🎌`, 'success');
    form.reset();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Create Account';
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const form = document.getElementById('login-form');
  const btn = form.querySelector('button[type="submit"]');

  const email = form.querySelector('[name="email"]').value;
  const password = form.querySelector('[name="password"]').value;

  btn.disabled = true;
  btn.textContent = 'Signing in...';

  try {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: { email, password }
    });

    saveAuth(data.token, data.user);
    updateNavForAuth();
    closeModal('login-modal');
    showToast(`Welcome back, ${data.user.name}! 🗾`, 'success');
    form.reset();

    // Load favorites
    loadDestinations(state.activeFilter);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
}

// ═══════════════════════════════════════════════════
//  GALLERY
// ═══════════════════════════════════════════════════

function initGallery() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbCounter = document.getElementById('lb-counter');
  const lbLoader  = document.getElementById('lb-loader');

  let currentIndex = 0;

  // ── Open lightbox at index ──
  function openAt(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const fullSrc  = item.dataset.full || item.querySelector('img').src;
    const caption  = item.dataset.caption || item.querySelector('img').alt || '';

    // Show loader, hide image
    lbLoader.classList.remove('hidden');
    lbImg.classList.remove('loaded');
    lbImg.src = '';

    // Set caption & counter immediately
    lbCaption.textContent = caption;
    lbCounter.textContent = `${currentIndex + 1} / ${items.length}`;

    // Open panel
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Load full-res image
    const tempImg = new Image();
    tempImg.onload = () => {
      lbImg.src = fullSrc;
      lbLoader.classList.add('hidden');
      requestAnimationFrame(() => lbImg.classList.add('loaded'));
    };
    tempImg.onerror = () => {
      // fallback to thumbnail
      lbImg.src = item.querySelector('img').src;
      lbLoader.classList.add('hidden');
      requestAnimationFrame(() => lbImg.classList.add('loaded'));
    };
    tempImg.src = fullSrc;
  }

  // ── Close ──
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lbImg.src = '';
      lbImg.classList.remove('loaded');
    }, 300);
  }

  // ── Click gallery items ──
  items.forEach((item, i) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => openAt(i));
  });

  // ── Controls ──
  document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lb-backdrop')?.addEventListener('click', closeLightbox);
  document.getElementById('lb-prev')?.addEventListener('click', () => openAt(currentIndex - 1));
  document.getElementById('lb-next')?.addEventListener('click', () => openAt(currentIndex + 1));

  // ── Keyboard ──
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   openAt(currentIndex - 1);
    if (e.key === 'ArrowRight')  openAt(currentIndex + 1);
  });

  // ── Touch swipe support ──
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? openAt(currentIndex + 1) : openAt(currentIndex - 1);
  });
}

// ═══════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════

function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function createToastContainer() {
  const div = document.createElement('div');
  div.id = 'toast-container';
  div.className = 'toast-container';
  document.body.appendChild(div);
  return div;
}

// ═══════════════════════════════════════════════════
//  SMOOTH SCROLL
// ═══════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══════════════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════════════

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    if (!target) return;
    let count = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.textContent = target.toLocaleString() + (counter.dataset.suffix || '');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(count).toLocaleString() + (counter.dataset.suffix || '');
      }
    }, 25);
  });
}

// Trigger counter animation when stats bar is in view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);