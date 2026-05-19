<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  to: string;
  inline?: boolean;
}>();
</script>

<template>
  <RouterLink :to="to" class="link">
    <slot />
  </RouterLink>
</template>
<style scoped>
.link {
  color: var(--color-accent);
  text-decoration: underline;
  transition: all 0.15s ease;
}

.link:hover {
  color: #fff;
}
</style>
