<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  to: string;
  inline?: boolean;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    class="card-link"
    :class="{ 'card-link--inline': inline }"
  >
    <slot />
  </RouterLink>
</template>
<style scoped>
.card-link {
  display: block;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.15s ease;
}

.card-link:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent);
}

.card-link--inline {
  display: inline-block;
}
</style>
