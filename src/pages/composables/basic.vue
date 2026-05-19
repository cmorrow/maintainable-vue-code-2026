<script setup lang="ts">
import { useCounter } from "@/features/composables/basic/useCounter";
import { useCounterWithStart } from "@/features/composables/basic/useCounterWithStart";
import VPageHeader from "@/shared/components/VPageHeader.vue";

const { count, increment, decrement } = useCounter();
const {
  count: count2,
  increment: increment2,
  decrement: decrement2,
} = useCounterWithStart(10);
</script>
<template>
  <div class="composables-view">
    <VPageHeader
      title="Basic Composable: useCounter"
      :canToggleDescription="false"
    >
      Composables extract reactive state and reusable behavior into plain
      functions. The page view stays focused on layout, template wiring, and
      route-specific concerns — not implementation details.
    </VPageHeader>
    <section class="counters-row">
      <div class="counter-col">
        <h2>useCounter</h2>
        <div class="counter-demo">
          <div class="counter-box">{{ count }}</div>
          <div class="counter-actions">
            <button class="counter-btn" @click="decrement" aria-label="Decrement">
              -
            </button>
            <button class="counter-btn" @click="increment" aria-label="Increment">
              +
            </button>
          </div>
        </div>
      </div>
      <div class="counter-col">
        <h2>useCounterWithStart</h2>
        <div class="counter-demo">
          <div class="counter-box">{{ count2 }}</div>
          <div class="counter-actions">
            <button
              class="counter-btn"
              @click="decrement2"
              aria-label="Decrement"
            >
              -
            </button>
            <button
              class="counter-btn"
              @click="increment2"
              aria-label="Increment"
            >
              +
            </button>
          </div>
          <label class="counter-input-label">
            Set count
            <input class="counter-input" type="number" v-model.number="count2" />
          </label>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.counters-row {
  display: flex;
  gap: 2rem;
}

.counter-col {
  flex: 1;
}

.counter-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.counter-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  border-radius: 12px;
  background: var(--color-surface);
  border: 2px solid var(--color-accent);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-accent);
}

.counter-actions {
  display: flex;
  gap: 0.75rem;
}

.counter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 6px;
  border: 1px solid var(--color-accent);

  color: #fff;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.counter-btn:hover {
  opacity: 0.85;
  background-color: rgba(var(--color-accent-rgb) / 0.5);
}

.counter-input-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.counter-input {
  width: 6rem;
  padding: 0.375rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--color-accent);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  text-align: center;
}
</style>
