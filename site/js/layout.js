// Shared header/footer injector — Tailwind redesign version.
(function () {
  'use strict';

  // --- Localization Core ---
  const DEFAULT_LANG = 'en';
  let currentLang = localStorage.getItem('thc_lang') || DEFAULT_LANG;

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('thc_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Update all dynamic content
    window.dispatchEvent(new CustomEvent('thc_lang_change', { detail: { lang } }));
    init(); // Re-render header/footer
  }

  // Initial set
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  function t(key) {
    const translations = window.THC_TRANSLATIONS && window.THC_TRANSLATIONS[currentLang];
    return (translations && translations[key]) || key;
  }

  // Export for app.js
  window.THC_Lang = {
    get: () => currentLang,
    set: setLanguage,
    t: t
  };

  const NAV = [
    { href: 'index.html',      label: 'home',       key: 'home' },
    { href: 'products.html',   label: 'products',   key: 'products' },
    { href: 'categories.html', label: 'categories', key: 'categories' },
    { href: 'services.html',   label: 'services',   key: 'services' },
    { href: 'about.html',      label: 'about',      key: 'about' },
    { href: 'partners.html',   label: 'partners',   key: 'partners' },
    { href: 'news.html',       label: 'news',       key: 'news' }
  ];

  function renderHeader(activeKey) {
    const host = document.getElementById('site-header');
    if (!host) return;
    host.className = '';
    host.innerHTML = `
      <nav class="bg-white/80 backdrop-blur-md top-0 sticky z-50 border-b border-slate-200/50 shadow-sm">
        <div class="max-w-7xl mx-auto px-6 flex justify-between items-center h-20 gap-4">
          <a class="text-xl font-bold text-primary font-headline-md whitespace-nowrap shrink-0" href="index.html" aria-label="${t('site_title')}">
            ${t('site_title')}
          </a>
          <div class="hidden lg:flex items-center gap-0.5" id="primary-nav" aria-label="Primary">
            ${NAV.map(n => {
              const isActive = n.key === activeKey;
              return `<a href="${n.href}" class="${isActive
                ? 'text-primary border-b-2 border-primary font-semibold'
                : 'text-slate-600 hover:text-primary'} px-2.5 py-2 transition-all duration-300 hover:bg-slate-50/50 text-xs font-semibold tracking-wide uppercase whitespace-nowrap">${t(n.label)}</a>`;
            }).join('')}
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <a href="mailto:info@thc-egypt.org?subject=Quote Request" class="bg-primary text-on-primary text-xs font-semibold tracking-wide uppercase px-3.5 py-2 rounded hover:bg-surface-tint transition-all hidden md:inline-flex items-center gap-2 whitespace-nowrap">
              ${t('get_quote')}
            </a>
            <button id="lang-toggle" class="ml-2 px-3 py-1.5 border border-outline-variant rounded-md text-slate-600 hover:text-primary hover:border-primary transition-all text-sm font-bold uppercase" aria-label="Change Language">
              ${currentLang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button class="burger lg:hidden ml-2" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div id="mobile-nav" class="hidden lg:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-md">
          <div class="px-6 py-4 flex flex-col gap-1">
            ${NAV.map(n => {
              const isActive = n.key === activeKey;
              return `<a href="${n.href}" class="${isActive
                ? 'text-primary font-semibold bg-slate-50'
                : 'text-slate-600 hover:text-primary hover:bg-slate-50'} px-3 py-3 rounded transition-all text-sm font-semibold tracking-wide uppercase">${t(n.label)}</a>`;
            }).join('')}
            <div class="flex gap-2 mt-2">
              <a href="mailto:info@thc-egypt.org?subject=Quote Request" class="flex-grow bg-primary text-on-primary text-sm font-semibold tracking-wide uppercase px-4 py-3 rounded hover:bg-surface-tint transition-all text-center">
                ${t('get_quote')}
              </a>
              <button id="lang-toggle-mobile" class="px-4 py-3 border border-outline-variant rounded text-slate-600 font-bold uppercase">
                ${currentLang === 'en' ? 'عربي' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;

    const setupLangBtn = (id) => {
      const btn = host.querySelector('#' + id);
      if (btn) {
        btn.addEventListener('click', () => {
          setLanguage(currentLang === 'en' ? 'ar' : 'en');
          location.reload();
        });
      }
    };

    setupLangBtn('lang-toggle');
    setupLangBtn('lang-toggle-mobile');

    const burger = host.querySelector('.burger');
    const mobileNav = host.querySelector('#mobile-nav');
    if (burger && mobileNav) {
      burger.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('hidden');
        burger.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    }
  }

  function renderFooter() {
    const host = document.getElementById('site-footer');
    if (!host) return;
    host.className = '';
    const year = new Date().getFullYear();
    host.innerHTML = `
      <footer class="bg-slate-50 py-12 border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div class="text-lg font-black text-slate-900 mb-4 font-headline-md">${t('site_title')}</div>
              <p class="text-slate-500 text-sm leading-relaxed">${t('site_description')}</p>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 mb-4 text-sm tracking-wide uppercase">${t('company')}</h4>
              <ul class="space-y-2">
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="about.html">${t('about_us')}</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="services.html">${t('contact')}</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="partners.html">${t('partners')}</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 mb-4 text-sm tracking-wide uppercase">${t('legal')}</h4>
              <ul class="space-y-2">
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="#">${t('privacy_policy')}</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="#">${t('terms_of_service')}</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="#">${t('warranty')}</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 mb-4 text-sm tracking-wide uppercase">${t('support')}</h4>
              <ul class="space-y-2">
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="services.html">${t('shipping_info')}</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="partners.html">${t('partner_portal')}</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="mailto:info@thc-egypt.org">${t('contact_us')}</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-12 pt-8 border-t border-slate-200/50">
            <p class="text-slate-500 text-sm text-center">© ${year} ${t('site_title')}. ${t('all_rights_reserved')}</p>
          </div>
        </div>
      </footer>
    `;
  }

  function init() {
    const activeKey = (document.body && document.body.dataset.page) || '';
    renderHeader(activeKey);
    renderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.THC_Layout = { renderHeader, renderFooter };
})();
