<script setup lang="ts">
// ✅ SPLIT COMPONENTS — each branch is its own focused component.
// The template expresses intent in two lines. Each component owns its own
// template, styles, and prop contract — independently readable and testable.

import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PendingOrderPanel from '@/features/v-if/PendingOrderPanel.vue'
import FulfilledOrderPanel from '@/features/v-if/FulfilledOrderPanel.vue'

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
        Each branch of the conditional is its own component. The parent template
        stays focused on <em>which</em> UI to show — not <em>how</em> to render it.
      </p>
    </header>

    <div class="good-banner" aria-label="Good pattern callout">
      <strong>✅ Why this is better</strong>
      <ul>
        <li>The template communicates intent in two lines — no scrolling required</li>
        <li>Each component has its own scoped styles, props, and template — fully isolated</li>
        <li>Test <code>PendingOrderPanel</code> and <code>FulfilledOrderPanel</code> independently</li>
        <li>Adding a field to the fulfilled view? Open that file — the pending view is untouched</li>
        <li>Component names make the conditional self-documenting at a glance</li>
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

    <!-- ✅ Two lines. That's it. Each component owns its own UI completely. -->
    <PendingOrderPanel v-if="!isFulfilled" :order="order" />
    <FulfilledOrderPanel v-else :order="order" />
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
  color: var(--color-accent);
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

/* ── good banner ── */
.good-banner {
  margin-bottom: 1.25rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  background: rgba(0, 227, 152, 0.06);
  border: 1px solid rgba(0, 227, 152, 0.22);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.good-banner strong {
  display: block;
  color: var(--color-accent);
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
}

.good-banner ul {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.good-banner code {
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
</style>
