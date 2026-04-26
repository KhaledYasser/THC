// Technology Hall app logic
(function () {
  const STORAGE_KEY = 'thc_cart_v1';

  const Cart = {
    load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (_) { return []; } },
    save(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); },
    count() { return this.load().reduce((s, i) => s + i.qty, 0); },
    total() {
      const products = window.THC_PRODUCTS || [];
      return this.load().reduce((sum, it) => {
        const p = products.find(x => x.id === it.id);
        return sum + (p ? (p.price || 0) * it.qty : 0);
      }, 0);
    },
    add(id, qty = 1) {
      const items = this.load();
      const existing = items.find(i => i.id === id);
      if (existing) existing.qty += qty;
      else items.push({ id, qty });
      this.save(items);
      updateCartBadge();
    },
    setQty(id, qty) {
      const items = this.load().map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
      this.save(items);
      updateCartBadge();
    },
    remove(id) {
      this.save(this.load().filter(i => i.id !== id));
      updateCartBadge();
    },
    clear() { this.save([]); updateCartBadge(); }
  };
  window.THC_Cart = Cart;

  function updateCartBadge() {
    const el = document.querySelector('.cart-count');
    if (el) el.textContent = Cart.count();
  }

  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let out = '';
    for (let i = 0; i < 5; i++) {
      if (i < full) out += '★';
      else if (i === full && half) out += '⯪';
      else out += '☆';
    }
    return out;
  }

  function productCard(p) {
    return `
      <a class="product-card" href="product.html?id=${p.id}">
        <div class="thumb">
          <img src="${p.image}" alt="${p.name}" loading="lazy"/>
          <span class="badge">${p.brand}</span>
          ${p.sale ? '<span class="sale">SALE</span>' : ''}
        </div>
        <div class="body">
          <div class="brand">${p.brand}</div>
          <div class="title">${p.name}</div>
          <div class="rating">${renderStars(p.rating)} <span class="count">(${p.reviews})</span></div>
          ${p.price !== undefined ? `<div class="price">$${p.price.toFixed(2)} ${p.oldPrice ? `<span class="old">$${p.oldPrice.toFixed(2)}</span>` : ''}</div>` : ''}
        </div>
      </a>
    `;
  }

  function renderFeatured() {
    const el = document.getElementById('featured-grid');
    if (!el) return;
    el.innerHTML = window.THC_PRODUCTS.slice(0, 8).map(productCard).join('');
  }

  function renderNewsHome() {
    const el = document.getElementById('news-grid-home');
    if (!el) return;
    // Mock news data or fetch if available. For now, using static content.
    const news = [
        { date: 'OCT 24, 2023', title: 'New Canon MegaTank Lineup Arrives', desc: 'Discover the latest high-efficiency printers from Canon, now in stock at Technology Hall.' },
        { date: 'OCT 20, 2023', title: 'The Future of POS Systems', desc: 'How cloud-integrated POS solutions are transforming retail across Egypt.' },
        { date: 'OCT 15, 2023', title: 'IT Infrastructure Trends 2024', desc: 'Stay ahead with our latest guide on modernizing your business IT environment.' }
    ];
    el.innerHTML = news.map(n => `
        <div class="news-card">
            <div class="body">
                <div class="date">${n.date}</div>
                <h3>${n.title}</h3>
                <p>${n.desc}</p>
            </div>
        </div>
    `).join('');
  }

  function renderLatest() {
    const el = document.getElementById('latest-grid');
    if (!el) return;
    el.innerHTML = window.THC_PRODUCTS.slice(8, 16).map(productCard).join('');
  }

  function renderCategories() {
    const el = document.getElementById('cat-grid');
    if (!el) return;
    el.innerHTML = window.THC_CATEGORIES.map(c => `
      <a class="cat-card" href="products.html?cat=${c.id}">
        <img src="${c.image}" alt="${c.name}" loading="lazy"/>
        <div class="overlay">${c.name.toUpperCase()}</div>
      </a>
    `).join('');
  }

  function renderBrands() {
    const el = document.getElementById('brand-list');
    if (!el) return;
    el.innerHTML = window.THC_BRANDS.map(b => `<div class="brand">${b}</div>`).join('');
  }

  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function renderProducts() {
    const wrap = document.getElementById('products-grid');
    if (!wrap) return;
    const cat = qs('cat');
    const brand = qs('brand');
    const search = (qs('q') || '').toLowerCase();
    let list = window.THC_PRODUCTS;
    if (cat) list = list.filter(p => p.category === cat);
    if (brand) list = list.filter(p => p.brand === brand);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search));

    const bar = document.getElementById('filter-bar');
    if (bar) {
      const cats = window.THC_CATEGORIES;
      bar.innerHTML =
        `<button class="${!cat ? 'active' : ''}" data-cat="">All</button>` +
        cats.map(c => `<button class="${cat === c.id ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`).join('');
      bar.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        const c = b.getAttribute('data-cat');
        location.search = c ? `?cat=${c}` : '';
      }));
    }

    const h = document.getElementById('products-title');
    if (h) {
      if (cat) {
        const c = window.THC_CATEGORIES.find(x => x.id === cat);
        h.textContent = c ? c.name : 'Products';
      } else {
        h.textContent = 'All Products';
      }
    }

    if (list.length === 0) {
      wrap.innerHTML = '<p style="text-align:center;color:#888;padding:40px;">No products found.</p>';
    } else {
      wrap.innerHTML = list.map(productCard).join('');
    }
  }

  function renderProductDetail() {
    const wrap = document.getElementById('pdp');
    if (!wrap) return;
    const id = qs('id');
    const p = window.THC_PRODUCTS.find(x => x.id === id);
    if (!p) { wrap.innerHTML = '<p style="text-align:center">Product not found.</p>'; return; }
    document.title = `${p.name} — Technology Hall`;
    wrap.innerHTML = `
      <div class="gallery"><img src="${p.image}" alt="${p.name}"/></div>
      <div class="info">
        <div class="brand">${p.brand}</div>
        <h1>${p.name}</h1>
        <div class="rating">${renderStars(p.rating)} <span class="count" style="color:#888">(${p.reviews} reviews)</span></div>
        ${p.price !== undefined ? `<div class="price">$${p.price.toFixed(2)} ${p.oldPrice ? `<span class="old">$${p.oldPrice.toFixed(2)}</span>` : ''}</div>` : ''}
        <p class="desc">${p.description}</p>
        <div class="qty">
          <button id="qty-dec" type="button">−</button>
          <input id="qty-val" type="text" value="1" readonly/>
          <button id="qty-inc" type="button">+</button>
        </div>
        <button class="btn" id="add-to-cart">Add to Cart</button>
        <div style="margin-top:24px;color:#888;font-size:13px;">
          <div><strong>Category:</strong> ${(window.THC_CATEGORIES.find(c => c.id === p.category) || {}).name || p.category}</div>
          <div><strong>SKU:</strong> ${p.id.toUpperCase()}</div>
        </div>
      </div>
    `;
    const val = document.getElementById('qty-val');
    document.getElementById('qty-dec').onclick = () => { val.value = Math.max(1, parseInt(val.value || 1) - 1); };
    document.getElementById('qty-inc').onclick = () => { val.value = parseInt(val.value || 1) + 1; };
    document.getElementById('add-to-cart').onclick = () => {
      Cart.add(p.id, parseInt(val.value || 1));
      showToast('Added to cart');
    };
  }

  function showToast(msg) {
    let t = document.getElementById('thc-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'thc-toast';
      t.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#222;color:#fff;padding:14px 22px;border-radius:4px;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.25);font-size:14px;transition:opacity .3s;opacity:0;';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._t);
    t._t = setTimeout(() => { t.style.opacity = '0'; }, 2200);
  }
  window.THC_toast = showToast;

  function renderCart() {
    const wrap = document.getElementById('cart-table-body');
    if (!wrap) return;
    const items = Cart.load();
    const products = window.THC_PRODUCTS;
    const total = Cart.total();
    const totalsEl = document.getElementById('cart-totals');

    if (items.length === 0) {
      document.getElementById('cart-wrap').innerHTML = `
        <div class="cart-empty">
          <h2 style="margin-bottom:14px;">Your cart is empty</h2>
          <p style="margin-bottom:24px;">Browse our products and find something you love.</p>
          <a class="btn" href="products.html">Shop Now</a>
        </div>`;
      return;
    }

    wrap.innerHTML = items.map(it => {
      const p = products.find(x => x.id === it.id);
      if (!p) return '';
      return `
        <tr data-id="${p.id}">
          <td>
            <div class="ci">
              <img src="${p.image}" alt=""/>
              <div><strong>${p.name}</strong><br/><span style="color:#888;font-size:12px">${p.brand}</span></div>
            </div>
          </td>
          <td>${p.price !== undefined ? `$${p.price.toFixed(2)}` : '—'}</td>
          <td>
            <div class="qty">
              <button class="dec" type="button">−</button>
              <input class="qv" value="${it.qty}" readonly/>
              <button class="inc" type="button">+</button>
            </div>
          </td>
          <td>${p.price !== undefined ? `$${(p.price * it.qty).toFixed(2)}` : '—'}</td>
          <td><button class="remove">✕</button></td>
        </tr>
      `;
    }).join('');

    totalsEl.innerHTML = `
      <div class="line"><span>Subtotal</span><span>$${total.toFixed(2)}</span></div>
      <div class="line"><span>Shipping</span><span>Free</span></div>
      <div class="line total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;">
        <a class="btn outline" style="background:#fff;color:#222;border:2px solid #222" href="products.html">Continue Shopping</a>
        <button class="btn" id="checkout-btn">Checkout</button>
      </div>
    `;

    wrap.querySelectorAll('tr').forEach(tr => {
      const id = tr.getAttribute('data-id');
      tr.querySelector('.inc').onclick = () => {
        const it = Cart.load().find(i => i.id === id);
        Cart.setQty(id, it.qty + 1); renderCart();
      };
      tr.querySelector('.dec').onclick = () => {
        const it = Cart.load().find(i => i.id === id);
        Cart.setQty(id, it.qty - 1); renderCart();
      };
      tr.querySelector('.remove').onclick = () => { Cart.remove(id); renderCart(); };
    });
    document.getElementById('checkout-btn').onclick = () => location.href = 'checkout.html';
  }

  function initHeader() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) burger.onclick = () => nav.classList.toggle('open');
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) cartBtn.onclick = () => location.href = 'cart.html';
    updateCartBadge();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    renderCategories();
    renderFeatured();
    renderLatest();
    renderBrands();
    renderNewsHome();
    renderProducts();
    renderProductDetail();
    renderCart();
  });
})();
