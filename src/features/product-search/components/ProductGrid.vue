<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductSearchStore } from "../productSearch.store";

const store = useProductSearchStore();
const { filteredProducts } = storeToRefs(store);
</script>

<template>
  <div v-if="filteredProducts.length === 0" class="empty-state">
    <p class="empty-message">No products match your filters.</p>
    <button class="clear-link" @click="store.reset()">Clear all filters</button>
  </div>

  <ul v-else class="product-grid" role="list">
    <li
      v-for="product in filteredProducts"
      :key="product.id"
      class="product-card"
    >
      <div class="card-top">
        <span class="category-tag">{{ product.category }}</span>
        <span
          class="stock-badge"
          :class="product.inStock ? 'in-stock' : 'out-of-stock'"
        >
          {{ product.inStock ? "In Stock" : "Out of Stock" }}
        </span>
      </div>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-desc">{{ product.description }}</p>
      <div class="card-footer">
        <span class="price">${{ product.price }}</span>
        <span class="rating">
          <span class="star" aria-hidden="true">★</span>
          {{ product.rating }}
        </span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.875rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  transition: border-color 0.15s;
}

.product-card:hover {
  border-color: var(--color-border);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-tag {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text-subtle);
}

.stock-badge {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
}

.in-stock {
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb) / 0.12);
}

.out-of-stock {
  color: var(--color-text-subtle);
  background: rgba(255, 255, 255, 0.06);
}

.product-name {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.35;
}

.product-desc {
  margin: 0;
  font-size: 0.775rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border-subtle);
}

.price {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.rating {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.star {
  color: #fbbf24;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-message {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.clear-link {
  background: none;
  border: none;
  color: var(--color-accent);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: underline;
  padding: 0;
}
</style>
