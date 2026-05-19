<script setup lang="ts">
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  canToggleDescription: {
    type: Boolean,
    default: true,
  },
});

const showDescription = ref(false);
</script>

<template>
  <div>
    <div class="top-heading flex items-center justify-between mb-4">
      <h1>{{ title }}</h1>
      <RouterLink
        to="/"
        class="text-sm font-semibold text-[var(--color-accent)] no-underline hover:text-[var(--color-accent-hover)] hover:underline"
      >
        ← Back to home
      </RouterLink>
    </div>
    <button
      v-if="canToggleDescription"
      class="toggle-btn"
      @click="showDescription = !showDescription"
    >
      {{ showDescription ? "Hide" : "Show" }} description
    </button>
    <div v-if="showDescription" class="lede">
      <slot />
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 1rem;
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
.toggle-btn {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>
