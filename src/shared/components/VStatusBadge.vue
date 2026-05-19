<script setup lang="ts">
defineProps<{
  status?: string;
}>();
</script>

<template>
  <div class="status-badge" :class="`status-badge--${status}`">
    {{ status }}
  </div>
</template>

<style scoped>
.status-badge {
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background-color: rgba(255, 255, 255, 0.08);
}

.status-badge--pending {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-muted);
}

.status-badge--syncing {
  background: rgba(0, 227, 152, 0.12);
  color: var(--color-accent);
  animation: syncing-pulse 1.2s ease-in-out infinite;
}

@keyframes syncing-pulse {
  0%,
  100% {
    color: rgb(var(--color-accent-rgb));
  }
  50% {
    color: rgb(var(--color-accent-rgb) / 0.5);
  }
}

.status-badge--success {
  background: rgba(0, 227, 152, 0.12);
  color: var(--color-accent);
}

.status-badge--failed,
.status-badge--error {
  background: rgba(231, 76, 60, 0.12);
  color: var(--color-danger);
}
</style>
