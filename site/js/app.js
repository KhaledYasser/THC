// Technology Hall — catalog / B2B site logic (Tailwind redesign version).
(function () {
  'use strict';

  const QUOTE_EMAIL = 'info@thc-egypt.org';

  /* ---------- helpers ---------- */
  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function lang() {
    return window.THC_Lang ? window.THC_Lang.get() : 'en';
  }

  function t(key) {
    return window.THC_Lang ? window.THC_Lang.t(key) : key;
  }

  function loc(obj) {
    if (!obj) return '';
    return obj[lang()] || obj['en'] || '';
  }

  function quoteHref(product) {
    const pName = loc(product.name);
    const subject = `Quote request: ${pName}`;
    const body =
`Hello Technology Hall team,

I would like to request a quote for the following product:

Product : ${pName}
Brand   : ${product.brand}
SKU     : ${product.id.toUpperCase()}

Please include pricing, availability and any volume discounts.

Thank you.`;
    return `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function productCard(p) {
    const name = loc(p.name);
    const desc = loc(p.description);
    const catName = window.THC_CATEGORIES ? loc(window.THC_CATEGORIES.find(c => c.id === p.category)?.name) : p.category;

    return `
      <a class="bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group flex flex-col overflow-hidden relative reveal" href="product.html?id=${p.id}" aria-label="${escapeHtml(name)}">
        <div class="aspect-square bg-surface-container p-6 flex items-center justify-center relative overflow-hidden">
          <img src="${p.image}" alt="${escapeHtml(name)}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async"/>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <div class="text-xs font-label-md text-primary mb-2 tracking-wider uppercase">${escapeHtml(p.brand)}</div>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-2 leading-tight">${escapeHtml(name)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow line-clamp-2">${escapeHtml(desc)}</p>
          <div class="flex justify-between items-end mt-auto">
            <span class="font-code-sm text-code-sm text-on-surface-variant">${escapeHtml(catName)}</span>
            <span class="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">
              <span class="material-symbols-outlined text-[18px] rtl:rotate-180">arrow_forward</span>
            </span>
          </div>
        </div>
      </a>
    `;
  }

  /* ---------- renderers ---------- */
  function renderCategories() {
    const el = document.getElementById('cat-grid');
    if (!el || !window.THC_CATEGORIES) return;
    el.innerHTML = window.THC_CATEGORIES.map(c => `
      <a class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group flex flex-col overflow-hidden relative reveal" href="products.html?cat=${c.id}" aria-label="${escapeHtml(loc(c.name))}">
        <div class="aspect-[4/3] bg-surface-container p-6 flex items-center justify-center relative overflow-hidden">
          <img src="${c.image}" alt="${escapeHtml(loc(c.name))}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async"/>
        </div>
        <div class="p-4 flex items-center justify-between bg-surface-container-lowest">
          <span class="font-label-md text-label-md text-on-surface">${escapeHtml(loc(c.name)).toUpperCase()}</span>
          <span class="material-symbols-outlined text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180">arrow_forward</span>
        </div>
      </a>
    `).join('');
  }

  function renderFeatured() {
    const el = document.getElementById('featured-grid');
    if (!el || !window.THC_PRODUCTS) return;
    el.innerHTML = window.THC_PRODUCTS.slice(0, 8).map(productCard).join('');
  }

  function renderLatest() {
    const el = document.getElementById('latest-grid');
    if (!el || !window.THC_PRODUCTS) return;
    el.innerHTML = window.THC_PRODUCTS.slice(8, 16).map(productCard).join('');
  }

  function renderNewsHome() {
    const el = document.getElementById('news-grid-home');
    if (!el || !window.THC_NEWS) return;
    el.innerHTML = window.THC_NEWS.slice(0, 3).map(n => newsCard(n)).join('');
  }

  function renderNewsList() {
    const el = document.getElementById('news-grid');
    if (!el || !window.THC_NEWS) return;
    el.innerHTML = window.THC_NEWS.map(n => newsCard(n)).join('');
  }

  function newsCard(n) {
    const title = loc(n.title);
    const excerpt = loc(n.excerpt);
    const date = loc(n.date);

    return `
      <a href="news-detail.html?id=${n.id}" class="bg-surface rounded-lg border border-outline-variant hover:border-primary transition-colors shadow-sm hover:shadow-md flex flex-col overflow-hidden group reveal">
        <img src="${n.image}" alt="${escapeHtml(title)}" class="aspect-video w-full object-cover bg-surface-container" loading="lazy" decoding="async"/>
        <div class="p-6 flex flex-col gap-2 flex-grow">
          <div class="text-primary text-xs font-label-md tracking-wider uppercase">${escapeHtml(date)}</div>
          <h3 class="font-headline-md text-headline-md text-on-surface leading-tight">${escapeHtml(title)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2">${escapeHtml(excerpt)}</p>
          <span class="text-primary font-label-md text-label-md mt-auto pt-2">${t('read_more')} →</span>
        </div>
      </a>
    `;
  }

  function renderNewsDetail() {
    const el = document.getElementById('article-view');
    if (!el || !window.THC_NEWS) return;
    const id = parseInt(qs('id'), 10);
    const article = window.THC_NEWS.find(n => n.id === id);
    if (!article) {
      el.innerHTML = `<h1 class="font-headline-lg text-headline-lg text-on-surface mb-4">${t('article_not_found')}</h1><p class="font-body-md text-body-md text-on-surface-variant">${t('article_not_found_desc')}</p>`;
      return;
    }

    const title = loc(article.title);
    const date = loc(article.date);
    const content = loc(article.content) || [];

    document.title = `${title} — ${t('site_title')}`;
    el.innerHTML = `
      <div class="text-primary font-label-md text-label-md mb-4 uppercase tracking-wider">${escapeHtml(date)}</div>
      <h1 class="font-headline-xl text-headline-xl text-on-surface mb-6 leading-tight">${escapeHtml(title)}</h1>
      <img class="w-full aspect-video object-cover rounded-xl mb-8 bg-surface-container" src="${article.image}" alt="${escapeHtml(title)}"/>
      <div class="space-y-5">
        ${content.map(p => `<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">${escapeHtml(p)}</p>`).join('')}
      </div>
    `;
  }

  /* ---------- products listing with filters + search ---------- */
  function renderProducts() {
    const wrap = document.getElementById('products-grid');
    if (!wrap || !window.THC_PRODUCTS) return;

    const cat = qs('cat');
    const brand = qs('brand');
    const search = (qs('q') || '').trim().toLowerCase();

    let list = window.THC_PRODUCTS.slice();
    if (cat)    list = list.filter(p => p.category === cat);
    if (brand)  list = list.filter(p => p.brand === brand);
    if (search) list = list.filter(p =>
      loc(p.name).toLowerCase().includes(search) ||
      p.brand.toLowerCase().includes(search) ||
      loc(p.description).toLowerCase().includes(search)
    );

    // category chips
    const catBar = document.getElementById('filter-bar');
    if (catBar) {
      const cats = window.THC_CATEGORIES || [];
      catBar.innerHTML =
        `<button class="${!cat ? 'active' : ''}" data-cat="">${t('all_categories')}</button>` +
        cats.map(c => `<button class="${cat === c.id ? 'active' : ''}" data-cat="${c.id}">${escapeHtml(loc(c.name))}</button>`).join('');
      catBar.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        const c = b.getAttribute('data-cat');
        const params = new URLSearchParams(location.search);
        if (c) params.set('cat', c); else params.delete('cat');
        location.search = params.toString();
      }));
    }

    // brand chips
    const brandBar = document.getElementById('brand-bar');
    if (brandBar) {
      const brands = window.THC_BRANDS || [];
      brandBar.innerHTML =
        `<button class="${!brand ? 'active' : ''}" data-brand="">${t('all_brands')}</button>` +
        brands.map(b => `<button class="${brand === b ? 'active' : ''}" data-brand="${b}">${b}</button>`).join('');
      brandBar.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        const v = b.getAttribute('data-brand');
        const params = new URLSearchParams(location.search);
        if (v) params.set('brand', v); else params.delete('brand');
        location.search = params.toString();
      }));
    }

    // search box
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    if (searchInput) {
        searchInput.value = search;
        searchInput.placeholder = t('search_placeholder');
    }
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = (searchInput.value || '').trim();
        const params = new URLSearchParams(location.search);
        if (v) params.set('q', v); else params.delete('q');
        location.search = params.toString();
      });
    }

    // title
    const h = document.getElementById('products-title');
    if (h) {
      if (cat) {
        const c = (window.THC_CATEGORIES || []).find(x => x.id === cat);
        h.textContent = c ? loc(c.name) : t('products');
      } else if (brand) {
        h.textContent = `${brand} ${t('products')}`;
      } else if (search) {
        h.textContent = `${t('search_results')} "${search}"`;
      } else {
        h.textContent = t('view_all_products');
      }
    }

    const countEl = document.getElementById('products-count');
    if (countEl) countEl.textContent = `${list.length} ${t('products').toLowerCase()}`;

    if (list.length === 0) {
      wrap.innerHTML = `
        <div class="col-span-full text-center py-16 bg-surface-container-low rounded-xl">
          <h3 class="font-headline-md text-headline-md text-on-surface mb-2">${t('no_products_found')}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant mb-6">${t('no_products_found_desc')}</p>
          <a class="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-surface-tint transition-all" href="products.html">${t('view_all_products')}</a>
        </div>`;
    } else {
      wrap.innerHTML = list.map(productCard).join('');
    }
  }

  /* ---------- product detail ---------- */
  function renderProductDetail() {
    const wrap = document.getElementById('pdp');
    if (!wrap || !window.THC_PRODUCTS) return;
    const id = qs('id');
    const p = window.THC_PRODUCTS.find(x => x.id === id);
    if (!p) {
      wrap.innerHTML = `
        <div class="text-center py-16">
          <h3 class="font-headline-lg text-headline-lg text-on-surface mb-2">${t('product_not_found')}</h3>
          <a class="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-surface-tint transition-all" href="products.html">${t('back_to_products')}</a>
        </div>`;
      return;
    }

    const name = loc(p.name);
    const desc = loc(p.description);
    document.title = `${name} — ${t('site_title')}`;
    const cat = (window.THC_CATEGORIES || []).find(c => c.id === p.category);
    const catName = cat ? loc(cat.name) : p.category;

    wrap.innerHTML = `
      <nav class="flex flex-wrap gap-2 items-center text-sm text-on-surface-variant mb-8" aria-label="Breadcrumb">
        <a class="hover:text-primary transition-colors" href="index.html">${t('home')}</a>
        <span class="material-symbols-outlined text-[16px] rtl:rotate-180">chevron_right</span>
        <a class="hover:text-primary transition-colors" href="products.html">${t('products')}</a>
        ${cat ? `<span class="material-symbols-outlined text-[16px] rtl:rotate-180">chevron_right</span><a class="hover:text-primary transition-colors" href="products.html?cat=${cat.id}">${escapeHtml(catName)}</a>` : ''}
        <span class="material-symbols-outlined text-[16px] rtl:rotate-180">chevron_right</span>
        <span class="text-on-surface font-semibold">${escapeHtml(name)}</span>
      </nav>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-7">
          <div class="bg-surface-container rounded-xl aspect-[4/3] flex items-center justify-center p-8 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-tr from-surface-variant/30 to-transparent pointer-events-none"></div>
            <img src="${p.image}" alt="${escapeHtml(name)}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"/>
          </div>
        </div>
        <div class="lg:col-span-5 flex flex-col pt-2">
          <div class="mb-4 flex items-center gap-3 flex-wrap">
            <span class="bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20 font-label-md text-label-md px-3 py-1 rounded-full inline-flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
              ${escapeHtml(p.brand)}
            </span>
            <span class="font-code-sm text-code-sm text-on-surface-variant uppercase tracking-widest">${t('sku')}: ${p.id.toUpperCase()}</span>
          </div>
          <h1 class="font-headline-xl text-headline-xl text-on-surface mb-4">${escapeHtml(name)}</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">${escapeHtml(desc)}</p>
          <div class="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none rtl:right-auto rtl:left-0 rtl:rounded-br-full"></div>
            <div class="flex flex-col gap-3">
              <a class="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded hover:bg-surface-tint transition-all flex items-center justify-center gap-2 group" href="${quoteHref(p)}">
                ${t('request_quote')}
                <span class="material-symbols-outlined group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180">arrow_forward</span>
              </a>
              <a class="w-full bg-transparent border border-outline text-on-surface font-label-md text-label-md py-3 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2" href="products.html">
                ${t('continue_browsing')}
              </a>
            </div>
            <div class="flex items-center justify-center gap-3 font-code-sm text-code-sm text-on-surface-variant">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-tertiary-container">check_circle</span> ${t('in_stock')}</span>
              <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span>${t('ships_in')}</span>
            </div>
          </div>
          <dl class="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-outline-variant/50 text-sm">
            <div><dt class="text-on-surface-variant text-xs uppercase tracking-wider mb-1">${t('category')}</dt><dd class="text-on-surface font-semibold">${catName}</dd></div>
            <div><dt class="text-on-surface-variant text-xs uppercase tracking-wider mb-1">${t('brand')}</dt><dd class="text-on-surface font-semibold">${escapeHtml(p.brand)}</dd></div>
            <div><dt class="text-on-surface-variant text-xs uppercase tracking-wider mb-1">${t('sku')}</dt><dd class="text-on-surface font-semibold">${p.id.toUpperCase()}</dd></div>
            <div><dt class="text-on-surface-variant text-xs uppercase tracking-wider mb-1">${t('availability')}</dt><dd class="text-on-surface font-semibold">${t('in_stock')}</dd></div>
          </dl>
        </div>
      </div>
    `;

    renderRelated(p);
  }

  function renderRelated(current) {
    const wrap = document.getElementById('related-grid');
    if (!wrap || !window.THC_PRODUCTS) return;
    const related = window.THC_PRODUCTS
      .filter(p => p.id !== current.id && (p.category === current.category || p.brand === current.brand))
      .slice(0, 4);
    if (related.length === 0) { wrap.parentElement.style.display = 'none'; return; }
    wrap.innerHTML = related.map(productCard).join('');
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ---------- init ---------- */
  function init() {
    // Translate static elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    renderCategories();
    renderFeatured();
    renderLatest();
    renderNewsHome();
    renderNewsList();
    renderNewsDetail();
    renderProducts();
    renderProductDetail();
    requestAnimationFrame(initReveal);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
