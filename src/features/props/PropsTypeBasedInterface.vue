<script setup lang="ts">
import { watchEffect } from "vue";
import VStatusBadge from "@/shared/components/VStatusBadge.vue";
// PropsTypeBasedInterface: Type-based approach using an interface for prop definitions.
//
// - status = "pending" and count = 0 directly in the destructure pattern
// - most concise TS-first approach available in Vue 3.5+
// - trade-off: same as Option B — validators must be done outside defineProps
interface CardProps {
  title: string;
  count?: number;
  status?: "pending" | "success" | "failed";
}

const { title, count = 0, status = "pending" } = defineProps<CardProps>();

watchEffect(() => {
  if (count < 0 || count > 50) {
    console.warn(
      `[PropsTypeBasedInterface] count must be between 0 and 50, got ${count}`,
    );
  }
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
