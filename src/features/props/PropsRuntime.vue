<script setup lang="ts">
import type { PropType } from "vue";
import VStatusBadge from "@/shared/components/VStatusBadge.vue";

// TSRuntime: Runtime object syntax with Vue 3.5 reactive destructure defaults.
type Status = "syncing" | "error" | "pending" | "success" | "failed";
const {
  title,
  count,
  status = "pending",
} = defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: [Number, String],
    default: 0,
    validator: (value: number | string) => {
      // Convert value to a number for internal validation checks
      const numericValue = typeof value === "string" ? Number(value) : value;
      // Ensure it is a valid, logical number between 0 and 100
      return !isNaN(numericValue) && numericValue >= 0 && numericValue <= 100;
    },
  },
  status: {
    type: String as PropType<Status>,
    validator: (value: string): value is Status =>
      (
        ["syncing", "error", "pending", "success", "failed"] as Status[]
      ).includes(value as Status),
  },
});
</script>
<template>
  <div class="card flex flex-col">
    <h2 class="text-2xl font-bold text-white">{{ title }}</h2>
    <VStatusBadge :status="status" />

    <div class="flex flex-col items-center gap-2">
      <span class="card-count-label">Count</span>
      <span
        class="card-count-value border border-primary rounded-md p-3 py-1"
        >{{ count }}</span
      >
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  width: 100%;
}

.card-count-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
}

.card-count-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
}
</style>
