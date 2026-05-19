<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductSearchStore } from "../productSearch.store";

const store = useProductSearchStore();
const { selectedCategory, categories } = storeToRefs(store);
</script>

<template>
  <div class="filters">
    <h3 class="section-heading">Category</h3>
    <div class="category-pills">
      <button
        v-for="cat in categories"
        :key="cat"
        class="pill"
        :class="{ active: selectedCategory === cat }"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.section-heading {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.pill {
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--color-border-subtle);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.12s;
}

.pill:hover {
  border-color: var(--color-border);
  color: var(--color-text);
}

.pill.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #000;
  font-weight: 700;
}
</style>
