<script setup lang="ts">
// PropsTSConcise: TypeScript interface + Vue 3.5 using props as a reactive object with defaults in the destructure pattern.
//
// - status = "pending" and count = 0 directly in the destructure pattern
// - most concise TS-first approach available in Vue 3.5+
// - trade-off: same as Option B — validators must be done outside defineProps
interface CardProps {
  title: string;
  count?: number;
  status?: "pending" | "success" | "failed";
}

// Vue 3.2 - 3.4 must use withDefaults + defineProps for defaults
const props = withDefaults(defineProps<CardProps>(), {
  count: 0,
  status: "pending",
});

// count validator
if (props.count !== undefined && (props.count < 0 || props.count > 50)) {
  console.warn(
    `[PropsTSConcise] count must be between 0 and 50, got ${props.count}`,
  );
}
</script>
<template>
  <div class="card flex flex-col">
    <div class="flex gap-x-2 justify-between">
      <h2 class="text-2xl font-bold text-white">{{ title }}</h2>
      <div class="card-status" :class="`card-status--${status}`">
        {{ status }}
      </div>
    </div>

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

.card-status {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.card-status--pending {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-muted);
}

.card-status--success {
  background: rgba(0, 227, 152, 0.12);
  color: var(--color-accent);
}

.card-status--failed {
  background: rgba(231, 76, 60, 0.12);
  color: var(--color-danger);
}
</style>
