<script setup lang="ts">
import { RouterLink } from "vue-router";
import DemoLink from "@/shared/components/DemoLink.vue";
</script>

<template>
  <div class="stores-index">
    <header class="page-header">
      <div class="heading-row">
        <h1>Pinia Stores</h1>
        <RouterLink to="/" class="back-link">← Back to home</RouterLink>
      </div>
      <p class="lede">
        Pinia is Vue's official state management library. A
        <strong>store</strong> holds shared reactive state that any component
        can read and write directly — no prop drilling, no provide/inject
        wiring, no event buses. There are two distinct scoping patterns to
        know.
      </p>
    </header>

    <nav class="demo-links" aria-label="Store demos">
      <DemoLink
        to="/stores/app-store"
        label="App / Global Store"
        description="Session-wide state: current user, auth status, notifications, theme. Accessible from any route, lives for the full app lifetime."
      />
      <DemoLink
        to="/stores/feature-store"
        label="Feature Store"
        description="Scoped to a single feature. ProductFilters, ProductSort, ProductGrid, and ProductResultsCount all share one store — no common parent needed."
      />
    </nav>
  </div>
</template>

<style scoped>
.stores-index {
  margin-inline: auto;
  padding-block: 2rem 4rem;
}

.page-header {
  margin-bottom: 3rem;
}

.heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

h1 {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.back-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  white-space: nowrap;
}

.back-link:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}

.lede {
  margin: 0 0 2rem;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 68ch;
}

.lede strong {
  color: var(--color-text);
}

.demo-links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
}
</style>
