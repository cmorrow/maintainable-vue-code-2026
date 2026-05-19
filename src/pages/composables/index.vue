<script setup lang="ts">
import { RouterLink } from "vue-router";
import DemoLink from "@/shared/components/DemoLink.vue";
</script>

<template>
  <div class="composables-index">
    <header class="page-header">
      <div class="flex items-center justify-between mb-4">
        <h1>Composables</h1>
        <RouterLink
          to="/"
          class="text-sm font-semibold text-[var(--color-accent)] no-underline hover:text-[var(--color-accent-hover)] hover:underline"
        >
          ← Back to home
        </RouterLink>
      </div>
      <p class="lede text-left">
        Explore different approaches to organizing reusable logic in Vue
        components.
      </p>
    </header>

    <nav class="demo-links" aria-label="Composables demos">
      <!-- <DemoLink
        to="/composables/page-refactor"
        label="Page Refactor"
        description="Before and after examples of composables"
      /> -->
      <DemoLink
        to="/composables/basic"
        label="Basic Composable"
        description='A simple "useCounter" composable for state management'
      />
      <DemoLink
        to="/composables/nested"
        label="Nested Composable: useMouse"
        description="Track pointer coordinates using an imported composable useEventListener"
      />
      <DemoLink
        to="/composables/users"
        label="User Management"
        description="Full CRUD list with create, edit, and delete — all logic in composables"
      />
    </nav>
  </div>
</template>

<style scoped>
.composables-index {
  margin-inline: auto;
  padding-block: 2rem 4rem;
}

.page-header {
  margin-bottom: 3rem;
}

h1 {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.lede {
  margin: 0 0 2rem;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.demo-links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
}
</style>
