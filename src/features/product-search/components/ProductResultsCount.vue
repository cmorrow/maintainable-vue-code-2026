<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductSearchStore } from "../productSearch.store";

const store = useProductSearchStore();
const { filteredProducts } = storeToRefs(store);
</script>

<template>
  <p class="results-count">
    <span class="count">{{ filteredProducts.length }}</span>
    {{ filteredProducts.length === 1 ? "product" : "products" }} found
  </p>
</template>

<style scoped>
.results-count {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.count {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-accent);
}
</style>
