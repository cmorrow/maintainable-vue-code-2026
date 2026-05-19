<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import ProductTopFilters from "@/features/product-search/components/ProductTopFilters.vue";
import ProductFilters from "@/features/product-search/components/ProductFilters.vue";
import ProductSort from "@/features/product-search/components/ProductSort.vue";
import ProductGrid from "@/features/product-search/components/ProductGrid.vue";
import ProductResultsCount from "@/features/product-search/components/ProductResultsCount.vue";

const calloutOpen = ref(false);
</script>

<template>
  <div class="feature-store-page">
    <header class="page-header">
      <div class="heading-row">
        <h1>Feature Store: Product Search</h1>
        <RouterLink to="/stores" class="back-link">← Back to Stores</RouterLink>
      </div>
      <p class="lede">
        A <strong>feature store</strong> scopes shared state to one area of
        the app. Here, <code>useProductSearchStore</code> is the single source
        of truth for all search, filter, and sort state. Each component below
        calls the store directly — they are siblings with no common parent
        passing data between them.
      </p>
    </header>

    <!-- Why store vs provide/inject callout -->
    <div class="callout">
      <button class="callout-title" @click="calloutOpen = !calloutOpen">
        Why a store instead of provide/inject?
        <span class="callout-toggle" aria-hidden="true">{{ calloutOpen ? "−" : "+" }}</span>
      </button>
      <div v-if="calloutOpen" class="callout-grid">
        <div class="callout-col">
          <p class="callout-approach">With provide/inject</p>
          <p class="callout-text">
            A parent component must own the state and
            <code>provide</code> it down the tree. Every sibling that reads or
            writes that state must be a descendant of that provider — binding
            your component structure to your data structure. Adding a new
            consumer means ensuring it lives inside the provider's subtree.
          </p>
        </div>
        <div class="callout-col">
          <p class="callout-approach accent">With a feature store</p>
          <p class="callout-text">
            Any component calls <code>useProductSearchStore()</code> and gets
            the same reactive state. There is no required tree structure.
            Components can be moved, added, or removed without touching their
            siblings. The store is the source of truth; components are just
            views into it.
          </p>
        </div>
      </div>

      <!-- Component map -->
      <div v-if="calloutOpen" class="component-map">
        <div class="store-node">
          <span class="node-label">useProductSearchStore</span>
          <span class="node-path">features/product-search/productSearch.store.ts</span>
        </div>
        <div class="map-arrows">
          <span class="arrow-line" />
          <span class="arrow-line" />
          <span class="arrow-line" />
          <span class="arrow-line" />
        </div>
        <div class="component-nodes">
          <div class="component-node">
            <span class="node-chip filters">ProductFilters</span>
            <span class="node-role">writes filters</span>
          </div>
          <div class="component-node">
            <span class="node-chip sort">ProductSort</span>
            <span class="node-role">changes sort</span>
          </div>
          <div class="component-node">
            <span class="node-chip grid">ProductGrid</span>
            <span class="node-role">reads products</span>
          </div>
          <div class="component-node">
            <span class="node-chip count">ProductResultsCount</span>
            <span class="node-role">displays count</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Live product search demo -->
    <ProductTopFilters />

    <div class="shop-layout">
      <aside class="shop-sidebar">
        <ProductSort />
        <hr class="sidebar-divider" />
        <ProductFilters />
      </aside>

      <main class="shop-main">
        <div class="main-toolbar">
          <ProductResultsCount />
        </div>
        <ProductGrid />
      </main>
    </div>
  </div>
</template>

<style scoped>
.feature-store-page {
  max-width: 1100px;
  margin-inline: auto;
  padding-block: 0.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 0;
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
  font-size: clamp(1.4rem, 4vw, 2rem);
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
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.65;
  max-width: 72ch;
}

.lede strong {
  color: var(--color-text);
}

code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-code-bg);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}

/* Callout */
.callout {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.callout-title {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  cursor: pointer;
  user-select: none;
}

.callout-title:hover {
  color: var(--color-accent);
}

.callout-toggle {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1;
  color: var(--color-text-subtle);
  transition: color 0.12s;
}

.callout-title:hover .callout-toggle {
  color: var(--color-accent);
}

.callout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .callout-grid {
    grid-template-columns: 1fr;
  }
}

.callout-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.callout-approach {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text-subtle);
}

.callout-approach.accent {
  color: var(--color-accent);
}

.callout-text {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

/* Component map */
.component-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border-subtle);
}

.store-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.6rem 1.25rem;
  background: rgba(var(--color-accent-rgb) / 0.1);
  border: 1px solid rgba(var(--color-accent-rgb) / 0.35);
  border-radius: var(--radius);
}

.node-label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-accent);
}

.node-path {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-text-subtle);
}

.map-arrows {
  display: flex;
  gap: 3.5rem;
  padding: 0.35rem 0;
}

.arrow-line {
  width: 1px;
  height: 1.25rem;
  background: var(--color-border-subtle);
  position: relative;
}

.arrow-line::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--color-border-subtle);
}

.component-nodes {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.component-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.node-chip {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius);
  border: 1px solid;
}

.node-chip.filters {
  background: rgba(96, 165, 250, 0.08);
  border-color: rgba(96, 165, 250, 0.3);
  color: #60a5fa;
}

.node-chip.sort {
  background: rgba(167, 139, 250, 0.08);
  border-color: rgba(167, 139, 250, 0.3);
  color: #a78bfa;
}

.node-chip.grid {
  background: rgba(var(--color-accent-rgb) / 0.08);
  border-color: rgba(var(--color-accent-rgb) / 0.3);
  color: var(--color-accent);
}

.node-chip.count {
  background: rgba(251, 191, 36, 0.08);
  border-color: rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.node-role {
  font-size: 0.65rem;
  color: var(--color-text-subtle);
}

/* Shop layout */
.shop-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 700px) {
  .shop-layout {
    grid-template-columns: 1fr;
  }
}

.shop-sidebar {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: sticky;
  top: 1rem;
}

.sidebar-divider {
  border: none;
  border-top: 1px solid var(--color-border-subtle);
  margin: 0;
}

.shop-main {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.main-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-subtle);
}
</style>
