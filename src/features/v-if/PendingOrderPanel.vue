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
  subtotal: number
  tax: number
  total: number
  paymentDeadline: string
  billingAddress: Address
  paymentMethod: string
}

defineProps<{ order: Order }>()
</script>

<template>
  <div class="order-panel">
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

.status-pending {
  background: rgba(230, 180, 50, 0.15);
  color: #e6b432;
}

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

.items-section,
.address-section {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border-subtle);
}

.items-section h3,
.address-section h3 {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text-muted);
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
