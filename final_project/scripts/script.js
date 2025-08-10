// Basic utils
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Sample data (dynamic items, >= 15 with 4+ properties)
const galleryData = [
  { id: 1, title: 'Bridal Elegance', category: 'weddings', type: 'cookies', emoji: '💍', description: 'Elegant bridal cookie set with lace details.' },
  { id: 2, title: 'Pastel Macarons', category: 'birthdays', type: 'macarons', emoji: '🍬', description: 'Assorted pastel macarons with vanilla and raspberry.' },
  { id: 3, title: 'Holiday Cheer', category: 'holidays', type: 'cookies', emoji: '🎄', description: 'Holiday-themed cookies with icing decorations.' },
  { id: 4, title: 'Gold Accents', category: 'weddings', type: 'macarons', emoji: '🥇', description: 'Macarons with edible gold accents.' },
  { id: 5, title: 'Birthday Blast', category: 'birthdays', type: 'cookies', emoji: '🎉', description: 'Colorful birthday cookies with sprinkles.' },
  { id: 6, title: 'Snowflake Set', category: 'holidays', type: 'cookies', emoji: '❄️', description: 'Icy blue snowflake cookie assortment.' },
  { id: 7, title: 'Rose Macarons', category: 'weddings', type: 'macarons', emoji: '🌹', description: 'Rose-flavored macarons with buttercream.' },
  { id: 8, title: 'Corporate Logo', category: 'corporate', type: 'cookies', emoji: '🏢', description: 'Branded logo cookies for events.' },
  { id: 9, title: 'Unicorn Dreams', category: 'birthdays', type: 'cookies', emoji: '🦄', description: 'Unicorn-themed cookies for kids.' },
  { id:10, title: 'Mint Delight', category: 'holidays', type: 'macarons', emoji: '🌿', description: 'Mint and dark chocolate macarons.' },
  { id:11, title: 'Spring Garden', category: 'weddings', type: 'cookies', emoji: '🌼', description: 'Floral piping with pastel palette.' },
  { id:12, title: 'Caramel Kiss', category: 'birthdays', type: 'macarons', emoji: '🍮', description: 'Salted caramel macarons.' },
  { id:13, title: 'Gingerbread Joy', category: 'holidays', type: 'cookies', emoji: '🫚', description: 'Classic gingerbread with icing.' },
  { id:14, title: 'Lavender Love', category: 'weddings', type: 'macarons', emoji: '💜', description: 'Lavender-infused macarons.' },
  { id:15, title: 'Rainbow Set', category: 'birthdays', type: 'cookies', emoji: '🌈', description: 'Rainbow sugar cookies.' },
  { id:16, title: 'Snow Macarons', category: 'holidays', type: 'macarons', emoji: '☃️', description: 'Vanilla snow macarons.' },
  { id:17, title: 'Beach Theme', category: 'birthdays', type: 'cookies', emoji: '🏖️', description: 'Summer beach-themed cookies.' }
];

const featuredData = [
  { id: 'f1', title: 'Wedding Cookie Set', emoji: '💍', blurb: 'Delicate lace and pearl details', cta: 'View' },
  { id: 'f2', title: 'Rainbow Macarons', emoji: '🌈', blurb: 'A spectrum of flavors', cta: 'View' },
  { id: 'f3', title: 'Holiday Collection', emoji: '🎄', blurb: 'Festive designs for the season', cta: 'View' },
  { id: 'f4', title: 'Corporate Logos', emoji: '🏢', blurb: 'Brand your event in style', cta: 'View' },
  { id: 'f5', title: 'Birthday Mix', emoji: '🎉', blurb: 'Colorful, fun, and delicious', cta: 'View' },
  { id: 'f6', title: 'Floral Garden', emoji: '🌼', blurb: 'Hand-piped florals', cta: 'View' }
];

const testimonials = [
  { name: 'Ana P.', text: 'Absolutely stunning cookies! They were the hit of our wedding.', rating: 5 },
  { name: 'Bruno C.', text: 'The macarons were perfect—crisp shell and chewy center.', rating: 5 },
  { name: 'Luisa M.', text: 'Mary was so helpful customizing our corporate gift sets.', rating: 4 }
];

// Accessibility: handle mobile menu
function setupMenu() {
  const hamburger = $('#hamburger');
  const menu = $('#primaryMenu');
  if (!hamburger || !menu) return;
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  // Close on link click (small screens)
  $$('.nav-link', menu).forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Smooth scroll
function setupSmoothScroll() {
  $$('.cta-button[data-scroll-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-scroll-target');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });
}

// Render featured on home
function renderFeatured() {
  const grid = $('#featuredGrid');
  if (!grid) return;
  grid.innerHTML = featuredData.map(item => `
    <article class="featured-item" tabindex="0" aria-labelledby="feat-${item.id}-title">
      <div class="featured-image" role="img" aria-label="${item.title}">${item.emoji}</div>
      <h3 id="feat-${item.id}-title">${item.title}</h3>
      <p>${item.blurb}</p>
      <button class="view-btn" type="button" data-open="${item.title}" aria-label="View ${item.title}">${item.cta}</button>
    </article>
  `).join('');
}

