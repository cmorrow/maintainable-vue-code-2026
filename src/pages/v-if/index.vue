<script setup lang="ts">
import { RouterLink } from "vue-router";
import DemoLink from "@/shared/components/DemoLink.vue";
</script>

<template>
  <div class="v-if-index">
    <header class="page-header">
      <div class="flex items-center justify-between mb-4">
        <h1>v-if: Large Blocks vs Split Components</h1>
        <RouterLink
          to="/"
          class="text-sm font-semibold text-[var(--color-accent)] no-underline hover:text-[var(--color-accent-hover)] hover:underline"
        >
          ← Back to home
        </RouterLink>
      </div>
      <p class="lede text-left">
        A large <code>v-if / v-else</code> block crams two unrelated UIs into one template.
        Splitting each branch into its own component makes both easier to read, test, and change independently.
      </p>
    </header>

    <nav class="demo-links" aria-label="v-if demos">
      <DemoLink
        to="/v-if/large-v-if"
        label="Large v-if Block — BAD"
        description="Pending and fulfilled order UIs jammed into a single template with v-if / v-else"
      />
      <DemoLink
        to="/v-if/split-components"
        label="Split Components — GOOD"
        description="Each branch is its own focused component — two lines of template instead of ninety"
      />
    </nav>
  </div>
</template>

<style scoped>
.v-if-index {
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

.lede code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.1em 0.35em;
  border-radius: 3px;
}

.demo-links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
}
</style>
