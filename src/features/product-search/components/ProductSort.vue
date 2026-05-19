<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductSearchStore } from "../productSearch.store";
import type { SortKey } from "../productSearch.store";

const store = useProductSearchStore();
const { sortBy } = storeToRefs(store);

const options: { value: SortKey; label: string }[] = [
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name", label: "Name A → Z" },
];
</script>

<template>
  <div class="sort-bar">
    <span class="sort-label">Sort by</span>
    <div class="sort-options">
      <button
        v-for="opt in options"
        :key="opt.value"
        class="sort-btn"
        :class="{ active: sortBy === opt.value }"
        @click="sortBy = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.sort-bar {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.sort-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.sort-options {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sort-btn {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: all 0.12s;
}

.sort-btn:hover {
  color: var(--color-text);
  border-color: var(--color-border);
}

.sort-btn.active {
  background: rgba(var(--color-accent-rgb) / 0.12);
  border-color: var(--color-accent);
  color: var(--color-accent);
  font-weight: 600;
}
</style>