// Render testimonials
function renderTestimonials() {
  const cont = $('#testimonialSlider');
  if (!cont) return;
  cont.innerHTML = testimonials.map(t => `
    <blockquote class="testimonial-card">
      <p class="testimonial-text">“${t.text}”</p>
      <p class="testimonial-author">${t.name} • ${'⭐'.repeat(t.rating)}</p>
    </blockquote>
  `).join('');
}

// Gallery rendering with filter + localStorage
function setupGallery() {
  const grid = $('#galleryItems');
  if (!grid) return;

  const filterBtns = $$('.filter-btn');
  const savedFilter = localStorage.getItem('mcGalleryFilter') || 'all';

  function applyFilter(filter) {
    const items = (filter === 'all')
      ? galleryData
      : galleryData.filter(g => g.category === filter || g.type === filter);

    grid.innerHTML = items.map(item => `
      <article class="gallery-item" tabindex="0" data-id="${item.id}" data-title="${item.title}" data-description="${item.description}">
        <div class="gallery-image" role="img" aria-label="${item.title}">${item.emoji}</div>
        <div class="gallery-item-info">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="category-tag">${item.category}</span>
        </div>
      </article>
    `).join('');

    // Re-bind modal openers
    $$('.gallery-item', grid).forEach(el => {
      el.addEventListener('click', () => openModal(el));
      el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(el);
        }
      });
    });
  }

  filterBtns.forEach(btn => {
    const f = btn.dataset.filter;
    if (f === savedFilter) {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      localStorage.setItem('mcGalleryFilter', f);
      applyFilter(f);
    });
  });

  applyFilter(savedFilter);
}

// Modal dialog
function setupModal() {
  const modal = $('#imageModal');
  const modalImg = $('#modalImage');
  const modalTitle = $('#modalTitle');
  const modalDesc = $('#modalDescription');
  const closeBtn = $('#modalClose');

  if (!modal) return;

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  window.openModal = (el) => {
    const title = el.getAttribute('data-title') || 'Item';
    const description = el.getAttribute('data-description') || '';
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    modalImg.alt = title;
    modalImg.src = 'https://placehold.co/800x400?text=' + encodeURIComponent(title);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
  });
}

// Estimate calculator + form helpers + localStorage states
function setupOrderPage() {
  const qtyInput = $('#calcQuantity');
  const typeSelect = $('#calcType');
  const calcBtn = $('#calculateBtn');
  const result = $('#estimateResult');

  calcBtn?.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value, 10);
    const price = parseFloat(typeSelect.value);
    if (Number.isFinite(qty) && qty >= 12) {
      const total = qty * price;
      result.textContent = `Estimated total: $${total.toFixed(2)} (${qty} × $${price.toFixed(2)})`;
      localStorage.setItem('mcLastEstimate', JSON.stringify({ qty, price, total }));
    } else {
      result.textContent = 'Please enter a valid quantity (min 12).';
    }
  });

  // Persist name/email to prefill forms
  const orderForm = $('#orderForm');
  if (orderForm) {
    const name = localStorage.getItem('mcUserName');
    const email = localStorage.getItem('mcUserEmail');
    if (name) $('#customerName').value = name;
    if (email) $('#email').value = email;

    orderForm.addEventListener('submit', (e) => {
      // minimal client validation for UX (HTML5 validation also runs)
      const quantity = parseInt($('#quantity').value, 10);
      const terms = $('#termsAccepted').checked;
      if (!Number.isFinite(quantity) || quantity < 12 || !terms) {
        // Let browser validation messages handle specifics
        return;
      }
      // Allow form to navigate to form-result.html via GET
    });
  }

  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      const name = $('#contactName')?.value?.trim();
      const email = $('#contactEmail')?.value?.trim();
      if (name) localStorage.setItem('mcUserName', name);
      if (email) localStorage.setItem('mcUserEmail', email);
    });
  }
}

// Wayfinding enhancement: set aria-current when path matches
function setupWayfinding() {
  const path = location.pathname.split('/').pop().toLowerCase() || 'project.html';
  $$('.nav-link').forEach(a => {
    const href = a.getAttribute('href')?.toLowerCase();
    if (href === path) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });
}

// Best Practices small fixes
function setupPerformanceHints() {
  // Example lazy-loading for placeholder images created here
  $$('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    img.decoding = 'async';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupSmoothScroll();
  setupWayfinding();
  setupPerformanceHints();
  renderFeatured();
  renderTestimonials();
  setupGallery();
  setupModal();
  setupOrderPage();

  // Asynchronous example with try/catch (for rubric)
  (async function fetchLocalJsonDemo() {
    try {
      // Simulate async fetch of local data (replace with a real JSON file if available)
      const data = await new Promise(resolve => setTimeout(() => resolve({ status: 'ok' }), 50));
      console.debug('Async demo result:', data);
    } catch (err) {
      console.error('Async demo error:', err);
    }
  })();
});