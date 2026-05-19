<script setup lang="ts">
defineProps({
  percentage: {
    type: Number,
    required: true,
    validator(value: unknown) {
      return typeof value === "number" && value >= 0 && value <= 100;
    },
  },

  size: {
    type: Number,
    default: 200,
    validator(value: unknown) {
      return typeof value === "number" && value >= 100 && value <= 500;
    },
  },
});
</script>

<template>
  <div
    class="chart"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    {{ percentage }}%
  </div>
</template>
