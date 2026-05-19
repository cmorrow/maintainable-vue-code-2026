<script setup lang="ts">
const { name, role } = defineProps({
  name: {
    type: String,
    required: true,
  },
  role: {
    default: null,
    validator: (value: unknown) =>
      value === null || ["provide", "inject"].includes(value as string),
  },
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
  --xInset: 15px;
  --yInset: 25px;
  --frame-color: #6e7681;
  --label-color: white;
  position: relative;
  border: 1px solid var(--frame-color);
  padding: var(--yInset) var(--xInset);
}

.component-frame[data-role="provide"] {
  border-width: 2px;
  --label-color: #3fb950;
  --frame-color: #3fb950;
}

.component-frame[data-role="inject"] {
  border-width: 2px;
  --label-color: #e4427d;
  --frame-color: #e4427d;
}

.component-frame-label {
  position: absolute;
  top: 5px;
  right: var(--xInset);
  z-index: 10;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--label-color);
  pointer-events: none;
  white-space: nowrap;
  line-height: 1;
}
</style>
