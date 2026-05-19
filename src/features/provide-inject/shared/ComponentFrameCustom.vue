<script setup lang="ts">
import { usePropsValidation } from "@/shared/composables/usePropsValidation";

const { name, role = "no" } = defineProps<{
  name: string;
  role?: "provide" | "inject" | null;
}>();

usePropsValidation({
  role: () =>
    role !== null && !["provide", "inject"].includes(role)
      ? `Invalid value "${role}". Expected "provide", "inject", or null.`
      : null,
});
</script>

<template>
  <div class="component-frame" :data-role="role">
    <span class="component-frame-label">{{ name }}</span>
    <slot />
  </div>
</template>

<style scoped>
.component-frame {
  --xInset: 1rem;
  --yInset: 0.8rem;
  --frame-color: #6e7681;
  position: relative;
  border: 1px solid var(--frame-color);
  padding: var(--yInset) var(--xInset);
}

.component-frame[data-role="provide"] {
  --frame-color: #3fb950;
}

.component-frame[data-role="inject"] {
  --frame-color: #e4427d;
}

.component-frame-label {
  position: absolute;
  top: var(--yInset);
  right: var(--xInset);
  z-index: 10;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  font-weight: 500;
  color: #ffffff;
  opacity: 1;
  pointer-events: none;
  white-space: nowrap;
  line-height: 1;
}
</style>
