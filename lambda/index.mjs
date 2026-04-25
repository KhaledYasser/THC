// Stripe Checkout Session creator — zero-dependency Lambda (Node 20.x) with Function URL + CORS.
// Uses Stripe REST API directly via fetch to avoid packaging the Stripe SDK.
import { URLSearchParams } from 'node:url';

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || '';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

function resp(status, body, extra = {}) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      ...extra,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  };
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || 'POST';
  if (method === 'OPTIONS') return resp(204, '');
  if (method !== 'POST') return resp(405, { error: 'Method not allowed' });

  let payload;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : (event.body || '{}');
    payload = JSON.parse(raw);
  } catch (e) {
    return resp(400, { error: 'Invalid JSON' });
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  if (items.length === 0) return resp(400, { error: 'No items provided' });

  const successUrl = payload.success_url || 'https://thc.pom100.com/success.html?session_id={CHECKOUT_SESSION_ID}';
  const cancelUrl = payload.cancel_url || 'https://thc.pom100.com/cancel.html';
  const customer = payload.customer || {};

  // Total in cents for demo mode amount
  const totalCents = items.reduce((s, it) => s + Math.round(Number(it.price) * 100) * (parseInt(it.qty) || 1), 0);

  // Demo mode fallback: no Stripe key configured -> redirect to self-hosted demo checkout page.
  if (!STRIPE_SECRET || !STRIPE_SECRET.startsWith('sk_')) {
    const sid = 'demo_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
    const origin = new URL(successUrl).origin;
    const demoUrl = origin + '/demo_checkout.html?amount=' + (totalCents / 100).toFixed(2) + '&sid=' + sid;
    return resp(200, { id: sid, url: demoUrl, demo: true });
  }

  // Build Stripe form-encoded body
  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('success_url', successUrl);
  params.append('cancel_url', cancelUrl);
  if (customer.email) params.append('customer_email', customer.email);
  params.append('billing_address_collection', 'auto');

  items.forEach((it, i) => {
    const unit = Math.round(Number(it.price) * 100);
    const qty = Math.max(1, parseInt(it.qty) || 1);
    const name = String(it.name || 'Item').slice(0, 250);
    params.append(`line_items[${i}][price_data][currency]`, 'usd');
    params.append(`line_items[${i}][price_data][product_data][name]`, name);
    if (it.image && /^https?:\/\//.test(it.image)) {
      params.append(`line_items[${i}][price_data][product_data][images][0]`, it.image);
    }
    params.append(`line_items[${i}][price_data][unit_amount]`, String(unit));
    params.append(`line_items[${i}][quantity]`, String(qty));
  });

  // Metadata
  if (customer.first_name) params.append('metadata[first_name]', String(customer.first_name).slice(0, 500));
  if (customer.last_name) params.append('metadata[last_name]', String(customer.last_name).slice(0, 500));
  if (customer.phone) params.append('metadata[phone]', String(customer.phone).slice(0, 500));
  if (customer.address) params.append('metadata[address]', String(customer.address).slice(0, 500));
  if (customer.city) params.append('metadata[city]', String(customer.city).slice(0, 500));
  if (customer.country) params.append('metadata[country]', String(customer.country).slice(0, 500));

  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + STRIPE_SECRET,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const text = await r.text();
    if (!r.ok) {
      console.error('Stripe error', r.status, text);
      return resp(r.status, { error: 'Stripe API error', detail: text });
    }
    const data = JSON.parse(text);
    return resp(200, { id: data.id, url: data.url });
  } catch (err) {
    console.error(err);
    return resp(500, { error: 'Server error', detail: String(err) });
  }
};
