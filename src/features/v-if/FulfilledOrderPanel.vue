<script setup lang="ts">
interface OrderItem {
  name: string
  qty: number
  price: number
}

interface Address {
  name: string
  street: string
  city: string
  state: string
  zip: string
}

interface Order {
  id: string
  items: OrderItem[]
  trackingNumber: string
  carrier: string
  shippingAddress: Address
  deliveredAt: string
}

defineProps<{ order: Order }>()
</script>

<template>
  <div class="order-panel">
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
</template>

<style scoped>
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

.status-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2em 0.65em;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.status-fulfilled {
  background: rgba(0, 227, 152, 0.12);
  color: var(--color-accent);
}

.tracking-section,
.items-section,
.address-section {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border-subtle);
}

.tracking-section h3,
.items-section h3,
.address-section h3 {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text-muted);
}

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

address {
  font-style: normal;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border);
}

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
