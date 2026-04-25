// Stripe Checkout integration
(function () {
  async function startCheckout(form) {
    const items = (window.THC_Cart && window.THC_Cart.load()) || [];
    if (items.length === 0) { alert('Your cart is empty.'); return; }
    const btn = document.getElementById('pay-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Processing...'; }
    const alertEl = document.getElementById('checkout-alert');
    const setErr = (msg) => {
      if (alertEl) { alertEl.className = 'alert error'; alertEl.textContent = msg; alertEl.style.display = 'block'; }
      if (btn) { btn.disabled = false; btn.textContent = 'Pay with Stripe'; }
    };

    const lineItems = items.map(it => {
      const p = window.THC_PRODUCTS.find(x => x.id === it.id);
      return { id: it.id, name: p.name, price: p.price, qty: it.qty, image: p.image };
    });

    // If no Lambda URL configured, do client-only simulated checkout (testing)
    if (!window.THC_CHECKOUT_URL) {
      setErr('Payment backend not configured. Please try again later.');
      return;
    }

    try {
      const resp = await fetch(window.THC_CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lineItems,
          customer: form,
          success_url: location.origin + '/success.html?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: location.origin + '/cancel.html'
        })
      });
      if (!resp.ok) { const t = await resp.text(); setErr('Checkout error: ' + t); return; }
      const data = await resp.json();
      if (data.url) {
        // Redirect to Stripe hosted Checkout page
        window.location.href = data.url;
      } else {
        setErr('Invalid response from payment server.');
      }
    } catch (e) {
      setErr('Network error: ' + e.message);
    }
  }
  window.THC_startCheckout = startCheckout;
})();
