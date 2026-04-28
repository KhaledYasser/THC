// Shared header/footer injector — Tailwind redesign version.
(function () {
  const NAV = [
    { href: 'index.html',      label: 'Home',       key: 'home' },
    { href: 'products.html',   label: 'Products',   key: 'products' },
    { href: 'categories.html', label: 'Categories', key: 'categories' },
    { href: 'services.html',   label: 'Services',   key: 'services' },
    { href: 'about.html',      label: 'About',      key: 'about' },
    { href: 'partners.html',   label: 'Partners',   key: 'partners' },
    { href: 'news.html',       label: 'News',       key: 'news' }
  ];

  function renderHeader(activeKey) {
    const host = document.getElementById('site-header');
    if (!host) return;
    host.className = '';
    host.innerHTML = `
      <nav class="bg-white/80 backdrop-blur-md top-0 sticky z-50 border-b border-slate-200/50 shadow-sm">
        <div class="max-w-7xl mx-auto px-6 flex justify-between items-center h-20 gap-4">
          <a class="text-xl font-bold text-primary font-headline-md whitespace-nowrap shrink-0" href="index.html" aria-label="Technology Hall — home">
            Technology Hall
          </a>
          <div class="hidden lg:flex items-center gap-0.5" id="primary-nav" aria-label="Primary">
            ${NAV.map(n => {
              const isActive = n.key === activeKey;
              return `<a href="${n.href}" class="${isActive
                ? 'text-primary border-b-2 border-primary font-semibold'
                : 'text-slate-600 hover:text-primary'} px-2.5 py-2 transition-all duration-300 hover:bg-slate-50/50 text-xs font-semibold tracking-wide uppercase whitespace-nowrap">${n.label}</a>`;
            }).join('')}
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <div class="hidden xl:flex items-center gap-1 text-slate-600">
              <a href="products.html" class="p-2 hover:text-primary transition-colors" aria-label="Products"><span class="material-symbols-outlined text-[20px]">shopping_cart</span></a>
              <a href="services.html" class="p-2 hover:text-primary transition-colors" aria-label="Account"><span class="material-symbols-outlined text-[20px]">account_circle</span></a>
            </div>
            <a href="mailto:info@thc-egypt.org?subject=Quote Request" class="bg-primary text-on-primary text-xs font-semibold tracking-wide uppercase px-3.5 py-2 rounded hover:bg-surface-tint transition-all hidden md:inline-flex items-center gap-2 whitespace-nowrap">
              Get Quote
            </a>
            <button class="burger lg:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav">
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
                : 'text-slate-600 hover:text-primary hover:bg-slate-50'} px-3 py-3 rounded transition-all text-sm font-semibold tracking-wide uppercase">${n.label}</a>`;
            }).join('')}
            <a href="mailto:info@thc-egypt.org?subject=Quote Request" class="mt-2 bg-primary text-on-primary text-sm font-semibold tracking-wide uppercase px-4 py-3 rounded hover:bg-surface-tint transition-all text-center">
              Get Quote
            </a>
          </div>
        </div>
      </nav>
    `;

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
              <div class="text-lg font-black text-slate-900 mb-4 font-headline-md">Technology Hall</div>
              <p class="text-slate-500 text-sm leading-relaxed">Your trusted partner for enterprise IT infrastructure and premium smart home automation in Egypt.</p>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 mb-4 text-sm tracking-wide uppercase">Company</h4>
              <ul class="space-y-2">
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="about.html">About Us</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="services.html">Contact</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="partners.html">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 mb-4 text-sm tracking-wide uppercase">Legal</h4>
              <ul class="space-y-2">
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="#">Privacy Policy</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="#">Terms of Service</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="#">Warranty</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 mb-4 text-sm tracking-wide uppercase">Support</h4>
              <ul class="space-y-2">
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="services.html">Shipping Info</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="partners.html">Partner Portal</a></li>
                <li><a class="text-slate-500 hover:text-primary text-sm transition-colors" href="mailto:info@thc-egypt.org">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-12 pt-8 border-t border-slate-200/50">
            <p class="text-slate-500 text-sm text-center">© ${year} Technology Hall. All rights reserved.</p>
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
