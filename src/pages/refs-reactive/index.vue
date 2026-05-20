<script setup lang="ts">
import { RouterLink } from "vue-router";
import VPageHeader from "@/shared/components/VPageHeader.vue";

const description =
  "Compare Vue’s reactivity models with a contact form example: a reactive form page and a ref-based form page.";
</script>

<template>
  <nav v-if="shouldShowNav">
    <RouterLink to="/refs-reactive/reactive" class="demo-card">
      <h2>Reactive form</h2>
    </RouterLink>
  </nav>
</template>

<template>
  <div class="refs-reactive-view">
    <header class="page-header">
      <VPageHeader title="Refs vs Reactive" :canToggleDescription="false">
        <p>{{ description }}</p>
      </VPageHeader>
    </header>

    <nav class="demo-links" aria-label="Refs vs Reactive examples">
      <RouterLink to="/refs-reactive/reactive" class="demo-card">
        <h2>Reactive form</h2>
        <p>
          See how `reactive` works, and when rerouting the object root breaks
          reactivity.
        </p>
      </RouterLink>
      <RouterLink to="/refs-reactive/ref" class="demo-card">
        <h2>Ref form</h2>
        <p>
          Use `ref` with primitives and objects, including safe reset behavior.
        </p>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.refs-reactive-view {
  max-width: 56rem;
  margin-inline: auto;
  padding-block: 2rem 4rem;
  color: var(--color-text);
}

.page-header {
  margin-bottom: 2rem;
}

.demo-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.demo-card {
  display: block;
  padding: 1.5rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  text-decoration: none;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.demo-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-1px);
}

.demo-card h2 {
  margin: 0 0 0.65rem;
  color: var(--color-accent);
}

.demo-card p {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
