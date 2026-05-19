<script setup lang="ts">
import { RouterLink } from "vue-router";
import DemoLink from "@/shared/components/DemoLink.vue";
</script>

<template>
  <div class="users-index">
    <header class="page-header">
      <div class="flex items-center justify-between mb-4">
        <h1>Users — Composables Refactoring</h1>
        <RouterLink
          to="/composables"
          class="text-sm font-semibold text-[var(--color-accent)] no-underline hover:text-[var(--color-accent-hover)] hover:underline"
        >
          ← Composables
        </RouterLink>
      </div>
      <p class="lede text-left">
        Real-world composable patterns applied to a full CRUD user list with
        create, edit, and delete — backed by localStorage for a realistic demo.
      </p>
    </header>

    <nav class="demo-links" aria-label="Users demos">
      <DemoLink
        to="/composables/users/list-one-big-component"
        label="One Big Component - BAD"
        description="All logic inlined — shared state, watcher chains, no testable units"
      />
      <DemoLink
        to="/composables/users/list-using-composables"
        label="List Using Composables"
        description="Same feature refactored — every concern in its own focused composable"
      />
    </nav>
  </div>
</template>

<style scoped>
.users-index {
  max-width: 42rem;
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
  gap: 1rem;
  align-items: center;
}
</style>
