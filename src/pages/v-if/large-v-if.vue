<script setup lang="ts">
// 😬 ONE TEMPLATE — two completely different UIs crammed into a single v-if / v-else.
// Scroll down to see where one ends and the other begins... if you can tell.
// Adding a feature to the pending view? Hope you don't accidentally edit the fulfilled block.

import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isFulfilled = ref(false)

const order = {
  id: 'ORD-20260519-4821',
  items: [
    { name: 'Vue 3 Masterclass Course', qty: 1, price: 89.00 },
    { name: 'Design System Starter Kit', qty: 1, price: 49.00 },
    { name: 'TypeScript Handbook (PDF)', qty: 2, price: 24.00 },
  ],
  subtotal: 186.00,
  tax: 18.60,
  total: 204.60,
  paymentDeadline: '2026-05-21',
  billingAddress: { name: 'Alice Johnson', street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94102' },
  paymentMethod: 'Visa ending in 4242',
  trackingNumber: '1Z999AA10123456784',
  carrier: 'UPS Ground',
  shippingAddress: { name: 'Alice Johnson', street: '456 Elm Ave', city: 'Oakland', state: 'CA', zip: '94601' },
  deliveredAt: '2026-05-18',
}
</script>

<template>
  <div class="demo-page">
    <header class="page-header">
      <div class="page-header-top">
        <h1 class="page-title">Order Detail</h1>
        <RouterLink to="/v-if" class="back-link">← v-if</RouterLink>
      </div>
      <p class="page-lede">
        Both the pending and fulfilled order UIs live inside one giant
        <code>v-if / v-else</code> block. Scroll through the template to feel the pain.
      </p>
    </header>

    <div class="problem-banner" aria-label="Code smell callout">
      <strong>⚠️ What's wrong here?</strong>
      <ul>
        <li>~90 lines of template inside a single <code>v-if / v-else</code> — two unrelated UIs tangled together</li>
        <li>Changing the fulfilled view means scrolling past the entire pending view first</li>
        <li>Both branches share the same component scope — no isolation, no independent testing</li>
        <li>The boundary between the two UIs is invisible unless you search for <code>v-else</code></li>
        <li>One accidental edit in the wrong block and both states are broken</li>
      </ul>
    </div>

    <div class="toggle-bar">
      <span class="toggle-label">Toggle order state:</span>
      <button
        type="button"
        class="toggle-btn"
        :class="{ active: !isFulfilled }"
        @click="isFulfilled = false"
      >
        Pending
      </button>
      <button
        type="button"
        class="toggle-btn"
        :class="{ active: isFulfilled }"
        @click="isFulfilled = true"
      >
        Fulfilled
      </button>
    </div>

    <!-- ⚠️ Everything below is one enormous v-if / v-else. Good luck knowing where you are. -->

    <div v-if="!isFulfilled" class="order-panel">
      <div class="panel-header">
        <span class="status-badge status-pending">⏳ Pending Payment</span>
        <span class="order-id">{{ order.id }}</span>
      </div>

      <div class="deadline-warning">
        <p>Payment due by <strong>{{ order.paymentDeadline }}</strong></p>
        <p class="deadline-note">Your order will be cancelled if payment is not received by this date.</p>
      </div>

      <section class="items-section">
        <h3>Order Items</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th class="center">Qty</th>
              <th class="right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.name">
              <td>{{ item.name }}</td>
              <td class="center">{{ item.qty }}</td>
              <td class="right">${{ (item.qty * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div class="totals">
        <div class="totals-row">
          <span>Subtotal</span>
          <span>${{ order.subtotal.toFixed(2) }}</span>
        </div>
        <div class="totals-row">
          <span>Tax (10%)</span>
          <span>${{ order.tax.toFixed(2) }}</span>
        </div>
        <div class="totals-row totals-total">
          <span>Total</span>
          <span>${{ order.total.toFixed(2) }}</span>
        </div>
      </div>

      <section class="address-section">
        <h3>Billing Address</h3>
        <address>
          {{ order.billingAddress.name }}<br />
          {{ order.billingAddress.street }}<br />
          {{ order.billingAddress.city }}, {{ order.billingAddress.state }} {{ order.billingAddress.zip }}
        </address>
        <p class="payment-method">{{ order.paymentMethod }}</p>
      </section>

      <div class="actions">
        <button type="button" class="btn-primary">Pay Now — ${{ order.total.toFixed(2) }}</button>
        <button type="button" class="btn-ghost">Cancel Order</button>
      </div>
    </div>

    <!-- ⚠️ Did you spot where the pending block ended and this one started? -->

    <div v-else class="order-panel">
      <div class="panel-header">
        <span class="status-badge status-fulfilled">✓ Order Fulfilled</span>
        <span class="order-id">{{ order.id }}</span>
      </div>

      <section class="tracking-section">
        <h3>Tracking</h3>
        <div class="tracking-info">
          <div class="tracking-row">
            <span class="label">Carrier</span>
            <span>{{ order.carrier }}</span>
          </div>
          <div class="tracking-row">
            <span class="label">Tracking #</span>
            <span class="tracking-number">{{ order.trackingNumber }}</span>
          </div>
          <div class="tracking-row">
            <span class="label">Delivered</span>
            <span>{{ order.deliveredAt }}</span>
          </div>
        </div>
      </section>

      <section class="items-section">
        <h3>Items Shipped</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th class="center">Qty</th>
              <th class="right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.name">
              <td>{{ item.name }}</td>
              <td class="center">{{ item.qty }}</td>
              <td class="right">${{ (item.qty * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="address-section">
        <h3>Shipped To</h3>
        <address>
          {{ order.shippingAddress.name }}<br />
          {{ order.shippingAddress.street }}<br />
          {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zip }}
        </address>
      </section>

      <div class="actions">
        <button type="button" class="btn-primary">Track Package</button>
        <button type="button" class="btn-ghost">Download Invoice</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-page {
  max-width: 640px;
  margin-inline: auto;
  padding-block: 0.5rem 3rem;
  color: var(--color-text);
}

.page-header {
  margin-bottom: 1.25rem;
}

.page-header-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.page-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-danger);
}

.back-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.back-link:hover { color: var(--color-text); }

.page-lede {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.page-lede code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

/* ── problem banner ── */
.problem-banner {
  margin-bottom: 1.25rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  background: rgba(231, 76, 60, 0.07);
  border: 1px solid rgba(231, 76, 60, 0.25);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.problem-banner strong {
  display: block;
  color: var(--color-danger);
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
}

.problem-banner ul {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.problem-banner code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

/* ── toggle ── */
.toggle-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.toggle-btn {
  appearance: none;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius);
  padding: 0.3rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s, background 0.12s;
}

.toggle-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #010409;
}

/* ── order panel ── */
.order-panel {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.order-id {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

/* ── status badges ── */
.status-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2em 0.65em;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.status-pending {
  background: rgba(230, 180, 50, 0.15);
  color: #e6b432;
}

.status-fulfilled {
  background: rgba(0, 227, 152, 0.12);
  color: var(--color-accent);
}

/* ── deadline warning ── */
.deadline-warning {
  margin: 1rem 1.25rem;
  padding: 0.75rem 1rem;
  border-radius: calc(var(--radius) - 2px);
  background: rgba(230, 180, 50, 0.08);
  border: 1px solid rgba(230, 180, 50, 0.25);
  font-size: 0.85rem;
}

.deadline-warning p { margin: 0; }
.deadline-warning p + p { margin-top: 0.25rem; }

.deadline-note {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

/* ── sections ── */
.items-section,
.tracking-section,
.address-section {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border-subtle);
}

.items-section h3,
.tracking-section h3,
.address-section h3 {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text-muted);
}

/* ── items table ── */
.items-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.items-table th {
  padding: 0.35rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border-subtle);
  text-align: left;
}

.items-table td {
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.items-table tbody tr:last-child td { border-bottom: none; }

.items-table .center { text-align: center; }
.items-table .right { text-align: right; }

/* ── totals ── */
.totals {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--color-border-subtle);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.totals-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.totals-total {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text);
  padding-top: 0.35rem;
  border-top: 1px solid var(--color-border-subtle);
}

/* ── address ── */
address {
  font-style: normal;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}

.payment-method {
  margin: 0;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* ── tracking ── */
.tracking-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.tracking-row {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
}

.tracking-row .label {
  width: 6rem;
  flex-shrink: 0;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding-top: 0.1em;
}

.tracking-number {
  font-family: var(--font-mono);
  font-size: 0.82rem;
}

/* ── actions ── */
.actions {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border);
}

/* ── buttons ── */
.btn-primary {
  appearance: none;
  border: none;
  background: var(--color-accent);
  color: #010409;
  border-radius: var(--radius);
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.12s;
}

.btn-primary:hover { opacity: 0.88; }

.btn-ghost {
  appearance: none;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius);
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;
}

.btn-ghost:hover { color: var(--color-text); }
</style>
