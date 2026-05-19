<script setup lang="ts">
import { useMouse } from "@/features/composables/basic/useMouse";
import VPageHeader from "@/shared/components/VPageHeader.vue";

const { x, y } = useMouse();
</script>

<template>
  <div class="composables-view">
    <VPageHeader
      title="Nested Composable: useMouse"
      :canToggleDescription="false"
    >
      A small reusable composable that tracks pointer movement with a child
      composable useEventListener.
    </VPageHeader>

    <section class="mouse-demo">
      <div class="stats-row">
        <div class="stat-card">
          <span>X</span>
          <strong>{{ x }}</strong>
        </div>
        <div class="stat-card">
          <span>Y</span>
          <strong>{{ y }}</strong>
        </div>
      </div>
      <p class="help-text">
        Move the mouse anywhere in the browser window to update the coordinates.
      </p>
    </section>
  </div>
</template>

<style scoped>
.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  flex: 1 1 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 9rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: var(--color-surface);
  border: 1px solid rgba(var(--color-text-muted-rgb), 0.15);
  color: var(--color-text);
}

.stat-card span {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.stat-card strong {
  font-size: 2.5rem;
  font-weight: 700;
}

.help-text {
  margin-top: 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
