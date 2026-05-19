<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductSearchStore } from "../productSearch.store";

const store = useProductSearchStore();
const { searchQuery, maxPrice, inStockOnly, priceMax, priceStep } = storeToRefs(store);
</script>

<template>
  <div class="top-filters">
    <div class="filter-field search-field">
      <label class="field-label" for="product-search">Search</label>
      <input
        id="product-search"
        v-model="searchQuery"
        type="search"
        class="text-input"
        placeholder="Headphones, SSD…"
      />
    </div>

    <div class="filter-field price-field">
      <label class="field-label" for="price-range">
        Max price: <strong>${{ maxPrice }}</strong>
      </label>
      <input
        id="price-range"
        v-model.number="maxPrice"
        type="range"
        :min="0"
        :max="priceMax"
        :step="priceStep"
        class="range-input"
      />
    </div>

    <div class="filter-field stock-field">
      <span class="field-label">&nbsp;</span>
      <label class="checkbox-label">
        <input v-model="inStockOnly" type="checkbox" class="checkbox" />
        In stock only
      </label>
    </div>

    <div class="filter-field reset-field">
      <span class="field-label">&nbsp;</span>
      <button class="reset-btn" @click="store.reset()">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.top-filters {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.search-field {
  flex: 1;
  min-width: 0;
}

.price-field {
  width: 200px;
  flex-shrink: 0;
}

.stock-field {
  flex-shrink: 0;
}

.reset-field {
  flex-shrink: 0;
}

.field-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.field-label strong {
  color: var(--color-text);
}

.text-input {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  color: var(--color-text);
  font-size: 0.875rem;
  padding: 0.45rem 0.7rem;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}

.text-input:focus {
  border-color: var(--color-accent);
}

.range-input {
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
  margin-top: 0.15rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  padding-bottom: 0.1rem;
}

.checkbox {
  accent-color: var(--color-accent);
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.reset-btn {
  padding: 0.42rem 0.85rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-subtle);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.12s;
  white-space: nowrap;
}

.reset-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
